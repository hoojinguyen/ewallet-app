import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
import color from '../../constants/Colors'

export default StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: color.backGround
    },
    txtMoneyPrimary1: {
        color: color.tintColor,
    },
    txtMoneyPrimary2: {
        textDecorationLine: 'line-through',
        color: color.tintColor,
    },
    txtMoneyDanger1: {
        color: "red",
    },
    txtMoneyDanger2: {
        textDecorationLine: 'line-through',
        color: "red",
    },
    txtName: {
        fontWeight: 'bold'
    },
    title: {
        color: "grey",
        fontSize: 14,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        textTransform: "uppercase"
    },
    titlePrimary: {
        color: color.tintColor,
        fontSize: 14
    },
    titleDanger: {
        color: "red",
        fontSize: 14
    },
    thumbnail: {
        width: 40,
        height: 40
    },
    listItem: {
        backgroundColor: "white",
        marginTop: 5,
        marginLeft: 0,
        paddingLeft: 20
    }
});