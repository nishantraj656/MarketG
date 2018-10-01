import React from 'react';
import { StyleSheet,SectionList,RefreshControl,Text,ToastAndroid, View,Button,TouchableOpacity,AsyncStorage, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import {createDrawerNavigator,Transitioner, createMaterialTopTabNavigator, createStackNavigator,createSwitchNavigator, navigation} from 'react-navigation';
import Item from './Items';
import ListFlat from './FlatListView';
import { ScrollView } from 'react-native-gesture-handler';
import ItemDetails from './ItemDetails';
import LogoTitle from '../../LogoTitle';
import Connection from '../../global/Connection';

const pls ="";
const pd ="";
const sc="";

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


    //This  show category
class SubCategory extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data:[], //suCategory data.
            id:this.props.id,
            datap:[],
            subCategoryMsg:'',
           
        } 
        sc=this; 
        this.conn=null;   
    }

    componentWillMount(){
        console.log("It will calll mount ");
      //  this._retrieveData();
      this.conn=new Connection();
      this._inslization();


     }

      //inslization 
      _inslization =async()=>{
      
        
       await this._retrieveData();
       let value =await this.conn.Query("SELECT `subcategory_id`, `category_id`, `subcategory_name` FROM `sub_category_table` where category_id="+this.state.id); // get subcategory list 
       if(value.flag){
           this.setState({data:value.data});
       }else{
           this.setState({subCategoryMsg:"List is empty...."});
       }
       
      
     }

     _searchHandle = () =>{

     }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('category');
          if (value !== null) {
            // We have data!!
          // console.log("In value return  data "+value);
            this.setState({id:value})
          // this.fire(this.state.id);
           // this.fireP(this.state.id)
          }
          else{
              console.log("Else wale ho beta ");
          }
         } catch (error) {
           // Error retrieving data
           console.log("Error he re baba ",error);
         }
      }

     //store subcategory id
      _storeData = async (select) => {
        try {
          await AsyncStorage.setItem('subcategory', select);
          console.log("in storage data value ", await AsyncStorage.getItem('subcategory'));
          this.props.navigation.navigate('Items',{Select:select});
         pls.refresh();
        } catch (error) {
          // Error saving data
          console.log("Error in store data beta ",error);
        }
      }


      
    //   _storeDataForProduct = async (select) => {
    //     try {
    //       await AsyncStorage.setItem('chooseItem', select);
    //       console.log("in storage data ",select);
    //       this.props.navigation.navigate('Details');
    //     } catch (error) {
    //       // Error saving data
    //       console.log("Error in store data beta ",error);
    //     }
    //   }

    _renderIteam=({item})=>{
                
        var yourBase64Icon = 'data:image/png;base64,'+item.subcategory_pic;

        return(
            <View style={{flex:1,}}>
                  <TouchableOpacity onPress={()=>{ this._storeData(item.subcategory_id); }} key={item.key} >
                    <View style={styles1.contener}>
                        <View style={{width: '100%', height: 100,justifyContent:'center',}}>
                            <Image style={{width: '100%', height: 100,borderRadius:5,flex:1}} source={{uri:yourBase64Icon}}/>
                        </View> 
                        <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                            <Text style={{fontSize:14,}}>{item.subcategory_name}</Text>
                        </View>

                    </View>
                    
                </TouchableOpacity>
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


                 // fire for product list
                    //fire command for query in database
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
                        alert("updated slow network");
                        console.log(error);
                        
        
                    });           
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
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this.componentWillMount}
                        />
                      }
                     >                   
                         <FlatList
                        data={this.state.data}
                        renderItem={this._renderIteam}
                        numColumns='3'
                        />

                   
                    </ScrollView>

                </View>);
    }
} 

//It will show list of avilable products of sub category products 
class ProductListScreen extends React.Component{
   
    constructor(props){
        super(props)
        this.state={
            data:[], //store product list of sub-category
            avilableItem:[],
            language:'',
            id:0,   // product ID
            subID:0, // retrive sub-category ID
        }
       pls = this;
       this.conn=null;
    }

   refresh =()=>{
        console.log("Refresh call of Productlistscreen");
      //  this._retrieveData();
      this._inslization();
    }

