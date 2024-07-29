import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View, FlatList, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { CustomerStatusTab, CustomerSubCategoryTab, OrderHistoryListPage } from "../../../pageShared";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, FilterModal, NoDataFound, VirtualizedView } from "../../../shared";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { DateConvert, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { modifyProfileData, orderHistoryModifyData } from "./function";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const subCategoryData = [
    {
        id: "",
        title: "All",
        check: true

    },
    {
        id: 1,
        title: "Approved",
        check: false

    },
    {
        id: 2,
        title: "Pending",
        check: false

    },
    {
        id: 3,
        title: "Hold",
        check: false
    },
    {
        id: 4,
        title: "Partially Approved",
        check: false
    },
    {
        id: 0,
        title: "Rejected",
        check: false

    },


]
// this is order history list page 
class OrderHistoryList extends React.Component {
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
            orderHistoryList: [],
            subCategoryArrData: subCategoryData,
            profileData: {},
            profileLoader: false,
            fromDate: "",
            toDate: "",
            selectedCategoryId: "",
            filterVisibility: false,
            totalOutStanding: "0"
        };
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        // await this.storeInitialData()
        await this._load();
        await this.getProfileData()
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    // this is the first function where set the state data
    _load = async () => {
        await this.orderHistoryApi(this.state.selectedCategoryId)
    };
    // for back button this function used
    _onBack = () => {
        this.props.navigation.goBack();
    };

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

    // store initial Data
    storeInitialData = async () => {
        let listData = await StorageDataModification.orderHistoryListData({}, "get");
        if (listData == null || listData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                orderHistoryList: listData.pjpList,
                totalDataCount: listData.totalCount,
                pageLoader: false
            })
        }
    }
    // this function used for order list api call
    orderHistoryApi = async (selectedCategoryId) => {
        this.setState({ refreshing: false, });
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "orderStatus": "1",
            "approvedStatus": selectedCategoryId,
            "searchFrom": this.state.fromDate,
            "searchTo": this.state.toDate,
        }
        let responseData = await MiddlewareCheck("getOrderHistory", reqData, this.props);
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let pjpListData = orderHistoryModifyData(responseData);

                this.setState({
                    orderHistoryList: [...this.state.orderHistoryList, ...pjpListData.pjpList],
                    totalDataCount: pjpListData.totalCount,
                    totalOutStanding: pjpListData.pjpList[0].totalOutstanding
                });
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
        })
    }

    // for render the list function
    renderContactList = (item,) => {
        return (
            <View style={{}}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    // this function used for navigate to order details page
    onPressTile = (item) => {
        this.props.navigation.navigate("OrderDetailsList", { data: item })
    }

    // list data design implementation here
    listSection = (item, key) => {
        return (
            <View key={key}>
                <OrderHistoryListPage
                    data={item}
                    props={this.props}
                    onSelect={() => this.onPressTile(item)}
                />
            </View>
        )
    }


    // for design header section 
    _onHeaderSec = () => {
        const onPressCart = () => {
            this.props.navigation.navigate("DealerCartDetails", { data: this.state.profileData, onUpdateCart: this.getProfileData })
        }
        return (

            <View style={styles.heaterSec} >
                <View style={styles.headerflexRow}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                    </TouchableOpacity>
                    <View style={styles.headerTextView}>
                        <Text style={styles.orderMyHistoryText}>My Order History</Text>
                    </View>
                    <TouchableOpacity style={styles.cardSecView} onPress={() => onPressCart()}>
                        <Image source={ImageName.SHOPING_ORDER_BOX} style={styles.shopingImg} />
                        <View style={{ width: 5 }} />
                        <Text style={styles.cartCountText}>{"0"}</Text>
                    </TouchableOpacity>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.threeDotImg} />
                </View>
            </View>
        )
    }

    // this function used for dateRange design implement
    previousOrderSec = () => {
        return (
            <View style={styles.dateRangeMainView}>
                <View style={styles.dateRangeFlexRowView}>
                    <Text style={styles.monthText}>This Month</Text>
                    <Text style={styles.dateText}>June 23</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#1F2B4D', justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 14 }} onPress={() => this.onFilterOpenAndClose()}>
                    <View style={styles.dateRangeRowView}>
                        <Image source={ImageName.CALENDER_WHITE_CLOCK} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
                        <View style={{ width: 5 }} />
                        <Text style={styles.dateRangeText}>Date Range</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    subCategorySec = () => {
        const onSubCategory = async (item) => {
            let arr = this.state.subCategoryArrData;
            for (let i = 0; i < arr.length; i++) {
                if (item == arr[i]) {
                    arr[i].check = true
                } else {
                    arr[i].check = false
                }
            }
            this.state.subCategoryArrData = arr;
            this.setState({ subCategoryArrData: this.state.subCategoryArrData, selectedCategoryId: item.id })
            await this._onStatusChange();
            await this.orderHistoryApi(item.id);

        }

        return (
            <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 5, marginHorizontal: 15 }}>
                {this.state.subCategoryArrData.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {this.state.subCategoryArrData.map((data, key) => (
                            <View key={key}>
                                <TouchableOpacity style={data.check ? styles.ActiveMainTab : styles.mainTab} onPress={() => onSubCategory(data)} activeOpacity={0.9}>
                                    {data.title ?
                                        <View >
                                            <Text style={data.check ? styles.activeTitleTxt : styles.titleTxt}>{data.title}</Text>
                                        </View>
                                        : null}

                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                    :
                    null}
            </View>
        )
    }
    // for design footer section 
    _onFooterSec = () => {
        const _onStock = () => {
            this.props.navigation.navigate("MyStock")
        }
        const _onCreateOrder = () => {
            this.props.navigation.navigate("CreateOrderList")
        }
        return (
            <View style={styles.footerSec}>
                <View style={styles.footerUnderline}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.totalOutstandingText}>Total Outstanding</Text>
                        <Text style={styles.totalOutstandingValueText}>{'\u20B9' + " " + this.state.totalOutStanding}</Text>
                    </View>
                </View>
                <View style={styles.footerButtonView}>
                    <BigTextButton
                        text={"Update Stock"}
                        fontSize={12}
                        backgroundColor={"#1F2B4D"}
                        borderRadius={24}
                        onPress={() => _onStock()}
                    />
                    <View style={{ width: 35 }} />
                    <BigTextButton
                        text={"Create New Order"}
                        fontSize={12}
                        backgroundColor={"#F13748"}
                        borderRadius={24}
                        o onPress={() => _onCreateOrder()}
                    />
                </View>
                <View style={{ marginBottom: 40 }} />
            </View>
        )
    }

    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10, marginHorizontal: 16 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    // this function used for fetch more data 
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
                    if (this.state.orderHistoryList.length >= this.state.totalDataCount) {
                        this.setState({ listLoader: false })
                        return null;
                    } else {
                        this.orderHistoryApi(this.state.selectedCategoryId);
                    }
                }
            );
        }
    };

    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 200 }}>
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
            orderHistoryList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }

    //refresh list data
    onRefresh = async () => {
        await this._onStatusChange();
        await this.orderHistoryApi(this.state.selectedCategoryId);
    }

    onFilterOpenAndClose = () => {
        this.setState({
            filterVisibility: !this.state.filterVisibility
        })
    }

    // for filter with api call
    _onFilterWithApi = async (data) => {
        this.setState({
            fromDate: data.fromDateObj.fromDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.fromDateObj.rawDate),
            toDate: data.toDateObj.toDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.toDateObj.rawDate),
        })
        this.onFilterOpenAndClose();
        await this.onRefresh();
    }
    clearFilterData = async () => {
        this.setState({
            fromDate: "",
            toDate: "",
        })
    }


    // for reset the data
    _onReset = async () => {
        this.onFilterOpenAndClose();
        // this._onStatusChange();
        await this.clearFilterData();
        await this.onRefresh();
    }


    modalSection = () => {
        return (
            <FilterModal
                isVisible={this.state.filterVisibility}
                onCloseModal={() => this.onFilterOpenAndClose()}
                type={"oderList"}
                onApply={(data) => this._onFilterWithApi(data)}
                resetData={() => this._onReset()}
                props={this.props}
            />
        )
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._onHeaderSec()}
                {this.previousOrderSec()}
                {this.subCategorySec()}
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        {this.ViewSkeletonPlaceholder()}
                    </SkeletonPlaceholder> :
                    <React.Fragment>
                        {this.state.orderHistoryList.length > 0 ?
                            <>
                                <FlatList
                                    data={this.state.orderHistoryList}
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
                                {this._onFooterSec()}
                            </>
                            :
                            <React.Fragment>
                                <View style={{ marginTop: 20, height: Dimension.height }}>
                                    <NoDataFound />
                                </View>
                            </React.Fragment>
                        }
                        {this.modalSection()}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryList);
