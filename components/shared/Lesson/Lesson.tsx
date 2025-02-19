import React, { useMemo } from 'react';
import { Dimensions, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { HoldItem } from "react-native-hold-menu";
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export interface LessonProp {
  id: number;
  timeStart: string;
  timeEnd: string;
  lesson: string;
  office: string;
  content?: string;
  estimation: string[];
  estimationComments: string[];
  teacher: string;
  homework: string[];
  theme: string;
}

const generateColorFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = (hash % 240 + 60) % 360;
  return `hsla(${h}, 90%, 65%, 0.9)`;
};

const Lesson = ({ id, timeStart, timeEnd, lesson, office, theme, estimation, onLayout, estimationComments, teacher, homework }: LessonProp & { onLayout?: (height: number) => void; }) => {
  const styles = createStyleSheet({
    container: {
      position: 'relative',
    },
    blurView: {
      borderRadius: 20,
      marginTop: 10,
      overflow: 'hidden',
      width: '100%',
      marginHorizontal: 'auto',
    },
    lessonContainer: {
      flexDirection: 'row',
      paddingVertical: 15,
      width: '100%',
      height: 'auto',
    },
    idContainer: {
      paddingHorizontal: 5,
      height: '100%',
      flexDirection: 'column',
      gap: 5,
      justifyContent: 'flex-start',
    },
    idText: {
      color: '#9CA3AF', // gray-300
      textAlign: 'center',
      fontSize: 20,
      marginHorizontal: 2,
    },
    timeContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    timeText: {
      color: '#FFFFFF', // white
      textAlign: 'center',
    },
    lessonColorLine: {
      width: 2,
      height: '100%',
      marginHorizontal: 2,
    },
    lessonDetails: {
      paddingHorizontal: 5,
      height: 'auto',
      justifyContent: 'flex-start',
    },
    lessonText: {
      width: Dimensions.get('window').width / 1.4,
      fontWeight: 'bold',
      fontSize: 18,
    },
    teacherText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#9CA3AF', // gray-300
    },
    themeText: {
      width: Dimensions.get('window').width / 1.4,
      color: '#FFFFFF', // white
      fontSize: 15,
      marginTop: 2,
    },
    homeworkText: {
      width: Dimensions.get('window').width / 1.4,
      color: '#9CA3AF', // gray-400
      fontSize: 15,
      marginTop: 2,
    },
    homeworkItemText: {
      width: Dimensions.get('window').width / 1.4,
      color: '#9CA3AF', // gray-400
      fontSize: 14,
    },
    noHomeworkText: {
      width: Dimensions.get('window').width / 1.4,
      color: '#9CA3AF', // gray-400
      textAlign: 'justify',
      fontFamily: 'Poppins-Medium',
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 5,
    },
    ratingBox: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      minWidth: 30,
      minHeight: 30,
      borderWidth: 1,
    },
    ratingText: {
      position: 'absolute',
      textAlign: 'center',
      fontSize: 22,
      bottom: -7,
      fontFamily: 'Poppins-Medium',
    },
    passBox: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: 60,
      height: 30,
      borderWidth: 1,
    },
  });

  const lessonColor = useMemo(() => generateColorFromString(lesson), [lesson]);

  const ratingColors = useMemo(() => ({
    0: '#6B7280',
    1: '#FECACA',
    2: '#EF4444',
    3: '#F59E0B',
    4: '#10B981',
    5: '#84CC16',
    'н': '#EF4444',
    'зач': "#10B981" 
  }), []);

  const ratingBorderColors = useMemo(() => ({
    0: '#6B7280',
    1: '#FECACA', 
    2: '#EF4444', 
    3: '#F59E0B',
    4: '#10B981',
    5: '#84CC16',
    'н': '#EF4444',
    'зач': "#10B981" 
  }), []);

  return (
    <View style={styles.container}>
      <BlurView intensity={20} style={styles.blurView}>
        <View style={styles.lessonContainer}>
          <View style={styles.idContainer}>
            <Text style={styles.idText}>#{id}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{timeStart.slice(0, 5)}</Text>
              <Text style={styles.timeText}>{timeEnd.slice(0, 5)}</Text>
            </View>
          </View>
          <View style={[styles.lessonColorLine, { backgroundColor: lessonColor }]} />
          <View style={styles.lessonDetails}>
            <Text style={[styles.lessonText, { color: lessonColor }]}>{lesson}</Text>
            <Text style={styles.teacherText}>{teacher}</Text>
            {theme ? (
              <Text style={styles.themeText}>{theme}</Text>
            ) : (
              <Text style={styles.themeText}>Нету темы урока</Text>
            )}
            {homework.length > 0 && homework[0] !== '' && (
              <Text style={styles.homeworkText}>Домашнее задание:</Text>
            )}
            {homework.length > 0 && homework[0] !== '' ? (
              <Text style={styles.homeworkItemText}>
                {homework.map((item, index) => `${item}`).join('\n')}
              </Text>
            ) : (
              <Text style={styles.noHomeworkText}>Нету домашней работы</Text>
            )}
            <View style={styles.ratingContainer}>
              {estimation.length > 0 && estimation.filter(i => i !== '').map((item, index) => (
                <HoldItem hapticFeedback="Light" menuAnchorPosition="top-left" key={index} activateOn="tap" items={[
                  {
                    text: item.toString() == 'н' ? 'Пропуск пары' : (estimationComments[index] === '' ? estimationComments[index] : 'Оценка за работу на паре'),
                    onPress: () => { },
                  }
                ]}>
                  {item === '0' || item === 'зач' ? null : (
                    <View style={[styles.ratingBox, { borderColor: ratingBorderColors[item] }]}>
                      <Text style={[styles.ratingText, { color: ratingColors[item] }]}>
                        {item.toString().toUpperCase()}
                      </Text>
                    </View>
                  )}
                  {item === 'зач' && (
                    <View style={[styles.passBox, { borderColor: ratingBorderColors[item] }]}>
                      <Text style={[styles.ratingText, { color: ratingColors[item] }]}>
                        {item.toString().toUpperCase()}
                      </Text>
                    </View>
                  )}
                </HoldItem>
              ))}
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default Lesson;