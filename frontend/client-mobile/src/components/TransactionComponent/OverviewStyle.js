import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Color from '../../constants/Colors';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    reportGroup: {
        backgroundColor: 'white',
        marginBottom: 40
    },
    surplus: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 10,
    },
    buttonWatchReport: {
        alignItems: 'center',
        marginTop: 10
    },
    textWatchReport: {
        color: Color.successColor,
        fontWeight: 'bold',
    },
    lineStyle: {
        borderWidth: 0.8,
        opacity: 0.2,
        borderColor: 'black',
        marginLeft: width / 2,
        marginRight: 20,
        marginTop: 10
    },
    textOpacity: {
        opacity: 0.5
    }
});