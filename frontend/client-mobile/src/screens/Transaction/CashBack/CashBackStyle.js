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
        marginTop: 28,
        marginLeft: 15,
        backgroundColor: "#fff",
    },
    content: {
        marginTop: 20,
        padding: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '400',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '300',
        textAlign: 'center',
        opacity: 0.5
    },
    txtMoney: {
        fontSize: 40,
        borderBottomColor: Color.iconGrey,
        paddingLeft: 20,
        marginTop: 10
    },

    finishButton: {
        marginTop: 110,
        backgroundColor: Color.backgroundGreen
    },

    headerStyle: {
        marginTop: 24,
        backgroundColor: Color.greenHeader
    },
    txtTitle: {
        fontSize: 18,
        color: Color.titleColor
    },

});