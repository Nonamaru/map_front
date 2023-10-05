<template>
<div class="menu-container">
    <div class="menu-top">
        <div class="burger">
            <Transition name="burger">
            <svg @click="menuOpen = !menuOpen; $emit('closeModal', false)" v-if="!menuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="#2D2D2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </Transition>
            <Transition name="burger">
            <svg @click="menuOpen = !menuOpen" v-if="menuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.92864 17.6569C4.53811 18.0474 4.53811 18.6806 4.92864 19.0711C5.31916 19.4616 5.95232 19.4616 6.34285 19.0711L12.1818 13.2321L18.0208 19.0711C18.4113 19.4616 19.0445 19.4616 19.435 19.0711C19.8256 18.6806 19.8256 18.0474 19.435 17.6569L13.596 11.8179L19.0708 6.34315C19.4613 5.95263 19.4613 5.31946 19.0708 4.92894C18.6802 4.53842 18.0471 4.53842 17.6566 4.92894L12.1818 10.4037L6.70711 4.92894C6.31658 4.53842 5.68342 4.53842 5.29289 4.92894C4.90237 5.31947 4.90237 5.95263 5.29289 6.34316L10.7676 11.8179L4.92864 17.6569Z" fill="#2D2D2D"/>
            </svg> 
            </Transition>
        </div>
        <div class="search">
            <input type="text" placeholder="Поиск мест и адресов" v-model="vvod" />
        </div>
    </div>
    <Transition name="camerasMenu">
    <div class="opened-menu" v-if="menuOpen">
        <div class="ad-banner">
            <text>Рекламный баннер</text>
            <img 
                v-if="ad" 
                :src="ad.attributes.link_to_pic" 
                @click="adRedirect(ad.attributes.link_to_redirect)"
            />
        </div>
        <div class="camera-card" v-for="(camera) in (camerasArray, filteredList())" :key="camera">
            <div class="camera-video">
                <img src="@/assets/cam-video.png" v-if="!iframeLoaded"/>
                <svg v-if="!iframeLoaded" class="load-icon" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 122.315 122.88" enable-background="new 0 0 122.315 122.88" xml:space="preserve">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M94.754,14.534c8.844,0,16.014,7.17,16.014,16.012 c0,8.844-7.17,16.015-16.014,16.015c-8.843,0-16.013-7.17-16.013-16.015C78.741,21.704,85.911,14.534,94.754,14.534L94.754,14.534z M109.265,52.121c-7.205,0-13.049,5.844-13.049,13.048c0,7.207,5.844,13.049,13.049,13.051c7.207,0,13.051-5.844,13.051-13.051 C122.315,57.965,116.472,52.121,109.265,52.121L109.265,52.121z M94.135,89.903c-5.032,0-9.114,4.082-9.114,9.113 c0,5.032,4.082,9.114,9.114,9.114c5.031,0,9.113-4.082,9.113-9.114C103.248,93.985,99.166,89.903,94.135,89.903L94.135,89.903z M59.275,104.65c-5.032,0-9.114,4.081-9.114,9.113c0,5.034,4.082,9.116,9.114,9.116s9.113-4.082,9.113-9.116 C68.389,108.731,64.308,104.65,59.275,104.65L59.275,104.65z M23.652,90.86c-4.717,0-8.54,3.823-8.54,8.54 c0,4.715,3.823,8.54,8.54,8.54c4.714,0,8.538-3.825,8.538-8.54C32.19,94.684,28.366,90.86,23.652,90.86L23.652,90.86z M9.096,54.872C4.072,54.872,0,58.944,0,63.968c0,5.021,4.072,9.093,9.096,9.093c5.021,0,9.093-4.072,9.093-9.093 C18.189,58.944,14.116,54.872,9.096,54.872L9.096,54.872z M23.652,17.026c-6.354,0-11.508,5.155-11.508,11.509 s5.154,11.506,11.508,11.506s11.506-5.152,11.506-11.506S30.006,17.026,23.652,17.026L23.652,17.026z M59.341,0 c-7.651,0-13.858,6.205-13.858,13.855c0,7.651,6.207,13.856,13.858,13.856s13.856-6.205,13.856-13.856 C73.197,6.205,66.992,0,59.341,0L59.341,0z"/>
                </svg>
                <iframe 
                    allowfullscreen 
                    :src="camera.attributes.link_to_stream"
                    :class="{noDisplay: !iframeLoaded}"
                    @load="onLoad()"
                ></iframe>
            </div>
            <div class="camera-bottom">
                <text class="title">{{camera.attributes.description}}</text>
                <text class="description">{{camera.attributes.adress}}</text>
                <div class="camera-button" @click="$emit('getArchive', camera.attributes.adress)">
                    <text>Получить архив записи</text>
                </div>
            </div>
        </div>
    </div>
    </Transition>
