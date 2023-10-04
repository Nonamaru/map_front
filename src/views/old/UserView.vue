<template>
  <!--SECURNA NE TROGAT'-->
  <div id="all">
      <div id="feedback-content" v-if="shadow">
        <div id="feedback-header">Получить архив записи</div>
        <div class="feedback-elements">
          <div class="elements-left">С: </div>
          <div class="elements-right"><input type="datetime-local" v-model="form.date" :min="fromDate" :max="toDate" /></div>
        </div>
        <div class="feedback-elements">
          <div class="elements-left">По: </div>
          <div class="elements-right"><input type="datetime-local" id="formData" v-model="form.sdate" :min="fromDate" :max="toDate" /></div>
          
        </div>
        <div class="feedback-elements">
          <div class="elements-left">Почта: </div>
          <div class="elements-right"><input type="email" placeholder="example@mail.com" v-model="form.email" /></div>
          
        </div>
        <div class="feedback-elements">
          <div class="elements-left">Номер: </div>
          <div class="elements-right"><input v-model="form.number" maxlength="12" /></div>
          
        </div>
        <div class="feedback-elements">
          <div class="elements-left">Адрес: </div>
          <div class="elements-right">{{form.camAddress}}</div>
          
        </div>
        <div class="feedback-elements">
          <div class="elements-left">Модель: </div>
          <div class="elements-right">{{form.camModel}}</div>
          
        </div>
        <div id="feedback-buttons">
          <div class="buttons">Send</div>
          <div class="buttons" @click="shadow = false; form.camAddress = ''; form.camModel = ''">Close</div>
        </div>

      </div>


    <div id="map">
      <l-map
        :options="{attributionControl:false, zoomControl: true}"
        :zoom="zoom"
        :maxZoom="18"
        :maxNativeZoom="18"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
        >
  
        <l-tile-layer
          :url=url
          :attribution="attribution"
        />
        <l-marker v-for="cam in camera" :key="cam.id" :lat-lng="[cam.attributes.lat,cam.attributes.lng]" @click="showMarkerPopup(cam.id)">
          <l-icon>
            <img class="img-icon" src="@/assets/marker_cam_white.png">
          </l-icon>
        </l-marker>
      </l-map>
    </div>

    <div id="cameras">
      <div id="header">
        <div id="search"><input type="text" placeholder="Search... (address, description)" v-model="vvod" /></div>
      </div>
      <div id="all-cams">
        <AdView class="cams" />
        <div class="cams" v-for="(cam) in (camera, filteredList())" :key="cam">
            <div class="params">
              <span v-if="cam" id="address" @click="zoomUpdated(17); centerUpdated([cam.attributes.lat, cam.attributes.lng]); showMarkerPopup(cam.id)">{{cam.attributes.adress}}</span>
              
              <div class="iframe-video" v-if="cam">
                <iframe 
                  :src="cam.attributes.link_to_stream"     
                  allowfullscreen
                  frameborder="0"
                  scrolling="no"
                  v-if="cam"
                  height="100"
                >
                </iframe>
              </div>

              <span v-if="cam">{{cam.attributes.description}}</span>
              <span v-if="cam">
                <a :href="cam.attributes.link_to_camera">{{cam.attributes.camera_model}}</a>
              </span>
              <div id="get-archive">
                <span v-if="cam" class="button">
                  Получить архив записи: 
                </span>
                <a :href="`tel:${cam.attributes.hot_line_telephone}`" v-if="cam">
                  {{cam.attributes.hot_line_telephone}}
                </a>
                <div v-if="cam" class="button-div" @click="shadow = true; form.camAddress = cam.attributes.adress; form.camModel = cam.attributes.camera_model">
                  Получить архив записи 
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

  </div>

      <div class="content" v-if="isPopup && popupCam">
        <div class="icon-p">
          <Icon class="popup-icon" icon="mingcute:close-circle-fill" @click="isPopup = false" />
        </div>
        
        <div class="popup-content">{{popupCam.attributes.adress}}</div>
        <div class="iframe-video">
          <iframe 
            :src="popupCam.attributes.link_to_stream"  
            allowfullscreen
            frameborder="0"
            scrolling="no"
          >
          </iframe>
        </div>
        <div class="popup-content">{{popupCam.attributes.description}}</div>
        <div class="popup-content">{{popupCam.attributes.comment}}</div>
        <div class="popup-content">
          <div class="archive" 
          @click="shadow = true; 
          isPopup = false; 
          form.camAddress = popupCam.attributes.adress; 
          form.camModel = popupCam.attributes.camera_model"
          >
            Получить архив
          </div>
        </div>
      </div>


  <div id="mobile-all">
    <div id="map">
      <l-map
        :options="{attributionControl:false}"
        :zoom="zoom"
        :maxZoom="18"
        :maxNativeZoom="18"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
        >
  
        <l-tile-layer
          :url=url
          :attribution="attribution"
        />
        <l-marker v-for="cam in camera" :key="cam.id" :lat-lng="[cam.lat,cam.lng]" @click="showMobileMarkerPopup(cam.id)">
          <l-icon>
            <img class="img-icon" src="@/assets/marker_cam.png">
          </l-icon>
        </l-marker>
      </l-map>
    </div>
    <div id="arrows">
      <Icon @click="arrow = !arrow" v-if="arrow" icon="mdi:arrow-expand-up" />
      <Icon @click="arrow = !arrow" v-if="!arrow" icon="mdi:arrow-expand-down" style="width: 100%; background-color: #ebebeb; bottom: 0" />
    </div>
    <div id="bottom-cams-nav" v-if="!arrow">
      
      <div id="all-cams" v-if="!cam_popup">
        <div class="cams" v-for="(cam) in (camera, filteredList())" :key="cam">
          <!-- Show cameras -->
          <div class="params">
            <span v-if="cam" id="address" 
            @click="
              showMarkerPopup(cam.id); 
              zoomUpdated(17); 
              centerUpdated([cam.lat, cam.lng]); 
              popup_mobile.adress = cam.adress;
              popup_mobile.description = cam.description;
              popup_mobile.comment = cam.comment;
              popup_mobile.lat = cam.lat;
              popup_mobile.lng = cam.lng;
              popup_mobile.id = cam.id;
              cam_popup=!cam_popup;
            ">
              {{cam.adress}}
            </span>
            <iframe  
              :src="cam.link_to_stream"     
              scrolling="no" 
              allowfullscreen="allowfullscreen" 
              webkitallowfullscreen="true" 
              mozallowfullscreen="true" 
              v-if="cam"
            >
            </iframe>
            <div id="get-archive">
              <span v-if="cam" id="button" @click="shadow = true; form.camAddress = cam.adress; form.camModel = cam.camera_model">Получить архив записи: </span>
              <a :href="`tel:${cam.hot_line_telephone}`" v-if="cam">{{cam.hot_line_telephone}}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="cams-popup" v-if="cam_popup">
        <span @click="arrow=!arrow; showMarkerPopup(popup_mobile.id); zoomUpdated(17); centerUpdated([popup_mobile.lat, popup_mobile.lng]); centerUpdated([popup_mobile_cam.lat, popup_mobile_cam.lng]); cam_popup=!cam_popup;">Посмотреть на карте</span>
        {{popup_mobile.adress}},<br /> {{popup_mobile.description}},<br /> {{popup_mobile.comment}},<br /> {{popup_mobile.lat}},<br /> {{popup_mobile.lng}}<br />
        popup_mobile_cam<br />
        {{popup_mobile_cam.adress}},<br /> {{popup_mobile_cam.description}},<br /> {{popup_mobile_cam.comment}},<br /> {{popup_mobile_cam.lat}},<br /> {{popup_mobile_cam.lng}}
      </div>
      
    </div>
  </div>
  </template>
  
  <script>
  import AdView from '@/components/AdView.vue';
  import { Icon } from '@iconify/vue';
  import axios from 'axios';
  import moment from 'moment';
  import {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  } from "@vue-leaflet/vue-leaflet";
  import "leaflet/dist/leaflet.css";
  import ApiMethods from '@/api/ApiMethods';
  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon,
      Icon,
      AdView,
    },
    data() {
      return {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        bounds: null,
        zoom: 10,
        center: [10,10],
        moment,
        markers: [],
        camera: null,
        response: null,
        currentMarker: null,  
        isPopup: false,
        addCameraManual: false,
        popupId: null,
        popupCam: [],
        editLayer: null,
        mainLayer: true,
        vvod: "",
        titles: [],
        shadow: false,
        form:{
          number: '+7',
          email: '',
          date: '',
          sdate: '',
          camAddress: '',
          camModel: '',
        },
        fromDate: moment().subtract(30, "days").format('YYYY-MM-DDTHH:mm'),
        toDate: moment().subtract(-1, "days").format('YYYY-MM-DDTHH:mm'),
        get: null,
        ipaddr: null,
        totaldate: '',
        
        arrow: true,
        popup_mobile_cam: [],
        cam_popup: false,
        popup_mobile:{
          adress: '',
          description: '',
          comment: '',
          lat: '',
          lng: '',
          id: '',
        }
      };
    },
    methods: {      
      async boundsUpdated (bounds) {this.bounds = bounds;},
      async zoomUpdated (zoom) {this.zoom = zoom;},
      async centerUpdated (center) {this.center = center;},
      setEditLayer(i) {this.editLayer = i;},

      async updateData() {
        // this.camera = await ApiMethods.getCameras()
        await ApiMethods.getCameras()
        .then((response)=>{this.camera = response;})
        .catch(err => console.log(err));
        this.titles = this.camera;
      },

      makeRoute(positions) {
        for(let i = 0; i < positions.length; i++)
          {
            this.markers.push([positions[i].attributes.lat, positions[i].attributes.lng]);
          }
      },
      async showMarkerPopup(id) {
        await ApiMethods.getCameraById(id).then(r => {
          this.popupCam = r;
        });
        this.popupId = id;
        this.isPopup = true;
      },
      filteredList() {
        const addressCheck = this.titles.filter((cam) =>
        cam.attributes.adress.toLowerCase().includes(this.vvod.toLowerCase()));
        const descriptionCheck = this.titles.filter((cam) =>
        cam.attributes.description.toLowerCase().includes(this.vvod.toLowerCase()));
        const commentCheck = this.titles.filter((cam) =>
        cam.attributes.comment.toLowerCase().includes(this.vvod.toLowerCase()));
        const camModelCheck = this.titles.filter((cam) =>
        cam.attributes.camera_model.toString().toLowerCase().includes(this.vvod.toLowerCase()));
        const hotLineTelCheck = this.titles.filter((cam) =>
        cam.attributes.hot_line_telephone.toString().toLowerCase().includes(this.vvod.toLowerCase()));
        if (addressCheck.length) {
          return addressCheck;
        } else if (descriptionCheck.length) {
          return descriptionCheck;
        } else if (commentCheck.length) {
          return commentCheck;
        } else if (camModelCheck.length) {
          return camModelCheck;
        } else if (hotLineTelCheck.length) {
          return hotLineTelCheck;
        }
      },
    },
    async mounted() {
      await axios.get("https://api.sypexgeo.net/json/")
        .then(response => this.totaldate = response.data.city);
      this.center = [this.totaldate.lat, this.totaldate.lon]

      await this.updateData();
      this.makeRoute(this.camera);
    },

  };
  </script>
  <style scoped>
  /* WEB */
