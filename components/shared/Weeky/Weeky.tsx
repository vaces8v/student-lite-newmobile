import React from "react";
import { ScrollView, Text, View } from "react-native";
import Day, { DayProp } from "../Day/Day";

export interface WeekProp {
    id: number;
    week: string;
    days: DayProp[];
    onVisibleDayChange?: (day: string) => void;
}

const Weeky = React.memo(({ week, days, onVisibleDayChange }: WeekProp) => {
    const weekNumber = parseInt(week.slice(0, 4));
    const isEvenWeek = weekNumber % 2 === 0;

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', marginHorizontal: 'auto', marginBottom: 100 }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', fontFamily: 'Poppins-Medium', textAlign: 'center', marginBottom: 10, marginTop: 5 }}>
                {isEvenWeek ? 'Четная неделя' : 'Нечетная неделя'} 
            </Text>
            
                {days.map((item) => (
                    <Day
                        key={item.id}
                        id={item.id}
                        day={item.day}
                        lessons={item.lessons}
                        onVisibleDayChange={onVisibleDayChange}
                    />
                ))}
           
        </View>
        </ScrollView>
    );
}, (prevProps, nextProps) => {
    return prevProps.week === nextProps.week && 
           prevProps.days.length === nextProps.days.length;
});

export default Weeky;