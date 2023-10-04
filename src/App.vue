<template>
  <!--
  <nav>
    <router-link to="/">User</router-link> |
    <router-link to="/admin">Admin</router-link>
  </nav>
  -->
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap');
:root{
  --search-background: #F6F6F6;
  --input-border-color: #E1E3E6;
  --placeholder-color: #AAAEB3;
  --colors-link: #1FA1FF;

  --card-background: #F2F6F8;
  --card-button-background: #C8235A;
  --card-button-background-hover: linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), #C8235A;
  --card-button-background-active: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #C8235A;
  --card-title-color: #2D2D2D;
  --card-street-color: rgba(45, 45, 45, 0.50);

  --font-12-to-rem: 0.75rem;
  --font-14-to-rem: 0.875rem;
  --font-20-to-rem: 1.25rem;
  --font-24-to-rem: 1.5rem;
  --font-32-to-rem: 2rem;
}

*{
  margin: 0;
  padding: 0;
}
body{
  // font-family: 'Roboto', sans-serif;
  font-family: 'Raleway', sans-serif;
  // background-color: white;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #403439;
}


/*POPUP*/
.leaflet-popup{
  margin-bottom: 30px !important;
}
.leaflet-popup-content-wrapper {
  // margin-bottom: 10px !important;
  padding: 0px !important;
}
.leaflet-popup-content-wrapper .leaflet-popup-content {
  margin: 0;
  width: 360px !important;
}
.leaflet-popup-tip {
  width: 12px !important;  
  height: 12px !important;
  margin-top: -10px !important;
}
.leaflet-popup-close-button{
  border-radius: 50% !important;
  background-color: var(--card-street-color) !important;
  top: 8px !important;
  right: 8px !important;
  z-index: 6 !important;
  span{
    color: white !important;
    // font: 14px/14px Tahoma, Verdana, sans-serif !important;
    vertical-align: baseline !important;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      color: rgba(255, 255, 255, 0.8) !important;
    }
    &:active{
      color: rgba(255, 255, 255, 0.8) !important;
    }
  }
}
/*-----*/


/*TOOLTIP*/
.leaflet-tooltip-left {
  margin-top: -58px !important;
  margin-left: 170px !important;
  padding: 8px 12px !important;
  border-radius: 12px !important;
  width: 320px !important;
}
.leaflet-tooltip-right {
  margin-top: -58px !important;
  margin-left: -170px !important;
  padding: 8px 12px !important;
  border-radius: 12px !important;
  width: 320px !important;
}
.leaflet-tooltip-left:before {
  right: 47.5% !important;
  top: 100% !important;
  margin: 0 !important;
  transform: rotate(90deg) !important;
}
.leaflet-tooltip-right:before {
  left: 47.5% !important;
  top: 100% !important;
  margin: 0 !important;
  transform: rotate(-90deg) !important;
}
/*-------*/


// nav {
//   padding: 10px;
//   text-align: center;
// }

// nav a {
//   font-weight: bold;
//   color: #403439;
// }

// nav a.router-link-exact-active {
//   color: #a15c7a;
// }
</style>