</div>
</template>
<script>
import ApiMethods from '@/api/ApiMethods';
export default{
    props:['camerasArray'],
    data(){
        return{
            menuOpen: false,
            ad:'',
            vvod: '',
            iframeLoaded: false,
        }
    },
    methods:{
        adRedirect(link){
            window.location.href = `${link}`
        },
        onLoad(){
            this.iframeLoaded = true;
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
.menu-container{
    width: 100vw;
    height: 100vh;
    position: absolute;
    overflow: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
}
.menu-top{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    max-height: 58px;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: stretch;
    background-color: white;
    padding: 5px 0px;
    z-index: 4;
    .burger{
        width: 24px;
        height: 24px;
        padding: 12px;
    }
    .search{
        padding-right: 12px;
        width: 100%;
        input{
            width: 88%;
            padding: 12px 16px;
            border: none;
            background-color: var(--search-background);
            border-radius: 10px;
            &:focus{
                outline: none;
            }
            &::placeholder{
                font-size: var(--font-14-to-rem);
                font-weight: 400;
                color: var(--card-street-color);
            }
        }
    }
}
.opened-menu{
    width: 280px;
    position: relative;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: white;
    padding: 12px;
    gap: 12px;
    display: flex;
    flex-direction: column;
    .ad-banner{
        position: relative;
        margin-top: 58px;
        border-radius: 12px;
        background-color: #EA6133;
        height: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        text{
            color: white;
            font-size: var(--font-24-to-rem);
            font-weight: 600;
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
            position: absolute;
            top: 0;
            left: 0;
        }
    }
    .camera-card{
        background-color: var(--card-background);
        border-radius: 12px;
        .camera-video{
            position: relative;
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
                border-radius: 12px 12px 0px 0px;
                width: 100%;
                height: 100%;
            }
            .noDisplay{
                display: none;
            }
            iframe{
                border-radius: 16px 16px 0px 0px;
                width: 100%;
                // height: 200px;
                border: none;
            }
        }
        .camera-bottom{
            padding: 12px;
            display: flex;
            flex-direction: column;
            .title{
                color: var(--card-title-color);
                font-size: 1rem;
                font-weight: 600;
            }
            .description{
                color: var(--card-street-color);
                font-size: var(--font-12-to-rem);
                font-weight: 400;
                letter-spacing: 0.048px;
                margin-top: 4px;
                margin-bottom: 16px;
            }
            .camera-button{
                user-select: none;
                border-radius: 8px;
                padding: 8px;
                background-color: var(--card-button-background);
                text-align: center;
                text{
                    color: white;
                    font-size: var(--font-14-to-rem);
                    font-weight: 600;
                    &:active{
                        color: rgba(0, 0, 0, 0.363);
                    }
                }
                &:active{
                    background-color: var(--card-button-background-active);
                }
            }
        }
    }
}



/*ANMATION*/
.camerasMenu-enter-active {
  transition: all 0.3s ease-out;
}
.camerasMenu-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.camerasMenu-enter-from,
.camerasMenu-leave-to {
  transform: translateX(-250px);
  opacity: 0.3;
}



.burger-enter-active {
  transition: all 0.1s ease-out;
  position: absolute;
}
.burger-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.burger-enter-from,
.burger-leave-to {
  opacity: 0;
  position: absolute;
}
/*--------*/
</style>