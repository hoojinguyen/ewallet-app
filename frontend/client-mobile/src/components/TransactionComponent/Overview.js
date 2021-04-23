import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { Text, Button } from 'native-base';

import styles from './OverviewStyle';

export function Overview(props) {
    // let money = 0;
    function openReport() {
        Alert.alert('Open Detail');
    }
    // function moneySum() {
    //     for (let i = 0; i < props.data.length; i++) {
    //         money += props.data[i].money;
    //     }
    //     return <Text>{money} đ </Text>;
    // }
    return (
        <View style={styles.reportGroup}>
            <View style={styles.surplus}>
                <Text style={styles.textOpacity}>Số dư đầu</Text>
                <Text>13.465.000 đ</Text>
            </View>
            <View style={styles.surplus}>
                <Text style={styles.textOpacity}>Số dư cuối</Text>
                {/* {moneySum()} */}
                <Text>{props.sumMoney} </Text>

            </View>
            <View style={styles.lineStyle} />
            <View style={styles.surplus}>
                <Text></Text>
                {/* {moneySum()} */}
                <Text style={styles.textBlackBold}>{props.sumMoney} </Text>

            </View>
            <View style={styles.buttonWatchReport}>
                <Button
                    transparent
                    onPress={openReport}
                >
                    <Text style={styles.textWatchReport}>Xem báo cáo cho giai đoạn này</Text>
                </Button>
            </View>
        </View>
    );
}
