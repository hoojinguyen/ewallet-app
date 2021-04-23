import { StyleSheet } from 'react-native';
import Color from '../../constants/Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.backgroundGreen,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 150,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },

    getStartedTextBig: {
        fontSize: 24,
        color: '#fff',
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    getStartedTextSmall: {
        fontSize: 17,
        color: '#fff',
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 10,
        opacity: 0.5,
        marginBottom: 60,
    },
    buttonGettingStart: {
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
    },
});
