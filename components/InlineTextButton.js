import { Text, Pressable } from "react-native";
import AppStyles from "../styles/AppStyles";

export default function InLineTextButton(props) {
    return (
        <Pressable onPress={props.onPress}>
            {({ pressed }) => (
                <Text style={pressed ? AppStyles.pressedInLineTextButton : AppStyles.inLineTextButton}>{props.text}</Text>
            )}

        </Pressable>
    )
}