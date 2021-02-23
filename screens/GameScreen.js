import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/MainButton';
import Color from '../constant/Color'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};
const renderListItem = (value, numberOfRounds) => (
    <View key={value} style={styles.listItem}>
        <Text>#{numberOfRounds}</Text>
        <Text>{value}</Text>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [passGuesses, setPassGuesses] = useState([initialGuess]);
    const [availableHeight, setAvailableHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    });
    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(passGuesses.length);
        }
    }, [currentGuess, props]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie !', 'You Know that this is Wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds => curRounds + 1);
        setPassGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    }
    if (availableHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <View style={styles.button}><MainButton onPress={nextGuessHandler.bind(this, 'lower')} ><Ionicons name="md-remove" color="white" size={24} /></MainButton></View>
                    <Text>{currentGuess}</Text>
                    <View style={styles.button}><MainButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" color="white" size={24} /></MainButton></View>
                </View>
                <View style={styles.list}>
                    <ScrollView>
                        {passGuesses.map((guess, index) => renderListItem(guess, passGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <Text>{currentGuess}</Text>
            <View style={styles.buttonContainer}>
                <View style={styles.button}><MainButton onPress={nextGuessHandler.bind(this, 'lower')} ><Ionicons name="md-remove" color="white" size={24} /></MainButton></View>
                <View style={styles.button}><MainButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" color="white" size={24} /></MainButton></View>
            </View>
            <View style={styles.list}>
                <ScrollView>
                    {passGuesses.map((guess, index) => renderListItem(guess, passGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        width: 600,
        maxWidth: '90%',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
    list: {
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        color: 'white',
        flex: 1,
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        borderWidth: 1,
        marginVertical: 10,
        backgroundColor: Color.primary,
        flexDirection: 'row',
        justifyContent: 'space-around'

    }

});

export default GameScreen
