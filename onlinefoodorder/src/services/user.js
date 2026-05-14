import axios from 'axios'
import { config } from './config'

export async function loginUser(email, password) {
    const url = config.BASE_URL + '/user/signin'
    const body = { email, password }
    try {
        const response = await axios.post(url, body)
        return response.data
    } catch (error) {
        window.alert(error)
    }
}

export async function registerUser(name, email, password, phone) {
    const url = config.BASE_URL + '/user/signup'
    const body = { name, email, password, phone }
    try {
        const response = await axios.post(url, body)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getUser(token) {
    const URL = config.BASE_URL + '/user'
    const headers = {
        authorization: 'Bearer ' + token
    }
    try {
        const response = await axios.get(URL, { headers })
        return response.data
    } catch (error) {
        window.alert(error)
    }
}

export async function updateUser(token, phone) {
    const URL = config.BASE_URL + '/user'
    const headers = {
        authorization: 'Bearer ' + token
    }
    const body = { phone }
    try {
        const response = await axios.put(URL, body, { headers })
        return response.data
    } catch (error) {
        window.alert(error)
    }
}