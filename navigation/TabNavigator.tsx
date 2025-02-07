import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetailsScreen from './screens/DetailsScreen';
import WeatherScreen from './screens/WeatherScreen';
import ProfileScreen from './screens/ProfileScreen';
import WeatherSvg from '@/assets/svg/Weather';
import HomeSvg from '@/assets/svg/Home';
import CustomTabBar from '@/components/ui/TabBarStyle/CustomTabBar';
import Cloudy from '../assets/svg/Cloudely';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MessagesScreen from './screens/MessagesScreen';
import MessageSVG from '@/assets/svg/Message';
import BookSvg from '@/assets/svg/Book'; // updated import

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <>
            <Tab.Navigator
                id={undefined}
                tabBar={props => <CustomTabBar {...props} />}
                screenOptions={({ route }) => ({
                    headerShown: true,
                    tabBarShowLabel: false,
                    animation: "none",
                    tabBarPosition: "bottom",
                    headerTintColor: 'white',
                    headerTransparent: false,
                    tabBarStyle: {
                        backgroundColor: '#ffffff',
                        borderTopWidth: 0,
                        elevation: 0,
                        height: 70,
                        zIndex: 999
                    },
                    headerStyle: {
                        backgroundColor: '#462ab2',
                        elevation: 0,
                        shadowOpacity: 0
                    },
                    tabBarButton: (props) => (
                        <TouchableOpacity {...props} activeOpacity={0.7} />
                    ),
                })}
                initialRouteName="Details"
            >
                <Tab.Screen
                    name="Weather"
                    component={WeatherScreen}
                    options={{
                        tabBarIcon: () => <WeatherSvg />,
                        animation: 'none',
                        headerTitle: "Погода КМПО",
                        headerShadowVisible: false,
                        headerLeft: () => <MaterialCommunityIcons
                            style={{ marginLeft: 20, marginRight: 5, marginBottom: 5 }}
                            name="weather-cloudy"
                            size={36}
                            color="white"
                        />,
                        headerTitleStyle: {
                            fontFamily: 'Poppins-Medium',
                            fontSize: 26,
                            color: 'white'
                        },
                        headerStyle: {
                            backgroundColor: '#462ab2'
                        }
                    }} />
                <Tab.Screen
                    name="Messages"
                    component={MessagesScreen}
                    options={{
                        title: "Сообщения",
                        headerTransparent: true,
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: "transparent"
                        },
                        headerTitleStyle: {
                            fontFamily: 'Poppins-Medium',
                            fontSize: 26,
                            marginTop: 10
                        },
                        tabBarIcon: () => <MessageSVG />,
                        tabBarButton: () => null,
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: () => null,
                        tabBarButton: () => null,
                    }}
                />
                <Tab.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{
                        title: 'Расписание',
                        tabBarIcon: () => <BookSvg />,
                        headerTintColor: 'white',
                        headerTitleStyle: {
                            fontFamily: 'Poppins-Medium',
                            fontSize: 26,
                            color: 'white'
                        },
                        headerBackground: () => (
                            <LinearGradient
                                colors={['#462ab2', '#462ab2']}
                                style={{ flex: 1 }}
                            />
                        ),
                        headerRight: () => (
                            <TouchableOpacity activeOpacity={0.9} style={styles.weatherInfo}>
                                <Cloudy />
                                <Text style={styles.temperature}>+15°</Text>
                            </TouchableOpacity>
                        ),
                    }} />

            </Tab.Navigator>
        </>
    );
};

export default TabNavigator;


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