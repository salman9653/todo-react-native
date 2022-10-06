import { View, Button, ImageBackground, Text, Modal, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import InlineTextButton from '../components/InlineTextButton';
import AppStyles from '../styles/AppStyles';
import Brand from '../components/Brand';
import { auth, db } from "../firebase";
import { sendEmailVerification } from "firebase/auth"
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useState } from 'react';
import AddToDoModal from '../components/AddToDoModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';



export default function ToDo({ navigation }) {
  const background = require('../assets/background.jpg')

  let [modalVisible, setModalVisible] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [isRefreshing, setIsRefreshing] = useState(false);
  let [toDos, setToDos] = useState([]);

  let loadToDoList = async () => {
    const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });

    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  };
  if (isLoading) {
    loadToDoList();
  }


  let showToDoList = () => {
    return (
      <FlatList
        data={toDos}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadToDoList();
          setIsRefreshing(true);
        }}
        renderItem={renderToDoItem}
        keyExtractor={item => item.id} />
    )
  };

  let checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, 'todos', item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  };

  let deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "todos", toDoId));
    let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    setToDos(updatedToDos);
  };

  let renderToDoItem = ({ item }) => {
    return (
      <View style={AppStyles.rowContainerListItem}>
        <View style={AppStyles.container}>
          <BouncyCheckbox
            isChecked={item.complated}
            size={25}
            fillColor="#258ea6"
            unfillColor="#FFFFFF"
            text={item.text}
            iconStyle={{ borderColor: "#258ea6" }}
            onPress={(isChecked) => { checkToDoItem(item, isChecked) }}
          />
        </View>
        <Text style={{ color: '#f55' }} onPress={() => deleteToDo(item.id)} > Delete </Text>
      </View>
    );
  }

  let showContent = () => {
    return (
      <View style={AppStyles.backgroundCoverToDo}>
        {isLoading ? <ActivityIndicator size="large" color='lightblue' style={{ marginVertical: 5 }} /> : showToDoList()}
        <Button
          title="Add ToDo"
          color="#449d44"
          onPress={() => setModalVisible(true)}
        />
      </View>
    );
  };

  let showSendVerificationEmail = () => {
    return (
      <View style={AppStyles.backgroundCover}>
        <Text style={{ textAlign: 'center', color: '#0a5', marginBottom: 10, fontSize: 20 }}>Verification Email Sent !</Text>
        <Text style={{ textAlign: 'center' }}>Please open your email, verify yourself and Login</Text>
        <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 18 }}>OR </Text>
        <Button title="Send Verification Email Again" onPress={() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              navigation.popToTop();
            })
        }
        } />
      </View>
    );
  };

  let addToDo = async (todo) => {
    let toDoToSave = {
      text: todo,
      completed: false,
      userId: auth.currentUser.uid
    };
    const docRef = await addDoc(collection(db, "todos"), toDoToSave);

    toDoToSave.id = docRef.id;

    let updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);
  };





  return (
    <ImageBackground source={background} style={AppStyles.container}>

      <View style={AppStyles.rowContainerSpace}>
        <Brand />
        <Button title='Account' onPress={() => navigation.navigate("ManageAccount")} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <AddToDoModal
          onClose={() => setModalVisible(false)}
          addToDo={addToDo}
        />
      </Modal>
      {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}

    </ImageBackground>
  );
}
