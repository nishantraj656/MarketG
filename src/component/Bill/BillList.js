import React from 'react'
import { StyleSheet,SectionList, Text, View,Button,TouchableOpacity, ImageBackground,FlatList,ActivityIndicator,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


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


export default class BillList extends React.Component{

    constructor(props){
        super(props)
        this.state={
            data:[{Key:'a'},{Key:'b'},{Key:'c'}],
            avilableItem:['rice','oil','sugar'],
            language:'',
            

        }
    }

    _renderIteam=()=>{

            return(
                <TouchableOpacity onPress={()=>{
                    alert("Button prees")
                }}>
                    <View style={{borderWidth:1,borderColor:'#0fef00',padding:5}}>
                    
                        <View style={{alignItems:'center'}} >
                        <Text style={{fontSize:20,fontWeight:'900',color:'#f70000'}}>Shop Name : Ram ji Store</Text>
                    
                        <Text>Date of Order : 12-05-1995</Text>
                        <Text>Total : 29067</Text>
                        </View>
                        

                    </View>
                </TouchableOpacity>
            )

    }

    render(){
        return(<View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flex:1}}>
            <View style={{padding:5,backgroundColor:'#aa33d6',alignItems:'center'}}>
                <Text style={{color:'#ffffff',fontSize:19,color:'#ffffff' }}>You done shoping of 250,60 on this Month </Text>

            </View>

            <ScrollView>
            <FlatList
                                data={this.state.data}
                                renderItem={this._renderIteam} 
                                ListFooterComponent={this._renderFoot}
                            />   
             </ScrollView>
       
       
        </View>
          )
    }
}