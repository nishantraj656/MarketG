import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Button,Image,TextInput,KeyboardAvoidingView,ActivityIndicator} from 'react-native';
import {createDrawerNavigator,createSwitchNavigator} from 'react-navigation';


import "../../pic/logo.png";
import Register from './Register/Register';
import MainMenu from '../Menu/MainMenu';
class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           submitButtonDisable:false

        }
    }
    submitLogin = () =>{
        this.setState({
            submitButtonDisable:true
        });
    }
    createAccount = () =>{
        console.log("wait and fill the form");
        this.props.navigation.navigate('SingIn');
        
    }
    forgetPasswrod =() =>{
        alert("What can i do remember your password")
    }
    render() {
        if(true){
           return( this.props.navigation.navigate('MainMenu'));
        }
        else{
            return (
                <KeyboardAvoidingView behavior="padding" enabled>
                    <View style={styles.parentContainer}>
                        <View style={styles.container}>
                            <Image style={styles.image} source={require('../../pic/logo.png')} />
                            <Text style={styles.H1}>Welcome to MarketG</Text>
                            <Text style={styles.H4}>Thanks for installing - let's start shoping!</Text>
                            <TextInput underlineColorAndroid='#b3b3b3' style={styles.textInput} placeholder="Email or phone"/>
                            <TextInput underlineColorAndroid='#b3b3b3' style={styles.textInput} placeholder="Password" secureTextEntry={true}/>
                            <Button 
                                style = {styles.button} 
                                title="CONTINUE" 
                                onPress={this.submitLogin}
                                value = "CONTINUE"
                                disabled = {this.state.submitButtonDisable}
                            ></Button>
                            <View style={styles.Process}>
                                <ActivityIndicator 
                                    style = {{ opacity : this.state.submitButtonDisable ? 1 : 0 }} 
                                    size="large" 
                                    color="#00ff00" />
                            </View>
                            
        
                            <TouchableOpacity onPress={this.createAccount}>
                                <Text style={styles.H5}>Not on MarketG?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.forgetPasswrod}>
                                <Text style={styles.H4}>Forget Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            );

        }
   
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
        marginTop: '20%',
        fontSize: 30,
        fontWeight: '400',
        color: "#b3b3b3",
        textAlign: 'center', 
        marginBottom: 15
    },
    button:{
        marginTop: 50,
        
    },
    Process:{
        marginTop: 20,
    }
});

class SignInScreen extends React.Component{
    render(){
        return(<Register/>)
    }
}

class MainScreen extends React.Component{
    render(){
        return(<MainMenu/>)
    }
}

const RootStack = createSwitchNavigator(
    {
        Login: LoginScreen,
      SingIn: SignInScreen,
      MainMenu:MainScreen,
    },
    {
      initialRouteName: 'Login',
      backBehavior:'initialRoute',
     
    }
  );

 
export default class Login extends React.Component{
    render(){
        return(
                <RootStack/>
        );
    }
}


