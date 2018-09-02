import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity,Picker,ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import Slider from '../slider/Slider'
import { ScrollView } from 'react-native-gesture-handler';

const srvItems=[];

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

export default class Item extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data:[{Key:'a'},{Key:'b'},{Key:'c'}],
            avilableItem:['rice','oil','sugar'],
            language:'',
            

        }
    }

    _renderIteam=({item})=>{
                
        var yourBase64Icon = 'data:image/png;base64,';

        return(
            <View style={{padding:5,shadowOpacity:5,shadowColor:"#050505"}}>
            <TouchableOpacity onPress={()=>{alert("Button press")}}>
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
            <Button title="More Details" onPress={()=>{alert("Press on details")}}/>
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


        
        return(<View style={{flex:1,width:'100%'}}>
                
                <ScrollView>
                         
                        <View style={{flex:0.5,}}>
                        <Slider/>
                        <Text style={{fontSize:20,fontWeight:'900',alignSelf:'center',textShadowColor:'#0815cc',color:'#000656'}} >Shop Name</Text>
                        <Text style={{fontSize:15,padding:10,fontWeight:'400',alignSelf:'center',textShadowColor:'#0815cc',color:'#560040'}} >At: UrduBzar,PO : Ammapali,Near : KaliMandir, Bhagalpur(Bihar), Pin : 813208</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                        <Text style={{fontSize:20,backgroundColor:'#002d11', fontWeight:'900',alignSelf:'flex-end',paddingHorizontal:10,color:'#ffffff'}}>*3.5</Text>
                       <Text style={{fontSize:15,fontWeight:'400',alignSelf:'center',padding:10,color:'#6d6d6d',}}>Rating : 908,56</Text>
                       
                        </View> 
                       
                        <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',backgroundColor:'#8af91b'}}>
                            <Text style={{paddingLeft:15,fontSize:20}}>Select Item</Text>
                            <Picker

                            selectedValue={this.state.language}
                            style={{paddingLeft:10, height: 50, width: 150,fontSize:20 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                            {srvItems}                        
                            </Picker>
                        </View>
                        <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',backgroundColor:'#8af91b'}}>
                            <Text style={{paddingLeft:15,fontSize:15}}>Enter Weight</Text>
                            <TextInput placeholder="Enter Weight"/>
                            <Picker

                            selectedValue={this.state.language}
                            style={{paddingLeft:10, height: 50, width: 150,fontSize:20 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                            <Picker.Item label="Rs/Kg" value='Kg' />                        
                            </Picker>
                        </View>
                        
                       
                        </View>

                        <FlatList
                                data={this.state.data}
                                renderItem={this._renderIteam}
                               
                                numColumns={2}
                                
                                ListFooterComponent={this._renderFoot}
                            />   
                </ScrollView>
        </View>)
    }
} 