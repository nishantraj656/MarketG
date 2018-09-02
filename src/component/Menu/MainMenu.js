import React from 'react';
import { StyleSheet, Text, View,AsyncStorage,Button } from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
            createBottomTabNavigator,
            createMaterialTopTabNavigator
        } from 'react-navigation';
import Home from '../Home/Home';
import CartDetails from '../cart/cartDetails';
import ItemList from '../Item/ItemList';
import Item from '../Item/Items';
import BillList from '../Bill/BillList';

 
 
 

  class ShoppingScreen extends React.Component{
    render(){
        console.log("Ask click")
        return(<Item/>)
    }
                                        }

 class CartScreen extends React.Component{
   
    render(){
        console.log("Test click")
        return(<CartDetails/>)
    }
                                            } 

 class ProfileScreen extends React.Component{
   

     render(){
        console.log("Notice click")
         return(<View><Text>Notice</Text></View>)
     }
 }

 class HistoryScreen extends React.Component{

   
      render(){
        console.log("Contact click")
        return(<BillList/>)
    }
 }

 class HomeScreen extends React.Component{
    static navigationOptions = {
        // headerTitle instead of title
        title:'GK',
       // headerTitle: <LogoTitle />,
    
      };

    

      render(){
        console.log("Home click")
        return(<Home/>)
    }
 }

 class stScreen extends React.Component{
     render(){
         return(<View><Text>1st Date</Text></View>)
     }
 }

 class st2Screen extends React.Component{
    render(){
        return(<View><Text>1st Date</Text></View>)
    }
}



const Tab =createMaterialTopTabNavigator({
    st1 :stScreen,
    st2:st2Screen,
},{
    tabBarOptions: {
        labelStyle: {
          fontSize: 12,
        },
        tabStyle: {
          width: 100,
        },
        style: {
          backgroundColor: 'blue',
        },
      }

}) 

//Buttom tab 
const RootStack = createBottomTabNavigator(
    {
        Home:HomeScreen,
        Shopping: ShoppingScreen,
      Cart: CartScreen,
      Profile:ProfileScreen,
      "Order History":HistoryScreen,
      
        },
        {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Shopping') {
                iconName = `shopping${focused ? '' : ''}`;
            } else if (routeName === 'Cart') {
                iconName = `cart${focused ? '' : ''}`;
            }else if(routeName === 'Profile'){
                iconName = `account-settings${focused?'':''}`;
            }else if(routeName == 'Order History'){
                iconName =`delete${focused?'':''}`;
            }else if(routeName == 'Home'){
                iconName =`home${focused?'':''}`;
            }
    
            // You can return any component that you like here! We usually use an
            // icon component from react-native-vector-icons
            return <Icon name={iconName} size={25} color={tintColor} />;
            },
            
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: '#ffffff',
            style:{backgroundColor: '#2714d1'},
        },
        
        animationEnabled: false,
        swipeEnabled: true,
        initialRouteName :'Home',
        },   
  );

  export default class MainMenu extends React.Component{
    render(){
        return(
                <RootStack/>
        );
    }
}