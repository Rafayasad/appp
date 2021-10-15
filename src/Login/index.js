import { typeAlias } from '@babel/types';
import React , {useState , useEffect} from 'react';
import {Text,Alert, SafeAreaView, View , Image, ScrollView} from 'react-native';
import { Button , Searchbar,List ,ActivityIndicator,Colors,TextInput } from 'react-native-paper';
// import { Item } from 'react-native-paper/lib/typescript/components/List/List';
export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    // const credentials = { email: "abc@email.com", password: "mustafa" }
    // const credentials = { email: "", password: "" }
    const [credentails,setCredentails] = useState({
        email:"",
        password:"",
    })
    const [driverRes,setDriverRes] = useState("")

    const [token, setToken] = React.useState("");
    const [driverData,setDriverData] = useState(null)
    const [loading,setLoading] = useState(false);
    const [animating,setAnimating] = useState(true);

    const closeActivity = () =>{
        setTimeout(() => {
            animating=false
        }, 10000);
    }

    const isLogin =()=>{
        setCredentails({email,password})
        // if(!credentails){
        //     setError('invalid');
        // }
        // else{
        //     navigation.navigate('Home');
        // }
        const res = driverRes === 'success' ? navigation.navigate('Home') : setError('invalid')
        return res
     }
// useEffect(()=>{


(async function (){

    await fetch("https://nodebackend2.herokuapp.com/login/driver", {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(credentails)
    })
    
    .then((response) => response.json())
    
    .then((response) => {
            console.log('creee',credentails);
            console.log('rsrs',response)
            console.log('suc',response.status);
            setDriverRes(response.status)
            setToken(response.data.token)
            console.log('token==>',token);
            console.log('body cre',credentails)
  
  
        })
  
})();
    fetch("https://nodebackend2.herokuapp.com/view/orderbyd", {
             method: 'GET',
             headers: { Authorization: 'Bearer ' + token },
  
         })     
         .then((response) => response.json())
  
         .then((response) => {
             setDriverData(response)
             console.log('res=>',response)
         })

// },[])
  
// console.log('cccccccccccccc',credentails)


    return(
        <View style={{flex:1,alignContent:'center',justifyContent:'center'}}>
            <TextInput
            mode='outlined'
            placeholder='Enter your email'
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <TextInput
          mode='outlined'
            label="Password"
            value={password}
            onChangeText={password => setPassword(password)}
          />
          <Button
        mode="contained"
        style={{marginTop:10,width:"50%",alignSelf:'center'}}
        // onPress={()=>setCredentails({email,pass})}
        onPress={()=>isLogin()}
        >
            login
        </Button>
        {/* <ActivityIndicator animating={animating} color={Colors.red800}/> */}
        <Text>{error}</Text>
        {/* {console.log('credentails==>',credentails)} */}
        </View>
    )
}