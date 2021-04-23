import React from 'react';
import { Right, Button, Text, View } from 'native-base';
import { Alert } from 'react-native';

import styles from './HeaderDetailTransactionStyle';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import axios from "axios";
export default function HeaderDetailTransaction(props) {
    const { navigate } = useNavigation();
    const data = props.dataDetail.navigation.state.params.dataDetail;
   
    function shareClick() {
        Alert.alert("Share " + data.nameTransaction);
        navigate('DetailTransaction');
    }

    function editClick() {
        navigate('AddNewTransaction',
            {
                nameCategory: data.name,
                moneyTransaction: data.money,
                description: data.description,
                callback : props.callback
            }
        );
    }

    function deleteClick() {
       
        axios.delete(`http://10.0.2.2:3000/api/v1/transactions/${data.id}`).then(res => {
             
            props.callback();
            navigate('Transaction');
        }).catch(error => {
            console.log(error)
        })
        
    }

    return (
        <View style={styles.right}>
            <Button
                transparent
                onPress={editClick}
                style={styles.buttonPaddingLeft}
            >
                <Icon name="circle-edit-outline" size={30} color="grey" />
            </Button>
            <Button
                transparent
                onPress={deleteClick}
                style={styles.buttonPaddingLeft}
            >
                <Icon name="trash-can" size={30} color="grey" />
            </Button>
        </View>
    );
}
