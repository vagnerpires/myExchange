import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useUsersClient from '../services/supabaseStore/users/userStore';
import useAirlinesClient from '../services/supabaseStore/airlines/airLinesStore';
import useSchoolsClient from '../services/supabaseStore/schools/schoolsStore';
import { userContext } from '../context/userContext';

const SearchPage = ({ navigation }) => {

    // states
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState("users")
    const [filter, setFilter] = useState([])

    const [data, setData] = useState([])

    // hooks
    const { findAll } = useUsersClient()
    const { findAirLines } = useAirlinesClient()
    const { findSchools } = useSchoolsClient()
    const user = useContext(userContext)

    // functions
    useEffect(() => {
        async function getData() {
            switch (filterType) {
                case "users":
                    await findAll()
                        .then((response) => {
                            setData(response)
                        })
                    break;
                case "schools":
                    await findSchools()
                        .then((response) => {
                            setData(response)
                        })
                    break;
                case "airlines":
                    await findAirLines()
                        .then((response) => {
                            setData(response)
                        })
                    break;
                default:
                    break;
            }
        }
        getData()
    }, [filterType, searchText])

    const handleSearch = (text) => {
        setSearchText(text)
        const filter = text

        if (searchText !== "") {
            setFilter(data.filter(fil => fil.name.toLowerCase().includes(filter.toLowerCase())))
        }
    };

    const renderItems = ({ item }) => (
        <View>
            {filterType === "users" &&
                <TouchableOpacity onPress={() => navigation.navigate("UserPageHome", { user_id: item.id, user_name: item.name })}>
                    <View style={styles.user}>
                        <Image
                            source={item.photo ? { uri: `data:image/png;base64,${item.photo}` } : require('../../assets/profile.png')}
                            style={styles.imageStyle}
                        />
                        <View>
                            <Text>{item.name}</Text>
                            {item.origin_city && <Text>Origin: {item.origin_city}</Text>}
                            {item.destination_city && <Text>Destination: {item.destination_city}</Text>}
                        </View>
                    </View>
                </TouchableOpacity>
            }

            {filterType === "schools" &&
                <TouchableOpacity onPress={() => navigation.navigate('School', { school_id: item.name, user_id: user.id })}>
                    <View style={styles.user}>
                        <Image
                            source={item.logotipo ? { uri: `data:image/png;base64,${item.logotipo}` } : require('../../assets/profile.png')}
                            style={styles.imageStyle}
                        />
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            }

            {filterType === "airlines" &&
                <TouchableOpacity onPress={() => navigation.navigate('Airline', { airline_id: item.name, user_id: user.id })}>
                    <View style={styles.user}>
                        <Image
                            source={item.logotipo ? { uri: `data:image/png;base64,${item.logotipo}` } : require('../../assets/profile.png')}
                            style={styles.imageStyle}
                        />
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            }
        </View>

    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={text => handleSearch(text)}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Image source={require('../../assets/search.png')} style={styles.searchIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={filterType}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue) => setFilterType(itemValue)}
                >
                    <Picker.Item label="Users" value="users" />
                    <Picker.Item label="Schools" value="schools" />
                    <Picker.Item label="Airlines" value="airlines" />
                </Picker>
            </View>

            <FlatList
                data={searchText === "" ? data : filter}
                renderItem={renderItems}
                keyExtractor={(item) => item.id.toString()}
            />

            <Footer navigation={navigation} />
        </View>
    );
};

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

// Adicionei o StyleSheet para organizar melhor os estilos.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#30FFAE',
        paddingTop: 50,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    pickerContainer: {
        width: '40%',
        marginTop: 10,
    },
    pickerStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 15,
        paddingLeft: 15,
        paddingRight: 50,
        fontSize: 15,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    searchIcon: {
        position: 'absolute',
        width: 30,
        height: 30,
        right: 20,
        top: -15,
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
});

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
export default SearchPage;