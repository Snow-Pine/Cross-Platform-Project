import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { CommonActions } from '@react-navigation/native';

import { auth } from '../config/firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInScreen = ( {navigation, route} ) => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    //function to sign in user with firebase auth
    const onSignInClicked = async() => {
        console.log(`sign in clicked`);

        try{
            //try to sign in with user's credentials
            const userCredentials = await signInWithEmailAndPassword(auth, emailAddress, password);

            if(userCredentials){
                console.log(`Login is successful. UserCredentials: ${JSON.stringify(userCredentials)}`);
                Alert.alert(`Login Successful for ${emailAddress}`);
            
            // navigate to a screen and remove all previous screens from the stack 
            // (preventing the user from navigating back)
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Student List' }],
                })
              );
        }else{
            console.log(`Login unsuccessful`);
        }
        }catch(err){
            console.log(`Error while signing in user : ${err}`);
        }
    }

    const onSignUpClicked = () => {
        console.log(`sign up clicked`);

        //navigate to SignUp screen
        navigation.navigate("SignUp");
    }

    return(
        <View>

            <TextInput 
                style={styles.inputStyle}
                placeholder="Enter Email Address"
                textContentType="emailAddress"
                autoCapitalize="none"
                returnKeyType="next"
                value={emailAddress}
                onChangeText={setEmailAddress}
            />

            <TextInput 
                style={styles.inputStyle}
                placeholder="Enter Password"
                textContentType="password"
                autoCapitalize="none"
                returnKeyType="done"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <Pressable style={styles.buttonStyle} onPress={onSignInClicked}>
                <Text style={styles.buttonTextStyle}>Login</Text>
            </Pressable>

            <Pressable  onPress={onSignUpClicked}>
                <Text style={ {color: 'blue'} }>Not registered yet? Create Account.</Text>
            </Pressable>
            
        </View>
    );
}

const styles = StyleSheet.create({
    inputStyle : {
        height: 50,
        margin: 10,
        padding: 5,
        borderColor: 'aquamarine',
        borderWidth: 1,
        fontSize: 20
    },
    buttonStyle: {
        height: 50,
        margin: 10,
        padding: 5,
        backgroundColor:'aquamarine',
        justifyContent:'center',
        alignItems:'center',
    },
    buttonTextStyle: {
        fontWeight: 'bold',
        color:'#000',
        fontSize: 20
    }
});

export default SignInScreen;