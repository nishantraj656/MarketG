import React from 'react'
import { StyleSheet,SectionList, Text, View,Button,TouchableOpacity, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '../slider/Slider';


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
            data:[{Key:'a'},{Key:'b'},{Key:'c'}],
            avilableItem:['rice','oil','sugar'],
            language:'',
            

        }
    }


        //Selected item list 
    _renderIteam=({item})=>{

        return(
            <View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flexDirection:'row'}}>
            
                <View style={styles1.contener}>
                <Image style={{width:50, height:'100%',borderRadius:5}} source={{uri:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'}}/>
                    <View style={{borderWidth:1,flex:1,borderRadius:5}}>
                       
                        <View style={{alignItems:'center',justifyContent:'center',padding:3,margin:5,}}>
                        <Text style={{fontSize:20,fontWeight:'900'}}>Name</Text>
                    </View>

                    <View style={{justifyContent:'space-around',flexDirection:'row'}}>
                        <Text style={{fontSize:15,fontWeight:'900'}}>Price:50 Rs/Kg</Text>
                        <Text style={{fontSize:15,fontWeight:'900',color:'#821b5f'}}>Weight :50 Rs/Kg</Text>
                    </View>
                    <Button title="Remove Item" color='#ef0000' onPress={()=>{alert('Item Rempve')}}/>
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
                                        <Text style={{fontSize:20,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#000656'}} >Shop Name</Text>
                                        <Text style={{fontSize:15,padding:10,fontWeight:'400',alignSelf:'center',textShadowColor:'#0815cc',color:'#560040'}} >At: UrduBzar,PO : Ammapali,Near : KaliMandir, Bhagalpur(Bihar), Pin : 813208</Text>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                        <Text style={{fontSize:20,backgroundColor:'#002d11', fontWeight:'900',alignSelf:'flex-end',paddingHorizontal:10,color:'#ffffff'}}>*3.5</Text>
                                    <Text style={{fontSize:15,fontWeight:'400',alignSelf:'center',padding:10,color:'#6d6d6d',}}>Rating : 908,56</Text>
                                    
                                        </View> 
                            <View style={{}}>
                            <Text style={{fontSize:15,padding:10,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#560040'}} >Total :</Text>
                                       
                            </View>
                    <Button title="Continue with this" onPress={()=>{alert("With This Option")}}/>
            </View>
                   
                        
        );
        
    } 

    render(){


       
        

        return(<View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flex:1}}>
       
                    <View style={{flex:0.5,}}>
                                        <Slider/>
                                        <Text style={{fontSize:20,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#000656'}} >Shop Name</Text>
                                        <Text style={{fontSize:15,padding:10,fontWeight:'400',alignSelf:'center',textShadowColor:'#0815cc',color:'#560040'}} >At: UrduBzar,PO : Ammapali,Near : KaliMandir, Bhagalpur(Bihar), Pin : 813208</Text>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
                                        <Text style={{fontSize:20,backgroundColor:'#002d11', fontWeight:'900',alignSelf:'flex-end',paddingHorizontal:10,color:'#ffffff'}}>*3.5</Text>
                                    <Text style={{fontSize:15,fontWeight:'400',alignSelf:'center',padding:10,color:'#6d6d6d',}}>Rating : 908,56</Text>
                                    
                                        </View> 
                            <View style={{}}>
                            <Text style={{fontSize:15,padding:10,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#560040'}} >Total :</Text>
                                       
                            </View>

                                    
                        </View>

            <ScrollView>

                <FlatList
                                data={this.state.data}
                                renderItem={this._renderIteam}
                               
                                
                                
                                ListFooterComponent={this._renderFoot}
                            />   

                <View style={{padding:10,backgroundColor:'#071a84'}}>
                    <Text style={{color:'#fcfcfc',fontStyle:'italic',fontSize:20,}}> Price of the same item on other shop.</Text>

                </View>

                <FlatList
                                data={this.state.data}
                                renderItem={this._renderShop}
                               
                              
                                
                                ListFooterComponent={this._renderFoot}
                            />   
            
               
            </ScrollView>
           <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#f7c927'}}>
               <Button title="Done" color="#f7c927" onPress={()=>{alert('Add to cart press')}}/>
               <Button title="Go To shop" color="#f7c927" onPress={()=>{alert('Add to cart press')}}/>
               <Button title="Cancel" color="#f7c927" onPress={()=>{alert('Add to cart press')}}/>
              
           </View>
       
       
        </View>
          )
    }
}