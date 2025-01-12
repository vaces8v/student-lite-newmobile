import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons'; // Убедитесь, что у вас установлен expo/vector-icons
import DrawerIconSvg from '@/assets/svg/DrawerIcon';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            <BlurView intensity={25} tint='prominent' experimentalBlurMethod='dimezisBlurView' style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };


                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={onPress}
                            style={styles.tabButton}
                        >
                            <Animated.View style={{ opacity: isFocused ? 1 : 0.5 }}>
                                {options.tabBarIcon()}
                            </Animated.View>
                        </TouchableOpacity>
                    );
                })}
                <TouchableOpacity
                    onPress={() => navigation.navigate('QRBoard')}
                    style={styles.tabButton}
                >
                    <Animated.View style={{ opacity: 0.5 }}>
                        <DrawerIconSvg />
                    </Animated.View>
                </TouchableOpacity>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        position: 'absolute',
        bottom: 40,
        width: '96%',
        left: '2%',
        right: '2%',
        marginBottom: 20,
        overflow: 'hidden',
        borderRadius: 100
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
    },
});

export default CustomTabBar;