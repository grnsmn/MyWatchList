import * as React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screen/Home'
import Login from './screen/Login'
import DetailsMovie from './screen/DetailsMovie'

const Stack = createNativeStackNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'MyWatchList',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'gold',
              fontSize:30
            },
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#666'
            }
          }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            title: 'MyWatchList',
            headerTitleStyle: {
              fontSize:30,
              fontWeight: 'bold',
              color: 'gold'
            },
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#666'
            }
          }}
        />
        <Stack.Screen
          name='Dettagli'
          component={DetailsMovie}
          options={{
            title: 'MyWatchList',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:25,
              color: 'gold'
            },
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#666'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

