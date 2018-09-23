import React from 'react'
import { StyleSheet,ToastAndroid,AsyncStorage,RefreshControl, Text, View,Button,TouchableOpacity, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '../slider/Slider';
import LogoTitle from '../../LogoTitle';


//css flatlist
const styles1=StyleSheet.create({
    conteners:{
           
              flex:1,
              backgroundColor:'#fceff8', 
              padding:5,
              width:"100%",  
              borderRadius:1,
              borderColor: '#f4f4f4',
              borderWidth:1,
              
                      
      },
      contener:{
           
        flex:1,
        backgroundColor:'#fceff8', 
        padding:5,
        width:"100%",  
        borderRadius:1,
        borderColor: '#f4f4f4',
        borderWidth:1,
        flexDirection: 'row',
                
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


export default class CartDetails extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data:[],  //keep shop id,price,productID fetech from server
            avilableItem:[], //it keep all the item data of selected shop 
            language:'',
            datashop:null, //
            sumvalue:'0', //total price of selected shop
            fullData:[], // all data of cart with thre shop id
            avilableShop:[],    // list of left shop from where we can alos get item 
            selectedShopID:'',  // id of current selected shop  
            userID:'1', //user id   
            cartID:'0', //cart id   
            shopID:'1', //shopID
            process:false,  
            refreshing:false,
            isEmpty:"Wait List is Loading.....", //message to show while loading 
            cartItem:0, //No. of item in cart
          
            
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

        //It will refresh the 
    refresh =async()=>{
        try{
            ToastAndroid.show('Wait in process !', ToastAndroid.SHORT);

              await  this._inslization();
              await this.queryPrepare();
              ToastAndroid.show('Process is complete !', ToastAndroid.SHORT);

         
        }catch(error){
            console.log(error);
          //  ToastAndroid.show('Somthing going wrong !', ToastAndroid.SHORT);

        }
      this.render();
    }

  async  componentWillMount(){
      try{
         
       
            await  this._inslization();
            await this.queryPrepare();
      
      }catch(error){
          console.log(error);
      }
     
    }

    queryPrepare = async () => {
        let shopid = await AsyncStorage.getItem('ShopID');
        console.log("/////////////////////////////////////////");
        let quer1 ='select product_table.*,product_list_table.pic_1,product_list_table.p_name,product_list_table.manufacture_id from product_table INNER join product_list_table on product_table.p_list_id = product_list_table.p_list_id  where ( '
        let quer2 = null;
        let quer3 = ') AND shop_id =' + shopid;
        let fullAray =[];
      

      await  this.fireshop(shopid);
        let cart = await AsyncStorage.getItem('List');
        
        if(cart==null)
            return;
            
        console.log("Cart value asked ",cart);
        let firstSplit = await cart.split('#');
     
        if(firstSplit.length == 0){
            return;
        }
    await  firstSplit.forEach(function(element){
        let obj={};

            //console.log("<<<<<<",element);

            let secondSplit = element.split(',');
        secondSplit.forEach(function(element2){
            //  console.log('<.....,.....>',element2)
            let p1= element2.split(':');
               
            //  console.log("-----",p1[0]);
            //  console.log("::::",p1[1]);
            //  console.log(" ");
                if(quer2===null){
                    if('productID'===p1[0])
                     quer2 = 'product_table_id ='+p1[1];
                    
                }
                else{
                    if('productID'===p1[0])
                    quer2 = quer2 + ' OR product_table_id = '+p1[1]
                }

                if('ShopID'===p1[0])
                    obj['ShopID']=p1[1];
                else if('productID'===p1[0])
                    obj['productID']=p1[1];
                else if('Quntity'===p1[0])
                    obj['Quntity']=p1[1];
                else if('Unit'===p1[0])
                    obj['Unit']=p1[1];
                else if('Price'===p1[0])
                    obj['Price']=p1[1];
               

            })
            fullAray.push(obj);
        })
      
       // console.log("Full data ",fullAray);
       await this.dublicateControl(fullAray);
     
        // console.log("Full Query : "+quer1+quer2+quer3);
        console.log("Full data array .............: ",fullAray);
     
       await this.fire(quer1+quer2+quer3);
        await  this.calculate();
    }
    
    // Remove dublicate data
    dublicateControl = async(fullArray) =>{
                let freshArray=[];
                

                fullArray.forEach(function(element){
                    console.log(element.productID);
                    let flag=0;
                    freshArray.forEach(function(element2){
                        console.log(element2.productID);
                        if(element.productID == element2.productID){
                            flag=1;
                            element2.Quntity = (parseInt(element2.Quntity,10) + parseInt(element.Quntity,10)).toString();
                       }
                    });
                    if(flag == 0){
                        freshArray.push(element);
                    }

                });
                console.log("In dublicate fresh array ",freshArray);
                await this.setState({fullData:freshArray});

    }

        // 
    _inslization = async ()=>{
        try{
            let shopID=await AsyncStorage.getItem('ShopID');
            await this.setState({selectedShopID:shopID});
            this.FireForRemaningShop();
           
        }catch(error){
            //error part
            console.log("Error in add cart ",error);
            
        }    
    }


              //fire command for query in database for 
    fire =async (query) =>{
        
              
              await  fetch('http://biharilegends.com/biharilegends.com/market_go/run_query.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                }) 
                }).then((response) => response.json())
                    .then((responseJson) => {
                     console.log("On items :::::::::: ",responseJson);
                   
                     this.setState({data:responseJson});
                     console.log(">>>>>>>>>>>>>>>>",this.state.data);
                     
                    }).catch((error) => {
                        alert("updated slow network");
                        console.log(error);
                        
        
                    });           
             }

              //fire command for query in database for current selected shop
    fireshop =async (shopID) =>{
                
                let query = "SELECT shop_info_table.*,customer_info_table.* FROM `shop_info_table` INNER JOIN customer_info_table ON shop_info_table.user_id = customer_info_table.user_id WHERE shop_info_table.shop_info_id = "+shopID;
                console.log("Shop Query :",query);
                await  fetch('http://biharilegends.com/biharilegends.com/market_go/run_query.php', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      query: query,
                  }) 
                  }).then((response) => response.json())
                      .then((responseJson) => {
                       console.log("On shop ",responseJson);
                     
                       this.setState({datashop:responseJson});
                      
                           this.setState({isEmpty:"List is empty...."});
                       
                       
                      }).catch((error) => {
                          alert("updated slow network");
                          console.log(error);
                          
          
                      });           
               }

               //It will get remaning shop id value
    FireForRemaningShop =async () =>{
                    this.setState({refreshing:true});
                    let query = "select * from shop_info_table where shop_info_id != "+this.state.selectedShopID;
                    console.log("Shop Query :",query);
                    await  fetch('http://biharilegends.com/biharilegends.com/market_go/run_query.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: query,
                    }) 
                    }).then((response) => response.json())
                        .then((responseJson) => {
                        console.log("On Left shop  ",responseJson);
                        
                        this.setState({avilableShop:responseJson});
                        this.setState({refreshing:false});
                        this.setState({isEmpty:"List is empty"});
                        }).catch((error) => {
                            alert("updated slow network");
                            console.log(error);
                            this.setState({refreshing:false});
            
                        });           
                }
        // fire for CartID 
    firecartID =async (query) =>{
            
                this.setState({refreshing:true});
                console.log(query);  
                await  fetch('http://biharilegends.com/biharilegends.com/market_go/run_query.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                }) 
                }).then((response) => response.json())
                    .then((responseJson) => {
                    console.log("On Cart Value "+ typeof responseJson[0].m);
                        this.setState({cartID:responseJson[0].m});
                        this.setState({refreshing:false});
                        
                        return responseJson[0].m;
                    
                    }).catch((error) => {
                        alert("updated slow network");
                        console.log(error);
                        this.setState({refreshing:false});
        
                    });           
            }  
            
            //fire insert query
    fireInsert =async (query) =>{

        let flag ='N';
                console.log(query);
                await  fetch('http://biharilegends.com/biharilegends.com/market_go/run_query.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                }) 
                }).then((response) => response.json())
                    .then((responseJson) => {
                    
                    
                   // alert("Insert");
                   // console.log("In insert data ",responseJson[0]);
                   responseJson[0] =='Y' ? flag=1 :flag=0;

               }).catch((error) => {
                        alert("updated slow network");
                        console.log(error);
                        this.state({process:false});
                        
        
                    }); 
                    return(flag);            
            }  
    
        //Selected item list 
    _renderIteam=({item})=>{

        return(
            <View style={{padding:0,shadowOpacity:5,shadowColor:"#050505",flexDirection:'row'}}>
            
                <View style={{ flex:1,
                                    backgroundColor:'#fceff8', 
                                    padding:0,
                                    width:"100%",  
                                    borderBottomWidth:1,
                                    borderColor: '#000000',
                                   
                                    flexDirection: 'row',}}>
                     <View style={{flex:1,borderRadius:5}}>
                       
                        <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,}}>
                        <Text style={{fontSize:20,fontWeight:'900'}}>{item.Pname}</Text>
                    </View>

                    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                        <Text style={{fontSize:15,fontWeight:'900'}}>Price:{item.Price} Rs/{item.Unit}</Text>
                        <Text style={{fontSize:15,fontWeight:'900',color:'#821b5f'}}>Weight :{item.Quntity} {item.Unit}</Text>
                    </View>
                     </View> 
                     
                </View>
               
           
            </View>
                   
                        
        );
        
    } 

        //Related shop price 
      
    _renderShop=({item})=>{
                
        var yourBase64Icon = 'data:image/png;base64,';

        return(
            <View style={{padding:5,shadowOpacity:5,shadowColor:"#050505"}}>
                                        <Text style={{fontSize:20,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#000656'}} >{item.name}</Text>
                                        <Text style={{fontSize:15,padding:10,fontWeight:'400',alignSelf:'center',textShadowColor:'#0815cc',color:'#560040'}} >At: UrduBzar,PO : Ammapali,Near : KaliMandir, Bhagalpur(Bihar), Pin : 813208</Text>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                        <Text style={{fontSize:20,backgroundColor:'#002d11', fontWeight:'900',alignSelf:'flex-end',paddingHorizontal:10,color:'#ffffff'}}>*3.5</Text>
                                    <Text style={{fontSize:15,fontWeight:'400',alignSelf:'center',padding:10,color:'#6d6d6d',}}>Rating : 908,56</Text>
                                    
                                        </View> 
                            <View style={{}}>
                                       
                            </View>
                    <Button title="Continue with this" onPress={()=>{AsyncStorage.setItem('ShopID',item.shop_info_id);this.refresh();}}/>
            </View>
                   
                        
        );
        
    } 

    //done thish will place order
    DoneButton= async()=>{

        this.setState({process:true});
    
    let userID = await AsyncStorage.getItem('userID');
    
    let shopID = this.state.selectedShopID;
    let cinsert = "INSERT INTO `cart_lot_table`(customer_info_id,offer_amt,paid_amt,total_price,shop_info_id) VALUES ("+userID+',0,0,'+this.state.sumvalue+','+shopID+');';
        // if(!this.fireInsert(cinsert)){
        //     return;
        // }
        if(!await this.fireInsert(cinsert)){
            
            alert("Order fail check internet connection and retry");
            this.setState({process:false})
             return;
         }
     await this.firecartID('SELECT MAX(cart_lot_no) as m from cart_lot_table where `customer_info_id`='+userID);
      let cartID =this.state.cartID;
      let fullQuery ='';

      

   //   console.log("Cart Id",this.state.avilableItem);
     await this.state.avilableItem.forEach(function(element){
          let q1= " INSERT INTO `order_table`(`custumber_id`, `product_list_id`, `cart_lot_no_id`,`order_status`,`quantity`,oPrice) VALUES( "
        let q2 = userID+","+element.productID+","+cartID+",0,"+element.Quntity+","+element.Price+" ); ";
        fullQuery = fullQuery + q1+q2;
        });

       //console.log("Full query :"+fullQuery);
    
    if(!await this.fireInsert(fullQuery)){
        alert("Order fail check internet connection and retry");
        this.setState({process:false})
         return;
     }
     else{
        alert("Your order successfully sent to the shopkeeper collect it ……");
        await AsyncStorage.setItem('ItemInCart', '0');
        await AsyncStorage.setItem('List',"");
        this.setState({avilableItem:[]});
        this.refresh();
        this.setState({process:false}); 
     }
    }

    //it will calculate the price of avilable product
    calculate = async()=>{
           // console.log("In calculate");
            let price = 0;
            let array = this.state.fullData;
            let array2 = this.state.data;
            let shopID = await AsyncStorage.getItem('ShopID');
            let avilableArray =[];

            // console.log("Full array ",array);
            // console.log("Array 2 data ",array2);

            array2.forEach(function(element){ 
                // console.log('-------',element);
                array.forEach(function(element2){
                 //    console.log('>>>>>>>',element2);
                if(element.product_table_id == element2.productID && element2.ShopID == shopID){
                    let ele =element2;
                  //  console.log("In element 2 :", element.product_table_id);
                   price = price + element2.Price * element2.Quntity;
                   ele.Price = element2.Price * element2.Quntity;
                   ele["Pname"] = element.p_name;
                  
                   avilableArray.push(ele);
                }

                });
                 
              
             });
            // console.log("Total price of the product ",price);
             this.setState({sumvalue:price});
             this.setState({avilableItem:avilableArray});
            // console.log("/////--------------",this.state.avilableItem);
        }

    render(){
        
      return(<View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flex:1}}>
                    <LogoTitle title="Cart"/>
                    <ScrollView
                   
                     
                    >
                    <View style={{flex:0.5,backgroundColor:"#ffe8a0",marginBottom:5}}>
                                        <Text style={{fontSize:20,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#000656'}} >{this.state.datashop !=null? this.state.datashop.name :"There is no data" }</Text>
                                        <Text style={{fontSize:15,padding:10,fontWeight:'400',alignSelf:'center',textShadowColor:'#0815cc',color:'#560040'}} >At: UrduBzar,PO : Ammapali,Near : KaliMandir, Bhagalpur(Bihar), Pin : 813208</Text>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                        <Text style={{fontSize:20,backgroundColor:'#002d11', fontWeight:'900',alignSelf:'flex-end',paddingHorizontal:10,color:'#ffffff'}}>*3.5</Text>
                                    <Text style={{fontSize:15,fontWeight:'400',alignSelf:'center',padding:10,color:'#6d6d6d',}}>Rating : 908,56</Text>
                                    
                                        </View> 
                            <View style={{}}>
                            <Text style={{fontSize:15,padding:10,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#560040'}} >Total : {this.state.sumvalue}</Text>
                                       
                            </View>

                                    
                        </View>

            

                <FlatList
                                data={this.state.avilableItem}
                                renderItem={this._renderIteam}
                                ListFooterComponent={this._renderFoot}
                                keyExtractor = {(item)=>{item.productID}}
                                ListEmptyComponent={()=>{
                                    if(this.state.isEmpty =='Wait List is Loading.....')
                                     return(<View style={{justifyContent:'center'}}>
                                            <ActivityIndicator size="large" color="#0000ff" />
                                            <Text>{this.state.isEmpty}</Text>
    
                                        </View>);
                                    else
                                    return(<View style={{justifyContent:'center'}}>
                                            <Text>{this.state.isEmpty}</Text>
    
                                            </View>)}}
                            />   

                <View style={{padding:10,backgroundColor:'#071a84',marginTop:10}}>
                    <Text style={{color:'#fcfcfc',fontStyle:'italic',fontSize:20,}}> Price of the same item on other shop.</Text>

                </View>

                <FlatList
                                data={this.state.avilableShop}
                                renderItem={this._renderShop}
                               
                              
                                
                                ListFooterComponent={this._renderFoot}
                                ListEmptyComponent={()=>{
                                if(this.state.isEmpty =='Wait List is Loading.....')
                                 return(<View style={{justifyContent:'center'}}>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                        <Text>{this.state.isEmpty}</Text>

                                    </View>);
                                else
                                return(<View style={{justifyContent:'center'}}>
                                        <Text>{this.state.isEmpty}</Text>

                                        </View>)}}
                            />   
            
               
            </ScrollView>
           <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#f7c927'}}>
           {!this.state.process ?  <Button title="Done" color="#f7c927" onPress={()=>{this.DoneButton()}}/> : <ActivityIndicator size="large" color="#0000ff" />}

            <Button title="Refresh" onPress={()=>{this.refresh(); }}/>
               
           </View>
       
       
        </View>
          )
    }
}