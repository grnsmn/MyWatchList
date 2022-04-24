import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { Text, SearchBar } from '@rneui/themed'
import CardMovie from '../components/CardMovie'

const Home = ({ navigation }) => {
  const [data, setData] = useState([]) //store film ricevuti da API
  const [myData, setMyData] = useState([]) //store film in locale
  const [search, setSearch] = useState('')

  const updateSearch = search => {
    setSearch(search)
  }
  useEffect(() => {
    //console.log(data)
    // Corretta! Viene eseguito una volta dopo il rendering con array vuoto
  }, [data])
  useEffect(() => {
  }, [myData])
  useEffect(() => {
    makeRemoteRequest()
  }, [])
  const storeInMyList = async (movie) => {
    try {
      const jsonMovie = JSON.stringify(movie)
      await AsyncStorage.setItem('@storage_Key', jsonMovie)
    } catch (e) {
      // saving error
    }
  }
  const makeRemoteRequest = () => {
    fetch(
      'https://api.themoviedb.org/3/list/1?api_key=2a4ee1c370ac17ebfc701ee44ca985e3&language=en-US'
    )
      .then(response => response.json())
      .then(response => {
        response.items.sort((a,b)=>{
          if (a.release_date > b.release_date){
            return -1;
          }
          else if (a.release_date > b.release_date){
            return 1;
          }
          return 0;
        })
        setData(response.items)
      })
      .catch(err => console.error(err))
  }
  const handleCardInfo = scelta => { //METODO CHE PORTA ALLO SCREEN PER LE INFO DEL FILM SELEZIONATO
    //console.log('callback' + scelta.poster_path)
    // console.log(scelta.poster_path)
    navigation.navigate('Dettagli', {
      title: scelta.title,
      overview: scelta.overview,
      poster: scelta.poster_path,
      date: scelta.release_date
    })
  }
  const handleCardAdd = scelta => {  //METODO PER AGGIUNGERE FILM ALLA WHATCHLIST
    //console.log('callback' + scelta.poster_path)
    // console.log(scelta.poster_path)
    console.log(scelta.id)
   // setMyData([...myData, scelta])
  }
  const renderItem = ({ item }) => (
    <CardMovie
      title={item.title}
      url={item.poster_path}
      onClickInfo={() => handleCardInfo(item)}
      onClickAdd={() => handleCardAdd(item)}
      
    ></CardMovie>
  )
  return (
    <ScrollView style={styles.container}>
      <StatusBar style='auto' />
      {/* <SearchBar
        placeholder='Type Here...'
        onChangeText={updateSearch}
        value={search}
        inputContainerStyle={{ height: '6%' }}
      /> */}
      <View style={styles.newReleaseContainer}>
        <Text style={styles.textSection} h4>
          New Release
        </Text>
        {data.isEmpty == true ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large'></ActivityIndicator>
          </View>
        ) : (
          <FlatList
            data={data}
            horizontal
            renderItem={renderItem}
            keyExtractor={item => item.id}
          ></FlatList>
        )}
      </View>
      <View style={styles.WatchListContainer}>
        <Text style={styles.textSection} h4>
          Watch List
        </Text>
        <FlatList
          data={myData}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
        ></FlatList>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    //justifyContent: 'center'
  },
  newReleaseContainer: {
    backgroundColor: '#555',
    flex: 1,
    margin: 0,
    padding: 5,
    marginBottom: 2
  },
  WatchListContainer: {
    backgroundColor: '#555',
    flex: 1,
    margin: 0,
    padding: 5,
    marginBottom: 1
  },
  textSection: {
    color: 'white',
    textAlign: 'center',
    padding: 10
  },
  searchStyle: {
    height: '5%'
  }
})

export default Home
