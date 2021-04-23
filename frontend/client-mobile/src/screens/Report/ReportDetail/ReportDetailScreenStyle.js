

import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Color from '../../../constants/Colors';

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
});