@media screen and (min-width: 900px){
  #mobile-all{display: none;}
  .img-icon {
    width: 20px;
    height: 33px;
  }
  #all{
    display: flex;
    flex-direction: row;
    width: 97vw;
    height: 99vh;
    margin-left: auto;
    margin-right: auto;
  }

  #feedback-content{
    margin-left: 30vw;
    margin-top: 25vh;
    position: absolute;
    display: flex;
    align-items: center;
    z-index: 9999;
    border: 3px solid #14A1D9;
    border-radius: 15px;
    background-color: white;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 15px;
    max-width: 300px;
    word-wrap: break-word;
  }
  #feedback-header{
    text-align: center;
    margin-bottom: 12px;
    font-size: 16pt;
    font-weight: bold;
    color: black;
  }
  .feedback-elements{
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .elements-left {
    width: 25%;
    font-weight: bold;
  }
  .elements-right {
    width: 75%;
    color: black;
  }
  .elements-right input {
    width: 90%;
    border: 2px solid gray;
    border-radius: 5px;
    padding: 7px;
    max-width: 300px;
  }
  #feedback-buttons{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 300px;
    width: 100%;
  }
  #feedback-buttons .buttons{
    color: white;
    background-color: #BF1162;
    font-weight: bold;
    width: 47%;
    text-align: center;
    padding: 3px;
    border-radius: 10px;
    cursor: pointer;
  }
  #feedback-buttons .buttons:hover{background-color: #bf1162c5;}
  #feedback-buttons .buttons:active{background-color: #bf116298;}
  #map{
    width: 80vw;
    border-radius: 5px;
    max-width: 80vw;
    min-width: 50vw;
  }
  #cameras{
    width: 22vw;
    padding: 10px;
    overflow: scroll;
    min-width: 300px;
  }

  .ad{
    position: fixed;
    z-index: 999999;
    bottom: 0;
    margin-right: 50px;
    width: 20vw;
  }

  #header{
    font-size: 14pt;
    font-weight: bold;
    justify-content: center;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: fixed;
    background-color: white;
    width: 20.8vw;
    margin-top: -10px;
    min-width: 300px;
  }
  #header #search{
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    border: 3px solid #14A1D9;
    border-radius: 5px;
  }
  #header input{
    border-radius: 3px;
    border: none;
    padding: 5px;
  }
  #all-cams{margin-top: 45px;}
  .cams{
    padding: 10px;
    margin: 6px;
    border-radius: 10px;
    outline: 3px solid #14A1D9;
    outline-offset: -2px;
    font-size: 10pt;
    margin-bottom: 10px;
    /* display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 300px; */
  }

  .params{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .params #address{cursor: pointer;}
  .params #address:hover{text-decoration: underline;}
  #get-archive a{font-size: 11pt;}
  .button-div{
    display: flex;
    padding: 5px;
    font-size: 12pt;
    margin-top: 10px;
    justify-content: center;
    background-color: #BF1162;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  .button-div:hover{transition: 0.3s; background-color:#8f0e4a;}
  .button-div:active{background-color:#bf116291;}
  .params span{font-size: 12pt;}

  .iframe-video{
    position: relative;
    width: 99%;
    height: 300px;
    margin-top: 1vw;
    margin-bottom: 1vw;
    z-index: 1;
  }
  .iframe-video iframe, object, embed{
    border-radius: 6px;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .content{
    overflow: scroll;
    top: 0;
    margin-top: 25vh;
    margin-left: 30vw;
    border: 2px solid #14A1D9;
    border-radius: 15px;
    padding: 20px;
    width: 18vw;
    display: flex;
    flex-direction: column;
    position: absolute;
    vertical-align: middle;
    background-color: white;
    z-index: 9999;
  }
  .icon-p{width: 100%;}
  .popup-icon{
    cursor: pointer;
    font-size: 20pt;
    color: #BF1162;
    float: right;
    text-align: right;
  }
  .popup-icon:active{color: #bf116291;}
  .content span{color: #997D8A;}
  .popup-content{
    margin-left: 5px;
    margin-bottom: 5px;
  }
  .archive{
    cursor: pointer;
    background-color: #BF1162;
    color: rgb(255, 255, 255);
    border-radius: 15px;
    font-weight: bold;
    width: 50%;
    text-align: center;
    font-size: 12pt;
    padding: 5px;
    margin-top: 10px;
  }
  .archive:hover{
    background-color: #bf11629a;
    transition: 0.5s;
  }
  .archive:active{
    background-color: #bf116234;
    transition: 5ms;
  }
}

/* MOBILE */
@media screen and (max-width: 900px){
  #all{display: none;}
  .content{display: none;}

  #mobile-all{
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  #map{
    width: 100%;
    height: 100%;
  }
  #map img{
    height: 40px;
    width: 40px;
  }
  #arrows{
    text-align: center;
    font-size: 30pt;
    position: fixed;
    width: 99vw;
    z-index: 99999;
    bottom: 0;
    color: black;
  }
  #bottom-cams-nav{
    background-color: #ebebeb;
    position: fixed;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: scroll;
    z-index: 99998;
  }
  #all-cams{
    display: flex;
    flex-direction: column;
    padding: 5px;
  }
  .cams{
    border: 3px solid #14A1D9;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .params{
    text-align: center;
  }
  .cams-popup{
    display: flex;
    flex-direction: column;
    width: 99%;
  }
}
  </style>