import { AxiosError } from "axios";
import useAuth from "./useAuth";

export default function useRefreshOnExpire(cb: (token: string) => Promise<any>) {
    const { refresh, accessToken } = useAuth();

    const refreshOnExpire = async () => {
        try {
            await cb(accessToken);
        } catch (error) {
            if ((error as AxiosError).response?.status == 403) {
                const newToken = await refresh();
                await cb(newToken);
            } else {
                console.log(error);
            }
        }
    }
    return refreshOnExpire;
}