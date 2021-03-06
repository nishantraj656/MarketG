import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity,Picker,AsyncStorage,ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import Slider from '../slider/Slider'
import { ScrollView } from 'react-native-gesture-handler';
import {createDrawerNavigator,createStackNavigator,navigationOptions,createMaterialTopTabNavigator} from 'react-navigation';
import ItemDetails from './ItemDetails';

const srvItems=[];

class LogoTitle extends React.Component {
    render() {

        
       
      return (
        <View style={styles.contener}>
            
                <Image
                    source={require('../../pic/logo.png')}
                    style={{ width: 100, height:100, paddingLeft:20}}
                />
                
           
           
                 <Text style={styles.titleName}>Welcome To MarketG</Text>
            
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

//css flatlist
const styles1=StyleSheet.create({
    contener:{
           
              flex:1,
              backgroundColor:'#fceff8', 
              padding:5,
              width:"100%",  
              borderRadius:1,
              borderColor: '#f4f4f4',
              borderWidth:1,
                      
      },
   logoTitle:{
          color:'#fcfffd'
   },
   Title:{
       flex:1,
       alignItems:'center',
       marginLeft:10,
  },
  titleName:{
      color:'#000000',
      fontWeight:'800',
      fontSize:20,
      justifyContent:'center'
  }
   
}) 

class DetailsScreen extends React.Component{
    render(){
        return(<ItemDetails/>)
    }
}

class ItemsScreen extends React.Component{



    constructor(props){
        super(props)
        this.state={
            data:[],
            avilableItem:['rice','oil','sugar'],
            language:'',
            id:0,
        }
        this._retrieveData();
    }

    static navigationOptions = {
        // headerTitle instead of title
       title:"Shoping",
       header:null,

        };


    _retrieveData = async () => {
            try {
              const value = await AsyncStorage.getItem('subcategory');
              if (value !== null) {
                // We have data!!
                console.log("In value return  data "+value);
                this.setState({id:value})
                this.fire(this.state.id);
              }
              else{
                  console.log("Else wale ho beta ");
              }
             } catch (error) {
               // Error retrieving data
               console.log("Error he re baba  ",error);
             }
          }

    _renderIteam=({item})=>{
                
        var yourBase64Icon = 'data:image/png;base64,';

        return(
            <View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flex:1}}>
            <TouchableOpacity onPress={()=>{alert("Button press")}}>
                <View style={styles1.contener}>
                    <View style={{justifyContent:'center',alignItems:'center',flex:1,borderRadius:5}}>
                        <Image style={{width: 100, height: 100,borderRadius:5,flex:1}} source={{uri:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'}}/>
                    </View> 
                    <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                        <Text style={{fontSize:20,fontWeight:'900'}}>{item.p_name}</Text>
                    </View>

                    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'900'}}>Price:{item.price} Rs/{item.unit}</Text>
                    </View>
                    
                   

                    <View>
                    <Text style={{fontSize:15,fontWeight:'500',color:"#720664"}}>{item.name}</Text>
                    </View>
                    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'900',paddingHorizontal:7,color:'#fcfcfc',backgroundColor:'#02490b'}}>*3.5</Text>
                    <Text style={{fontSize:15,fontWeight:'400',paddingHorizontal:7,color:'#878787',}}>Rating 1,657</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Button title="More Details" onPress={()=>{alert("Press on details "+item.p_list_id);}}/>
            </View>
                   
                        
        );
        
    }  


             //fire command for query in database
             fire = (id) =>{
        
                console.log("Id Return "+id);
               let sql = "select product_table.*,product_list_table.*,shop_info_table.* from product_list_table INNER JOIN product_table ON product_table.p_list_id = product_list_table.p_list_id INNER JOIN shop_info_table ON product_table.shop_id = shop_info_table.shop_info_id where sub_category_id="+id;
               // let sql = "SELECT `subcategory_id`, `category_id`, `subcategory_name` FROM `sub_category_table` where category_id="+id;
            
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
                     console.log("On items ",responseJson);
                   
                     this.setState({data:responseJson});
        
                    }).catch((error) => {
                        alert("updated slow network");
                        console.log(error);
                        
        
                    });           
             }
    
    
    

    // _renderHeader=() =>{
    //                     return <SearchBar placeholder='Type here.....' lightTheme round/>
    //                  }

    _renderFoot =() =>{
                        return(
                                <View style={{paddingVertical:20,borderTopWidth:1,borderTopColor:'#CED0CE'}}>
                                    <ActivityIndicator animating size="large"/>
                                </View>
                            )
                    }

    render(){

        for(var i = 0;i<this.state.avilableItem.length-1;i++){
            s = this.state.avilableItem[i];
            srvItems.push(<Picker.Item label={s} value={s} />);
        }


        
        return(
        <View style={{flex:1,width:'100%'}}>
              <ScrollView>  
                        <FlatList
                                data={this.state.data}
                                renderItem={this._renderIteam}
                               
                                numColumns={2}
                                
                                ListFooterComponent={this._renderFoot}
                            />   
          </ScrollView>      
        </View>
        )
    }
} 



const RootStack = createStackNavigator(
    {
        Items: ItemsScreen,
      Details: DetailsScreen,
    },
    {
      initialRouteName: 'Items',
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

 
export default class Item extends React.Component{
    render(){
        return(
                <RootStack/>
        );
    }
}