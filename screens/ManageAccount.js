import { Button, View, TextInput, Text, ImageBackground } from 'react-native';
import React from 'react';
import AppStyles from '../styles/AppStyles';
import Brand from '../components/Brand';
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import { signOut, updatePassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';

export default function ManageAccount({ navigation }) {
  const background = require('../assets/background.jpg')

  let [newPassword, setNewPassword] = React.useState("");
  let [currentPassword, setCurrentPassword] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");
  let logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  }

  let updateUserPassword = () => {
    signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updatePassword(user, newPassword).then(() => {
          setNewPassword("");
          setErrorMessage("");
          setCurrentPassword("");
        }).catch((error) => {
          setErrorMessage(error.message);
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  let deleteUserAndToDos = () => {
    if (currentPassword === "") {
      setErrorMessage("Must enter current password to delete account");
    } else {
      signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
        .then((userCredential) => {
          const user = userCredential.user;

          // Get all todos for user and delete
          let batch = writeBatch(db);
          const q = query(collection(db, "todos"), where("userId", "==", user.uid));
          getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              batch.delete(doc.ref);
            });
            batch.commit();

            deleteUser(user).then(() => {
              navigation.popToTop();
            }).catch((error) => {
              setErrorMessage(error.message);
            });
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <ImageBackground source={background} style={AppStyles.container}>
      <Brand />
      <View style={AppStyles.backgroundCover}>
        <Text style={AppStyles.header}>Manage Your Account</Text>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
        <TextInput
          style={[AppStyles.textInput, AppStyles.darkTextInput]}
          placeholder='Current Password'
          value={currentPassword}
          secureTextEntry={true}
          onChangeText={setCurrentPassword} />
        <TextInput
          style={[AppStyles.textInput, AppStyles.darkTextInput]}
          placeholder='New Password'
          value={newPassword}
          secureTextEntry={true}
          onChangeText={setNewPassword} />

        <View style={{ width: '100%' }}>
          <View style={AppStyles.manageAccountButtons}>
            <Button title="Update Password" onPress={updateUserPassword} />
          </View>
          <View style={AppStyles.manageAccountButtons}>
            <Button title="Delete User" onPress={deleteUserAndToDos} />
          </View>
          <View style={AppStyles.manageAccountButtons}>
            <Button title="Logout" onPress={logout} />
          </View>
          <View style={AppStyles.manageAccountButtons}>
            <Button title="Back to ToDos" onPress={() => navigation.pop()} />
          </View>
        </View>








      </View>
    </ImageBackground>






  );
}