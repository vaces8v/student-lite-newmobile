import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import * as Animatable from 'react-native-animatable';

export function Button(props: TouchableOpacityProps & {text: string}) {
    return (
        <Animatable.View animation="fadeIn" easing="ease-out" duration={3000}>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} {...props}>
                <Animatable.Text
                    animation="zoomIn"
                    duration={500}
                    easing="ease-in-out"
                    style={styles.text}>
                    {props.text}
                </Animatable.Text>
            </TouchableOpacity>
        </Animatable.View>
    );
}

export const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        backgroundColor: '#0BC1CC',
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        marginTop: 5,
        color: "#FFF",
        fontFamily: "Poppins-Medium"
    }
})