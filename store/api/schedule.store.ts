import { create, StateCreator } from "zustand";
import { Api } from "@/api/root";
import { ScheduleResponse, ScheduleDay } from "@/types/api/schedule.types";
import { useTokenStore } from "./token.store";
import { format, addDays, subDays, startOfWeek, endOfWeek } from 'date-fns';
import {WeekProp as WeekPropComponent} from "@/components/shared/Weeky/Weeky";

interface ScheduleState {
	currentSchedule: ScheduleResponse | null;
	studentId: string | null;
	isLoading: boolean;
	error: string | null;
	cachedWeeks: Map<string, WeekProp>;
	currentWeekIndex: number;
	pendingRequests: Set<string>;
	getScheduleByWeekIndex: (weekIndex: number) => Promise<WeekPropComponent | null>;
}

interface ScheduleActions {
	fetchStudentId: () => Promise<string | null>;
	fetchSchedule: (params: {
		startDate?: string,
		endDate?: string,
		direction?: 'next' | 'prev',
		isInitialLoad?: boolean
	}) => Promise<void>;
	transformScheduleToWeekData: (schedule: ScheduleResponse) => WeekProp[];
	getCachedWeeks: () => WeekProp[];
	clearCache: () => void;
	prefetchNextWeek: () => Promise<void>;
	isWeekCached: (weekKey: string) => boolean;
}

const THEME_COLORS = [
	"#41FFA4", "#D55CFF", "#3AF3FF", "#FF5C5C",
	"#FFD700", "#7B68EE", "#20B2AA", "#FF69B4"
];

