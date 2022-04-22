import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Button, StyleSheet, FlatList, ScrollView } from 'react-native'
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
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  const updateSearch = search => {
    setSearch(search)
  }
  useEffect(() => {
    //console.log(data)
    // Corretta! Viene eseguito una volta dopo il rendering con array vuoto
  }, [data])
  useEffect(() => {
    makeRemoteRequest()
  }, [])
  const makeRemoteRequest = () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
        'X-RapidAPI-Key': '9e85904c21msh0384f4c89b2ab8bp1e1df0jsn45647e203a25'
      }
    }

    fetch(
      'https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=prime&type=movie&genre=18&page=1&output_language=en&language=en',
      options
    )
      .then(response => response.json())
      .then(response => {
        //console.log(response)
        setData(response)
      })
      .catch(err => console.error(err))
  }
  const handleClickCard = () => {
    console.log('callback')
    navigation.navigate('Dettagli')
  }
  const renderItem = ({ item }) => (
    <CardMovie
      title={item.title}
      url={item.url}
      onClick={handleClickCard}
    ></CardMovie>
  )
  return (
    <ScrollView style={styles.container}>
      <StatusBar style='auto' />
      <SearchBar
        placeholder='Type Here...'
        onChangeText={updateSearch}
        value={search}
        inputContainerStyle={{ height: '4%' }}
      />
      <View style={styles.newReleaseContainer}>
        <Text style={styles.textSection} h4>
          New Release
        </Text>
        <FlatList
          data={DATA}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.title}
        ></FlatList>
      </View>
      <View style={styles.WatchListContainer}>
        <Text style={styles.textSection} h4>
          Watch List
        </Text>
        <FlatList
          data={DATA}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.title}
        ></FlatList>
      </View>
      {/* <Button onPress={makeRemoteRequest} title='Remote Request'></Button> */}
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
