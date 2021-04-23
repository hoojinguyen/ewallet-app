import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
import color from '../../constants/Colors'

export default StyleSheet.create({
    content: {
        backgroundColor: color.headerColor,
    },
    contentNoTransaction: {
        marginTop: height / 5
    },
    thumbnail: {
        width: 140,
        height: 140,
        marginLeft: width / 3
    },
    textNoTransaction: {
        fontSize: 20,
        fontWeight: '400',
        marginTop: 20,
        textAlign: 'center'
    }
});