import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import Color from '../constants/Colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 30,
        alignContent: 'center',
    },

    infoUser: {
        // flex: 3,
        alignContent: 'center',
        flexDirection: 'column',
        justifyContent: "center",
        marginLeft: 40,
        marginTop: 40
    },
    imgAvatar: {
        width: 60,
        height: 60,
        marginLeft: 60
    },
    textNameUser: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20
    },
    textEmail: {
        fontSize: 14,
        opacity: 0.5,
        marginLeft: 10
    },
    titleDrawer: {
        fontSize: 16,
        fontWeight: '400',
        padding: 20
    }
});