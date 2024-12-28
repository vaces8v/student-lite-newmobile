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
import { TabBar } from '../../components/shared/Menu/Menu';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import DatePicker from '@/components/shared/DatePicker/DatePicker';
import Weeky, { WeekProp } from '@/components/shared/Weeky/Weeky';
import Animated, { 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    Easing, 
    interpolateColor,
    interpolate 
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
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
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
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
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                    },
                    {
                        id: 4,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
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
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
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
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
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
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
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
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                    },
                    {
                        id: 4,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
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
                    },
                    {
                        id: 2,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                    },
                    {
                        id: 3,
                        timeStart: "10:00",
                        timeEnd: "11:20",
                        office: "Кабинет 316",
                        theme: "#D55CFF",
                        lesson: "ОП.10 Численные методы",
                    }
                ]
            }
        ]
    }
];

const App = () => {
    const headerHeight = useHeaderHeight();
    const bottomInset = useSafeAreaInsets().bottom;
    
    // Log the data structure on component mount
    useEffect(() => {
        console.log('Data structure:', JSON.stringify(data, null, 2));
        console.log('TEST_DATA:', TEST_DATA);
    }, []);
    
    // Track the most visible day across the entire view
    const [visibleDay, setVisibleDay] = useState<string | null>(null);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    
    // Refs for scrolling
    const scrollViewRefs = useRef<ScrollView[]>([]);
    const pagerViewRef = useRef<PagerView>(null);

    // Animated border style for days
    const useAnimatedDayBorderStyle = (day: string) => {
        const animatedValue = useSharedValue(0);

        useEffect(() => {
            // Animate border when day matches visible day or is selected
            animatedValue.value = day.toLowerCase() === visibleDay?.toLowerCase() ? withTiming(1, { 
                duration: 150,
                easing: Easing.linear
            }) : withTiming(0, { 
                duration: 150,
                easing: Easing.linear
            });
        }, [day, visibleDay]);

        return useAnimatedStyle(() => ({
            borderColor: interpolateColor(
                animatedValue.value,
                [0, 1],
                ['transparent', '#41FFA4']
            ),
        }));
    };

    const handleVisibleDayChange = (day: string | null) => {
        if (day) {
            setVisibleDay(day);
        }
    };

    const handleDaySelect = (selectedDay: string) => {
        // Convert selectedDay to match the format in data
        const normalizedSelectedDay = selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1);
        
        // First, try to find the day in the current page
        const currentPageData = data[currentPageIndex];
        const currentPageDayIndex = currentPageData.days.findIndex(
            day => day.day.toLowerCase() === normalizedSelectedDay.toLowerCase()
        );
        
        let foundPage = null;
        
        // If day exists in current page, use that
        if (currentPageDayIndex !== -1) {
            foundPage = {
                pageIndex: currentPageIndex,
                dayIndex: currentPageDayIndex
            };
        } else {
            // If not in current page, search all pages
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
            // Update visible day
            setVisibleDay(normalizedSelectedDay.toLowerCase());
            
            // Scroll to the corresponding page in PagerView if not on current page
            if (foundPage.pageIndex !== currentPageIndex && pagerViewRef.current) {
                pagerViewRef.current.setPage(foundPage.pageIndex);
            }
            
            // Scroll to the specific day within the page
            setTimeout(() => {
                if (scrollViewRefs.current[foundPage.pageIndex]) {
                    // Calculate an estimated scroll position
                    const estimatedLessonHeight = 80; // Adjust based on your actual lesson height
                    const dayIndex = foundPage.dayIndex;
                    
                    // Calculate the vertical offset for the specific day
                    let dayOffset = 0;
                    for (let i = 0; i < dayIndex; i++) {
                        dayOffset += data[foundPage.pageIndex].days[i].lessons.length * estimatedLessonHeight + 50; // Add extra space between days
                    }
                    
                    // Subtract some offset to prevent complete scrolling
                    const safeScrollOffset = Math.max(0, dayOffset - 100);
                    
                    console.log('Scrolling to day:', {
                        selectedDay,
                        normalizedSelectedDay,
                        pageIndex: foundPage.pageIndex,
                        dayIndex,
                        dayOffset,
                        safeScrollOffset,
                        currentPageIndex
                    });
                    
                    scrollViewRefs.current[foundPage.pageIndex].scrollTo({
                        y: safeScrollOffset,
                        animated: true
                    });
                }
            }, 100); // Small delay to ensure page transition is complete
        } else {
            console.warn(`Day not found in any page: ${selectedDay}`);
        }
    };

    const findDayLocation = (targetDay: string) => {
        for (let pageIndex = 0; pageIndex < data.length; pageIndex++) {
            const dayIndex = data[pageIndex].days.findIndex(
                day => day.day.toLowerCase() === targetDay.toLowerCase()
            );
            
            if (dayIndex !== -1) {
                return { pageIndex, dayIndex };
            }
        }
        return null;
    };

    // Handle day selection and scrolling
    const handleDaySelectOriginal = (selectedDay: string) => {
        const dayLocation = findDayLocation(selectedDay);
        
        if (dayLocation) {
            const { pageIndex } = dayLocation;
            
            // If the day is not in the current page, change page first
            if (pageIndex !== currentPageIndex) {
                pagerViewRef.current?.setPage(pageIndex);
                setCurrentPageIndex(pageIndex);
            }
            
            // Scroll to the specific day after a short delay
            setTimeout(() => {
                if (scrollViewRefs.current[pageIndex]) {
                    // Get the screen dimensions
                    const { height: screenHeight } = Dimensions.get('window');
                    
                    // Measure the day's position
                    const dayView = (scrollViewRefs.current[pageIndex] as any).measureInWindow((x, y, width, height) => {
                        // Estimate day height (adjust this value based on your actual layout)
                        const estimatedDayHeight = height; // Use actual measured height
                        
                        // Calculate scroll position to show the entire day's content
                        const scrollPosition = 
                            y - 
                            (screenHeight / 2 - estimatedDayHeight / 2);
                        
                        scrollViewRefs.current[pageIndex].scrollTo({
                            y: Math.max(0, scrollPosition),
                            animated: true
                        });

                        // Update the visible day to match the selected day
                        setVisibleDay(selectedDay);
                    });
                }
            }, 300); // Delay to allow page change
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
                                const animatedBorderStyle = useAnimatedDayBorderStyle(day);
                                
                                return (
                                    <TouchableOpacity 
                                        key={index} 
                                        onPress={() => handleDaySelect(day)}
                                        style={{height: 50, overflow: 'visible'}}
                                    >
                                        <Animated.View 
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
                                                },
                                                animatedBorderStyle
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
                                        </Animated.View>
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
                    <DatePicker/>
                </View>
                <PagerView 
                    ref={pagerViewRef}
                    initialPage={0} 
                    style={styles.contentWrapper}
                    onPageSelected={(e) => {
                        const selectedPage = e.nativeEvent.position;
                        setCurrentPageIndex(selectedPage);
                        
                        // Set the visible day based on the current page
                        if (data[selectedPage] && data[selectedPage].days[0]) {
                            const firstDayOfPage = data[selectedPage].days[0].day.toLowerCase();
                            setVisibleDay(firstDayOfPage);
                        }
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
                                        scrollEventThrottle={20}
                                    >
                                        <Weeky 
                                            week={week.week} 
                                            days={week.days} 
                                            onVisibleDayChange={(day) => {
                                                // Only update if the day is from the current page
                                                if (index === currentPageIndex) {
                                                    handleVisibleDayChange(day);
                                                }
                                            }}
                                        />
                                    </ScrollView>
                                </View>
                            );
                        })
                    )}
                </PagerView>
                <View style={styles.tabBarContainer}>
                    <TabBar />
                </View>
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
        marginRight: 50
    },
    fadeOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 80,
        height: 40
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
