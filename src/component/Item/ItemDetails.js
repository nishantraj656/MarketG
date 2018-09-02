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


export default class ItemDetails extends React.Component{
    render(){
        return(<View style={{padding:5,shadowOpacity:5,shadowColor:"#050505",flex:1}}>
       
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
            <ScrollView>
            <View >
                <Text>Rice is the seed of the grass species Oryza sativa (Asian rice) or Oryza glaberrima (African rice). As a cereal grain, it is the most widely consumed staple food for a large part of the world's human population, especially in Asia. It is the agricultural commodity with the third-highest worldwide production (rice, 741.5 million tonnes in 2014), after sugarcane (1.9 billion tonnes) and maize (1.0 billion tonnes).[1]


Oryza sativa with small wind-pollinated flowers
Since sizable portions of sugarcane and maize crops are used for purposes other than human consumption, rice is the most important grain with regard to human nutrition and caloric intake, providing more than one-fifth of the calories consumed worldwide by humans.[2] There are many varieties of rice and culinary preferences tend to vary regionally.


Cooked brown rice from Bhutan

Rice can come in many shapes, colors and sizes.
Rice, a monocot, is normally grown as an annual plant, although in tropical areas it can survive as a perennial and can produce a ratoon crop for up to 30 years.[3] Rice cultivation is well-suited to countries and regions with low labor costs and high rainfall, as it is labor-intensive to cultivate and requires ample water. However, rice can be grown practically anywhere, even on a steep hill or mountain area with the use of water-controlling terrace systems. Although its parent species are native to Asia and certain parts of Africa, centuries of trade and exportation have made it commonplace in many cultures worldwide.


Oryza sativa, commonly known as Asian rice
The traditional method for cultivating rice is flooding the fields while, or after, setting the young seedlings. This simple method requires sound planning and servicing of the water damming and channeling, but reduces the growth of less robust weed and pest plants that have no submerged growth state, and deters vermin. While flooding is not mandatory for the cultivation of rice, all other methods of irrigation require higher effort in weed and pest control during growth periods and a different approach for fertilizing the soil.

The name wild rice is usually used for species of the genera Zizania and Porteresia, both wild and domesticated, although the term may also be used for primitive or uncultivated varieties of Oryza.</Text>
            </View>
            </ScrollView>
           <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#f7c927'}}>
               <Button title="Add to cart" color="#f7c927" onPress={()=>{alert('Add to cart press')}}/>
               <Button title="Cancel" color="#f7c927" onPress={()=>{alert('Add to cart press')}}/>
               
           </View>
       
       
        </View>
          )
    }
}