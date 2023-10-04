<template>
<div class="mobile-container">
    <TopMenu
        @getArchive = "(i) => {popup.address = i; popup.isOpen = true}"
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
            <l-marker :lat-lng="[56.855193, 60.657277]">
                <l-icon
                    :icon-anchor="dynamicAnchor"
                    :icon-size="dynamicSize"
                    @click="openMarker=true"
                >
                    <img style="width: 38px; height: 54px;" src="@/assets/k-telecom.svg" />
                </l-icon>
            </l-marker>

            <l-marker v-for="camera in cameras" :key="camera" :lat-lng="[camera.attributes.lat, camera.attributes.lng]">
                <l-icon
                    :icon-anchor="dynamicAnchor"
                    :icon-size="dynamicSize"
                >
                    <img style="width: 38px; height: 54px;" src="@/assets/master.svg" />
                </l-icon>
            </l-marker>
        </l-map>
    </div>
    
    <!-- <OpenPopup
        v-if="popup.isOpen"
        @close = "(i) => popup.isOpen = i"
        :address_input="popup.address"
    /> -->
</div>
</template>
<script>
import TopMenu from '@/components/TopMenu.vue';
// import OpenPopup from '@/components/OpenPopup.vue';
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
            openMarker:{
                isOpen: false,
                picture: '',
                title: '',
                address: '',
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

}
/*------*/
</style>