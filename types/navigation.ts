import { LessonProp } from "@/components/shared/Lesson/Lesson";

export type RootStackParamList = {
    Home: undefined;
    Details: { id: string };
    MoreDetails: { item: LessonProp };
    ResetPassword: undefined;
    Profile: undefined;
    Mail: undefined;
    QRBoard: undefined;
    Tabs: undefined;
    DatePicker: undefined;
    MainTabs: undefined;
};