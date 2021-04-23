import React from 'react';
import {View,Picker} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import MoneyInfoPickerStyle from './MoneyInfoPickerStyle';
export default function MoneyInfoPicker(props) {

    return (
            <View style={{ marginTop: 20 }}>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    textStyle={{ color: "#5cb85c" }}
                    itemStyle={{
                        backgroundColor: "#d3d3d3",
                        marginLeft: 0,
                        paddingLeft: 10
                    }}
                    itemTextStyle={{ color: '#788ad2' }}
                    style={{ width: undefined }}
                    selectedValue={props.typeOfData}
                    onValueChange={(itemValue)=>{props.setTypeOfData(itemValue)}}
                >
                    <Picker.Item label="Chi tiêu" value="Chi tiêu" />
                    <Picker.Item label="Thu vào" value="Thu vào" />
                    {/* <Picker.Item label="Net Income" value="Net Income" /> */}
                </Picker>
            </View> 
    )
}