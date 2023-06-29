<template>
<div id="all">
  <AdEditor v-if="AdEditor" @AdEdit='AdEditorChild' />
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
      @click="addMarker"
    >
      <l-tile-layer 
        @click="addMarker"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <l-marker v-for="cam in camera" :key="cam.id" :lat-lng="[cam.attributes.lat,cam.attributes.lng]" @click="showMarkerPopup(cam.id)">
      </l-marker>
      <l-marker v-if="currentMarker" :lat-lng="currentMarker">
      </l-marker>
    </l-map>
  </div>
  <div id="cameras">
    <!-- Add camera manual -->
    <div id="header">
      <div class="icon-pointer" @click="(AdEditor = !AdEditor)">Edit <font-awesome-icon icon="fa-solid fa-rectangle-ad" /></div>
      <div class="icon-pointer" @click="addCameraManual=!addCameraManual">Add&nbsp;<font-awesome-icon icon="fa-solid fa-camera" /></div>
      <div class="icon-pointer" @click="search = !search"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></div>
      <transition name="search">
        <input type="text" placeholder="Search..." v-if="search" v-model="vvod" />
      </transition>
    </div>
    <transition name="manual">
    <div class="add-сamera-manual" v-if="addCameraManual">
      <span>Широта: </span>
      <input type="text" v-model="freeform.lat" placeholder="Широта" />
      <span>Долгота: </span>
      <input type="text" v-model="freeform.lng" placeholder="Долгота" />
      <span>Адрес: </span>
      <input type="text" v-model="freeform.address" placeholder="Адрес" />
      <span>Описание: </span>
      <input type="text" v-model="freeform.description" placeholder="Описание" />
      <span>Комментарий: </span>
      <input type="text" v-model="freeform.comment" placeholder="Комментарий" />
      <span>Ссылка на видеопоток: </span>
      <input type="text" v-model="freeform.link_to_stream" placeholder="Ссылка на стрим" />
      <span>Ссылка на камеру: </span>
      <input type="text" v-model="freeform.link_to_camera" placeholder="Ссылка на камеру" />
      <span>Модель камеры: </span>
      <input type="text" v-model="freeform.camera_model" placeholder="Модель камеры" />
      <span>Телефон обратной связи: </span>
      <input type="text" v-model="freeform.hot_line_telephone" placeholder="Телефон обратной связи" />
      <button @click="addFreeCamera()">Submit</button>
    </div>
    </transition>
    <!-- Add camera from map click -->
    <div v-if="form.lat && form.lng" id="add-camera">
      <span>Описание: </span>
      <input type="text" v-model="form.description" placeholder="Описание" /><br />
      <span>Комментарий: </span>
      <input type="text" v-model="form.comment" placeholder="Комментарий" /><br />
      <span>Ссылка на видеопоток: </span>
      <input type="text" v-model="form.link_to_stream" placeholder="Ссылка на стрим" /><br />
      <span>Ссылка на камеру: </span>
      <input type="text" v-model="form.link_to_camera" placeholder="Ссылка на камеру" /><br />
      <span>Модель камеры: </span>
      <input type="text" v-model="form.camera_model" placeholder="Модель камеры" /><br />
      <span>Телефон обратной связи: </span>
      <input type="text" v-model="form.hot_line_telephone" placeholder="Телефон обратной связи" /><br />
      <button @click="sendData()">Submit</button>
      <button @click="form.lat=''; form.lng=''; currentMarker = null">Close</button>
    </div>
    
<div id="all-cams">
  <div v-show="form.lat=='' && form.lng=='' && currentMarker == null">
    <AdView class="cams" />
    <div class="cams" v-for="(cam, index) in (camera, filteredList())" :key="cam">
      <div class="group" v-if="editLayer === index">
        <!-- Edit camera layer -->
        <div class="params-manual">
          <span>Широта: </span>
          <input type='text' v-model="cam.attributes.lat" />
          <span>Долгота: </span>
          <input type='text' v-model="cam.attributes.lng" />
          <span>Адрес: </span>
          <input type='text' v-model="cam.attributes.adress" />
          <span>Описание: </span>
          <input type='text' v-model="cam.attributes.description" />
          <span>Комментарий: </span>
          <input type='text' v-model="cam.attributes.comment" />
          <span>Ссылка на видеопоток: </span>
          <input type='text' v-model="cam.attributes.link_to_stream" />
          <span>Ссылка на камеру: </span>
          <input type='text' v-model="cam.attributes.link_to_camera" />
          <span>Модель камеры: </span>
          <input type='text' v-model="cam.attributes.camera_model" />
          <span>Телефон обратной связи: </span>
          <input type='text' v-model="cam.attributes.hot_line_telephone" />
        </div>
        <div id="edit-buttons">
          <button @click="editCam(cam)">submit</button>
          <button @click="setEditLayer(null)">close</button>
        </div>
      </div>

      <!-- Show cameras -->
      <div class="group" v-if="editLayer !== index">
        <div class="params">
            <span v-if="cam" id="address" @click="zoomUpdated(17); centerUpdated([cam.attributes.lat, cam.attributes.lng])">{{cam.attributes.adress}}</span>
            <iframe  :src="cam.attributes.link_to_stream"     
            scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" 
            mozallowfullscreen="true" v-if="cam"></iframe>
            <span v-if="cam">{{cam.attributes.description}}</span>
            <span v-if="cam">{{cam.attributes.comment}}</span>  
            <span v-if="cam"><a :href="cam.attributes.link_to_camera">"{{cam.attributes.camera_model}}"</a></span>
            <span v-if="cam">Получить архив записи: <a :href="`tel:${cam.attributes.hot_line_telephone}`">{{cam.attributes.hot_line_telephone}}</a></span>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="settings">
        <font-awesome-icon class="icon" icon="fa-solid fa-pen-to-square" @click="setEditLayer(index)" />
        <font-awesome-icon class="icon" icon="fa-solid fa-trash" @click="deleteCamera(cam.id)" />
      </div>
    </div>
  </div>
