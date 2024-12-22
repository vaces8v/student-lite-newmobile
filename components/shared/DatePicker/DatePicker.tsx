import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Calendar, CalendarDays } from "lucide-react-native";
import { BlurView } from 'expo-blur';
import { useHeaderHeight } from '@react-navigation/elements';

const DatePicker = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode: 'date' | 'time') => {
        setShow(true);
        setMode(currentMode);
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
                onPress={() => showMode('date')}
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
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </TouchableOpacity>
    );
};

export default DatePicker;