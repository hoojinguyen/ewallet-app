import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

import Color from '../../constants/Colors'

export default StyleSheet.create({
    headerStyle: {
        marginTop: 24,
        backgroundColor: Color.headerColor
    },
    txtTitle: {
        color: Color.titleColor
    },
    txtSave: {
        color: Color.successColor
    },
    lblMoney: {
        fontSize: 16,
        fontWeight: '100',
        opacity: 0.5
    },
    txtMoney: {
        fontSize: 40,
        borderBottomColor: Color.iconGrey
    },
    imgDisplay: {
        width: 35,
        height: 35
    },
    txtGroup: {
        fontSize: 22,
        paddingBottom: 10,
        borderBottomColor: Color.iconGrey
    },
    txtAnother: {
        fontSize: 18,
        paddingBottom: 10,
        borderBottomColor: Color.iconGrey
    },
    txtDateTime: {
        fontSize: 18
    },
    iconDisplay: {
        fontSize: 28,
        color: Color.iconGrey
    },
    listInputCategory: {
        backgroundColor: Color.whiteColor,
        marginTop: 20
    },
    groupRadio: {
        flexDirection: 'row',
        marginLeft: width / 8
    },
    radio: {
        flexDirection: 'row',
        marginRight: 40
    },
    radioTitle: {
        marginRight: 10
    },
    picker: {
        marginLeft: 5,

    },
    groupButton: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

