import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useFavoritesClient from '../services/supabaseStore/favorites/favoritesStore';
import useUsersClient from '../services/supabaseStore/users/userStore';
import useCommentsClient from '../services/supabaseStore/comments/commentsStore';

import calcRating from '../utils/calcRating';
import useAirlinesClient from '../services/supabaseStore/airlines/airLinesStore';

const AirLinePage = () => {
  // hooks
  const route = useRoute()
  const { findOneAirline } = useAirlinesClient()
  const { findOneFavorite, createOneFavorite, destroyFavorite } = useFavoritesClient()
  const { findOne } = useUsersClient()
  const { createOneComment, findComments } = useCommentsClient()

  // states
  const [liked, setLiked] = useState(false);
  const [airlineData, setAirlineData] = useState({})
  const [favoriteData, setFavoriteData] = useState({})
  const [refresh, setRefresh] = useState(0)
  const [commentsForm, setCommentsForm] = useState({ rating: 1 })
  const [comments, setComments] = useState([])

  // functions
  useEffect(() => {
    async function getAirline() {
      await findOneAirline(route.params?.airline_id)
        .then((response) => {
          setAirlineData(response)
          setCommentsForm(prev => ({
            ...prev,
            airline_id: response.name
          }))
        })
    }

    async function getUser() {
      await findOne(route.params?.user_id)
        .then((response) => {
          setCommentsForm(prev => ({
            ...prev,
            user_id: response.id,
            photo: response.photo,
            user_name: response.name
          }))
        })
    }

    async function getFavorite() {
      await findOneFavorite(route.params?.airline_id, route.params?.user_id)
        .then((response) => {
          setFavoriteData(response)
          setLiked(response ? true : false)
        })
    }

    async function getComments() {
      await findComments("airlines", route.params?.airline_id)
        .then((response) => {
          console.log("comments", response)
          setComments(response)
        })
    }

    getAirline()
    getFavorite()
    getUser()
    getComments()
  }, [liked, refresh]);

  const renderComment = ({ item }) => (
    <View style={styles.commentsWrapper}>
      <Image source={{ uri: `data:image/png;base64,${item.photo}` }} style={styles.profilePic} />
      <View style={styles.commentText}>
        <Text style={styles.commentName}>{item.user_name}</Text>
        <Text>{item.description}</Text>
      </View>
      <Text style={styles.star2}>
        {item.rating}<FontAwesome name="star" size={20} color="gold" />
      </Text>
    </View>
  );

  const toggleLike = async () => {
    if (!liked) {
      await createOneFavorite({ name: "airline", item_id: airlineData.name, user_id: route.params?.user_id })
        .then(() => setLiked(!liked))
        .catch((err) => alert(err.message))
    } else {
      await destroyFavorite(favoriteData.id)
        .then(() => setLiked(!liked))
        .catch((err) => alert(err))
    }
  }

  const changeComment = (text, key) => {
    setCommentsForm(prev => ({
      ...prev,
      [key]: text
    }))
  }

  const handleComment = async () => {
    if (commentsForm.description !== "") {
      await createOneComment(commentsForm)
        .then(() => {
          setCommentsForm(prev => ({
            ...prev,
            description: ""
          }))
          setRefresh(refresh + 1)
        })
        .catch((err) => alert(err.message))
    }
  }

  const rating = calcRating(comments)


  return (
    <View style={styles.container}>

      <Image source={{ uri: `data:image/png;base64,${airlineData.logotipo}` }} style={styles.userImage} />

      <View style={styles.rsr}>
        <Text style={styles.rating}>{rating > 0 ? rating : "0"}
          <FontAwesome name="star" size={24} color="gold" /></Text>
        <Text style={styles.reviews}>{comments.length} Reviews</Text>
      </View>

      <Text style={styles.airlineTitle}>{airlineData.name}</Text>

      <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
        <Icon name="heart" size={40} color={liked ? 'red' : 'grey'} />
      </TouchableOpacity>

      <View style={styles.separator}></View>

      <Text style={styles.location}>{airlineData.city}, {airlineData.country}</Text>

      <View style={styles.separator2}></View>

      <Text style={styles.commentsTitle}>Comments</Text>

      <View style={styles.commentSection}>
        <TextInput
          style={styles.commentInput}
          value={commentsForm.description}
          placeholder="Write a comment"
          onChangeText={text => changeComment(text, "description")}
        />

        <TouchableOpacity onPress={() => changeComment(1, "rating")} >
          <FontAwesome name="star" size={20} color={commentsForm.rating >= 1 ? "gold" : "grey"} style={styles.star} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeComment(2, "rating")} >
          <FontAwesome name="star" size={20} color={commentsForm.rating >= 2 ? "gold" : "grey"} style={styles.star} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeComment(3, "rating")} >
          <FontAwesome name="star" size={20} color={commentsForm.rating >= 3 ? "gold" : "grey"} style={styles.star} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeComment(4, "rating")} >
          <FontAwesome name="star" size={20} color={commentsForm.rating >= 4 ? "gold" : "grey"} style={styles.star} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeComment(5, "rating")} >
          <FontAwesome name="star" size={20} color={commentsForm.rating >= 5 ? "gold" : "grey"} style={styles.star} />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20, marginTop: 220 }}>
        <TouchableOpacity onPress={handleComment} style={styles.button}>
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator3}></View>

      <View style={styles.commentContainer}>
        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={renderComment}
          horizontal={false}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30FFAE',
  },
  userImage: {
    alignSelf: 'center',
    marginTop: 59,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#cccccc',
  },
  rsr: {
    position: 'absolute',
    top: 70,
    right: 20,
    alignItems: 'center',
  },
  rating: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  reviews: {
    color: 'grey',
  },
  airlineTitle: {
    position: 'absolute',
    marginTop: 270,
    fontWeight: 'bold',
    fontSize: 32,
    marginHorizontal: 20,
  },
  likeButton: {
    position: 'absolute',
    marginTop: 270,
    right: 30,
  },
  separator: {
    position: 'absolute',
    width: 335,
    height: 1,
    backgroundColor: 'black',
    marginTop: 320,
    marginLeft: 20,
  },
  location: {
    position: 'absolute',
    color: 'black',
    marginHorizontal: 25,
    marginTop: 355,
    fontSize: 18,
  },
  separator2: {
    position: 'absolute',
    width: 335,
    height: 1,
    backgroundColor: 'black',
    marginTop: 410,
    marginLeft: 20,
  },
  commentsTitle: {
    position: 'absolute',
    marginTop: 420,
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  commentSection: {
    position: 'absolute',
    marginTop: 460,
    flexDirection: 'row',
  },
  commentInput: {
    height: 43,
    width: 250,
    borderColor: '#2B8B5D',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
  },
  star: {
    right: 10,
    top: 10,
  },
  separator3: {
    position: 'absolute',
    width: 335,
    height: 1,
    backgroundColor: 'black',
    marginTop: 560,
    marginLeft: 20,
  },
  commentContainer: {
    position: 'relative',
    marginTop: 1,
    padding: 10,
    maxHeight: 190,
  },
  commentsWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  commentText: {
    marginHorizontal: 10,
  },
  commentName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  star2: {
    position: 'absolute',
    right: 20,
  },
  button: {
    width: '50%', // Button width is half of the container width
    height: 37,
    backgroundColor: '#2B8B5D',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15, // Add space above the button
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  }
});


export default AirLinePage;
