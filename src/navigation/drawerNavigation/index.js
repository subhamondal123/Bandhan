import React from 'react';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import styles from './style';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    Share,
} from 'react-native';
import { Dimension, FontFamily, FontSize, ImageName } from '../../enums';
import { LogOutModal } from '../../shared';
import { MiddlewareCheck } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { StorageDataModification, Toaster } from '../../services/common-view-function';
import { useDispatch, useSelector } from 'react-redux';
import { Dashboard, StockMainDetails, BrandingList, Scheme, Loyalty, GrievencePage, OrderList, Associates, ProfilePage, ChangePassword, LedgerList } from '../../screens';
import { AppInfo, App_uri } from '../../services/config';
import { PLAYSTORE_URL } from '../../../globalConstant';
import { OrderDashboard } from '../../screens/Dealer';
import { modifyMenuArrData } from './function';



const Drawer = createDrawerNavigator();

let drawerItems = [

    {
        name: "CUSTOMER",
        check: false,
        drawerItemValue: [
            {
                id: 1,
                name: "Order",
                icon: ImageName.HOME_WHITE,
                routeName: "OrderPage",
                menuName: "Order"
            },
            {
                id: 2,
                name: "Ledger",
                icon: ImageName.LEDGER_ICON,
                routeName: "LedgerPage",
                menuName: "Ledger"
            },
            // {
            //     id: 3,
            //     name: "Create Order",
            //     icon: ImageName.VISITS_WHITE,
            //     routeName: "OrderDashboard"
            // },
            {
                id: 3,
                name: "Invoice",
                icon: ImageName.LEDGER_ICON,
                routeName: "invoice",
                menuName: "Invoice"
            },
            {
                id: 4,
                name: "Refer Lead",
                icon: ImageName.ACTIVITY_WHITE,
                routeName: "referLead",
                menuName: "Refer Lead"
            },

            // {
            //     id: 5,
            //     name: "Contact Us",
            //     icon: ImageName.FEEDBACK_WHITE,
            //     routeName: "ContactUs"
            // },
            {
                id: 5,
                name: "Change Password",
                icon: ImageName.FEEDBACK_WHITE,
                routeName: "ChangePass",
                menuName: "Change Password"
            },
            {
                id: 6,
                name: "Share this App",
                icon: ImageName.SHARE_APP_WHITE,
                routeName: "ShareApp",
                menuName: "Share App"
            },

        ]
    },

]


class DrawerContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            nextActionCheck: false,
            selectDrawerItem: [],
            selectDrowerItemIndex: 0,
            selectDrawerSubItemIndex: 0,
            prevCheck: false,
            nextPrevHideCheck: false,
            logoutModal: false,
            logOutLoader: false,

            drawerItems: drawerItems,
            userDetails: {}
        }
    }

    componentDidMount = async () => {
        this._load();
    }

    _load = async () => {
        let modArrData = modifyMenuArrData(drawerItems, await StorageDataModification.userMenuPermision({}, "get"), 5);
        this.state.drawerItems = modArrData;
        // this.state.drawerItems = drawerItems;
        this.setState({
            drawerItems: this.state.drawerItems
        })
        this._onModifyTypeData(this.state.selectDrawerSubItemIndex);
        this.setState({
            userDetails: await StorageDataModification.userCredential({}, "get"),
            pageLoader: false,
        })

    }

    _onProfile = () => {
        this.props.navigation.navigate("ProfilePage")
    }

    _onOrder = () => {
        this.props.navigation.navigate("OrderList");
    }

    _onCreateOrder = () => {
        this.props.navigation.navigate("OrderDashboard");
    }

    closeDrawer = () => {
        this.props.navigation.closeDrawer();
    }

    // for logout section
    _onLogoutModal = () => {
        this.setState({
            logoutModal: !this.state.logoutModal
        })
    }

    _onModifyTypeData = (index) => {
        for (let i = 0; i < this.state.drawerItems.length; i++) {
            if (index == 0 || index == 1) {
                if (index == i) {
                    this.state.drawerItems[i].check = true;
                    if (this.state.drawerItems[i].drawerItemValue) {
                        // this._onDrawerSubItemSelect(this.state.drawerItems[i].drawerItemValue, 0);
                        this.setState({ selectDrawerItem: this.state.drawerItems[i].drawerItemValue })
                    }
                } else {
                    this.state.drawerItems[i].check = false;
                }
            }
        }
        this.setState({
            drawerItems: this.state.drawerItems,
            selectDrawerSubItemIndex: index,
            selectDrowerItemIndex: 0,
            prevCheck: false
        })
    }

    _onDrawerSubItemSelect = (drawerItemValue, selectDrowerItemIndex) => {
        let selectDrawerItem = [];
        if (drawerItemValue[selectDrowerItemIndex]) {
            selectDrawerItem = drawerItemValue[selectDrowerItemIndex];
        }
        this.setState({
            selectDrawerItem: selectDrawerItem,
            selectDrowerItemIndex: selectDrowerItemIndex
        })
    }

    _onShareApp = async () => {
        try {
            const result = await Share.share({
                message:
                    'Use this link to download the new SRMB application named Bandhan....\n' + PLAYSTORE_URL,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    _onSelectItem = (type) => {
        this.closeDrawer();
        switch (type) {
            case "Home":
                this.props.navigation.navigate("Dashboard", { data: this.props.CustomerRedux.loginData });
                break;

            case "OrderPage":
                this.props.navigation.navigate("OrderList");
                break;

            case "LedgerPage":
                this.props.navigation.navigate("LedgerList");
                break;

            case "OrderDashboard":
                this.props.navigation.navigate("OrderDashboard");
                break;

            case "lmsDashboard":
                this.props.navigation.navigate("Catalogue");
                break;
            case "invoice":
                this.props.navigation.navigate("InvoiceList");
                break;
            case "referLead":
                this.props.navigation.navigate("ReferLead");
                break;



            case "RateApp":
                // this.props.navigation.navigate("OrderList");
                break;
            case "Update":
                // this.props.navigation.navigate("OrderList");
                break;
            case "ShareApp":
                this._onShareApp()
                break;
            case "ContactUs":
                // this.props.navigation.navigate("OrderList");
                break;
            case "ChangePass":
                this.props.navigation.navigate("ChangePassword");
                break;
        }
    }


    // for logout api call
    _onLogout = async () => {
        this.setState({ logOutLoader: true });
        let responseData = await MiddlewareCheck("logout", {}, this.props);
        // let responseData = await MiddlewareCheck("customerLogout", {}, this.props);
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            await StorageDataModification.removeLoginData()
            this.props.dispatch({ type: "SET_USER_INFORMATION", payload: {} });
            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'LogIn' }] }));
        } else {
            Toaster.ShortCenterToaster(responseData.message);
        }
        this.setState({ logOutLoader: false, logoutModal: false });
    }

    render() {
        let marginBottom = 9;
        if (Dimension.height > 840) {
            marginBottom = 10;
        }

        if (this.state.pageLoader == true) {
            return null;
        } else {
            return (
                <DrawerContentScrollView
                    {...this.props}
                    contentContainerStyle={{ backgroundColor: '#4492ca', height: Dimension.height }}>
                    <LogOutModal
                        isVisible={this.state.logoutModal}
                        isLoading={this.state.logOutLoader}
                        onCloseModal={() => this._onLogoutModal()}
                        onLogout={() => this._onLogout()}
                    />
                    <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginHorizontal: '5%' }}>
                        <TouchableOpacity style={{ borderRadius: 100, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}
                            activeOpacity={0.9}
                            onPress={() => this._onProfile()}>
                            <Image source={this.state.userDetails.profilePic ? { uri: App_uri.IMAGE_VIEW_URI + this.state.userDetails.profilePic } : ImageName.USER_IMG} style={{ height: 40, width: 40, resizeMode: "contain", borderRadius: 100 }} />
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1, marginHorizontal: '2%' }}>
                            <Text style={{ fontFamily: FontFamily.FONTS.INTER.BOLD, color: "#FFF", fontSize: FontSize.MD }} onPress={() => this._onProfile()}>{this.state.userDetails.customerName}</Text>
                        </View>

                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                            <TouchableOpacity style={{ height: 23, width: 23, borderRadius: 100, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }} onPress={() => this._onLogoutModal()} activeOpacity={0.7}>
                                <Image source={ImageName.SHUT_DOWN_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                            <View style={{ width: '15%' }} />
                            <TouchableOpacity style={{ height: 23, width: 23, borderRadius: 100, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }} onPress={() => this.closeDrawer()} activeOpacity={0.7}>
                                <Image source={ImageName.MULTIPLY_LOGO} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: '5%' }}>
                        <View style={{ width: '78%' }}>
                            {this.state.selectDrawerItem.map((item, key) => (
                                <View style={{ flexDirection: 'row' }} key={key}>
                                    <TouchableOpacity style={[styles.drawerImg, key == 0 ? { borderTopRightRadius: 10 } : key == this.state.selectDrawerItem.length - 1 ? { borderBottomRightRadius: 10 } : {}]} onPress={() => this._onSelectItem(item.routeName)}>
                                        <Image source={{ uri: item.icon }} style={styles.imgView} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.textView} onPress={() => this._onSelectItem(item.routeName)}>
                                        <Text style={styles.text}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: Dimension.height / 1.1 }}>
                        <Text style={{ fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, color: "#fff", fontSize: FontSize.XS }}>Version - {AppInfo.getCurrentAppVersion()}</Text>
                    </View>
                </DrawerContentScrollView>
            )
        }
    }
}


