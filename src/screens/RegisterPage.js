import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// hooks
import useUsersClient from '../services/supabaseStore/users/userStore';


export default function RegisterPage() {

  // hooks
  const navigation = useNavigation();
  const { createOne } = useUsersClient()

  // states
  const defaulFormData = {
    name: "",
    email: "",
    password: ""
  }
  const [formData, setFormData] = useState(defaulFormData)


  // functions
  function onChangeForm(key, value) {
    console.log(formData)
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }


  const handleRegister = async () => {
    await createOne(formData)
      .then(() => navigation.navigate("Login"))
      .catch((err) => {
        alert(`Error: ${err.message}`)
      })
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={e => onChangeForm("name", e)}
        keyboardType="name"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={formData.email}
        onChangeText={e => onChangeForm("email", e)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={formData.password}
        placeholder="Password"
        onChangeText={e => onChangeForm("password", e)}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <Text
        onPress={() => {
          setFormData(defaulFormData)
          navigation.navigate('Login')
        }}
        style={styles.subtitle}>LOGIN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#30FFAE',
  },
  title: {
    top: 140,
    fontSize: 20,
    color: '#2B8B5D',
    fontWeight: 'bold',
  },
  input: {
    top: 230,
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
    top: 250,
    fontSize: 20,
    color: '#2B8B5D',
    fontWeight: 'bold',
  },
  button: {
    top: 250,
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
