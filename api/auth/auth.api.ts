import { BodyAuth, ResponseAuth } from "@/types/api/auth.types";
import { axiosInstance } from "../root";

export const login = async (body: BodyAuth): Promise<ResponseAuth> => {
    const {data} = await axiosInstance.post<ResponseAuth>("/auth?devkey=19c4bfc2705023fe080ce94ace26aec9&out_format=json&auth_token=&vendor=kmpo", body);
    return (await data);
}