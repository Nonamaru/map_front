<template>
<NewUser :screen="finallyScreen" />
<MobileNewUser :screen="!finallyScreen" />
</template>
<script>
import NewUser from '@/components/users/NewUser.vue';
import MobileNewUser from '@/components/users/MobileNewUser.vue';
export default{
    components:{
        NewUser,
        MobileNewUser
    },
    data(){
        return{
            finallyScreen: true,
        }
    },
    mounted(){
        if (window.screen.width < 900) {
            this.finallyScreen = false;
        } else {
            this.finallyScreen = true;
        }
    }
}
</script>