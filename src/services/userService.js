import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export async function register(formData) {
    try {
        const res = await axios.post(BASE_URL + '/user/register/', formData)
        return res.data
    } catch (error) {
        console.log(error)
        throw error.response.data  
    }
}