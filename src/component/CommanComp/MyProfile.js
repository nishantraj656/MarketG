import React from 'react';
import { StyleSheet, Text, View ,ScrollView,Button,Image,TextInput,KeyboardAvoidingView} from 'react-native';

import "../Image/logo.png";
export default class Login extends React.Component {
  render() {
    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <View style={styles.parentContainer}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../Image/logo.png')} />
                    <Text style={styles.H4}>Edit your profile!</Text>
                    <TextInput 
                        underlineColorAndroid='#b3b3b3' 
                        style={styles.textInput} 
                        placeholder="Your name"
                    />
                    <TextInput 
                        underlineColorAndroid='#b3b3b3' 
                        style={styles.textInput} 
                        placeholder="Your Email"
                    />
                    <TextInput 
                        underlineColorAndroid='#b3b3b3' 
                        style={styles.textInput} 
                        placeholder="Your phone no."
                    />
                    <TextInput 
                        underlineColorAndroid='#b3b3b3' 
                        style={styles.textInput} 
                        placeholder="Delivery Address"
                    />
                    <Button style = {styles.button} title="CONTINUE" onPress={()=>{}}></Button>
                    <Text style={styles.H5}>Not on MarketGO?</Text>
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
    H1:{
        fontSize: 28,
        fontWeight: '400',
        color: "#000",
        textAlign: 'center', 
        marginBottom: 15
    },
    image:{
        justifyContent: 'flex-start',
        alignSelf: 'center',
        margin: 55,
    },
    H4:{
        fontSize: 13,
        fontWeight: '400',
        color: "#b3b3b3",
        textAlign: 'center', 
        marginBottom: 15
    },
    H5:{
        marginTop: '45%',
        fontSize: 13,
        fontWeight: '400',
        color: "#b3b3b3",
        textAlign: 'center', 
        marginBottom: 15
    },
    button:{
        marginTop: 50,
        
    }
});