    componentWillMount (){
        console.log("--------------In Item List Screen --------------------------------------------")
       // this._retrieveData();
       this.conn = new Connection();
       this._inslization();
    }

    
      //inslization 
      _inslization =async()=>{
      
        
        await this._retrieveData();
        let value =await this.conn.Query("select min(product_table.price) as price ,GROUP_CONCAT(product_table.unit) as unit,product_table.p_list_id,GROUP_CONCAT(product_table.product_table_id) as productID,GROUP_CONCAT(product_table.shop_id) AS ShopID,GROUP_CONCAT(product_list_table.p_name) AS pName,GROUP_CONCAT(shop_info_table.name)  as sName from product_table INNER JOIN product_list_table on product_table.p_list_id = product_list_table.p_list_id INNER JOIN shop_info_table ON shop_info_table.user_id = product_table.shop_id WHERE product_list_table.sub_category_id = "+this.state.subID+" GROUP BY p_list_id"); // get subcategory list 
        if(value.flag){
          this.setState({data:value.data});
        //  console.log(value.data);
        }else{
          //  this.setState({subCategoryMsg:"List is empty...."});
        }
        
       
      }

    static navigationOptions = {
        // headerTitle instead of title
       title:"Shoping",
       header:null,

        };


    _retrieveData = async () => {
            try {
              let value = await AsyncStorage.getItem('subcategory');
              if (value !== null) {
                // We have data!!
                console.log("In value return  data "+value);
                this.setState({subID:value});
               // this.fire(value);
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
        
         let q = '#productID:'+pID+",ShopID:"+sID+",Quntity:"+1+',Unit:'+Unit+',Price:'+price;
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
            pd.refresh();
            this.props.navigation.navigate('Details');
           
        }catch(error){ console.log("error ",error)}
        } 

    _renderIteam=({item})=>{
            
        console.log('PRoduct list :',typeof item.ShopID);
      

        return(
            <View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flex:1}}>
            <TouchableOpacity onPress={()=>{this._storeDataForCart(item.p_list_id,item.ShopID.split(',')[0],item.unit.split(',')[0],item.price)}}>
                <View style={styles1.contener}>
                    <View style={{justifyContent:'center',alignItems:'center',flex:1,borderRadius:5}}>
                        <Image style={{width: 100, height: 100,borderRadius:5,flex:1}} source={{uri:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'}}/>
                    </View> 
                    <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,flexDirection:'row'}}>
                        <Text style={{fontSize:20,fontWeight:'900'}}>{item.pName.split(',')[0]}</Text>
                    </View>

                    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'900'}}>Price:{item.price} Rs/{item.unit}</Text>
                    </View>
                    
                   

                    <View>
                    <Text style={{fontSize:15,fontWeight:'500',color:"#720664"}}>{item.sName.split(',')[0]}</Text>
                    </View>
                    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                    <Text style={{fontSize:15,fontWeight:'900',paddingHorizontal:7,color:'#fcfcfc',backgroundColor:'#02490b'}}>*3.5</Text>
                    <Text style={{fontSize:15,fontWeight:'400',paddingHorizontal:7,color:'#878787',}}>Rating 1,657</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Button title="More Details" onPress={()=>{ this._storeDataForDetails(item.p_list_id,item.ShopID.split(',')[0]); }}/>
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

    render(){
       
        //this._retrieveData();
       // console.log("From state  ",this.state.data);
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


// It Will show the details of products add to cart 
class ProductDetails extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
            data:null, // store 
            pID:0, //productID
            sID:0 //ShopID

        }
       pd=this;
       this.conn=null;
    }

    refresh =()=>{
        this._inslization();
    }
    componentWillMount (){
        console.log('-----------------In ProductDetails  ------------------');
        this.conn = new Connection();
        this._inslization();
    }

     //inslization 
     _inslization =async()=>{
      
        
        await this._retrieveData();
        //query for product details
        let value =await this.conn.Query("SELECT product_table.*,shop_info_table.*,product_list_table.* from product_table INNER JOIN shop_info_table on product_table.shop_id = shop_info_table.shop_info_id INNER JOIN product_list_table on product_list_table.p_list_id = product_table.p_list_id WHERE product_table.product_table_id ="+this.state.pID+" AND product_table.shop_id ="+this.state.sID); // get subcategory list 
        if(value.flag){
            this.setState({data:value.data[0]});
        }else{
          //  this.setState({subCategoryMsg:"List is empty...."});
        }
        
       
      }


    _retrieveData = async () => {
        try {
          const chooseValue = await AsyncStorage.getItem('chooseItem');
          const chooseshopValue = await AsyncStorage.getItem('ShopID');
          if (chooseValue !== null && chooseshopValue !=null) {
            // We have data!!
            console.log("Chosse value data :",chooseValue);
          // this.fire(chooseValue,chooseshopValue);
          this.setState({sID:chooseshopValue,pID:chooseValue});
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

const Rocket =createMaterialTopTabNavigator({
        Home:SubCategory,
        Items:ProductListScreen,
        Details:ProductDetails
})

export default class SubCategorys extends React.Component{
    render(){
        return(<View style={{flex:1}}><LogoTitle/><Rocket/></View> )    }
}