import React , {useState,useEffect} from 'react';
import {Text,Alert, SafeAreaView, View , Image} from 'react-native';
import { Button , Searchbar } from 'react-native-paper';
export default function HomeScreen({navigation}){

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const credentials = { email: "admin@mail.com", password: "admin1011" }
    const [token, setToken] = React.useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM4MzIxZWQ0LTMzOTMtNGE0YS1iNWRiLWYzYWIwYmE4MDk2YyIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJyb2xlIjoib3duZXIiLCJpYXQiOjE2MzQwNjg3ODAsImV4cCI6MTYzNDE1NTE4MH0.MrmIhON2un_3Xe-bb7PUNSfTTB7SK8W7QNa_pCWav7w");
    const [driverData,setDriverData] = useState({})
    const [loading,setLoading] = useState(false);
    /** To get the token */

    useEffect(() => {

        // console.log(JSON.stringify(credentials))

        fetch("http://nodebackend2.herokuapp.com/login/owner", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(credentials)
        })

            .then((response) => response.json())

            .then((response) => {
                setToken(response.data.token)


            })

    }, [])

    /* To get the data */

    useEffect(() => {   
        (async function(){
            try{
                const response = await fetch("http://nodebackend2.herokuapp.com/view/driver", {
                         method: 'GET',
                         headers: { Authorization: 'Bearer ' + token },
            
                     })
                const json = await response.json();
                console.log(json);
                setDriverData(json)
                setLoading(false);
                // console.log('driverdata=>', driverData)
            }
            catch(e){
                console.log('error==>',e);
            }
        })();
        setLoading(true);
        // fetch("http://nodebackend2.herokuapp.com/view/driver", {
        //     method: 'GET',
        //     headers: { Authorization: 'Bearer ' + token },

        // })

        //     .then((response) => response.json())

        //     .then((response) => {
        //         setDriverData(response)
        //         console.log(response)
        //     })

    }, [])



  
  return(
    // <SafeAreaView>
    <>
    <View style={{flexDirection:'row'}}>
        <Searchbar
        style={{width:'80%',marginTop:5,marginLeft:5,borderRadius:15}}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon={require('../../assets/search.png')}
        />
      <Image source={require('../../assets/qr-code.png')}
      style={{height:50,width:50,marginTop:5,marginLeft:5}}
      />
    </View>
    {/* <View style={{width:'100%',height:'3%',backgroundColor:'#00B3D3',marginTop:5}}> */}
        {/* <Text style={{textAlign:"center"}}>
            Detrack ID :  {driverData && driverData.data[0],driverid}
        </Text> */}
    {/* </View> */}
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>Tap the start button to begin</Text>
        <View style={{position:'absolute',top:500}}>
        <Button
        mode="contained"
        // style={{}}
        onPress={()=>navigation.navigate('Progress Screen',{
            driverDatas:driverData
        })}
        >
            start
        </Button>
        </View>
      </View>
      </>
    // </SafeAreaView>
  )
}