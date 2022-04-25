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
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

const Home = ({ navigation }) => {
  const [data, setData] = useState([]) //store film ricevuti da API
  const [myData, setMyData] = useState([]) //store film in locale
  const [loading, setLoading] = useState(false)
  const { getItem, setItem } = useAsyncStorage('@local')
  // const [search, setSearch] = useState('')

  const makeMovieRequest = () => {
    //Richiesta dettagli film da API del sito TheMovieDB.org
    fetch(
      'https://api.themoviedb.org/3/list/1?api_key=2a4ee1c370ac17ebfc701ee44ca985e3&language=en-US'
    )
      .then(response => response.json())
      .then(response => {
        response.items.sort((a, b) => {
          //Ordina l'array per film più recenti
          if (a.release_date > b.release_date) {
            return -1
          } else if (a.release_date > b.release_date) {
            return 1
          }
          return 0
        })
        setData(response.items)
      })
      .catch(err => console.error(err))
  }

  const readListFromStorage = async () => {
    const item = await getItem()
    let list = JSON.parse(item)
    setMyData(list)
  }

  const writeListToStorage = async listMovies => {
    //Salvataggio locale dei film salvati in watchList
    let locaList = JSON.stringify(listMovies)
    await setItem(locaList)
  }

  // const updateSearch = search => {
  //   setSearch(search)

  // }

  useEffect(() => {
    setLoading(false)
  }, [data])
  useEffect(() => {}, [myData])
  useEffect(() => {
    makeMovieRequest()
    setLoading(true)
    readListFromStorage()
  }, [])

  const handleCardInfo = scelta => {
    //METODO CHE PORTA ALLO SCREEN PER LE INFO DEL FILM SELEZIONATO
    navigation.navigate('Dettagli', {
      title: scelta.title,
      overview: scelta.overview,
      poster: scelta.backdrop_path,
      date: scelta.release_date
    })
  }
  const handleCardAdd = scelta => {
    //METODO PER AGGIUNGERE FILM ALLA WHATCHLIST
    const savedMovie = {
      ...scelta,
      saved: true
    }
    let myUpdateList = [...myData, savedMovie]
    setMyData(myUpdateList)
    writeListToStorage(myUpdateList)
  }
  const handleCardRemove = scelta => {
    let movieToRemove = myData.find(movie => movie.id == scelta.id)
    let myUpdateList = myData.filter(movie => movie != movieToRemove)
    setMyData(myUpdateList)
    writeListToStorage(myUpdateList)
    // console.log(myData.filter((movie)=> movie != movieToRemove))
  }
  const renderItem = ({ item }) => (
    <CardMovie
      title={item.title}
      url={item.poster_path}
      onClickInfo={() => handleCardInfo(item)}
      onClickAdd={() => handleCardAdd(item)}
      onClickRemove={() => handleCardRemove(item)}
      saved={item.saved}
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
        {data.length == 0 ? (
          <ActivityIndicator size={'large'} color='red' animating={loading} />
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
        {myData.length == 0 ? (
          <Text h3 h3Style={{ textAlign: 'center', color: 'red' }}>
            Aggiungi qualche titolo alla tua lista
          </Text>
        ) : (
          <FlatList
            data={myData}
            horizontal
            renderItem={renderItem}
            keyExtractor={item => item.id}
          ></FlatList>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555'
  },
  newReleaseContainer: {
    alignItems: 'center',
    backgroundColor: '#555',
    flex: 1,
    padding: 10,
  },
  WatchListContainer: {
    alignItems: 'center',
    backgroundColor: '#555',
    flex: 1,
    padding: 10,
  },
  textSection: {
    width: '60%',
    borderRadius: 30,
    color: 'gold',
    textAlign: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    backgroundColor: '#666'
  },
  searchStyle: {
    height: '5%'
  }
})

export default Home
