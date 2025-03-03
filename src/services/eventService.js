import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL + '/events'

export async function postIndex() {
    try {
        const res = axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${getToken}`
            }
        })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}