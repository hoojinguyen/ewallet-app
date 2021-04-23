import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
const { width } = Dimensions.get('window');
import color from '../../constants/Colors'

export default StyleSheet.create({
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
        color: color.tintColor,
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