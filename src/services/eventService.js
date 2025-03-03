import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL + '/events'

export async function eventIndex() {
    try {
        const res = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}