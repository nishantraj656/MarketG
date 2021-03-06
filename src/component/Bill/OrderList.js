import React from 'react';
import { StyleSheet,SectionList, Text, View,Button,TouchableOpacity,AsyncStorage, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import {createDrawerNavigator,createMaterialTopTabNavigator, createStackNavigator,createSwitchNavigator, navigation} from 'react-navigation';


import { ScrollView } from 'react-native-gesture-handler';
import LogoTitle from '../../LogoTitle';

const cl='';
const cd='';

//css flatlist
const styles1=StyleSheet.create({
    contener:{
           
              flex:1,
             backgroundColor:'#f2d56d', 
              padding:5,
              width:"100%", 
              height:150, 
              borderRadius:5,
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
      //fontWeight:'800',
      fontSize:20,
      justifyContent:'center'
  }
   
}) 


    //This  show List of History cart 
class CartList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data:[],
            id:this.props.id,
            datap:[],
            userID:0,
            process:false,
        }  
        cl=this;  
    }

    componentWillMount(){
        console.log("It will calll mount ");
        this._retrieveData();
     }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('category');
          const userID = await AsyncStorage.getItem('costID');
          if (value !== null && userID !== null) {
            // We have data!!
            console.log("In value return  data "+value);
           this.setState({userID:userID});
            this.fire();
           
          }
          else{
              console.log("Else wale ho beta ");
          }
         } catch (error) {
           // Error retrieving data
           console.log("Error he re baba :::",error);
         }
      }


      //store cartID 
      _storeData = async (select) => {
        try {

                await AsyncStorage.setItem('CartID', select.toString());
                this.props.navigation.navigate("Details");
                console.log("in storage data ",select);

            } catch (error) {
                // Error saving data
                console.log("Error in store data beta ",error);
            }
      }


      
      _storeDataForProduct = async (select) => {
        try {
          await AsyncStorage.setItem('chooseItem', select);
          console.log("in storage data ",select);
          this.props.navigation.navigate('Details');
        } catch (error) {
          // Error saving data
          console.log("Error in store data beta ",error);
        }
      }

   
    _renderFoot =() =>{
                        return(
                                <View style={{paddingVertical:20,borderTopWidth:1,borderTopColor:'#CED0CE'}}>
                                    <ActivityIndicator animating size="large"/>
                                </View>
                            )
                    }

            //fire command for query in database
    fire = () =>{
        
                    this.setState({ process:true})
                    let sql = "SELECT cart_lot_table.*,shop_info_table.name from cart_lot_table INNER join shop_info_table ON cart_lot_table.shop_info_id = shop_info_table.shop_info_id where customer_info_id ="+this.state.userID;
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
                           console.log(responseJson);
                          // console.log('Home update');
                       alert("data update");
                         this.setState({data:responseJson});
                         this.setState({ process:false})
                        }).catch((error) => {
                            alert("updated slow network");
                            console.log(error);
                            this.setState({ process:false})
                  
            
                        });           
                 }


                 //Product list show data
_renderIteamList=({item})=>{
                
                   // var yourBase64Icon = 'data:image/png;base64,';
            
                    return(
                        <View style={{shadowOpacity:5,shadowColor:"#050505"}}>
                        <TouchableOpacity onPress={()=>{ this._storeData(item.cart_lot_no);}}>
                            <View style={{  flex:1,
                                    backgroundColor:'#ffffff', 
                                    padding:5,
                                    width:"100%", 
                                    height:150, 
                                    borderRadius:5,
                                    borderWidth:1,
                                }}>
                                 
                                <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                                    <Text style={{fontSize:20,fontWeight:'900'}}>{item.name}</Text>
                                </View>
            
                                <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                                <Text style={{fontSize:15,fontWeight:'900'}}>Total Price : {item.total_price} </Text>
                                <Text style={{color:'#21e004',fontSize:15,fontWeight:'900'}}>Paid Amount : {item.paid_amt}</Text>
                                </View>
                                
                               
            
                                <View>
                                <Text style={{fontSize:15,fontWeight:'500',color:"#720664"}}>Order On : {item.created_at}</Text>
                                </View>
                                <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                                <Text style={{fontSize:15,fontWeight:'900',paddingHorizontal:7,color:'#fcfcfc',backgroundColor:'#02490b'}}>*3.5</Text>
                                <Text style={{fontSize:15,fontWeight:'400',paddingHorizontal:7,color:'#878787',}}>Rating 1,657</Text>
                                </View>
                            </View>
                        </TouchableOpacity>                      
                        </View>                                   
                    );
                    
                }  
        

    render(){
    
        return(<View style={{width:'100%',flex:1,padding:2,}}>
                    <ScrollView>                   
                        
                       
                            <FlatList
                                data={this.state.data} 
                                renderItem={this._renderIteamList}
                                numColumns={1} 
                               
                                ListEmptyComponent={()=>{return(<View style={{justifyContent:'center'}}>
                                <ActivityIndicator size="large" color="#0000ff" />
                                <Text>Wait List is Loading.....</Text>

                             </View>);}}
                                    />   
                        
                    </ScrollView>

                    <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#f7c927'}}>
                     {!this.state.process ?  <Button title="Re-fresh" color="#f7c927" onPress={()=>{this.fire();}}/> : <ActivityIndicator size="large" color="#0000ff" />}              
                    </View>
                </View>);
    }
} 

    // It Will show the details of cart Products
