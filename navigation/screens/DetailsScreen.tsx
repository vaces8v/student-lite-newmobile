import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useHeaderHeight } from '@react-navigation/elements';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import DatePicker from '@/components/shared/DatePicker/DatePicker';
import Weeky, { WeekProp } from '@/components/shared/Weeky/Weeky';

const TEST_DATA = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница'];

const data: WeekProp[] = [
    {
        week: 'Первая неделя',
        days: [
            {
                day: 'Понедельник',
                lessons: [
                    {
                        id: 1,
                        timeStart: "8:20",
                        timeEnd: "9:40",
                        office: "Кабинет 316",
                        theme: "#41FFA4",
                        lesson: "ОГСЭ.05.01 Физическая культура",
                        estimation: [3, 4, 5]
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: [3, 4, 5]
                    }
                ]
            },
            {
                day: 'Вторник',
                lessons: [
                    {
                        id: 1,
                        timeStart: "8:20",
                        timeEnd: "9:40",
                        office: "Кабинет 215",
                        theme: "#3AF3FF",
                        lesson: "Математика",
                        estimation: [3, 4, 5]
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: [3, 4, 5]
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: []
                    }
                ]
            },
            {
                day: 'Среда',
                lessons: [
                    {
                        id: 1,
                        timeStart: "8:20",
                        timeEnd: "9:40",
                        office: "Кабинет 215",
                        theme: "#3AF3FF",
                        lesson: "Математика",
                        estimation: []
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: []
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: []
                    },
                    {
                        id: 4,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: []
                    }
                ]
            },
            {
                day: 'Четверг',
                lessons: [
                    {
                        id: 1,
                        timeStart: "8:20",
                        timeEnd: "9:40",
                        office: "Кабинет 215",
                        theme: "#3AF3FF",
                        lesson: "Математика",
                        estimation: []
                    }
                ]
            },
            {
                day: 'Пятница',
                lessons: [
                    {
                        id: 1,
                        timeStart: "8:20",
                        timeEnd: "9:40",
                        office: "Кабинет 215",
                        theme: "#3AF3FF",
                        lesson: "Математика",
                        estimation: []
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: []
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: []
                    }
                ]
            }
        ]
    },
    {
        week: 'Первая неделя',
        days: [
            {
                day: 'Понедельник',
                lessons: [
                    {
                        id: 1,
                        timeStart: "8:20",
                        timeEnd: "9:40",
                        office: "Кабинет 316",
                        theme: "#41FFA4",
                        lesson: "ОГСЭ.05.01 Физическая культура",
                        estimation: [5]
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: [4]
                    }
                ]
            },
            {
                day: 'Вторник',
                lessons: [
                    {
                        id: 1,
                        timeStart: "8:20",
                        timeEnd: "9:40",
                        office: "Кабинет 215",
                        theme: "#3AF3FF",
                        lesson: "Математика",
                        estimation: []
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: [3, 3]
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: []
                    }
                ]
            },
            {
                day: 'Среда',
                lessons: [
                    {
                        id: 1,
                        timeStart: "8:20",
                        timeEnd: "9:40",
                        office: "Кабинет 215",
                        theme: "#3AF3FF",
                        lesson: "Математика",
                        estimation: [2]
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: [5, 5]
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: []
                    },
                    {
                        id: 4,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: []
                    }
                ]
            },
            {
                day: 'Четверг',
                lessons: [
                    {
                        id: 1,
                        timeStart: "8:20",
                        timeEnd: "9:40",
                        office: "Кабинет 215",
                        theme: "#3AF3FF",
                        lesson: "Математика",
                        estimation: []
                    }
                ]
            },
            {
                day: 'Пятница',
                lessons: [
                    {
                        id: 1,
                        timeStart: "8:20",
                        timeEnd: "9:40",
                        office: "Кабинет 215",
                        theme: "#3AF3FF",
                        lesson: "Математика",
                        estimation: [4]
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: [5, 5]
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                        estimation: [5, 4]
                    }
                ]
            }
        ]
    }
];

