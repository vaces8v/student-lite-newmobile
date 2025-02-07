import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import ResetPassword from './screens/ResetPassword';
import QrCodeScreen from './screens/QRBoardScreeen';
import DatePickerScreen from './screens/DatePickerScreen';
import { RootStackParamList } from '../types/navigation';
import { ToastProvider } from '@/context/ToastContext';
import { LinearGradient } from 'expo-linear-gradient';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import { HoldMenuProvider } from 'react-native-hold-menu';
import { useTokenStore } from '@/store/api/token.store';

enableScreens(true);

const Stack = createNativeStackNavigator<RootStackParamList>();

export type MoreDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'MoreDetails'>;

interface AppNavigatorProps {
    initialRoute?: keyof RootStackParamList;
}

export default function AppNavigator({ initialRoute = "Home" }: AppNavigatorProps) {
    const { bottom } = useSafeAreaInsets();
    const { token } = useTokenStore();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <HoldMenuProvider
                safeAreaInsets={{ bottom: bottom, right: 0, left: 0, top: 0 }} theme="light">
                <ToastProvider>
                    <NavigationContainer>
                        <Stack.Navigator
                            id={undefined}
                            screenOptions={{
                                headerShown: true,
                                gestureEnabled: true,
                                gestureDirection: 'horizontal',
                                headerStyle: {
                                    backgroundColor: 'transparent'
                                },
                                headerTitleStyle: {
                                    color: 'white'
                                }
                            }}
                            initialRouteName={initialRoute}
                        >
                            <Stack.Screen 
                                name="Tabs"
                                component={DrawerNavigator} 
                                options={{ 
                                    headerShown: false,
                                    headerTransparent: false, 
                                    gestureEnabled: true,
                                    animation: 'fade',
                                    gestureDirection: 'horizontal',
                                }} 
                            />
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{
                                    title: 'Главная',
                                    headerShown: false,
                                    animation: 'fade',
                                    contentStyle: { 
                                        paddingBottom: bottom 
                                    }
                                }}
                            />
                            <Stack.Screen
                                name="ResetPassword"
                                component={ResetPassword}
                                options={{
                                    title: 'Сбросить пароль',
                                    presentation: 'transparentModal',
                                    animation: 'slide_from_bottom',
                                    headerShown: false,
                                    contentStyle: { 
                                        paddingBottom: bottom 
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
                                    headerShown: false,
                                    contentStyle: { 
                                        paddingBottom: bottom 
                                    },
                                }}
                            />
                            <Stack.Screen
                                name="DatePicker"
                                component={DatePickerScreen}
                                options={{
                                    presentation: 'transparentModal',
                                    animation: 'fade',
                                    headerShown: false,
                                    contentStyle: { 
                                        paddingBottom: bottom 
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