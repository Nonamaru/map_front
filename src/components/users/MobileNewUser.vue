<template>
<div class="mobile-container">
    <TopMenu
        @getArchive = "(i) => {markerPopup.street = i; popup.isOpen = true}"
        @closeModal = "(i) => markerPopup.isOpen = i"
        :camerasArray="cameras"
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
            <l-marker 
                :lat-lng="[56.855193, 60.657277]" 
                @click="
                    markerPopup.isOpen=!markerPopup.isOpen;
                    markerPopup.picture='cam-video';
                    markerPopup.iframeLink = '';
                    markerPopup.title='Главный офис К Телеком';
                    markerPopup.street='ул. Кулибина, 2, микрорайон Втузгородок (этаж 4)';
                    centralOffice = true;
                "
            >
                <l-icon
                    :icon-anchor="dynamicAnchor"
                    :icon-size="dynamicSize"
                >
                    <img style="width: 38px; height: 54px;" src="@/assets/k-telecom.svg" />
                </l-icon>
            </l-marker>

            <l-marker 
                v-for="camera in cameras" :key="camera" 
                :lat-lng="[camera.attributes.lat, camera.attributes.lng]"
                @click="
                    markerPopup.isOpen = !markerPopup.isOpen;
                    markerPopup.picture = 'cam-video';
                    markerPopup.iframeLink = camera.attributes.link_to_stream;
                    markerPopup.title = camera.attributes.description;
                    markerPopup.street = camera.attributes.adress;
                    centralOffice = false;
                "
            >
                <l-icon
                    :icon-anchor="dynamicAnchor"
                    :icon-size="dynamicSize"
                >
                    <img style="width: 38px; height: 54px;" src="@/assets/master.svg" />
                </l-icon>
            </l-marker>
        </l-map>
    </div>
    <div class="openMarker" v-if="markerPopup.isOpen">
        <div class="picture">
            <div class="close-modal" @click="markerPopup.isOpen=!markerPopup.isOpen">
                <svg class="close-icon" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_1849_345)">
                        <path d="M17 7L9 15M9 7L17 15" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                        <filter id="filter0_d_1849_345" x="-3" y="-3" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="2"/>
                            <feGaussianBlur stdDeviation="4"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0.260242 0 0 0 0 0.258958 0 0 0 0 0.275 0 0 0 0.12 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1849_345"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1849_345" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            </div>
            <img src="@/assets/cam-video.png" v-if="centralOffice" />
            <img src="@/assets/cam-video.png" v-if="!iframeLoaded && !centralOffice"/>
            <svg v-if="!iframeLoaded && !centralOffice" class="load-icon" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 122.315 122.88" enable-background="new 0 0 122.315 122.88" xml:space="preserve">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M94.754,14.534c8.844,0,16.014,7.17,16.014,16.012 c0,8.844-7.17,16.015-16.014,16.015c-8.843,0-16.013-7.17-16.013-16.015C78.741,21.704,85.911,14.534,94.754,14.534L94.754,14.534z M109.265,52.121c-7.205,0-13.049,5.844-13.049,13.048c0,7.207,5.844,13.049,13.049,13.051c7.207,0,13.051-5.844,13.051-13.051 C122.315,57.965,116.472,52.121,109.265,52.121L109.265,52.121z M94.135,89.903c-5.032,0-9.114,4.082-9.114,9.113 c0,5.032,4.082,9.114,9.114,9.114c5.031,0,9.113-4.082,9.113-9.114C103.248,93.985,99.166,89.903,94.135,89.903L94.135,89.903z M59.275,104.65c-5.032,0-9.114,4.081-9.114,9.113c0,5.034,4.082,9.116,9.114,9.116s9.113-4.082,9.113-9.116 C68.389,108.731,64.308,104.65,59.275,104.65L59.275,104.65z M23.652,90.86c-4.717,0-8.54,3.823-8.54,8.54 c0,4.715,3.823,8.54,8.54,8.54c4.714,0,8.538-3.825,8.538-8.54C32.19,94.684,28.366,90.86,23.652,90.86L23.652,90.86z M9.096,54.872C4.072,54.872,0,58.944,0,63.968c0,5.021,4.072,9.093,9.096,9.093c5.021,0,9.093-4.072,9.093-9.093 C18.189,58.944,14.116,54.872,9.096,54.872L9.096,54.872z M23.652,17.026c-6.354,0-11.508,5.155-11.508,11.509 s5.154,11.506,11.508,11.506s11.506-5.152,11.506-11.506S30.006,17.026,23.652,17.026L23.652,17.026z M59.341,0 c-7.651,0-13.858,6.205-13.858,13.855c0,7.651,6.207,13.856,13.858,13.856s13.856-6.205,13.856-13.856 C73.197,6.205,66.992,0,59.341,0L59.341,0z"/>
            </svg>
            <iframe 
                allowfullscreen 
                :src="markerPopup.iframeLink"
                :class="{noDisplay: !iframeLoaded}"
                @load="onLoad()"
                v-if="!centralOffice"
            ></iframe>
        </div>
        <div class="text">
            <text class="title">{{markerPopup.title}}</text>
            <text class="street">{{markerPopup.street}}</text>
            <div class="button" v-if="markerPopup.iframeLink" @click="popup.isOpen = true">
                <text>Получить архив записи</text>
            </div>
        </div>
    </div>
    <OpenPopup
        v-if="popup.isOpen"
        @close = "(i) => popup.isOpen = i"
        :address_input="markerPopup.street"
    />
