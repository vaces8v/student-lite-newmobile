import React from "react";
import { Text, View } from "react-native";
import Lesson, { LessonProp } from "../Lesson/Lesson";

export interface DayProp {
    id: number;
    day: string;
    lessons: LessonProp[];
    onVisibleDayChange?: (day: string) => void;
}

const Day = React.memo(({ day, lessons, onVisibleDayChange }: DayProp) => {

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
                {lessons.length > 0 ? 
                    lessons.map((lesson) => (
                        <Lesson
                            key={lesson.id} 
                            id={lesson.id}
                            timeStart={lesson.timeStart}
                            timeEnd={lesson.timeEnd}
                            lesson={lesson.lesson}
                            office={lesson.office}
                            content={lesson.content}
                            theme={lesson.theme}
                            estimation={lesson.estimation}
                        />
                    )) 
                    :
                    <Text style={{fontFamily: 'Poppins-Regular'}} className="text-center text-lg text-white my-[5px]">Нету пар в этот день</Text>
                }
            </View>
        </View>
    );
});

export default Day;