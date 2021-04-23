import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { Button, Text, Header, Title, Body, Right, Left } from 'native-base';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import styles from './HeaderGroupCategoryStyle';
const { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function HeaderChooseGroupCategory(props) {
    const { navigate, goBack } = useNavigation();
    return (
        <Header style={styles.headerStyle}>
            <Left>
                <Button
                    transparent
                    onPress={() => navigate('AddNewTransaction')}
                >
                    <Icon name='arrow-left' size={20} />
                </Button>
            </Left>
            <Body>
                <Title style={styles.txtTitle}>Chọn nhóm</Title>
            </Body>
            <Right>
            </Right>
        </Header>

    );
}
