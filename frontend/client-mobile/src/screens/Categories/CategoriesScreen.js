import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from './CategoriesScreenStyle';
import Drawer from 'react-native-drawer';
import DrawerContent from '../../drawer-content/DrawerContent';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import { View, Alert } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Separator, Left, Right, Body, Button, Title, Thumbnail, Fab, Icon as IconAdd, } from 'native-base';

import linkIcon from '../../constants/PathIcon';
import { dataCategories as Data } from '../../api/GetDataCategory';
import axios from 'axios';
export default function CategoriesScreen(props) {
    const { navigate } = useNavigation();
    const [activeFab, setActiveFab] = useState(false);
    const [dataIncome, setDataIncome] = useState([]);
    const [dataExpense, setDataExpense] = useState([]);
    const [dataDebt, setDataDebt] = useState([]);
    const [refresh, setRefresh] = useState(0);

    // const dataIncome = Data[0].categories;
    // const dataExpense = Data[1].categories;
    // const dataDebt = Data[2].categories;

    function clickFab() {
        setActiveFab(!activeFab);
        navigate('AddCategory', {
            callback: () => {
                console.log('object')
                setRefresh(refresh + 1);
            }
        });
    }
    openDetailCategory = (item) => {
        let hasParentCategory = false;
        let nameParentCategory = null;
        let linkIconParent = null;
        if (item.parentTransactionTypeId) {
            hasParentCategory = true
            nameParentCategory = item.parentTransactionType.displayName
            linkIconParent = item.parentTransactionType.image
        }
        const data = {
            categoryId: item.id,
            nameTypeCategory: item.transactionGroup.displayName,
            linkIconParent: linkIconParent,
            name: item.displayName,
            linkIcon: item.image,
            nameParentCategory: nameParentCategory,
            hasParentCategory: hasParentCategory,
            walletType: "Tiền mặt",
            createDefault: true
        }
        navigate('DetailCategory', {
            data: data, callback: () => {
                setRefresh(refresh + 1)
            }
        });
    }
    useLayoutEffect(() => {
        axios.get(`http://10.0.2.2:3000/api/v1/transaction-types?&relations=transactionGroup&relations=parentTransactionType&pageSize=100&pageIndex=1`).then(res => {
            let data = res.data.items;
            let income = [];
            let expense = [];
            let debt = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].transactionGroup.displayName === "Thu nhập") {
                    income.push(data[i]);
                }
                else if (data[i].transactionGroup.displayName === "Chi tiêu") {
                    expense.push(data[i]);
                }
                else if (data[i].transactionGroup.displayName === "Cho vay/Thu nợ") {
                    debt.push(data[i]);
                }
            }
            // console.log(income,expense,debt);
            setDataIncome(income);
            setDataExpense(expense);
            setDataDebt(debt);
        }).catch(error => {
            console.log(error);
        })
        // console.log("tra ve tren");
        // console.log(props.navigation.getParam('test', "abc"));
        // }, [props.navigation])


    }, [refresh])
    return (
        <Container>
            <Content>
                <Separator bordered>
                    <Text style={styles.txtTitleCategory}>KHOẢN CHI</Text>
                </Separator>
                <List
                    dataArray={dataExpense}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(item) =>
                        <ListItem
                            onPress={() => { openDetailCategory(item) }}
                            thumbnail>
                            <Left>
                                <Thumbnail style={styles.thumbnail} square source={linkIcon[item.image]} />
                            </Left>
                            <Body>
                                <Text>{item.displayName}</Text>
                            </Body>
                        </ListItem>

                    }>
                </List>
                <Separator bordered>
                    <Text style={styles.txtTitleCategory}>KHOẢN THU</Text>
                </Separator>
                <List
                    dataArray={dataIncome}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(item) =>
                        <ListItem
                            onPress={() => { openDetailCategory(item) }}
                            thumbnail>
                            <Left>
                                <Thumbnail style={styles.thumbnail} square source={linkIcon[item.image]} />
                            </Left>
                            <Body>
                                <Text>{item.displayName}</Text>
                            </Body>
                        </ListItem>

                    }>
                </List>
                <Separator bordered>
                    <Text style={styles.txtTitleCategory}>VAY NỢ</Text>
                </Separator>
                <List
                    dataArray={dataDebt}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(item) =>
                        <ListItem
                            onPress={() => { openDetailCategory(item) }}
                            thumbnail>
                            <Left>
                                <Thumbnail style={styles.thumbnail} square source={linkIcon[item.image]} />
                            </Left>
                            <Body>
                                <Text>{item.displayName}</Text>
                            </Body>
                        </ListItem>

                    }>
                </List>
            </Content>
            <View style={styles.fabStyle}>
                <Fab
                    active={activeFab}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#34A34F' }}
                    position="bottomRight"
                    onPress={clickFab}>
                    <IconAdd name="add" />

                </Fab>
            </View>
        </Container>

        // </Drawer>
    )
}
CategoriesScreen.navigationOptions = {
    headerTitle: "Nhóm"
};