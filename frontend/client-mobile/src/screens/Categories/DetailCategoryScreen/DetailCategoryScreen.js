import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import { DetailCategory as styles } from "./DetailCategoryStyle";
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
    Label,
    Header,
    Title,
    Subtitle,
    Radio,
    View,
    Picker
} from "native-base";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";

import linkIcon from "../../../constants/PathIcon";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
export default function DetailCategoryScreen(props) {
    const data = props.navigation.getParam('data');
    // console.log(data);

    const { navigate, goBack } = useNavigation();
    function editCategory(data) {
        console.log("edit+ " + data.categoryId);
    }

    function deleteCategory() {
        console.log(data.categoryId);
        axios.delete(`http://10.0.2.2:3000/api/v1/transaction-types/${data.categoryId}`).then(res => {
            console.log("Xoa thanh cong ");
            props.navigation.state.params.callback();
            navigate('Categories');
        }).catch(error => {
            console.log(error);
        })
        // navigate('Categories');
    }

    function mergeCategory(data) {
        navigate('MergeCategory', { data });
    }

    return (
        <Container>
            <Header style={styles.headerStyle}>
                <Left>
                    <Button transparent onPress={() => navigate("Categories")}>
                        <Icon name="close" size={20} />
                    </Button>
                </Left>
                <Body>

                </Body>
                <Right>
                    <Button
                        transparent
                        style={styles.buttonPaddingLeft}
                        onPress={() => { editCategory(data) }}
                    >
                        <Icon name="circle-edit-outline" size={30} color="grey" />
                    </Button>
                    <Button
                        transparent
                        style={styles.buttonPaddingLeft}
                        onPress={deleteCategory}
                    >
                        <Icon name="trash-can" size={30} color="grey" />
                    </Button>
                </Right>
            </Header>

            <Content>
                <View style={styles.container}>
                    <View style={styles.itemStyle}>
                        <Thumbnail style={styles.thumbnail} square source={linkIcon[data.linkIcon]} />
                        <Text style={styles.title}>{data.name}</Text>
                    </View>
                    <View style={styles.itemStyle}>
                        <Thumbnail style={styles.thumbnail} square source={linkIcon['avatar_box']} />
                        <Text style={styles.textRed}>{data.nameTypeCategory}</Text>
                    </View>
                    {data.hasParentCategory == true ? <View style={styles.itemStyle}>
                        <Thumbnail style={styles.thumbnail} square source={linkIcon[data.linkIconParent]} />
                        <View style={styles.itemChildStyle}>
                            <Text style={styles.subTitle}>Danh mục cha</Text>
                            <Text style={styles.title}>{data.nameParentCategory}</Text>
                        </View>
                    </View> : null}
                    <View style={styles.itemStyle}>
                        <Thumbnail style={styles.thumbnail} square source={linkIcon['avatar_wallet']} />
                        <Text style={styles.title}>{data.walletType}</Text>
                    </View>
                </View>
                <View style={styles.groupButton}>
                    <Button success
                        onPress={() => { mergeCategory(data) }}
                    >
                        <Text>Ghép nhóm</Text>
                    </Button>
                </View>

            </Content>
        </Container>
    );
}

DetailCategoryScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};
