import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Title } from 'native-base';

import styles from './TabDebtStyles';

import linkIcon from '../../constants/PathIcon';

const dataReceivable = [

    {
        name: 'Hoa Ngo',
        totalTransaction: 2,
        moneyReceivable: 200000,
        moneyTotalReceivable: 50000000,
        description: "Muon hoa ngo",
    }
]

const dataReceived = [
    {
        name: 'Quoc Huy',
        totalTransaction: 5,
        moneyReceived: 200000,
        description: "Muon cua huy",
        moneyTotalReceived: 200000,

    }
]

export function TabReceivable(props) {
    return (
        <Content style={styles.content}
        >
            {dataReceivable.length !== 0 ? <View>
                <Title style={styles.title}>Chưa được nhận <Title style={styles.titleDanger}>{dataReceivable[0].moneyTotalReceivable}</Title> </Title>
                <List
                    dataArray={dataReceivable}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(dataReceivable) =>
                        <ListItem
                            style={styles.listItem}
                            thumbnail
                            onPress={() => {
                                // navigate('DetailTransaction', {
                                //     dataDetail: dataTransaction,
                                //     dataTime: dataTime
                                // });
                                console.log("aaaaaa");
                            }}
                        >
                            <Left>
                                <Thumbnail style={styles.thumbnail} square source={linkIcon['avatar_unknown']} />
                            </Left>
                            <Body>
                                <Text style={styles.txtName}>{dataReceivable.name}</Text>
                                <Text note numberOfLines={1}>{dataReceivable.totalTransaction} giao dịch</Text>
                            </Body>
                            <Right>
                                <Text style={styles.txtMoneyDanger1}>{dataReceivable.moneyPayable}</Text>
                                <Text note numberOfLines={1}>Còn nhận</Text>
                            </Right>
                        </ListItem>
                    }>
                </List>
            </View> : null}


            {dataReceived.length !== 0 ? <View>
                <Title style={styles.title}>Đã nhận <Title style={styles.titleDanger}>{dataReceived[0].moneyTotalReceived}</Title> </Title>
                <List
                    dataArray={dataReceived}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(dataReceived) =>
                        <ListItem
                            style={styles.listItem}
                            thumbnail
                            onPress={() => {
                                // navigate('DetailTransaction', {
                                //     dataDetail: dataTransaction,
                                //     dataTime: dataTime
                                // });
                                console.log("aaaaaa");
                            }}
                        >
                            <Left>
                                <Thumbnail style={styles.thumbnail} square source={linkIcon['avatar_unknown']} />
                            </Left>
                            <Body>
                                <Text style={styles.txtName}>{dataReceived.name}</Text>
                                <Text note numberOfLines={1}>{dataReceived.totalTransaction} giao dịch</Text>
                            </Body>
                            <Right>
                                <Text style={styles.txtMoneyDanger2}>{dataReceived.moneyReceived}</Text>
                                <Text note numberOfLines={1}>Đã nhận hết</Text>
                            </Right>
                        </ListItem>
                    }>
                </List>
            </View> : null}



        </Content >
    );
}
