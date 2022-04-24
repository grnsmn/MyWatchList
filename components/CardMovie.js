import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Card } from '@rneui/themed'
import { patchWebProps } from '@rneui/base'

const CardMovie = props => {

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>{props.title != null ? props.title : 'Titolo'}</Card.Title>
        <Card.Divider />
        <Card.Image
          style={styles.imageStyle}
          source={{
            uri: 'https://image.tmdb.org/t/p/original/' + props.url
          }}
        />
        <View style={styles.buttonContainer}>
          <Button
            title='Info'
            onPress={props.onClickInfo}
            buttonStyle={{
              backgroundColor: 'black',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30
            }}
            containerStyle={{
              width: 100,
              marginVertical: 5
            }}
            titleStyle={{ fontWeight: 'bold' }}
          />
         {props.saved==null? <Button
            title='+'
            onPress={props.onClickAdd}
            buttonStyle={{
              backgroundColor: 'green',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30
            }}
            containerStyle={{
              width: 100,
              marginVertical: 5
            }}
            titleStyle={{ fontWeight: 'bold' }}
          />: <Button
            title='-'
            onPress={props.onClickRemove}
            buttonStyle={{
              backgroundColor: 'red',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30
            }}
            containerStyle={{
              width: 100,
              marginVertical: 5
            }}
            titleStyle={{ fontWeight: 'bold' }}
          />}
        </View>
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
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  imageStyle: {
    height: 270,
    borderRadius: 30,
    borderWidth: 2,
    maxWidth: '100%'
  }
})

export default CardMovie
