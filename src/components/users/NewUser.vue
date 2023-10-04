<template>
<div class="desktop-container" >
    <RightMenu
        @getArchive = "(i) => {popup.address = i; popup.isOpen = true}"
        :camerasArray="cameras"
        :loadFrame="iframeLoaded"
        v-if="screen"
    />
    <div class="map">
        <l-map
            :options="{attributionControl:false, zoomControl:false}"
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
            ></l-tile-layer>
            <l-control-layers />
            <l-marker :lat-lng="[56.855193, 60.657277]">
                <l-popup>
                    <div class="l-popup">
                        <div class="l-image-top">
                            <img src="@/assets/cam-video.png" />
                        </div>
                        <div class="l-popup-container-clicked">
                            <text class="l-popup-title">Главный офис К Телеком</text>
                            <text class="l-popup-street">ул. Кулибина, 2, микрорайон Втузгородок (этаж 4)</text>
                        </div>
                    </div>
                </l-popup>
                <l-icon
                    :icon-anchor="dynamicAnchor"
                    :icon-size="dynamicSize"
                >
                    <img style="width: 38px; height: 54px;" src="@/assets/k-telecom.svg" />
                </l-icon>
                <l-tooltip>
                    <div class="l-popup-container-hovered">
                        <text class="l-popup-title">Главный офис К Телеком</text>
                        <text class="l-popup-street">ул. Кулибина, 2, микрорайон Втузгородок (этаж 4)</text>
                    </div>
                </l-tooltip>
            </l-marker>
            <l-marker v-for="camera in cameras" :key="camera" :lat-lng="[camera.attributes.lat, camera.attributes.lng]">
                <l-popup>
                    <div class="l-popup">
                        <div class="l-image-top">
                            <svg v-if="!iframeLoaded" class="load-icon" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 122.315 122.88" enable-background="new 0 0 122.315 122.88" xml:space="preserve">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M94.754,14.534c8.844,0,16.014,7.17,16.014,16.012 c0,8.844-7.17,16.015-16.014,16.015c-8.843,0-16.013-7.17-16.013-16.015C78.741,21.704,85.911,14.534,94.754,14.534L94.754,14.534z M109.265,52.121c-7.205,0-13.049,5.844-13.049,13.048c0,7.207,5.844,13.049,13.049,13.051c7.207,0,13.051-5.844,13.051-13.051 C122.315,57.965,116.472,52.121,109.265,52.121L109.265,52.121z M94.135,89.903c-5.032,0-9.114,4.082-9.114,9.113 c0,5.032,4.082,9.114,9.114,9.114c5.031,0,9.113-4.082,9.113-9.114C103.248,93.985,99.166,89.903,94.135,89.903L94.135,89.903z M59.275,104.65c-5.032,0-9.114,4.081-9.114,9.113c0,5.034,4.082,9.116,9.114,9.116s9.113-4.082,9.113-9.116 C68.389,108.731,64.308,104.65,59.275,104.65L59.275,104.65z M23.652,90.86c-4.717,0-8.54,3.823-8.54,8.54 c0,4.715,3.823,8.54,8.54,8.54c4.714,0,8.538-3.825,8.538-8.54C32.19,94.684,28.366,90.86,23.652,90.86L23.652,90.86z M9.096,54.872C4.072,54.872,0,58.944,0,63.968c0,5.021,4.072,9.093,9.096,9.093c5.021,0,9.093-4.072,9.093-9.093 C18.189,58.944,14.116,54.872,9.096,54.872L9.096,54.872z M23.652,17.026c-6.354,0-11.508,5.155-11.508,11.509 s5.154,11.506,11.508,11.506s11.506-5.152,11.506-11.506S30.006,17.026,23.652,17.026L23.652,17.026z M59.341,0 c-7.651,0-13.858,6.205-13.858,13.855c0,7.651,6.207,13.856,13.858,13.856s13.856-6.205,13.856-13.856 C73.197,6.205,66.992,0,59.341,0L59.341,0z"/>
                            </svg>
                            <img src="@/assets/cam-video.png" v-if="!iframeLoaded" />
                            <iframe 
                                v-if="screen"
                                allowfullscreen 
                                :src="camera.attributes.link_to_stream"
                                @load="onLoad()"
                                :class="{noDisplay: !iframeLoaded}"
                            ></iframe>
                        </div>
                        <div class="l-popup-container-clicked">
                            <text class="l-popup-title">{{camera.attributes.description}}</text>
                            <text class="l-popup-street">{{camera.attributes.adress}}</text>
                        </div>
                        <div class="l-popup-button" @click="popup.address = camera.attributes.adress; popup.isOpen = true">
                            <text>Получить архив записи</text>
                        </div>
                    </div>
                </l-popup>
                <l-icon
                    :icon-anchor="dynamicAnchor"
                    :icon-size="dynamicSize"
                >
                    <img style="width: 38px; height: 54px;" src="@/assets/master.svg" />
                </l-icon>
                <l-tooltip>
                    <div class="l-popup-container-hovered">
                        <text class="l-popup-title">{{camera.attributes.description}}</text>
                        <text class="l-popup-street">{{camera.attributes.adress}}</text>
                    </div>
                </l-tooltip>
            </l-marker>
        </l-map>
    </div>
    <OpenPopup
        v-if="popup.isOpen"
        @close = "(i) => popup.isOpen = i"
        :address_input="popup.address"
    />
