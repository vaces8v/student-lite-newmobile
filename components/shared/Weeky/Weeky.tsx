import React from "react";
import { ScrollView, Text, View } from "react-native";
import Day, { DayProp } from "../Day/Day";

export interface WeekProp {
    id: number;
    week: string;
    days: DayProp[];
    onVisibleDayChange?: (day: string) => void;
}

const getWeek = (date: Date, options: { weekStartsOn: number }) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay() + 1 - options.weekStartsOn) / 7);
}

const Weeky = React.memo(({ week, days, onVisibleDayChange }: WeekProp) => {
    // Получаем дату первого дня недели
    const weekDate = new Date(week.slice(0, 4) + '-' + week.slice(4, 6) + '-' + week.slice(6, 8));
    // Получаем номер недели в году
    const weekNumber = getWeek(weekDate, { weekStartsOn: 1 });
    const isEvenWeek = weekNumber % 2 === 0;

    console.log('Weeky rendering with days:', days);

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <Text style={{ 
                color: 'white', 
                fontSize: 24, 
                fontWeight: 'bold', 
                fontFamily: 'Poppins-Medium', 
                textAlign: 'center', 
                marginBottom: 10, 
                marginTop: 5 
            }}>
                {isEvenWeek ? 'Четная неделя' : 'Нечетная неделя'} 
            </Text>
            
            <ScrollView 
                style={{ flex: 1, width: '100%' }}
                contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                {Array.isArray(days) && days.map((item) => (
                    <Day
                        key={item.id}
                        id={item.id}
                        day={item.day}
                        lessons={item.lessons || []}
                        weekDate={weekDate}
                        onVisibleDayChange={onVisibleDayChange}
                    />
                ))}
            </ScrollView>
        </View>
    );
}, (prevProps, nextProps) => {
    return prevProps.week === nextProps.week && 
           prevProps.days?.length === nextProps.days?.length;
});

export default Weeky;