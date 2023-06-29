<template>
  <div class="camera">
    <div id="banner">
      <a :href="link_to_redirect">
        <img :src="link_to_pic">
      </a>
    </div>
  </div>
</template>

<script>
import ApiMethods from '@/api/ApiMethods';
export default{
  data(){
    return{
      isUp: false,
      ads: '',
      link_to_redirect: '',
      link_to_pic: '',
    }
  },
  async mounted() {
    this.ads = await ApiMethods.showAd();
    this.link_to_redirect = this.ads[0].attributes.link_to_redirect;
    this.link_to_pic = this.ads[0].attributes.link_to_pic;
  },
}
</script>

<style scoped>
.camera{
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 3px solid #14A1D9;
  /* border-bottom: none; */
  border-radius: 5px;
  padding: 0 !important;
  background-color: #c23979;
  color: white;
  height: 250px;
}
#banner{
  height: 100%;
  width: 100%;
}
#banner a img{
  height: 100%;
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
}
</style>
