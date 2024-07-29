import React from "react";
import { Color, Dimension, ImageName } from "../../enums";
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { stateCheckForNetwork } from "../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { convertListData, historyModifyData } from "./Function";
import Tooltip from "react-native-walkthrough-tooltip";
import { FilterModal, Loader, NoDataFound } from "../../shared";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../services/middleware";
import { DateConvert, StorageDataModification, Toaster } from "../../services/common-view-function";
import { ErrorCode } from "../../services/constant";
import styles from "./Style";
import { CustomStyle } from "../style";


class InvoiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toolTip: false,
            isVisible: false,
            refreshing: true,
            pageLoader: true,
            listLoader: true,
            actionTooltip: false,
            showHideCheckBox: false,
            selectItem: {},
            orderAllList: [],
            pageNum: 0,
            limit: 5,
            totalDataCount: 0,
            listDataLoader: true,
            filterVisibility: false,

            fromDate: "",
            toDate: "",
            userData: {
                isProject: 0
            },
            isApiCall: false

        };
    }

    componentDidMount() {
        // this._unsubscribe = this.props.navigation.addListener(
        //     'focus', async () => {
        this._load();
        StoreUserOtherInformations("", {}, this.props);
        // })
    }

    _load = async () => {
        let user = await StorageDataModification.userCredential({}, "get")
        this.state.userData.isProject = user.isProject == undefined || user.isProject == null ? 0 : user.isProject
        this.setState({ userData: this.state.userData })
        this._apiCallRes();
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _apiCallRes = async () => {
        this.setState({ refreshing: false, });
        let dataReq = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "searchFrom": this.state.fromDate,
            "searchTo": this.state.toDate,
        }

        let responseData = await MiddlewareCheck("getCustomerInvoiceList", dataReq, this.props);

        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let orderListData = historyModifyData(responseData.response)
                if (orderListData.orderList.length == 0) {
                    this.setState({ isApiCall: false })
                }
                this.setState({
                    orderAllList: [...this.state.orderAllList, ...orderListData.orderList],
                    totalDataCount: orderListData.totalCount
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            pageLoader: false,
            listLoader: false,
            listDataLoader: false
        })
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    // loader for scroll
    renderLoader = () => {
        return (
            <React.Fragment>
                {this.state.listLoader ?
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 100 }}>
                        <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
                    </View> :
                    <View style={{ marginBottom: 200 }} />
                }
            </React.Fragment>
        )
    };

    //refresh list
    onRefresh = async () => {
        this.setState({
            // refreshing: true,
            // listLoader: true,
            // listDataLoader:true,
            orderAllList: [],
        })
        await this._onStatusChange();
        await this._apiCallRes();
    }

    // fetch more
    fetchMore = async () => {
        if (this.state.listLoader) {
            return null;
        }
        this.setState(
            (prevState) => {
                return { listLoader: true, pageNum: prevState.pageNum + 1 };
            },
            () => {
                if (this.state.isApiCall) {
                    this._load();
                } else {
                    this.setState({ listLoader: false })
                    return null;
                }
            }
        );
    };


    renderContactList = ({ item, key }) => {
        return (

            <View key={key}>
                <View style={{ flex: 1, marginHorizontal: '2%' }}>
                    {this.ListData(item, key)}
                </View>
            </View>
        );
    };

    onShowHideData = (item) => {
        let allItems = this.state.orderAllList;
        for (let i = 0; i < allItems.length; i++) {
            console.log("OrderNo", allItems[i].OrderNo)

            if (allItems[i].invoiceNo == item.invoiceNo) {
                allItems[i].showHide = !(allItems[i].showHide)
            } else {
                allItems[i].showHide = false
            }
        }
        this.state.orderAllList = allItems;
        this.setState({ orderAllList: this.state.orderAllList })
    }

    onConvert = (item) => {
        this.props.navigation.navigate("OrderConfirmation", { data: item })
    }

    ListData = (item, key) => {
        return (
            <View>
                <View style={styles.mainBox}>
                    <TouchableOpacity style={[styles.blueBox, { backgroundColor: item.IsVehicleOut == true ? "#2DA77D" : "#ff8080" }]} activeOpacity={1} onPress={() => this.onShowHideData(item)}>
                        <View style={styles.blueViewFlex}>
                            <View style={styles.homeCircel}>
                                <Image source={ImageName.HOME_LOGO} style={styles.homeLogo} />
                            </View>
                            <View style={{ marginLeft: "3%", flex: 1, justifyContent: "center" }} >
                                <Text style={styles.saiEnterprisesText} numberOfLines={1}> Invoice No: <Text style={styles.saiEnterprisesText}>{item.invoiceNo}</Text></Text>
                                {/* {item.IsVehicleOut == true ?
                                    <Text style={styles.smallText} numberOfLines={1}>Vehicle Out</Text> :
                                    null
                                } */}
                            </View>
                            {/* <View style={{ flex: 1 }} /> */}
                            <View style={{ marginLeft: '2%' }}>
                                <Image source={item.showHide ? ImageName.WHITE_UP_LOGO : ImageName.YELLOW_DOWN_ARROW} style={styles.dropDownArrow} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {item.showHide ?
                        <React.Fragment>
                            <View style={{ marginHorizontal: '5%', marginTop: 5 }}>
                                <View style={{ marginTop: 15, flexDirection: 'row', }}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Image source={ImageName.CALENDER_LOGO} style={styles.iamgeLogo} />
                                        <View style={styles.flexColumnSec}>
                                            <Text style={styles.headerText}>Invoice Date</Text>
                                            <Text style={styles.textVisites}>{DateConvert.viewDateFormat(item.invoiceDate)}</Text>
                                        </View>
                                    </View>
                                    {/* <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Image source={ImageName.BILL_LOGO} style={styles.iamgeLogo} />
                                        <View style={styles.flexColumnSec}>
                                            <Text style={styles.headerText}>Vehicale No</Text>
                                            <Text style={styles.textVisites}>{item.VehicleNo}</Text>
                                        </View>
                                    </View> */}
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Image source={ImageName.PROFILE_REMOVE} style={styles.iamgeLogo} />
                                        <View style={styles.flexColumnSec}>
                                            <Text style={styles.headerText}>Item Details</Text>
                                        </View>

                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <View style={{ flex: 0.25, justifyContent: "center" }}>
                                                <Text style={[styles.textVisites, { fontSize: 12, color: Color.COLOR.BLUE.LOTUS_BLUE }]}>Code</Text>
                                            </View>
                                            <View style={{ flex: 0.35, justifyContent: "center", marginLeft: 5 }}>
                                                <Text style={[styles.textVisites, { fontSize: 12, color: Color.COLOR.BLUE.LOTUS_BLUE }]}>Description</Text>
                                            </View>
                                            {/* <View style={{ flex: 0.2, justifyContent: "center", marginLeft: 2 }}>
                                                <Text style={[styles.textVisites, { fontSize: 12, color: Color.COLOR.BLUE.LOTUS_BLUE }]}>Brand</Text>
                                            </View> */}
                                            <View style={{ flex: 0.15, justifyContent: "center", marginLeft: 10 }}>
                                                <Text style={[styles.textVisites, { fontSize: 11, color: Color.COLOR.BLUE.LOTUS_BLUE }]}>Quantity</Text>
                                            </View>
                                            <View style={{ flex: 0.25, justifyContent: "center", marginLeft: 2 }}>
                                                <Text style={[styles.textVisites, { fontSize: 11, color: Color.COLOR.BLUE.LOTUS_BLUE }]}>Amount</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, marginVertical: 5 }} />
                                        {item.InvoiceDetails.map((item1, key1) => (
                                            <View key={key1} style={{ flexDirection: "row",paddingVertical:5 }}>
                                                <View style={{ flex: 0.25, }}>
                                                    <Text style={styles.textVisites}>{item1.ItemCode}</Text>
                                                </View>
                                                <View style={{ flex: 0.35, marginLeft: 5 }}>
                                                    <Text style={styles.textVisites}>{item1.ItemDesc}</Text>
                                                </View>
                                                {/* <View style={{ flex: 0.2, marginLeft: 2 }}>
                                                    <Text style={styles.textVisites}>{item1.Brand}</Text>
                                                </View> */}
                                                <View style={{ flex: 0.15, marginLeft: 10 }}>
                                                    <Text style={styles.textVisites}>{item1.Quantity + " " + item1.unit}</Text>
                                                </View>
                                                <View style={{ flex: 0.25, marginLeft: 2 }}>
                                                    <Text style={styles.textVisites}>{'₹' + item1.Amount}</Text>

                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                                <View style={{ marginBottom: 15 }} />
                            </View>

                        </React.Fragment> :
                        null
                    }
                </View>
            </View>
        )
    };

    // ......open list item tooltip ..........

    _onPressToolTip = (item) => {
        const OnClickTooltip = (item) => {
            this.setState({
                orderAllList: convertListData(this.state.orderAllList, item),
            });
        };

        const onContactTooltipClick = async (type, item) => {
            this.setState({
                selectItem: item,
            });
            switch (type) {
                case "viewdetails":
                    this._onViewDetails(item);
                    break;
                case "edit":
                    this._onEdit(item);
                    break;
                case "delete":
                    this._onDelete(item);
                    break;
                case "status":
                    this._onChangeStatus(item);
                    break;
            }
        };

        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 8 }}
                placement="left"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={item.check}
                content={
                    <ScrollView>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("viewdetails", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>View Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("edit", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("delete", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onContactTooltipClick("status", item)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Status</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
                onClose={() => OnClickTooltip(item)}
            >
                <TouchableOpacity
                    style={{ alignItems: "flex-end" }}
                    onPress={() => OnClickTooltip(item)}
                >
                    <Image
                        source={ImageName.THREE_DOT}
                        style={{ width: 20, height: 20, resizeMode: "contain" }}
                    />
                </TouchableOpacity>
            </Tooltip>
        );
    };

    // for delete contact item



    // for view details of item
    _onViewDetails = (item) => {
        this.setState({
            orderAllList: convertListData(this.state.orderAllList, item),
        });
    }

    // ..............open action header tooltip ............
    _TooltipAction = () => {
        const onClickActionTooltip = () => {
            if (this.state.actionTooltip == false) {
                this.setState({
                    actionTooltip: true
                })
            } else {
                this.setState({
                    actionTooltip: false
                })
            }
        }
        const onActionTooltipClick = async (type, item) => {
            switch (type) {
                case "delete":
                    this._onDeleteAction(type, item);
                    break;
                case "status":
                    this._onStatus(type, item);
                    break;
            }
        };

        return (
            <Tooltip
                animated={true}
                arrowSize={{ width: 16, height: 8 }}
                placement="left"
                backgroundColor="rgba(0,0,0,0.5)"
                isVisible={this.state.actionTooltip}
                content={
                    <ScrollView>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("delete")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tooltipListView}
                            onPress={() => onActionTooltipClick("status")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.tooltipText}>Status</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
                onClose={() => onClickActionTooltip()}
            >
                {/* <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onClickActionTooltip()}
                    disabled={this.state.showHideCheckBox || this.state.orderAllList.length < 1}
                >
                    <Image
                        source={ImageName.HORIZONTAL_THREE_DOT} style={styles.tooltipBtn}
                    />
                </TouchableOpacity> */}
            </Tooltip>
        )
    }

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 5,
            totalDataCount: 0,
            orderAllList: [],
            refreshing: true,
            listLoader: true,
            isApiCall: true,
            listDataLoader: true,
        })
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
        await this._onStatusChange();
        await this._apiCallRes();
    }

    // for reset the data
    _onReset = async () => {
        this.onFilterOpenAndClose();
        this._onStatusChange();
        await this.clearFilterData();
        await this._apiCallRes();
    }

    clearFilterData = async () => {
        this.setState({
            fromDate: "",
            toDate: "",

        })
    }

    listHeaderSection = () => {
        return (
            <View>
                <View style={{ marginLeft: 10, marginRight: 10, marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
                            <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                        </TouchableOpacity>
                        <View style={CustomStyle.headerTextView}>
                            <Text style={CustomStyle.headerText}>Invoice</Text>
                        </View>
                        {/* <View style={CustomStyle.backButtonView} /> */}
                        <View style={{ flex: 0.1 }}>
                            <TouchableOpacity
                                style={styles.filterBtn}
                                activeOpacity={0.8}
                                onPress={() => this.onFilterOpenAndClose()}
                            // disabled={true}
                            // disabled={this.state.showHideCheckBox || this.state.orderAllList.length < 1}
                            >
                                <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                            </TouchableOpacity>
                            {/* <View>
                                {this._TooltipAction()}
                            </View> */}
                        </View>
                    </View>
                </View>
                <View style={styles.headerActionArea}>
                    {/* <View style={styles.filter_action_btn}>
                        <TouchableOpacity
                            style={styles.filterBtn}
                            activeOpacity={0.8}
                            onPress={() => this.onFilterOpenAndClose()}
                        // disabled={true}
                        // disabled={this.state.showHideCheckBox || this.state.orderAllList.length < 1}
                        >
                            <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                        </TouchableOpacity>
                        <View>
                            {this._TooltipAction()}
                        </View>
                    </View> */}
                </View>
            </View>
        )
    }

    render() {

        const modalSection = () => {
            return (
                <View>
                    {/* filter modal */}
                    <FilterModal
                        isVisible={this.state.filterVisibility}
                        onCloseModal={() => this.onFilterOpenAndClose()}
                        type={"oderList"}
                        onApply={(data) => this._onFilterWithApi(data)}
                        resetData={() => this._onReset()}

                    />
                </View>
            )
        }

        return (
            <SafeAreaView style={styles.container}>
                {this.state.listDataLoader ?
                    <View style={{ height: Dimension.height / 1.2, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View> :
                    <React.Fragment>
                        {this.listHeaderSection()}
                        {this.state.orderAllList.length == 0 ?
                            (
                                <React.Fragment>
                                    <View style={CustomStyle.noDataFoundViewForTabList}>
                                        <NoDataFound />
                                    </View>
                                </React.Fragment>
                            )
                            :
                            (
                                <React.Fragment>
                                    <FlatList
                                        data={this.state.orderAllList}
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
                            )}
                    </React.Fragment>}
                {/* ................modal,,,,,,,,,, */}
                {modalSection()}
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
