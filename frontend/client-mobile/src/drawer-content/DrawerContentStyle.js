import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
// import Color from '../../../constants/Colors';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 12,
        backgroundColor: '#f8f8f8',
    },
    infoUser: {
        flex: 3,
        alignContent: 'center',
        flexDirection: 'column',
        justifyContent: "center",
        marginLeft: 20,
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
    listFeature: {
        flex: 9
    }
});