</div>
  </div>
</div>

  
  <div class="popup" v-if="isPopup">
    <div class="content" v-if="popupCam">
      <button @click="isPopup = false">Close</button>
      <span>Adress:</span>
      <div class="popup-content">{{popupCam.adress}}</div>
      <iframe  :src="popupCam.link_to_stream"  
          style="width: 320px; height: 180px; border: 0px"   
          scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" 
          mozallowfullscreen="true" ></iframe>
      <span>Description:</span>
      <div class="popup-content">{{popupCam.description}}</div>
      <span>Comment:</span>
      <div class="popup-content">{{popupCam.comment}}</div>
      <div class="popup-content">{{popupCam.link_to_camera}}</div>
      <div class="popup-content">{{popupCam.camera_model}}</div>
      <div class="popup-content">{{popupCam.hot_line_telephone}}</div>
    </div>
  </div>
</template>

<script>
import AdEditor from '@/components/AdEditor.vue'
import AdView from '@/components/AdView.vue';
import {
  LMap,
  LTileLayer,
  LMarker,
} from "@vue-leaflet/vue-leaflet";
import ApiMethods from '@/api/ApiMethods';
import "leaflet/dist/leaflet.css";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    AdView,
    AdEditor,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      bounds: null,
      zoom: 10,
      center: [56.900016, 60.563729],
      markers: [],
      camera: null,
      form: {
        lat: '',
        lng: '',
        description: '',
        comment: '',
        link_to_stream: '',
        link_to_camera: '',
        camera_model: '',
        hot_line_telephone: '',
      },
      freeform: {
        lat: '',
        lng: '',
        address: '',
        description: '',
        comment: '',
        link_to_stream: '',
        link_to_camera: '',
        camera_model: '',
        hot_line_telephone: '',
      },
      AdEditor: false,
      ad: {
        title: '',
        description: '',
        img: '',
      },
      response: null,
      currentMarker: null,  
      isPopup: false,
      addCameraManual: false,
      popupId: null,
      popupCam: [],
      editLayer: null,
      mainLayer: true,
      search: false,
      vvod: "",
      titles: [],
    };
  },
  methods: {
    AdEditorChild () {this.AdEditor = !this.AdEditor},

    async boundsUpdated (bounds) {this.bounds = bounds;},
    async zoomUpdated (zoom) {this.zoom = zoom;},
    async centerUpdated (center) {this.center = center;},
    setEditLayer(i) {this.editLayer = i;},

    async editCam(cam) {
      await ApiMethods.editCamerasManual(cam);
      this.editLayer = null;
    },
    async addFreeCamera(){
      await ApiMethods.addCamerasManual(this.freeform).then(() => {
        this.freeform.lat = '';
        this.freeform.lng = '';
        this.freeform.address = '';
        this.freeform.description = '';
        this.freeform.comment = '';
        this.freeform.link_to_stream = '';
        this.freeform.link_to_camera = '';
        this.freeform.camera_model = '';
        this.freeform.hot_line_telephone = '';
        this.updateData();
      });
    },
    async addMarker(event) {
      this.currentMarker = event.latlng;
      this.form.lat = event.latlng.lat
      this.form.lng = event.latlng.lng
    },
    async sendData() {
      this.response = await ApiMethods.addCameras(this.form).then(()=> {
        this.updateData();
        this.markers.push([this.form.lat, this.form.lng]);
        this.form.lat = '';
        this.form.lng = '';
        this.currentMarker = null;
        this.form.selected_address = '';
        this.form.description = '';
        this.form.comment = '';
        this.form.link_to_stream = '';
        this.form.link_to_camera = '';
        this.form.camera_model = '';
        this.form.hot_line_telephone = '';
      });
    },
    async updateData() {
      this.camera = await ApiMethods.getCameras();
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
    async deleteCamera(id) {
      await ApiMethods.deleteCameras(id);
      let i = this.camera.map(item => item.id).indexOf(id) 
      this.camera.splice(i, 1)
    },
    filteredList() {
      const addressCheck = this.titles.filter((cam) =>
      cam.adress.toLowerCase().includes(this.vvod.toLowerCase()));
      const descriptionCheck = this.titles.filter((cam) =>
      cam.description.toLowerCase().includes(this.vvod.toLowerCase()));
      const commentCheck = this.titles.filter((cam) =>
      cam.comment.toLowerCase().includes(this.vvod.toLowerCase()));
      const camModelCheck = this.titles.filter((cam) =>
      cam.camera_model.toString().toLowerCase().includes(this.vvod.toLowerCase()));
      const hotLineTelCheck = this.titles.filter((cam) =>
      cam.hot_line_telephone.toString().toLowerCase().includes(this.vvod.toLowerCase()));
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
    await this.updateData();
    this.makeRoute(this.camera);
  },
};
</script>
<style scoped>
/* Animations */
.search-enter-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.search-leave-active {
  transition: all .3s ease; 
}
.search-enter, .search-leave-to{
  transform: translateX(-10px);
  opacity: 0;
}

.manual-enter-active {
  transition: all .8s ease;
}
.manual-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.manual-enter, .manual-leave-to{
  transform: translateY(-10px);
  opacity: 0;
}
/* Static */
.img-icon{
  width: 20px;
  height: 40px;
}

.icon-pointer{ cursor: pointer; }

#all{
  display: flex;
  flex-direction: row;
  width: 97vw;
  height: 99vh;
  margin-left: auto;
  margin-right: auto;
}
#map{
  width: 70vw;
  border-radius: 5px;
}
#cameras{
  width: 30vw;
  padding: 10px;
  overflow: scroll;
}
.cams{
  box-shadow: -1px 4px 6px -1px rgba(0,0,0,0.55);
  padding: 10px;
  margin: 6px;
  border-radius: 10px;
  font-size: 10pt;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.params-manual input{
  border-radius: 5px;
  border: none;
  background-color: lightgray;
  padding: 5px;
  margin-bottom: 5px;
  width: 98%;
  color: rgb(97, 97, 97);
}
#edit-buttons{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
#edit-buttons button{
  width: 45%;
  font-weight: bold;
  border: none;
  border-radius: 5px;
}
#add-camera{
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  margin-top: 45px;
  justify-content: center;
}
#add-camera input{
  border-radius: 5px;
  border: none;
  background-color: lightgray;
  padding: 5px;
  margin-bottom: 5px;
  width: 98%;
}
#add-camera button{
  width: 45%;
  border: none;
  border-radius: 5px;
  margin: 5px;
  font-weight: bold;
}
#header{
  margin-bottom: 20px;
  font-size: 14pt;
  font-weight: bold;
  justify-content: center;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: fixed;
  background-color: white;
  width: 28.7vw;
  margin-top: -10px;
}
#header div{
  margin-right: 20px;
  margin-bottom: 15px;
}
#header div:hover{color: #750b3d;}
#header div:active{color: #BF1162;}
#header input{
  border-radius: 3px;
  border: none;
  padding: 5px;
  margin-bottom: 10px;
}

