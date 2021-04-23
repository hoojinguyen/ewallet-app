import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Color from '../../constants/Colors';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    bodyHeader: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Color.greenHeader,
    },
    groupTouchableOpacity: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    groupText: {
        flexDirection: "column",
    },
    textName: {
        fontSize: 16,
        fontWeight: '100',
        color: Color.textWhite,
        opacity: 0.5,
        textAlign: 'center'
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
        paddingLeft: 50,
        paddingTop: 5,
        marginRight: 10,
        flexDirection: 'row'
    },
    groupIcon: {
        flexDirection: 'row',
        marginRight: 10
    }
})