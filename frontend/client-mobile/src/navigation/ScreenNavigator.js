import React, { Component } from "react";
import { Platform, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import {
  Container,
  View,
  DatePicker,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Subtitle,
  Text,
  Button,
  Thumbnail
} from "native-base";

import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import { DrawerItems } from "react-navigation";

import ContactScreen from "../screens/Contact/ContactScreen";
import TransactionScreen from "../screens/Transaction/TransactionScreen/TransactionScreen";
import DetailTransactionScreen from "../screens/Transaction/DetailTransactionScreen/DetailTransactionScreen";
import DetailTransactionV2Screen from "../screens/Transaction/DetailTransactionScreen/DetailTransactionV2Screen";

import ReportScreen from "../screens/Report/ReportScreen";
import ReportDetailScreen from "../screens/Report/ReportDetail/ReportDetailScreen";

import AddNewTransactionScreen from "../screens/Transaction/AddNewTransactionScreen/AddNewTransactionScreen";
import EditTransactionScreen from "../screens/Transaction/EditTransactionScreen/EditTransactionScreen";

import ChooseGroupCategoryScreen from "../screens/Transaction/ChooseGroupCategoryScreen/ChooseGroupCategoryScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import AddCategoryScreen from "../screens/Categories/AddCategoryScreen/AddCategoryScreen";
import DetailCategoryScreen from "../screens/Categories/DetailCategoryScreen/DetailCategoryScreen";
import MergeCategoryScreen from "../screens/Categories/MergeCategoryScreen/MergeCategoryScreen";

import GettingStartScreen from "../screens/GettingStart/GettingStartScreen";
import IntroFirstScreen from "../screens/GettingStart/Introduce/IntroFirstScreen";
import IntroNextScreen from "../screens/GettingStart/Introduce/IntroNextScreen";
import LoginScreen from "../screens/GettingStart/Auth/LoginScreen";
import RegisterScreen from "../screens/GettingStart/Auth/RegisterScreen";
import AddBalanceScreen from "../screens/GettingStart/AddBalance/AddBalanceScreen";
import Icon from "react-native-vector-icons/FontAwesome5";
import ListImageScreen from "../screens/ListImage/ListImageScreen";
import DebtScreen from "../screens/Debt/DebtScreen";

import CashBackScreen from "../screens/Transaction/CashBack/CashBackScreen";
import DetailCashBackScreen from "../screens/Transaction/CashBack/DetailCashBackScreen";

import { WalletScreen } from "../screens/Wallet/WalletScreen";
import EditWalletScreen from '../screens/Wallet/EditWalletScreen';
import AddWalletScreen from '../screens/Wallet/AddWalletScreen';




import { HeaderTransaction } from "../components/TransactionComponent/HeaderTransaction";
import { HeaderChooseGroupCategory } from "../components/ChooseGroupCategoryComponent/HeaderChooseGroupCategory";



import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import linkIcon from "../constants/PathIcon";
import styles from "./StyleNavigator";

class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Button
          transparent
          onPress={this.toggleDrawer.bind(this)}
          style={{ marginLeft: 20 }}
        >
          <Icon name="bars" size={28} />
        </Button>
      </View>
    );
  }
}

const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: TransactionScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          title="GIAO DỊCH"
        />
      ),
      headerStyle: {
        backgroundColor: "#2db84c",
        height: 60
      },
      headerTintColor: "#fff",
      headerTitle: () => <HeaderTransaction />
    })
  }
});

const Report_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: ReportScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          title="BÁO CÁO"
        />
      ),
      headerStyle: {
        backgroundColor: "#2db84c",
        height: 60
      }
    })
  }
});

const Categories_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: CategoriesScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <NavigationDrawerStructure
          navigationProps={navigation}
          title="LOẠI CHI TIÊU - THU NHẬP"
        />
      ),
      headerStyle: {
        backgroundColor: "#2db84c",
        height: 60
      }
    })
  }
});

const Debt_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: DebtScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <NavigationDrawerStructure navigationProps={navigation} title="NỢ" />
      ),
      headerStyle: {
        backgroundColor: "#2db84c",
        height: 60
      }
    })
  }
});

const Account = () => (
  <View style={(style = styles.container)}>
    <View style={(style = styles.infoUser)}>
      <Thumbnail
        style={styles.imgAvatar}
        square
        source={linkIcon["avatar_wallet"]}
      />
      <Text style={styles.textNameUser}>Nguyễn Văn Hội</Text>
      <Text style={styles.textEmail}>vanhoinguyen98@gmail.com</Text>
    </View>
  </View>
);

const RootStack = createDrawerNavigator(
  {
    Account: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: () => <Account />
      }
    },

    //bars header
    Transaction: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: () => <Text style={styles.titleDrawer}>Sổ giao dịch</Text>,
        drawerIcon: () => <Icon2 name="book-multiple" size={28} />
      }
    },
    Debt: {
      screen: Debt_StackNavigator,
      navigationOptions: {
        drawerLabel: () => <Text style={styles.titleDrawer}>Sổ nợ</Text>,
        drawerIcon: () => <Icon2 name="notebook" size={28} />
      }
    },
    Report: {
      screen: Report_StackNavigator,
      navigationOptions: {
        drawerLabel: () => (
          <Text style={styles.titleDrawer}>Báo cáo - Thống kê</Text>
        ),
        drawerIcon: () => <Icon2 name="chart-bar-stacked" size={28} />
      }
    },
    Categories: {
      screen: Categories_StackNavigator,
      navigationOptions: {
        drawerLabel: () => (
          <Text style={{ fontSize: 16, fontWeight: "400", padding: 20 }}>
            Nhóm
          </Text>
        ),
        drawerIcon: () => <Icon2 name="google-circles-group" size={28} />
      }
    },
    //navigate header
    DetailTransaction: { screen: DetailTransactionScreen },
    DetailTransactionV2: { screen: DetailTransactionV2Screen },

    ReportDetail: { screen: ReportDetailScreen },
    ChooseGroupCategory: {
      screen: ChooseGroupCategoryScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    AddNewTransaction: { screen: AddNewTransactionScreen },
    EditTransaction: { screen: EditTransactionScreen },

    AddCategory: { screen: AddCategoryScreen },
    DetailCategory: { screen: DetailCategoryScreen },
    MergeCategory: { screen: MergeCategoryScreen },

    // Getting Start
    GettingStart: { screen: GettingStartScreen },
    IntroFirst: { screen: IntroFirstScreen },
    IntroNext: { screen: IntroNextScreen },
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    AddBalance: { screen: AddBalanceScreen },

    // List Image
    ListImage: { screen: ListImageScreen },

    // Contact
    Contact: { screen: ContactScreen },

    // Cashback
    CashBack: { screen: CashBackScreen },
    DetailCashBack: { screen: DetailCashBackScreen },

    // wallet
    Wallet: {
      screen: WalletScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    EditWallet: { screen: EditWalletScreen },
    AddWallet: { screen: AddWalletScreen }

  },
  {
    initialRouteName: 'Login',
    // backBehavior: 'none'
    // drawerType: 'back',
    // hideStatusBar: 'true'
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
