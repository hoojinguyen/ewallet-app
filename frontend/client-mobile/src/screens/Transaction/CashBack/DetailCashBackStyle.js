import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Color from '../../../constants/Colors';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
    headerStyle: {
        marginTop: 24,
        backgroundColor: Color.greenHeader
    },
    txtTitle: {
        fontSize: 18,
        color: Color.textWhite
    },
    content: {
        backgroundColor: 'white',
        marginBottom: 40
    },
    thumbnail: {
        width: 40,
        height: 40
    },
    textBlackBold: {
        fontWeight: 'bold',
        color: 'black'
    },
    textRedBold: {
        fontWeight: 'bold',
        color: 'red'
    },
    textRedMedium: {
        color: 'red',
        fontWeight: '200'
    },
    textPrimaryMedium: {
        color: Color.tintColor,
        fontWeight: '200'
    },
    textDay: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 15
    },
    textWeekDays: {
        fontWeight: 'bold',
        opacity: 0.5
    },
    textMonthAndYear: {
        fontWeight: '100',
        opacity: 0.5
    }

});