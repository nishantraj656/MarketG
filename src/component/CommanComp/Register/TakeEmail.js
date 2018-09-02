import React from 'react';
import { StyleSheet, Text, View ,ScrollView,Button,Image,TextInput,KeyboardAvoidingView} from 'react-native';

import "../../../pic/logo.png";
export default class TakeEmail extends React.Component {
  render() {
    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <View style={styles.parentContainer}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../../../pic/logo.png')} />            
                    <TextInput underlineColorAndroid='#b3b3b3' keyboardType='email-address' style={styles.textInput} placeholder="Enter your email"/>
                    <Button style = {styles.button} title="Let's GO" onPress={()=>{}}></Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
    parentContainer:{
        
    },
    container:{
        
        backgroundColor: '#ffffff',
        
        
        alignSelf: 'center',
        justifyContent: 'center',
        
       
        //alignItems :'center'
    },
    textInput:{  
        textAlign: 'justify',
        marginBottom: 7,
        height: 40,
        //borderWidth: 1,
        // Set border Hex Color Code Here.
        borderColor: '#2196F3',
        
        // Set border Radius.
        borderRadius: 5 ,
        paddingLeft: 3,
        // Set border Radius.
        //borderRadius: 10 ,
    },
    
    image:{
        justifyContent: 'flex-start',
        alignSelf: 'center',
        margin: 55,
    },
   
    
    button:{
        marginTop: 50,
        
    }
});



