import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    containerBookTransaction: {
        flex: 1,
    },
    header: {
        marginTop: height / 10,
        padding: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        opacity: 0.5,
        fontWeight: '100',
        lineHeight: 20
    },
    changeAvatar: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageAvatar: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    textChangeAvatar: {
        color: '#000',
        fontSize: 18,
        fontWeight: '300',
        opacity: 0.5
    },
    form: {
        margin: 5,
    },
    picker: {
        marginLeft: 5,
        marginTop: 20,
    },
    nextButton: {
        marginTop: 30,
        backgroundColor: "#565353"
    },
    textInButton: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    imageGroup: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    addButton: {
        marginTop: 140,
        backgroundColor: "#565353"
    },
    tabStyle: {
        backgroundColor: '#FFFFFF'
    },
    activeTabStyle: {
        backgroundColor: '#FFFFFF'
    },
    activeTextStyle: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 17
    },
    textStyle: {
        color: '#000',
        fontWeight: '100',
        fontSize: 16,
        opacity: 0.2
    },
    containerDetailTransaction: {
        flex: 1,
        backgroundColor: '#DCDCDC',
    },
    contentTransaction: {
        backgroundColor: '#DCDCDC',
        marginTop: 20,
    },
    textBold: {
        fontSize: 32,
        fontWeight: '600',
    },
    textMediumRed: {
        fontSize: 32,
        color: 'red',
        fontWeight: '300'
    },
    textSmallRed: {
        fontSize: 14,
        color: 'red',
        fontWeight: '400'
    },
    textSmallGreen: {
        fontSize: 14,
        color: 'green',
        fontWeight: '400'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 25,
        marginLeft: width / 20
    },
    lineStyle: {
        borderWidth: 0.5,
        opacity: 0.2,
        borderColor: 'black',
        marginLeft: width / 5,
        marginBottom: 15
    },
    progressBar: {
        width: width - 20
    },
    cardStyle: {
        marginBottom: 20,
        alignItems: 'center',
        paddingTop: 10
    }
});