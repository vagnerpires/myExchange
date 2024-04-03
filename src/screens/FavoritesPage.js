import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import useFavoritesClient from '../services/supabaseStore/favorites/favoritesStore';
import { userContext } from '../context/userContext';

const FavoritesPage = ({ navigation }) => {

  //hooks
  const { findByUser } = useFavoritesClient()
  const user = useContext(userContext)

  // states
  const [favorites, setFavorites] = useState([]);

  // functions
  useEffect(() => {
    async function getFavorites() {
      await findByUser(user.id)
        .then((response) => {
          setFavorites(response)
        })
    }
    getFavorites();
  }, []);

  const renderItems = ({ item }) => (
    <View>
      {item.name === "user" &&
        <TouchableOpacity onPress={() => navigation.navigate("UserPageHome", { user_id: item.item_id, user_name: item.item_id })}>
          <View style={styles.user}>
            <Image
              source={item.photo ? { uri: `data:image/png;base64,${item.photo}` } : require('../../assets/profile.png')}
              style={styles.imageStyle}
            />
            <View>
              <Text>{item.item_id}</Text>
              {item.origin_city && <Text>Origin: {item.origin_city}</Text>}
              {item.destination_city && <Text>Destination: {item.destination_city}</Text>}
            </View>
          </View>
        </TouchableOpacity>
      }

      {item.name === "school" &&
        <TouchableOpacity onPress={() => navigation.navigate('School', { school_id: item.item_id, user_id: user.id })}>
          <View style={styles.user}>
            <Image
              source={item.logotipo ? { uri: `data:image/png;base64,${item.logotipo}` } : require('../../assets/profile.png')}
              style={styles.imageStyle}
            />
            <View>
              <Text>{item.item_id}</Text>
            </View>
          </View>
        </TouchableOpacity>
      }

      {item.name === "airlines" &&
        <TouchableOpacity onPress={() => navigation.navigate('Airline', { airline_id: item.item_id, user_id: user.id })}>
          <View style={styles.user}>
            <Image
              source={item.logotipo ? { uri: `data:image/png;base64,${item.logotipo}` } : require('../../assets/profile.png')}
              style={styles.imageStyle}
            />
            <View>
              <Text>{item.item_id}</Text>
            </View>
          </View>
        </TouchableOpacity>
      }
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FAVORITES</Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderItems}
        keyExtractor={(item) => item.id}
      />

      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#30FFAE',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    backgroundColor: '#30FFAE', // Adjust the color to match the provided image
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    width: 350,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    top: 20,
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    paddingHorizontal: 10,
  },
  userDetails: {
    color: 'black',
    paddingHorizontal: 10,
  },
});

const Footer = ({ navigation }) => {
  const handleHomePage = () => {
    // Navegar para a homepage
    navigation.navigate('Home');
  };

  const handleSearchPage = () => {
    // Navegar para a página de busca
    navigation.navigate('Search');
  };

  const handleFavoritesPage = () => {
    // Navegar para a página de favoritos
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

export default FavoritesPage;