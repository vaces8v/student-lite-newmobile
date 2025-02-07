import axios from "axios";
import * as auth from './auth/auth.api'

export const axiosInstance = axios.create({
    baseURL: "https://kmpo.eljur.ru/apiv3",
})

export const Api = {
    auth
}