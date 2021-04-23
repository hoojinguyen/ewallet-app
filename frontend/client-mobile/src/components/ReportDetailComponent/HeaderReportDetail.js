import React from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { Button } from 'native-base';

import styles from './HeaderReportDetailStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function HeaderReportDetail(props) {
    function openNotification() {
        Alert.alert('Open Notification');
    }
    function openExtend() {
        Alert.alert('Open Extend');
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageGroup}>
                
            </View>
            <View style={styles.groupText}>
                <Text style={styles.textName}>{props.typeOfDetail}</Text>
                <Text style={styles.textChart}>{props.typeOfChart}</Text>
            </View>
            
        </View>
    );
}
