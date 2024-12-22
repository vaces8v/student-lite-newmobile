import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Button, View, Dimensions, ViewStyle} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ResetPassword = () => {
    const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const screenHeight = Dimensions.get('window').height;
    const insetsHeight = useSafeAreaInsets().top;
    const snapPoints = useMemo(() => [screenHeight / 2], [screenHeight]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const blurOpacity = useSharedValue(0);
    useEffect(() => {
        bottomSheetModalRef.current?.present();
    }, [])

    const handlePresentModalPress = useCallback(() => {
        setModalVisible(true);
        blurOpacity.value = withTiming(1, {
            duration: 300,
            easing: Easing.ease
        });
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current?.present();
        }
    }, []);

    const handleDismiss = useCallback(() => {
        blurOpacity.value = withTiming(0, {
            duration: 300,
            easing: Easing.ease
        });
        navigation.goBack()
        setModalVisible(false);
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current?.dismiss();
        }
    }, []);

    return (
        <GestureHandlerRootView style={[styles.container, {marginTop: insetsHeight}]}>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    snapPoints={snapPoints}
                    onDismiss={handleDismiss}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView style={[styles.contentContainer]}>
                        <ScrollView 
                        nestedScrollEnabled={true}
                        style={styles.scrollViewStyle}>
                            {Array.from({length: 20}).map((_, index) => (
                                <View key={index} style={styles.items}></View>
                            ))}
                        </ScrollView>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    items: {
        height: 100,
        marginVertical: 10,
        width: '100%',
        backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
        paddingHorizontal: 20
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        maxHeight: '100%',
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
        paddingHorizontal: 20
    },
});

ResetPassword.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

export default ResetPassword;
