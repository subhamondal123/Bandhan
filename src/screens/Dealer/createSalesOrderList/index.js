import React from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, View, FlatList, TouchableOpacity, Image, Text, RefreshControl } from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import OrderListPage from "../../../pageShared/orderListPage";
import CustomerSubCategoryTab from "../../../pageShared/customerSubCategoryTab";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { NoDataFound } from "../../../shared";
import { StorageDataModification, Toaster } from "../../../services/common-view-function";
import { ErrorCode } from "../../../services/constant";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { pjpModifyData } from "./function";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const subCategoryData = [
    {
        id: 1,
        title: "Regular",
        icon: ImageName.ORDER_DUMMY_LOGO,

    },
    {
        id: 2,
        title: "Favourite",
        icon: ImageName.FAVOURITE_ICON,

    },
    {
        id: 2,
        title: "Popular",
        icon: ImageName.YELLOW_STAR_ICON,

    },
    {
        id: 4,
        title: "Suggested",
        icon: ImageName.BULLS_EYE_ICON,

    },

]
// this is create sales order list page 
class CreateSalesOrderList extends React.Component {
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
            customerListOrder: [],
            subCategoryArrData: subCategoryData,
            stateId: "",
            distId: "",
            zoneId: "",
            searchText: "",
            selectedContactTypeId: "",
            userData: {}
        };
    }
    //this is initial function which is call first 
    componentDidMount = async () => {
        await this._load();
        StoreUserOtherInformations("", {}, this.props);

    }
    // this is first function where set state data
    _load = async () => {
        let userData = await StorageDataModification.userCredential({}, "get")
        this.setState({
            stateId: userData.countriesData[0].stateId,
            distId: userData.countriesData[0].districtId,
            zoneId: userData.countriesData[0].zoneId,
            pageLoader: false
        })
        await this.storeInitialData(),
            await this._apiCallRes();
    };

    // for network erro

    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    onPressTile = (value) => {
        this.props.navigation.navigate("CreateOrderList", { data: value })
    }
    // for store initial state data
    storeInitialData = async () => {
        let listData = await StorageDataModification.SecondaryOrderListData({}, "get");
        if (listData == null || listData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                customerListOrder: listData.pjpList,
                totalDataCount: listData.totalCount,
                pageLoader: false
            })
        }
    }

    _apiCallRes = async () => {
        this.setState({ refreshing: false, });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchName": this.state.searchText ? this.state.searchText : "",
            // "stateId": this.state.stateId ? this.state.stateId : "",
            // "districtId": this.state.distId ? this.state.distId : "",
            // "zoneId": this.state.zoneId ? this.state.zoneId : "",
            "searchTextCustName": "",
            "searchTextCustType": "",
            "searchTextCustPhone": "",
            "searchTextCustBusinessName": "",
            "searchCustPartyCode": "",
            "searchCustVisitDate": "",
            "customerAccessType": "2",
            "searchFrom": "",
            "searchTo": "",
            "status": "",
            "contactType": "",
            "phoneNo": "",
            "isProject": "0",
            "contactTypeId": this.state.selectedContactTypeId ? this.state.selectedContactTypeId : "",
            "isDownload": "0",
            "approvalList": "0",
            "forCustomer": "1",
            "forOrderListing": "1"
        }
        await this.fetchListData(dataReq);
    }
    // this function used for fetching list data
    fetchListData = async (dataReq) => {
        let responseData = await MiddlewareCheck("registrationList", dataReq, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (this.state.pageNum == 0) {
                    let pjpData = await StorageDataModification.SecondaryOrderListData({}, "get");
                    let pjpListData = pjpModifyData(responseData);
                    if (pjpData == null || pjpData == undefined) {
                        this.setState({
                            customerListOrder: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        await StorageDataModification.SecondaryOrderListData(pjpListData, "store");
                    } else if (JSON.stringify(pjpData.pjpList) === JSON.stringify(pjpListData.pjpList)) {
                        this.setState({
                            customerListOrder: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        if (pjpData.totalCount !== pjpListData.totalCount) {
                            await StorageDataModification.SecondaryOrderListData(pjpListData, "store");
                        }
                    } else {
                        this.setState({
                            customerListOrder: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        await StorageDataModification.SecondaryOrderListData(pjpListData, "store");
                    }
                    this.setState({ initialApiCall: true })
                } else {
                    let pjpListData = pjpModifyData(responseData);
                    this.setState({
                        customerListOrder: [...this.state.customerListOrder, ...pjpListData.pjpList],
                        totalDataCount: pjpListData.totalCount
                    });
                }
            } else {
                if (this.state.pageNum == 0) {
                    await StorageDataModification.SecondaryOrderListData({}, "clear");
                    this.setState({
                        pageNum: 0,
                        limit: 10,
                        totalDataCount: 0,
                        customerListOrder: [],
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
    }


    onDropdownSelect = (value) => {
        let arr = this.state.customerListOrder;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == value.id) {
                arr[i].showHide = !arr[i].showHide
            } else {
                arr[i].showHide = false
            }
        }
        this.state.customerListOrder = arr;
        this.setState({ customerListOrder: this.state.customerListOrder })
    }
    // this function used for navigate to back screen
    _onBack = () => {
        this.props.navigation.goBack();
    };
    // this function used for design header section 
    _onHeaderSec = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerSubContainer}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                    </TouchableOpacity>
                    <View style={styles.csoContainer}>
                        <Text style={styles.csoTxt}>Create Sales Order</Text>

                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.tdbImg} />
                </View>
            </View>
        )
    }

    // for render list section
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
                <OrderListPage
                    data={item}
                    props={this.props}
                    onSelectTile={(value) => this.onPressTile(value)}
                    onSelectDropdown={(value) => this.onDropdownSelect(value)}
                />
            </View>
        )
    }

    subTabSec = () => {
        const onAddCustomer = () => {
            this.props.navigation.navigate("AddNewCustomer", { onPageRefresh: this.onRefresh })
        }
        return (
            <View style={styles.subTabContainer}>
                {this.state.subCategoryArrData.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <TouchableOpacity style={styles.mainTab} onPress={() => onAddCustomer()} activeOpacity={0.9}>
                            <View style={styles.imgSec}>
                                <Image source={ImageName.WHITE_PLUS_LOGO} style={styles.mainImg} />
                            </View>
                            <View style={styles.titleSec}>
                                <Text style={styles.titleTxt}>Add New</Text>
                            </View>
                        </TouchableOpacity>
                        {this.state.subCategoryArrData.map((item, key) => (
                            <View key={key}>
                                <CustomerSubCategoryTab data={item} />
                            </View>
                        ))}
                    </ScrollView>
                    :
                    null}
            </View>
        )
    }
    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View
                style={styles.loaderContainer}
            >
                <ActivityIndicator
                    size="large"
                    color={Color.COLOR.INDICATOR_COLOR.GRAY}
                />
            </View>
        ) : (
            <View style={{ marginBottom: 200 }} />
        );
    };

    //refresh list
    onRefresh = async () => {
        await this._onStatusChange();
        await this._apiCallRes();
    }

    // fetch more
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
                    if (this.state.customerListOrder.length >= this.state.totalDataCount) {
                        this.setState({ listLoader: false })
                        return null;
                    } else {
                        this._apiCallRes();
                    }
                }
            );
        }
    };
    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            customerListOrder: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }
// for design sub tab skeleton loader
    subTabSkeliton = () => {
        return (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
            </View>
        )
    }

    ViewSkeletonPlaceholder = () => {
        let resData = [];

        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginHorizontal: 10, marginTop: 10 }]} key={i}>
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
                        {this.subTabSkeliton()}
                        {this.ViewSkeletonPlaceholder()}
                    </SkeletonPlaceholder>
                    :
                    <React.Fragment>
                        {this.subTabSec()}
                        {this.state.customerListOrder.length > 0 ?
                            <React.Fragment>
                                <FlatList
                                    data={this.state.customerListOrder}
                                    renderItem={(item, key) => this.renderContactList(item, key)}
                                    keyExtractor={(item, key) => key}
                                    onEndReached={this.fetchMore}
                                    onEndReachedThreshold={0.1}
                                    ListFooterComponent={this.renderLoader}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={() => this.onRefresh()}
                                        />
                                    }
                                />
                            </React.Fragment>
                            :
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

            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CreateSalesOrderList);
