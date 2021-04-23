import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Tab, Tabs, Icon as IconAdd, Fab, View, Header, Left, Button, ScrollableTab, Text } from 'native-base';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import { Dimensions, AsyncStorage } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { TabTransaction } from '../../../components/TransactionComponent/TabTransaction';

import styles from './TransactionStyle';

import axios from 'axios';
import moment from 'moment-timezone';

// import Icon from 'react-native-vector-icons/FontAwesome5';
// import UrlIcon from '../../../constants/URLImages';

export default function TransactionScreen(props) {
    const { navigate, goBack } = useNavigation();

    const [transactionData, setTransactionData] = useState([]);
    const [transactionDataLastMonth, setTransactionDataLastMonth] = useState([]);
    const [transactionDataAnother, setTransactionDataAnother] = useState([]);

    const [initialPage, setInitialPage] = useState(0);
    const [curSumMoney, setSumMoney] = useState(0);
    const [activeFab, setActiveFab] = useState(false);
    const [balance, setBalance] = useState('0');
    const [refresh, setRefresh] = useState(0);

    function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    };

    async function getwalletId() {
        const id = await AsyncStorage.getItem('walletId')
        return id;
    }
    async function getToken() {
        const token = await AsyncStorage.getItem('token')
        return token;
    }
    useEffect(() => {

        console.log('refresh')
        let date = moment.utc().format();
        var dateFrom = moment(date).subtract(1, 'months').utc().format();
        let dataCurrentMonth = [];
        let dataLastMonth = [];
        let sumMoney = 0;
        async function fetchData() {
            getwalletId().then(res => {
                axios.get(`http://10.0.2.2:3000/api/v1/transactions?date=${date}&walletId=${res}&byMonth=true&sortBy=createdAt&sortType=desc&relations=transactionType&relations=wallet`).then(res => {

                    let dataFormat = res.data.items;
                    // console.log('lengthhhhhhhh', res.data.items.length)
                    let listOfDay = [];
                    for (let i = 0; i < dataFormat.length; i++) {
                        let date = moment(dataFormat[i].createdAt).tz('Asia/Ho_Chi_Minh').format('MMMM Do YYYY dddd');
                        listOfDay.push(date);
                    }
                    let newlistOfDay = listOfDay.filter(
                        (item, index) => {
                            return listOfDay.indexOf(item) === index;
                        }
                    )
                    console.log(newlistOfDay, "newlistOfDay")
                    for (let i = 0; i < newlistOfDay.length; i++) {
                        let DateData = {};
                        DateData.listTransaction = [];

                        for (let j = 0; j < dataFormat.length; j++) {
                            let dateDataServer = moment(dataFormat[j].createdAt).tz('Asia/Ho_Chi_Minh');
                            let weekDay = dateDataServer.format('dddd').toString();
                            let month = dateDataServer.format('MMMM').toString();
                            switch (weekDay) {
                                case 'Monday':
                                    weekDay = "Thứ 2"
                                    break;
                                case 'Tuesday':
                                    weekDay = "Thứ 3"
                                    break;
                                case 'Wednesday':
                                    weekDay = "Thứ 4"
                                    break;
                                case 'Thursday':
                                    weekDay = "Thứ 5"
                                    break;
                                case 'Friday':
                                    weekDay = "Thứ 6"
                                    break;
                                case 'Saturday':
                                    weekDay = "Thứ 7"
                                    break;
                                case 'Sunday':
                                    weekDay = "Chủ Nhật"
                                    break;
                                default:
                                    break;
                            }
                            switch (month) {
                                case 'January':
                                    month = 'Tháng 1'
                                    break;
                                case 'February':
                                    month = 'Tháng 2'
                                    break;
                                case 'March':
                                    month = 'Tháng 3'
                                    break;
                                case 'April':
                                    month = 'Tháng 4'
                                    break;
                                case 'May':
                                    month = 'Tháng 5'
                                    break;
                                case 'June':
                                    month = 'Tháng 6'
                                    break;
                                case 'July':
                                    month = 'Tháng 7'
                                    break;
                                case 'August':
                                    month = 'Tháng 8'
                                    break;
                                case 'September':
                                    month = 'Tháng 9'
                                    break;
                                case 'October':
                                    month = 'Tháng 10'
                                    break;
                                case 'November':
                                    month = 'Tháng 11'
                                    break;
                                case 'December':
                                    month = 'Tháng 12'
                                    break;
                                default:
                                    break;
                            }

                            if (newlistOfDay[i] === dateDataServer.format('MMMM Do YYYY dddd')) {
                                let checkMoney = dataFormat[j].transactionType.isMoneyAdd
                                sumMoney = checkMoney ? sumMoney + dataFormat[j].money : sumMoney - dataFormat[j].money
                                let day = dateDataServer.format('Do');
                                DateData.detailTime = {
                                    day: dateDataServer.date(),
                                    weekDay: weekDay,
                                    monthAndYear: month + ',' + dateDataServer.format('YYYY').toString(),
                                    sumMoney: formatMoney(sumMoney, 0, '.', ','),
                                    sumMoneyInt: sumMoney,
                                    fullday: dateDataServer.format('dd MM YYYY').toString()
                                }
                                let listTransactionData = {
                                    id: dataFormat[j].id,
                                    name: dataFormat[j].transactionType.displayName,
                                    description: dataFormat[j].description,
                                    money: formatMoney(dataFormat[j].money, 0, '.', ','),
                                    moneyInt: dataFormat[j].money,
                                    moneyPaid: dataFormat[j].moneyPaid,
                                    moneyRemain: dataFormat[j].moneyRemain,
                                    image: dataFormat[j].transactionType.image,
                                    relatedUserName: dataFormat[j].relatedUserName,
                                    isUserRelated: dataFormat[j].transactionType.isUserRelated,
                                    isMoneyAdd: dataFormat[j].transactionType.isMoneyAdd,
                                    walletName: dataFormat[j].wallet.displayName,
                                    walletId: dataFormat[j].wallet.id,
                                    walletImage: dataFormat[j].wallet.image
                                }
                                DateData.listTransaction.push(listTransactionData);
                            }
                        }

                        setSumMoney(sumMoney);

                        dataCurrentMonth.push(DateData);
                        // console.log("DATEDATAAAA:", DateData.length);


                    }
                    // console.log("DATEDATAAAA:", dataCurrentMonth.length);

                }).catch(error => console.log(error));
            })

        }

        async function fetchDataLastMonth() {
            getwalletId().then(res => {
                axios.get(`http://10.0.2.2:3000/api/v1/transactions?date=${dateFrom}&walletId=${res}&byMonth=true&sortBy=createdAt&sortType=desc&relations=transactionType&relations=wallet`).then(res => {
                    let dataFormat = res.data.items;
                    let listOfDay = [];

                    for (let i = 0; i < dataFormat.length; i++) {
                        let date = moment(dataFormat[i].createdAt).tz('Asia/Ho_Chi_Minh').format('MMMM Do YYYY dddd');

                        listOfDay.push(date);
                    }
                    let newlistOfDay = listOfDay.filter(
                        (item, index) => {
                            return listOfDay.indexOf(item) === index;
                        }
                    )
                    console.log(listOfDay,"listOfDay")
                    console.log(newlistOfDay,"newlistOfDay")
                    for (let i = 0; i < newlistOfDay.length; i++) {
                        let DateData = {};
                        DateData.listTransaction = [];
                        let sumMoney = 0;
                        for (let j = 0; j < dataFormat.length; j++) {
                            let dateDataServer = moment(dataFormat[j].createdAt).tz('Asia/Ho_Chi_Minh');
                            let weekDay = dateDataServer.format('dddd').toString();
                            let month = dateDataServer.format('MMMM').toString();

                            switch (weekDay) {
                                case 'Monday':
                                    weekDay = "Thứ 2"
                                    break;
                                case 'Tuesday':
                                    weekDay = "Thứ 3"
                                    break;
                                case 'Wednesday':
                                    weekDay = "Thứ 4"
                                    break;
                                case 'Thursday':
                                    weekDay = "Thứ 5"
                                    break;
                                case 'Friday':
                                    weekDay = "Thứ 6"
                                    break;
                                case 'Saturday':
                                    weekDay = "Thứ 7"
                                    break;
                                case 'Sunday':
                                    weekDay = "Chủ Nhật"
                                    break;
                                default:
                                    break;
                            }
                            switch (month) {
                                case 'January':
                                    month = 'Tháng 1'
                                    break;
                                case 'February':
                                    month = 'Tháng 2'
                                    break;
                                case 'March':
                                    month = 'Tháng 3'
                                    break;
                                case 'April':
                                    month = 'Tháng 4'
                                    break;
                                case 'May':
                                    month = 'Tháng 5'
                                    break;
                                case 'June':
                                    month = 'Tháng 6'
                                    break;
                                case 'July':
                                    month = 'Tháng 7'
                                    break;
                                case 'August':
                                    month = 'Tháng 8'
                                    break;
                                case 'September':
                                    month = 'Tháng 9'
                                    break;
                                case 'October':
                                    month = 'Tháng 10'
                                    break;
                                case 'November':
                                    month = 'Tháng 11'
                                    break;
                                case 'December':
                                    month = 'Tháng 12'
                                    break;
                                default:
                                    break;
                            }

                            if (newlistOfDay[i] === dateDataServer.format('MMMM Do YYYY dddd')) {
                                let checkMoney = dataFormat[j].transactionType.isMoneyAdd
                                sumMoney = checkMoney ? sumMoney + dataFormat[j].money : sumMoney - dataFormat[j].money
                                DateData.detailTime = {
                                    day: dateDataServer.format('Do').toString().substring(0, 2),
                                    weekDay: weekDay,
                                    monthAndYear: month + ',' + dateDataServer.format('YYYY').toString(),
                                    sumMoney: formatMoney(sumMoney, 0, '.', ','),
                                    sumMoneyInt: sumMoney,
                                }
                                let listTransactionData = {
                                    name: dataFormat[j].transactionType.displayName,
                                    description: dataFormat[j].description,
                                    money: formatMoney(dataFormat[j].money, 0, '.', ','),
                                    moneyInt: dataFormat[j].money,
                                    moneyPaid: dataFormat[j].moneyPaid,
                                    moneyRemain: dataFormat[j].moneyRemain,
                                    image: dataFormat[j].transactionType.image,
                                    relatedUserName: dataFormat[j].relatedUserName,
                                    isUserRelated: dataFormat[j].transactionType.isUserRelated,
                                    isMoneyAdd: dataFormat[j].transactionType.isMoneyAdd,
                                    walletName: dataFormat[j].wallet.displayName,
                                    walletId: dataFormat[j].wallet.id,
                                    walletImage: dataFormat[j].wallet.image
                                }
                                DateData.listTransaction.push(listTransactionData);
                            }
                        }
                        // setSumMoney(sumMoney);
                        dataLastMonth.push(DateData);
                    }

                }).catch(error => console.log(error));
            })

        }
        getToken().then(res => {
            // console.log(res,"token")
            axios.defaults.headers.common['Authorization'] = `Bearer ${res}`;
        }).then(res => {
            fetchData();
            fetchDataLastMonth();
            setTransactionData(dataCurrentMonth);
            setTransactionDataLastMonth(dataLastMonth);
        }

        )

    }, [refresh]);


    function clickFab() {
        setActiveFab(!activeFab);
        navigate('AddNewTransaction', {
            callback: () => {
                // console.log(object)
                setRefresh(refresh + 1);
            }
        });
    }


    const infoWalletTemp = {
        nameWalletTemp: props.navigation.getParam('nameWallet', ''),
        iconTemp: props.navigation.getParam('icon', 'avatar_wallet'),
        unitCurrencyTemp: props.navigation.getParam('unitCurrency', 'viet_nam_dong'),
        balanceTemp: props.navigation.getParam('balance', '0')
    }

    // TabView
    const [index, setIndex] = useState(1);
    const [routes] = useState([
        // { key: 'januaryMonth', title: '1/2019' },
        // { key: 'februaryMonth', title: '2/2019' },
        // { key: 'marchMonth', title: '3/2019' },
        // { key: 'aprilMonth', title: '4/2019' },
        // { key: 'mayMonth', title: '5/2019' },
        // { key: 'juneMonth', title: '6/2019' },
        // { key: 'julyMonth', title: '7/2019' },
        // { key: 'augustMonth', title: '8/2019' },
        // { key: 'septemberMonth', title: '9/2019' },
        // { key: 'octoberMonth', title: '10/2019' },
        { key: 'lastMonth', title: 'Tháng trước' },
        { key: 'currentMonth', title: 'Tháng này' },
        { key: 'futureMonth', title: 'Tương lai' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            // case 'octoberMonth':
            //     return <TabTransaction dataSet={transactionDataAnother} />;
            // case 'septemberMonth':
            //     return <TabTransaction dataSet={transactionDataAnother} />;
            // case 'augustMonth':
            //     return <TabTransaction dataSet={transactionDataAnother} />;
            // case 'julyMonth':
            //     return <TabTransaction dataSet={transactionDataAnother} />;
            // case 'juneMonth':
            //     return <TabTransaction dataSet={transactionDataAnother} />;
            // case 'mayMonth':
            //     return <TabTransaction dataSet={transactionDataAnother} />;
            // case 'aprilMonth':
            //     return <TabTransaction dataSet={transactionDataAnother} />;
            // case 'marchMonth':
            //     return <TabTransaction dataSet={transactionDataAnother} />;
            // case 'februaryMonth':
            //     return <TabTransaction dataSet={transactionDataAnother} />;
            // case 'januaryMonth':
            //     return <TabTransaction dataSet={transactionDataAnother} />;
            case 'lastMonth':
                return <TabTransaction dataSet={transactionDataLastMonth} callback={() => { setRefresh(refresh + 1) }} />;
            case 'currentMonth':
                return <TabTransaction dataSet={transactionData} callback={() => { setRefresh(refresh + 1) }} sumMoney={curSumMoney} />;
            case 'futureMonth':
                return <TabTransaction dataSet={transactionDataAnother} callback={() => { setRefresh(refresh + 1) }} sumMoney={curSumMoney} />;
        }
    };

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#2db84c' }}
            scrollEnabled={true}
        />
    );

    return (
        <Container>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                renderTabBar={renderTabBar}
            />

            <View style={styles.fabStyle}>
                <Fab
                    active={activeFab}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#34A34F' }}
                    position="bottomLeft"
                    onPress={clickFab}>
                    <IconAdd name="add" />

                </Fab>
            </View>
        </Container>
    );
}
