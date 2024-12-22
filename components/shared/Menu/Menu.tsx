import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    Text 
} from 'react-native';
import Animated, { 
    FadeInDown,
    FadeOut,
    SlideInDown,
    SlideOutDown,
    Layout
} from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';

import HomeSvg from '../../../assets/svg/Home';
import MailSvg from '../../../assets/svg/Mail';
import WeatherSvg from '../../../assets/svg/Weather';
import DrawerIconSvg from '../../../assets/svg/DrawerIcon';
import { ChevronDown, QrCode } from 'lucide-react-native';
import { Avatar } from 'react-native-elements';

const ScreenWidth = Dimensions.get("window").width;
const avatarSrc = '';

interface TabBarProps {
    isAnimated?: boolean;
}

export function TabBar({ isAnimated = false }: TabBarProps) {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute().name;

    const shouldShowTabBar = 
        route !== 'Home' && 
        route !== 'ResetPassword' &&
        route !== 'QRBoard';

    if (!shouldShowTabBar) {
        return null;
    }

    const NavContainer = isAnimated ? Animated.View : View;

    return (
        <NavContainer 
            entering={isAnimated ? FadeInDown : undefined}
            exiting={isAnimated ? FadeOut : undefined}
            style={styles.navContainer}
        >
            <TouchableOpacity 
                disabled={route === 'Home'}
                onPress={() => navigation.navigate('Home')}
            >
                <HomeSvg/>
            </TouchableOpacity>

            <TouchableOpacity
                disabled={route === 'Details'}
                onPress={() => navigation.navigate('Details')}
            >
                <WeatherSvg />
            </TouchableOpacity>

            {avatarSrc ? (
                <TouchableOpacity
                    disabled={route === 'Profile'}
                    style={styles.avatarContainer}
                >
                    <Avatar
                        size="medium"
                        source={{ uri: avatarSrc }}
                        imageProps={{ style: styles.avatarImage }}
                        icon={{name: 'user', type: 'font-awesome'}}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    disabled={route === 'Profile'}
                    style={styles.avatarContainerDefault}
                >
                    <Avatar
                        size="medium"
                        imageProps={{ style: styles.avatarDefault }}
                        icon={{name: 'user', type: 'font-awesome'}}
                    />
                </TouchableOpacity>
            )}
            
            <MailSvg/>
            
            <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => setOpenMenu(prev => !prev)}
            >
                <DrawerIconSvg/>
            </TouchableOpacity>

            {openMenu  && (
                <Animated.View 
                    entering={SlideInDown.duration(300)}
                    exiting={SlideOutDown.duration(300)}
                    layout={Layout.springify()}
                    style={[styles.menuContainer, { 
                        transform: [{ translateY: 0 }],
                        opacity: 0.9 
                    }]}
                >
                    <View className="relative ml-[5px] flex flex-col w-full h-full">
                        <Text className="text-white text-[20px] mt-[10px]">Меню</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('QRBoard')}
                            className="gap-[5px] mt-[10px] flex flex-row items-center"
                        >
                            <QrCode color="#ffffff" size={32} />
                            <Text className="text-white text-[16px]">ВОЙТИ ПО КОДУ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="absolute top-[5px] right-[10px]"
                            onPress={() => setOpenMenu(false)}
                        >
                            <ChevronDown 
                                size={42} 
                                className="text-white brightness-0" 
                                color={"white"}
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

        </NavContainer>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        bottom: 0,
        paddingHorizontal: 10,
        height: 70,
        borderRadius: 41,
        marginBottom: 73,
        marginLeft: ScreenWidth / 100,
        width: '98%',
        backgroundColor: '#4A3767',
    },
    avatarContainer: {
        width: 45,
        height: 45,
        borderRadius: 50 / 2,
        overflow: 'hidden',
    },
    avatarContainerDefault: {
        width: 45,
        height: 45,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImage: {
        backgroundColor: 'none',
        width: '94%',
        height: '90%',
        marginLeft: '-3%'
    },
    avatarDefault: {
        backgroundColor: 'rgba(217, 217, 217, .1)',
    },
    menuContainer: {
        transformOrigin: "bottom-right",
        backgroundColor: '#4A3767',
        marginRight: 10,
        width: 180,
        height: 250,
        position: 'absolute',
        right: 0,
        top: -260,
        borderRadius: 20,
    }
});