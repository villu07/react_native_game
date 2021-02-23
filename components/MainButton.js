import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Color from '../constant/Color';

const MainButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.button}>

                <Text style={styles.buttonText}>{props.children}</Text>

            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: Color.primary,
        borderRadius: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
});

export default MainButton
