import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

import Color from '../../../constants/Colors'

const MergeCategory = StyleSheet.create({
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
    txtTitleCategory: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    thumbnail: {
        width: 30,
        height: 30
    },
    txtGroup: {
        fontSize: 18
    }
});

export {
    MergeCategory
}