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
      <View style={AppStyles.rowContainerTodo}>
        <Brand />
        <Button title="  Back  " onPress={() => navigation.pop()} />
      </View>
      <View style={AppStyles.backgroundCoverToDo}>
        <Text style={AppStyles.header}>Manage Your Account</Text>
        <Text style={{ marginTop: 10 }}>Loged In as : </Text>
        <Text style={{ marginBottom: 50, fontSize: 16, color: '#449d44' }} >{auth.currentUser.email}</Text>
        <TextInput
          style={AppStyles.textInput}
          placeholder='Current Password'
          value={currentPassword}
          secureTextEntry={true}
          onChangeText={setCurrentPassword} />
        <TextInput
          style={AppStyles.textInput}
          placeholder='New Password'
          value={newPassword}
          secureTextEntry={true}
          onChangeText={setNewPassword} />
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
        <View style={{ marginTop: 30 }}>
          <View style={AppStyles.manageAccountButtons}>
            <Button title="Update Password" onPress={updateUserPassword} />
          </View>
          <View style={AppStyles.manageAccountButtons}>
            <Button color='#f55' title="Delete Your Account" onPress={deleteUserAndToDos} />
          </View>
          <View style={AppStyles.manageAccountButtons}>
            <Button color='#f55' title="Logout" onPress={logout} />
          </View>
        </View>
      </View>
    </ImageBackground>






  );
}