</div>
</template>
<script>
import TopMenu from '@/components/TopMenu.vue';
import OpenPopup from '@/components/OpenPopup.vue';
import axios from 'axios';
import ApiMethods from '@/api/ApiMethods';
import { 
    LMap, 
    LTileLayer, 
    LMarker, 
    LIcon, 
    LControlLayers,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
export default {
    components:{
        TopMenu,
        OpenPopup,
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
        LControlLayers,
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
            markerPopup:{
                isOpen: false,
                iframeLink: '',
                title: 'Главный офис К Телеком',
                street: 'ул. Кулибина, 2, микрорайон Втузгородок (этаж 4)',
            },
            cameras: '',
            iframeLoaded: false,
            centralOffice: false,
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
        },
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
/*MOBILE*/
@media screen and (max-width: 900px) {
.desktop-container{display: none;}
.mobile-container{
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

.openMarker{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 3;
    background-color: white;
    border-radius: 16px 16px 0px 0px;
    .picture{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .close-modal{
            position: absolute;
            cursor: pointer;
            top: 12px;
            right: 12px;
            width: 16px;
            height: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            padding: 4px;
            background: var(--colors-black-80, rgba(45, 45, 45, 0.80));
            .close-icon{
                width: 24px;
                height: 24px;
                position: absolute;
                top: 60%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        img{
            border-radius: 16px 16px 0px 0px;
            width: 100%;
            height: 100%;
        }
        .load-icon{
            animation: load 2s infinite linear;
            position: absolute;
            fill: white;
        }
        @keyframes load {
            100% {transform: rotate(360deg);}
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
    .text{
        padding: 12px;
        display: flex;
        flex-direction: column;
        .title{
            font-size: 1rem;
            font-weight: 600;
            color: var(--card-title-color);
        }
        .street{
            font-size: var(--font-12-to-rem);
            font-weight: 400;
            letter-spacing: 0.048px;
            color: var(--card-street-color);
        }
    }
    .button{
        padding: 8px;
        background-color: var(--card-button-background);
        border-radius: 8px;
        text-align: center;
        margin-top: 16px;
        user-select: none;
        &:active{
            background-color: var(--card-button-background-active);
        }
        text{
            font-size: var(--font-14-to-rem);
            font-weight: 600;
            color: white;
            &:active{
                color: rgba(128, 128, 128, 0.425);
            }
        }
    }
}
}
/*------*/
</style>