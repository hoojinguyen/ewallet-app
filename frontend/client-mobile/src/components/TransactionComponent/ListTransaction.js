import React, { useState, useEffect } from 'react';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { Alert, RefreshControl } from 'react-native';
import { Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right } from 'native-base';

import styles from './ListTransactionStyle';

import linkIcon from '../../constants/PathIcon';

export function ListTransaction(props) {
    const { navigate } = useNavigation();
    const dataTransaction = props.dataTransaction;
    const dataTime = props.dataTime;
    return (
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
                                dataTime: dataTime,
                                callback : props.callback
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
    );
}