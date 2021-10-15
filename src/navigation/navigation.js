import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Home';
import ProgressScreen from '../Progress';
import DetailsScreen from '../Details';
import LoginScreen from '../Login';
import ReasonScreen from '../Reason';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Progress Screen" component={ProgressScreen} />
          <Stack.Screen name="Details Screen" component={DetailsScreen} />
          <Stack.Screen name="Reason Screen" component={ReasonScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }