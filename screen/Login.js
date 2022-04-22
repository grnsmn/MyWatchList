import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from '@rneui/themed'
import { Snackbar } from 'react-native-paper'

const Login = ({navigation}) => {
  const [mail, setMail] = useState('E-Mail')
  const [pwd, setPwd] = useState('Password')
  const [checkForm, setCheckForm] = useState(false)
//   console.log(mail)
//   console.log(pwd)

  const handleLogin = () => {
    let condition1 = (mail.includes("simoneprova@email.com"))
    let condition2 = (pwd=="simoneprova1")
    if(condition1&&condition2){
        navigation.navigate('Home')
        setCheckForm(false)
    }
    else{
        setCheckForm(true)       
    }
  }

  return (
    <View style={styles.container}>
      <Snackbar
        visible={checkForm}
        onDismiss={() => setCheckForm(false)}
        duration={700}
        style={{ backgroundColor: '#FF1122', textAlign: 'center' }}
      >
        Email o Password Errati
      </Snackbar>
      <View style={styles.formContainer}>
      
        <Input
          placeholder={'Inserisci la tua Username'}
          onEndEditing={value => setMail(value.nativeEvent.text.toLowerCase())}
        />
        <Input
          placeholder={'Inserisci la tua Password'}
          onEndEditing={value => setPwd(value.nativeEvent.text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title='LOG IN'
          onPress={handleLogin}
          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10
          }}
          titleStyle={{ fontWeight: 'bold' }}
        />
      </View>
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
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20
  },
  formContainer: {
    width: '70%'
  }
})

export default Login;