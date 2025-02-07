import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';


LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ],
  monthNamesShort: [
    'Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 
    'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'
  ],
  dayNames: [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 
    'Четверг', 'Пятница', 'Суббота'
  ],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
};
LocaleConfig.defaultLocale = 'ru';

interface DatePickerBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

const DatePickerBottomSheet: React.FC<DatePickerBottomSheetProps> = ({ bottomSheetModalRef }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();

  // variables
  const screenWidth = Dimensions.get('window').width;

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    bottomSheetModalRef.current?.dismiss();
    navigation.goBack();
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Выберите дату</Text>
      <Calendar
        style={{
          width: screenWidth - 32,
          alignSelf: 'center',
        }}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#462ab2',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#462ab2',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#462ab2',
          selectedDotColor: '#ffffff',
          arrowColor: '#462ab2',
          monthTextColor: '#462ab2',
          textDayFontSize: 18,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#462ab2'
          }
        }}
        locale="ru"
      />
      {/* Add some extra space at the bottom */}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#462ab2',
    alignSelf: 'flex-start',
    width: '100%',
  },
});

export default DatePickerBottomSheet;
