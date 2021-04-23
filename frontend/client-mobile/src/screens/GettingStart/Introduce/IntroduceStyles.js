import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Color from '../../../constants/Colors';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        marginTop: height / 10,
        padding: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        opacity: 0.5,
        fontWeight: '100',
        lineHeight: 20
    },
    changeAvatar: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageAvatar: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    textChangeAvatar: {
        color: '#000',
        fontSize: 18,
        fontWeight: '300',
        opacity: 0.5
    },
    form: {
        margin: 5,

    },
    picker: {
        marginLeft: 5,
        marginTop: 20,
    },
    nextButton: {
        marginTop: 30,
        backgroundColor: Color.backgroundGreen
    },
    textInButton: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    imageGroup: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    addButton: {
        marginTop: 140,
        backgroundColor: Color.backgroundGreen
    }


});