import React from 'react';
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Calendar } from "lucide-react-native";
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';

const DatePicker = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const openDatePicker = () => {
        navigation.navigate('DatePicker');
    };

    return (
        <TouchableOpacity
            style={{
                marginRight: 5,
                marginLeft: 5,
                right: 0,
                top: -21,
                position: 'absolute'
            }}
            onPress={openDatePicker}
        >
            <View style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                overflow: 'hidden',
                marginHorizontal: 3,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <BlurView
                    intensity={30}
                    tint='prominent'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40,
                        width: 40,
                        borderRadius: 20
                    }}
                >
                    <Calendar size={24} color='white' strokeWidth={2} />
                </BlurView>
            </View>
        </TouchableOpacity>
    );
};

export default DatePicker;