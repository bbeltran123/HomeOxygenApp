import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import { AuthContext } from '../AuthProvider'
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { ScrollView } from 'react-native-gesture-handler'

const backgroundImage = require('../../res/background.png')
const logoImage = require('../../res/logo.png')

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  return (
    <KeyboardAwareView animated>
      <ImageBackground style={styles.imageBackground} source={backgroundImage}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.container}>
            <Image source={logoImage} />
            <FormInput
              value={email}
              placeholderText='Email'
              onChangeText={userEmail => setEmail(userEmail)}
              autoCapitalize='none'
              keyboardType='email-address'
              autoCorrect={false}
            />
            <FormInput
              value={password}
              placeholderText='Password'
              onChangeText={userPassword => setPassword(userPassword)}
              secureTextEntry
            />
            <FormButton buttonTitle='Sign in' onPress={() => login(email, password)} />
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.navButtonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAwareView>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center'
  },
  logoImage: {
    width: 253,
    height: 217
  },
  scrollViewContainer: {
    paddingTop: 50
  },
  container: {
    paddingVertical: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 24,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0
  },
  text: {
    fontSize: 24,
    marginBottom: 10
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: '200',
    color: '#000'
  }
})

export default LoginScreen
