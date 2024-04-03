import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


export default function WelcomePage() {

  // hooks
  const navigation = useNavigation();

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
    width: 300, // Ajuste conforme necessário
    height: 300, // Ajuste conforme necessário
    borderRadius: 150, // Deve ser a metade da largura/altura para formar um círculo
    backgroundColor: 'white',
    zIndex: 0, // Para colocar atrás do logo
  },
  logo: {
    top: 126,
    width: 440,
    height: 440,
    resizeMode: 'contain',
    zIndex: 1, // Para sobrepor o círculo
    position: 'relative',
  },
  button: {
    top: 120,
    width: 328,
    height: 50,
    backgroundColor: '#2B8B5D',
    borderRadius: 5,
    justifyContent: 'center', // Centraliza o texto verticalmente
    alignItems: 'center', // Centraliza o texto horizontalmente
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