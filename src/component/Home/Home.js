import React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,Button ,AsyncStorage,ActivityIndicator} from 'react-native';
import {createDrawerNavigator,createStackNavigator,navigation,createSwitchNavigator} from 'react-navigation';
import ItemList from '../Item/ItemList'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Slider from '../slider/Slider'
import { FlatList } from 'react-native-gesture-handler';
import Item from '../Item/Items';
import SubCategory from '../Item/ItemSubCategory';
import SubCategorys from '../Item/ItemSubCategory';


class LogoTitle extends React.Component {
        constructor(props){
            super(props);
            this.state={
                cartNo:5,
            }
           
        }

        _Retrive =async()=>{
            let v = await AsyncStorage.getItem('ItemInCart');
            this.setState({cartNo:v});
  
        }

   render() {  
        
              this._Retrive();  
    
      return (
        <View style={{flexDirection:'row',padding:5,marginTop:20, height:80,justifyContent:'space-around',backgroundColor:'#110059'}}>
            <View style={{height:30}}>
            <Image
                    source={require('../../pic/logo.png')}
                    style={{ width: 50, height: 50,paddingLeft:20}}
                />
                <Text style={{color:'#fcfffd'}} >MarketG</Text>
            </View>
            <View><Text style={{ color:'#fcfffd', fontWeight:'800', fontSize:15, justifyContent:'center'}}>Welcome to MarketG</Text></View>
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

  const styles=StyleSheet.create({
      contener:{
          flexDirection: 'row',
                flex:1,
                height:150,
                backgroundColor:'#fcfcfc',
                       
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
        fontSize:15,
        justifyContent:'center'
    }
     
  })

  /*** 
class Search extends React.Component{
    render(){
        return(
            <TouchableOpacity onPress={()=>{ alert("Button click");this.props.navigation.navigate("Filter");}}>
                <View style={{paddingHorizontal:5}}><Icon name="search" size={15} color="#ffffff" /></View>
            </TouchableOpacity>
        )
    }
}
*/




    
 class HomesScreen extends React.Component {
     constructor(props){
         super(props);
         this.state={
             category:[],
            }           
        
     }

     componentWillMount(){
        console.log("It will calll mount ");
        this.fire();
     }

     //Store category id 
     _storeData = async (select) => {
        try {
          await AsyncStorage.setItem('category', select);
          console.log("in storage data ",select);
          this.props.navigation.navigate('Category',{categoryID:select,})
        } catch (error) {
          // Error saving data
          console.log("Error in store data beta ",error);
        }
          }

      _storeDataForProduct = async (select) => {
        try {
          await AsyncStorage.setItem('chooseItem', select);
          console.log("in storage data ",select);
        } catch (error) {
          // Error saving data
          console.log("Error in store data beta ",error);
        }
         }

     fire = () =>{
        
        
       // let sql = "SELECT * FROM `category_table`";
       let sql = "SELECT category_id,category_name FROM `category_table`";
        console.log(sql);
        fetch('http://biharilegends.com/biharilegends.com/market_go/run_query.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: sql,
            }) 
            }).then((response) => response.json())
                .then((responseJson) => {

                console.log("---------------###------",responseJson);
                  this.setState({category:responseJson});
    
                }).catch((error) => {
                    alert("updated slow network");
                    console.log(error);
                    
    
                });
    
        }

    _onPressButton = () => {
    alert("Button press");
     }

     //List of category items
    _renderItems =({item})=>{

    var yourBase64Icon = 'data:image/png;base64,'+item.category_pic;
        console.log("Value is ",item.category_id);
        return(
            <TouchableOpacity onPress={()=>{ this._storeData(item.category_id);}}>
            <View style={{margin:5,borderRadius:10}}>
                <View style={{height:250,width:100,backgroundColor:"#fcfdff",paddingHorizontal:5,borderRadius:10}}>
                <View style={{height:100,width:100}}>
                <Image resizeMode="center" source={{uri:yourBase64Icon}} style={{height:100,width:100}}/>
                </View>
                     <Text>{item.category_name}</Text>
                </View>

                
            </View>
            </TouchableOpacity>
        );
        }

    _onPress=({item})=>{
        
    }

    render() {
        return (

            <View style={stylesHome.contentContainer}>
                <LogoTitle/>
                <View style={stylesHome.container}>
                
                    <ScrollView>
                    <View style={{backgroundColor:'#fcfcfc',flex:1,height:150,padding:5}}>
                        <Slider/>
                    </View>

                    <View style={{backgroundColor:'#e5ef73',flex:1,height:200,padding:5,marginTop:5}}>  
                    <FlatList 
                    data={this.state.category}
                    renderItem={this._renderItems}
                    ItemSeparatorComponent={()=>{return(<View style={{borderRadius:5,borderColor:'#012160'}}><Text></Text></View>)}}
                    
                    keyExtractor={items => items.category_id}
                    ListEmptyComponent={()=>{return(<View style={{justifyContent:'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Wait List is Loading.....</Text>

                 </View>);}}
                    horizontal
                    />
                    </View>
                    

                    <View style={{flex:1}}>
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
/**
class FilterScreen extends React.Component{
    render(){
        return(<FilterList/>)
    }
}*/

class DetailsScreen extends React.Component{
    render(){
        return(<ItemList/>)
    }
}

class StackHomeScreen extends React.Component{
    render(){
        return <StackHome/>
    }
}


//It will show category details
class CategoryDetailsScreen extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

          /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('categoryID','NO-ID');
    let id =JSON.parse(itemId)
        console.log("Home data "+id);

       

        return( <SubCategorys id={id}/> );
    }
}


const stylesHome = StyleSheet.create({
        container: {
                        flex: 1,
                        backgroundColor: '#f2bcef',
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

const StackHome =createSwitchNavigator({
    Home:HomesScreen,
    Category:CategoryDetailsScreen
})

const RootStack = createStackNavigator(
    {
     Home: StackHomeScreen,
      Details: DetailsScreen,
    //  Filter :FilterScreen,
    },
    {
      initialRouteName: 'Home',
        headerMode:'none'
    }
  );

 
 
export default class Home extends React.Component{
   
      
    render(){
        return(
                <RootStack/>
        );
    }
}
