/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { typeAlias } from '@babel/types';
import React, { useState, useEffect } from 'react';
import { Text, Alert, SafeAreaView, View, Image, ScrollView } from 'react-native';
import { Button, Searchbar, List, ActivityIndicator, Colors, TextInput } from 'react-native-paper';
// import { Item } from 'react-native-paper/lib/typescript/components/List/List';
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const credentials = { email: "abc@email.com", password: "mustafa" }
    // const credentials = { email: "", password: "" }
    const [credentails, setCredentails] = useState({
        email: '',
        password: '',
    })
    const [driverRes, setDriverRes] = useState('')

    const [token, setToken] = React.useState('');
    const [driverData, setDriverData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [animating, setAnimating] = useState(true);

    const [details,setdetails]=React.useState(null)


    const closeActivity = () => {
        setTimeout(() => {
            // eslint-disable-next-line no-const-assign
            animating = false
        }, 10000);
    }

    const isLogin = () => {

        setCredentails(prevState => ({
            ...prevState,
            email: email,
            password: password
        }));

        // setCredentails({ email, password })


        (async function () {
            try {
                await fetch('https://nodebackend2.herokuapp.com/login/driver', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(credentails)
                })

                    .then((response) => response.json())

                    .then((response) => {
                        // console.log('creee',credentails);
                        // console.log('rsrs',response)
                        // console.log('suc',response.status);

                        // console.log('token==>',token);
                        // console.log('body cre',credentails)

                        if (response.status == 'success') {
                            setToken(response.data.token);
                            setdetails(response.data);

                        }

                        // if(response.status=="error") {
                        //     setError("Invalid Email or Password")
                        // }



                    })

            }
            catch (e) {
                setError(e)
            }

        })();


        (async function () {
            try {
                await fetch('https://nodebackend2.herokuapp.com/view/orderbyd', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',Authorization: 'Bearer ' + token },

                })
                    .then((response) => response.json())

                    .then((response) => {
                        setDriverData(response)
                        console.log('res=>', response)
                        if (response.status == 'success')
                            navigation.navigate('Home',{token:token,credentials:credentails})
                    })

            }

            catch (e) {
                setError(e)
            }
        })();

    }

    // useEffect(()=>{


    // (async function (){

    //     await fetch("https://nodebackend2.herokuapp.com/login/driver", {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify(credentails)
    //     })

    //     .then((response) => response.json())

    //     .then((response) => {
    //             console.log('creee',credentails);
    //             console.log('rsrs',response)
    //             console.log('suc',response.status);
    //             setDriverRes(response.status)
    //             setToken(response.data.token)
    //             console.log('token==>',token);
    //             console.log('body cre',credentails)


    //         })

    // })();



    // },[])

    // console.log('cccccccccccccc',credentails)


    return (
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <TextInput
                style={{ width: '80%', alignSelf: 'center' }}
                mode='outlined'
                placeholder='Enter your email'
                label="Email"
                value={email}
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                style={{ width: '80%', alignSelf: 'center' }}
                mode='outlined'
                label="Password"
                value={password}
                onChangeText={password => setPassword(password)}
            />
            <Button
                mode="contained"
                style={{ marginTop: 10, width: '50%', alignSelf: 'center' }}
                // onPress={()=>setCredentails({email,pass})}
                onPress={() => isLogin()}
            >
                login
            </Button>
            <Text style={{ color: 'grey', textAlign: 'center', marginTop: 10 }}>( You must clicks two to three times on login button )</Text>
            {/* <ActivityIndicator animating={animating} color={Colors.red800}/> */}
            <Text>{error}</Text>
            {/* {console.log('credentails==>',credentails)} */}
        </View>
    )
}