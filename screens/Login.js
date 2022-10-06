import react, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, Button, Platform } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InLineTextButton from '../components/InlineTextButton';
import Brand from '../components/Brand';

import { auth, currentUser } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



export default function Login({ navigation }) {

    const background = require('../assets/background.jpg')

    if (auth.currentUser) {
        navigation.navigate("ToDo");
    } else {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate("ToDo");
            }
        });
    }

    let [errorMessage, setErrorMessage] = useState("");
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    let login = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    navigation.navigate("ToDo", { user: userCredential.user });
                    setErrorMessage("");
                    setEmail("");
                    setPassword("");
                })
                .catch((error) => {
                    setErrorMessage(error.message)
                });
        } else {
            setErrorMessage("Please enter an email and password");
        }
    }

    return (
        <ImageBackground source={background} style={AppStyles.container}>
            <Brand />
            <View style={AppStyles.backgroundCover}>
                <Text style={AppStyles.header}>Log In</Text>
                <TextInput
                    placeholder='Email'
                    placeholderTextColor='#bbb'
                    style={AppStyles.textInput}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor='#bbb'
                    style={AppStyles.textInput}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Text style={AppStyles.errorText} >{errorMessage}</Text>

                <Button
                    title='     Log in     '
                    onPress={login}
                >
                </Button>

                <View style={AppStyles.rowContainer}>
                    <Text>Don't have an account ? </Text>
                    <InLineTextButton text=' SignUp' onPress={() => navigation.navigate("Signup")} />
                </View>
                <View style={AppStyles.rowContainer}>
                    <Text>Forgotten your Password ? </Text>
                    <InLineTextButton text=' Reset' onPress={() => navigation.navigate("ResetPassword")} />
                </View>
            </View>
        </ImageBackground>

    );
}
