import axios from "axios";
import { config } from "./config";

export async function getFoodMenu() {
    const URL = config.BASE_URL + '/food/menu'
    try {
        const response = await axios.get(URL)
        return response.data
    } catch (error) {
        window.alert(error)
    }
}