import React from 'react';
import { StyleSheet, Text, View ,AsyncStorage} from 'react-native';

import Home from './src/component/Home/Home'
import Slider from './src/component/slider/Slider'
import Item from './src/component/Item/Items';
import ItemDetails from './src/component/Item/ItemDetails';
import CartDetails from './src/component/cart/cartDetails';
import BillList from './src/component/Bill/BillList';
import ItemList from './src/component/Item/ItemList';
import MainMenu from './src/component/Menu/MainMenu';
import Login from './src/component/CommanComp/Login';
import Memory from './src/component/Storage/Memory';
import Connection from './src/global/Connection';


export default class App extends React.Component { 

  constructor(){
    super();
    this.conn = new Connection();
  this._storeData();
  }
 

//

  _storeData = async () => {
    try {
  
   
     let v2 =  await AsyncStorage.getItem('ItemInCart');
  
      if (v2 == null ) {
        // We have data!!
        await AsyncStorage.setItem('ItemInCart', '0');
       
      }   

    } catch (error) {
      // Error saving data
      console.log("Error in app,js store ",error);
    }
  }


 render() {
    
    
    return (
     <Login/>
     );
  }
}


