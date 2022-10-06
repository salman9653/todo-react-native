import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';
import AppStyles from '../styles/AppStyles';

export default function AddToDoModal(props) {
  let [todo, setTodo] = useState("");
  return (
    <View style={AppStyles.addToDoModalCover}>
      <View style={AppStyles.addToDoModal}>
        <Text style={AppStyles.header}>Add ToDo Item</Text>
        <TextInput
          style={AppStyles.textInput}
          placeholder='ToDo Item'
          value={todo}
          onChangeText={setTodo} />
        <View style={AppStyles.rowContainerModal}>
          <Button title="Cancel" onPress={props.onClose} />
          <Button title="      OK      " color='#449d44' onPress={() => {
            props.addToDo(todo);
            setTodo("");
            props.onClose();
          }} />
        </View>
      </View>
    </View>
  );
}