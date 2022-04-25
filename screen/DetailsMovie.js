import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Image, View } from 'react-native'
import { Text, Button } from '@rneui/themed'

const DetailsMovie = ({ route, navigation }) => {
  const { title, poster, overview, date, saved, infoComplete } = route.params
  let releaseDate = new Date(date)

  return (
    <ScrollView style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.mediaContainer}>
        <Image
          source={{ uri: 'https://image.tmdb.org/t/p/original/' + poster }}
          style={styles.img}
          resizeMode='center'
        />
      </View>
      <Text h2 h2Style={{ textAlign: 'center', color: 'gold' }}>
        {title}{' '}
      </Text>
      <View style={styles.infoContainer}>
        <Text h3 h3Style={{ textAlign: 'right', color: 'white' }}>
          ({releaseDate.getFullYear()})
        </Text>
        <Text h5 style={styles.overviewStyle}>
          {overview}
        </Text>
      </View>
      <View style={styles.buttonView}>
        {saved == null ? (
          <Button
            title='Aggiungi'
            onPress={() => {
              //Ritorna alla Home e aggiorna la whatchlist
              navigation.navigate({
                name: 'Home',
                params: { movie: infoComplete, action: 'add' },
                merge: true
              })
            }}
            buttonStyle={styles.addButton}
            containerStyle={styles.buttonContainer}
            titleStyle={{ fontWeight: 'bold' }}
          />
        ) : (
          <Button
            title='Rimuovi'
            onPress={() => {
              navigation.navigate({
                name: 'Home',
                params: { movie: infoComplete, action: 'remove' },
                merge: true
              })
            }}
            buttonStyle={{ ...styles.addButton, backgroundColor: 'red' }}
            containerStyle={styles.buttonContainer}
            titleStyle={{ fontWeight: 'bold' }}
          />
        )}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121'
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    aspectRatio: 2,
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
  overviewStyle: {
    textAlign: 'justify',
    marginTop: 10,
    fontSize: 16,
    padding: 20,
    color: 'white'
  },
  infoContainer: {
    flex: 1,
    color: 'white'
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
    width: 200,
    marginVertical: 2
  }
})
export default DetailsMovie
