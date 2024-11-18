import { StyleSheet, Text, View, Pressable, TextInput, FlatList, TouchableOpacity, Button, Alert} from 'react-native';
import { useState, useEffect, useCallback } from "react"
import { CommonActions } from '@react-navigation/native';
//to run side-effects when a screen is focused
import { useFocusEffect } from '@react-navigation/native';

import { auth } from '../config/firebaseconfig';
import { signOut } from 'firebase/auth';

import { db } from '../config/firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default StudentListScreen = ({navigation}) => {

    const [nameFromUI, setNameFromUI] = useState("")
    const [studentList, setStudentList] = useState([])

    const logoutPressed = async() => {
        console.log(`logout pressed`);

        try{
            //try to logout
            await signOut(auth);

            //navigate to sign in screen and remove all existing screens from stack 
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'SignIn' }],
                })
              );
        }catch(err){
            console.log(`Error while logging out : ${err}`);
        }
    }

    //function to get all documents from students collection
    const getAllStudents = async() => {
        try{
            //try to get data from firestore
            //identify the collection to retrieve documents from using collection reference
            const collectionRef = collection(db, 'students');

            //get the querySnapshot to retrieve all docuemnts from the collection
            const querySnapshot = await getDocs(collectionRef);

            const resultFromDB = [];

            //process all docuemnts in the querySnapshot
            querySnapshot.forEach((doc) => {
                //extract the required fields from the document
                //extracting the id of the document
                const student = {
                    id: doc.id, //document id for editing and deleting
                    ...doc.data() //entire object representing document data
                }

                //add the object to the array
                resultFromDB.push(student);
            });

            //set the array to state variable for UI
            setStudentList(resultFromDB);

        }catch(err){
            console.log(`Error while getting all documents : ${err}`);
        }
    }
       
    //function to search for a specific student
    const btnSearchPressed = async() => {
        console.log(`Textbox value is: ${nameFromUI}`)
        
        try {           
            //create a query represents the search criteria and search the database
            //identify the collection to retrieve documents from using collection reference
            const collectionRef = collection(db, 'students');

            //form a query
            //(collection_reference, where(field_name, comparison_operator, value_to_compare))
            const nameQuery = query(collectionRef, where("name", "==", nameFromUI));
            const querySnapshot = await getDocs(nameQuery);

            const resultFromDB = [];

            //process all docuemnts in the querySnapshot
            querySnapshot.forEach((doc) => {
                //extract the required fields from the document
                //extracting the id of the document
                const student = {
                    id: doc.id, //document id for editing and deleting
                    ...doc.data() //entire object representing document data
                }

                //add the object to the array
                resultFromDB.push(student);
            });

            if (resultFromDB.length > 0) {
                setStudentList(resultFromDB);
            } else {
                Alert.alert(`No student found with name ${nameFromUI}`);
            }

        } catch (err) {
            console.log(err)
        }
    }

    // to perform side-effect when screen is focused
    //get all student records from database when the screen is focused
    useFocusEffect(
        useCallback(() => {
          getAllStudents()
        }, [])
    );

   return(
       <View style={styles.container}>  

            <TextInput 
                placeholder="Enter name" 
                onChangeText={setNameFromUI} 
                text={nameFromUI} 
                style={styles.tb}
            />
            
            <Pressable style={styles.btn} onPress={btnSearchPressed}>
                <Text style={styles.btnLabel}>Search Document</Text>
            </Pressable>
            
            <Pressable style={styles.btn} onPress={getAllStudents}>
                <Text style={styles.btnLabel}>Get All Documents</Text>
            </Pressable>
            
            <Text style={styles.text}>Class List</Text>
            <FlatList
                data={studentList}
                keyExtractor={(item)=>{ return item.id }}
                renderItem={
                        ({item})=>{
                            return(
                                <TouchableOpacity 
                                    onPress = { () => {
                                        //navigate to details screen with selected student document id and entire student object
                                        navigation.navigate("Details", {selectedDocumentID: item.id, selectedStud: item})
                                    }}
                                    style = {styles.listItem}>
                                    
                                    <Text style= { styles.text }>{item.name}</Text>
                                    <View style={{borderWidth:1, borderColor:"#ccc", marginVertical:4}}></View>
                                </TouchableOpacity>
                            )
                        }
                    }  
            />

            <Pressable style={styles.btn} onPress={logoutPressed }>
                <Text style={styles.btnLabel}>Logout</Text>
            </Pressable>

            <Pressable style={styles.btn} onPress={ () => { navigation.navigate("Add Student") } }>
                <Text style={styles.btnLabel}>Add Student</Text>
            </Pressable>
            
      </View>

   )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',     
        padding:20,
    },
    listItem: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 5,
            borderWidth:1, 
            borderColor:"#ccc", 
            marginVertical:4
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
        paddingVertical:10,
        marginVertical:5,
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


/*
Task : 

- create a new screen named StudentDetailScreen
- provide a navigation to this screen when user clicks on any of the FlatList item.
- send the selected student object to the detail screen

- detail screen should show the existing details of the student
- this screen should also allow the user to update the existing values of the student and update it in database

- optionally, move the delete button to the detail screen to allow the user to delete the student from db
*/