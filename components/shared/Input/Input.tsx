import {Pressable, StyleSheet, TextInput, TextInputProps, View} from "react-native";
import {useState} from "react";
import EyeIcon from "../../../assets/svg/EyeIcon";
import EyeClose from "../../../assets/svg/EyeClose";


export function Input (props: TextInputProps & {isPassword?: boolean, placeholderText?: string}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    return (
        <View style={{ position: 'relative', width: '100%' }}>
            <TextInput
                style={{...styles.input, paddingRight: props.isPassword ? 50 : 20}}
                secureTextEntry={props.isPassword && !isPasswordVisible}
                placeholder={props.placeholderText}
                placeholderTextColor="rgba(255, 255, 255, .5)"
                {...props} />
            {
                props.isPassword && <Pressable
                    onPress={() => setIsPasswordVisible(state => !state)}
                    style={{
                        ...styles.eyeIcon,
                        paddingVertical: isPasswordVisible ? 10 : 15,
                        paddingHorizontal:isPasswordVisible ? 12 : 14,
                    }}>
                    {isPasswordVisible ? <EyeIcon/> : <EyeClose/>}
                </Pressable>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 55,
        backgroundColor: 'rgba(217, 217, 217, .2);',
        color: "rgba(255, 255, 255, .9)",
        borderRadius: 10,
        fontSize: 18,
        paddingHorizontal: 20,
        paddingBottom: 5,    
        fontFamily: "Poppins-Medium"
    },
    eyeIcon: {
        position: 'absolute',
        right: 0,
    }
})