#all-cams{margin-top: 45px;}

.group{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  
}
.params{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.params span{
  font-size: 12pt;
}
.params #address{
  cursor: pointer;
}
.params #address:hover{
  text-decoration: underline;
}
.params iframe{
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  border-radius: 3px;
}
.settings{
  display: flex;
  flex-direction: column;
  font-size: 14pt;
  width: 10%;
  height: auto;
}
.settings .icon{
  margin-bottom: 10px;
}
.icon:hover{
  color: #750b3d;;
}
.icon:active{
  color: #BF1162;
}
.ad{
  position: fixed;
  z-index: 999999;
  bottom: 0;
  width: 28.3vw;
  min-width: 310px;
}
.popup{
  background-color: rgba(95, 95, 95, 0.685);
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.popup .content{
  background-color: #b4b4b4;
  overflow: scroll;
  border: 2px solid #403439;
  border-radius: 15px;
  padding: 20px;
  width: 25vw;
  display: flex;
  flex-direction: column;
  position: absolute;
  vertical-align: middle;
}
.content button{
  font-weight: bold;
  right: 0;
  border: none;
  border-radius: 5px;
  font-weight: bold;
}
.content iframe{
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
}
.content span{
  color: #997D8A;
}
.popup-content{
  margin-left: 5px;
  margin-bottom: 5px;
}

.add-сamera-manual{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: fixed;
  width: 28.7vw;
  margin-top: 29px;
  background-color: #ebebeb;
  border-bottom: 1px solid black;
}
.add-сamera-manual input{
  border: none;
  border-radius: 5px;
  margin-bottom: 7px;
  padding: 6px;
  background-color: lightgray;
}
.add-сamera-manual button{
  border: none;
  border-radius: 5px;
  padding: 6px;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>