const scheduleStore: StateCreator<ScheduleState & ScheduleActions> = (set, get) => ({
	currentSchedule: null,
	studentId: null,
	isLoading: false,
	error: null,
	cachedWeeks: new Map(),
	currentWeekIndex: 0,
	pendingRequests: new Set(),

	getScheduleByWeekIndex: async (weekIndex: number) => {
		const state = get();

		// Получаем текущий год
		const currentYear = new Date().getFullYear();

		// Вычисляем дату начала недели по индексу недели в году
		const startOfWeekDate = startOfWeek(new Date(currentYear, 0, 1 + (weekIndex - 1) * 7), { weekStartsOn: 1 });
		const endOfWeekDate = endOfWeek(startOfWeekDate, { weekStartsOn: 1 });

		// Форматируем даты в строки
		const startDate = format(startOfWeekDate, 'yyyyMMdd');
		const endDate = format(endOfWeekDate, 'yyyyMMdd');

		// Проверяем, есть ли данные за эту неделю в кэше
		if (state.cachedWeeks.has(startDate)) {
			return state.cachedWeeks.get(startDate) || null;
		}

		// Если данных нет в кэше, запрашиваем их с сервера
		try {
			await state.fetchSchedule({
				startDate,
				endDate,
				isInitialLoad: false
			});

			// После запроса проверяем, появились ли данные в кэше
			if (state.cachedWeeks.has(startDate)) {
				return state.cachedWeeks.get(startDate) || null;
			}
		} catch (error) {
			console.error('Error fetching schedule by week index:', error);
			set({ error: 'Failed to fetch schedule by week index' });
		}

		return null;
	},

	fetchStudentId: async () => {
		try {
			const { token } = useTokenStore.getState();
			if (!token) throw new Error('No token available');

			const { response } = await Api.schedule.getRules(token);

			const studentId = response.result.id;

			if (!studentId) {
				throw new Error('Student ID is undefined or empty');
			}

			set({ studentId, error: null });
			return studentId;
		} catch (error) {
			console.error('Error fetching student ID:', error);
			set({ error: 'Failed to fetch student ID', studentId: null });
			return null;
		}
	},

	isWeekCached: (weekKey: string) => {
		const state = get();
		return state.cachedWeeks.has(weekKey);
	},

	fetchSchedule: async (params: {
		startDate?: string,
		endDate?: string,
		direction?: 'next' | 'prev',
		isInitialLoad?: boolean
	}) => {
		const state = get();
		const requestKey = `${params.startDate}-${params.endDate}`;

		// Check if this request is already pending or data is cached
		if (state.pendingRequests.has(requestKey)) {
			return;
		}

		if (!params.isInitialLoad && state.cachedWeeks.has(params.startDate || '')) {
			return;
		}

		try {
			// Only show loading indicator for initial load
			if (params.isInitialLoad) {
				set({ isLoading: true });
				
				// If no dates provided for initial load, use current week
				if (!params.startDate || !params.endDate) {
					// Используем текущее системное время
					const currentDate = new Date();
					
					// Явно указываем, что неделя начинается с понедельника
					const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
					const prevWeekStart = subDays(currentWeekStart, 0);
					const nextWeekStart = addDays(currentWeekStart, 7);
					
					params.startDate = format(prevWeekStart, 'yyyyMMdd');
					params.endDate = format(endOfWeek(nextWeekStart, { weekStartsOn: 1 }), 'yyyyMMdd');
				}
			}

			if (!params.startDate || !params.endDate) {
				const currentWeeks = state.getCachedWeeks();
				let referenceDate;

				if (currentWeeks.length > 0) {
					const latestWeek = currentWeeks[currentWeeks.length - 1];
					const earliestWeek = currentWeeks[0];
					
					if (params.direction === 'next') {
						referenceDate = new Date(latestWeek.week.slice(0, 4) + '-' + latestWeek.week.slice(4, 6) + '-' + latestWeek.week.slice(6, 8));
						referenceDate.setDate(referenceDate.getDate() + 7);
					} else if (params.direction === 'prev') {
						referenceDate = new Date(earliestWeek.week.slice(0, 4) + '-' + earliestWeek.week.slice(4, 6) + '-' + earliestWeek.week.slice(6, 8));
						referenceDate.setDate(referenceDate.getDate() - 7);
					}

					if (referenceDate) {
						const weekStart = startOfWeek(referenceDate, { weekStartsOn: 1 });
						params.startDate = format(weekStart, 'yyyyMMdd');
						params.endDate = format(endOfWeek(weekStart, { weekStartsOn: 1 }), 'yyyyMMdd');
					}
				}
			}

			state.pendingRequests.add(requestKey);

			let currentStudentId = state.studentId;
			if (!currentStudentId) {
				currentStudentId = await state.fetchStudentId();
				if (!currentStudentId) {
					throw new Error('Failed to fetch student ID');
				}
			}

			const response = await Api.schedule.getSchedule({
				studentId: currentStudentId,
				startDate: params.startDate,
				endDate: params.endDate,
				token: useTokenStore.getState().token
			});

			if (response) {
				// Update currentSchedule only for initial load
				if (params.isInitialLoad) {
					set({ currentSchedule: response });
				}

				const newWeeks = state.transformScheduleToWeekData(response);
				const currentCache = new Map(state.cachedWeeks);

				// Add new weeks to cache if they don't exist
				newWeeks.forEach(week => {
					if (!currentCache.has(week.week)) {
						currentCache.set(week.week, week);
					}
				});

				set({
					cachedWeeks: currentCache,
					error: null,
					isLoading: params.isInitialLoad ? false : state.isLoading
				});
			}
		} catch (error) {
			set({
				error: error.message || 'Failed to fetch schedule',
				isLoading: params.isInitialLoad ? false : state.isLoading
			});
		} finally {
			state.pendingRequests.delete(requestKey);
		}
	},

	prefetchNextWeek: async () => {
		const state = get();
		const currentWeeks = state.getCachedWeeks();
		let nextWeekStart, nextWeekEnd;

		if (currentWeeks.length > 0) {
			// Get the last week in the cache and calculate the next week
			const latestWeek = currentWeeks[currentWeeks.length - 1];
			const latestWeekDate = new Date(
				latestWeek.week.slice(0, 4) + '-' + 
				latestWeek.week.slice(4, 6) + '-' + 
				latestWeek.week.slice(6, 8)
			);
			nextWeekStart = startOfWeek(addDays(latestWeekDate, 7), { weekStartsOn: 1 });
			nextWeekEnd = endOfWeek(nextWeekStart, { weekStartsOn: 1 });
		} else {
			// If no weeks are cached, use the current week
			const currentDate = new Date();
			nextWeekStart = startOfWeek(addDays(currentDate, 7), { weekStartsOn: 1 });
			nextWeekEnd = endOfWeek(nextWeekStart, { weekStartsOn: 1 });
		}

		// Only prefetch if the next week is not already cached
		const nextWeekKey = format(nextWeekStart, 'yyyyMMdd');
		if (!state.isWeekCached(nextWeekKey)) {
			await state.fetchSchedule({
				startDate: format(nextWeekStart, 'yyyyMMdd'),
				endDate: format(nextWeekEnd, 'yyyyMMdd'),
				direction: 'next'
			});
		}
	},

	transformScheduleToWeekData: (schedule: ScheduleResponse) => {
		const students = schedule.response.result.students;

		// If no students, return empty array
		const studentIds = Object.keys(students);
		if (studentIds.length === 0) {
			return [];
		}

		// Assuming we want the first student's schedule
		const firstStudentId = studentIds[0];
		const studentSchedule = students[firstStudentId];

		// Safely check if days exist
		if (!studentSchedule?.days) {
			console.error('No days found in student schedule');
			return [];
		}

		// Get all dates and sort them
		const dates = Object.keys(studentSchedule.days).sort();
		if (dates.length === 0) return [];

		// Group dates by week
		const weekMap = new Map<string, string[]>();
		dates.forEach(date => {
			const weekStart = format(startOfWeek(new Date(
				date.slice(0, 4) + '-' + 
				date.slice(4, 6) + '-' + 
				date.slice(6, 8)
			), { weekStartsOn: 1 }), 'yyyyMMdd');
			
			if (!weekMap.has(weekStart)) {
				weekMap.set(weekStart, []);
			}
			weekMap.get(weekStart)?.push(date);
		});

		// Transform each week's data
		return Array.from(weekMap.entries()).map(([weekStart, weekDates]) => ({
			id: parseInt(weekStart),
			week: weekStart,
			days: weekDates
				.sort()
				.map(dateStr => {
					const dayData = studentSchedule.days[dateStr];
					return {
						id: parseInt(dateStr),
						day: dayData.title || '',
						weekDate: new Date(dateStr.slice(0, 4) + '-' + dateStr.slice(4, 6) + '-' + dateStr.slice(6, 8)), // Added this property
						lessons: Object.entries(dayData.items || {})
							.sort(([numA], [numB]) => parseInt(numA) - parseInt(numB))
							.map(([lessonNum, lesson]) => {
								// Process assessments
								const assessments = lesson.assessments ?
									lesson.assessments.map(assessment => ({
										value: assessment.value || '',
										comment: assessment.comment || 'Работа на уроке',
										date: assessment.date,
										lessonId: assessment.lesson_id
									})) :
									[{ value: '', comment: 'Работа на уроке', date: '', lessonId: '' }];

								return {
									id: parseInt(lessonNum),
									timeStart: lesson.starttime || '',
									timeEnd: lesson.endtime || '',
									office: lesson.room || '',
									theme: lesson.topic || '',
									lesson: lesson.name || '',
									estimation: assessments.map(a => a.value),
									estimationComments: assessments.map(a => a.comment).filter(c => c !== 'Работа на уроке'),
									homework: lesson.homework ?
										Object.values(lesson.homework).map(hw => hw.value || '') :
										[],
									files: lesson.files || [],
									teacher: lesson.teacher || ''
								};
							})
					};
				})
		}));
	},

	getCachedWeeks: () => {
		const { cachedWeeks } = get();
		// Sort weeks by their date in ascending order
		return Array.from(cachedWeeks.values())
			.sort((a, b) => {
				const dateA = new Date(a.week.slice(0, 4) + '-' + a.week.slice(4, 6) + '-' + a.week.slice(6, 8));
				const dateB = new Date(b.week.slice(0, 4) + '-' + b.week.slice(4, 6) + '-' + b.week.slice(6, 8));
				return dateA.getTime() - dateB.getTime();
			});
	},

	clearCache: () => {
		set({ cachedWeeks: new Map() });
	},
});

export interface WeekProp {
	id: number;
	week: string;
	days: {
		id: number;
		day: string;
		weekDate: Date; // Added this property
		lessons: {
			id: number;
			timeStart: string;
			timeEnd: string;
			office: string;
			theme: string;
			lesson: string;
			estimation: string[];
			estimationComments: string[];
			homework: string[];
			files: any[];
			teacher: string;
		}[];
	}[];
}


export const useScheduleStore = create<ScheduleState & ScheduleActions>(scheduleStore);