import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import styles from "./WalletDetailStyle";
import { Image, Alert, Dimensions, TextInput } from "react-native";
import {
    Container,
    Content,
    Text,
    Left,
    Right,
    Thumbnail,
    Body,
    Button,
    List,
    ListItem,
    Header,
} from "native-base";
import { View } from 'react-native'
import { useNavigation, useNavigationParam } from "react-navigation-hooks";

import linkIcon from "../../constants/PathIcon";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
export default function AddWalletScreen(props) {

    // console.log(data);
    const { navigate, goBack } = useNavigation();

    const [nameWallet, setNameWallet] = useState('');
    const [iconWallet, setIconWallet] = useState('');
    const [totalMoney, setTotalMoney] = useState('');

    function createWallet() {
        // console.log(data.categoryId);
        // axios.delete(`http://10.2.2.2:3000/api/v1/transaction-types/${data.categoryId}`).then(res => {
        //     console.log("Xoa thanh cong ");
        //     navigate('Categories');
        // }).catch(error => {
        //     console.log(error);
        // })
        // navigate('Categories');
    }

    useEffect(() => {
        setIconWallet(props.navigation.getParam('image', 'avatar_question'));
    })

    return (
        <Container>
            <Header style={styles.headerStyle}>
                <Left>
                    <Button transparent onPress={() => goBack()}>
                        <Icon name="close" size={20} />
                    </Button>
                </Left>
                <Body>
                    <Text style={{ fontSize: 18, fontWeight: '400' }}>Tạo ví mới</Text>
                </Body>
                <Right>
                    <Button
                        transparent
                        style={styles.buttonPaddingLeft}
                        onPress={createWallet}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '400', color: "green" }}>Lưu</Text>

                    </Button>
                </Right>
            </Header>

            <Content>
                <List style={styles.listInputCategory}>
                    <ListItem thumbnail noBorder
                        onPress={() => navigate('ListImage', { fromScreen: "AddWallet" })}
                    >
                        <Left>
                            <Thumbnail
                                square
                                source={linkIcon[iconWallet]}
                                style={styles.imgDisplay}
                            />
                        </Left>
                        <Body>
                            <TextInput
                                style={styles.txtAnother}
                                borderBottomWidth={1}
                                placeholder="Tên Ví"
                                keyboardType="default"
                                returnKeyType="done"
                                onChangeText={nameWallet => setNameWallet(nameWallet)}
                                value={nameWallet}
                            />
                        </Body>
                        <Right></Right>
                    </ListItem>
                    <ListItem thumbnail noBorder
                    >
                        <Left>
                            <Thumbnail
                                square
                                source={linkIcon['avatar_coin']}
                                style={styles.imgDisplay}
                            />
                        </Left>
                        <Body>
                            <TextInput
                                style={styles.txtAnother}
                                borderBottomWidth={1}
                                placeholder="Tổng tiền"
                                keyboardType="decimal-pad"
                                returnKeyType="done"
                                onChangeText={totalMoney => setTotalMoney(totalMoney)}
                                value={totalMoney}
                            />
                        </Body>
                        <Right></Right>
                    </ListItem>

                </List>
            </Content>
        </Container>
    );
}

AddWalletScreen.navigationOptions = {
    headerTitle: "Tạo ví mới",
    drawerLabel: () => null
};
