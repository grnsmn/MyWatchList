import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { Text } from '@rneui/themed'

const DetailsMovie = ({ route }) => {
  const { title, poster, overview, date } = route.params
  let releaseDate = new Date(date)

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.mediaContainer}>
        <Image
          source={{ uri: 'https://image.tmdb.org/t/p/original/' + poster }}
          style={styles.img}
          resizeMode='center'
        />
      </View>
      <View style={styles.infoContainer}>
        <Text h2 h2Style={{ textAlign: 'center' }}>
          {title}{' '}
        </Text>
        <Text h3 h3Style={{ textAlign: 'right' }}>
          ({releaseDate.getFullYear()})
        </Text>
        <Text h5 style={{textAlign:'justify', marginTop:10}} >{overview}</Text>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    //justifyContent: 'center'
  },
  mediaContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  img: {
    aspectRatio: 1,
    width: '100%',
    height: '95%'
  },
  infoContainer: {
    flex: 1
  },
})
export default DetailsMovie
