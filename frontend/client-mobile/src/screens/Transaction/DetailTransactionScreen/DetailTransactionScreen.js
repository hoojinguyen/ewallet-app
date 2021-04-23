import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { View, Image, Alert, ProgressBarAndroid } from 'react-native';
import { Container, Header, Content, Text, Left, Right, Card, CardItem, Thumbnail, Button, Body, Icon, ActionSheet } from 'native-base';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import styles from './DetailTransactionScreenStyle';
import UrlIcon from '../../../constants/URLImages';

import HeaderDetailTransaction from '../../../components/DetailTransactionComponent/HeaderDetailTransaction';
import TransactionDebt from '../../../components/DetailTransactionComponent/TransactionDebt';
import TransactionNormal from '../../../components/DetailTransactionComponent/TransactionNormal';

export default function DetailTransactionScreen(props) {
    const { navigate } = useNavigation();
    const [click, setClick] = useState(0);
    const [dataDetail, setDataDetail] = useState({});
    const [dataTime, setDataTime] = useState({});
    const callback = props.navigation.state.params.callback;
    useEffect(() => {
        let dataDetailx = props.navigation.getParam('dataDetail');
        let dataTimex = props.navigation.getParam('dataTime');
        setDataDetail(dataDetailx);
        setDataTime(dataTimex);

    }, [])

    console.log("detail");
    console.log(dataDetail);


    if (dataDetail.isUserRelated !== null) {
        return (
            <TransactionDebt dataDetail={dataDetail} dataTime={dataTime} />
        );
    }
    return (
        <TransactionNormal dataDetail={dataDetail} dataTime={dataTime} />
    );
}



DetailTransactionScreen.navigationOptions = (dataDetail, dataTime,callback) => ({
    headerTitle: <HeaderDetailTransaction dataDetail={dataDetail} dataTime={dataTime} callback={callback} />,
    drawerLabel: () => null
});