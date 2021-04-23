import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import styles from './IntroduceStyles';
import { View, Image, Alert, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Container, Content, Button, Text, Form, Item, Input, Label, Picker, Thumbnail } from 'native-base';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import linkIcon from '../../../constants/PathIcon';
import axios from "axios"
export default function IntroFirstScreen(props) {
    const { navigate } = useNavigation();
    const [icon, setIcon] = useState('avatar_wallet');
    const [unitCurrency, setUnitCurrency] = useState('vietnamdong');
    const [nameWallet, setNameWallet] = useState('Vi Tien Cua Toi');

    // const nameImage = props.navigation.getParam('image', 'IntroFirst');
    
   
    useEffect(() => {
        
       
        
        let nameIcon = (props.navigation.getParam('image', icon));
        setIcon(nameIcon);
    });

    function changeIcon() {
        navigate('ListImage', { fromScreen: "IntroFirst" });
    }
    function onValueChange(value) {
        setUnitCurrency(value);
    }
    function createWallet() {
        console.log(props.navigation.state.params)
        axios.post(`http://10.0.2.2:3000/api/v1/wallets`,{
            displayName :nameWallet,
            accountBalance : 50000,
            userId : props.navigation.state.params.userId,
            walletTypeId : "8365848937403253761",
            status :"active"
        }).then(async res=>{
            navigate('IntroNext', { nameWallet, icon, unitCurrency });
        }).catch(err=>{
            console.log(err)
        })
    }

    return (

        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <Container>
                <Content style={styles.header}>
                    <Text style={styles.title}>Đầu tiên hãy tạo ví</Text>
                    <Text style={styles.description}>Money lover giúp bạn ghi chép chi tiêu từ nhiều ví khác nhau. Mỗi ví đại diện cho một nguồn tiền như Tiền mặt, Tài khoản ngân hàng.</Text>
                    <Form>
                        <View style={styles.changeAvatar}>
                            <Thumbnail square source={linkIcon[icon]} style={styles.imageAvatar} />
                            <Button transparent onPress={changeIcon} >
                                <Text style={styles.textChangeAvatar}>ĐỔI HÌNH ĐẠI DIỆN</Text>
                            </Button>
                        </View>

                        <Item floatingLabel>
                            <Label>Tên Ví</Label>
                            <TextInput
                                value={nameWallet}
                                onChangeText={nameWallet => { setNameWallet(nameWallet) }}
                                style={styles.txtMoney}
                            />
                        </Item>
                        <Picker
                            mode="dropdown"
                            placeholder="Select your SIM"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            style={styles.picker}
                            selectedValue={unitCurrency}
                            onValueChange={onValueChange}
                        >
                            <Picker.Item label="Việt Nam Đồng" value="vietnamdong" />
                            <Picker.Item label="Pound" value="pound" />
                            <Picker.Item label="Euro" value="euro" />
                            <Picker.Item label="Yen" value="yen" />
                            <Picker.Item label="Won" value="won" />
                            <Picker.Item label="Baht" value="baht" />
                        </Picker>
                        <Button
                            block
                            style={styles.nextButton}
                            onPress={() => {
                                createWallet()
                               
                            }}
                        >
                            <Text style={styles.textInButton}>TIẾP TỤC</Text>
                        </Button>
                    </Form>
                </Content>
            </Container >
        </KeyboardAvoidingView>
    );
}

IntroFirstScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};