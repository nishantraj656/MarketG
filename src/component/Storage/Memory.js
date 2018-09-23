import {AsyncStorage} from 'react-native';

export default  class Memory{

     async  _storeData(){

        console.log('In store')
        try {
          await AsyncStorage.setItem('TASKS', 'Hello');
        } catch (error) {
          console.log("Error during set :",error)
        }
        console.log('out store')
      }


       async  _retrieveData (){
        console.log('In get')
            try {
                const value = await AsyncStorage.getItem('TASKS');
                if (value !== null) {
                    // We have data!!
                    console.log("Memory value ",value );
                    
                }
            } catch (error) {
            // Error retrieving data
            console.log("Error during get :",error)
            }
            console.log('out get')
            return value
      }
}