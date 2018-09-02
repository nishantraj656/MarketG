import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image } from 'react-native';
import {createDrawerNavigator,createStackNavigator} from 'react-navigation';
import ItemList from '../Item/ItemList'

import Slider from '../slider/Slider'


class LogoTitle extends React.Component {
    render() {

        
       
      return (
        <View style={styles.contener}>
            <View >
            <Image
                    source={require('../../pic/logo.png')}
                    style={{ width: 50, height: 30,paddingLeft:20}}
                />
                <Text style={styles.logoTitle} >Bihari Legends</Text>
            </View>

            <View style={styles.Title}><Text style={styles.titleName}>General Knowlege</Text></View>
        </View>
      );
    }
  }

  const styles=StyleSheet.create({
      contener:{
          flexDirection: 'row',
                flex:1,
                height:150,
                backgroundColor:'#003f17',
                justifyContent: 'space-around',        
        },
     logoTitle:{
            color:'#fcfffd'
     },
     Title:{
         flex:1,
         alignItems:'center'
    },
    titleName:{
        color:'#fcfffd',
        fontWeight:'800',
        fontSize:20,
        justifyContent:'center'
    }
     
  })


 class HomesScreen extends React.Component {

    static navigationOptions = {
        // headerTitle instead of title
        headerTitle: <LogoTitle/>,
       
        };

  _onPressButton = () => {
    alert("Button press");
    }

  render() {
    return (

        <View style={stylesHome.contentContainer}>
            <View style={stylesHome.container}>
               
                <ScrollView>
                <View style={{borderWidth:2,backgroundColor:'#49bc3a',flex:1,height:150,padding:5}}>
                    <Slider/>
                </View>
                

                <View style={{borderWidth:2,borderColor:'red',flex:1}}>
                    <View style={{backgroundColor:'#d9e1e2',flex:1}}>
                     
                        <ItemList/>                        
                         
                    </View>                
                </View>
                </ScrollView> 
                
                
            </View>
        </View>
    );
  }
}

class DetailsScreen extends React.Component{
    render(){
        return(<ItemList/>)
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


const RootStack = createStackNavigator(
    {
        Home: HomesScreen,
      Details: DetailsScreen,
    },
    {
      initialRouteName: 'Home',
      /* The header config from HomeScreen is now here */
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#003f17',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
  );

 
export default class Home extends React.Component{
    render(){
        return(
                <RootStack/>
        );
    }
}
