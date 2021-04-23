import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Title } from 'native-base';

import styles from './TabDebtStyles';

import linkIcon from '../../constants/PathIcon';

const dataPayable = [

    {
        name: 'Hoa Ngo',
        totalTransaction: 5,
        moneyPayable: 200000,
        moneyTotalPayable: 100000,
        description: "Muon hoa ngo",
    },
    {
        name: 'Khanh Du',
        totalTransaction: 5,
        moneyPayable: 8000000,
        moneyTotalPayable: 100000,
        description: "Muon Khanh a",
    },

]

const dataPayed = [
    {
        name: 'Quoc Huy',
        totalTransaction: 5,
        moneyPayed: 200000,
        description: "Muon cua huy",
        moneyTotalPayed: 500000,

    }
]


export function TabPayable(props) {

    return (
        <Content style={styles.content}
        >
            {dataPayable.length !== 0 ? <View>
                <Title style={styles.title}>Chưa được trả <Title style={styles.titlePrimary}>{dataPayable[0].moneyTotalPayable}</Title> </Title>
                <List
                    dataArray={dataPayable}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(dataPayable) =>
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
                                <Text style={styles.txtName}>{dataPayable.name}</Text>
                                <Text note numberOfLines={1}>{dataPayable.totalTransaction} giao dịch</Text>
                            </Body>
                            <Right>
                                <Text style={styles.txtMoneyPrimary1}>{dataPayable.moneyPayable}</Text>
                                <Text note numberOfLines={1}>Còn nợ</Text>
                            </Right>
                        </ListItem>
                    }>
                </List>
            </View> : null}


            {dataPayed.length !== 0 ? <View>
                <Title style={styles.title}>Chưa được trả <Title style={styles.titlePrimary}>{dataPayed[0].moneyTotalPayed}</Title> </Title>
                <List
                    dataArray={dataPayed}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(dataPayed) =>
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
                                <Text style={styles.txtName}>{dataPayed.name}</Text>
                                <Text note numberOfLines={1}>{dataPayed.totalTransaction} giao dịch</Text>
                            </Body>
                            <Right>
                                <Text style={styles.txtMoneyPrimary2}>{dataPayed.moneyPayed}</Text>
                                <Text note numberOfLines={1}>Đã trả hết</Text>
                            </Right>
                        </ListItem>
                    }>
                </List>
            </View> : null}



        </Content >
    );
}
