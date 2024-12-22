import { View, Text, StyleSheet } from "react-native";
import { MoreDetailsScreenProps } from "../AppNavigator";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

const MoreDetailsScreen = ({ route }: MoreDetailsScreenProps) => {
    const { item } = route.params;
    return (
        <LinearGradient
            colors={['#462ab2', '#1e124c']}
            style={styles.container}
        >
            <Animated.Text 
                entering={FadeInDown.duration(400).springify()}
                exiting={FadeOutUp.duration(400)}
                style={{ 
                    color: 'white', 
                    paddingTop: 0, 
                    fontSize: 24, 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                {item.lesson}
            </Animated.Text>
            <Animated.Text 
                entering={FadeInDown.duration(600).springify()}
                exiting={FadeOutUp.duration(600)}
                style={{ 
                    color: 'white', 
                    paddingTop: 10, 
                    fontSize: 24, 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                {item.content}
            </Animated.Text>
        </LinearGradient>
    );
};

export default MoreDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


