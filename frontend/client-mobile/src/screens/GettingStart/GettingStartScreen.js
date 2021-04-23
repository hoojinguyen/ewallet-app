import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import styles from './GettingStartStyle';
import { Image, Platform, ScrollView, Text, View, Button, Alert } from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

export default function GettingStartScreen() {
    const { navigate } = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.welcomeContainer}>
                    <Image source={require('../../assets/images/wallet-icon.png')} style={styles.welcomeImage} />
                </View>
                <View style={styles.getStartedContainer}>
                    <Text style={styles.getStartedTextBig}>Quản lý tài chính hiệu quả với Money Lover</Text>
                    <Text style={styles.getStartedTextSmall}>Đăng nhập để truy cập vào dữ liệu của bạn trên tất cả các thiết bị</Text>
                </View>
                <View style={styles.buttonGettingStart}>
                    <Button color="#000" title="LẦN ĐẦU SỬ DỤNG MONEY LOVER"
                        onPress={() => {
                            navigate('Register');
                        }}
                    />
                </View>
                <View style={styles.buttonGettingStart}>
                    <Button color="#000" title="ĐÃ SỬ DỤNG MONEY LOVER"
                        onPress={() => {
                            navigate('Login');
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

GettingStartScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};

function handleRedirectSignIn() {
    Alert.alert('Hello Tee');
}

function handleRedirectSignUp() {
    Alert.alert('Hello Hoi Max');
}