const App = () => {
    const headerHeight = useHeaderHeight();
    const bottomInset = useSafeAreaInsets().bottom;

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const scrollViewRefs = useRef<ScrollView[]>([]);
    const pagerViewRef = useRef<PagerView>(null);

    const handleDaySelect = (selectedDay: string) => {
        const normalizedSelectedDay = selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1);

        const currentPageData = data[currentPageIndex];
        const currentPageDayIndex = currentPageData.days.findIndex(
            day => day.day.toLowerCase() === normalizedSelectedDay.toLowerCase()
        );

        let foundPage = null;
        if (currentPageDayIndex !== -1) {
            foundPage = {
                pageIndex: currentPageIndex,
                dayIndex: currentPageDayIndex
            };
        } else {
            for (let pageIndex = 0; pageIndex < data.length; pageIndex++) {
                const dayIndex = data[pageIndex].days.findIndex(
                    day => day.day.toLowerCase() === normalizedSelectedDay.toLowerCase()
                );

                if (dayIndex !== -1) {
                    foundPage = {
                        pageIndex,
                        dayIndex
                    };
                    break;
                }
            }
        }

        if (foundPage) {
            if (foundPage.pageIndex !== currentPageIndex && pagerViewRef.current) {
                pagerViewRef.current.setPage(foundPage.pageIndex);
            }

            setTimeout(() => {
                if (scrollViewRefs.current[foundPage.pageIndex]) {
                    const estimatedLessonHeight = 80;
                    const dayIndex = foundPage.dayIndex;
                    let dayOffset = 0;
                    for (let i = 0; i < dayIndex; i++) {
                        dayOffset += data[foundPage.pageIndex].days[i].lessons.length * estimatedLessonHeight + 50;
                    }
                    const safeScrollOffset = Math.max(0, dayOffset - 100);

                    scrollViewRefs.current[foundPage.pageIndex].scrollTo({
                        y: safeScrollOffset,
                        animated: true
                    });
                }
            }, 200);
        }
    };
    return (
        <GestureHandlerRootView style={styles.container}>
            <LinearGradient
                colors={['#462ab2', '#1e124c']}
                style={styles.container}>
                <View style={{ position: 'relative', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 / 12, height: 43 }}>
                    <View style={styles.scrollViewContainer}>
                        <ScrollView
                            style={{
                                height: 50,
                                maxHeight: 43,
                                flex: 1,
                                width: '100%',
                            }}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            scrollEventThrottle={20}
                        >
                            {TEST_DATA.map((day, index) => {

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleDaySelect(day)}
                                        style={{ height: 50, overflow: 'visible' }}
                                    >
                                        <View
                                            style={[
                                                {
                                                    height: 42,
                                                    width: 'auto',
                                                    borderRadius: 50,
                                                    overflow: 'hidden',
                                                    marginHorizontal: 3,
                                                    marginRight: TEST_DATA.length - 1 === index ? 15 : 3,
                                                    marginLeft: index === 0 ? 10 : 3,
                                                    borderWidth: 1.5,
                                                    borderColor: 'transparent'
                                                }
                                            ]}
                                        >
                                            <BlurView
                                                intensity={30}
                                                tint='prominent'
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    height: 40,
                                                    paddingRight: 15,
                                                    paddingLeft: 15,
                                                    minWidth: 'auto',
                                                    borderRadius: 50,
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: 'white',
                                                    fontWeight: '400',
                                                    fontFamily: 'Poppins-Medium',
                                                    textAlign: 'center'
                                                }}>
                                                    {day}
                                                </Text>
                                            </BlurView>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <LinearGradient
                            colors={['transparent', 'rgba(70, 42, 178, 0.8)', '#462ab2']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.fadeOverlay}
                            pointerEvents="none"
                        />
                    </View>
                    <DatePicker />
                </View>
                <PagerView
                    ref={pagerViewRef}
                    initialPage={0}
                    style={styles.contentWrapper}
                    onPageSelected={(e) => {
                        const selectedPage = e.nativeEvent.position;
                        setCurrentPageIndex(selectedPage);
                    }}
                >
                    {data.length === 0 ? (
                        <Text>Нету данных о занятии</Text>
                    ) : (
                        data.map((week, index) => {
                            return (
                                <View style={styles.page} key={index}>
                                    <ScrollView
                                        ref={(ref) => scrollViewRefs.current[index] = ref}
                                        showsVerticalScrollIndicator={false}
                                        style={[styles.scrollViewStyle, { marginBottom: bottomInset }]}
                                        contentContainerStyle={{ paddingBottom: headerHeight + headerHeight / 3.1 - 10 }}
                                        scrollEventThrottle={200}
                                    >
                                        <Weeky
                                            week={week.week}
                                            days={week.days} />
                                    </ScrollView>
                                </View>
                            );
                        })
                    )}
                </PagerView>
            </LinearGradient>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        flex: 1,
        position: 'relative',
        marginRight: 50,
    },
    fadeOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 80,
        height: 42
    },
    contentWrapper: {
        flex: 1,
        position: 'relative',
    },
    page: {
        flex: 1,
    },
    items: {
        height: 100,
        marginVertical: 5,
        width: '95%',
        marginHorizontal: 'auto',
        backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
        borderRadius: 25
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    scrollViewStyle: {
        flex: 1,
        width: '100%',
        position: 'relative',
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    stickyButton: {
        position: 'absolute',
        bottom: 70,
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
        overflow: 'hidden',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    buttonContent: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default App;
