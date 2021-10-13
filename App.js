import React from 'react';
import {Text,Alert, SafeAreaView, View} from 'react-native';
import { Button } from 'react-native-paper';
import MainNavigator from './src/navigation/navigation.js';
// import MainNavigator from './src/navigation/navigation';
export default function App(){
  return(
   <>
   <MainNavigator />
   </>
  )
}