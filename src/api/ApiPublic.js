import axios from 'axios'

export default (url=process.env.VUE_APP_API) => {
    return axios.create( {
        baseURL: url
    })
}