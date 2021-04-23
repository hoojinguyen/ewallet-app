import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

import Color from '../../../constants/Colors'

const DetailCategory = StyleSheet.create({
    headerStyle: {
        marginTop: 24,
        backgroundColor: Color.headerColor
    },
    thumbnail: {
        width: 30,
        height: 30
    },
    title: {
        fontSize: 20,
        fontWeight: '300',
        marginLeft: 40
    },
    container: {
        flex: 1,
        marginTop: 40,
        marginLeft: 20
    },
    itemStyle: {
        flexDirection: 'row',
        marginBottom: 20
    },
    itemChildStyle: {
        flexDirection: 'column'
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '100',
        paddingTop: 5,
        marginLeft: 40,
        opacity: 0.5
    },
    textRed: {
        color: 'red',
        fontWeight: '400',
        marginLeft: 40
    },
    groupButton: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export {
    DetailCategory
}