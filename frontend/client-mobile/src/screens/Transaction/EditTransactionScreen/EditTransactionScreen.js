import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useRef } from 'react';
import styles from './EditTransactionStyle';
import { TextInput } from 'react-native';
import { Container, Content, Text, Left, Right, Thumbnail, Body, Button, List, ListItem, Label, Header, Title, Toast } from 'native-base';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import UrlIcon from '../../../constants/URLImages';
import Icon from 'react-native-vector-icons/FontAwesome5';

import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import color from '../../../constants/Colors';

import linkIcon from "../../../constants/PathIcon";

import axios from 'axios';

const data = [
    {
        id: 'debtTransaction1',
        description: "Trả cho Khánh",
        moneyNeedPayment: '4,200,000.00',
        datePRepayment: 'Thứ 5, 07 Tháng 11 2019',
        typeTransaction: 'Tiền mặt'
    }
];

export default function EditTransactionScreen(props) {
    const { navigate, goBack } = useNavigation();

    const dataDetail = props.navigation.getParam('dataDetail');

    var today = moment(new Date()).format('dddd DD MM YYYY');
    const [isVisibleDateTransaction, setVisibleDateTransaction] = useState(false);
    const [isVisibleRemindTime, setVisibleRemindTime] = useState(false);

    const [idTransaction, setIdTransaction] = useState(dataDetail.id);
    const [moneyTransaction, setMoneyTransaction] = useState((dataDetail.moneyInt).toString());
    const [iconCategory, setIconCategory] = useState(dataDetail.image);
    const [nameCategory, setNameCategory] = useState(dataDetail.name);
    const [description, setDescription] = useState(dataDetail.description);
    const [dateTransaction, setDateTransaction] = useState(today);
    const [walletName, setWalletName] = useState(dataDetail.walletName);
    const [walletIcon, setWalletIcon] = useState(dataDetail.walletImage);
    const [walletId, setWalletId] = useState(dataDetail.walletId);
    const [nameContact, setNameContact] = useState(dataDetail.relatedUserName);
    const [remindTime, setRemindTime] = useState('');

    useEffect(() => {
    });

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

    function updateTransaction() {
        if (!validateForm()) {
            return;
        } else {
            try {
                axios.patch('http://10.0.2.2:3000/api/v1/transactions', {
                    id: idTransaction,
                    money: moneyTransaction,
                    description: description,
                }).then(res => {
                    // console.log(props.navigation.state.params)
                    props.navigation.state.params.callback();
                    navigate('Transaction');
                    // setIdTransaction('');
                    // setNameCategory('');
                    // setIconCategory('avatar_unknown');
                    // setDescription('');
                    // setNameContact('');
                    // setMoneyTransaction('');
                }).catch(error => console.log(error))
            }
            catch (error) {
                console.log(error)
            }
        }
    }

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
                    <Title style={styles.txtTitle}>Sửa giao dịch</Title>
                </Body>
                <Right>
                    <Button
                        transparent
                        hasText
                        onPress={updateTransaction}
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
                    >
                        <Left>
                            <Thumbnail
                                square
                                source={linkIcon[iconCategory]}
                                style={styles.imgDisplay}
                            />
                        </Left>
                        <Body>
                            <TextInput
                                style={styles.txtGroup}
                                borderBottomWidth={1}
                                placeholder={nameCategory}
                                keyboardType='default'
                                returnKeyType='done'
                                editable={false}
                                value=''
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
                                placeholder={walletName}
                                keyboardType='default'
                                returnKeyType='done'
                                value=''
                                editable={false}
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
                            <Icon name="users" size={28} color={color.iconGrey} />
                        </Left>
                        <Body>
                            <TextInput
                                style={styles.txtAnother}
                                placeholder={nameContact}
                                borderBottomWidth={1}
                                keyboardType='default'
                                returnKeyType='done'
                                value=''
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

EditTransactionScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};