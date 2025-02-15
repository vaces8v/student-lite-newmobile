import {DayProp} from "@/components/shared/Day/Day";
import { startOfWeek, addWeeks, format } from "date-fns";

export interface WeekProp {
    id: number;
    week: string;
    days: DayProp[];
}

const createWeeksArray = (year: number): WeekProp[] => {
    const weeks: WeekProp[] = [];

    let currentWeekStart = startOfWeek(new Date(year, 0, 1), { weekStartsOn: 1 });

    for (let weekIndex = 1; weekIndex <= 52; weekIndex++) {
        const weekStartDate = currentWeekStart;
        const weekKey = format(weekStartDate, 'yyyyMMdd');

        weeks.push({
            id: weekIndex,
            week: weekKey,
            days: [],
        });

        currentWeekStart = addWeeks(currentWeekStart, 1);
    }

    return weeks;
};

const year = new Date().getFullYear();
export const weeksArray = createWeeksArray(year);