import React from 'react';
import { Right, Button, Text, Content, Body, Left, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './HeaderAddNewTransactionStyle';
import Colors from '../../constants/Colors';

export default function HeaderAddNewTransaction(props) {
    return (
        <View style={styles.container}>
            <View >
                <Icon name="arrow-left" style={styles.iconDisplay} />
            </View>
            <View >
                <Text style={styles.txtTitle}>Thêm giao dịch</Text>
            </View>
            <View>
                <Button
                    transparent
                    onPress={props.action}
                >
                    <Text style={styles.txtSave}>Lưu</Text>
                </Button>
            </View>
            {/* <View style={styles.lineStyle} /> */}
        </View>
    );
}
