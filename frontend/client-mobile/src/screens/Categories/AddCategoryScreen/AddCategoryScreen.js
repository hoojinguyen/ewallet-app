import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import { AddCategory as styles } from "./AddCategoryStyle";
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

import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
const { width, height } = Dimensions.get("window");

export default function AddCategoryScreen(props) {
    const { navigate, goBack } = useNavigation();
    const [nameCategoryParent, setNameCategoryParent] = useState("");
    const [nameCategory, setNameCategory] = useState("");
    const [iconCategory, setIconCategory] = useState("avatar_question");
    const [activeIncome, setActiveIncome] = useState(true);
    const [activeExpense, setActiveExpense] = useState(false);
    const [activeDebt, setActiveDebt] = useState(false);
    const [wallet, setWallet] = useState("tienmat");
    const [transactionGroupId, setTransactionGroupId] = useState({});
    const [parentIncome, setParentIncome] = useState([]);
    const [parentExpense, setParentExpense] = useState([]);
    function createNewCategory() {
        let transactionGroupID;
        if (activeIncome === true) {
            transactionGroupID = transactionGroupId.income;
        }
        else if (activeExpense === true) {
            transactionGroupID = transactionGroupId.expense;
        }
        else if (activeDebt === true) {
            transactionGroupID = transactionGroupId.debt;
        }
        let parentTransactionTypeId;
        for (let i = 0; i < parentIncome.length; i++) {
            if (parentIncome[i].displayName === nameCategoryParent) {
                parentTransactionTypeId = parentIncome[i].id;
            }
        }
        for (let i = 0; i < parentExpense.length; i++) {
            if (parentExpense[i].displayName === nameCategoryParent) {
                parentTransactionTypeId = parentExpense[i].id;
            }
        }
        axios.post(`http://10.0.2.2:3000/api/v1/transaction-types`, {
            displayName: nameCategory,
            transactionGroupId: transactionGroupID,
            parentTransactionTypeId: parentTransactionTypeId,
            image: iconCategory
        }).then(res => {
            // let dataCategory = {
            //     displayName: nameCategory,
            //     transactionGroupId: transactionGroupID,
            //     parentTransactionTypeId: parentTransactionTypeId,
            //     image: iconCategory
            // }
            console.log(res.data);

            console.log("object2")
            // navigate("Categories", { dataCategory })
            props.navigation.state.params.callback();
            navigate('Categories', { test: 'test' });
        }
        )
            .catch(error => {
                console.log(error)
            });
    }

    function onValueChangeWallet(value) {
        setWallet(value);
    }

    function onValueChangeCategoryParent(value) {
        setNameCategoryParent(value);
    }

    function changeActiveExpense() {
        setActiveIncome(false);
        setActiveExpense(true);
        // setActiveDebt(false);
    }
    function changeActiveIncome() {
        setActiveIncome(true);
        setActiveExpense(false);
        // setActiveDebt(false);
    }
   
    useEffect(() => {
        let transactionGroup = {};
        axios.get(`http://10.0.2.2:3000/api/v1/transaction-groups?&relations=rootTransactionTypes`).then(res => {
            let data = res.data.items;
            for (let i = 0; i < data.length; i++) {
                if (data[i].displayName === "Thu nhập") {
                    transactionGroup.income = data[i].id;
                    if (data[i].rootTransactionTypes)
                        setParentIncome(data[i].rootTransactionTypes);

                }
                else if (data[i].displayName === "Chi tiêu") {
                    transactionGroup.expense = data[i].id;
                    if (data[i].rootTransactionTypes)
                        setParentExpense(data[i].rootTransactionTypes);
                }
                else if (data[i].displayName === "Cho vay/Thu nợ") {
                    transactionGroup.debt = data[i].id;
                }
                // console.log(data[i].rootTransactionTypes);
            }
            setTransactionGroupId(transactionGroup);
        })
        setIconCategory(props.navigation.getParam('image', "avatar_question"))
    }, [props.navigation])
    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     };
    // }, [parentIncome])

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     };
    // }, [parentExpense])
    function renderList() {
        let list = [];
        list.push(<Picker.Item key={0} label="-- Chọn nhóm cha --" value="" />)

        if (activeIncome === true) {
            for (let i = 0; i < parentIncome.length; i++) {
                list.push(<Picker.Item key={i + 1} label={parentIncome[i].displayName} value={parentIncome[i].displayName} />)
            }
        }
        else if (activeExpense === true) {
            for (let i = 0; i < parentExpense.length; i++) {
                list.push(<Picker.Item key={i + 1} label={parentExpense[i].displayName} value={parentExpense[i].displayName} />)
            }
        }
        return list;
    }
    return (
        <Container>
            <Header style={styles.headerStyle}>
                <Left>
                    <Button transparent onPress={() => navigate('Categories')}>
                        <Icon name="arrow-left" size={20} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.txtTitle}>Thêm Danh mục</Title>
                </Body>
                <Right>
                    <Button transparent hasText onPress={createNewCategory}>
                        <Text style={styles.txtSave}>Lưu</Text>
                    </Button>
                </Right>
            </Header>

            <Content>
                <List style={styles.listInputCategory}>
                    <ListItem thumbnail noBorder
                        onPress={() => navigate('ListImage', { fromScreen: "AddCategory" })}
                    >
                        <Left>
                            <Thumbnail
                                square
                                source={linkIcon[(props.navigation.getParam('image', "avatar_question"))]}
                                style={styles.imgDisplay}
                            />
                        </Left>
                        <Body>
                            <TextInput
                                style={styles.txtAnother}
                                borderBottomWidth={1}
                                placeholder="Tên Danh mục"
                                keyboardType="default"
                                returnKeyType="done"
                                onChangeText={nameCategory => setNameCategory(nameCategory)}
                                value={nameCategory}
                            />
                        </Body>
                        <Right></Right>
                    </ListItem>

                    <ListItem selected={true}>
                        <View style={styles.groupRadio}>
                            <View style={styles.radio}>
                                <Text style={styles.radioTitle}>Khoản Chi</Text>
                                <Radio
                                    onPress={changeActiveExpense}
                                    color={"#5cb85c"}
                                    selectedColor={"#5cb85c"}
                                    selected={activeIncome}
                                />
                            </View>
                            <View style={styles.radio}>
                                <Text style={styles.radioTitle}>Khoản Thu</Text>
                                <Radio
                                    onPress={changeActiveIncome}
                                    color={"#5cb85c"}
                                    selectedColor={"#5cb85c"}
                                    selected={activeExpense}
                                />
                            </View>
                            {/* <View style={styles.radio}>
                                <Text style={styles.radioTitle}>Cho vay/Thu nợ</Text>
                                <Radio
                                    onPress={changeActiveDebt}
                                    color={"#5cb85c"}
                                    selectedColor={"#5cb85c"}
                                    selected={activeDebt}
                                />
                            </View> */}
                        </View>
                    </ListItem>

                    <ListItem thumbnail noBorder>
                        <Left>
                            <Thumbnail
                                square
                                source={linkIcon["avatar_box"]}
                                style={styles.imgDisplay}
                            />
                        </Left>
                        <Body>
                            <Picker
                                mode="dropdown"
                                placeholder="Chọn danh mục cha"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                style={styles.picker}
                                selectedValue={nameCategoryParent}
                                onValueChange={onValueChangeCategoryParent}
                            >
                                {/* <Picker.Item label="-- Chọn nhóm cha --" value="" /> */}

                                {renderList()}
                            </Picker>
                        </Body>
                        <Right></Right>
                    </ListItem>

                    <ListItem thumbnail noBorder>
                        <Left>
                            <Thumbnail
                                square
                                source={linkIcon["avatar_wallet"]}
                                style={styles.imgDisplay}
                            />
                        </Left>
                        <Body>
                            <Picker
                                mode="dropdown"
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                style={styles.picker}
                                selectedValue={wallet}
                                onValueChange={onValueChangeWallet}
                            >
                                <Picker.Item label="Ví mặc định" value="tienmat" />
                                {/* <Picker.Item label="Tiền Ảo" value="tienao" /> */}
                            </Picker>
                        </Body>
                        <Right></Right>
                    </ListItem>
                </List>
            </Content>
        </Container >
    );
}

AddCategoryScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};
