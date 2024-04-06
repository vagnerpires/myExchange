import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function WelcomePage() {

  // hooks
  const navigation = useNavigation();

  //JSX
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Get Started!</Text>
      <View style={styles.circle} />
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Already have an account?</Text>
      <Text style={styles.subtitleLogin} onPress={() => navigation.navigate('Login')}>
        <Text>Log In</Text>
      </Text>
    </View>
  )
}

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#30FFAE',
  },
  title: {
    top: 140,
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
  },
  circle: {
    position: 'absolute',
    top: 250,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'white',
    zIndex: 0,
  },
  logo: {
    top: 126,
    width: 440,
    height: 440,
    resizeMode: 'contain',
    zIndex: 1,
    position: 'relative',
  },
  button: {
    top: 120,
    width: 328,
    height: 50,
    backgroundColor: '#2B8B5D',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    top: 90,
    fontSize: 15,
    marginTop: 20,
    color: '#2B8B5D',
    fontWeight: 'bold',
    left: -30,
  },
  subtitleLogin: {
    fontSize: 18,
    marginTop: 67,
    color: 'black',
    fontWeight: 'bold',
    right: -90,
  }
});