import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native';
import {createDrawerNavigator} from 'react-navigation';

import Slider from '../slider/Slider'


export default class Home extends React.Component {

  _onPressButton = () => {
    alert("Button press");
    }

  render() {
    return (

        <ScrollView contentContainerStyle={stylesHome.contentContainer}>
            <View style={stylesHome.container}>
                <View style={stylesHome.nav}>
                   <View style={stylesHome.navbar}>
                     <View style={stylesHome.togalButton}>
                         <TouchableOpacity onPress={this._onPressButton} style={stylesHome.button}>
                          <Text style={{color:'rgb(225,225,225)'}}>Menu</Text>
    </TouchableOpacity>
                      </View>

                      <View>
                        <Text style={{color:'rgb(225,225,225)'}}>Hello                              </Text><Text style={{color:'rgb(225,225,225)'}}>Hello </Text>
                      </View>
                   </View> 
                </View>

                <Slider/>
                
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
            </View>
        </ScrollView>
    );
  }
}



const stylesHome = StyleSheet.create({
        container: {
                        flex: 1,
                        backgroundColor: '#bcb9ab',
                    },
  contentContainer:{
                        flex:1
                    },
                nav:{
                        flex:0.2,
                        backgroundColor:'#033a13',
                    },
            navbar:{
                         flexDirection: 'row',
                        flex:1,
                        position:"relative",
                        alignItems: 'center',
                        justifyContent: 'space-around',
                       
                    },
            button:{
                       alignItems: 'center',
                        backgroundColor: '#DDDDDD',
                  }
    
});
