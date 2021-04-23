import React from 'react';
import {View,List,Left,Body,Right,Text,ListItem} from 'native-base';
import { Text as TextChart } from 'react-native-svg'
import { StyleSheet } from 'react-native';
import {  G, Image } from 'react-native-svg';
import { BarChart, XAxis, YAxis,Grid ,PieChart} from 'react-native-svg-charts';
// import ChartStyle from './ChartStyle';
export default function Chart(props) {
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
    // console.log(props.dataPieChart,'dataPieChart')
    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <TextChart
                    key={index}
                    x={pieCentroid[ 0 ]}
                    y={pieCentroid[ 1 ]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={24}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {index}
                </TextChart>
            )
        })
    }
    const styles = StyleSheet.create({
        container: {
            height: '30%',
            flexDirection:'row',
            paddingRight : 10,
            paddingLeft :10

        }
    });
    function kindOfData(){
        // console.log(props.expenseData,'expenseData')
        // console.log(props.incomeData,'incomeData')
        // console.log(props.typeOfData,props.expenseData);
        if(props.typeOfData === 'Chi tiêu'){
            return <BarChart
            style={{ flex: 1 }}
            data={ props.expenseData }
            svg={{fill :'green'}}
            contentInset={{ top: 30, bottom: 30 }}>
                {/* <Grid></Grid> */}
            </BarChart> 
        }
        else if(props.typeOfData === 'Thu vào'){
            return <BarChart
            style={{ flex: 1 }}
            data={ props.incomeData }
            svg={{fill :'green'}}
            contentInset={{ top: 30, bottom: 30 }}>
                {/* <Grid></Grid> */}
            </BarChart> 
        }
    
        else return <></>  ;
    }
    return (
        props.typeOfChart === '4 tháng gần đây' ?
            props.typeOfData === "Chi tiêu" ?
            <>
            <View style={styles.container}>
                {/* <YAxis
                style={{ marginHorizontal: 10}}
                data={ props.dataBarChart }
                formatLabel={ (value, index) => index }
                contentInset={{ left: 25, right: 25 }}
                svg={{ fontSize: 10, fill: 'red' }}
            
                /> */}
                {kindOfData()}                            
            </View>  
            <View style={{marginLeft:20}}>
                <XAxis
                    style={{ marginHorizontal: 5, marginTop: 0}}
                    data={ [9,10,11,12] }
                    formatLabel={ (value, index) => `Tháng ${value + 9}` }
                    contentInset={{ left: 25, right: 25 }}
                    svg={{ fontSize: 10, fill: 'red' }}
                /> 
            </View>
            </>
        : 
            <>
            <View style={styles.container}>
            {/* <YAxis
            style={{ marginHorizontal: 10}}
            data={ props.dataBarChart }
            formatLabel={ (value, index) => index }
            contentInset={{ left: 25, right: 25 }}
            svg={{ fontSize: 10, fill: 'red' }}
        
            /> */}
                {kindOfData()}                            
            </View>  
            <View style={{marginLeft:20}}>
                <XAxis
                    style={{ marginHorizontal: 5, marginTop: 0}}
                    data={ [9,10,11,12]}
                    formatLabel={ (value, index) => `Tháng ${value}` }
                    contentInset={{ left: 25, right: 25 }}
                    svg={{ fontSize: 10, fill: 'red' }}
                /> 
            </View> 
            </>
        :
           <>
            <PieChart
            style={ { height: 200 } }
            data={ props.dataPieChart }
            // valueAccessor={({ item }) => item}
            >
                <Labels />  
            </PieChart>

            <List
            dataArray={props.dataPieChart}
            keyExtractor={(item, index) => index.toString()}
            renderRow={(data,sectionID,rowID) =>
                <ListItem
                    thumbnail
                    noBorder
                >
                    <Left style={{ flexDirection: "column" }}>
                        <Text style={{ fontWeight: "400" }}>{rowID}</Text>
                        <Text >{data.displayName}</Text>
                    </Left>
                    <Body>

                    </Body>
                    <Right>
                        <Text style={{ color: 'red' }}>{formatMoney(data.value, 0, '.', ',') } đ</Text>
                    </Right>

                </ListItem>
            }>
            </List>
            </>
              
    )
}
// if else expense or in come here