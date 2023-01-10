import axios from 'axios'
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

export default (url=process.env.VUE_APP_API) => {
    return axios.create({
        baseURL: url,
        headers: {
            Authorization: 'Bearer '.concat(cookies.get('user_token'))
        }
    })
}