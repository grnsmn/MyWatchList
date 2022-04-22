import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import CardMovie from '../components/CardMovie'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default function Home () {
  const [data, setData] = useState([])
  useEffect(() => {
    //console.log(data)
    // Corretta! Viene eseguito una volta dopo il rendering con array vuoto
  }, [data])
  useEffect(()=>{
    makeRemoteRequest()
  },[])
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
  const renderItem = ({ item }) => (
    <CardMovie title={item.title} url='https://image.tmdb.org/t/p/w300/dzpO9NG28CzsYBJZ5EJ3oKEKOIG.jpg'></CardMovie>
  );
  return (
    <View style={styles.container}>
      <FlatList
      >

      </FlatList>
      <CardMovie
        title={'titolo'}
        url='https://image.tmdb.org/t/p/w300/dzpO9NG28CzsYBJZ5EJ3oKEKOIG.jpg'
      ></CardMovie>
      <Button onPress={makeRemoteRequest} title='Remote Request'></Button>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
