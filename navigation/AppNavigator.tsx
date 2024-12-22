import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ResetPassword from './screens/ResetPassword';
import MoreDetailsScreen from './screens/MoreDetailsScreen';
import QrCodeScreen from './screens/QRBoardScreeen';
import { RootStackParamList } from '../types/navigation';
import { ToastProvider } from '@/context/ToastContext';
import { LinearGradient } from 'expo-linear-gradient';
import Cloudy from '../assets/svg/Cloudely';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Stack = createStackNavigator<RootStackParamList>();

export type MoreDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'MoreDetails'>;

export default function AppNavigator() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <ToastProvider>
                    <NavigationContainer>
                        <Stack.Navigator
                            id={undefined}
                            screenOptions={{
                                headerShown: false,
                                gestureEnabled: true,
                                gestureDirection: 'horizontal',
                                headerBackground: () => (
                                    <LinearGradient
                                        colors={['#321f7e', '#462ab2']}
                                        style={{ flex: 1 }} />
                                ),
                            }}
                            initialRouteName="Home"
                        >
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{
                                    title: 'Главная',
                                    header: () => null,
                                    animation: 'fade'
                                }}
                            />
                            <Stack.Screen
                                name="Details"
                                component={DetailsScreen}
                                options={{
                                    title: 'Расписание',
                                    presentation: 'card',
                                    headerShown: true,
                                    headerTintColor: 'white',
                                    animation: 'fade',
                                    headerRight: () => (
                                        <TouchableOpacity activeOpacity={0.9} style={styles.weatherInfo}>
                                            <Cloudy />
                                            <Text style={styles.temperature}>+15°</Text>
                                        </TouchableOpacity>
                                    ),
                                }}
                            />
                            <Stack.Screen
                                name="MoreDetails"
                                component={MoreDetailsScreen}
                                options={{
                                    headerTintColor: 'white',
                                    animation: 'reveal_from_bottom',
                                    headerShown: true
                                }}
                            />
                            <Stack.Screen
                                name="ResetPassword"
                                component={ResetPassword}
                                options={{
                                    title: 'Сбросить пароль',
                                    presentation: 'transparentModal',
                                    animation: 'slide_from_bottom',
                                    header: () => null,
                                    cardStyleInterpolator: ({ current, layouts }) => {
                                        return {
                                            cardStyle: {
                                                transform: [
                                                    {
                                                        translateY: current.progress.interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: [layouts.screen.height, 0],
                                                        }),
                                                    },
                                                ],
                                            },
                                            overlayStyle: {
                                                opacity: current.progress.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, 0.5],
                                                    extrapolate: 'clamp',
                                                }),
                                            },
                                        };
                                    },
                                }}
                            />
                            <Stack.Screen
                                name="QRBoard"
                                component={QrCodeScreen}
                                options={{
                                    title: 'Сбросить пароль',
                                    presentation: 'transparentModal',
                                    animation: 'slide_from_bottom',
                                    header: () => null,
                                    cardStyleInterpolator: ({ current, layouts }) => {
                                        return {
                                            cardStyle: {
                                                transform: [
                                                    {
                                                        translateY: current.progress.interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: [layouts.screen.height, 0],
                                                        }),
                                                    },
                                                ],
                                            },
                                            overlayStyle: {
                                                opacity: current.progress.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, 0.5],
                                                    extrapolate: 'clamp',
                                                }),
                                            },
                                        };
                                    },
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ToastProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    weatherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    temperature: {
        color: 'white',
        fontSize: 24,
        marginTop: 7,
        fontFamily: 'Poppins-Medium',
    }
});