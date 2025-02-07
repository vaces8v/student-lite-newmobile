import { Api } from "@/api/root";
import { create, StateCreator } from "zustand";
import * as SecureStore from 'expo-secure-store';

interface TokenState {
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

interface TokenAction {
    getToken: ({login, password}: {login: string, password: string}) => Promise<boolean>;
    removeToken: () => Promise<void>;
    checkToken: () => Promise<boolean>;
}

const sliceStore: StateCreator<TokenState & TokenAction> = (set, get) => ({
    token: null,
    isLoading: false,
    error: null,
    getToken: async ({login, password}) => {
        set({ isLoading: true, error: null });
        try {
            const { response } = await Api.auth.login({login, password});
            
            if (response.error !== null) {
                set({ 
                    token: null, 
                    error: response.error || 'Ошибка входа',
                    isLoading: false 
                });
                return false;
            }

            const token = response.result?.token;
            if (!token) {
                set({ 
                    token: null, 
                    error: 'Токен не получен',
                    isLoading: false 
                });
                return false;
            }

            await SecureStore.setItemAsync("stl_token", token);
            set({ 
                token, 
                error: null,
                isLoading: false 
            });
            console.log('Token stored successfully');
            return true;
        } catch (error) {
            console.error('Error in getToken:', error);
            set({ 
                token: null, 
                error: 'Ошибка входа', 
                isLoading: false 
            });
            return false;
        }
    },
    removeToken: async () => {
        await SecureStore.deleteItemAsync("stl_token");
        set({ token: null, error: null });
    },
    checkToken: async () => {
        set({ isLoading: true });
        try {
            const token = await SecureStore.getItemAsync("stl_token");
            
            console.log('Retrieved token:', token);
            
            if (!token) {
                console.log('No token found');
                set({ token: null, isLoading: false });
                return false;
            }

            set({ token, isLoading: false });
            return true;
        } catch (error) {
            console.error('Error in checkToken:', error);
            set({ token: null, isLoading: false });
            return false;
        }
    }
});

export const useTokenStore = create<TokenState & TokenAction>(sliceStore);