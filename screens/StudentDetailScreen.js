import { StyleSheet, Text, View, TextInput, Switch, Pressable, Alert} from 'react-native';
import {useState, useEffect} from "react"
import { db } from '../config/firebaseconfig';
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';

const StudentDetailScreen = ({navigation, route}) => {

    const {selectedStud} = route.params
    const {selectedDocumentID} = route.params

    // form fields
    const [nameFromUI, setNameFromUI] = useState("")
    const [gpaFromUI, setGPAFromUI] = useState("")
    const [isPGFromUI, setIsPGFromUI] = useState(true)

    //show existing information on form when screen loads
    useEffect ( () => {
        console.log(`selectedDocumentID : ${selectedDocumentID}`);
        console.log(`selectedStud : ${JSON.stringify(selectedStud)}`);

        setNameFromUI(selectedStud.name)
        setGPAFromUI(`${selectedStud.gpa}`)
        setIsPGFromUI(selectedStud.isPostGrad)
    } , []);

    //function to delete a specific document, receives the document ID to be deleted
    const btnDeletePressed = async() => {
        try{
            console.log(`trying to delete document : ${selectedDocumentID}`);
            //alternative, ask for confirmation
            //reference specific document from database to be deleted using doc ID
            const docToDelete = doc(db, 'students', selectedDocumentID);
            await deleteDoc(docToDelete);

                Alert.alert(`Delete`, `Student ${deleteDoc.name} deleted`);
                navigation.goBack();

        }catch(err){
            console.log(`Error while deleting the document : ${err}`);
        }
    }

    //function to update a specific document, receives the document ID to be updated
    const btnUpdatePressed = async() => {
        try{
            console.log(`document to update : ${selectedDocumentID}`);

            //reference specific document from database to be updated using doc ID
            const docToUpdate = doc(db, 'students', selectedDocumentID);
            const updatedStudent = {
                name: nameFromUI,
                gpa: parseFloat(gpaFromUI),
                isPostGrad: isPGFromUI
            }
            await updateDoc(docToUpdate, updatedStudent);
            Alert.alert(`Update`, `Student ${nameFromUI} updated successfully`);
        }catch(err){
            console.log(`Error while updating the document : ${err}`);
        }
    }

   return(
       <View style={styles.container}>  
            <TextInput placeholder="Enter name" onChangeText={setNameFromUI} value={nameFromUI} style={styles.tb}/>
            <TextInput placeholder="Enter gpa" keyboardType="numeric" onChangeText={setGPAFromUI} value={gpaFromUI} style={styles.tb}/>
            <Text>Is a post graduate student?</Text>
            <Switch onValueChange={setIsPGFromUI} value={isPGFromUI} style={{alignSelf:"flex-start"}}/>

            <Pressable style={styles.btn} onPress={() => btnUpdatePressed()}>
                <Text style={styles.btnLabel}>Update</Text>
            </Pressable>

            <Pressable style={styles.btn} onPress={() => btnDeletePressed()}>
                <Text style={styles.btnLabel}>Delete</Text>
            </Pressable>
            
       </View>
   )
}
export default StudentDetailScreen


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
