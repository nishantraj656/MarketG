//import { log } from "util";
//import {ToastAndroid} from 'react-native';
export default class Connection {

    constructor(){
       
        this.state={

        }

       //alert('Connection class in js');

    }

    //fire class 
    //fire command for query in database for current selected shop
  fireshop =async (query) =>{
      let value ={flag:false,
                  data:[]
                };
            
   // let query = "SELECT shop_info_table.*,customer_info_table.* FROM `shop_info_table` INNER JOIN customer_info_table ON shop_info_table.user_id = customer_info_table.user_id WHERE shop_info_table.shop_info_id = "+shopID;
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
             
            value.flag=true;
            value.data = responseJson;
          console.log("On shop ", typeof value);
          
        }).catch((error) => {
              
            //  alert("updated slow network");
           console.log( error.message);
          // log.error({error:err})
              value.flag=false;
              value.data = "Network request failed" ==error.message?  "Check internet connection":error;

          }); 
          
        return value;
   }

   //Error alert message
   logFn =(error,msg)=>{
    console.log( error);
    ToastAndroid.show(msg, ToastAndroid.LONG);
   }
}