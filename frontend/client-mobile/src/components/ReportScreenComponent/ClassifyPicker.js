import React from 'react';
import {View,Picker} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import ClassifyPickerStyle from './ClassifyPickerStyle';
export default function ClassifyPicker(props) {
    return (
        <View>
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
                selectedValue={props.typeOfChart}
                onValueChange={(itemValue)=>{props.setTypeOfChart(itemValue)}}
            >
                <Picker.Item label="4 tháng gần đây" value="4 tháng gần đây" />
                <Picker.Item label="Tháng này - Theo loại" value="Tháng này - Theo loại" />
            </Picker>
        </View>
    )
}