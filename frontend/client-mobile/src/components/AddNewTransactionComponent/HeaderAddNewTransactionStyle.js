import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Color from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        alignItems: "center",
        marginTop: 25,
        height: 50,
    },
    txtTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    iconDisplay: {
        fontSize: 26,
        paddingLeft: 10

    },
    lineStyle: {
        borderWidth: 0.5,
        opacity: 0.2,
        borderColor: 'black',
        marginLeft: width / 5,
        marginBottom: 15
    },
});