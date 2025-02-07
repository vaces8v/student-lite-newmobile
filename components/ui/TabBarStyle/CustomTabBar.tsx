import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';
import DrawerIconSvg from '@/assets/svg/DrawerIcon';
import { UserCircle2 } from 'lucide-react-native';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={{...styles.container}}>
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

                    if (route.name === 'Profile') {
                        return (
                            <TouchableOpacity
                                key={'profile'}
                                style={styles.profileButton}
                                onPress={() => navigation.navigate('Profile')}
                            >
                                <UserCircle2 
                                    style={{
                                        zIndex: 10, 
                                        position: 'absolute', 
                                        opacity: state.routes[state.index].name === 'Profile' ? 1 : 0.6
                                    }} 
                                    color='white' 
                                    size={46} 
                                    strokeWidth={1} 
                                />
                            </TouchableOpacity>
                        );
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={onPress}
                            style={{...styles.tabButton, marginLeft: index === 0 ? 15 : (index === 1 ? 10 : 0)}}
                        >
                            <Animated.View style={{ opacity: isFocused ? 1 : 0.6}}>
                                {options.tabBarIcon()}
                            </Animated.View>
                        </TouchableOpacity>
                    );
                })}
                <TouchableOpacity
                    onPress={() => navigation.getParent()?.openDrawer()}
                    style={{...styles.tabButton, marginRight: 15}}
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
        bottom: 0,
        width: '96%',
        left: '2%',
        right: '2%',
        marginBottom: 20,
        overflow: 'hidden',
        borderRadius: 100,
        zIndex: 999
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
    },
    profileButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
    },
});

export default CustomTabBar;