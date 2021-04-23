import React from 'react';
import { View, Image, Alert, ProgressBarAndroid } from 'react-native';
import { Container, Content, Text, Left, Right, Card, CardItem, Thumbnail, Button, Body, Icon, ActionSheet } from 'native-base';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import styles from './TransactionNormalStyle';
import Colors from '../../constants/Colors';
import UrlIcon from '../../constants/URLImages';

import linkIcon from '../../constants/PathIcon';

export default function TransactionNormal(props) {
    const { navigate } = useNavigation();
    const data = props.dataDetail;
    const time = props.dataTime;

    console.log("data");
    console.log(data);
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
                            {/* <Text style={styles.textMediumRed}>{data.money} đ</Text> */}
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
            </Content>

        </Container>
    );
}
