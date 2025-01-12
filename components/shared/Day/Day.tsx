import React, { useEffect, useRef, useState } from "react";
import {Dimensions, Text, View, useWindowDimensions} from "react-native";
import Animated, { FadeInDown, FadeOutUp} from "react-native-reanimated";
import Lesson, { LessonProp } from "../Lesson/Lesson";

export interface DayProp {
    id: number;
    day: string;
    lessons: LessonProp[];
    onVisibleDayChange?: (day: string) => void;
}

const Day = ({day, lessons, onVisibleDayChange}: DayProp) => {
   
    return (
        <View
            className="day-element"
            data-day={day}
            style={{
                marginBottom: 10,
                paddingHorizontal: 15,
            }}
        >
            <Text style={{ 
                color: 'white', 
                fontSize: 18, 
                marginBottom: 2, 
                fontWeight: 'bold', 
                fontFamily: 'Poppins-Medium', 
                textAlign: 'center'
            }}>
                {day}
            </Text>
            <View>
                {lessons.map((lesson, index) => (
                    <Lesson
                        key={index}
                        id={lesson.id}
                        timeStart={lesson.timeStart}
                        timeEnd={lesson.timeEnd}
                        lesson={lesson.lesson}
                        office={lesson.office}
                        content={lesson.content}
                        theme={lesson.theme}
                        estimation={lesson.estimation}
                    />
                ))}
            </View>
        </View>
    );
};

export default Day;