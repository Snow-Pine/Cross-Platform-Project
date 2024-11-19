import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { auth } from '../config/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onCreateAccountPressed = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, emailAddress, password);
      if (userCredentials) {
        Alert.alert('Account Created');
        navigation.navigate('SignIn');
      }
    } catch (err) {
      console.log(`Error occurred while creating account: ${err}`);
    }
  };

  return (
    <View>
      <TextInput 
        style={styles.inputUserStyle}
        placeholder="Enter Email Address"
        textContentType="emailAddress"
        autoCapitalize="none"
        returnKeyType="next"
        value={emailAddress}
        onChangeText={setEmailAddress}
      />
      <TextInput 
        style={styles.inputPassStyle}
        placeholder="Enter Password"
        textContentType="password"
        autoCapitalize="none"
        returnKeyType="done"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.buttonStyle} onPress={onCreateAccountPressed}>
        <Icon name="user-circle" size={30} color="white" />
        <Text style={styles.buttonTextStyle}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputPassStyle: {
    height: 50,
    margin: 10,
    padding: 5,
    borderColor: 'brown',
    borderWidth: 2,
    fontSize: 20,
    marginTop: 23
  },
  inputUserStyle: {
    height: 50,
    margin: 10,
    padding: 5,
    borderColor: 'brown',
    borderWidth: 2,
    fontSize: 20,
    marginTop: 230
  },
  buttonStyle: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18
  }
});

export default SignUpScreen;