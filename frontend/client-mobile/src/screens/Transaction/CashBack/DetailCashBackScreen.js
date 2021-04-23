import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import styles from './DetailCashBackStyle';
import { View, Image, Alert, TextInput } from 'react-native';
import { Container, Content, Button, Text, Toast, Header, Left, Right, Body, Title, List, ListItem, Thumbnail } from 'native-base';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import Icon from 'react-native-vector-icons/FontAwesome5'
import linkIcon from '../../../constants/PathIcon'

import { TabTransaction } from '../../../components/TransactionComponent/TabTransaction';

const dataTransaction = [
    {
        id: "0123123213213213213",
        name: "An uong",
        description: "An com voi me",
        money: ' 250,000 vnđ',
        moneyInt: 250000,
        image: 'an_uong',
        relatedUserName: null,
        isUserRelated: null,
        isMoneyAdd: true
    },
    {
        id: "0123123213213213213",
        name: "An uong",
        description: "An com voi me",
        money: ' 250,000 vnđ',
        moneyInt: 250000,
        image: 'an_uong',
        relatedUserName: null,
        isUserRelated: null,
        isMoneyAdd: true
    },
    {
        id: "0123123213213213213",
        name: "An uong",
        description: "An com voi me",
        money: ' 250,000 vnđ',
        moneyInt: 250000,
        image: 'an_uong',
        relatedUserName: null,
        isUserRelated: null,
        isMoneyAdd: true
    }

]
const dataTime = {
    day: 10,
    weekDay: 2,
    monthAndYear: '10 / 01 / 1998',
    sumMoney: '400000 vnd',
    sumMoneyInt: '40000 vnd',
    fullday: 'T2/03/2019'
}

export default function CashBackScreen(props) {
    const { navigate, goBack } = useNavigation();

    return (
        <Container>
            <Header style={styles.headerStyle}>
                <Left>
                    <Button
                        transparent
                        onPress={() => navigate('DetailTransactionV2')}
                    >
                        <Icon name='arrow-left' size={20} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.txtTitle}>Danh sách giao dịch</Title>
                </Body>
                <Right>
                </Right>
            </Header>
            <Content style={styles.content}
            >
                <Header transparent>
                    <Left>
                        <Text style={styles.textDay}>{dataTime.day}</Text>
                    </Left>
                    <Body>
                        <Text style={styles.textWeekDays}>{dataTime.weekDay}</Text>
                        <Text style={styles.textMonthAndYear}>{dataTime.monthAndYear}</Text>
                    </Body>
                    <Right>
                        <Text style={styles.textBlackBold}>{dataTime.sumMoney}</Text>
                    </Right>
                </Header>
                <List
                    dataArray={dataTransaction}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(dataTransaction) =>
                        <ListItem
                            thumbnail
                            noBorder
                            onPress={() => {
                                navigate('DetailTransactionV2', {
                                    dataDetail: dataTransaction,
                                    dataTime: dataTime
                                });
                            }}
                        >
                            <Left>
                                <Thumbnail style={styles.thumbnail} square source={linkIcon[dataTransaction.image]} />
                            </Left>
                            <Body>
                                <Text style={styles.textBlackBold}>{dataTransaction.name}</Text>
                                <Text note numberOfLines={1}>{dataTransaction.description}</Text>
                            </Body>
                            <Right>
                                {dataTransaction.isMoneyAdd == true ? <Text style={styles.textPrimaryMedium}>{dataTransaction.money} đ</Text> : <Text style={styles.textRedMedium}>{dataTransaction.money} đ</Text>}

                            </Right>
                        </ListItem>
                    }>
                </List>
            </Content>

        </Container >
    );
}
CashBackScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};