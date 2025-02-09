import { create, StateCreator } from "zustand";
import { Api } from "@/api/root";
import { ScheduleResponse, ScheduleDay } from "@/types/api/schedule.types";
import { useTokenStore } from "./token.store";
import { format, addDays, subDays, startOfWeek, endOfWeek } from 'date-fns';

interface ScheduleState {
	currentSchedule: ScheduleResponse | null;
	studentId: string | null;
	isLoading: boolean;
	error: string | null;
	cachedWeeks: Map<string, WeekProp>;
	currentWeekIndex: number;
	pendingRequests: Set<string>;
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
		const currentDate = new Date();
		const nextWeekDate = addDays(currentDate, 7);
		const nextWeekStart = startOfWeek(nextWeekDate, { weekStartsOn: 1 });
		const nextWeekEnd = endOfWeek(nextWeekDate, { weekStartsOn: 1 });

		// Prefetch next week's data
		state.fetchSchedule({
			startDate: format(nextWeekStart, 'yyyyMMdd'),
			endDate: format(nextWeekEnd, 'yyyyMMdd'),
			direction: 'next'
		});
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

		// Use the first date of the week as the week identifier
		const weekStartDate = dates[0];

		// Transform days into week data matching WeekProp interface
		const weekData = {
			id: parseInt(weekStartDate),
			week: weekStartDate,
			days: Object.entries(studentSchedule.days)
				.sort(([dateA], [dateB]) => parseInt(dateA) - parseInt(dateB))
				.map(([dateStr, dayData]) => ({
					id: parseInt(dateStr),
					day: dayData.title || '',
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
				}))
		};

		return [weekData];
	},

	getCachedWeeks: () => {
		const { cachedWeeks } = get();
		return Array.from(cachedWeeks.values()).sort((a, b) =>
			new Date(a.week).getTime() - new Date(b.week).getTime()
		);
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