import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { Button, Text, List, ListItem, Left, Body, Right, Switch, Thumbnail, CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import linkIcon from "../../constants/PathIcon";

export default function ListItemCategories(props) {
    const { navigate } = useNavigation();
    const data = props.data;
    const fromScreen = props.fromScreen;
    const [nameCategory, setNameCategory] = useState('');
    return (
        <List
            dataArray={data}
            keyExtractor={(item, index) => index.toString()}
            renderRow={(data) => {
                let name = data.nameCategory;
                return (
                    <ListItem
                        icon
                        style={{ marginBottom: 30 }}
                        onPress={() => {


                            if (fromScreen == "AddNewTransaction") {
                                navigate('AddNewTransaction', {
                                    idCategory: data.id,
                                    nameCategory: data.displayName,
                                    iconChanged: data.image || null,
                                    typeTransaction: data.transactionGroup.displayName
                                });
                            }
                            else {
                                navigate('MergeCategory', {
                                    idCategory: data.id,
                                    nameCategory: data.displayName,
                                    iconChanged: data.linkIcon || null,
                                    typeTransaction: data.transactionGroup.displayName
                                });
                            }

                        }}
                    >
                        <Left>
                            <Thumbnail
                                square
                                square source={linkIcon[data.image] || null}
                                style={{ width: 30, height: 30 }}
                            />
                        </Left>
                        <Body>
                            <Text>{data.displayName}</Text>
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                )
            }

            }>
        </List>
    )
}

