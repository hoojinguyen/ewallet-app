import React from 'react';
import { ImageBackground, Image } from "react-native";
import { View, Text, List, Thumbnail, ListItem, Left, Body, Button } from "native-base";

import Icon from 'react-native-vector-icons/FontAwesome5';
import Avatar from '../constants/URLImages';
import { useNavigation } from 'react-navigation-hooks';
import styles from './DrawerContentStyle';
export default function DrawerContent(props) {
    const { navigate } = useNavigation();
    const data = [
        { screen: "Transactions", icon: "book" },
        { screen: "Debts", icon: "hand-holding-usd" },
        { screen: "Trends", icon: "chart-line" },
        { screen: "Categories", icon: "cubes" },
        { screen: "Connect to banks", icon: "link" },
        { screen: "Scan receipt", icon: "square" },
        { screen: "Budgets", icon: "book" },
    ]
    return (
        <View style={style = styles.container}>
            <View style={style = styles.infoUser}>
                <Image source={require('../../assets/images/wallet-circle-icon.png')} style={styles.imgAvatar} />
                <Text style={styles.textNameUser}>Nguyễn Văn Hội</Text>
                <Text style={styles.textEmail}>vanhoinguyen98@gmail.com</Text>
            </View>
            <View style={styles.listFeature}>
                <List
                    dataArray={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(data) =>
                        <ListItem
                            thumbnail
                            noBorder
                            onPress={() => {
                                switch (data.screen) {
                                    case 'Transactions':
                                        navigate('Transaction');
                                        break;
                                    case 'Debts':
                                        navigate('Debts');
                                        break;
                                    case 'Trends':
                                        navigate('Report');
                                        break;
                                    case 'Categories':
                                        navigate('Categories');
                                        break;
                                    case 'Connect to banks':
                                        navigate('Bank');
                                        break;
                                    case 'Scan receipt':
                                        navigate('ScanReceipt');
                                        break;
                                    case 'Budgets':
                                        navigate('Budgets');
                                        break;
                                    default:
                                        break;
                                }
                                // navigate('Categories',{typeOfChart : 'By Category',typeOfDetail : 'Ăn uống'});
                            }}
                        >
                            <Left >
                                <Icon name={data.icon} size={20}>

                                </Icon>
                            </Left>
                            <Body>
                                <Text style={{ fontWeight: "bold" }}>{data.screen}</Text>
                            </Body>

                        </ListItem>
                    }>
                </List>
            </View>
        </View >
    )
}