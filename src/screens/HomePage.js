import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAuth from '../components/auth/login';
import { userContext } from '../context/userContext';

import { useConvertDate } from '../utils/convetDate';
import useUsersClient from '../services/supabaseStore/users/userStore';

export default function HomePage() {

    // hooks
    const { logout } = useAuth()
    const { general, age } = useConvertDate()
    const navigation = useNavigation();
    const { findOne } = useUsersClient()
    const userID = useContext(userContext)

    // states
    const [userData, setUserData] = useState({});

    // functions start ----------------------------
    useEffect(() => {
        async function getUser() {
            await findOne(userID.id)
                .then((response) => {
                    setUserData({
                        id: response.id,
                        name: response.name,
                        birthdate: response.birthdate,
                        destination_city: response.destination_city,
                        destination_country: response.destination_country,
                        date_arrival: general(response.date_arrival),
                        origin_city: response.origin_city,
                        origin_country: response.origin_country,
                        whatsapp: response.whatsapp,
                        school_id: response.school_id,
                        airlines_id: response.airlines_id,
                        photo: response.photo,
                        age: age(response.birthdate)
                    })
                })
        }
        getUser()
    }, [userID]);

    const handleLogout = async () => {
        logout()
        navigation.navigate("Login")
    }

    const openWhatsAppChat = () => {
        let phoneNumber = userData.whatsapp;
        let message = 'Hello, I would like to chat with you on WhatsApp!';
        let url = `whatsapp://send?text=${encodeURIComponent(message)}&phone=${phoneNumber}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + url);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }

    // functions end ----------------------------


    // navigates start -------------------------
    const handleEditProfile = () => {
        navigation.navigate('Profile');
    };

    const handleNavigateToSchool = () => {
        navigation.navigate('School', { school_id: userData.school_id, user_id: userData.id });
    };

    const handleNavigateToAirline = () => {
        navigation.navigate('Airline', { airline_id: userData.airlines_id, user_id: userData.id });
    };
    // navigates end -------------------------

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout} style={styles.logout}>
                <Text style={styles.editButtonText}>LOGOUT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
                <Text style={styles.editButtonText}>MY PROFILE</Text>
            </TouchableOpacity>
            {userData && userData.photo ? (
                <Image source={{ uri: `data:image/png;base64,${userData.photo}` }} style={styles.userPhoto} />
            ) : (
                <Image source={require('../../assets/profile.png')} style={styles.userPhoto} />
            )}
            <Text style={[styles.userName, styles.userAge]}>{userData?.name} - {parseInt(userData.age) ? userData.age : "Age"}</Text>

            <View style={styles.separator}></View>
            <Image source={require('../../assets/pin.png')} style={styles.userCountry} />
            <Text style={styles.userDestination}>{userData?.destination_country}</Text>

            <Text style={styles.userCity}>{userData?.destination_city}</Text>

            <Text style={styles.userArrivalDate}>Arrival Date: {userData.date_arrival !== "-undefined-undefined" ? userData.date_arrival : ""}</Text>
            <View style={styles.schoolContainer}>
                <Text style={styles.userSchool}>School: </Text>
                <TouchableOpacity onPress={handleNavigateToSchool}>
                    <Text style={styles.linkText}>{userData?.school_id}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.airlineContainer}>
                <Text style={styles.userAirlines}>Airline: </Text>
                <TouchableOpacity onPress={handleNavigateToAirline}>
                    <Text style={styles.linkText}>{userData?.airlines_id}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator2}></View>
            <Text style={styles.userOriginCity}>{userData?.origin_city}</Text>
            <Text style={styles.userOriginCountry}>{userData?.origin_country}</Text>
            <TouchableOpacity onPress={openWhatsAppChat}>
                <Image source={require('../../assets/whatsapp.png')} style={styles.whatsappLogo} />
            </TouchableOpacity>
            <Footer navigation={navigation} />
        </SafeAreaView>
    )
}

const Footer = ({ navigation }) => {
    const handleHomePage = () => {
        navigation.navigate('Home');
    };

    const handleSearchPage = () => {
        navigation.navigate('Search');
    };

    const handleFavoritesPage = () => {
        navigation.navigate('Favorites');
    };

    return (
        <View style={footerStyles.container}>
            <TouchableOpacity onPress={handleHomePage} style={footerStyles.footerItem}>
                <Text style={footerStyles.footerText}>Home</Text>
            </TouchableOpacity>

            <View style={footerStyles.divider} />

            <TouchableOpacity onPress={handleSearchPage} style={footerStyles.footerItem}>
                <Text style={footerStyles.footerText}>Search</Text>
            </TouchableOpacity>

            <View style={footerStyles.divider} />

            <TouchableOpacity onPress={handleFavoritesPage} style={footerStyles.footerItem}>
                <Text style={footerStyles.footerText}>Favorites</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#30FFAE',
    },
    editButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        zIndex: 1,
    },
    editButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    logout: {
        position: 'absolute',
        marginTop: 50,
        right: 20,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        zIndex: 1,
    },
    userPhoto: {
        position: 'absolute',
        width: 390,
        height: 390,
        marginBottom: 2,
        marginTop: 75,
        zIndex: 0,
    },
    userName: {
        position: 'absolute',
        fontSize: 32,
        marginTop: 470,
        marginBottom: 0,
        left: 30,
        color: 'black',
    },
    likeButton: {
        position: 'absolute',
        marginTop: 470,
        right: 30,
    },
    separator: {
        position: 'absolute',
        width: 335,
        height: 1,
        backgroundColor: 'black',
        marginTop: 520,
    },
    userCountry: {
        position: 'absolute',
        width: 80,
        height: 60,
        marginTop: 530,
        left: 40,
    },
    userDestination: {
        position: 'absolute',
        marginTop: 590,
        fontSize: 22,
        left: 45,
        color: 'black',
    },
    userCity: {
        position: 'absolute',
        marginTop: 530,
        fontSize: 15,
        left: 150,
        color: 'black',
    },
    userArrivalDate: {
        position: 'absolute',
        marginTop: 555,
        fontSize: 15,
        left: 150,
        color: 'black',
    },
    schoolContainer: {
        position: 'absolute',
        flexDirection: 'row',
        marginTop: 580,
        left: 150,
    },
    airlineContainer: {
        position: 'absolute',
        flexDirection: 'row',
        marginTop: 605,
        left: 150,
    },
    linkText: {
        fontWeight: 'bold',
    },
    separator2: {
        position: 'absolute',
        width: 335,
        height: 1,
        backgroundColor: 'black',
        marginTop: 640,
    },
    userOriginCity: {
        position: 'absolute',
        marginTop: 660,
        fontSize: 15,
        left: 50,
        color: 'black',
    },
    userOriginCountry: {
        position: 'absolute',
        marginTop: 680,
        fontSize: 15,
        left: 50,
        color: 'black',
    },
    whatsappLogo: {
        position: 'absolute',
        width: 50,
        height: 50,
        left: 100,
        top: 600,
    },
};

const footerStyles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#2b8b5d',
        marginBottom: 0,
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0,
    },
    footerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    divider: {
        width: 1,
        height: '70%',
        backgroundColor: 'white',
        opacity: 0.6,
    },
};