import ApiPublic from "@/api/ApiPublic";
import ApiProtected from "@/api/ApiProtected";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();

export default {
    // Выйти
    async logout() {
        await ApiProtected().post('logout').then(() => {
            cookies.remove('user_token');
        });
        return true;
    },

    // Получить токен по логину
    async getTokenByLogin(data) {
        await ApiPublic().post('login', data).then(response => {
            cookies.set('user_token', response.data.access_token, 3600);
        });
        return true;
    },

    // Получить конкретного пользователя
    async getUser() {
        await ApiPublic().post('user').then(response => {
            if (response.data.isEmpty)
                return null;
        });
        return true;
    },

    // Получить пользователей
    async getUsers() {
        let users;
        await ApiPublic().get('users').then(response => {
            users = response.data;
        });
        return users;
    },

    // Получить города
    async getCities() {
        let city;
        await ApiPublic().get('city').then(response => {
            city = response.data;
        });
        return city;
    },

    // Получить список камер
    async getCameras() {
        let camera;
        await ApiPublic().get('cameras').then(response => {
            camera = response.data.data
        })
        return camera;
    },

    // Получить конкреткую камеру
    async getCameraById(id) {
        let camera;
        await ApiPublic().get(`camera/${id}`).then(response => {
            camera = response.data
        })
        return camera;
    },

    // Добавить камеру (с вводом координат)
    async addCamerasManual(data) {
        let result;
        await ApiPublic().post('camera-manual', data).then(response => {
            result = response.data;
        });
        return result;
    },

    // Редактировать камеру
    async editCamerasManual(data) {
        let result;
        await ApiPublic().put('camera-manual', data).then(response => {
            result = response.data;
        });
        return result;
    },

    // Добавить камеру (без ввода координат)
    async addCameras(data) {
        let result;
        await ApiPublic().post('camera', data).then(response => {
            result = response.data;
        });
        return result;
    },

    // Удалить камеру
    async deleteCameras(id) {
        let camera;
        await ApiPublic().delete(`camera/${id}`).then(response => {
            camera = response.data;
        });
        return camera;
    },

    // Показать рекламу
    async showAd(){
        let ad;
        await ApiPublic().get('ads').then(response => {
            ad = response.data.data;
        });
        return ad;
    },

    // Редактировать рекламу
    async editAd(data){
        let ad;
        await ApiPublic().put('ad-edit', data).then(response => {
            ad = response.data;
        });
        return ad;
    },

    // Добавить рекламу
    async addAd(data){
        let ad;
        await ApiPublic().put('ad-add', data).then(response => {
            ad = response.data;
        });
        return ad;
    }
/*
    getPostById(id) {
        let worker;
        ApiPublic().get('post/'.concat(id)).then(response => {
            worker = response.data
        })
        return worker;
    },
    async addPost(data) {
        let result;
        await ApiProtected().post('post', data).then(response => {
            result = response.data;
        });
        return result
    },
*/
}