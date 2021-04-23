import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useRef } from "react";
import { MergeCategory as styles } from "./MergeCategoryStyle";
import { TextInput } from "react-native";
import {
    Container,
    Content,
    Text,
    Left,
    Right,
    Thumbnail,
    Body,
    Button,
    List,
    ListItem,
    Header,
    Title,
    Separator
} from "native-base";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";

import linkIcon from "../../../constants/PathIcon";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { dataCategories } from "../../../api/GetDataCategory";

export default function MergeCategoryScreen(props) {
    const { navigate, goBack } = useNavigation();
    const data = props.navigation.getParam('data', '');

    const [categoryParentId, setCategoryParentId] = useState('');
    const [nameCategoryParent, setNameCategoryParent] = useState('');
    const [iconCategoryParent, setIconCategoryParent] = useState('avatar_unknown');

    useEffect(() => {
        setCategoryParentId(props.navigation.getParam('idCategory', categoryParentId));
        setIconCategoryParent((props.navigation.getParam('iconChanged', iconCategoryParent)));
        setNameCategoryParent((props.navigation.getParam('nameCategory', nameCategoryParent)));
    });

    function handleMergeCategory() {
        const groupFirst = data.categoryId;
        const groupTwo = categoryParentId;
        console.log("Group First: " + groupFirst);
        console.log("Group two: " + groupTwo);
    }

    function chooseGroup(data) {
        navigate('ChooseGroupCategory', { fromScreen: 'MergeCategory' });
    }

    return (
        <Container>
            <Header style={styles.headerStyle}>
                <Left>
                    <Button transparent onPress={() => navigate('Categories')}>
                        <Icon name="arrow-left" size={20} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.txtTitle}>Ghép nhóm</Title>
                </Body>
                <Right>
                    <Button transparent hasText onPress={() => { handleMergeCategory() }}>
                        <Text style={styles.txtSave}>Lưu</Text>
                    </Button>
                </Right>
            </Header>

            <Content>
                <Separator bordered>
                    <Text style={styles.txtTitleCategory}>Hợp nhất nhóm này</Text>
                </Separator>
                <List >
                    <ListItem
                        thumbnail>
                        <Left>
                            <Thumbnail style={styles.thumbnail} square source={linkIcon[data.linkIcon]} />
                        </Left>
                        <Body>
                            <Text>{data.name}</Text>
                        </Body>
                    </ListItem>
                </List>
                <Separator bordered>
                    <Text style={styles.txtTitleCategory}>Với nhóm này</Text>
                </Separator>
                <List >
                    <ListItem
                        onPress={() => { chooseGroup(data) }}
                        thumbnail>
                        <Left>
                            <Thumbnail style={styles.thumbnail} square source={linkIcon[iconCategoryParent]} />
                        </Left>
                        <Body>
                            <TextInput
                                style={styles.txtGroup}
                                placeholder='Chọn nhóm'
                                editable={false}
                                value={nameCategoryParent}
                            />
                        </Body>
                    </ListItem>
                </List>

            </Content>
        </Container>
    );
}

MergeCategoryScreen.navigationOptions = {
    header: null,
    drawerLabel: () => null
};
