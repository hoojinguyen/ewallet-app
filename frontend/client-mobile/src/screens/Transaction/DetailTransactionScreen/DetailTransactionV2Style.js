import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

import Color from '../../../constants/Colors'

export default StyleSheet.create({
    headerStyle: {
        marginTop: 24,
        backgroundColor: Color.headerColor
    },
    container: {
        flex: 1,
        marginTop: 40,
        marginLeft: 20
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 40
    },
    thumbnailLarge: {
        width: 60,
        height: 60
    },
    thumbnailSmall: {
        width: 40,
        height: 40,
        marginLeft: 10
    },
    thumbnailSmallSquare: {
        width: 25,
        height: 25,
        marginLeft: 20
    },
    title: {
        fontSize: 26,
        color: Color.defaultColor,
        fontWeight: '100',
        paddingLeft: 40,
        marginTop: 10
    },
    txtPrimary: {
        color: Color.primaryColor,
        fontWeight: '500',
        fontSize: 26,
        paddingLeft: 40,
    },
    txtDanger: {
        color: Color.dangerColor,
        fontWeight: '500',
        fontSize: 26,
        paddingLeft: 40,
    },
    txtDefault: {
        color: Color.defaultColor,
        fontSize: 16,
        paddingLeft: 50,
    },


    progressBar: {
        width: width - 20
    },
    cardStyle: {
        marginBottom: 20,
        alignItems: 'center',
        paddingTop: 10
    },
    btnSuccess: {
        marginRight: 20
    }
});

