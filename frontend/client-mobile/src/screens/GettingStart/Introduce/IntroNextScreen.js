import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import styles from './IntroduceStyles';
import { View, Image, Alert } from 'react-native';
import { Container, Content, Button, Text, Form, Item, Input, Label, Picker } from 'native-base';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
// import { AsyncStorage } from 'react-native';



export default function IntroNextScreen(props) {
    const { navigate } = useNavigation();
    const nameWallet = props.navigation.getParam('nameWallet', '');
    const icon = props.navigation.getParam('icon', 'avatar_wallet');
    const unitCurrency = props.navigation.getParam('unitCurrency', 'viet_nam_dong');


    useEffect(() => {
        // const value = AsyncStorage.getItem('TASKS');
        // console.log("Value store ne");
        // console.log(value);
    })

    return (
        <Container>

            <Content style={styles.header}>
                <Text style={styles.title}>Một thói quen</Text>
                <Text style={styles.description}>Mỗi khi bạn có một khoản thu chi, hãy ghi lại nó vào Money Lover</Text>
                <View style={styles.changeAvatar}>
                    <Image source={require('../../../assets/images/wallet-group-icon.png')} style={styles.imageGroup} />
                </View>
                <Button
                    block
                    style={styles.addButton}
                    onPress={() => {
                        navigate('AddBalance', { nameWallet, icon, unitCurrency });
                    }}
                >
                    <Text style={styles.textInButton}>THÊM SỐ DƯ</Text>
                </Button>
            </Content>
        </Container >
    );
}

IntroNextScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};