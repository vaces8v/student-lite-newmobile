import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Button, View, Dimensions, ViewStyle, Text, TouchableOpacity, Alert } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
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
import { LinearGradient } from 'expo-linear-gradient';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { BlurView } from 'expo-blur';
import { LogOut, Scan, SwitchCamera } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';

const ScreenHeight = Dimensions.get("window").height;

const QrCodeScreen = () => {
    const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const screenHeight = Dimensions.get('window').height;
    const insetsHeight = useSafeAreaInsets().top;
    const snapPoints = useMemo(() => [screenHeight], [screenHeight]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>('back');

    const blurOpacity = useSharedValue(0);

    useEffect(() => {
        const checkAndRequestPermission = async () => {
            if (!permission?.granted) {
                const status = await requestPermission();
                if (!status?.granted) {
                    Alert.alert(
                        'Разрищение на камеру',
                        'Разрешение на камеру обязательно для сканирования QR-кодов.',
                        [{ text: 'OK', onPress: () => navigation.goBack() }]
                    );
                    return;
                }
            }
            bottomSheetModalRef.current?.present();
        };

        checkAndRequestPermission();
    }, [permission, requestPermission, navigation])

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

    const handleBarCodeScanned = (scanResult: { data: string }) => {
        Alert.alert("QR Code Scanned", `Data: ${scanResult.data}`);
    };

    function switchFacing() {
        if (facing === "front") {
            setFacing("back")
        } else {
            setFacing("front")
        }
    }

    return (
        <GestureHandlerRootView style={[styles.container, { marginTop: insetsHeight }]}>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    snapPoints={snapPoints}
                    onDismiss={handleDismiss}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView style={[styles.contentContainer]}>
                        {!permission ? (
                            <LinearGradient
                                colors={['#462ab2', '#1e124c']}
                                className="flex flex-1 items-center justify-center" style={{ flex: 1, width: '100%' }}>
                                <View className="flex justify-center items-center overflow-hidden rounded-[20px]">
                                    <BlurView intensity={30} className="h-[200px] w-[350px]">
                                        <View className="flex justify-center items-center w-full h-full">
                                            <Text className="text-white text-[20px]">Нужно разрешение</Text>
                                            <Text className="text-white text-[20px]">для получения доступа к камере</Text>
                                        </View>
                                    </BlurView>
                                </View>
                                <TouchableOpacity onPress={requestPermission} className="mt-[10px] h-[50px] w-[350px] overflow-hidden rounded-[20px]">
                                    <BlurView intensity={30} className="flex items-center justify-center h-[50px]">
                                        <Text className="text-white text-[18px]">Получить доступ</Text>
                                    </BlurView>
                                </TouchableOpacity>
                            </LinearGradient>
                        ) : (
                            <CameraView
                                style={styles.camera}
                                facing={facing}
                                barcodeScannerSettings={{
                                    barcodeTypes: ["qr"],
                                }}
                                onBarcodeScanned={handleBarCodeScanned}
                            >
                                <View
                                    style={{ marginTop: ScreenHeight / 6, padding: 10, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', width: 200, height: 50 }}>
                                    <BlurView
                                        intensity={80}
                                        tint="dark"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, width: 320, height: 60 }}>
                                        <Text style={{ fontSize: 18, color: "#ffffff" }}>Отсканируйте QR-код</Text>
                                    </BlurView>
                                </View>
                                <View
                                    style={{ flex: 1 }}>
                                    <Animatable.View
                                        animation="pulse"
                                        easing="ease-out"
                                        iterationCount="infinite">
                                        <Scan color="#ffffff" strokeWidth={.25} size={350} />
                                    </Animatable.View>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <View
                                        style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: ScreenHeight / 5, padding: 10, borderRadius: 100, width: 80, height: 80, overflow: 'hidden' }}>
                                        <BlurView
                                            intensity={80}
                                            tint="dark"
                                            style={{ padding: 10, width: 110, height: 100, marginBottom: -10, justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                onPress={switchFacing}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                <SwitchCamera style={{ marginRight: 2, marginBottom: 10 }} color="#ffffff" size={60}
                                                    strokeWidth={0.75} />
                                            </TouchableOpacity>
                                        </BlurView>
                                    </View>
                                    <View
                                        style={{ marginTop: ScreenHeight / 5, padding: 10, borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', width: 80, height: 80 }}>
                                        <BlurView
                                            intensity={80}
                                            tint="dark"
                                            style={{ padding: 10, width: 110, height: 100, marginBottom: 10, justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('Details')}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                <LogOut style={{ marginLeft: 5, marginBottom: -10 }} color="#ffffff" size={50} strokeWidth={0.75} />
                                            </TouchableOpacity>
                                        </BlurView>
                                    </View>
                                </View>
                            </CameraView>
                        )}
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        maxHeight: '100%',
    },
    message: {
        fontSize: 20,
        color: "white",
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: "100%",
        backgroundColor: 'transparent',
        marginBottom: 80
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    blurView: {
        marginTop: 10,
        padding: 10,
    },
});

QrCodeScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

export default QrCodeScreen;
