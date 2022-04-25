import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Linking } from 'react-native'
import { Input, Button, Text } from '@rneui/themed'
import { Snackbar } from 'react-native-paper'

const Login = ({ navigation }) => {
  const [mail, setMail] = useState('E-Mail')
  const [pwd, setPwd] = useState('Password')
  const [checkForm, setCheckForm] = useState(false)

  const handleLogin = () => {
    let condition1 = mail.includes('simone@email.com')
    let condition2 = pwd == 'simone'
    if (condition1 && condition2) {
      navigation.navigate('Home')
      setCheckForm(false)
    } else {
      setCheckForm(true)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Snackbar
        visible={checkForm}
        onDismiss={() => setCheckForm(false)}
        duration={700}
        style={{ backgroundColor: '#FF1122', textAlign: 'center' }}
      >
        Email o Password Errati
      </Snackbar>
      <Text h4 h4Style={{ textAlign: 'center', marginBottom: 60 }}>
        Tieni traccia dei prossimi {'\n'} film da non perderti
      </Text>
      <Text h6>Accedi</Text>
      <View style={styles.formContainer}>
        <Input
          style={styles.inputStyle}
          placeholder={'simone@email.com'}
          onEndEditing={value => setMail(value.nativeEvent.text.toLowerCase())}
        />
        <Input
          style={styles.inputStyle}
          placeholder={'simone'}
          onEndEditing={value => setPwd(value.nativeEvent.text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title='LOG IN'
          onPress={handleLogin}
          buttonStyle={styles.loginStyle}
          containerStyle={styles.loginContainer}
          titleStyle={{ fontWeight: 'bold' }}
        />
      </View>
      <Text h6 style={{ marginTop: 80 }}>
        Non hai un account?{' '}
        <Text
          style={{ color: 'blue' }}
          onPress={() => Linking.openURL('https://www.themoviedb.org/')}
        >
          Registrati
        </Text>
      </Text>
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
  loginContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10
  },
  loginStyle: {
    backgroundColor: 'black',
    borderWidth: 3,
    borderColor: 'gold',
    borderRadius: 30
  },
  inputStyle: {
    borderWidth: 4,
    borderColor: 'gold',
    borderRadius: 10,
    padding: 15,
    marginTop: 20
  },
  formContainer: {
    width: '70%'
  }
})

export default Login
