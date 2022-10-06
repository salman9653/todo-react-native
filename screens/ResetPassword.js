import react, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, Button } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InLineTextButton from '../components/InlineTextButton';
import Brand from '../components/Brand';

import { auth } from "../firebase";
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPassword({ navigation }) {

    const background = require('../assets/background.jpg')

    let [email, setEmail] = useState("")
    let [errorMessage, setErrorMessage] = useState("")

    let resetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigation.popToTop();
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    }

    return (
        <ImageBackground source={background} style={AppStyles.container}>
            <Brand />
            <View style={AppStyles.backgroundCover}>
                <Text style={AppStyles.header}>Reset Password</Text>
                <TextInput
                    placeholder='Email'
                    placeholderTextColor='#444'
                    style={AppStyles.textInput}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={AppStyles.errorText} >{errorMessage}</Text>
                <Button
                    title=' Reset Password '
                    onPress={resetPassword}
                ></Button>
                <Text style={{ marginTop: 15 }}>OR </Text>
                <View style={AppStyles.rowContainer}>
                    <InLineTextButton text='Login' onPress={() => navigation.navigate("Login")} />
                    <Text>  |  </Text>
                    <InLineTextButton text='SignUp' onPress={() => navigation.navigate("Signup")} />
                </View>
            </View>
        </ImageBackground>

    );
}
