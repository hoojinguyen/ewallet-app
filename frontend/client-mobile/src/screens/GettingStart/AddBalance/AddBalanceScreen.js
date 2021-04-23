import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import styles from './AddBalanceStyle';
import { View, Image, Alert, TextInput } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function AddBalanceScreen(props) {
    const { navigate, goBack } = useNavigation();

    const nameWallet = props.navigation.getParam('nameWallet', '');
    const icon = props.navigation.getParam('icon', 'avatar_wallet');
    const unitCurrency = props.navigation.getParam('unitCurrency', 'viet_nam_dong');

    const [balance, setBalance] = useState('');

    function finnishAction() {
        navigate('Transaction', { balance, nameWallet, icon, unitCurrency });
    }

    return (
        <Container>
            <View style={styles.header}>
                <Button
                    transparent
                    onPress={() => goBack()}
                >
                    <Icon name='arrow-left' size={24} />
                </Button>
            </View>
            <Content style={styles.content}>
                <Text style={styles.title}>Số dư</Text>
                <Text style={styles.subTitle}>Nhập số dư cho ví của bạn</Text>
                <TextInput
                    value={balance}
                    onChangeText={money => { setBalance(money) }}
                    style={styles.txtMoney}
                    borderBottomWidth={1}
                    placeholder='0'
                    keyboardType='decimal-pad'
                    autoFocus={true}
                />
                <Button
                    block
                    style={styles.finishButton}
                    onPress={finnishAction}
                >
                    <Text style={styles.textInButton}>HOÀN THÀNH</Text>
                </Button>
            </Content>
        </Container>
    );
}

AddBalanceScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};