import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    Modal
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
import {addDays, format, subDays, startOfWeek, endOfWeek, getISOWeek} from 'date-fns';
import {weeksArray} from "@/util/arrayWeeksGenerate";
import { getWeeksFromStorage, saveWeeksToStorage } from '@/util/saveWeeks';
import { Award } from 'lucide-react-native';

const App = () => {
    const [allPages, setAllPages] = useState<WeekProp[]>(weeksArray);
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(getISOWeek(new Date()) - 1);

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingAdditionalWeeks, setLoadingAdditionalWeeks] = useState(false);
    const pagerViewRef = useRef(null);


    const { 
        fetchSchedule, 
        getCachedWeeks,
        isWeekCached,
        currentSchedule,
        isLoading,
        clearCache,
        getScheduleByWeekIndex
    } = useScheduleStore();
    useEffect(() => {
        const loadInitialData = async () => {
            setRefreshing(true);

            try {
                const data = await getScheduleByWeekIndex(currentPageIndex);
                
                const indexToUpdate = allPages.findIndex((week) => week.id === currentPageIndex);
                
                if (indexToUpdate !== -1 && data) {
                    const updatedPages = [...allPages];
                    updatedPages[indexToUpdate] = { 
                        ...updatedPages[indexToUpdate], 
                        days: data.days
                    };
                    setAllPages(updatedPages);
                } else {
                    
                }
            } catch (error) {

            } finally {
                setRefreshing(false);
            }
        };
    
        loadInitialData();
    }, []); 

    useEffect(() => {
        const loadInitialData = async () => {
            setRefreshing(true);
    
            try {
                let cachedWeeks = await getWeeksFromStorage();
    
                if (!cachedWeeks) {
                    cachedWeeks = weeksArray;
                }
    
                const indexToUpdate = cachedWeeks.findIndex((week) => week.id === currentPageIndex);
    
                if (indexToUpdate !== -1) {
                    const data = await getScheduleByWeekIndex(currentPageIndex);
                    if (data) {
                        cachedWeeks[indexToUpdate] = {
                            ...cachedWeeks[indexToUpdate],
                            days: data.days,
                        };
                        saveWeeksToStorage(cachedWeeks);
                        setAllPages(cachedWeeks);
                    }
                }
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setRefreshing(false);
            }
        };
    
        loadInitialData();
    }, [currentPageIndex]);

    const handlePageSelected = async (e: any) => {
        const newIndex = e.nativeEvent.position;
        setCurrentPageIndex(newIndex);
        try {
            const data = await getScheduleByWeekIndex(newIndex);
            if (data) {
                const updatedWeeks = [...allPages];
                updatedWeeks[newIndex] = {
                    ...updatedWeeks[newIndex],
                    days: data.days,
                };
                saveWeeksToStorage(updatedWeeks);
                setAllPages(updatedWeeks);
            }
        } catch (error) {
            console.error('Ошибка при обновлении недели:', error);
        }
    };
    const onRefresh = useCallback(async () => {
        if (refreshing) return;
    
        try {
            setRefreshing(true);
            const allWeeks = getCachedWeeks();
            const currentDate = new Date();
            const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
            const currentWeekKey = format(currentWeekStart, 'yyyyMMdd');

            const newData = await fetchSchedule({
                startDate: currentWeekKey,
                endDate: format(endOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyyMMdd'),
                isInitialLoad: false
            });
            const currentWeekIndex = allWeeks.findIndex(week => week.week === currentWeekKey);
            if (currentWeekIndex !== -1) {
                setLoadingAdditionalWeeks(true);
                const prevWeekStart = startOfWeek(subDays(currentDate, 7), { weekStartsOn: 1 });
                const prevWeekKey = format(prevWeekStart, 'yyyyMMdd');
                if (!isWeekCached(prevWeekKey)) {
                    await fetchSchedule({
                        startDate: prevWeekKey,
                        endDate: format(endOfWeek(prevWeekStart, { weekStartsOn: 1 }), 'yyyyMMdd'),
                        direction: 'prev'
                    });
                }
                const nextWeekStart = startOfWeek(addDays(currentDate, 7), { weekStartsOn: 1 });
                const nextWeekKey = format(nextWeekStart, 'yyyyMMdd');
                if (!isWeekCached(nextWeekKey)) {
                    await fetchSchedule({
                        startDate: nextWeekKey,
                        endDate: format(endOfWeek(nextWeekStart, { weekStartsOn: 1 }), 'yyyyMMdd'),
                        direction: 'next'
                    });
                }
            }
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
            setLoadingAdditionalWeeks(false);
        }
    }, []);


    if (isLoading && !refreshing || loading) {
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

    const weekDays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

    return (
        <GestureHandlerRootView style={styles.container}>
            <LinearGradient
                colors={['#462ab2', '#1e124c']}
                style={styles.container}>
                {loadingAdditionalWeeks && (
                    <View style={styles.smallLoadingIndicator}>
                        <ActivityIndicator size="small" color="white" />
                    </View>
                )}
                <View style={{ position: 'relative', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', flex: 1 / 12, height: 43 }}>
                    <View style={styles.scrollViewContainer}>
                        <ScrollView
                            style={{
                                height: 40,
                                maxHeight: 42,
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
                    </View>
                    <DatePicker />
                </View>
                {!loading && (
                    <PagerView
                        ref={pagerViewRef}
                        style={styles.contentWrapper}
                        initialPage={getISOWeek(new Date()) - 1}
                        onPageSelected={handlePageSelected}
                    >
                        {Array.from(Array(52).keys()).map((_, index) => (
                            <View key={index} style={styles.pageContainer}>
                                <Weeky id={index} week={allPages[index].week} days={allPages[index].days} refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                        tintColor="#462ab2"
                                        titleColor="#462ab2"
                                        colors={['#462ab2']}
                                        progressBackgroundColor="#FFFFFF"
                                    />}/>
                            </View>
                        ))}
                    </PagerView>
                )}
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
    contentWrapper: {
        flex: 1,
        paddingBottom: 80
    },
    pageContainer: {
        flex: 1,
        width: '100%',
    },
    weekContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallLoadingIndicator: {
        position: 'absolute',
        top: 60,
        right: 10,
        zIndex: 1000
    },
});

export default App;
