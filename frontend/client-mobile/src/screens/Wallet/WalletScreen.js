import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Title, Container, Button, Icon } from 'native-base';

import { useNavigation, useNavigationParam } from "react-navigation-hooks";

import styles from './WalletStyle';
import Color from '../../constants/Colors'

import linkIcon from '../../constants/PathIcon';

const dataWallet = [
    {
        nameWallet: 'Ví mặc định',
        iconWallet: 'avatar_wallet',
        totalMoney: "5,000,000 đ",
        totalMoneyInt: 5000000,
    },
    {
        nameWallet: 'Ví Sinh hoạt cá nhân',
        iconWallet: 'avatar_wallet',
        totalMoney: "2,000,000 đ",
        totalMoneyInt: 200000
    },
]

export function WalletScreen(props) {
    const { navigate, goBack } = useNavigation();
    return (
        <Container>
            <Header style={{ marginTop: 24, backgroundColor: Color.greenHeader }}>
                <Left>
                    <Button transparent onPress={() => goBack()}>
                        <Icon name="close" size={20} />
                    </Button>
                </Left>
                <Body>
                    <Text style={{ fontSize: 18, fontWeight: '400', color: "white" }}>Chọn ví</Text>
                </Body>
                <Right>
                </Right>
            </Header>
            <Content style={styles.content}
            >
                <List
                    dataArray={dataWallet}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(dataWallet) =>
                        <ListItem
                            style={styles.listItem}
                            thumbnail
                            onPress={() => {
                                navigate('EditWallet', {
                                    dataWallet: dataWallet
                                });
                            }}
                        >
                            <Left>
                                <Thumbnail style={styles.thumbnail} square source={linkIcon[dataWallet.iconWallet]} />
                            </Left>
                            <Body>
                                <Text style={styles.txtName}>{dataWallet.nameWallet}</Text>
                                <Text note numberOfLines={1}>{dataWallet.totalMoney}</Text>
                            </Body>
                            <Right>
                            </Right>
                        </ListItem>
                    }>
                </List>

                <View style={styles.groupButton}>
                    <Button success
                        onPress={() => navigate('AddWallet')}
                    >
                        <Text>Tạo ví mới</Text>
                    </Button>
                </View>
            </Content >
        </Container>
    );
}

WalletScreen.navigationOptions = {
    headerTitle: "Chọn ví"
};