</div>
</template>
<script>
import RightMenu from '@/components/RightMenu.vue';
import OpenPopup from '@/components/OpenPopup.vue';
import axios from 'axios';
import ApiMethods from '@/api/ApiMethods';
import { 
    LMap, 
    LTileLayer, 
    LMarker, 
    LIcon, 
    LPopup,
    LControlLayers,
    LTooltip
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
export default {
    components:{
        RightMenu,
        OpenPopup,
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
        LPopup,
        LControlLayers,
        LTooltip
    },
    props:['screen'],
    data(){
        return{
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            bounds: null,
            zoom: 12,
            center: [56.838010, 60.597465],
            iconSize: 38,
            popup:{
                isOpen: false,
                address: ''
            },
            cameras: '',
            iframeLoaded: false,
            screenWidth: true,
        }
    },
    methods:{
        async boundsUpdated (bounds) {this.bounds = bounds;},
        async zoomUpdated (zoom) {this.zoom = zoom;},
        async centerUpdated (center) {this.center = center;},
        
        async updateData() {
            await ApiMethods.getCameras()
                .then((response)=>{this.cameras = response;})
                .catch(err => console.log(err));
        },
        onLoad(){
            this.iframeLoaded = true;
        }

    },
    async mounted(){
        if (!localStorage.getItem('geoLat') && !localStorage.getItem('geoLon')){
            await axios.get("https://api.sypexgeo.net/json/")
                .then(response => {
                    localStorage.setItem('geoLat', response.data.city.lat);
                    localStorage.setItem('geoLon', response.data.city.lon);
                    this.center = [response.data.city.lat, response.data.city.lon]
                });
        } else {
            this.center = [localStorage.getItem('geoLat'), localStorage.getItem('geoLon')]
        }
        
        await this.updateData();
    },
    computed: {
        dynamicSize () {
            // return [this.iconSize, this.iconSize * 1.15];
            return [this.iconSize, this.iconSize * 1.15];
        },
        dynamicAnchor () {
            // return [this.iconSize / 2, this.iconSize * 1];
            return [this.iconSize / 2, this.iconSize * 0.5];
        }
    }
}
</script>
<style lang="scss" scoped>
/*DESKTOP*/
@media screen and (min-width: 900px){
.mobile-container{display: none;}
.desktop-container{
    width: 100vw;
    height: 100vh;
    background-color: rgb(238, 238, 238);
    position: relative;
}
.map{
    width: 100%;
    height: 100%;
    z-index: 2;
    position: relative;
}

.l-popup{
    position: relative;
    z-index: 5;
    // width: 100%;
    padding-bottom: 16px;
    .l-image-top{
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .load-icon{
            animation: load 2s infinite linear;
            position: absolute;
            fill: white;
        }
        @keyframes load {
            100% {transform: rotate(360deg);}
        }
        img{
            object-fit: contain;
            border-radius: 16px 16px 0px 0px;
            width: 100%;
            height: 100%;
        }
        .noDisplay{
            display: none;
        }
        iframe{
            border-radius: 16px 16px 0px 0px;
            width: 100%;
            height: 200px;
            border: none;
        }
    }
    .l-popup-container-clicked{
        display: flex;
        flex-direction: column;
        padding: 8px 12px !important;
        .l-popup-title{
            color: var(--card-title-color);
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .l-popup-street{
            color: var(--card-street-color);
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: var(--font-12-to-rem);
            font-weight: 400;
        }
    }
    .l-popup-button{
        border-radius: 8px;
        padding: 8px;
        background-color: var(--card-button-background);
        color: white;
        font-size: var(--font-14-to-rem);
        font-weight: 600;
        text-align: center;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        &:hover{
            cursor: pointer;
            background: var(--card-button-background-hover);
        }
        &:active{
            background: var(--card-button-background-active);
        }
    }
}
.l-popup-container-hovered{
    display: flex;
    flex-direction: column;
    .l-popup-title{
        color: var(--card-title-color);
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 4px;
    }
    .l-popup-street{
        color: var(--card-street-color);
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: var(--font-12-to-rem);
        font-weight: 400;
    }
}
}
/*-------*/
</style>