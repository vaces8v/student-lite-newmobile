import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Cloudy from '../assets/svg/Cloudely';
import { LinearGradient } from 'expo-linear-gradient';
import CustomTabBar from '@/components/ui/TabBarStyle/CustomTabBar';
import HomeSvg from '../assets/svg/Home';
import WeatherSvg from '../assets/svg/Weather';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <>
            <Tab.Navigator id={undefined} tabBar={props => <CustomTabBar {...props} />}>
                <Tab.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{
                        title: 'Расписание',
                        tabBarIcon: () => <HomeSvg />,
                        headerShown: true,
                        headerTintColor: 'white',
                        animation: 'none',
                        headerTitleStyle: {
                            fontFamily: 'Poppins-Medium',
                            fontSize: 26,
                            marginTop: 10
                        },
                        headerBackground: () => (
                            <LinearGradient
                                colors={['#462ab2', '#462ab2']} style={{ flex: 1 }} />
                        ),
                        headerRight: () => (
                            <TouchableOpacity activeOpacity={0.9} style={styles.weatherInfo}>
                                <Cloudy />
                                <Text style={styles.temperature}>+15°</Text>
                            </TouchableOpacity>
                        ),
                    }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => <WeatherSvg />, animation: 'none', headerShown: false }} />
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