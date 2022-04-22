import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Card } from '@rneui/themed'

const CardMovie = (props) => {
    const [url, setUrl] = useState(props.url)

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>{props.title}</Card.Title>
        <Card.Divider />
        <Card.Image
          style={{ padding: 0 }}
          source={{
            uri:
              url
          }}
        />
        <Button
          title='Scopri'
          onPress={props.onClick}
          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30
          }}
          containerStyle={{
            width: 100,
            marginHorizontal: 50,
            marginVertical: 5
          }}
          titleStyle={{ fontWeight: 'bold' }}
        />
      </Card>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default CardMovie