import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import Animated, { FadeInDown, FadeOutUp, Layout, SharedTransition, withSpring } from "react-native-reanimated";

export interface LessonProp {
    id?: number;
    timeStart: string;
    timeEnd: string;
    lesson: string;
    office: string;
    content?: string;
    theme: string;
}

const screenWidth = Dimensions.get("window").width;


const Lesson = ({timeStart, timeEnd, lesson, office, content, theme}: LessonProp) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const data = {
        timeStart: timeStart,
        timeEnd: timeEnd,
        lesson: lesson,
        office: office,
        content: content,
        theme: theme
    }
    return (
        <Animated.View
            entering={FadeInDown.duration(600).springify()}
            exiting={FadeOutUp.duration(600)}
        >
            <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={() => navigation.navigate('MoreDetails', {item: data})} 
                className="rounded-[20px] mt-[10px] overflow-hidden w-[100%] mx-auto"
            >
                <BlurView intensity={20} className="flex py-[15px] flex-row w-full h-auto">
                    <View className="flex px-[5px] h-auto justify-between">
                        <Text className="text-white">{timeStart} AM</Text>
                        <Text className="text-white">{timeEnd} AM</Text>
                    </View>
                    <View style={{backgroundColor: theme }} className={`w-[2px] h-full mx-[2px]`}></View>
                    <View className="flex px-[5px] h-auto justify-between">
                        <Animated.Text 
                            sharedTransitionTag={`lesson-${lesson}`} 
                            style={{width: screenWidth/1.4, color: theme}} 
                            className={`flex-wrap font-bold text-[18px]`}
                        >
                            {lesson}
                        </Animated.Text>
                        <Text style={{width: screenWidth/1.4}} className={`flex-wrap font-bold text-[16px] text-gray-300`}>{office}</Text>
                        {content && <Animated.Text style={{width: screenWidth/1.4}} className={`flex-wrap text-white text-justify`}>{content}</Animated.Text>}
                    </View>
                </BlurView>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default Lesson;