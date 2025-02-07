import React, { useState, useRef, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
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
import { useScheduleStore } from '@/store/api/schedule.store';
import { useTokenStore } from '@/store/api/token.store';
import { useNavigation } from '@react-navigation/native';

const App = () => {
    const headerHeight = useHeaderHeight();
    const navigation = useNavigation();
    const { studentId, fetchStudentId } = useScheduleStore();
    const { token } = useTokenStore.getState();

    useEffect(() => {
        const initializeStudentId = async () => {
            if (!token) {
                //@ts-ignore
                navigation.navigate('Home');
                return;
            }

            try {
                const id = await fetchStudentId();
                if (!id) {
                    console.error('Failed to fetch student ID')
                }
            } catch (error) {
                
            }
        };

        initializeStudentId();
    }, [token, fetchStudentId, navigation]);

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const scrollViewRefs = useRef<ScrollView[]>([]);
    const pagerViewRef = useRef<PagerView>(null);

    const { currentSchedule, fetchSchedule } = useScheduleStore();
    const [loading, setLoading] = useState(true);
    const [weekData, setWeekData] = useState<WeekProp[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchSchedule({});
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        if (currentSchedule) {
            console.log('Current Schedule Raw:', JSON.stringify(currentSchedule, null, 2));
            const transformedData = useScheduleStore.getState().transformScheduleToWeekData();
            console.log('Transformed Data:', JSON.stringify(transformedData, null, 2));
            
            // Ensure we have a valid array of days
            if (Array.isArray(transformedData) && transformedData.length > 0) {
                setWeekData(transformedData);
            } else {
                console.error('No valid schedule data found');
                setWeekData([]);
            }
        }
    }, [currentSchedule]);

    if (loading) {
        return (
            <LinearGradient
                colors={['#462ab2', '#1e124c']}
                style={styles.container}
            >
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            </LinearGradient>
        );
    }

    const handleDaySelect = (selectedDay: string) => {
        const normalizedSelectedDay = selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1);

        const currentPageData = weekData[currentPageIndex];
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
            for (let pageIndex = 0; pageIndex < weekData.length; pageIndex++) {
                const dayIndex = weekData[pageIndex].days.findIndex(
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
                    const dayIndex = foundPage.dayIndex;
                    let dayOffset = 0;
                    for (let i = 0; i < dayIndex; i++) {
                        const lessons = weekData[foundPage.pageIndex].days[i].lessons;
                        lessons.forEach((lesson) => {
                            dayOffset += 120;
                        });
                        dayOffset += 70;
                    }

                    scrollViewRefs.current[foundPage.pageIndex].scrollTo({
                        y: dayOffset,
                        animated: true
                    });
                }
            }, 200);
        }
    };

    const weekDays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница'];

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
                            {weekDays.map((day, index) => {
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
                                                    marginRight: weekDays.length - 1 === index ? 15 : 3,
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
                    {weekData.length === 0 ? (
                        <View style={styles.page}>
                            <Text style={styles.noDataText}>Нет данных о занятиях</Text>
                        </View>
                    ) : (
                        weekData.map((week, index) => {
                            return (
                                <View style={styles.page} key={index}>
                                    <ScrollView
                                        ref={(ref: ScrollView) => scrollViewRefs.current[index] = ref}
                                        showsVerticalScrollIndicator={false}
                                        style={[styles.scrollViewStyle]}
                                        contentContainerStyle={{ paddingBottom: headerHeight + headerHeight / 3.1 - 10 }}
                                    >
                                        <Weeky
                                            id={week.id}
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Poppins-Medium'
    },
    scrollViewStyle: {
        flex: 1,
        width: '100%',
        position: 'relative',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default App;
