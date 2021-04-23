import React,{useEffect,useState} from 'react';
import {View,List,ListItem,Left,Body,Right,Text,Thumbnail} from 'native-base';
import { useNavigation} from 'react-navigation-hooks';
// import DataListStyle from './DataListStyle';
export default function DataList(props) {
    // console.log(props.expenseData,"expenseData")
    // console.log(props.typeOfChart === "4 tháng gần đây")
    // console.log(props.typeOfData === "Chi tiêu")
    // const [expenseData,setExpenseData] = useState([]);
    // const [incomeData,setIncomeData] = useState([]);
    // useEffect(() => {
    //     let expense = [...props.expenseData]
    //     let income = [...props.incomeData]
    //     for(let i = 0;i<expenseData.length;i++ ){
    //         expense[i].month = i + 9;
    //     };
    //     for(let i = 0;i<incomeData.length;i++ ){
    //         income[i].month = i + 9;
    //     };
    //     console.log(expense,income)
    //     setExpenseData(expense);
    //     setIncomeData(income);
    // }, [])
    
    const { navigate } = useNavigation();
    return (
        props.typeOfChart === "4 tháng gần đây" ?
        <View>
            {props.typeOfData === "Chi tiêu" ? 
            <List
                dataArray={props.expenseData}
                keyExtractor={(item, index) => index.toString()}
                renderRow={(data,index,rowID) =>{
                    // console.log(rowID)
                return  <ListItem
                        thumbnail
                        noBorder
                        onPress={() => {
                            
                            navigate('ReportDetail',{typeOfChart : 'Overtime',typeOfDetail : 'Ăn uống'});
                        }}
                    >
                        <Left style={{ flexDirection: "column" }}>
                            <Text style={{ fontWeight: "400" }}>Tháng {rowID +9}</Text>
                            <Text >2019</Text>

                        </Left>
                        <Body>

                        </Body>
                        <Right>
                            <Text style={{ color: 'red' }}>{data*1000} đ</Text>
                        </Right>

                    </ListItem>
                }
                    
                }>
            </List> 
            :
            <List
            dataArray={props.incomeData}
            keyExtractor={(item, index) => index.toString()}
            renderRow={(data) =>
                <ListItem
                    thumbnail
                    noBorder
                    onPress={() => {
                        
                        navigate('ReportDetail',{typeOfChart : 'Overtime',typeOfDetail : 'Ăn uống'});
                    }}
                >
                    <Left style={{ flexDirection: "column" }}>
                        <Text style={{ fontWeight: "400" }}>Tháng {data.month}</Text>
                        <Text >2019</Text>

                    </Left>
                    <Body>

                    </Body>
                    <Right>
                        <Text style={{ color: 'red' }}>{data *1000} đ</Text>
                    </Right>

                </ListItem>
            }>
        </List>
            }
            
        </View>
        :
        <></>
        // <View>
        //     {props.typeOfData === "Expense" ? 
        //     <List
        //         dataArray={props.expenseData}
        //         keyExtractor={(item, index) => index.toString()}
        //         renderRow={(data) =>
        //             <ListItem
        //                 thumbnail
        //                 noBorder
        //                 onPress={() => {
                            
        //                     navigate('ReportDetail',{typeOfChart : 'Overtime',typeOfDetail : 'Ăn uống'});
        //                 }}
        //             >
        //                 <Left style={{ flexDirection: "column" }}>
        //                     {/* <Text style={{ fontWeight: "400" }}>{data.key}</Text> */}
        //                     <Text >2019</Text>

        //                 </Left>
        //                 <Body>

        //                 </Body>
        //                 <Right>
        //                     <Text style={{ color: 'red' }}>{data} đ</Text>
        //                 </Right>

        //             </ListItem>
        //         }>
        //     </List> 
        //     :
        //     <List
        //     dataArray={props.incomeData}
        //     keyExtractor={(item, index) => index.toString()}
        //     renderRow={(data) =>
        //         <ListItem
        //             thumbnail
        //             noBorder
        //             onPress={() => {
                        
        //                 navigate('ReportDetail',{typeOfChart : 'Overtime',typeOfDetail : 'Ăn uống'});
        //             }}
        //         >
        //             <Left style={{ flexDirection: "column" }}>
        //                 {/* <Text style={{ fontWeight: "400" }}>{data.key}</Text> */}
        //                 <Text >2019</Text>

        //             </Left>
        //             <Body>

        //             </Body>
        //             <Right>
        //                 <Text style={{ color: 'red' }}>0 đ</Text>
        //             </Right>

        //         </ListItem>
        //     }>
        // </List>
        //     }
        // </View>
        
    )
}