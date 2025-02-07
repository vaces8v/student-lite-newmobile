import axios from "axios";
import * as auth from './auth/auth.api'
import { ScheduleApi } from './schedule/schedule.api';

export const axiosInstance = axios.create({
    baseURL: "https://kmpo.eljur.ru/apiv3",
})

export const Api = {
    auth,
    schedule: ScheduleApi
}