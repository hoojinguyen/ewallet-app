import React, { Component } from "react";
import { Container, Header, Content, List, ListItem, Text, Left, Right, Body, Button, Title } from "native-base";
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Color from '../../constants/Colors'

const contacts = [
    {
        name: "Mom"
    },
    {
        name: "Daddy"
    },
    {
        name: "Đức Hòa"
    },
    {
        name: "Văn Khánh"
    },
    {
        name: "Huy Võ"
    },
    {
        name: "Quốc Huy"
    },

    {
        name: "Ngọc Hưng"
    },
    {
        name: "Văn Hội"
    },
    {
        name: "Trung Nguyên"
    }
];
export default function ContactScreen(props) {
    const { navigate } = useNavigation();
    return (
        <Container>
            <Header style={{ marginTop: 24, backgroundColor: Color.headerColor }}>
                <Left>
                    <Button
                        transparent
                        onPress={() => navigate('AddNewTransaction')}
                    >
                        <Icon name='arrow-left' size={20} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: Color.titleColor }}>Thêm giao dịch với</Title>
                </Body>
                <Right>
                </Right>
            </Header>
            <Content>
                <List
                    dataArray={contacts}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={contact => (
                        <ListItem
                            onPress={() => {
                                navigate("AddNewTransaction", {
                                    nameContact: contact.name,
                                });
                            }}
                        >
                            <Text>{contact.name}</Text>
                        </ListItem>
                    )}
                ></List>
            </Content>
        </Container>
    );
}

ContactScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};