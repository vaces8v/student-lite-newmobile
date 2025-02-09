import React, { useMemo } from 'react';
import { Dimensions, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { HoldItem } from "react-native-hold-menu";

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

const screenWidth = Dimensions.get("window").width;

const generateColorFromString = (str: string): string => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}

	const h = (hash % 240 + 60) % 360;
	return `hsla(${h}, 90%, 65%, 0.9)`;
};

const Lesson = React.memo(({ id, timeStart, timeEnd, lesson, office, theme, estimation, onLayout, estimationComments, teacher, homework }: LessonProp & { onLayout?: (height: number) => void; }) => {

	const lessonColor = useMemo(() => generateColorFromString(lesson), [lesson]);
	console.log(estimation)

	const ratingColors = useMemo(() => ({
		0: 'text-gray-500',
		1: 'text-red-200',
		2: 'text-red-500',
		3: 'text-yellow-500',
		4: 'text-green-500',
		5: 'text-lime-500',
		'н': 'text-red-500',
	}), []);

	const ratingBorderColors = useMemo(() => ({
		0: 'border-gray-500',
		1: 'border-red-200',
		2: 'border-red-500',
		3: 'border-yellow-500',
		4: 'border-green-500',
		5: 'border-lime-500',
		'н': 'border-red-500',
	}), []);

	return (
		<View
			style={{ position: 'relative' }}
		>
			<BlurView intensity={20} className="rounded-[20px] mt-[10px] overflow-hidden w-[100%] mx-auto">
				<View className="flex py-[15px] flex-row w-full h-auto">
					<View className="flex px-[5px] h-full flex-col gap-[5px] justify-start">
						<Text className="text-gray-300 text-center text-[20px] mx-2">#{id}</Text>
						<View style={{ flex: 1 }} className="flex flex-col justify-between">
							<Text className="text-white text-center">{timeStart.slice(0, 5)}</Text>
							<Text className="text-white text-center">{timeEnd.slice(0, 5)}</Text>
						</View>
					</View>
					<View style={{ backgroundColor: lessonColor }} className={`w-[2px] h-full mx-[2px]`}></View>
					<View className="flex px-[5px] h-auto justify-start">
						<Text
							style={{ width: screenWidth / 1.4, color: lessonColor }}
							className={`flex-wrap font-bold text-[18px]`}
						>
							{lesson}
						</Text>
						<Text className={`flex-wrap font-bold text-[16px] text-gray-300`}>{teacher}</Text>

						{theme ?
							(<Text style={{ width: screenWidth / 1.4 }} className={`flex-wrap text-white text-[15px] mt-[2px]`}>{theme}</Text>)
							:
							<Text style={{ width: screenWidth / 1.4, fontFamily: 'Poppins-Medium' }} className={`flex-wrap text-white text-justify mt-[2px]`}>Нету темы урока</Text>}
						{homework.length > 0 && homework[0] !== '' && (
							<Text style={{ width: screenWidth / 1.4 }} className={`flex-wrap text-white text-[15px] text-gray-400 mt-[2px]`}>Домашнее задание:</Text>)}
						{homework.length > 0 && homework[0] !== '' ?
							(<Text key="homework" style={{ width: screenWidth / 1.4 }} selectable className={`flex-wrap text-white text-gray-400 text-[14px]`}>
								{homework.map((item, index) => `${item}`).join('\n')}
							</Text>)
							:
							<Text style={{ width: screenWidth / 1.4, fontFamily: 'Poppins-Medium' }} className={`flex-wrap text-gray-400 text-justify`}>Нету домашней работы</Text>}
						<View className="flex flex-row justify-start mt-[5px]">
							{estimation.length > 0 ?
								(<>
									{estimation.filter(i => i !== '').map((item, index) => (
										<HoldItem hapticFeedback="Light" menuAnchorPosition="top-left" key={index} activateOn="tap" items={
											[
												{
													text: item.toString() == 'н' ? 'Пропуск пары' : (estimationComments[index] === '' ? estimationComments[index] : 'Оценка за работу на паре'),
													onPress: () => { },
												}
											]
										}>
											{item === '0' ? null :
												<View className={`relative ml-[${index === 0 ? 0 : 5}px] flex items-center justify-center border ${ratingBorderColors[item]} rounded-[10px] min-w-[30px] min-h-[30px]`}>
													<Text
														style={{ fontFamily: 'Poppins-Medium' }}
														className={`absolute text-center text-[22px] bottom-[-7px] ${ratingColors[item]}`}
													>
														{item.toString().toUpperCase()}
													</Text>
												</View>
											}
										</HoldItem>
									))}
								</>)
								:
								(<></>)}
						</View>
					</View>
				</View>
			</BlurView>
		</View>
	);
});

export default Lesson;