import React from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import Day, { DayProp } from "../Day/Day";

export interface WeekProp {
    id: number;
    week: string;
    days: DayProp[];
    onVisibleDayChange?: (day: string) => void;
    refreshControl?: React.ReactElement;
}

const getWeek = (date: Date, options: { weekStartsOn: number }) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay() + 1 - options.weekStartsOn) / 7);
}

const Weeky = React.memo(({ week, days, onVisibleDayChange, refreshControl }: WeekProp) => {
    if (!week) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    // Получаем дату первого дня недели
    const weekDate = week ? new Date(week.slice(0, 4) + '-' + week.slice(4, 6) + '-' + week.slice(6, 8)) : new Date();
    // Получаем номер недели в году
    const weekNumber = getWeek(weekDate, { weekStartsOn: 1 });
    const isEvenWeek = weekNumber % 2 === 0;

    // Форматируем период недели
    const weekEndDate = new Date(weekDate);
    weekEndDate.setDate(weekDate.getDate() + 6);
    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString('ru-RU', { month: 'long' });
        return `${day} ${month}`;
    };
    const weekPeriod = `${formatDate(weekDate)} - ${formatDate(weekEndDate)}`;

    return (
        <ScrollView 
            contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 0 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, width: '100%' }}
            refreshControl={refreshControl}
        >
            <View style={{ alignItems: 'center', marginBottom: 0, marginTop: 5 }}>
                <Text style={{ 
                    color: 'white', 
                    fontSize: 24, 
                    fontWeight: 'bold', 
                    fontFamily: 'Poppins-Medium', 
                    textAlign: 'center'
                }}>
                    {isEvenWeek ? 'Четная неделя' : 'Нечетная неделя'}
                </Text>
                <Text style={{ 
                    color: 'white', 
                    fontSize: 16, 
                    fontFamily: 'Poppins-Regular', 
                    textAlign: 'center',
                    marginTop: 5
                }}>
                    {weekPeriod}
                </Text>
            </View>
            
            <View style={{ flex: 1, width: '100%' }}>
                {Array.isArray(days) && days.map((item) => (
                    <Day
                        key={`${item.id}-${item.day}`}
                        id={item.id}
                        day={item.day}
                        lessons={item.lessons || []}
                        weekDate={weekDate}
                        onVisibleDayChange={onVisibleDayChange}
                    />
                ))}
            </View>
        </ScrollView>
    );
}, (prevProps, nextProps) => {
    // Проверяем только необходимые изменения
    if (prevProps.week !== nextProps.week) return false;
    if (prevProps.days?.length !== nextProps.days?.length) return false;
    
    // Глубокое сравнение дней только если длины равны
    if (prevProps.days && nextProps.days) {
        for (let i = 0; i < prevProps.days.length; i++) {
            const prevDay = prevProps.days[i];
            const nextDay = nextProps.days[i];
            if (prevDay.id !== nextDay.id || 
                prevDay.day !== nextDay.day || 
                prevDay.lessons?.length !== nextDay.lessons?.length) {
                return false;
            }
        }
    }
    
    return true;
});

export default Weeky;