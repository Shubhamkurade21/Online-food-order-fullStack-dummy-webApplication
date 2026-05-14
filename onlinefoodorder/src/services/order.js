import { config } from "./config";
import axios from 'axios';

export async function placeOrder(token, orderdetails) {
    const URL = config.BASE_URL + '/order'
    const headers = {
        authorization: 'Bearer ' + token
    }
    try {
        const response = await axios.post(URL, orderdetails, { headers })
        return response.data
    } catch (error) {
        window.alert(error)
    }
}

export async function getOrders(token) {
    const URL = config.BASE_URL + '/order'
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