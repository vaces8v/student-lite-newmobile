import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

export interface LessonProp {
    id: number;
    timeStart: string;
    timeEnd: string;
    lesson: string;
    office: string;
    content?: string;
    theme: string;
    estimation: number[];
}

const screenWidth = Dimensions.get("window").width;

const Lesson = ({id, timeStart, timeEnd, lesson, office, content, theme, estimation}: LessonProp) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const data = {
        id: id,
        timeStart: timeStart,
        timeEnd: timeEnd,
        lesson: lesson,
        office: office,
        content: content,
        theme: theme,
        estimation: estimation
    }
    const ratingColors = {
        0: 'text-gray-500',
        1: 'text-red-200',
        2: 'text-red-500',
        3: 'text-yellow-500',
        4: 'text-green-500',
        5: 'text-lime-500',
    };
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
                    <View className="flex px-[5px] h-full flex-col gap-[5px] justify-start">
                        <Text className="text-gray-300 text-center text-[20px] mx-2">#{id}</Text>
                        <View style={{flex: 1}} className="flex flex-col justify-between">
                            <Text className="text-white text-center">{timeStart}</Text>
                            <Text className="text-white text-center">{timeEnd}</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: theme }} className={`w-[2px] h-full mx-[2px]`}></View>
                    <View className="flex px-[5px] h-auto justify-start">
                        <Text 
                            style={{width: screenWidth/1.4, color: theme}} 
                            className={`flex-wrap font-bold text-[18px]`}
                        >
                            {lesson}
                        </Text>
                        <Text style={{width: screenWidth/1.4}} className={`flex-wrap font-bold text-[16px] text-gray-300`}>{office}</Text>
                        {content ? 
                        (<Animated.Text style={{width: screenWidth/1.4}} className={`flex-wrap text-white text-justify`}>{content}</Animated.Text>)
                         : 
                         <Animated.Text style={{width: screenWidth/1.4, fontFamily: 'Poppins-Medium'}} className={`flex-wrap text-white text-justify`}>Нету темы урока</Animated.Text>}
                        <View className="flex flex-row justify-start">
                        {estimation.length > 0 ? 
                        (<>
                        {estimation.map((item, index) => (
                            <Text key={index} style={{fontFamily: 'Poppins-Medium'}} className={`text-center text-[18px] ml-[${index === 0 ? 0 : 5}px] mr-[5px] ${ratingColors[item]}`}>{item}</Text>
                        ))}
                        </>) 
                        : 
                        (<></>)}
                        </View>
                    </View>
                </BlurView>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default Lesson;