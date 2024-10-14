import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddUserScreen from './screens/AddUserScreen';
import UserScreen from './screens/UserScreen';
import UserDetailScreen from './screens/UserDetailScreen';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00085E6'
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen 
        name='AddUserScreen'
        component={AddUserScreen}
        options={{ title: 'Add User' }}
      />
      <Stack.Screen 
        name='UserScreen'
        component={UserScreen}
        options={{ title: 'User Screen' }}
      />
      <Stack.Screen 
        name='UserDetailScreen'
        component={UserDetailScreen}
        options={{ title: 'User Detail' }}
      />

    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({})