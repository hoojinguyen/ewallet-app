import React, { useState, useEffect } from 'react';
import { HeaderReportDetail } from '../../../components/ReportDetailComponent/HeaderReportDetail';
import { Container, Header, Left, Body, Right, Title, Subtitle, Button, Text,View,ListItem,List,Thumbnail } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './ReportDetailScreenStyle';
import { useNavigation } from 'react-navigation-hooks';
import {  G, Image } from 'react-native-svg';
import { PieChart} from 'react-native-svg-charts';
export default function ReportDetailScreen(props) {
    const { navigate, goBack } = useNavigation();
    const dataPieChart = [
        {
            key: 1,
            amount: 50,
            svg: { fill: '#600080' },
        },
        {
            key: 2,
            amount: 50,
            svg: { fill: '#9900cc' }
        },
        {
            key: 3,
            amount: 40,
            svg: { fill: '#c61aff' }
        },
        {
            key: 4,
            amount: 95,
            svg: { fill: '#d966ff' }
        },
        {
            key: 5,
            amount: 35,
            svg: { fill: '#ecb3ff' }
        }
    ];
    const fakeData = [
        {type:"Cà phê", cost:"163.000 đ"},
        {type:"Nhà nghỉ", cost:"1.630.000 đ"},
        
    ]
    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <G
                    key={index}
                    x={labelCentroid[ 0 ]}
                    y={labelCentroid[ 1 ]}
                >
                    <Image
                        x={-15}
                        y={-15}
                        width={30}
                        height={30}
                        preserveAspectRatio="xMidYMid slice"
                        opacity="1"
                        href='https://firebasestorage.googleapis.com/v0/b/mywallet-5ba8f.appspot.com/o/icon-categories%2Frevenue-other-icon.png?alt=media&token=d431a8e5-0e71-435f-a64a-2eeaf8790529'
                    />                         
                </G>
            )
        })
    };
    return (
        <Container>
            <Header style={styles.headerStyle}>
                <Left>
                    <Button
                        transparent
                        onPress={() => navigate('Report')}
                    >
                        <Icon name='arrow-left' size={20} />
                    </Button>
                </Left>
                <Body>
                    {props.navigation.state.params&&<>
                    <Title style={styles.txtTitle}>{props.navigation.state.params.typeOfDetail}</Title>
                    <Subtitle>{props.navigation.state.params.typeOfChart}</Subtitle>
                    </>}
                    
                </Body>
            </Header>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around',paddingTop:30 }}>
                {props.navigation.state.params&&<>
                    <Text style={{fontWeight:'bold',fontSize:24}}>{props.navigation.state.params.typeOfDetail}</Text>
                    <Text style={{fontWeight:'bold',fontSize:24, color:'red'}}>260.000 đ</Text>
                </>}
                
                
            </View>
            <View style={{paddingTop:30}}>
                <PieChart
                    style={ { height: 200 } }
                    data={ dataPieChart }
                    valueAccessor={({ item }) => item.amount}
                >
                    <Labels />
                </PieChart>
            </View>
            <View style={{paddingTop:30}}>
                <List
                    dataArray={fakeData}
                    keyExtractor={(item, index) => index.toString()}
                    renderRow={(data) =>
                        <ListItem
                            thumbnail
                            noBorder
                            onPress={() => {
                                console.log("object")
                                navigate('DetailTransaction');
                            }}
                        >
                            <Left >
                                <Thumbnail
                                    square
                                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/mywallet-5ba8f.appspot.com/o/icon-categories%2Frevenue-other-icon.png?alt=media&token=d431a8e5-0e71-435f-a64a-2eeaf8790529' }}
                                    style={{ width: 40, height: 40 }}
                                />
                                
                            </Left>
                            <Body>
                                <Text style={{ fontWeight: "400" }}>{data.type}</Text>
                            </Body>
                            <Right>
                                <Text style={{ color: 'red' }}>{data.cost}</Text>
                            </Right>
                        </ListItem>
                    }>
                </List>
            </View>
        </Container>
    )
}

ReportDetailScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};
