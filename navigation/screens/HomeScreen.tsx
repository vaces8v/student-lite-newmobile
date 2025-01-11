import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from "../../components/shared/Input/Input";
import { Button } from "../../components/shared/Button/Button";
import * as Animatable from 'react-native-animatable';
import Animated, {
    useAnimatedStyle,
    useAnimatedKeyboard,
    withSpring
} from "react-native-reanimated";
import { useToast } from '@/context/ToastContext';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen({ }: HomeScreenNavigationProp) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const keyboard = useAnimatedKeyboard({ isStatusBarTranslucentAndroid: true });
    const { showToast } = useToast();
    const {
        checkInternetConnection,
    } = useNetworkStatus();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    async function loginSubmint() {
        const hasInternet = await checkInternetConnection();
        if (!hasInternet) {
            showToast('Нет подключения к интернету', 'warning');
            return;
        }

        if (!login && !password) {
            showToast('Пожалуйста, введите логин и пароль');
            return;
        }
        if (!login) {
            showToast('Пожалуйста, введите логин');
            return;
        }
        if (!password) {
            showToast('Пожалуйста, введите пароль');
            return;
        }

        try {
            if (login === 'user' && password === '123') {
                showToast('Успешный вход', 'success');
                navigation.replace('Tabs');
            } else {
                showToast('Неверный логин или пароль');
            }
        } catch (error) {
            showToast('Ошибка входа');
        }
    }

    const animatedStyles = useAnimatedStyle(() => {
        const translateY = keyboard.state.value === 4 ? 0 : -keyboard.height.value / 4;
        return {
            transform: [{ translateY: withSpring(translateY) }],
        };
    });

    return (
        <LinearGradient
            colors={['#462ab2', '#1e124c']}
            style={styles.container}>
            <Animated.View style={[styles.content, animatedStyles]}>
                <Animatable.View
                    animation="fadeIn"
                    iterationCount={1}
                    direction="alternate"
                    easing="ease-in-out"
                    duration={1000}
                    style={styles.logoContainer}
                >
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/logo.png')}
                        resizeMode="contain"
                    />
                </Animatable.View>
                <Animatable.View
                    animation="fadeIn"
                    iterationCount={1}
                    direction="alternate"
                    easing="ease-in-out"
                    duration={2000}
                    style={styles.form}>
                    <Input
                        onChangeText={setLogin}
                        value={login}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="off"
                        placeholderText="Логин" />
                    <Input
                        onChangeText={setPassword}
                        value={password}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="off"
                        isPassword
                        placeholderText="Пароль" />

                    <Button
                        onPress={loginSubmint}
                        text="Войти"
                    />
                </Animatable.View>
                <Animatable.View
                    animation="fadeIn"
                    iterationCount={1}
                    direction="alternate"
                    easing="ease-in-out"
                    duration={3000}
                    style={styles.form}>
                    <Pressable onPress={() => navigation.navigate('ResetPassword')}>
                        <Text style={styles.textReset}>Забыли пароль?</Text>
                    </Pressable>
                </Animatable.View>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 50,
    },
    content: {
        alignItems: 'center',
        gap: 20
    },
    logoContainer: {},
    textReset: {
        color: "#FFF",
        fontSize: 16,
        fontFamily: "Poppins-Medium",
        textAlign: "center",
        marginBottom: 5,
    },
    logo: {
        height: 40,
        width: 190,
        marginTop: 70,
    },
    form: {
        alignSelf: "stretch",
        gap: 15
    }
});