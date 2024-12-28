import React, { useEffect, useRef, useState } from "react";
import {Dimensions, Text, View, useWindowDimensions} from "react-native";
import Animated, { FadeInDown, FadeOutUp} from "react-native-reanimated";
import Lesson, { LessonProp } from "../Lesson/Lesson";

export interface DayProp {
    day: string;
    lessons: LessonProp[];
    onVisibleDayChange?: (day: string) => void;
}

const Day = ({day, lessons, onVisibleDayChange}: DayProp) => {
    const { height: screenHeight } = useWindowDimensions();
    const dayRef = useRef(null);
    const [isFullyVisible, setIsFullyVisible] = useState(false);

    useEffect(() => {
        const checkVisibility = () => {
            if (dayRef.current) {
                dayRef.current.measureInWindow((x, y, width, height) => {
                    // Get screen dimensions
                    const screenHeight = Dimensions.get('window').height;
                    
                    // Check if the day's content is fully or mostly visible on the screen
                    const isVisible = 
                        y >= 0 && 
                        y + height <= screenHeight && 
                        lessons.length > 0 && 
                        // Ensure at least 80% of the content is visible
                        (screenHeight - y) / height >= 0.8;

                    if (isVisible !== isFullyVisible) {
                        setIsFullyVisible(isVisible);
                        onVisibleDayChange?.(isVisible ? day : null);
                    }
                });
            }
        };

        // Check visibility initially and on layout changes
        checkVisibility();
        
        // Add a periodic check for visibility
        const intervalId = setInterval(checkVisibility, 200);

        return () => {
            clearInterval(intervalId);
        };
    }, [day, onVisibleDayChange, lessons, isFullyVisible]);

    return (
        <Animated.View
            ref={dayRef}
            entering={FadeInDown}
            exiting={FadeOutUp}
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
                        timeStart={lesson.timeStart}
                        timeEnd={lesson.timeEnd}
                        lesson={lesson.lesson}
                        office={lesson.office}
                        content={lesson.content}
                        theme={lesson.theme}
                    />
                ))}
            </View>
        </Animated.View>
    );
};

export default Day;