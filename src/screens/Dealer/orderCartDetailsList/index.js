import React from "react";
import { Image, SafeAreaView, Text, View, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, NoDataFound } from "../../../shared";
import { DynamicOrderCartDetailsList } from "../../../pageShared";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { DateConvert, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { modifyProfileData, pjpModifyData } from "./function";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// this is dealer cart details page 
class DealerCartDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: false,
            listLoader: false,
            refreshing: true,
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            initialApiCall: false,
            cartDetailsList: [],
            totalAmount: "",
            searchText: "",
            selectedContactTypeId: "",
            deliveryPartnerArr: [],
            deliveryPartnerId: {},
            deliveryPartnerLoader: false,
            placeOrderLoader: false,
            propData: this.props.route.params.data,
            profileData: {},
        };
    }
    // this is a initial function which is call first
    componentDidMount = async () => {
        this.getProfileData()
        await this.storeInitialData()
        await this._load();
    }

    // for back action 
    _onBack = () => {
        this.props.navigation.goBack();
        this.props.route.params.onUpdateCart()
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    // this function used for store data 
    storeInitialData = async () => {
        let listData = await StorageDataModification.cardDetailsListData({}, "get");
        if (listData == null || listData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                cartDetailsList: listData.pjpList,
                totalDataCount: listData.totalCount,
                pageLoader: false
            })
        }
    }
    // for fetching profile data
    getProfileData = async () => {
        let cust = await StorageDataModification.userCredential({}, "get")
        let custId = cust.customerId.toString();
        let reqData = { customerId: custId }
        let responseData = await MiddlewareCheck("getCustomerDataWithCartItemCount", reqData, this.props)
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedProfileData = modifyProfileData(responseData.response)
                this.setState({
                    profileData: modifiedProfileData
                })
            }
        }
    }
    // this function used for design header section 
    _onHeaderSec = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headSubContainer}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                    </TouchableOpacity>
                    <View style={styles.cartTxtDSec}>
                        <Text style={styles.cartTxt}>Cart Detail</Text>
                    </View>
                    <View style={styles.pDataSec} >
                        <Image source={ImageName.SHOPING_ORDER_BOX} style={styles.sobImg} />
                        <View style={{ width: 5 }} />
                        <Text style={styles.cartCount}>{this.state.profileData.cartCount}</Text>
                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.tdiImg} />
                </View>
            </View>
        )
    }

    // this is the first function where set the state data
    _load = async () => {
        let cust = await StorageDataModification.userCredential({}, "get")
        let custId = cust.customerId.toString();
        this.setState({ refreshing: false });
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "customerId": custId,
            "orderStatus": "0",
            "isCustomer": "1"
        }
        let responseData = await MiddlewareCheck("getListForCartDetails", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (this.state.pageNum == 0) {
                    let pjpData = await StorageDataModification.cardDetailsListData({}, "get");
                    let pjpListData = pjpModifyData(responseData);
                    if (pjpData == null || pjpData == undefined) {
                        this.setState({
                            cartDetailsList: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        await StorageDataModification.cardDetailsListData(pjpListData, "store");
                    } else if (JSON.stringify(pjpData.pjpList) === JSON.stringify(pjpListData.pjpList)) {
                        this.setState({
                            cartDetailsList: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        if (pjpData.totalCount !== pjpListData.totalCount) {
                            await StorageDataModification.cardDetailsListData(pjpListData, "store");
                        }
                    } else {
                        this.setState({
                            cartDetailsList: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        await StorageDataModification.cardDetailsListData(pjpListData, "store");
                    }
                    this.setState({ initialApiCall: true })
                } else {
                    let pjpListData = pjpModifyData(responseData);
                    this.setState({
                        cartDetailsList: [...this.state.cartDetailsList, ...pjpListData.pjpList],
                        totalDataCount: pjpListData.totalCount
                    });
                }
            } else {
                if (this.state.pageNum == 0) {
                    await StorageDataModification.cardDetailsListData({}, "clear");
                    this.setState({
                        pageNum: 0,
                        limit: 10,
                        totalDataCount: 0,
                        cartDetailsList: [],
                        initialApiCall: true
                    });
                }
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            filterLoader: false,
            pageLoader: false,
            listLoader: false,
            listDataLoader: false
        })
    };

    // for render contact list 
    renderContactList = (item, key) => {
        return (
            <View style={{}}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    listSection = (item, key) => {
        return (
            <View key={key}>
                <DynamicOrderCartDetailsList
                    data={item}
                    props={this.props}
                    onPressRemove={() => this.onRemoveItem(item, key)}

                />
            </View>
        )
    }

    //for remove item
    onRemoveItem = (item, key) => {
        let arr = this.state.cartDetailsList;
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {

            } else {
                newArr.push(arr[i])
            }
        }
        this.state.cartDetailsList = newArr;
        this.state.totalDataCount = this.state.totalDataCount - 1
        this.setState({ cartDetailsList: this.state.cartDetailsList, totalDataCount: this.state.totalDataCount })
        this.removeFromCart(item);

    }

    // romove card list api call here
    removeFromCart = async (item) => {
        let reqData = {
            "itemId": item.id,
        }
        let responseData = await MiddlewareCheck("deleteItemFromCart", reqData, this.props);
        if (responseData == false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                Toaster.ShortCenterToaster(responseData.message)
                this.state.propData.cartCount = this.state.propData.cartCount == 0 ? this.state.propData.cartCount : this.state.propData.cartCount - 1;
                this.setState({
                    propData: this.state.propData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onPlaceOreder = async () => {
        let totalQuantity = 0;
        for (let i = 0; i < this.state.cartDetailsList.length; i++) {
            totalQuantity = parseFloat(totalQuantity) + parseFloat(this.state.cartDetailsList[i].quantity)
        }
        this.setState({ placeOrderLoader: true });
        let reqData = {
            "totalAmount": this.state.totalAmount ? this.state.totalAmount : "",
            "remarks": '',
            "createdAt": DateConvert.fullDateFormat(new Date()),
            "deliveryDate": null,
            "vehicleNo": '',
            "deliveryStartDatetime": null,
            "deliveryEndDatetime": null,
            "approvedAt": DateConvert.fullDateFormat(new Date()),
            "orderNumber": this.state.cartDetailsList[0].recordNumber ? this.state.cartDetailsList[0].recordNumber : "",
            "contactId": this.props.route.params.data.userId ? this.props.route.params.data.userId : "",
            "deliveryPartnerId": "0",
            "totalOrderQty": totalQuantity
        }
        this.setState({ placeOrderLoader: true });
        let responseData = await MiddlewareCheck("placeNewOrder", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.props.navigation.navigate("OrderSuccessFully", { orderId: this.state.cartDetailsList[0], onUpdateCart: this.getProfileData })
                this.setState({
                    cartDetailsList: []
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ placeOrderLoader: false });
    }

    _onAddMore = () => {
        this.props.navigation.navigate("CreateOrderList")

    }
    // for design footer section 
    _onfooterSec = () => {
        let totalAountData = 0;
        for (let i = 0; i < this.state.cartDetailsList.length; i++) {
            totalAountData = totalAountData + this.state.cartDetailsList[i].totalPrice
        }
        this.state.totalAmount = totalAountData;
        return (
            <>
                <View style={styles.totalItemSec}>
                    <View style={styles.totalItemSubSec}>
                        <View style={styles.totalItemTxtSec}>
                            <Text style={styles.totalTxt}>Total</Text>
                            <View style={styles.itemTxtSec}>
                                <Text style={styles.itemTxt}>{this.state.totalDataCount} items</Text>
                            </View>
                        </View>
                        <Text style={styles.tmTxt}>{'\u20B9' + " " + this.state.totalAmount}</Text>
                    </View>
                </View>
                <View style={styles.btnSec}>
                    <View style={{ flex: 1 }}>
                        {/* <BigTextButton
                            text={"Add More"}
                            backgroundColor={"#1F2B4D"}
                            borderRadius={30}
                            fontSize={14}
                            onPress={() => this._onAddMore()}
                        /> */}
                    </View>
                    <View style={{ width: 95 }} />
                    {this.state.placeOrderLoader ?
                        <View style={styles.activitySec}>
                            <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                        </View> :
                        <View style={{ flex: 1 }}>
                            <BigTextButton
                                text={"Place Order"}
                                backgroundColor={"#F13748"}
                                borderRadius={30}
                                fontSize={14}
                                onPress={() => this._onPlaceOreder()}
                            />
                        </View>
                    }
                </View>
            </>
        )
    }
    // for fetch more data 
    fetchMore = async () => {
        if (this.state.initialApiCall) {
            if (this.state.listLoader) {
                return null;
            }
            this.setState(
                (prevState) => {
                    return { listLoader: true, pageNum: prevState.pageNum + 1 };
                },
                () => {
                    if (this.state.cartDetailsList.length >= this.state.totalDataCount) {
                        this.setState({ listLoader: false })
                        return null;
                    } else {
                        this._load();
                    }
                }
            );
        }
    };

    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View style={styles.loaderActvitySec}>
                <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
            </View>
        ) : (
            <View style={{ marginBottom: 200 }} />
        );
    };

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            cartDetailsList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }

    //refresh list data
    onRefresh = async () => {
        await this._onStatusChange();
        await this._load();
    }

    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10, marginHorizontal: 12 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._onHeaderSec()}
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        {this.ViewSkeletonPlaceholder()}
                    </SkeletonPlaceholder> :
                    <React.Fragment>
                        {this.state.cartDetailsList.length > 0 ?
                            <React.Fragment>
                                <FlatList
                                    data={this.state.cartDetailsList}
                                    renderItem={(item, key) => this.renderContactList(item, key)}
                                    keyExtractor={(item, key) => key}
                                    onEndReached={this.fetchMore}
                                    onEndReachedThreshold={0.1}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={() => this.onRefresh()}
                                        />
                                    }
                                />
                                {this._onfooterSec()}
                            </React.Fragment> :
                            <React.Fragment>
                                {this.state.initialApiCall ?
                                    <View style={{ marginTop: 20, height: Dimension.height }}>
                                        <NoDataFound />
                                    </View>
                                    :
                                    null
                                }
                            </React.Fragment>
                        }

                    </React.Fragment>
                }
                <View style={{ marginBottom: 80 }} />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ stateCheckForNetwork },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DealerCartDetails);
