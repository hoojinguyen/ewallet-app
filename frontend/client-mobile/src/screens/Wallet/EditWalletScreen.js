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
export default function EditWalletScreen(props) {

    // console.log(data);
    const { navigate, goBack } = useNavigation();

    const [nameWallet, setNameWallet] = useState('');
    const [iconWallet, setIconWallet] = useState('');
    const [totalMoney, setTotalMoney] = useState('');

    function deleteWallet() {
        // console.log(data.categoryId);
        // axios.delete(`http://10.2.2.2:3000/api/v1/transaction-types/${data.categoryId}`).then(res => {
        //     console.log("Xoa thanh cong ");
        //     navigate('Categories');
        // }).catch(error => {
        //     console.log(error);
        // })
        // navigate('Categories');
    }
    function updateWallet() {
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

        const dataWallet = props.navigation.getParam('dataWallet');
        setNameWallet(dataWallet.nameWallet);
        setIconWallet(dataWallet.iconWallet);
        setTotalMoney((dataWallet.totalMoneyInt).toString());


    }, [props.navigation])

    return (
        <Container>
            <Header style={styles.headerStyle}>
                <Left>
                    <Button transparent onPress={() => goBack()}>
                        <Icon name="close" size={20} />
                    </Button>
                </Left>
                <Body>
                    <Text style={{ fontSize: 18, fontWeight: '400' }}>Chi tiết ví</Text>
                </Body>
                <Right>
                    <Button
                        transparent
                        style={styles.buttonPaddingLeft}
                        onPress={deleteWallet}
                    >
                        <Icon name="trash-can" size={30} color="grey" />
                    </Button>
                </Right>
            </Header>

            <Content>
                <List style={styles.listInputCategory}>
                    <ListItem thumbnail noBorder
                        onPress={() => navigate('ListImage', { fromScreen: "EditWallet" })}
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
                    <View style={styles.groupButton}>
                        <Button success
                            onPress={updateWallet}
                        >
                            <Text>Lưu</Text>
                        </Button>
                    </View>
                </List>
            </Content>
        </Container>
    );
}

EditWalletScreen.navigationOptions = {
    headerTitle: "Chi tiết vi",
    drawerLabel: () => null
};
