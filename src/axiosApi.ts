import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://ft-lw-pizza-default-rtdb.europe-west1.firebasedatabase.app'
})

export default axiosApi