class CartDetails extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
       
        console.log('In details ');
        
        cd =this;
    }
    
    refresh = async()=>{

        console.log("In refresh");
        this._start();

    }

    
    componentWillMount(){

        console.log("It will calll mount ");
        this._start();
        
    }

      //fire command for query in database
    fire = async() =>{
        let id = await AsyncStorage.getItem('CartID');
        //console.log("Id Return "+id);
       let sql = " SELECT DISTINCT order_table.*,product_table.unit,product_table.price,product_list_table.P_name FROM order_table INNER JOIN product_table ON order_table.product_list_id = product_table.product_table_id INNER JOIN product_list_table ON product_list_table.p_list_id = product_table.p_list_id where order_table.cart_lot_no_id ="+id;
       
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
               console.log("IN Details : ",responseJson);
               
          //  alert("data update");
           this.setState({data:responseJson});
           this.render;

            }).catch((error) => {
                alert("updated slow network");
                console.log(error);
                

            });           
         }



    _start = async () => {
       await this.fire();
      }


      // It will add the list to the cart with item number 
      _storeDataForCart = async () => {
                try {
                const chooseValue = await AsyncStorage.getItem('chooseItem');
        
                const id = await AsyncStorage.getItem('ItemInCart');
                const l = parseInt(id,10)+1;
                await AsyncStorage.setItem('ItemInCart',l.toString());
                await AsyncStorage.setItem('List', chooseValue);
                console.log(":Items in cart  :"+await AsyncStorage.getItem('ItemInCart'));
                
                } catch (error) {
                // Error saving data
                console.log("Error in store data beta ",error);
                }
            }

            //Show the list of items
        _renderIteam=({item})=>{
                
                var yourBase64Icon = 'data:image/png;base64,'+item.subcategory_pic;
        
                return(
                    <View style={item.order_status==0? { backgroundColor:'#e89b9b',borderBottomWidth:1,justifyContent:'space-between',flexDirection:'row'}
                                    :{ backgroundColor:'#a6e27a',borderBottomWidth:1,justifyContent:'space-between',flexDirection:'row'}}>
                        <View style={{alignItems:'center',width:'25%',padding:3,margin:5,}} >
                        <Text style={{fontSize:15,fontWeight:'900'}}> {item.P_name}</Text>
                        </View>

                        <View style={{alignItems:'center',width:'25%',padding:3,margin:5,}} >
                        <Text style={{fontSize:15,fontWeight:'900'}}> {item.price}</Text>
                        </View>

                        <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',padding:3,margin:5,}}>
                        <Text style={{fontSize:15,fontWeight:'900'}}>{item.quantity} {item.unit}</Text>
                        </View>

                        <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',paddingRight:5,}} >
                        <Text style={{fontSize:15,fontWeight:'900'}}> {item.oPrice} </Text>
                        </View>
                    

                </View>   
                                
                );
                
            }  

    render(){
        const {navigation} = this.props;
        const id = navigation.getParam('id', 'NO-ID');
        console.log("IUDjgfyukfguid",id);
        // this.fire(id);
        return(<View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flex:1}}>
       
            <View style={{
                            padding:5,
                            width:"100%", 
                            height:150, 
                            borderRadius:5,
                           
                            flex:1
                           }}>
                <View style={{backgroundColor:'#06024f',justifyContent:'space-between',padding:3,flexDirection:'row'}}>
                    <View style={{alignItems:'center',padding:3,width:'25%',margin:5,}} >
                    <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}> Name</Text>
                    </View>
                    <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',padding:3,margin:5,}}>
                     <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}>Unit</Text>
                    </View>
                    <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',padding:3,margin:5,}}>
                     <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}>Quantity</Text>
                    </View>
                    <View style={{alignItems:'center',width:'25%',justifyContent:'space-between',paddingRight:5,}} >
                    <Text style={{fontSize:15,fontWeight:'900',color:'#ffffff'}}>Price</Text>
                    </View>
                </View>
                
                <FlatList
                    data={this.state.data} 
                    renderItem={this._renderIteam}
                    numColumns={1}  
                    ListEmptyComponent={()=>{return(<View style={{justifyContent:'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Wait List is Loading.....</Text>

                 </View>);}}              
                /> 


            

            </View>
            
           
       
       
        </View>
          )
    }
}

const Rocket =createStackNavigator({
        Home:CartList,
        Details:CartDetails,     
},{
    headerMode:'none'
});

export default class Order extends React.Component{
    render(){
        return(<View style={{flex:1}}><LogoTitle title="Shoping"/><Rocket/></View> )
    }
}