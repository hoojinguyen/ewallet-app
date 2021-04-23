import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ImageComponent, AsyncStorage } from 'react-native';
import { Container, View, DatePicker, Content, Header, Left, Body, Right, Title, Subtitle, Text, Button, Spinner } from 'native-base';
// import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { HeaderReport } from '../../components/ReportScreenComponent/HeaderReport';
import styles from './ReportDetail/ReportDetailScreenStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MoneyInfoPicker from '../../components/ReportScreenComponent/MoneyInfoPicker';
import ClassifyPicker from '../../components/ReportScreenComponent/ClassifyPicker';
import DataList from '../../components/ReportScreenComponent/DataList';
import Chart from '../../components/ReportScreenComponent/Chart';

import { isLoading } from 'expo-font';
import axios from 'axios';
import moment from 'moment-timezone';
export default function ReportScreen(props) {
    // const { navigate } = useNavigation();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [typeOfChart, setTypeOfChart] = useState('4 tháng gần đây');
    const [typeOfData, setTypeOfData] = useState('Chi tiêu');
    const [isLoading, setIsLoading] = useState(false);
    const [isMoneyAdd, setIsMoneyAdd] = useState(false);
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [dataPieChart, setDataPieChart] = useState([])
    let date = moment.utc().format();
    let date1 = moment(date).subtract(1, 'months').utc().format();
    let date2 = moment(date).subtract(2, 'months').utc().format();
    let date3 = moment(date).subtract(3, 'months').utc().format();



    // const dataBarChart = [0, 1, 2, 3];
    // const incomeData = [20, 3, 70, 50];
    // const expenseData = [40, 3, 70, 50];

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7);

    async function getwalletId(){
        const id = await AsyncStorage.getItem('walletId')
        return id;
    }
    useEffect(() => {
        setIncomeData([]);
        setExpenseData([]);
        let income = [];
        let expense = [];
        setIsLoading(true);
        getwalletId().then(id=>{
        axios.get(`http://10.0.2.2:3000/api/v1/transactions/reportTotalByMonth?date=${date3}&walletId=${id}&isMoneyAdd=${isMoneyAdd}`)
            .then(res => {
                // console.log(res.data.totalMoney,"money")
                let data = res.data.totalMoney;
                if (isMoneyAdd === true) {
                    income.push(data / 1000);
                }
                else {
                    expense.push(data / 1000);
                }
                axios.get(`http://10.0.2.2:3000/api/v1/transactions/reportTotalByMonth?date=${date2}&walletId=${id}&isMoneyAdd=${isMoneyAdd}`)
                    .then(res => {
                        // console.log(res.data.totalMoney,"money")
                        let data = res.data.totalMoney;
                        if (isMoneyAdd === true) {
                            income.push(data / 1000);
                        }
                        else {
                            expense.push(data / 1000);

                        }
                        axios.get(`http://10.0.2.2:3000/api/v1/transactions/reportTotalByMonth?date=${date1}&walletId=${id}&isMoneyAdd=${isMoneyAdd}`)
                            .then(res => {
                                let data = res.data.totalMoney;
                                // console.log(res.data.totalMoney,"money")
                                if (isMoneyAdd === true) {
                                    income.push(data / 1000);
                                }
                                else {
                                    expense.push(data / 1000);
                                }
                                axios.get(`http://10.0.2.2:3000/api/v1/transactions/reportTotalByMonth?date=${date}&walletId=${id}&isMoneyAdd=${isMoneyAdd}`)
                                    .then(res => {
                                        let data = res.data.totalMoney;
                                        // console.log(res.data.totalMoney,"money")
                                        if (isMoneyAdd === true) {
                                            income.push(data / 1000);
                                        }
                                        else {
                                            expense.push(data / 1000);
                                        }
                                        setIncomeData(income);
                                        setExpenseData(expense);
                                        setTimeout(() => setIsLoading(false), 1500)
                                        // setIsLoading(false);
                                    })
                            })
                    })
            }).catch(error => {
                console.log(error)
                setIsLoading(false);
            })
        })
    }, [isMoneyAdd])

    useEffect(() => {
        setIsLoading(true);
        getwalletId().then(id=>{
        axios.get(`http://10.0.2.2:3000/api/v1/transactions/reportByTransactionTypes?date=${date}&walletId=${id}&isMoneyAdd=${isMoneyAdd}`)
            .then(res => {
                let data = res.data.items;
                const pieData = data
                    .map((value, index) => ({
                        value: value.totalMoney,
                        svg: {
                            fill: randomColor(),
                            onPress: () => console.log('press', index),
                        },
                        key: `pie-${index}`,
                        displayName: value.transactionType.displayName
                    }));
                setDataPieChart(pieData);
                setTimeout(() => { setIsLoading(false) }, 1000);
            }).catch(error => {
                setIsLoading(false);
            })
        })

    }, [typeOfChart, isMoneyAdd])
    return (

        <Container>

            <Content>

                <MoneyInfoPicker
                    typeOfData={typeOfData}
                    setTypeOfData={(itemValue) => {
                        setTypeOfData(itemValue);
                        if (itemValue === 'Expense') {

                            setIsMoneyAdd(false)
                        }
                        else setIsMoneyAdd(true)
                    }}
                />

                <ClassifyPicker
                    typeOfChart={typeOfChart}
                    setTypeOfChart={(itemValue) => { setTypeOfChart(itemValue) }}
                />

                {isLoading === true ? <Spinner color='green' /> :
                    <>
                        <Chart
                            typeOfData={typeOfData}
                            typeOfChart={typeOfChart}
                            incomeData={incomeData}
                            expenseData={expenseData}
                            dataPieChart={dataPieChart}
                        />


                        <DataList
                            typeOfData={typeOfData}
                            typeOfChart={typeOfChart}
                            incomeData={incomeData}
                            expenseData={expenseData}
                        />
                    </>}



            </Content>
        </Container >

        // </Drawer>
    )
}
ReportScreen.navigationOptions = {
    headerTitle: "Báo cáo - Thống kê"
};