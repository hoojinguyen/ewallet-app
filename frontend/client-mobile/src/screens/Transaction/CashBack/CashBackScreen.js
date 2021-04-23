import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import styles from './CashBackStyle';
import { View, Image, Alert, TextInput , AsyncStorage} from 'react-native';
import { Container, Content, Button, Text, Toast } from 'native-base';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import Icon from 'react-native-vector-icons/FontAwesome5';
import TypeTransaction from '../../../constants/TypeTransaction';
import axios from 'axios';
export default function CashBackScreen(props) {
    const { navigate, goBack } = useNavigation();

    const [moneyCashBacked, setMoneyCashBacked] = useState('');
    const [moneyCashBacked2, setMoneyCashBacked2] = useState(0);
    const [totalDebt, setTotalDebt] = useState(0)


    useEffect(() => {
        setMoneyCashBacked2(props.navigation.getParam('cashBacked'))
        setTotalDebt(props.navigation.getParam('totalDebt'));
    })

    async function getwalletId(){
        const id = await AsyncStorage.getItem('walletId')
        return id;
    }
    function finnishAction() {
        console.log("Cashback");
        console.log(moneyCashBacked, totalDebt);


        if (moneyCashBacked > totalDebt) {
            Toast.show({
                text: 'Số tiền trả lại không hợp lệ !',
                buttonText: "Okay",
                position: "top",
                type: "danger",
                duration: 3000
            })
            return;
        }
        else {
            const dataDetail = props.navigation.getParam('dataDetail');
            const typeTransactionTemp = (dataDetail.name == "Đi vay" || dataDetail.id == "8394084942681736292") ? TypeTransaction.repayment : TypeTransaction.debtCollection;
            const description = (dataDetail.name == "Đi vay" || dataDetail.id == "8394084942681736292") ? "Trả nợ cho " + dataDetail.relatedUserName : "Thu nợ của " + dataDetail.relatedUserName;
            try {
                getwalletId().then (res=>{
                    axios.post('http://10.0.2.2:3000/api/v1/transactions', {
                        transactionTypeId: typeTransactionTemp,
                        money: moneyCashBacked,
                        description: description,
                        walletId: res,
                        relatedUserName: dataDetail.relatedUserName,
                        parentTransactionId: dataDetail.id
                    }).then(res => {
    
                    }).catch(error => console.log(error))
                })
                

                axios.patch('http://10.0.2.2:3000/api/v1/transactions', {
                    id: dataDetail.id,
                    moneyRemain: totalDebt - moneyCashBacked,
                    moneyPaid: (Number.parseInt(moneyCashBacked) + Number.parseInt(moneyCashBacked2))
                }).then(res => {
                    navigate('DetailTransactionV2', { 'moneyCashBacked': (Number.parseInt(moneyCashBacked) + Number.parseInt(moneyCashBacked2)), moneyNeedCashBack: (totalDebt - moneyCashBacked) });
                    setMoneyCashBacked('');
                }).catch(error => console.log(error))
            }
            catch (error) {
                console.log(error)
            }

        }

    }

    return (
        <Container>
            <View style={styles.header}>
                <Button
                    transparent
                    onPress={() => navigate('DetailTransactionV2')}
                >
                    <Icon name='arrow-left' size={24} />
                </Button>
            </View>
            <Content style={styles.content}>
                <Text style={styles.title}>Số tiền</Text>
                <Text style={styles.subTitle}>Nhập số tiền trả lại</Text>
                <TextInput
                    value={moneyCashBacked}
                    onChangeText={money => { setMoneyCashBacked(money) }}
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
                    <Text style={styles.textInButton}>LƯU LẠI</Text>
                </Button>
            </Content>
        </Container >
    );
}
CashBackScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};