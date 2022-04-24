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
        <Text h2 h2Style={{ textAlign: 'center', color:'gold' }}>
          {title}{' '}
        </Text>
      <View style={styles.infoContainer}>
        <Text h3 h3Style={{ textAlign: 'right', color:'white' }}>
          ({releaseDate.getFullYear()})
        </Text>
        <Text h5 style={{textAlign:'justify', marginTop:10, fontSize:16, padding:20, color:'white'}} >{overview}</Text>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  mediaContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  img: {
    //aspectRatio: 1,
    width: '100%',
    height: '100%',
    backgroundColor:'black'
  },
  infoContainer: {
    flex: 1,
    color:'white'
  },
})
export default DetailsMovie
