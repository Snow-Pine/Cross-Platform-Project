import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, TouchableOpacity } from "react-native";
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { auth } from '../config/firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInScreen = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignInClicked = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, emailAddress, password);
      if (userCredentials) {
        Alert.alert(`Login Successful for ${emailAddress}`);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      }
    } catch (err) {
      console.log(`Error while signing in user: ${err}`);
    }
  };

  const onSignUpClicked = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View>
      <TextInput 
        style={styles.inputEmailStyle}
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
      <TouchableOpacity style={styles.buttonStyle} onPress={onSignInClicked}>
        <Icon name="sign-in" size={20} color="#fff" />
        <Text style={styles.buttonTextStyle}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={onSignUpClicked}>
        <Icon name="user-plus" size={20} color="#fff" />
        <Text style={styles.signUpButtonText}>Sign Up</Text>
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
  inputEmailStyle: {
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'brown',
    padding: 10,
    margin: 10,
    borderRadius: 100,
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'brown',
    padding: 10,
    margin: 10,
    borderRadius: 100,
  },
  signUpButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  }
});

export default SignInScreen;