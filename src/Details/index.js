/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { useState } from 'react';
import {
  Text,
  Alert,
  SafeAreaView,
  View,
  Image,
  Linking,
  Platform,
} from 'react-native';
import {
  Button,
  Searchbar,
  List,
  Avatar,
  IconButton,
  Colors,
} from 'react-native-paper';
export default function DetailsScreen({ navigation, route }) {
  const { token, selectedDriverData } = route.params;
  console.log('se==>', selectedDriverData);
  const [phone, setPhone] = useState(selectedDriverData.phone);
  console.log(phone);

  const openDialScreen = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const openMsgScreen = () => {
    Linking.openURL(`sms:`);
  };



  return (
    // <SafeAreaView>
    <>
      <View style={{ width: '100%', backgroundColor: '#00B3D3' }}>
        <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 15 }}>
          DELIVER: {'\n'} Product Name : {selectedDriverData.ordername} {'\n'}{' '}
          Deliver Address : {selectedDriverData.recieveraddress}
          {'\n'} Reciver Phone Number : {selectedDriverData.recieverphone}
          {'\n'} Order ID : {selectedDriverData.orderid}
          {'\n'} Created On : {selectedDriverData.created_on}
          {'\n'} Expected Delivery Date :{' '}
          {selectedDriverData.expected_delivery_date}
          {'\n'} Last Updated On : {selectedDriverData.last_updated_on}
          {'\n'} Vehicle Number : {selectedDriverData.vehicleno}
          {'\n'} Delivered By : {selectedDriverData.deliveredby}
        </Text>
      </View>
      {/* <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
        <Button
        mode="contained"
        >
            items
        </Button>
        <Button
        mode="contained"
        >
            Note
        </Button>
        <Button
        icon={require('../../assets/attach-file.png')}
        mode="contained"
        >
            file
        </Button>
    </View> */}
      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <Text style={{ fontSize: 20, color: 'black' }}>Instruction{'\n'}N/A</Text>
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View style={{ width: '100%', height: '50%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <IconButton
              icon={require('../../assets/camera.png')}
              // color={Colors.red500}
              size={80}
              onPress={() => console.log('Pressed')}
            />
            <IconButton
              icon={require('../../assets/right.png')}
              // color={Colors.red500}
              size={80}
              onPress={() => {

                // console.log(token)

                // const formData = new FormData();
                // formData.append("orderid",selectedDriverData.orderid);
                // formData.append("orderstatus","confirmed");
                // formData.append("email",selectedDriverData.email);
                // formData.append("reason","confirmation");

                // console.log(JSON.stringify(formData.parts))

                fetch("https://nodebackend2.herokuapp.com/order/updatebyd", {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                  body: JSON.stringify({
                    "orderid": selectedDriverData.orderid,
                    "orderstatus": "confirmed",
                    "reason": "completed",
                  }),

                })


                  .then((response) => {
                    response.json();
                    Alert.alert(`Order ${selectedDriverData.ordername}Completed!`);
                    console.log(response)
                  });


              }}
            />
            <IconButton
              icon={require('../../assets/wrong.png')}
              // color={Colors.red500}
              size={80}
              onPress={() => navigation.navigate('Reason Screen',{driver:selectedDriverData})}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: -20,
            }}>
            <IconButton
              icon={require('../../assets/left-arrow.png')}
              // color={Colors.red500}
              size={80}
              onPress={() => navigation.navigate('Home')}
            />
            <IconButton
              icon={require('../../assets/phone-call.png')}
              // color={Colors.red500}
              size={80}
              onPress={() => openDialScreen()}
            />
            <IconButton
              icon={require('../../assets/email.png')}
              // color={Colors.white}
              size={80}
              onPress={() => openMsgScreen()}
            />
          </View>
        </View>
      </View>
    </>
    // </SafeAreaView>
  );
}
