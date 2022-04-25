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
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',
            headerStyle: styles.headerContainer
          }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={{
            title: 'MyWatchList',
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',
            headerStyle: styles.headerContainer
          }}
        />
        <Stack.Screen
          name='Dettagli'
          component={DetailsMovie}
          options={{
            title: 'MyWatchList',
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center',
            headerStyle: styles.headerContainer
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    color: 'gold',
    fontSize: 30
  },
  headerContainer:{
    backgroundColor: '#666'

  }
})
