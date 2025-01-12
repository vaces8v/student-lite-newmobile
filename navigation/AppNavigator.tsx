import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import HomeScreen from './screens/HomeScreen';
import ResetPassword from './screens/ResetPassword';
import MoreDetailsScreen from './screens/MoreDetailsScreen';
import QrCodeScreen from './screens/QRBoardScreeen';
import { RootStackParamList } from '../types/navigation';
import { ToastProvider } from '@/context/ToastContext';
import { LinearGradient } from 'expo-linear-gradient';
import { enableScreens } from 'react-native-screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { HoldMenuProvider } from 'react-native-hold-menu';

enableScreens(true);

const Stack = createSharedElementStackNavigator<RootStackParamList>();

export type MoreDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'MoreDetails'>;

export default function AppNavigator() {
    const { bottom } = useSafeAreaInsets();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <HoldMenuProvider safeAreaInsets={{bottom: bottom, right: 0, left: 0, top: 0}} theme="light">
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
                            <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal' }} />
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
                                                            extrapolate: 'clamp',
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
                </HoldMenuProvider>
        </GestureHandlerRootView>
    );
}