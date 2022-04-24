import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { Text, SearchBar } from '@rneui/themed'
import CardMovie from '../components/CardMovie'

const DATA = [
  {
    url: 'https://image.tmdb.org/t/p/w300/dzpO9NG28CzsYBJZ5EJ3oKEKOIG.jpg',
    title: 'First Item'
  },
  {
    url: 'https://image.tmdb.org/t/p/w300/dzpO9NG28CzsYBJZ5EJ3oKEKOIG.jpg',
    title: 'Second Item'
  },
  {
    url: 'https://image.tmdb.org/t/p/w300/dzpO9NG28CzsYBJZ5EJ3oKEKOIG.jpg',
    title: 'Third Item'
  }
]

const Home = ({ navigation }) => {
  const [data, setData] = useState([]) //store film ricevuti da API
  const [myData, setMyData] = useState([]) //store film in locale
  const [search, setSearch] = useState('')

  const updateSearch = search => {
    setSearch(search)
  }

  useEffect(() => {
    console.log(data)
    // Corretta! Viene eseguito una volta dopo il rendering con array vuoto
  }, [data])
  useEffect(() => {
    console.log('render e request')
    makeRemoteRequest()
  }, [])
  const makeRemoteRequest = () => {
    fetch(
      'https://api.themoviedb.org/3/list/1?api_key=2a4ee1c370ac17ebfc701ee44ca985e3&language=en-US'
    )
      .then(response => response.json())
      .then(response => {
        setData(response.items)
      })
      .catch(err => console.error(err))
  }
  const handleClickCard = scelta => {
    //console.log('callback' + scelta.poster_path)
    // console.log(scelta.poster_path)
    navigation.navigate('Dettagli', {
      title: scelta.title,
      overview: scelta.overview,
      poster: scelta.poster_path,

    })
  }
  const renderItem = ({ item }) => (
    <CardMovie
      title={item.title}
      url={item.poster_path}
      onClick={() => handleClickCard(item)}
    ></CardMovie>
  )
  return (
    <ScrollView style={styles.container}>
      <StatusBar style='auto' />
      <SearchBar
        placeholder='Type Here...'
        onChangeText={updateSearch}
        value={search}
        inputContainerStyle={{ height: '6%' }}
      />
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
      {/* <View style={styles.WatchListContainer}>
        <Text style={styles.textSection} h4>
          Watch List
        </Text>
        <FlatList
          data={DATA}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.title}
        ></FlatList>
      </View> */}
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
    marginBottom: 1
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
