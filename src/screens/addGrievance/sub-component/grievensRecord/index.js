import React from "react";
import { Color, Dimension, ImageName } from "../../../../enums";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { stateCheckForNetwork } from "../../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { convertListData, historyModifyData } from "./function";
import Tooltip from "react-native-walkthrough-tooltip";
import { DropdownInputBox, EditAndDeleteModal, FilterModal, Loader, NoDataFound, VirtualizedView } from "../../../../shared";

import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { DateConvert, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../../services/constant";
import styles from "./style";
import { CustomStyle } from "../../../style";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


// this is Grievence History List page 
class GrievenceHistoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolTip: false,
      refreshing: true,
      listLoader: true,
      actionTooltip: false,
      selectItem: {},
      grievanceListData: [],
      pageNum: 0,
      limit: 10,
      totalDataCount: 0,
      listDataLoader: true,
      filterVisibility: false,

      // on Filter Variable

      fromDate: "",
      toDate: "",

      initialApiCall: false,
      isApiCall: true

    };
  }
  // this is a initial function which is call first
  componentDidMount() {
    this._load();
    StoreUserOtherInformations("", {}, this.props);

  }
  // this is the first function where set the state data
  _load = async () => {
    // await this.storeInitialData();
    await this._apiCallRes();
  };


  storeInitialData = async () => {
    let grievanceData = await StorageDataModification.GrievanceListData({}, "get");
    if (grievanceData == null || grievanceData == undefined) {
      this.setState({ listDataLoader: true })
    } else {
      this.setState({
        grievanceListData: grievanceData.grievanceList,
        totalDataCount: grievanceData.totalCount,
        listDataLoader: false
      })
    }
  }

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  }
  // this function used for fetching service feedback list data
  _apiCallRes = async () => {
    this.setState({ refreshing: false, });
    let dataReq = {
      "limit": this.state.limit.toString(),
      "offset": (this.state.pageNum * this.state.limit).toString(),
      "searchFrom": this.state.fromDate,
      "searchTo": this.state.toDate,
    }
    let responseData = await MiddlewareCheck("listOfCustGrievances", dataReq, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        if (responseData.response.length == 0) {
          this.setState({ isApiCall: false })
        }
        let brandingHistoryListData = historyModifyData(responseData.response)
        this.setState({
          grievanceListData: [...this.state.grievanceListData, ...brandingHistoryListData.grievanceList],
          totalDataCount: brandingHistoryListData.totalCount
        });
      }
    }
    this.setState({
      listLoader: false,
      listDataLoader: false
    })
    // }
  }

  // this function used for back to the previous page 
  _onBack = () => {
    this.props.navigation.goBack();
  };
  // loader for scroll
  renderLoader = () => {
    return (
      <React.Fragment>
        {this.state.listLoader ?
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 200 }}>
            <ActivityIndicator size="large" color={Color.COLOR.INDICATOR_COLOR.GRAY} />
          </View> :
          <View style={{ marginBottom: 200 }} />
        }
      </React.Fragment>
    )
  };

  //refresh list
  onRefresh = async () => {
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
          this._apiCallRes();
        } else {
          this.setState({ listLoader: false })
          return null;
        }
      }
    );
  };
  // this function used for render list data
  renderContactList = ({ item, key }) => {
    return (
      <View key={key}>
        <View style={{ flex: 1 }}>
          {this.dataList(item, key)}
        </View>
      </View>
    );
  };


  onShowHideData = (item) => {
    let allItems = this.state.grievanceListData;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].feedBackId == item.feedBackId) {
        allItems[i].showHide = !(allItems[i].showHide)
      } else {
        allItems[i].showHide = false
      }
    }
    this.state.grievanceListData = allItems;
    this.setState({ grievanceListData: this.state.grievanceListData })
  }

  dataList = (item) => {
    return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
  };
  // this function used for design list data
  ListData = (item, key) => {
    return (
      <View style={styles.mainBox}>
        <TouchableOpacity style={styles.blueBox}
          activeOpacity={0.9}
          onPress={() => this.onShowHideData(item)}>
          <View style={styles.blueViewFlex}>
            <View style={styles.homeCircel}>
              <Image source={ImageName.HOME_LOGO} style={styles.homeLogo} />
            </View>
            <View style={{ marginLeft: "3%", flex: 1, justifyContent: "center" }} >
              <Text style={styles.saiEnterprisesText} numberOfLines={1}>{DateConvert.viewDateFormat(item.createdAt)}</Text>
            </View>
            <View style={{ marginLeft: '2%' }}>
              <Image source={item.showHide ? ImageName.RED_LOGO : ImageName.YELLOW_DOWN_ARROW} style={styles.dropDownArrow} />
            </View>
          </View>
        </TouchableOpacity>

        {item.showHide ?
          <React.Fragment>
            <View style={{ marginHorizontal: '2%', marginTop: 5 }}>
              <View style={{ marginTop: 15, flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Image source={ImageName.FEEDBACK} style={styles.iamgeLogo} />
                  <View style={styles.flexColumnSec}>
                    <Text numberOfLines={1} style={styles.headerText}>Marketing FeedBack</Text>
                    <Text style={styles.textVisites}>{item.fdbk_companyMarketingSupport}</Text>
                  </View>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Image source={ImageName.FEEDBACK} style={styles.iamgeLogo} />
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>FSE FeedBack</Text>
                    <Text style={styles.textVisites}>{item.fdbk_companyFseSupport}</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 15, flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Image source={ImageName.FEEDBACK} style={styles.iamgeLogo} />
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Product Quality FeedBack</Text>
                    <Text style={styles.textVisites}>{item.fdbk_productQuality}</Text>
                  </View>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Image source={ImageName.FEEDBACK} style={styles.iamgeLogo} />
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Branding FeedBack</Text>
                    <Text style={styles.textVisites}>{item.fdbk_companyBrandingSupport}</Text>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 15, flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Image source={ImageName.FEEDBACK} style={styles.iamgeLogo} />
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Competition FeedBack</Text>
                    <Text style={styles.textVisites}>{item.fdbk_competitionBrand}</Text>
                  </View>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={{ flexDirection: 'row', flex: 1, marginLeft: '2%' }}>
                  <Image source={ImageName.CALENDER_LOGO} style={styles.iamgeLogo} />
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Create Date</Text>
                    <Text style={styles.textVisites}>{DateConvert.viewDateFormat(item.createdAt)}</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 15, flexDirection: 'row', }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Image source={ImageName.CLIPBOARD_TEXT} style={styles.iamgeLogo} />
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Remark</Text>
                    <Text style={styles.textVisites}>{item.remarks}</Text>
                  </View>
                </View>
                <View style={{ flex: 1 }} />
              </View>
              <View style={{ marginBottom: 15 }} />
            </View>
          </React.Fragment> : null
        }
      </View >
    )
  };

  // ......open list item tooltip ..........

  _onPressToolTip = (item) => {
    const OnClickTooltip = (item) => {
      this.setState({
        grievanceListData: convertListData(this.state.grievanceListData, item),
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
          <>
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
          </>
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
          <>
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
          </>
        }
        onClose={() => onClickActionTooltip()}
      >
      </Tooltip>
    )
  }

  // change the state for refresh
  _onStatusChange = async () => {
    this.setState({
      pageNum: 0,
      limit: 10,
      totalDataCount: 0,
      grievanceListData: [],
      refreshing: true,
      listLoader: true,
      listDataLoader: true,
      isApiCall: true
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
    await this.onFilterOpenAndClose();
    await this.onRefresh();
  }

  // for reset the data
  _onReset = async () => {
    this.onFilterOpenAndClose();
    await this.clearFilterData();
    await this.onRefresh();
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
        <View style={styles.headerActionArea}>
          <View style={styles.filter_action_btn}>
            <TouchableOpacity
              style={styles.filterBtn}
              activeOpacity={0.8}
              onPress={() => this.onFilterOpenAndClose()}>
              <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
            </TouchableOpacity>
            {/* <View>
              {this._TooltipAction()}
            </View> */}
          </View>
        </View>
      </View>
    )
  }

  ViewSkeletonPlaceholder = () => {
    let resData = [];

    for (let i = 0; i < 7; i++) {
      resData.push(
        <View style={[styles.mainBox, { marginVertical: 10 }]} key={i}>
          <View style={styles.blueBox} />
        </View>
      )
    }
    return resData;
  }



  // this is main render to this page 
  render() {

    const modalSection = () => {
      return (
        <View>

          {/* filter modal */}
          <FilterModal
            isVisible={this.state.filterVisibility}
            onCloseModal={() => this.onFilterOpenAndClose()}
            type={"grievanceList"}
            onApply={(data) => this._onFilterWithApi(data)}
            resetData={() => this._onReset()}

          />
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        {this.state.listDataLoader ?
          <SkeletonPlaceholder>
            {this.listHeaderSection()}
            <View >
              {this.ViewSkeletonPlaceholder()}
            </View>
          </SkeletonPlaceholder>
          :
          <React.Fragment>
            {this.listHeaderSection()}
            {this.state.grievanceListData.length > 0 ? (
              <React.Fragment>
                <FlatList
                  data={this.state.grievanceListData}
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
            ) : (
              <React.Fragment>
                <View style={CustomStyle.noDataFoundViewForTabList}>
                  <NoDataFound />
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(GrievenceHistoryList);
