<template>
<div class="desktop-menu-container">
    <div class="menu-search">
        <input type="text" placeholder="Поиск мест и адресов" v-model="vvod" />
    </div>
    <div class="menu-cards" >
        <div class="ad-card">
            <text>Рекламный баннер</text>
            <img 
                v-if="ad" 
                :src="ad.attributes.link_to_pic" 
                @click="adRedirect(ad.attributes.link_to_redirect)"
            />
        </div>
        <div class="camera-card" v-for="(camera) in (camerasArray, filteredList())" :key="camera">
            <div class="camera-video">
                <svg v-if="!loadFrame" class="load-icon" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 122.315 122.88" enable-background="new 0 0 122.315 122.88" xml:space="preserve">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M94.754,14.534c8.844,0,16.014,7.17,16.014,16.012 c0,8.844-7.17,16.015-16.014,16.015c-8.843,0-16.013-7.17-16.013-16.015C78.741,21.704,85.911,14.534,94.754,14.534L94.754,14.534z M109.265,52.121c-7.205,0-13.049,5.844-13.049,13.048c0,7.207,5.844,13.049,13.049,13.051c7.207,0,13.051-5.844,13.051-13.051 C122.315,57.965,116.472,52.121,109.265,52.121L109.265,52.121z M94.135,89.903c-5.032,0-9.114,4.082-9.114,9.113 c0,5.032,4.082,9.114,9.114,9.114c5.031,0,9.113-4.082,9.113-9.114C103.248,93.985,99.166,89.903,94.135,89.903L94.135,89.903z M59.275,104.65c-5.032,0-9.114,4.081-9.114,9.113c0,5.034,4.082,9.116,9.114,9.116s9.113-4.082,9.113-9.116 C68.389,108.731,64.308,104.65,59.275,104.65L59.275,104.65z M23.652,90.86c-4.717,0-8.54,3.823-8.54,8.54 c0,4.715,3.823,8.54,8.54,8.54c4.714,0,8.538-3.825,8.538-8.54C32.19,94.684,28.366,90.86,23.652,90.86L23.652,90.86z M9.096,54.872C4.072,54.872,0,58.944,0,63.968c0,5.021,4.072,9.093,9.096,9.093c5.021,0,9.093-4.072,9.093-9.093 C18.189,58.944,14.116,54.872,9.096,54.872L9.096,54.872z M23.652,17.026c-6.354,0-11.508,5.155-11.508,11.509 s5.154,11.506,11.508,11.506s11.506-5.152,11.506-11.506S30.006,17.026,23.652,17.026L23.652,17.026z M59.341,0 c-7.651,0-13.858,6.205-13.858,13.855c0,7.651,6.207,13.856,13.858,13.856s13.856-6.205,13.856-13.856 C73.197,6.205,66.992,0,59.341,0L59.341,0z"/>
                </svg>
                <img src="../assets/cam-video.png" v-if="!loadFrame" />
                <iframe 
                    allowfullscreen 
                    :src="camera.attributes.link_to_stream"
                    :class="{noDisplay: !loadFrame}"
                ></iframe>
            </div>
            <div class="camera-description">
                <div class="camera-name-street">
                    <text class="camera-name">{{camera.attributes.description}}</text>
                    <text class="camera-street">{{camera.attributes.adress}}</text>
                </div>
                <div class="get-archive" @click="$emit('getArchive', camera.attributes.adress)">
                    <text>Получить архив записи</text>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import ApiMethods from '@/api/ApiMethods';
export default{
    props:['camerasArray', 'loadFrame'],
    data(){
        return{
            ad:'',
            vvod: '',
        }
    },
    methods:{
        adRedirect(link){
            window.location.href = `${link}`
        },
        filteredList() {
            const addressCheck = Object.values(this.camerasArray).filter((camera) => 
                camera.attributes.adress.toLowerCase().includes(this.vvod.toLowerCase()));
            const descriptionCheck = Object.values(this.camerasArray).filter((camera) => 
                camera.attributes.description.toLowerCase().includes(this.vvod.toLowerCase()));
            if (addressCheck.length) {
                return addressCheck;
            } else if (descriptionCheck.length) {
                return descriptionCheck;
            }
        },
    },
    async mounted(){
        await ApiMethods.showAd()
            .then((response) => {
                this.ad = response[0];
            })
    }
}
</script>
<style lang="scss" scoped>
.desktop-menu-container{
    // border: 1px solid black;
    width: 360px;
    height: 99vh;
    flex-direction: column;
    overflow: scroll;
    position: absolute;
    top: 0;
    right: 0;
    padding: .5vh 16px;
    background-color: #FFF; 
    z-index: 3;
}


.menu-search{
    padding: 16px;
    background-color: var(--search-background);
    border-radius: 10px;
    margin-bottom: 16px;
    input{
        width: 100%;
        border: none;
        background-color: var(--search-background);
        font-size: var(--font-14-to-rem);
        font-weight: 400;
        &:focus{
            outline: none !important;
        }
    }
}


.menu-cards{
    display: flex;
    flex-direction: column;
    gap: 24px;
    .ad-card{
        position: relative;
        border-radius: 12px;
        height: 200px;
        background-color: #EA6133;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text{
            color: white;
            font-size: var(--font-24-to-rem);
            font-weight: 600;
        }
        img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 12px;
        }
    }
    .camera-card{
        border-radius: 16px;
        height: 330px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: var(--card-background);
        .camera-video{
            position: relative;
            height: 200px;
            width: 100%;
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
        .camera-description{
            padding: 16px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .camera-name-street{
                display: flex;
                flex-direction: column;
                .camera-name{
                    color: var(--card-title-color);
                    font-size: 1rem;
                    font-weight: 600;
                }
                .camera-street{
                    color: var(--card-street-color);
                    font-size: var(--font-12-to-rem);
                    font-weight: 400;
                }
            }
            .get-archive{
                background-color: var(--card-button-background);
                border-radius: 8px;
                padding: 8px 0px;
                text-align: center;
                &:hover{
                    cursor: pointer;
                    background: var(--card-button-background-hover);
                }
                &:active{
                    background: var(--card-button-background-active);
                }
                text{
                    color: white;
                    font-size: var(--font-14-to-rem);
                    font-weight: 600;
                }
            }
        }
    }
}
</style>