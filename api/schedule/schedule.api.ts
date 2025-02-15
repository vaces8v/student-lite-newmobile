import axios from 'axios';
import { ScheduleResponse, StudentInfoResponse } from '@/types/api/schedule.types';

const ELJUR_BASE_URL = 'https://kmpo.eljur.ru/apiv3';
const DEV_KEY = '19c4bfc2705023fe080ce94ace26aec9';
const VENDOR = 'kmpo';

export const ScheduleApi = {
    async getRules(token: string): Promise<StudentInfoResponse> {
        try {
            const response = await axios.get<StudentInfoResponse>(`${ELJUR_BASE_URL}/getrules`, {
                params: {
                    devkey: DEV_KEY,
                    out_format: 'json',
                    auth_token: token,
                    vendor: VENDOR
                }
            });
            return response.data;
        } catch (error) {
            
            throw error;
        }
    },

    async getSchedule(params: {
        studentId: string, 
        startDate: string, 
        endDate: string, 
        token: string
    }): Promise<ScheduleResponse> {
        try {

            // Validate and format parameters
            const { studentId, startDate, endDate, token } = params;
            
            if (!studentId) {
                throw new Error('Student ID is required');
            }

            // Ensure dates are in the correct format for Eljur API
            const formattedStartDate = startDate.replace(/-/g, '');
            const formattedEndDate = endDate.replace(/-/g, '');

            const response = await axios.get<ScheduleResponse>(`${ELJUR_BASE_URL}/getdiary`, {
                params: {
                    student: studentId,
                    days: `${formattedStartDate}-${formattedEndDate}`,
                    rings: true,
                    devkey: DEV_KEY,
                    out_format: 'json',
                    auth_token: token,
                    vendor: VENDOR
                }
            });

            return response.data;
        } catch (error) {
            console.error('Full Error Details:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
            
            throw error;
        }
    }
};
