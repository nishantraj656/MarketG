import React from 'react';
import { StyleSheet, Text, View ,ScrollView,Button,Image,TextInput,KeyboardAvoidingView} from 'react-native';

import "../../../pic/logo.png";
export default class VerifyOTP extends React.Component {
  render() {
    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <View style={styles.parentContainer}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../../../pic/logo.png')} />            
                    <TextInput 
                        underlineColorAndroid='#b3b3b3' 
                        keyboardType='numeric' 
                        style={styles.textInput} 
                        placeholder="Enter OTP"
                    />
                    <Button style = {styles.button} title="Verify ME" onPress={()=>{}}></Button>
                    <Text style={styles.H5}>Resend Code</Text>
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
        
    },
    H5:{
        marginTop: '15%',
        fontSize: 13,
        fontWeight: '800',
        color: "#0c68a9",
        textAlign: 'center', 
        marginBottom: 15
    },
});



