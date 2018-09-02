import React from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';

const sliderCSS = StyleSheet.create({
        container:{
                    flex:1,
                },
    subContainer:{
                    
                },
    
})

export default class Slider extends React.Component {
   
    constructor(props){
        super(props);
        this.state={
            img:['https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg','https://agriculturewire.com/wp-content/uploads/2018/08/soybean-plants-growing-in-minnesota-crop-850x567-413f5-768x513.jpg','https://agriculturewire.com/wp-content/uploads/2013/12/wheat-1.jpg','https://agriculturewire.com/wp-content/uploads/2016/04/grain-e1460492904924.jpg'],
            currentImg:'https://agriculturewire.com/wp-content/uploads/2015/07/rice-1024x768.jpg'
        }

            let i=0;


            // Toggle the state every second
    setInterval(() => {
        if(i>this.state.img.length-1)
            i=0;
        console.log(this.state.img[i]);

        this.setState({currentImg:this.state.img[i]})
        i++;
        
      }, 2000);
    }
 
     
     
     
    
  render() {
       

   
    return (
                <View style={{borderWidth:1,borderColor:'#000000',flex:1}}>
                    <ImageBackground
                        style={{width: '100%', height: '100%',}}
                        source={{uri: this.state.currentImg}}
                        >
                        
                    </ImageBackground>
                </View>
    );
  }
}
