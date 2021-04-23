import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useRef } from 'react';
import { AddNewTransaction as styles } from './AddNewTransactionStyle';
import { Alert, TextInput,AsyncStorage } from 'react-native';
import { Container, Content, Text, Left, Right, Thumbnail, Body, Button, List, ListItem, Label, Header, Title, Toast } from 'native-base';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import UrlIcon from '../../../constants/URLImages';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import color from '../../../constants/Colors';
import linkIcon from "../../../constants/PathIcon";
import axios from 'axios';

export default function AddNewTransactionScreen(props) {
    const { navigate, goBack } = useNavigation();

    var today = moment(new Date()).format('dddd DD MM YYYY');
    const [isVisibleDateTransaction, setVisibleDateTransaction] = useState(false);
    const [isVisibleRemindTime, setVisibleRemindTime] = useState(false);
    const [dateTransaction, setDateTransaction] = useState(today);
    const [nameCategory, setNameCategory] = useState('');
    const [iconCategory, setIconCategory] = useState('avatar_unknown');
    const [remindTime, setRemindTime] = useState('');
    const [typeTransaction, setTypeTransaction] = useState('');
    const [nameContact, setNameContact] = useState('');
    const [walletName, setWalletName] = useState('Ví mặc định');
    const [walletIcon, setWalletIcon] = useState('avatar_wallet');
    // const [walletId, setWalletId] = useState('');

    const [description, setDescription] = useState('');
    const [moneyTransaction, setMoneyTransaction] = useState('');
    const [idCategory, setIdCategory] = useState('');
    
    //Wallet id hardcode
    const modalChangeNote = useRef('changeNote');
    const modalChangeMoney = useRef('changeMoney');

    function showPickerDateTransaction() {
        setVisibleDateTransaction(true);
    };

    function hidePickerDateTransaction() {
        setVisibleDateTransaction(false);
    };

    function handleDateTransaction(date) {
        hidePickerDateTransaction();
        setDateTransaction(moment(date).format('dddd DD MM YYYY'));
    };

    function showPickerRemindTime() {
        setVisibleRemindTime(true);
    };

    function hidePickerRemindTime() {
        setVisibleRemindTime(false);
    };

    function handleRemindTime(date) {
        hidePickerRemindTime();
        setRemindTime(moment(date).format('dddd DD MM YYYY'));
    };

    function toastShow(error) {
        Toast.show({
            text: error,
            buttonText: "Okay",
            position: "top",
            type: "danger",
            duration: 3000
        })
    }

    function validateForm() {
        if (moneyTransaction === "" || moneyTransaction === 0) {
            toastShow("Hãy nhập số tiền!");
            return false;
        }
        if (nameCategory === "") {
            toastShow("Hãy chọn nhóm!");
            return false;
        }
        return true;
    }
    async function getwalletId(){
        console.log(axios.defaults.headers.common['Authorization']);
        const id = await AsyncStorage.getItem('walletId')
        return id;
    }
    function createATransaction() {
        if (!validateForm()) {
            return;
        } else {
            try {
                let moneyPaid = undefined;
                let moneyRemain = undefined;
                if (nameCategory == "Đi vay" || nameCategory == "Cho vay") {
                    moneyPaid = 0;
                    moneyRemain = moneyTransaction
                }
                getwalletId().then(res=>{
                    console.log(res,"walletId")
                    axios.post('http://10.0.2.2:3000/api/v1/transactions', {
                        transactionTypeId: idCategory,
                        money: moneyTransaction,
                        moneyPaid: moneyPaid,
                        moneyRemain: moneyRemain,
                        description: description,
                        walletId: res,
                        relatedUserName: nameContact
                    }).then(res => {
                        setMoneyTransaction('');
                        setNameCategory('');
                        setIconCategory('avatar_unknown');
                        setDescription('');
                        setNameContact('');
                        // console.log(props.navigation,'add new transaction')
                        props.navigation.state.params.callback();
                        navigate('Transaction', { test: 'test' });
                    }).catch(error => console.log(error))
                })
                
                
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        setIdCategory(props.navigation.getParam('idCategory', idCategory))
        setTypeTransaction(props.navigation.getParam('typeTransaction', typeTransaction))
        setNameContact(props.navigation.getParam('nameContact', nameContact))
        setNameCategory(props.navigation.getParam('nameCategory', nameCategory));
        setIconCategory(props.navigation.getParam('iconChanged', iconCategory));
    });

    return (
        <Container>
            <Header style={styles.headerStyle}>
                <Left>
                    <Button
                        transparent
                        onPress={() => navigate('Transaction', { 'TestNavigator': 'abc' })}
                    >
                        <Icon name='arrow-left' size={20} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.txtTitle}>Thêm giao dịch</Title>
                </Body>
                <Right>
                    <Button
                        transparent
                        hasText
                        onPress={createATransaction}
                    >
                        <Text style={styles.txtSave}>Lưu</Text>
                    </Button>
                </Right>
            </Header>
            <Content>

                <List style={styles.listInputTransaction}>
                    <ListItem
                        thumbnail
                        noBorder
                    >
                        <Left>
                            <Icon name="coins" style={styles.iconDisplay} />
                        </Left>
                        <Body>
                            <Label style={styles.lblMoney}>Số tiền</Label>
                            <TextInput
                                style={styles.txtMoney}
                                autoFocus={true}
                                borderBottomWidth={1}
                                placeholder='0'
                                keyboardType='decimal-pad'
                                returnKeyType='done'
                                onChangeText={money => { setMoneyTransaction(money) }}
                                value={moneyTransaction}
                            />
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                    <ListItem
                        thumbnail
                        noBorder
                        onPress={() => {
                            navigate('ChooseGroupCategory', { fromScreen: 'AddNewTransaction' });
                        }}
                    >
                        <Left>
                            <Thumbnail
                                square
                                square source={linkIcon[iconCategory]}
                                style={styles.imgDisplay}
                            />
                        </Left>
                        <Body>
                            <TextInput
                                style={styles.txtGroup}
                                borderBottomWidth={1}
                                placeholder='Chọn nhóm'
                                keyboardType='default'
                                returnKeyType='done'
                                editable={false}
                                value={nameCategory}
                            />
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                    <ListItem
                        thumbnail
                        noBorder
                    >
                        <Left>
                            <Icon name="envelope-open-text" style={styles.iconDisplay} />
                        </Left>
                        <Body>
                            <TextInput
                                style={styles.txtAnother}
                                borderBottomWidth={1}
                                placeholder='Ghi chú'
                                keyboardType='default'
                                returnKeyType='done'
                                onChangeText={description => setDescription(description)}
                                value={description}
                            />
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                    <ListItem
                        thumbnail
                        noBorder
                        onPress={showPickerDateTransaction}
                    >
                        <Left>
                            <Icon name="calendar-alt" style={styles.iconDisplay} />
                        </Left>
                        <Body>
                            <Text style={styles.txtDateTime}>{dateTransaction}</Text>
                        </Body>
                        <Right>
                        </Right>
                        <DateTimePicker
                            isVisible={isVisibleDateTransaction}
                            onConfirm={handleDateTransaction}
                            onCancel={hidePickerDateTransaction}
                        />
                    </ListItem>
                    <ListItem
                        thumbnail
                        noBorder
                    >
                        <Left>
                            <Thumbnail
                                square
                                source={linkIcon[walletIcon]}
                                style={styles.imgDisplay}
                            />
                        </Left>
                        <Body>
                            <TextInput
                                style={styles.txtAnother}
                                borderBottomWidth={1}
                                placeholder='Ví mặc định'
                                keyboardType='default'
                                returnKeyType='done'
                                value={walletName}
                                editable={false}
                            />
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>

                    <ListItem
                        thumbnail
                        noBorder
                        onPress={() => {
                            navigate('Contact');
                        }}
                    >
                        <Left>
                            <Icon name="users" size={28} color={color.iconGrey} />
                        </Left>
                        <Body>
                            <TextInput
                                style={styles.txtAnother}
                                placeholder='Với'
                                borderBottomWidth={1}
                                keyboardType='default'
                                returnKeyType='done'
                                value={nameContact}
                                editable={false}
                            />
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                    <ListItem
                        thumbnail
                        noBorder
                        onPress={showPickerRemindTime}
                    >
                        <Left>
                            <Icon name="clock" size={28} color={color.iconGrey} />
                        </Left>
                        <Body>
                            <TextInput
                                style={styles.txtAnother}
                                borderBottomWidth={1}
                                placeholder='Đặt nhắc nhở'
                                keyboardType='default'
                                returnKeyType='done'
                                editable={false}
                                onChangeText={remindTime => setRemindTime(remindTime)}
                                value={remindTime}
                            />
                            <DateTimePicker
                                isVisible={isVisibleRemindTime}
                                onConfirm={handleRemindTime}
                                onCancel={hidePickerRemindTime}
                            />
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>

                </List>
            </Content>

        </Container >
    );
}

AddNewTransactionScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};