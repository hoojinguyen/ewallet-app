import React from 'react';
import { View, Image, Alert, ProgressBarAndroid } from 'react-native';
import { Container, Content, Text, Left, Right, Card, CardItem, Thumbnail, Button, Body, Icon, ActionSheet } from 'native-base';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import styles from './TransactionDebtStyle';
import Colors from '../../constants/Colors';
import UrlIcon from '../../constants/URLImages';

import linkIcon from '../../constants/PathIcon';

export default function TransactionDebt(props) {
    const { navigate } = useNavigation();
    const data = props.dataDetail;
    const time = props.dataTime;
    function cashBack() {
        Alert.alert("CashBack");
    }
    return (
        <Container style={styles.containerDetailTransaction}>
            <Content style={styles.contentTransaction}>
                <Card style={styles.cardStyle}>
                    <CardItem>
                        <Left>
                            <Thumbnail style={styles.thumbnail} square source={linkIcon[data.image]} />
                            <Body>
                                <Text style={styles.textBold}>{data.name}</Text>
                                <Text note>{data.description} </Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Thumbnail source={{}} />
                        <Body>
                            {data.isMoneyAdd == true ? <Text style={styles.textPrimaryMedium}>{data.money} đ</Text> : <Text style={styles.textRedMedium}>{data.money} đ</Text>}
                        </Body>
                    </CardItem>
                    <View style={styles.lineStyle} />
                    <CardItem>
                        <Image style={styles.icon} source={{ uri: UrlIcon.calendarIcon }} />
                        <Body>
                            <Text>{time.fullday}</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Image style={styles.icon} source={{ uri: UrlIcon.walletCircleIcon }} />
                        <Body>
                            <Text>{data.description}</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={styles.cardStyle}>
                    <CardItem >
                        <Left>
                            <Body>
                                <Text>Đã trả</Text>
                                {/* <Text>{data.debt.repay || 0}</Text> */}
                                <Text>50</Text>
                            </Body>
                        </Left>
                        <Right>
                            <Body>
                                <Text>Còn lại</Text>
                                {/* <Text>{data.debt.stillPay || 0}</Text> */}
                                <Text> 100 </Text>
                            </Body>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <ProgressBarAndroid
                            style={styles.progressBar}
                            styleAttr="Horizontal"
                            indeterminate={false}
                            // progress={data.debt.percent || 0}
                            progress={0}

                        />
                    </CardItem>
                    <CardItem>
                        <Button
                            transparent
                            onPress={cashBack}
                        >
                            <Text style={styles.textSmallGreen} >Đã trả lại</Text>
                        </Button>
                    </CardItem>
                </Card>
            </Content>

        </Container>
    );
}
