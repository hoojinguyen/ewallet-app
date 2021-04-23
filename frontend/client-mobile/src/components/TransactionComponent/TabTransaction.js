import React, { useState, useEffect } from 'react';
import { Content, Text, Thumbnail } from 'native-base';
import { Alert, RefreshControl } from 'react-native';

import styles from './TabTransactionStyle';
import UrlIcon from '../../constants/URLImages';

import { ListTransaction } from './ListTransaction';
import { Overview } from './Overview';

export function TabTransaction(props) {
    const [refreshing, setRefreshing] = useState(false);

    // console.log("Data casdasdsad");
    // console.log(props.dataSet.length,"data transaction");


    if (props.dataSet.length === 0 || props.dataSet === null || props.dataSet === '') {
        return (
            <Content style={styles.contentNoTransaction}>
                <Thumbnail source={{ uri: UrlIcon.noTransactionIcon }} style={styles.thumbnail} />
                <Text style={styles.textNoTransaction}>Chưa có giao dịch nào</Text>
            </Content>
        )
    }

    function freshAction() {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }


    return (
        <Content style={styles.content}
            refreshControl={<RefreshControl
                refreshing={refreshing}
                colors={["green", "red", "blue"]}
                onRefresh={freshAction}
            />}
        >
            <Overview sumMoney={props.sumMoney} />
            {/* {listTransaction} */}
            {props.dataSet.map((data, index) => (
                <ListTransaction
                    key={index}
                    dataTransaction={data.listTransaction}
                    dataTime={data.detailTime}
                    callback={props.callback}
                />
            ))}
        </Content>
    )
}
