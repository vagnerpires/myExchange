import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../screens/HomePage';
import WelcomePage from '../screens/WelcomePage';
import LoginPage from '../screens/LoginPage';
import RegisterPage from '../screens/RegisterPage';
import EditProfilePage from '../screens/EditProfilePage';
import SearchPage from '../screens/SearchPage';
import FavoritesPage from '../screens/FavoritesPage';
import SchoolPage from '../screens/SchoolPage';
import AirLinePage from '../screens/AirlinePage';
import UserPage from '../screens/UserHomePage';
import { userContext } from '../context/userContext';

const Stack = createNativeStackNavigator()

export default function AppNavigation() {

  const userID = useContext(userContext)

  if (userID) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomePage} />
          <Stack.Screen name="Profile" options={{ headerShown: false }} component={EditProfilePage} />
          <Stack.Screen name="Favorites" options={{ headerShown: false }} component={FavoritesPage} />
          <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchPage} />
          <Stack.Screen name="School" options={{ headerShown: false }} component={SchoolPage} />
          <Stack.Screen name="Airline" options={{ headerShown: false }} component={AirLinePage} />
          <Stack.Screen name="UserPageHome" options={{ headerShown: false }} component={UserPage} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomePage} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginPage} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}