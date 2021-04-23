import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Color from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    headerStyle: {
        marginTop: 24,
        backgroundColor: Color.successColor
    },
    txtTitle: {
        color: 'white'
    },
    txtSave: {
        color: Color.successColor
    },
    txtTitleCategory: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    thumbnail: {
        width: 30,
        height: 30
    },
    fabStyle: {
        // marginLeft: width / 2.5
    },
    scene1: {
        flex: 1,
        backgroundColor: '#ff4081'
    },
    scene2: {
        flex: 1,
        backgroundColor: '#673ab7'
    },
});