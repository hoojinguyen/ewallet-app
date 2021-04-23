import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { Container, Header, Content, List, ListItem, Text, Separator, Left, Right, Body, Button, Title, Thumbnail, Fab, Icon as IconAdd, } from 'native-base';

import styles from './DebtStyle';
import Drawer from 'react-native-drawer';
import DrawerContent from '../../drawer-content/DrawerContent';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

import { TabPayable } from '../../components/Debt/TabPayable';
import { TabReceivable } from '../../components/Debt/TabReceivable';

export default function DebtScreen() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'payable', title: 'Cần trả' },
        { key: 'receivable', title: 'Cần thu' },
    ]);

    const renderScene = SceneMap({
        payable: TabPayable,
        receivable: TabReceivable,
    });

    const { navigate } = useNavigation();

    const drawer = useRef();

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#2db84c' }}
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
        </Container>
        // </Drawer>

    );
}
DebtScreen.navigationOptions = {
    headerTitle: "Sổ nợ"
};
