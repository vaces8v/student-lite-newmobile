import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    interpolate
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DatePickerBottomSheet from '@/components/shared/BottomSheet/DatePickerBottomSheet';
import { BlurView } from 'expo-blur';

const DatePickerScreen = () => {
    const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);
    const screenHeight = Dimensions.get('window').height;
    const snapPoints = useMemo(() => [screenHeight * 0.59], [screenHeight]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const blurOpacity = useSharedValue(0);
    const [isSheetReady, setIsSheetReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            bottomSheetModalRef.current?.present();
            setIsSheetReady(true);
            blurOpacity.value = withTiming(1, {
                duration: 300,
                easing: Easing.ease
            });
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = useCallback(() => {
        blurOpacity.value = withTiming(0, {
            duration: 300,
            easing: Easing.ease
        });
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current?.dismiss();
            navigation.goBack();
        }
    }, [navigation]);

    const statusBarBackgroundStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolate(
            blurOpacity.value,
            [0, 1],
            [0, 0.5]
        );
        return {
            backgroundColor: `rgba(0,0,0,${backgroundColor})`,
        };
    });

    return (
        <TouchableWithoutFeedback onPress={handleDismiss}>
            <GestureHandlerRootView style={[styles.container]}>
                
                <Animated.View style={[styles.absolute, statusBarBackgroundStyle]} />
                <BottomSheetModalProvider>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={snapPoints}
                        onDismiss={handleDismiss}
                        enableDynamicSizing={false}
                        enablePanDownToClose={true}
                        backgroundStyle={styles.bottomSheetBackground}
                        backdropComponent={() => (<BlurView
                            style={styles.absolute}
                            tint='prominent'
                            intensity={5}
                            experimentalBlurMethod='dimezisBlurView'
                        />)}
                    >
                        <TouchableWithoutFeedback>
                            <BottomSheetView>
                                {isSheetReady && (
                                    <DatePickerBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
                                )}
                            </BottomSheetView>
                        </TouchableWithoutFeedback>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </TouchableWithoutFeedback>
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
    bottomSheetBackground: {
        backgroundColor: 'white',  // Use a neutral background color
        borderRadius: 16,  // Optional: add rounded corners
    },
});

DatePickerScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

export default DatePickerScreen;
