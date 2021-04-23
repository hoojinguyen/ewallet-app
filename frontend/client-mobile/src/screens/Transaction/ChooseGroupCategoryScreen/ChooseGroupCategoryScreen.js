import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import { Container, Content } from 'native-base';

import urlIcon from '../../../constants/URLImages';
import HeaderChooseGroupCategory from '../../../components/ChooseGroupCategoryComponent/HeaderChooseGroupCategory';
import HeaderSegment from '../../../components/ChooseGroupCategoryComponent/HeaderSegment';
import ListItemCategories from '../../../components/ChooseGroupCategoryComponent/ListItemCategories';
import axios from "axios";

export default function ListCategoriesScreen(props) {

    const [isActiveSegment1, setIsActiveSegment1] = useState(false);
    const [isActiveSegment2, setIsActiveSegment2] = useState(true);
    const [isActiveSegment3, setIsActiveSegment3] = useState(false);
    const [dataIncome, setDataIncome] = useState([]);
    const [dataExpense, setDataExpense] = useState([]);
    const [dataDebt, setDataDebt] = useState([]);

    function changeActiveSegment1() {
        setIsActiveSegment1(true);
        setIsActiveSegment2(false);
        setIsActiveSegment3(false);
    }
    function changeActiveSegment2() {
        setIsActiveSegment1(false);
        setIsActiveSegment2(true);
        setIsActiveSegment3(false);
    }
    function changeActiveSegment3() {
        setIsActiveSegment1(false);
        setIsActiveSegment2(false);
        setIsActiveSegment3(true);
    }

    const fromScreen = props.navigation.getParam('fromScreen', '');
    useLayoutEffect(() => {
        axios.get(`http://10.0.2.2:3000/api/v1/transaction-types?&relations=transactionGroup&pageSize=30&pageIndex=1`).then(res => {
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

            setDataIncome(income);
            setDataExpense(expense);
            setDataDebt(debt);

        }).catch(error => {
            console.log(error);
        })

    }, [])

    if (isActiveSegment1) {
        return (
            <Container>
                <HeaderChooseGroupCategory />
                <HeaderSegment
                    isActiveSegment1={true}
                    isActiveSegment2={false}
                    isActiveSegment3={false}
                    changeActiveSegment1={changeActiveSegment1}
                    changeActiveSegment2={changeActiveSegment2}
                    changeActiveSegment3={changeActiveSegment3}
                />
                <Content padder>
                    <ListItemCategories data={dataDebt} fromScreen={fromScreen} />
                </Content>
            </Container>

        );
    }
    else if (isActiveSegment2) {
        return (
            <Container>
                <HeaderChooseGroupCategory />
                <HeaderSegment
                    isActiveSegment1={false}
                    isActiveSegment2={true}
                    isActiveSegment3={false}
                    changeActiveSegment1={changeActiveSegment1}
                    changeActiveSegment2={changeActiveSegment2}
                    changeActiveSegment3={changeActiveSegment3}
                />
                <Content padder>
                    <ListItemCategories data={dataExpense} fromScreen={fromScreen} />
                </Content>
            </Container>

        );
    }
    return (
        <Container>
            <HeaderChooseGroupCategory />
            <HeaderSegment
                isActiveSegment1={false}
                isActiveSegment2={false}
                isActiveSegment3={true}
                changeActiveSegment1={changeActiveSegment1}
                changeActiveSegment2={changeActiveSegment2}
                changeActiveSegment3={changeActiveSegment3}
            />
            <Content padder>
                <ListItemCategories data={dataIncome} fromScreen={fromScreen} />
            </Content>
        </Container>

    );

}

function openAddCategory() {
    Alert.alert("openAddCategory");
}

function openEditCategory() {
    Alert.alert("openEditCategory");
}

// ListCategoriesScreen.navigationOptions = {
//     headerTitle: () => <HeaderChooseGroupCategory />,
//     drawerLabel: () => null
// };