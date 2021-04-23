import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Color from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.greenHeader,
    },
    groupText: {
        flexDirection: "column",
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.textWhite,
        opacity: 1,
        textAlign: 'center',
        marginTop:20
    },
    textMoney: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.textWhite,
    },
    imageWallet: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
    imageGroup: {
        paddingTop: 10,
        paddingLeft: width / 35
    },
    groupIcon: {
        flexDirection: 'row',
        paddingTop: 20,
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
    },
    reportGroup: {
        backgroundColor: 'white',
        marginBottom: 40
    },
    surplus: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 10,
    },
    buttonWatchReport: {
        alignItems: 'center',
        marginTop: 10
    },
    textWatchReport: {
        color: '#2f95dc',
        fontWeight: 'bold',
    },
    lineStyle: {
        borderWidth: 0.8,
        opacity: 0.2,
        borderColor: 'black',
        marginLeft: width / 2,
        marginRight: 20,
        marginTop: 10
    },
    textOpacity: {
        opacity: 0.5
    }



});