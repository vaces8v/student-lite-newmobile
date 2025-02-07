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
}

interface ScheduleActions {
    fetchStudentId: () => Promise<string | null>;
    fetchSchedule: (params: { 
        startDate?: string, 
        endDate?: string, 
        direction?: 'next' | 'prev' 
    }) => Promise<void>;
    transformScheduleToWeekData: () => any[];
}

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

const THEME_COLORS = [
    "#41FFA4", "#D55CFF", "#3AF3FF", "#FF5C5C", 
    "#FFD700", "#7B68EE", "#20B2AA", "#FF69B4"
];

const scheduleStore: StateCreator<ScheduleState & ScheduleActions> = (set, get) => ({
    currentSchedule: null,
    studentId: null,
    isLoading: false,
    error: null,

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

    fetchSchedule: async ({ 
        startDate, 
        endDate, 
        direction = 'next' 
    }) => {
        try {
            const { token } = useTokenStore.getState();
            let { studentId } = get();

            // Ensure we have a student ID
            if (!studentId) {
                const fetchedId = await get().fetchStudentId();
                if (!fetchedId) {
                    console.error('Could not fetch student ID');
                    set({ 
                        error: 'Failed to fetch student ID', 
                        currentSchedule: null 
                    });
                    return;
                }
                studentId = fetchedId;
            }

            // Prepare dates in YYYYMMDD format
            const today = new Date();
            const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
            const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 }); // Saturday of the same week

            const formattedStartDate = startDate 
                ? format(new Date(startDate), 'yyyyMMdd') 
                : format(weekStart, 'yyyyMMdd');
            const formattedEndDate = endDate 
                ? format(new Date(endDate), 'yyyyMMdd') 
                : format(weekEnd, 'yyyyMMdd');

            console.log('Fetching Schedule with params:', {
                studentId,
                startDate: formattedStartDate,
                endDate: formattedEndDate
            });

            const { response } = await Api.schedule.getSchedule({
                studentId, 
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                token
            });

            console.log('Full Schedule Response:', JSON.stringify(response, null, 2));

            // Validate response
            if (!response || !response.result || !response.result.students) {
                console.error('Invalid schedule response structure');
                set({ 
                    error: 'Invalid schedule response', 
                    currentSchedule: null 
                });
                return;
            }

            const scheduleData = response.result.students;
            console.log('Schedule Data:', JSON.stringify(scheduleData, null, 2));
            
            set({ 
                currentSchedule: { response }, 
                error: null 
            });
        } catch (error) {
            console.error('Error fetching schedule:', error);
            set({ 
                error: 'Failed to fetch schedule', 
                currentSchedule: null 
            });
        }
    },

    transformScheduleToWeekData: () => {
        const { currentSchedule } = get();
        
        if (!currentSchedule?.response?.result?.students) {
            console.error('No schedule data available');
            return [];
        }

        try {
            const students = currentSchedule.response.result.students;
            
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

            // Transform days into week data matching WeekProp interface
            const weekData = {
                id: parseInt(Object.keys(studentSchedule.days)[0]), // Use first day's date as week ID
                week: Object.keys(studentSchedule.days)[0], // Use first day's date as week identifier
                days: Object.entries(studentSchedule.days)
                    .map(([dateStr, dayData]) => ({
                        id: parseInt(dateStr),
                        day: dayData.title || '',
                        lessons: Object.entries(dayData.items || {}).map(([lessonNum, lesson]) => {
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
                                estimation: assessments.map(a => a.value).filter(v => v),
                                estimationComments: assessments.map(a => a.comment).filter(c => c !== 'Работа на уроке'),
                                homework: lesson.homework ? 
                                    Object.values(lesson.homework).map(hw => hw.value || '') : 
                                    [],
                                files: lesson.files || [],
                                teacher: lesson.teacher || ''
                            };
                        }).filter(lesson => lesson.lesson).sort((a, b) => a.id - b.id)
                    })).filter(day => day.lessons.length > 0).sort((a, b) => a.id - b.id)
            };

            console.log('Transformed Week Data:', JSON.stringify(weekData, null, 2));

            return [weekData]; // Wrap in array to match expected prop structure
        } catch (error) {
            console.error('Error transforming schedule:', error);
            return [];
        }
    },
});

export const useScheduleStore = create<ScheduleState & ScheduleActions>(scheduleStore);
