import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// hook
import useAuth from '../components/auth/login';


export default function LoginPage() {

  // hooks
  const navigation = useNavigation();
  const { auth } = useAuth()

  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // functions
  // login logic
  const handleLogin = async () => {
    if (email && password) {
      try {
        const user = await auth({ email: email, password: password })
        if (user) return navigation.navigate("Profile")
        alert("Incorrect Credentials")
      } catch (err) {
        console.log('catch login: ', err);
      }
    }
  }

  //JSX
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <Text
        onPress={() => navigation.navigate('Register')}
        style={styles.subtitle}><Text>REGISTER</Text>
      </Text>
    </View>
  );
};

//css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#30FFAE',
  },
  input: {
    top: 25,
    width: 328,
    height: 43,
    borderColor: '#2B8B5D',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 15,
    backgroundColor: '#fff',

  },
  subtitle: {
    top: 25,
    fontSize: 18,
    marginTop: 20,
    color: '#2B8B5D',
    fontWeight: 'bold',
  },
  logo: {
    top: 41,
    width: 300,
    height: 300,
    resizeMode: 'contain',
    zIndex: 1,
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    top: 91,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    zIndex: 0,
  },
  button: {
    top: 40,
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
});