import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeekProp } from '@/components/shared/Weeky/Weeky';

const WEEKS_KEY = 'weeks_data';

export const saveWeeksToStorage = async (weeks: WeekProp[]) => {
    try {
        await AsyncStorage.setItem(WEEKS_KEY, JSON.stringify(weeks));
    } catch (error) {
        console.error('Ошибка сохранения данных:', error);
    }
};

export const getWeeksFromStorage = async (): Promise<WeekProp[] | null> => {
    try {
        const storedData = await AsyncStorage.getItem(WEEKS_KEY);
        return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        return null;
    }
};