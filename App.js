import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/component/Home/Home'
import Slider from './src/component/slider/Slider'
import Item from './src/component/Item/Items';
import ItemDetails from './src/component/Item/ItemDetails';
import CartDetails from './src/component/cart/cartDetails';
import BillList from './src/component/Bill/BillList';
import ItemList from './src/component/Item/ItemList';
import MainMenu from './src/component/Menu/MainMenu';
import Login from './src/component/CommanComp/Login';




export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Chicago': require('./assets/fonts/Chicago.ttf'),
    });
  }

  render() {
    return (
      <Login/>
    );
  }
}


