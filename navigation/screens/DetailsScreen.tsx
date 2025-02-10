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
import { addDays, format, subDays, startOfWeek, endOfWeek } from 'date-fns';

const App = () => {
    const headerHeight = useHeaderHeight();
    const navigation = useNavigation();
    const [visiblePages, setVisiblePages] = useState<WeekProp[]>([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const pagerViewRef = useRef(null);
    
    const { 
        fetchSchedule, 
        getCachedWeeks,
        isWeekCached,
        currentSchedule,
        isLoading 
    } = useScheduleStore();

    // Загрузка начальных данных
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Загружаем текущую, предыдущую и следующую недели одновременно
                await fetchSchedule({
                    isInitialLoad: true
                });

                // После загрузки всех данных обновляем видимые страницы
                const allWeeks = getCachedWeeks();
                if (allWeeks.length > 0) {
                    const currentDate = new Date();
                    const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
                    const currentWeekKey = format(currentWeekStart, 'yyyyMMdd');
                    
                    const currentWeekIndex = allWeeks.findIndex(week => week.week === currentWeekKey);
                    console.log('Current week key:', currentWeekKey);
                    console.log('Available weeks:', allWeeks.map(w => w.week));
                    console.log('Found week index:', currentWeekIndex);

                    if (currentWeekIndex !== -1) {
                        updateVisiblePages(currentWeekIndex);
                    }
                }
            } catch (error) {
                console.error('Error loading initial data:', error);
            }
        };

        loadInitialData();
    }, []);

    // Обновляем видимые страницы при изменении кэша
    useEffect(() => {
        if (!isLoading) {
            const allWeeks = getCachedWeeks();
            if (allWeeks.length > 0) {
                const currentDate = new Date();
                const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
                const currentWeekKey = format(currentWeekStart, 'yyyyMMdd');
                
                const currentWeekIndex = allWeeks.findIndex(week => week.week === currentWeekKey);

                if (currentWeekIndex !== -1) {
                    updateVisiblePages(currentWeekIndex);
                }
            }
        }
    }, [getCachedWeeks, isLoading]);

    const updateVisiblePages = (centerIndex: number) => {
        const allWeeks = getCachedWeeks();
        if (allWeeks.length === 0) return;

        console.log('Updating visible pages with center index:', centerIndex);
        console.log('All weeks:', allWeeks);

        // Получаем три недели для отображения
        const weeksToShow = [];
        for (let i = centerIndex - 1; i <= centerIndex + 1; i++) {
            if (i >= 0 && i < allWeeks.length) {
                weeksToShow.push(allWeeks[i]);
            }
        }

        console.log('Weeks to show:', weeksToShow);
        setVisiblePages(weeksToShow);

        // Подгружаем следующую неделю если нужно
        const lastWeek = allWeeks[centerIndex + 1];
        if (lastWeek) {
            try {
                const lastWeekDate = new Date(
                    lastWeek.week.slice(0, 4) + '-' + 
                    lastWeek.week.slice(4, 6) + '-' + 
                    lastWeek.week.slice(6, 8)
                );
                const nextWeekStart = startOfWeek(addDays(lastWeekDate, 7), { weekStartsOn: 1 });
                const nextWeekEnd = endOfWeek(addDays(lastWeekDate, 7), { weekStartsOn: 1 });
                
                if (!isWeekCached(format(nextWeekStart, 'yyyyMMdd'))) {
                    fetchSchedule({
                        startDate: format(nextWeekStart, 'yyyyMMdd'),
                        endDate: format(nextWeekEnd, 'yyyyMMdd'),
                        direction: 'next'
                    });
                }
            } catch (error) {
                console.error('Error loading next week:', error);
            }
        }

        // Подгружаем предыдущую неделю если нужно
        const firstWeek = allWeeks[centerIndex - 1];
        if (firstWeek) {
            try {
                const firstWeekDate = new Date(
                    firstWeek.week.slice(0, 4) + '-' + 
                    firstWeek.week.slice(4, 6) + '-' + 
                    firstWeek.week.slice(6, 8)
                );
                const prevWeekStart = startOfWeek(subDays(firstWeekDate, 7), { weekStartsOn: 1 });
                const prevWeekEnd = endOfWeek(subDays(firstWeekDate, 7), { weekStartsOn: 1 });

                if (!isWeekCached(format(prevWeekStart, 'yyyyMMdd'))) {
                    fetchSchedule({
                        startDate: format(prevWeekStart, 'yyyyMMdd'),
                        endDate: format(prevWeekEnd, 'yyyyMMdd'),
                        direction: 'prev'
                    });
                }
            } catch (error) {
                console.error('Error loading prev week:', error);
            }
        }
    };

    const handlePageSelected = (e: any) => {
        const newIndex = e.nativeEvent.position;
        const allWeeks = getCachedWeeks();
        
        // Находим индекс текущей недели в общем массиве
        const currentWeekIndex = allWeeks.findIndex(week => week.week === visiblePages[newIndex]?.week);
        
        if (currentWeekIndex !== -1) {
            setCurrentPageIndex(newIndex);
            updateVisiblePages(currentWeekIndex);
        }
    };

    const renderPage = (index: number) => {
        const weekData = visiblePages[index];
        console.log('Rendering page with data:', weekData);
        if (!weekData) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#462ab2" />
                </View>
            );
        }
        return (
            <View style={styles.weekContainer}>
                <Weeky
                    key={weekData.id}
                    id={weekData.id}
                    week={weekData.week}
                    days={weekData.days || []}
                />
            </View>
        );
    };

    if (isLoading) {
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
                                        onPress={() => console.log(day)}
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
                <PagerView
                    ref={pagerViewRef}
                    style={styles.contentWrapper}
                    initialPage={1}
                    onPageSelected={handlePageSelected}
                >
                    {visiblePages.map((weekData, index) => (
                        <View key={weekData?.id || index} style={styles.pageContainer}>
                            {renderPage(index)}
                        </View>
                    ))}
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
});

export default App;
