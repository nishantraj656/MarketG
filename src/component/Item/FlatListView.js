import React from 'react';
import { StyleSheet, Text, View,TextInput,AsyncStorage, Button,TouchableOpacity,Picker,ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import Slider from '../slider/Slider'
import { ScrollView } from 'react-native-gesture-handler';
import {createDrawerNavigator,createStackNavigator,navigationOptions,createSwitchNavigator} from 'react-navigation';
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

class ProductDetails extends React.Component{
    render(){
        return(<ItemDetails/>)
    }
}

 class ListFlats extends React.Component{



    constructor(props){
        super(props)
        this.state={
            data:[{Key:'a'},{Key:'b'},{Key:'c'}],
            avilableItem:['rice','oil','sugar'],
            language:'',
            query:this.props.query,

        }

        this.fire(2);
    }

   
             //fire command for query in database
             fire = (id) =>{
        
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
                     this.setState({"data":responseJson});
        
                    }).catch((error) => {
                        alert("updated slow network");
                        console.log(error);
                        
        
                    });           
             }
    
_storeDataForProduct = async (select) => {
                try {
                  await AsyncStorage.setItem('chooseItem', select);
                  console.log("in storage data ",select);
                  this.props.navigation.navigate('Details')
                } catch (error) {
                  // Error saving data
                  console.log("Error in store data beta ",error);
                }
              }

    _renderIteam=({item})=>{
                
        var yourBase64Icon = 'data:image/png;base64,';

        return(
            <View style={{padding:5,shadowOpacity:5,shadowColor:"#050505"}}>
            <TouchableOpacity onPress={()=>{alert("Button press"); this._storeDataForProduct("1")}}>
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
            <Button title="More Details" onPress={()=>{alert("Press on details");this._storeDataForProduct("1");}}/>
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
        </View>);
    }
} 

const Rocket =createSwitchNavigator({
    Home:ListFlats,
    
    Details:ProductDetails
})

export default class ListFlat extends React.Component{
render(){
    return <Rocket/>
}
}
