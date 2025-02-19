import React from "react";
import { Text, View } from "react-native";
import Lesson, { LessonProp } from "../Lesson/Lesson";
import { format, parse } from "date-fns";

export interface DayProp {
	id: number;
	day: string;
	lessons: LessonProp[];
	weekDate: Date;
	onVisibleDayChange?: (day: string) => void;
}

const Day = ({ day, lessons = [], weekDate, onVisibleDayChange }: DayProp) => {

	// Преобразуем название дня недели в номер (0-6)
	const getDayNumber = (dayName: string) => {
		const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
		return days.indexOf(dayName);
	};

	// Получаем дату для конкретного дня
	const getDayDate = () => {
		const dayNumber = getDayNumber(day);
		if (dayNumber === -1) return null;

		const dayDate = new Date(weekDate);
		dayDate.setDate(dayDate.getDate() + dayNumber);
		return format(dayDate, 'dd.MM');
	};

	const dayDate = getDayDate();

	return (
		<View style={{
			marginBottom: 15,
			padding: 15,
			backgroundColor: 'rgba(255, 255, 255, 0)',
			borderRadius: 10,
			width: '100%',
		}}>
			<Text style={{
				color: 'white',
				fontSize: 18,
				marginBottom: 10,
				fontWeight: 'bold',
				fontFamily: 'Poppins-Medium',
			}}>
				{day}{dayDate ? `, ${dayDate}` : ''}
			</Text>
			
			{Array.isArray(lessons) && lessons.length > 0 ? (
				<View style={{ width: '100%' }}>
					{lessons.map((lesson) => (
						<Lesson
							key={lesson.id}
							id={lesson.id}
							timeStart={lesson.timeStart}
							timeEnd={lesson.timeEnd}
							lesson={lesson.lesson}
							office={lesson.office}
							content={lesson.content}
							estimation={lesson.estimation}
							estimationComments={lesson.estimationComments}
							teacher={lesson.teacher}
							homework={lesson.homework}
							theme={lesson.theme}
						/>
					))}
				</View>
			) : (
				<Text style={{
					fontFamily: 'Poppins-Regular',
					color: 'white',
					fontSize: 16,
					textAlign: 'center',
					marginVertical: 5
				}}>
					Нету пар в этот день
				</Text>
			)}
		</View>
	);
}

export default Day;