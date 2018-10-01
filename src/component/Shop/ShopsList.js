import React from 'react';
import { StyleSheet,SectionList,RefreshControl,Text,ToastAndroid, View,Button,TouchableOpacity,AsyncStorage, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import {createDrawerNavigator,createMaterialTopTabNavigator, createStackNavigator,createSwitchNavigator, navigation} from 'react-navigation';


import { ScrollView } from 'react-native-gesture-handler';
import LogoTitle from '../../LogoTitle';
import Connection from '../../global/Connection';

const sl =" ";
const ps = "";
const spd = "";
const sd ="";

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


    //This  show List of avilable shops 
class ShopsList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data:[],
            id:this.props.id,
            datap:[],
            refreshing:false,
        } 
        sl=this;   
    }

    refresh(){
        this._retrieveData();
    }
    componentWillMount(){
        console.log("It will calll mount ");
        this._retrieveData();
     }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('category');
          if (value !== null) {
            // We have data!!
            console.log("In value return  data "+value);
           
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


      //store shopID 
      _storeData = async (select) => {
        try {
          await AsyncStorage.setItem('ShopID', select);
          console.log("in storage data ",select);
          ps.refresh();
          sd.refresh();

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

    _renderIteam=({item})=>{
                
        var yourBase64Icon = 'data:image/png;base64,'+item.subcategory_pic;

        return(
            <View style={{flex:1,}}>
                  <TouchableOpacity onPress={()=>{ this._storeData(item.shop_info_id);     this.props.navigation.navigate('Items');}} key={item.key} >
                    <View style={{  flex:1,
                                        backgroundColor:'#f2d56d', 
                                        padding:5,
                                        width:"100%", 
                                        height:150, 
                                        borderRadius:5,
                                        borderWidth:1,}}>
                        <View style={{width: '100%', height: 100,justifyContent:'center',}}>
                            <Image style={{width: '100%', height: 100,borderRadius:5,flex:1}} source={{uri:yourBase64Icon}}/>
                        </View> 
                        <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                            <Text style={{fontSize:20,fontWeight:'600'}}>{item.name}</Text>
                        </View>

                    </View>
                    
                </TouchableOpacity>
                <Button title="Details" onPress={()=>{this._storeData(item.shop_info_id);     this.props.navigation.navigate('ShopsDetails');  }}/>
            </View>           
                        
        );
        
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

            //fire command for query in database
    fire = () =>{
        
                    this.setState({refreshing: true});
                    let sql = "SELECT * from shop_info_table";
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
                      // alert("data update");
                         this.setState({data:responseJson});
                         this.setState({refreshing:false})
            
                        }).catch((error) => {
                            alert("updated slow network");
                            console.log(error);
                            this.setState({refreshing:false})
            
            
                        });           
                 }


                 //Product list show data
    _renderIteamList=({item})=>{
                
                    var yourBase64Icon = 'data:image/png;base64,';
            
                    return(
                        <View style={{padding:5,shadowOpacity:5,shadowColor:"#050505"}}>
                        <TouchableOpacity onPress={()=>{ this._storeDataForProduct("1")}}>
                            <View style={styles1.contener}>
                                <View style={{borderWidth:1,flex:1,borderRadius:5}}>
                                    <Image style={{width: '100%', height: 150,borderRadius:5,flex:1}} source={{uri:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'}}/>
                                </View> 
                                <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                                    <Text style={{fontSize:20,fontWeight:'900'}}>Name</Text>
                                </View>
            
                                <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                                <Text style={{fontSize:15,fontWeight:'900'}}>Price:50 Rs/Kg</Text>
                                <Text style={{textDecorationLine:"line-through",color:'red'}}>80 Rs/Kg</Text>
                                </View>
                                
                               
            
                                <View>
                                <Text style={{fontSize:15,fontWeight:'500',color:"#720664"}}>Shop Name</Text>
                                </View>
                                <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                                <Text style={{fontSize:15,fontWeight:'900',paddingHorizontal:7,color:'#fcfcfc',backgroundColor:'#02490b'}}>*3.5</Text>
                                <Text style={{fontSize:15,fontWeight:'400',paddingHorizontal:7,color:'#878787',}}>Rating 1,657</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Button title="More Details" onPress={()=>{this._storeDataForProduct("1");}}/>
                        </View>
                               
                                    
                    );
                    
                }  
        

    render(){
    
        return(<View style={{width:'100%',flex:1,padding:10,}}>
                    <ScrollView
                    
                      
                    >                   
                         <FlatList
                            data={this.state.data}
                            renderItem={this._renderIteam}
                            keyExtractor = {items => items.shop_info_id}
                            ListEmptyComponent={()=>{return(<View style={{justifyContent:'center'}}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text>Wait List is Loading.....</Text>

                         </View>);}}        
                            numColumns='1'
                            />

                        <View style={{paddingTop:10}}>
                          
                        </View>
                    </ScrollView>

                </View>);
    }
} 

    //It will show list of  avilabe products on tha shop 
class ProductsOfShops extends React.Component{
   
    constructor(props){
        super(props)
        this.state={
            data:[],
            avilableItem:[],
            language:'',
            id:0,
        }
        ps=this;
    }

    refresh(){
        this._retrieveShopID();
    }

    componentWillMount(){
        console.log(" In productofshops  compountmount ");
        this._retrieveShopID();
    }
    static navigationOptions = {
        // headerTitle instead of title
       title:"Shoping",
       header:null,

        };


            // This will retrive shopID and show list of products
    _retrieveShopID = async () => {
            try {
              const value = await AsyncStorage.getItem('ShopID');
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


           // It will add the list to the cart with item number 
     _storeDataForCart = async (pID,sID,Unit,price) => {
        try {

         // await AsyncStorage.removeItem('List');
          
        let data =await AsyncStorage.getItem('List');

      
        const chooseValue = await AsyncStorage.getItem('chooseItem'); 
        
         let q = '#productID:'+pID+",ShopID:"+sID+",Quntity:"+1+',Unit:'+Unit+",Price:"+price;
        console.log(q);
        data =data+ q;

        const id = await AsyncStorage.getItem('ItemInCart');
        const l = parseInt(id,10)+1;
        await AsyncStorage.setItem('ItemInCart',l.toString());
      await AsyncStorage.setItem('List',data);
      // await AsyncStorage.mergeItem('List', JSON.stringify(UID123_del));

        console.log(":Items in cart  :"+await AsyncStorage.getItem('List'));
        ToastAndroid.show('Add to cart !', ToastAndroid.SHORT);

        
        } catch (error) {
        // Error saving data
        console.log("Error in store data beta ",error);
        }
    }

     //store data value for chosse product and shop
     _storeDataForDetails = async (pID,sID) =>{
        try{
             await AsyncStorage.setItem("chooseItem",pID);
            await AsyncStorage.setItem('ShopID',sID);
            spd.refresh();
            this.props.navigation.navigate('Details');
           
        }catch(error){ console.log("error ",error)}
        } 

          // for shop product list data 
    _renderIteam=({item})=>{
                
        var yourBase64Icon = 'data:image/png;base64,';

        return(
            <View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flex:1}}>
            <TouchableOpacity onPress={()=>{this._storeDataForCart(item.product_table_id,item.shop_id,item.unit,item.price)}}>
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
            <Button title="More Details" onPress={()=>{this._storeDataForDetails(item.product_table_id,item.shop_id);}}/>
            </View>
                   
                        
        );
        
    }  


             //fire command for query in database
    fire = (id) =>{
        
            console.log("Id Return "+id);
               let sql = "SELECT product_table.shop_id,product_table.product_table_id,product_table.price,product_table.unit,product_list_table.p_name,product_list_table.pic_1  FROM `product_table` INNER JOIN  product_list_table ON product_table.p_list_id = product_list_table.p_list_id where shop_id ="+id;
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
                                ListEmptyComponent={()=>{return(<View style={{justifyContent:'center'}}>
                                <ActivityIndicator size="large" color="#0000ff" />
                                <Text>Wait List is Loading.....</Text>

                             </View>);}}
                                ListFooterComponent={this._renderFoot}
                            />   
          </ScrollView>      
        </View>
        )
    }
}


    // It Will show the details of products add to cart 
class ShopProductDetails extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
       spd=this;
    }

    refresh =()=>{
        this._retrieveData();
    }
    componentWillMount (){
        console.log('-----------------In ProductDetails  ------------------');
        this._retrieveData();
    }
      
        //fire command for query in database
    fire = (pID,sID) =>{
        
        //console.log("Id Return "+id);
       let sql = "SELECT product_table.*,shop_info_table.*,product_list_table.* from product_table INNER JOIN shop_info_table on product_table.shop_id = shop_info_table.shop_info_id INNER JOIN product_list_table on product_list_table.p_list_id = product_table.p_list_id WHERE product_table.product_table_id ="+pID+" AND product_table.shop_id ="+sID;
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
              // console.log("FlatList Value",responseJson);
               
          //  alert("data update");
             this.setState({data:responseJson[0]});
             console.log(this.state.data);

            }).catch((error) => {
                alert("updated slow network");
                console.log(error);
                

            });            
         }



    _retrieveData = async () => {
        try {
          const chooseValue = await AsyncStorage.getItem('chooseItem');
          const chooseshopValue = await AsyncStorage.getItem('ShopID');
          if (chooseValue !== null && chooseshopValue !=null) {
            // We have data!!
            console.log("#####Chosse value data :",chooseValue);
           this.fire(chooseValue,chooseshopValue);
          }
          else{
              console.log("Note find value ");
              //this.fire(0,0);
          }
         } catch (error) {
           // Error retrieving data
           console.log("Error he itemDetails me ",error);
         }
      }


      // It will add the list to the cart with item number 
      _storeDataForCart = async () => {
                try {

                 // await AsyncStorage.removeItem('List');
                  
                let data =await AsyncStorage.getItem('List');

              
                const chooseValue = await AsyncStorage.getItem('chooseItem'); 
                
                 let q = '#productID:'+chooseValue+",ShopID:"+this.state.data.shop_id+",Quntity:"+1+',Unit:'+this.state.data.unit+",Price:"+this.state.data.price;
                console.log(q);
                data =data+ q;

                const id = await AsyncStorage.getItem('ItemInCart');
                const l = parseInt(id,10)+1;
                await AsyncStorage.setItem('ItemInCart',l.toString());
              await AsyncStorage.setItem('List',data);
              // await AsyncStorage.mergeItem('List', JSON.stringify(UID123_del));
 
                console.log(":Items in cart  :"+await AsyncStorage.getItem('List'));
                ToastAndroid.show('Add to cart !', ToastAndroid.SHORT);

                
                } catch (error) {
                // Error saving data
                console.log("Error in store data beta ",error);
                }
            }


    render(){
            if(this.state.data == null){ return(<View></View>)}
            else
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
               <Button title="Add to cart" color="#f7c927" onPress={()=>{ this._storeDataForCart();}}/>
               <Button title="Cancel" color="#f7c927" onPress={()=>{this.props.navigation.goBack(); }}/>
               
           </View>
       
       
        </View>
                 )
    }
}

    // It will show the shop details 
class ShopsDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            shopID:0
        }
        sd=this;
        this.conn = null;
    }

    
    refresh(){
        this._inslization();
    }

        //
    componentWillMount(){
        this.conn= new Connection();
        this._inslization();
    }

    _inslization =async()=>{
      
        
        await this._retrieveShopID();
        let value =await this.conn.Query("SELECT * FROM `shop_info_table` where shop_info_id ="+this.state.shopID); // get subcategory list 
        if(value.flag){
            this.setState({data:value.data});
            console.log("In shop details value >>>>>>><<<<<<:",this.state.data);
            
        }else{
          //  this.setState({subCategoryMsg:"List is empty...."});
        }
        
       
      }
    
    _retrieveShopID = async () => {
        try {
          const value = await AsyncStorage.getItem('ShopID');
          if (value !== null) {
            // We have data!!
            console.log("ShopID Select in shop details class : "+value);
            this.setState({shopID:value});

           // this.fire(value);
           
          }
          else{
              console.log("Else wale ho beta ");
          }
         } catch (error) {
           // Error retrieving data
           console.log("Error he re baba :::",error);
         }
      }

      
    /**            //fire command for shop Details
    fireP = (id) =>{
        
                    console.log("Id Return "+id);
                    //let sql = "SELECT * FROM `sub_category_table` where category_id="+id;
                    let sql = this.state.query;
                    console.log("FlatList : ",sql);
    
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
                           console.log('Home update');
                      //  alert("data update");
                         this.setState({datap:responseJson});

                        }).catch((error) => {
                            alert("error slow network");
                            console.log(error);
                        });           
                 }
    */
    
    render(){

        if(this.state.data ==null)
         return(<View>{console.log("Hello htis iss jnsfk jfijdiosj fpjs")}</View>);
        else
            return(<View>
                        <View><Text>{console.log("maksjdfp johfoieuwyotrnknfhdsohyaifhnfhoauifr79847975 jfhoshhn",this.state.data.name)}</Text></View>
            </View> )
    }
}

const Rocket =createMaterialTopTabNavigator({
        Home:ShopsList,
        Items:ProductsOfShops,
        Details:ShopProductDetails,
        ShopsDetails:ShopsDetails,
})

export default class Shops extends React.Component{
    render(){
        return(<View style={{flex:1}}><LogoTitle title="Shoping"/><Rocket/></View> )
    }
}