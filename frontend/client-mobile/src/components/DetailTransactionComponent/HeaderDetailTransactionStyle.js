import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 20,
    },
    buttonPaddingLeft: {
        paddingLeft: 20
    }

});