<template>
    <div id="container">
        <div id="link_to_pic">
            Ссылка на баннер
            <input type="text" v-model="form.link_to_pic" />
        </div>
        <div id="link_to_redirect">
            Ссылка на редирект баннера
            <input type="text" v-model="form.link_to_redirect" />
        </div>
        <div id="buttons">
            <button @click="AdEditor">Ok</button>
            <button @click='AdEdit'>Close</button>
        </div>
    </div>
</template>
<script>
import ApiMethods from '@/api/ApiMethods';
export default ({
    data() {
        return{
            form: {
                id: 1,
                link_to_pic: '',
                link_to_redirect: '',
            },
        }
    },
    methods: {
        AdEdit(){this.$emit('AdEdit', {})},
        async updateData(){
            this.ads = await ApiMethods.showAd();
            this.form.link_to_redirect = this.ads[0].link_to_redirect;
            this.form.link_to_pic = this.ads[0].link_to_pic;
        },
        async AdEditor(){
            await ApiMethods.editAd(this.form).then(() => {
                this.AdEdit();
                this.updateData();
                this.$router.go(0);
            });
        },
    },
    async mounted() {
        await this.updateData();
    },
})
</script>
<style scoped>
#container{
    position: absolute;
    border: 1px solid black;
    top: 30%;
    left: 40%;
    z-index: 9999;
    padding: 10px;
    border-radius: 5px;
    background-color: lightgray;
}
input, textarea {
    border: none;
    padding: 5px;
    border-radius: 5px;
}
#link_to_redirect, #link_to_pic{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}
#buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 12px;
}
#buttons button{
    width: 45%;
    border: none;
    padding: 5px;
    border-radius: 5px;
    font-weight: bold;
}
</style>