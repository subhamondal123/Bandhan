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
import { convertListData, historyModifyData } from "./function";
import Tooltip from "react-native-walkthrough-tooltip";
import { FilterModal, Loader, NoDataFound } from "../../shared";
import {
  MiddlewareCheck,
  StoreUserOtherInformations,
} from "../../services/middleware";
import { DateConvert, Toaster } from "../../services/common-view-function";
import styles from "./style";
import { CustomStyle } from "../style";
import { ErrorCode } from "../../services/constant";

// this is ledger list page
class LedgerList extends React.Component {
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
    };
  }
  // this is initial function which is call first
  componentDidMount() {
    this._load();
    StoreUserOtherInformations("", {}, this.props);
  }
  // this is the first function where set state data
  _load = async () => {
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
  };
  // this function used for api call
  _apiCallRes = async () => {
    this.setState({ refreshing: false });
    let dataReq = {
      limit: this.state.limit.toString(),
      offset: (this.state.pageNum * this.state.limit).toString(),
      searchFrom: this.state.fromDate,
      searchTo: this.state.toDate,
    };
    let responseData = await MiddlewareCheck(
      "getLedgerForCustomer",
      dataReq,
      this.props
    );
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let orderListData = historyModifyData(responseData.response);
        this.setState({
          orderAllList: [
            ...this.state.orderAllList,
            ...orderListData.orderList,
          ],
          totalDataCount: orderListData.totalCount,
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
    this.setState({
      pageLoader: false,
      listLoader: false,
      listDataLoader: false,
    });
  };
  // this function used for navigate to previous scereen
  _onBack = () => {
    this.props.navigation.goBack();
  };

  // loader for scroll
  renderLoader = () => {
    return (
      <React.Fragment>
        {this.state.listLoader ? (
          <View style={styles.activitySec}>
            <ActivityIndicator
              size="large"
              color={Color.COLOR.INDICATOR_COLOR.GRAY}
            />
          </View>
        ) : (
          <View style={{ marginBottom: 200 }} />
        )}
      </React.Fragment>
    );
  };

  //refresh list
  onRefresh = async () => {
    this.setState({
      // refreshing: true,
      // listLoader: true,
      // listDataLoader:true,
      orderAllList: [],
    });
    await this._onStatusChange();
    await this._apiCallRes();
  };

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
        if (this.state.orderAllList.length >= this.state.totalDataCount) {
          this.setState({ listLoader: false });
          return null;
        } else {
          this._load();
        }
      }
    );
  };

  // ......open list item tooltip ..........

  _onEdit = (item) => {
    this.props.navigation.navigate("LedgerDetailsUpdate", {
      data: item,
      onRefresh: this.onRefresh,
    });
    this.setState({
      orderAllList: convertListData(this.state.orderAllList, item),
    });
  };

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
        case "edit":
          this._onEdit(item);
          break;
      }
    };

    return (
      <Tooltip
        animated={true}
        arrowSize={{ width: 16, height: 8 }}
        placement="bottom"
        backgroundColor="rgba(0,0,0,0.5)"
        isVisible={item.check}
        content={
          <ScrollView>
            <TouchableOpacity
              style={styles.tooltipListView}
              onPress={() => onContactTooltipClick("edit", item)}
              activeOpacity={0.7}
            >
              <Text style={styles.tooltipText}>Edit</Text>
            </TouchableOpacity>
          </ScrollView>
        }
        onClose={() => OnClickTooltip(item)}
      >
        <TouchableOpacity
          style={styles.tdbTab}
          activeOpacity={0.9}
          onPress={() => OnClickTooltip(item)}
        >
          <Image
            source={ImageName.THREE_DOT_BLACK}
            style={{ width: 15, height: 15, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </Tooltip>
    );
  };
  // for render list data
  renderContactList = ({ item, key }) => {
    return item.OrderNo == "NA" ? null : (
      <View key={key}>
        <View style={{ flex: 1, marginHorizontal: "2%" }}>
          {this.ListData(item, key)}
        </View>
      </View>
    );
  };

  onShowHideData = (item) => {
    let allItems = this.state.orderAllList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].ledgerId == item.ledgerId) {
        allItems[i].showHide = !allItems[i].showHide;
      } else {
        allItems[i].showHide = false;
      }
    }
    this.state.orderAllList = allItems;
    this.setState({ orderAllList: this.state.orderAllList });
  };

  onConvert = (item) => {
    this.props.navigation.navigate("OrderConfirmation", { data: item });
  };
  // for design list data
  ListData = (item, key) => {
    return (
      <View key={key}>
        <View style={styles.mainBox}>
          <View
            style={[
              styles.blueBox,
              {
                backgroundColor:
                  item.IsVehicleOut == true ? "#2DA77D" : "#ff8080",
              },
            ]}
          >
            <View style={styles.blueViewFlex}>
              <View style={styles.homeCircel}>
                <Image source={ImageName.HOME_LOGO} style={styles.homeLogo} />
              </View>
              <View style={styles.balanceSec}>
                <Text style={styles.saiEnterprisesText} numberOfLines={1}>
                  Balance as on : {item.ledgerAddDate}
                </Text>
              </View>
              <View style={{ marginLeft: "2%" }}>
                <TouchableOpacity
                  style={styles.editTab}
                  onPress={() => this._onEdit(item)}
                  activeOpacity={0.9}
                >
                  <Text style={styles.titleSubTxt}>View</Text>
                </TouchableOpacity>
                {/* {item.showHide ?
                                    this._onPressToolTip(item, key)
                                    :
                                    <View>
                                        <Image source={ImageName.YELLOW_DOWN_ARROW} style={styles.dropDownArrow} />
                                    </View>
                                } */}
              </View>
            </View>
          </View>
          {/* {item.showHide ?
                        <React.Fragment>
                            <View style={{ marginHorizontal: '5%', marginTop: 5 }}>
                                <View style={{ marginTop: 15, flexDirection: 'row', }}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Image source={ImageName.CALENDER_LOGO} style={styles.iamgeLogo} />
                                        <View style={styles.flexColumnSec}>
                                            <Text style={styles.headerText}>Outstanding</Text>
                                            <Text style={styles.textVisites}>{'\u20B9' + " " + item.pendingAmntByCompany}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Image source={ImageName.BILL_LOGO} style={styles.iamgeLogo} />
                                        <View style={styles.flexColumnSec}>
                                            <Text style={styles.headerText}>Phone No</Text>
                                            <Text style={styles.textVisites}>{item.phoneNumber}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', }}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Image source={ImageName.PROFILE_REMOVE} style={styles.iamgeLogo} />
                                        <View style={styles.flexColumnSec}>
                                            <Text style={styles.headerText}>ERP Code</Text>
                                            <Text style={styles.textVisites}>{item.ERPCode}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Image source={ImageName.CLIPBOARD_TEXT} style={styles.iamgeLogo} />
                                        <View style={styles.flexColumnSec}>
                                            <Text style={styles.headerText}>Created On</Text>
                                            <Text style={styles.textVisites}>{item.ledgerAddDate}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 15, flexDirection: 'row', }}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Image source={ImageName.CALENDER_LOGO} style={styles.iamgeLogo} />
                                        <View style={styles.flexColumnSec}>
                                            <Text style={styles.headerText}>Approve Status</Text>
                                            <Text style={styles.textVisites}>{item.approvedStatus == 0 ? "Not Approved" : "Approved"}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Image source={ImageName.CALENDER_LOGO} style={styles.iamgeLogo} />
                                        <View style={styles.flexColumnSec}>
                                            <Text style={styles.headerText}>Remarks</Text>
                                            <Text style={styles.textVisites}>{item.approvedRemarks}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: 15, flexDirection: 'row', }}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Image source={ImageName.CALENDER_LOGO} style={styles.iamgeLogo} />
                                        <View style={styles.flexColumnSec}>
                                            <Text style={styles.headerText}>Documents</Text>
                                            <Text style={styles.textVisites}>{item.uplodedDocByCompany.substring(8)}</Text>
                                        </View>
                                    </View>

                                </View>

                                <View style={{ marginBottom: 15 }} />
                            </View>

                        </React.Fragment> :
                        null
                    } */}
        </View>
      </View>
    );
  };

  // for view details of item
  _onViewDetails = (item) => {
    this.setState({
      orderAllList: convertListData(this.state.orderAllList, item),
    });
  };

  // ..............open action header tooltip ............
  _TooltipAction = () => {
    const onClickActionTooltip = () => {
      if (this.state.actionTooltip == false) {
        this.setState({
          actionTooltip: true,
        });
      } else {
        this.setState({
          actionTooltip: false,
        });
      }
    };
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onClickActionTooltip()}
          disabled={
            this.state.showHideCheckBox || this.state.orderAllList.length < 1
          }
        >
          <Image
            source={ImageName.HORIZONTAL_THREE_DOT}
            style={styles.tooltipBtn}
          />
        </TouchableOpacity>
      </Tooltip>
    );
  };

  // change the state for refresh
  _onStatusChange = async () => {
    this.setState({
      pageNum: 0,
      limit: 5,
      totalDataCount: 0,
      orderAllList: [],
      refreshing: true,
      listLoader: true,
      listDataLoader: true,
    });
  };

  onFilterOpenAndClose = () => {
    this.setState({
      filterVisibility: !this.state.filterVisibility,
    });
  };

  // for filter with api call
  _onFilterWithApi = async (data) => {
    this.setState({
      fromDate:
        data.fromDateObj.fromDate.length == 0
          ? ""
          : DateConvert.formatYYYYMMDD(data.fromDateObj.rawDate),
      toDate:
        data.toDateObj.toDate.length == 0
          ? ""
          : DateConvert.formatYYYYMMDD(data.toDateObj.rawDate),
    });
    this.onFilterOpenAndClose();
    await this._onStatusChange();
    await this._apiCallRes();
  };

  // for reset the data
  _onReset = async () => {
    this.onFilterOpenAndClose();
    this._onStatusChange();
    await this.clearFilterData();
    await this._apiCallRes();
  };

  clearFilterData = async () => {
    this.setState({
      fromDate: "",
      toDate: "",
    });
  };
  // for design list header section
  listHeaderSection = () => {
    return (
      <View>
        <View style={styles.listSec}>
          <View style={styles.listSubSec}>
            <TouchableOpacity
              style={CustomStyle.backButtonView}
              onPress={() => this._onBack()}
            >
              <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
            </TouchableOpacity>
            <View style={CustomStyle.headerTextView}>
              <Text style={CustomStyle.headerText}>Ledger</Text>
            </View>
            <View style={CustomStyle.backButtonView} />
          </View>
        </View>
        {/* <View style={styles.headerActionArea}>
                    <View style={styles.filter_action_btn}>
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
                    </View>
                </View> */}
      </View>
    );
  };
  // this is main render to this page
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
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        {this.state.listDataLoader ? (
          <View style={styles.loaderSec}>
            <Loader />
          </View>
        ) : (
          <React.Fragment>
            {this.listHeaderSection()}
            {this.state.orderAllList.length == 0 ? (
              <React.Fragment>
                <View style={CustomStyle.noDataFoundViewForTabList}>
                  <NoDataFound />
                </View>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FlatList
                  data={this.state.orderAllList}
                  renderItem={(item, key) => this.renderContactList(item, key)}
                  keyExtractor={(item, key) => key}
                  // onEndReached={this.fetchMore}
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
          </React.Fragment>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(LedgerList);
