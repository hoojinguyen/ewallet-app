import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import color from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    containerDetailTransaction: {
        flex: 1,
        backgroundColor: color.backGround,
    },
    contentTransaction: {
        marginTop: 20,
    },
    cardStyle: {
        marginBottom: 20,
        alignItems: 'center',
        paddingTop: 10
    },
    textBold: {
        fontSize: 32,
        fontWeight: '600',
    },
    textRedMedium: {
        fontSize: 32,
        color: 'red',
        fontWeight: '300'
    },
    textPrimaryMedium: {
        fontSize: 32,
        color: color.tintColor,
        fontWeight: '300'
    },
    lineStyle: {
        borderWidth: 1,
        opacity: 1,
        borderColor: 'black',
        marginLeft: width / 5,
        marginBottom: 15
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 25,
        marginLeft: width / 20
    },
    progressBar: {
        width: width - 20
    },
    textSmallGreen: {
        fontSize: 14,
        color: 'green',
        fontWeight: '400'
    },
});