import React , {useState , useEffect} from 'react';
import {Text,Alert, SafeAreaView, View , Image, ScrollView} from 'react-native';
import { Button , Searchbar,List ,ActivityIndicator,Colors } from 'react-native-paper';
// import { Item } from 'react-native-paper/lib/typescript/components/List/List';
export default function ProgressScreen({navigation,route}){

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

  //  const {driverDatas} = route.params;
    const credentials = { email: "abc@email.com", password: "mustafa" }
    const [token, setToken] = React.useState("");
    const [driverData,setDriverData] = useState(null)
    const [loading,setLoading] = useState(false);
    /** To get the token */

    // useEffect(() => {

        // console.log(JSON.stringify(credentials))

        // fetch("http://nodebackend2.herokuapp.com/login/driver", {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/json' },
        //     body: JSON.stringify(credentials)
        // })

        //     .then((response) => response.json())

        //     .then((response) => {
        //         setToken(response.data.token)
        //         console.log(token);


        //     })

            // (async function(){
            //   try{
            //     fetch("http://nodebackend2.herokuapp.com/login/driver", {
            //           method: 'POST',
            //           headers: { 'content-type': 'application/json' },
            //           body: JSON.stringify(credentials)
            //       })
          
            //           .then((response) => response.json())
          
            //           .then((response) => {
            //               setToken(response.data.token)
            //               console.log(token);
          
          
            //           })

            //       const response = await fetch("http://nodebackend2.herokuapp.com/view/orderbyd", {
            //                method: 'GET',
            //                headers: { Authorization: 'Bearer ' + token },
              
            //            })     
            //       const res = await response.json();
            //       console.log('res data=>>>',res);
            //       setDriverData(res.data)
            //       // console.log('driverdata=>', driverData)
            //       // setLoading(false);
            //   }
            //   catch(e){
            //       console.log('error==>',e);
            //   }
            // })();
            // console.log('hello')

            // fetch("http://nodebackend2.herokuapp.com/view/orderbyd", {
            //   method: 'GET',
            //   headers: { Authorization: 'Bearer ' + token },
        
            // })
        
            //   .then((response) => response.json())
        
            //   .then((response) => {
      
            //     setDriverData(response.data)
            //     console.log(response)
        
            //   })
      


    // }, [])

    /* To get the data */

    // useEffect(() => {   
    //     (async function(){
    //         try{
    //             const response = await fetch("http://nodebackend2.herokuapp.com/view/driver", {
    //                      method: 'GET',
    //                      headers: { Authorization: 'Bearer ' + token },
            
    //                  })     
    //             const res = await response.json();
    //             console.log('res data=>>>',res);
    //             setDriverData(res.data)
    //             // console.log('driverdata=>', driverData)
    //             // setLoading(false);
    //         }
    //         catch(e){
    //             console.log('error==>',e);
    //         }
    //       })();
    //       // setLoading(true);
    //     // fetch("http://nodebackend2.herokuapp.com/view/driver", {
    //     //     method: 'GET',
    //     //     headers: { Authorization: 'Bearer ' + token },

    //     // })

            // .then((response) => response.json())

            // .then((response) => {
            //     setDriverData(response)
            //     console.log(response)
            // })

    // }, [driverData])
    fetch("https://nodebackend2.herokuapp.com/login/driver", {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(credentials)
  })

      .then((response) => response.json())

      .then((response) => {
          setToken(response.data.token)
          console.log(token);


      })

  fetch("https://nodebackend2.herokuapp.com/view/orderbyd", {
           method: 'GET',
           headers: { Authorization: 'Bearer ' + token },

       })     
       .then((response) => response.json())

       .then((response) => {
           setDriverData(response.data)
           console.log(response.data)
       })

    
  return(
    // <SafeAreaView>
    <>
    {/* {
      loading ? <>
      <ActivityIndicator animating={true} color={Colors.blue800}/>
      </>
      :
    <> */}
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
    <View style={{width:'100%',height:'3%',backgroundColor:'#00B3D3',marginTop:5}}>
        <Text style={{textAlign:"center"}}>
            {/* Detrack ID : {driverDatas.data[0].driverid} */}
        </Text>
    </View>
    <View>
        <ScrollView>
          {driverData ? driverData.map((item,index)=>{
            return (
              <List.Item
               key={index}
               title={item.ordername}
               description={item.orderid}
               left={props => <List.Icon {...props} icon={require('../../assets/seatbelt.png')} />}
               onPress={()=>navigation.navigate('Details Screen',{
                   selectedDriverData:driverData[index]
               })}
               />
            )
          }) 
          : 
          <ActivityIndicator animating={true} color={Colors.red800}/>
          }
          
          {/* <Text>{driverData.data[0].firstname}</Text> */}

          {/* {driverData.map((v,i)=>{
            return <Text>{v.ordername}</Text>
          })} */}
          {/* {driverData.data.map((item,index)=>{
              return (
                <Text>{item.ordername}</Text>
                // <List.Item
                // key={index}
                // title={item.firstname}
                // description={item.driverid}
                // left={props => <List.Icon {...props} icon={require('../../assets/seatbelt.png')} />}
                // onPress={()=>navigation.navigate('Details Screen',{
                //     selectedDriverData:driverData.data[index]
                // })}
                // />
              )
          })} */}
   
    </ScrollView>
        <View style={{position:'absolute',top:500,alignSelf:'center'}}>
        <Button
        mode="contained"
        // style={{}}
        onPress={()=>navigation.navigate('Home')}
        >
            stop
        </Button>
        </View>
      </View>
      </>
    // }
    //   </>
    // </SafeAreaView>
  )
}