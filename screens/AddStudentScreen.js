import { StyleSheet, Text, View, TextInput, Switch, Pressable, Alert} from 'react-native';
import {useState} from "react"

import { db } from '../config/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';

const AddStudentScreen = () => {

   // form fields
   const [nameFromUI, setNameFromUI] = useState("")
   const [gpaFromUI, setGPAFromUI] = useState("")
   const [isPGFromUI, setIsPGFromUI] = useState(true)

   //function to insert document to database
   const buttonPressed = async() => {
        //perform data validations

        // convert gpa to number
        const gpaAsNumber = parseFloat(gpaFromUI)

        console.log(`Name: ${nameFromUI}, GPA: ${gpaAsNumber}, IsPG? ${isPGFromUI}`)

        //create object literal to represent the document to be inserted
        const studentToInsert = {
            name : nameFromUI,
            gpa : gpaAsNumber,
            isPostGrad : isPGFromUI
        }

        // insert into database
        try {
            console.log(`Trying to add document.`);

            //identify the collection to store document using collection reference
            const collectionRef = collection(db, 'students');

            //add the document using the collection reference using addDoc
            //addDoc(reference_to_collection, object_to_add_as_document)
            //return a reference to document
            const docRef = await addDoc(collectionRef, studentToInsert);

            if (docRef) {
                Alert.alert("Success", `Student ${nameFromUI} saved to database`);
            }else{
                Alert.alert("Error", `Unable to save the data to database`);
            }

        } catch (err) {
            console.log(`Error while inserting a document : ${err}`);
        }
   }


   return(
       <View style={styles.container}>  
            <TextInput 
                placeholder="Enter name" 
                onChangeText={setNameFromUI} 
                value={nameFromUI} 
                style={styles.tb}
            />
          
            <TextInput 
                placeholder="Enter gpa" 
                keyboardType="numeric" 
                onChangeText={setGPAFromUI} 
                value={gpaFromUI} 
                style={styles.tb}
            />
          
            <Text>Is a post graduate student?</Text>
            <Switch 
                onValueChange={setIsPGFromUI} 
                value={isPGFromUI} 
                style={{alignSelf:"flex-start"}}
            />
           
            <Pressable onPress={buttonPressed} style={styles.btn}>
                <Text style={styles.btnLabel}>Insert to database</Text>
            </Pressable>
       </View>
   )
}
export default AddStudentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',     
        padding:20,
    },
    tb: {
        width:"100%",   
        borderRadius:5,
        backgroundColor:"#efefef",
        color:"#333",
        fontWeight:"bold", 
        paddingHorizontal:10,
        paddingVertical:15,
        marginVertical:10,       
    },
    btn: {
        borderWidth:1,
        borderColor:'yellow',
        borderRadius:8,
        paddingVertical:16,
        marginVertical:20,
        backgroundColor: 'teal'
    },
    btnLabel: {
        fontSize:16,
        textAlign:"center",
        color: 'blue',
        fontWeight: 'bold',
        color: 'white'
    },
    text: {
        fontSize:20,
        textAlign:"center",
        marginVertical:8,
    }
});
