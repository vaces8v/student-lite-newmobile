import React from "react";
import { ScrollView, Text, View } from "react-native";
import Day, { DayProp } from "../Day/Day";
import { FlashList } from "@shopify/flash-list";

export interface WeekProp {
    id: number;
    week: string;
    days: DayProp[];
    onVisibleDayChange?: (day: string) => void;
}

const Weeky = ({ week, days, onVisibleDayChange }: WeekProp) => {
    return (
        <View style={{ width: '100%', marginHorizontal: 'auto' }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', fontFamily: 'Poppins-Medium', textAlign: 'center', marginBottom: 10, marginTop: 5 }}>{week}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {days.map((item) => (
                    <Day
                        key={item.id}
                        id={item.id}
                        day={item.day}
                        lessons={item.lessons}
                        onVisibleDayChange={onVisibleDayChange}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default Weeky;