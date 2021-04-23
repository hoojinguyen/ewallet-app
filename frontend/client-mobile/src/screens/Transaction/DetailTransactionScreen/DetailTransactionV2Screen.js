import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import styles from "./DetailTransactionV2Style";
import { ProgressBarAndroid } from "react-native";
import { Container, Content, Text, Left, Right, Thumbnail, Body, Button, Header, View, Card, CardItem } from "native-base";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";

import linkIcon from "../../../constants/PathIcon";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
export default function DetailTransactionV2Screen(props) {
    const { navigate, goBack } = useNavigation();

    const [dataDetail, setDataDetail] = useState({});
    const [dataTime, setDataTime] = useState({});
    const [moneyNeedCashBack, setMoneyNeedCashBack] = useState(props.navigation.getParam('dataDetail').moneyPaid);
    const [moneyCashBacked, setMoneyCashBacked] = useState(0);
    const [percent, setPercent] = useState(0);

    const [moneyPaid, setMoneyPaid] = useState(0);
    const [moneyRemain, setMoneyRemain] = useState(0);
    const [percent2, setPercent2] = useState(0);



    useEffect(() => {
        let dataDetailx = props.navigation.getParam('dataDetail');
        let dataTimex = props.navigation.getParam('dataTime');
        setMoneyPaid(dataDetailx.moneyPaid);
        setMoneyRemain(dataDetailx.moneyRemain);
        setPercent2(dataDetailx.moneyPaid / dataDetailx.moneyInt);

        setDataDetail(dataDetailx);
        setDataTime(dataTimex);
        const cashBackedTemp = props.navigation.getParam('moneyCashBacked', moneyCashBacked);
        const needCashBackTemp = props.navigation.getParam('moneyNeedCashBack', moneyNeedCashBack);
        const percent = cashBackedTemp / (cashBackedTemp + needCashBackTemp)
        setMoneyCashBacked(cashBackedTemp);
        setMoneyNeedCashBack(needCashBackTemp);
        setPercent(percent);

    }, [props.navigation])

    function deleteTransaction() {    
        axios.delete(`http://10.0.2.2:3000/api/v1/transactions/${dataDetail.id}`).then(res => {
            props.navigation.state.params.callback();
            navigate('Transaction');
        }).catch(error => {   
            
            console.log(error)
        })
        
    }

    function updateTransaction() {
        navigate('EditTransaction', { 'dataDetail': dataDetail ,'callback' :props.navigation.state.params.callback});
    }

    function cashBackAction() {
        navigate('CashBack', { 'totalDebt': moneyRemain, 'cashBacked': moneyPaid, 'dataDetail': dataDetail });
    }

    function openDetailCashBack() {
        navigate('DetailCashBack', { 'dataDetail': dataDetail });
    }

    return (
        <Container>
            <Header style={styles.headerStyle}>
                <Left>
                    <Button transparent onPress={() => navigate('Transaction')}>
                        <Icon name="close" size={20} />
                    </Button>
                </Left>
                <Body>

                </Body>
                <Right>
                    <Button
                        transparent
                        style={styles.buttonPaddingLeft}
                        onPress={updateTransaction}
                    >
                        <Icon name="circle-edit-outline" size={30} color="grey" />
                    </Button>
                    <Button
                        transparent
                        style={styles.buttonPaddingLeft}
                        onPress={deleteTransaction}
                    >
                        <Icon name="trash-can" size={30} color="grey" />
                    </Button>
                </Right>
            </Header>
            <Content>
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Thumbnail style={styles.thumbnailLarge} square source={linkIcon[dataDetail.image]} />
                        <Text style={styles.title}>{dataDetail.name}</Text>
                    </View>
                    <View style={styles.item}>
                        <Thumbnail style={styles.thumbnailSmall} square source={linkIcon['avatar_coin']} />
                        {dataDetail.isMoneyAdd ? <Text style={styles.txtPrimary}>{dataDetail.money} đ</Text> : <Text style={styles.txtDanger}>{dataDetail.money} đ</Text>}
                    </View>
                    {dataDetail.description ? (
                        <View style={styles.item}>
                            <Thumbnail style={styles.thumbnailSmallSquare} square source={linkIcon['avatar_bar']} />
                            <Text style={styles.txtDefault}>{dataDetail.description}</Text>
                        </View>
                    ) : null}

                    <View style={styles.item}>
                        <Thumbnail style={styles.thumbnailSmallSquare} square source={linkIcon['avatar_calendar']} />
                        <Text style={styles.txtDefault}>{dataTime.weekDay} ,{dataTime.monthAndYear}</Text>
                    </View>
                    <View style={styles.item}>
                        <Thumbnail style={styles.thumbnailSmallSquare} square source={linkIcon[dataDetail.walletImage]} />
                        <Text style={styles.txtDefault}>{dataDetail.walletName}</Text>
                    </View>

                    {dataDetail.relatedUserName ? (
                        <View style={styles.item}>
                            <Thumbnail style={styles.thumbnailSmallSquare} square source={linkIcon['avatar_user']} />
                            <Text style={styles.txtDefault}>{dataDetail.relatedUserName}</Text>
                        </View>
                    ) : null}
                </View>


                {dataDetail.isUserRelated ? (
                    <Card style={styles.cardStyle}>
                        <CardItem >
                            <Left>
                                <Body>
                                    <Text>Đã trả</Text>
                                    <Text>{moneyPaid} đ</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Body>
                                    <Text>Còn lại</Text>
                                    <Text> {moneyRemain} đ</Text>
                                </Body>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <ProgressBarAndroid
                                style={styles.progressBar}
                                styleAttr="Horizontal"
                                indeterminate={false}
                                progress={percent2}
                            />
                        </CardItem>
                        <CardItem >
                            {moneyRemain !== 0 ? (
                                <Button
                                    success
                                    style={styles.btnSuccess}
                                    onPress={cashBackAction}
                                >
                                    <Text>Trả lại</Text>
                                </Button>
                            ) : null}
                            <Button
                                success
                                onPress={openDetailCashBack}
                            >
                                <Text>Danh sách giao dịch</Text>
                            </Button>
                        </CardItem>
                    </Card>
                ) : null}


            </Content>
        </Container>
    );
}

DetailTransactionV2Screen.navigationOptions = {
    // headerTitle: () => <Text>Danh sách giao dịch</Text>,
    drawerLabel: () => null
};