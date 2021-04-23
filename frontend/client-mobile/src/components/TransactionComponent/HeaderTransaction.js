import React from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { Button, Header, Left, Body, Thumbnail } from 'native-base';

import styles from './HeaderTranasctionStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownIcon from 'react-native-vector-icons/MaterialIcons';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../../constants/Colors';
import linkIcon from '../../constants/PathIcon';

export function HeaderTransaction(props) {
    function openNotification() {
        Alert.alert('Open Notification');
    }
    function openExtend() {
        Alert.alert('Open Extend');
    }
    function openWallet() {
        Alert.alert('Open Wallet');
    }

    const data = {
        nameWalletTemp: 'Vi mac dinh',
        balanceTemp: '13.465.000 đ',
        iconTemp: 'avatar_wallet',
    }
    return (
        <Body style={styles.bodyHeader}>
            <TouchableOpacity
                onPress={openWallet}
            >
                <View style={styles.groupTouchableOpacity}>
                    <View
                        style={styles.imageGroup}
                    >
                        {/* <Image source={require('../../..//assets/icons/KhoanChi/an_uong.png')} style={styles.imageWallet}
                        /> */}
                        <Thumbnail square source={linkIcon[data.iconTemp]} style={styles.imageWallet} />
                        <DropDownIcon name="arrow-drop-down" size={30} color={Color.iconBlackHeader} />
                    </View>
                    <View style={styles.groupText}>
                        <Text style={styles.textName}>{data.nameWalletTemp}</Text>
                        <Text style={styles.textMoney}>{data.balanceTemp}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.groupIcon}>
                <Button
                    transparent
                    onPress={openNotification}
                >
                    <Icon name="bell" size={30} color={Color.iconBlackHeader} />
                </Button>
                <Button
                    transparent
                    onPress={openExtend}
                >
                    <Icon name="dots-vertical" size={30} color={Color.iconBlackHeader} />
                </Button>
            </View>
        </Body>

    );
}