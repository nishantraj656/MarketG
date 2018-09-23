import React from 'react'
import { StyleSheet,AsyncStorage,SectionList, Text, View,Button,TouchableOpacity, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {createDrawerNavigator,createMaterialTopTabNavigator, createStackNavigator,createSwitchNavigator, navigation} from 'react-navigation';
import SubCategorys from './ItemSubCategory';


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


export default class ItemDetails extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:[]
        }
        console.log('In details ');
        this._retrieveData();
    }

      //fire command for query in database
      fire = () =>{
        
        //console.log("Id Return "+id);
       let sql = "SELECT product_table.*,shop_info_table.*,product_list_table.* from product_table INNER JOIN shop_info_table on product_table.shop_id = shop_info_table.shop_info_id INNER JOIN product_list_table on product_list_table.p_list_id = product_table.p_list_id WHERE product_table.product_table_id = 1 AND product_table.product_table_id = 1";
        // let sql = this.state.query;
        console.log("FlatList sql : "+sql);

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
               console.log("FlatList Value",responseJson);
               
          //  alert("data update");
             this.setState({data:responseJson[0]});

            }).catch((error) => {
                alert("updated slow network");
                console.log(error);
                

            });           
         }



    _retrieveData = async () => {
        try {
          const chooseValue = await AsyncStorage.getItem('chooseItem');
          if (chooseValue !== null) {
            // We have data!!
            console.log("Chosse value data :",chooseValue);
            this.fire();
          }
          else{
              console.log("Note find value ");
          }
         } catch (error) {
           // Error retrieving data
           console.log("Error he itemDetails me ",error);
         }
      }

      _storeDataForCart = async () => {
                try {
                const chooseValue = await AsyncStorage.getItem('chooseItem');
        
                const id = await AsyncStorage.getItem('ItemInCart');
                const l = parseInt(id,10)+1;
                await AsyncStorage.setItem('ItemInCart',l.toString());
                await AsyncStorage.setItem('List'+l, chooseValue);
                console.log(":Items in cart  :"+await AsyncStorage.getItem('ItemInCart'));
                
                } catch (error) {
                // Error saving data
                console.log("Error in store data beta ",error);
                }
            }


    render(){
        return(<View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flex:1}}>
       
            <View style={styles1.contener}>
                <View style={{borderWidth:1,flex:1,borderRadius:5}}>
                    <Image style={{width: '100%', height: 150,borderRadius:5,flex:1}} source={{uri:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'}}/>
                    <Image style={{width: '100%', height: 150,borderRadius:5,flex:1}} source={{uri:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'}}/>
                
                </View> 
                <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                    <Text style={{fontSize:20,fontWeight:'900'}}>{this.state.data.p_name}</Text>
                </View>

                <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                <Text style={{fontSize:15,fontWeight:'900'}}>Price:{this.state.data.price} Rs/{this.state.data.unit}</Text>
                
                </View>
                
               

                <View>
                <Text style={{fontSize:15,fontWeight:'500',color:"#720664"}}>{this.state.data.name}</Text>
                </View>
                <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                <Text style={{fontSize:15,fontWeight:'900',paddingHorizontal:7,color:'#fcfcfc',backgroundColor:'#02490b'}}>*3.5</Text>
                <Text style={{fontSize:15,fontWeight:'400',paddingHorizontal:7,color:'#878787',}}>Rating 1,657</Text>
                </View>
            </View>
            <ScrollView>
            <View >
                <Text>{this.state.data.p_desc}</Text></View>
            </ScrollView>
           <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#f7c927'}}>
               <Button title="Add to cart" color="#f7c927" onPress={()=>{alert('Add to cart press'); this._storeDataForCart();}}/>
               <Button title="Cancel" color="#f7c927" onPress={()=>{ }}/>
               
           </View>
       
       
        </View>
          )
    }
}

