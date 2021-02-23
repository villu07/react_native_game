import React from 'react';
import { Text, View, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import Color from '../constant/Color';
import MainButton from '../components/MainButton'
const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={styles.textResult}>The Game is Over</Text>
                <View style={styles.imagecontainer}>
                    <Image
                        //source={require('../assets/success.png')}
                        source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" }}
                        style={styles.image1}
                        resizeMode="cover" />
                </View>
                <View style={styles.resultContainer}>
                    <Text style={styles.textResult}>Your phone needed<Text style={styles.highlight}> {props.roundsNumber} </Text>rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.</Text>
                </View>
                <MainButton onPress={props.onRestart} >NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    imagecontainer: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.6,
        borderRadius: Dimensions.get('window').width * 0.6 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30,
    },

    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    textResult: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    image1: {
        width: '100%',
        height: '100%'
    },
    highlight: {
        color: Color.primary
    }
});

export default GameOverScreen
