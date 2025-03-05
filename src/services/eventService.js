import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL + '/events/'

export async function eventIndex() {
    try {
        const res = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })

        for (const event of res.data) {
            event.start_date = new Date(event.start_date)
            event.end_date = new Date(event.end_date)
        }
        return res.data
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}

export async function eventCreate(formData) {
    try {
        const res = await axios.post(BASE_URL, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}

export async function eventUpdate(id, data) {
    try {
        const res = await axios.patch(BASE_URL + `${id}/`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}

export async function eventDelete(id) {
    try {
        const res = await axios.delete(BASE_URL + `${id}/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}