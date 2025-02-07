export interface ScheduleHomework {
    value: string;
    id: number;
    individual: boolean;
}

export interface ScheduleFile {
    toid: number;
    filename: string;
    link: string;
}

export interface ScheduleLesson {
    name: string;
    lesson_id: string;
    num: string;
    room: string;
    teacher: string;
    sort: number;
    starttime: string;
    endtime: string;
    topic?: string;
    homework?: Record<string, ScheduleHomework>;
    files?: ScheduleFile[];
    assessments?: ScheduleAssessment[];
}

export interface ScheduleAssessment {
    value: string;
    countas: string;
    color_hex: string | null;
    count: boolean;
    convert: number;
    lesson_id: string;
    date: string;
    nm: string;
    control_type: string;
    control_type_short: string;
    weight: number;
    weight_float: number;
    comment: string;
}

export interface ScheduleDay {
    name: string;
    title: string;
    items: Record<string, ScheduleLesson>;
}

export interface ScheduleStudent {
    name: string;
    title: string;
    days: Record<string, ScheduleDay>;
}

export interface ScheduleResponse {
    response: {
        error: string | null;
        result: {
            students: Record<string, ScheduleStudent>;
        };
        state: number;
    };
}

export interface StudentInfoResponse {
    response: {
        error: string | null;
        result: {
            id: string;
            name: string;
            students: string;
            title: string;
            [key: string]: any;
        };
        state: number;
    };
}
