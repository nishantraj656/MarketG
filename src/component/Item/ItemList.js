import React from 'react';
import { StyleSheet,SectionList, Text, View,Button,TouchableOpacity, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import {createDrawerNavigator,createStackNavigator} from 'react-navigation';


//css flatlist
const styles1=StyleSheet.create({
    contener:{
           
              flex:1,
             // backgroundColor:'#fceff8', 
              padding:5,
              width:"100%",  
              borderRadius:1,
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

export default class ItemList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data:[{Key:'1'},{Key:'2'},{Key:'3'}],
        }
    }

    _renderIteam=({item})=>{
                
        console.log('Section list ',);

        return(
            <TouchableOpacity onPress={()=>{alert("Button press");}} key={item.key} >
                <View style={styles1.contener}>
                    <View style={{borderWidth:1,flex:1,borderRadius:5}}>
                        <Image style={{width: '100%', height: 150,borderRadius:5,flex:1}} source={{uri:item.img}}/>
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
        return(<View style={{flex:1,width:'100%'}}>
            
             <SectionList
          sections={[ ]}
          renderItem={this._renderIteam}
          renderSectionHeader={({section: {title}}) => (
              <View style={{flex:1,backgroundColor:'#edd363',justifyContent:'space-around',flexDirection:'row',padding:5}}>
                    <Text style={{fontWeight: 'bold',fontSize:20,color:'#000a1c'}}>{title}</Text>
                    <TouchableOpacity>
                        <Text style={{color:"#49b4e5",fontSize:20}}>View All</Text>
                    </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />  
        </View>)
    }
} 