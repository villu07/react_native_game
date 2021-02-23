import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Platform, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'

import Input from '../components/Input'
import MainButton from '../components/MainButton'
import Colors from '../constant/Color'
const StartGameScreen = props => {
    const [enteredNumber, setEnteredNumber] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [availableWidth, setAvailableWidth] = useState(Dimensions.get('window').width / 4)

    useEffect(() => {

        const updateWidth = () => {
            setAvailableWidth(Dimensions.get('window').width / 4)
            console.log(availableWidth)
        }
        Dimensions.addEventListener('change', updateWidth)
        return () => {
            console.log(Dimensions.get('window').width / 4)
            Dimensions.removeEventListener('change', updateWidth)
        }
    });

    const numberInputHandler = inputText => {
        setEnteredNumber(inputText.replace(/[^0-9]/g, ''));
    };
    const resetInputHandler = () => {
        setEnteredNumber('');
        setConfirm(false);
    }
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 'Number has to be a number between 1 to 99.', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
        }
        setConfirm(true);
        setSelectedNumber(chosenNumber);
        setEnteredNumber('');
        Keyboard.dismiss();

    }
    let confirmedOutput;
    if (confirm) {
        confirmedOutput = (
            <View style={Platform.OS == 'android' ? styles.inputContainerforandroid : styles.inputContainerforapple}>
                <Text>Chosen Number</Text>
                <Text>{selectedNumber}</Text>
                <MainButton onPress={() => props.onStartGame(selectedNumber)} > START GAME </MainButton>
            </View >
        );
    }

    return (

        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game!</Text>
                        <View style={Platform.OS === 'android' ? styles.inputContainerforandroid : styles.inputContainerforapple}>
                            <Text>Select a Number</Text>
                            <Input style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredNumber} />

                            <View style={styles.buttonContainer}>
                                <View style={{ width: availableWidth }}>
                                    <Button title="Reset" color={Colors.accent} onPress={resetInputHandler} />
                                </View>
                                <View style={{ width: availableWidth }}>
                                    <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler} />
                                </View>
                            </View>
                        </View>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainerforapple: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },

    inputContainerforandroid: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    input: {
        width: 50,
        textAlign: 'center'
    }
})
export default StartGameScreen
