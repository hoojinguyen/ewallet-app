import React from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { Button } from 'native-base';

import styles from './HeaderReportStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function HeaderReport(props) {
    function openNotification() {
        Alert.alert('Open Notification');
    }
    function openExtend() {
        Alert.alert('Open Extend');
    }
    return (
        <View style={styles.container}>
            {/* <Text style={styles.textName}>Báo cáo</Text> */}
            <View style={styles.imageGroup}>
                
            </View>
            <View style={styles.groupText}>
                <Text style={styles.textName}>Báo cáo</Text>
                <Text style={styles.textMoney}>{props.money}</Text>
            </View>
            <View style={styles.groupIcon}>
                <Image source={require('../../assets/images/wallet-circle-icon.png')} style={styles.imageWallet} />
            </View>
        </View>
    );
}
