import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Color from '../../constants/Colors';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
    headerStyle: {
        marginTop: 24,
        backgroundColor: Color.headerColor
    },
    txtTitle: {
        color: "#000"
    },
    list: {
        marginTop: 20,

        flexDirection: 'row',
        justifyContent: "flex-start",
        flexWrap: 'wrap'
    },
    item: {
        marginLeft: 25,
        marginTop: 30
    }



});