import React, { useState, useRef } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions
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
import Lesson from '@/components/shared/Lesson/Lesson';
import DatePicker from '@/components/shared/DatePicker/DatePicker';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const TEST_DATA = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

const data = [
    [
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
            timeStart: "8:20",
            timeEnd: "9:40",
            office: "Кабинет 316",
            theme: "#D55CFF",
            lesson: "ОП.10 Численные методы",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            id: 3,
            timeStart: "8:20",
            timeEnd: "9:40",
            office: "Кабинет 316",
            theme: "#3AF3FF",
            lesson: "ОП.10 Численные методы",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
    ],
    [
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
            timeStart: "8:20",
            timeEnd: "9:40",
            office: "Кабинет 316",
            theme: "#D55CFF",
            lesson: "ОП.10 Численные методы",
        },
        {
            id: 3,
            timeStart: "8:20",
            timeEnd: "9:40",
            office: "Кабинет 316",
            theme: "#3AF3FF",
            lesson: "ОП.10 Численные методы",
        },
        {
            id: 4,
            timeStart: "8:20",
            timeEnd: "9:40",
            office: "Кабинет 524",
            theme: "#FFED50",
            lesson: "МДК.11.01 Технология разработки и защиты баз данных",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
        },
        {
            id: 5,
            timeStart: "8:20",
            timeEnd: "9:40",
            office: "Кабинет 524",
            theme: "#3AF3FF",
            lesson: "ЕН.04 Экологические основы природопользования",
        },
    ],
    [
        {
            id: 3,
            timeStart: "8:20",
            timeEnd: "9:40",
            office: "Кабинет 316",
            theme: "#3AF3FF",
            lesson: "ОП.10 Численные методы",
        },
        {
            id: 4,
            timeStart: "8:20",
            timeEnd: "9:40",
            office: "Кабинет 524",
            theme: "#FFA235",
            lesson: "ОГСЭ.04 Иностранный язык в профессиональной деятельности",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
    ]
];

const App = () => {
    const bottomInset = useSafeAreaInsets().bottom;
    const headerHeight = useHeaderHeight();


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
                                maxHeight: 43,
                                flex: 1,
                                width: '100%',
                            }}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        >
                            {TEST_DATA.map((day, index) => (
                                <View key={index} style={{ height: 40, width: 'auto', borderRadius: 20, overflow: 'hidden', marginHorizontal: 3, marginRight: TEST_DATA.length - 1 === index ? 15 : 3, marginLeft: index === 0 ? 10 : 3 }}>
                                    <BlurView intensity={30} tint='prominent' style={{ display: 'flex', justifyContent: 'center', height: 40, paddingRight: 10, paddingLeft: 10, minWidth: 'auto' }}>
                                        <Text style={{ fontSize: 16, color: 'white', fontWeight: '400', fontFamily: 'Poppins-Medium', textAlign: 'center' }}>{day}</Text>
                                    </BlurView>
                                </View>
                            ))}
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
                <PagerView initialPage={0} style={styles.contentWrapper}>
                    {data.map((item, index) => (
                        <View style={styles.page} key={index}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={[styles.scrollViewStyle, { marginBottom: bottomInset }]}
                                contentContainerStyle={{ paddingBottom: headerHeight + headerHeight / 3.1 - 10 }}
                            >
                                {item.map((lesson, index) => (
                                    <Lesson
                                        key={lesson.id}
                                        timeStart={lesson.timeStart}
                                        timeEnd={lesson.timeEnd}
                                        office={lesson.office}
                                        theme={lesson.theme}
                                        lesson={lesson.lesson}
                                        content={lesson.content}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                    ))}
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
