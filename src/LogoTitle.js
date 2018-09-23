import React from 'react';
import { StyleSheet,SectionList, Text,ToastAndroid, View,Button,TouchableOpacity,AsyncStorage, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class LogoTitle extends React.Component {
    constructor(props){
        super(props);
        this.state={
            cartNo:5,
            title:'Welcome To MarketG',
        }
       
    }

    _Retrive =async()=>{
        let v = await AsyncStorage.getItem('ItemInCart');
        if(v==null){
            await AsyncStorage.setItem('ItemInCart','0');
        }
        this.setState({cartNo:v});

    }

render() {  
    
          this._Retrive();  

  return (
    <View style={{flexDirection:'row',padding:5,marginTop:20, height:80,justifyContent:'space-around',backgroundColor:'#110059'}}>
        <View style={{height:30}}>
        <Image
                source={require('./pic/logo.png')}
                style={{ width: 50, height: 50,paddingLeft:20}}
            />
            <Text style={{color:'#fcfffd'}} >MarketG</Text>
        </View>
        <View><Text style={{ color:'#fcfffd', fontWeight:'800', fontSize:15, justifyContent:'center'}}>{this.state.title}</Text></View>
        <View>
            <Text style={{backgroundColor:'#d81717',color:'#ffffff',textDecorationStyle:'dotted'}}>{this.state.cartNo}</Text>
            <Icon name='cart' size={25} color='#ffffff' />
      </View>
        <View>


        </View>
        
        
    </View>
  );
}
}
