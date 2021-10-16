/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, Alert, SafeAreaView, View, Image, ScrollView } from 'react-native';
import {
  Button,
  Searchbar,
  List,
  ActivityIndicator,
  Colors,
  TextInput,
} from 'react-native-paper';

export default function ReasonScreen({ navigation, route }) {
  const { token, driver } = route.params;
  let reasons = [
    'High volume shipments',
    'lack of clarity',
    'weather conditions',
    'lost packages',
    'mottor vehicle troubles',
    'Technology issues',
    'documention mistakes',
    'damaged package during transportation',
    'issues at customs',
  ];

  return (
    <View>
      {reasons.map((item, index) => {
        return (
          <List.Item
            key={index}
            title={item}
            // description={item.orderid}
            left={props => (
              <List.Icon
                {...props}
                icon={require('../../assets/question.png')}
              />
            )}
            onPress={() => {
              {


                fetch("https://nodebackend2.herokuapp.com/order/updatebyd", {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                  body: JSON.stringify({
                    "orderid": driver.orderid,
                    "orderstatus": "cancelled",
                    "reason": reasons[index]
                  }),
                })

                  .then((response) => {
                    response.json();
                    Alert.alert("Order Cancelled!");
                    console.log(response)
                  });

              }
              // navigation.navigate('Details Screen')
            }}
          />
        );
      })}
    </View>
  );
}
