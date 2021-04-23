import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Color from '../../../constants/Colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    headerStyle: {
        marginTop: 24,
        backgroundColor: Color.greenHeader
    },
    drawerStyles: {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3,
        backgroundColor: 'red'
    },
    containerBookTransaction: {
        flex: 1,
    },
    tabStyle: {
        backgroundColor: Color.greenHeader,
    },
    activeTabStyle: {
        backgroundColor: Color.greenHeader,
    },
    activeTextStyle: {
        fontWeight: 'bold',
        color: Color.textWhite,
        fontSize: 17
    },
    textStyle: {
        color: Color.textWhite,
        fontWeight: '100',
        fontSize: 16,
        opacity: 0.2
    },
    fabStyle: {
        marginLeft: width / 2.5
    }
});