import react, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, Button } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InLineTextButton from '../components/InlineTextButton';
import Brand from '../components/Brand';

import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";



export default function Signup({ navigation }) {
    const background = require('../assets/background.jpg')
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")
    let [validationMessage, setValidationMessage] = useState("")

    let validateAndSet = (value, valueToCompare, setValue) => {
        if (value !== valueToCompare) {
            setValidationMessage("Passwords do not match.");
        } else {
            setValidationMessage("");
        }

        setValue(value);
    };

    let signUp = () => {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    sendEmailVerification(auth.currentUser);
                    navigation.navigate("ToDo", { user: userCredential.user });
                })
                .catch((error) => {
                    setValidationMessage(error.message);
                });
        }
    }



    return (
        <ImageBackground source={background} style={AppStyles.container}>
            <Brand />
            <View style={AppStyles.backgroundCover}>
                <Text style={AppStyles.header}>Sign Up</Text>
                <TextInput
                    placeholder='Email'
                    placeholderTextColor='#444'
                    style={AppStyles.textInput}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor='#444'
                    style={AppStyles.textInput}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}
                />
                <TextInput
                    placeholder='Confirm Password'
                    placeholderTextColor='#444'
                    style={AppStyles.textInput}
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}
                />
                <Text style={AppStyles.errorText} >{validationMessage}</Text>


                <Button title='     Sign Up     ' onPress={signUp}></Button>

                <View style={AppStyles.rowContainer}>
                    <Text>Already have an account ? </Text>
                    <InLineTextButton text=' LogIn' onPress={() => navigation.navigate("Login")} />
                </View>
            </View>
        </ImageBackground>

    );
}
