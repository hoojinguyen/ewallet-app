import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import styles from './ListImageStyle';
import { View, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text, List, ListItem, Left, Thumbnail, Header, Body, Right, Title } from 'native-base';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';
import linkIcon from '../../constants/PathIcon';
import { dataIcon } from '../../api/GetIcon';



export default function ListImageScreen(props) {
    const { navigate, goBack } = useNavigation();
    const fromScreen = props.navigation.getParam('fromScreen', 'IntroFirst');
    console.log('fromScreen');
    console.log(fromScreen);



    function selectImage(image) {
        if (fromScreen == "IntroFirst") {
            navigate('IntroFirst', { image });
        }
        else if (fromScreen == "AddCategory") {
            navigate('AddCategory', { image });
        }
        else if (fromScreen == "WalletDetail") {
            navigate('EditWallet', { image });
        }
        else if (fromScreen == "AddWallet") {
            navigate('AddWallet', { image });

        }
    }

    var listImage = [];

    dataIcon.forEach(function (item, index) {
        listImage.push(
            <TouchableOpacity
                style={styles.item}
                key={index}
                onPress={() => { selectImage(item.image) }}
            >
                <Thumbnail style={styles.thumbnail} square source={linkIcon[item.image]} />
            </TouchableOpacity>
        )
    });

    return (
        <Container>
            <Header style={styles.headerStyle}>
                <Left>
                    <Button
                        transparent
                        onPress={() => goBack()}
                    >
                        <Icon name='arrow-left' size={20} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.txtTitle}>Chọn Icon</Title>
                </Body>
                <Right>

                </Right>
            </Header>

            <Content>


                <View style={styles.list}>
                    {listImage}
                </View>
            </Content>

        </Container >
    );
}

ListImageScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};