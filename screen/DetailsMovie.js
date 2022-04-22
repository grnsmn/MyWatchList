import { StatusBar } from 'expo-status-bar'
import { View, Button, StyleSheet, FlatList } from 'react-native'

const DetailsMovie = (props) =>{
    return (
        <View style={styles.container}>
          <StatusBar style='auto' />
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
});
export default DetailsMovie;