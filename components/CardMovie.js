import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Card } from '@rneui/themed'

const CardMovie = props => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title style={styles.title}>
          {props.title != null ? props.title : 'Titolo'}
        </Card.Title>
        <Card.Divider />
        <Card.Image
          style={styles.imageStyle}
          source={{
            uri: 'https://image.tmdb.org/t/p/original/' + props.url
          }}
        />
        <Card.Divider />
        <View style={styles.buttonView}>
          <Button
            title='Info'
            onPress={props.onClickInfo}
            buttonStyle={{ ...styles.addButton, backgroundColor: 'gold' }}
            containerStyle={styles.buttonContainer}
            titleStyle={{ fontWeight: 'bold', color: 'black' }}
          />
          {props.saved == null ? (
            <Button
              title='Add'
              onPress={props.onClickAdd}
              buttonStyle={styles.addButton}
              containerStyle={styles.buttonContainer}
              titleStyle={{ fontWeight: 'bold' }}
            />
          ) : (
            <Button
              title='Remove'
              onPress={props.onClickRemove}
              buttonStyle={{ ...styles.addButton, backgroundColor: 'red' }}
              containerStyle={styles.buttonContainer}
              titleStyle={{ fontWeight: 'bold' }}
            />
          )}
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  addButton: {
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30
  },
  buttonContainer: {
    width: 100,
    marginVertical: 2
  },
  imageStyle: {
    height: 270,
    borderRadius: 30,
    borderWidth: 2,
    maxWidth: '100%',
    marginBottom: 10
  }
})

export default CardMovie