function DrawerNav() {
    const reduxData = useSelector(state => state);
    const dispatch = useDispatch();
    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            drawerContent={props => <DrawerContent {...props} {...reduxData} dispatch={dispatch} />}
            screenOptions={{
                drawerPosition: 'right',
                headerShown: false,
                drawerActiveBackgroundColor: '#002955',
                // drawerInactiveBackgroundColor: '#014a8b',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#fff',
                drawerLabelStyle: {
                    marginLeft: -20,
                    fontFamily: FontFamily.FONTS.INTER.BOLD,
                    fontSize: 15,
                },
                drawerStyle: {
                    width: Dimension.width
                }
            }}>
            <Drawer.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerShown: false,
                    drawerLabel: "Dashboard",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.MENU_SQUARED} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />

            <Drawer.Screen
                name="StockMainDetails"
                component={StockMainDetails}
                options={{
                    headerShown: false,
                    drawerLabel: "Stock Update",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.COINS} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="BrandingList"
                component={BrandingList}
                options={{
                    headerShown: false,
                    drawerLabel: "Branding",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.COINS} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="Scheme"
                component={Scheme}
                options={{
                    headerShown: false,
                    drawerLabel: "Scheme",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.ACTIVITY_LOGO} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />

            <Drawer.Screen
                name="Loyalty"
                component={Loyalty}
                options={{
                    headerShown: false,
                    drawerLabel: "Loyalty",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.COINS} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="GrievencePage"
                component={GrievencePage}
                options={{
                    headerShown: false,
                    drawerLabel: "Grievence",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.COINS} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="OrderList"
                component={OrderList}
                options={{
                    headerShown: false,
                    drawerLabel: "Order",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.COINS} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="LedgerList"
                component={LedgerList}
                options={{
                    headerShown: false,
                    drawerLabel: "Ledger",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.LEDGER_ICON} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />

            <Drawer.Screen
                name="Associates"
                component={Associates}
                options={{
                    headerShown: false,
                    drawerLabel: "Order",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.COINS} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="ProfilePage"
                component={ProfilePage}
                options={{
                    headerShown: false,
                    drawerLabel: "ProfilePage",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.COINS} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />
            <Drawer.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    headerShown: false,
                    drawerLabel: "Change Password",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.COINS} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />

            <Drawer.Screen
                name="OrderDashboard"
                component={OrderDashboard}
                options={{
                    headerShown: false,
                    drawerLabel: "Create Order",
                    drawerIcon: ({ focused, size }) => (
                        <Image source={ImageName.LEDGER_ICON} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    )
                }}
            />

        </Drawer.Navigator>
    )
}

export default DrawerNav;