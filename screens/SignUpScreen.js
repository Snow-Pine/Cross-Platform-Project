import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert} from "react-native";

//import neccessary firebase functions
import { auth } from '../config/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = ({navigation, route}) => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    //function to create account on Firebase Authentication
    const onCreateAccountPressed = async () => {
        console.log(`creating account`);

        try{
            //necessary data validations on user input
            //such as email and password not empty
            //email is in correct format, password length etc.
            //if data is valid, sign up with user's credentials
            const userCredentials = await createUserWithEmailAndPassword(auth, emailAddress, password);
            if (userCredentials){
            console.log(`Account created: ${JSON.stringify(userCredentials)}`);
            Alert.alert('Account Created');
            //navigate to Home screen
            navigation.navigate('Student List');
            
        }else{
            console.log(`Unable to create account`);
        }
    }catch(err){
            console.log(`Error occurred while creating account : ${err}`);
        }
    }

    return(
        <View>
            <TextInput 
                style={styles.inputStyle}
                placeholder="Enter Username"
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
          
            <Pressable style={styles.buttonStyle} onPress={onCreateAccountPressed}>
                <Text style={styles.buttonTextStyle}>Create Account</Text>
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

export default SignUpScreen;
