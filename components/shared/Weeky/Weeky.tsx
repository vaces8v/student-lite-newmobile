import React from "react";
import {Text, View} from "react-native";
import Animated, { FadeInDown, FadeOutUp} from "react-native-reanimated";
import Day, { DayProp } from "../Day/Day";

export interface WeekProp {
    week: string;
    days: DayProp[];
    onVisibleDayChange?: (day: string) => void;
}

const Weeky = ({week, days, onVisibleDayChange}: WeekProp) => {
    return (
        <Animated.View
            style={{width: '100%', marginHorizontal: 'auto'}}
            entering={FadeInDown.duration(600).springify()}
            exiting={FadeOutUp.duration(600)}
        >
            <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold', fontFamily: 'Poppins-Medium', textAlign: 'center', marginBottom: 10, marginTop: 5}}>{week}</Text>
            <View>
                {days.map((day, index) => (
                    <Day
                        key={index}
                        day={day.day}
                        lessons={day.lessons}
                        onVisibleDayChange={onVisibleDayChange}
                    />
                ))}
            </View>
        </Animated.View>
    );
};

export default Weeky;