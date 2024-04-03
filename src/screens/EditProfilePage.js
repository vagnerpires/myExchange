import React, { useState, useEffect, useContext } from 'react';
import { TextInput, TouchableOpacity, Text, Platform, KeyboardAvoidingView, ScrollView, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ArrowLeftIcon } from 'react-native-heroicons/solid';

import DatePicker from '@react-native-community/datetimepicker';

import * as ImagePicker from 'expo-image-picker';
import { userContext, userContextProps } from '../context/userContext';

import useUsersClient from '../services/supabaseStore/users/userStore';
import useAirlinesClient from '../services/supabaseStore/airlines/airLinesStore';
import useSchoolsClient from '../services/supabaseStore/schools/schoolsStore';

const EditProfilePage = () => {

    // hooks
    const navigation = useNavigation();
    const { update } = useUsersClient()
    const userID = useContext(userContext)
    const [, setUserID] = useContext(userContextProps)
    const { findOne } = useUsersClient()
    const { findAirLines } = useAirlinesClient()
    const { findSchools } = useSchoolsClient()

    // states
    const [isLoading, setIsLoading] = useState(true)
    const [showSchoolPicker, setShowSchoolPicker] = useState(false);
    const [showAirlinesPicker, setShowAirlinesPicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePickerArrival, setShowDatePickerArrival] = useState(false);
    const [dataForm, setDataForm] = useState([])
    const [airLines, setAirLines] = useState([])
    const [schools, setSchools] = useState([])

    // functions
    useEffect(() => {
        async function getUser() {
            await findOne(userID.id)
                .then((response) => {
                    setDataForm({
                        id: response.id,
                        name: response.name,
                        birthdate: response.birthdate,
                        destination_city: response.destination_city,
                        destination_country: response.destination_country,
                        date_arrival: response.date_arrival,
                        origin_city: response.origin_city,
                        origin_country: response.origin_country,
                        whatsapp: response.whatsapp,
                        school_id: response.school_id,
                        airlines_id: response.airlines_id,
                        photo: response.photo,
                    })
                })
        }

        async function getAirlines() {
            await findAirLines()
                .then((response) => setAirLines(response))
        }

        async function getSchools() {
            await findSchools()
                .then((response) => setSchools(response))
        }

        getUser()
        getAirlines()
        getSchools()
        setIsLoading(false)
    }, [userID]);


    const saveProfile = async () => {
        await update(dataForm)
            .then(() => {
                setUserID(dataForm)
                navigation.navigate("Home")
            })
            .catch((err) => {
                alert(`Error: ${err.message}`)
            })
    }

    function onChangeForm(key, value) {
        setDataForm(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleChoosePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            onChangeForm("photo", result.assets[0].base64);
        }
    }

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dataForm.birthdate
        setShowDatePicker(Platform.OS === 'ios');
        onChangeForm("birthdate", currentDate);
    }

    const handleDateArrivalChange = (event, selectedDate) => {
        const currentDate = selectedDate || dataForm.date_arrival
        setShowDatePickerArrival(Platform.OS === 'ios');
        onChangeForm("date_arrival", currentDate);
    };

    const handleSelectSchool = (schoolName) => {
        onChangeForm("school_id", schoolName);
        setShowSchoolPicker(false);
    };

    const handleSelectAirlines = (airLinesName) => {
        onChangeForm("airlines_id", airLinesName);
        setShowAirlinesPicker(false);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>

            <ScrollView contentContainerStyle={styles.contentContainer}>

                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.buttonBack}>
                    <ArrowLeftIcon size="25" color="black" />
                </TouchableOpacity>

                {isLoading &&
                    <Text>
                        Loading data....
                    </Text>
                }

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={dataForm.name}
                    // onChangeText={e => onChangeForm("name", e)}
                    editable={false}
                />

                <TouchableOpacity
                    style={[styles.input, styles.datePickerInput]}
                    onPress={() => setShowDatePicker(true)}
                >

                    <Text style={[styles.dateText, { color: dataForm.birthdate ? 'black' : '#A9A9A9' }]}
                    >
                        {dataForm.birthdate ? new Date(dataForm.birthdate).toDateString() : 'Birthdate'}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DatePicker
                        value={dataForm.birthdate ? new Date(dataForm.birthdate) : new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Destination City"
                    value={dataForm.destination_city}
                    onChangeText={e => onChangeForm("destination_city", e)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Destination Country"
                    value={dataForm.destination_country}
                    onChangeText={e => onChangeForm("destination_country", e)}
                />

                <TouchableOpacity
                    style={[styles.input, styles.datePickerInput]}
                    onPress={() => setShowDatePickerArrival(true)}
                >
                    <Text style={[styles.dateText, { color: dataForm.date_arrival ? 'black' : '#A9A9A9' }]}>
                        {dataForm.date_arrival ? new Date(dataForm.date_arrival).toDateString() : 'Date Arrival'}
                    </Text>
                </TouchableOpacity>

                {showDatePickerArrival && (
                    <DatePicker
                        value={dataForm.date_arrival ? new Date(dataForm.date_arrival) : new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateArrivalChange}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Origin City"
                    value={dataForm.origin_city}
                    onChangeText={e => onChangeForm("origin_city", e)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Origin Country"
                    value={dataForm.origin_country}
                    onChangeText={e => onChangeForm("origin_country", e)}
                />

                <TextInput
                    style={styles.whatsappInput}
                    placeholder="WhatsApp number"
                    value={dataForm.whatsapp}
                    onChangeText={e => onChangeForm("whatsapp", e)}
                    keyboardType="phone-pad"
                />

                <TouchableOpacity onPress={() => setShowSchoolPicker(true)} style={styles.input}>
                    <Text style={[styles.dateText2, { color: dataForm.school_id ? 'black' : '#A9A9A9' }]}>
                        {dataForm.school_id || "School"}
                    </Text>

                </TouchableOpacity>
                <Modal
                    visible={showSchoolPicker}
                    animationType="slide"
                    onRequestClose={() => setShowSchoolPicker(false)}>
                    <FlatList
                        data={schools}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectSchool(item.name)}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Modal>

                <TouchableOpacity onPress={() => setShowAirlinesPicker(true)} style={styles.input}>
                    <Text style={[styles.dateText2, { color: dataForm.airlines_id ? 'black' : '#A9A9A9' }]}>
                        {dataForm.airlines_id || "Airlines"}
                    </Text>

                </TouchableOpacity>
                <Modal
                    visible={showAirlinesPicker}
                    animationType="slide"
                    onRequestClose={() => setShowAirlinesPicker(false)}>
                    <FlatList
                        data={airLines}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectAirlines(item.name)}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Modal>

                <TouchableOpacity style={styles.uploadButton} onPress={handleChoosePhoto}>
                    <Text style={styles.uploadButtonText}>{dataForm.photo ? 'Photo Selected' : 'Upload your photo'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={saveProfile} style={styles.button}>
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = {
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center', // Alinha os filhos do ScrollView no centro do eixo transversal (horizontal)
        justifyContent: 'center', // Justifica o conteúdo no centro do eixo principal (vertical)
        backgroundColor: '#30FFAE',
        padding: 20,
    },
    buttonBack: {
        alignSelf: 'flex-start',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        top: 20,
    },
    input: {
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        paddingLeft: 10,
        fontSize: 15,
        backgroundColor: '#fff',
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
    },
    datePickerInput: {
        justifyContent: 'center', // Center the text inside the input
        height: 43, // Set the input height
        marginTop: 15, // Add space between inputs
    },
    dateText: {
        fontSize: 15,
        paddingLeft: 0,
        justifyContent: 'center'
    },
    dateText2: {
        fontSize: 15,
        paddingLeft: 0,
        justifyContent: 'center',
        marginTop: 8
    },
    phoneSection: {
        flexDirection: 'row',
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        backgroundColor: '#fff',
        paddingLeft: 10,
    },
    countryPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        flex: 1,
        height: '100%',
    },
    countryCodeText: {
        fontSize: 15,
        marginLeft: 10,
        color: 'black',
    },
    whatsappInput: {
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        paddingLeft: 10,
        fontSize: 15,
        backgroundColor: '#fff',
    },
    uploadButton: {
        width: '100%',
        height: 43,
        borderColor: '#2B8B5D',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 15,
        justifyContent: 'center', // Centraliza o texto verticalmente
        backgroundColor: '#fff',
    },
    uploadButtonText: {
        fontSize: 15,
        color: '#A9A9A9',
        paddingLeft: 10,
    },
};

export default EditProfilePage;
