import React from "react";
import { Color, Dimension, ImageName } from "../../../../enums";
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
import { stateCheckForNetwork } from "../../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { convertListData, historyModifyData } from "./function";
import Tooltip from "react-native-walkthrough-tooltip";
import { CheckBox, DropdownInputBox, EditAndDeleteModal, FilterModal, Loader, Modal, NoDataFound } from "../../../../shared";

import { MiddlewareCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { DateConvert, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { CommonData, ErrorCode } from "../../../../services/constant";
import { inputEmptyValidator } from "../../../../validators/dataValidator";
import styles from "./style";
import { CustomStyle } from "../../../style";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


// this is history list page 
class HistoryList extends React.Component {
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
      showHideButton: false,
      selectAllCheckbox: false,
      filterCheck: false,
      selectedButton: "",
      selectItem: {},
      selectedContactItem: {},
      brandingAllList: [],
      loadMore: false,
      filterData: {},
      pageNum: 0,
      limit: 5,
      totalDataCount: 0,
      selectedStatusDataObj: {},
      isVisibleStatusModal: false,
      isVisibleDeleteModal: false,
      listDataLoader: false,
      isVisibleEditModal: false,
      filterVisibility: false,

      fromDate: "",
      toDate: "",
      selectedStatus: "",
      brandItemType: "",




      initialApiCall: false


    };
  }
  // this is a initial function which is call first 
  componentDidMount() {
    this._load();
    StoreUserOtherInformations("", {}, this.props);

  }
  // this is first function where set state data
  _load = async () => {
    await this.storeInitialData();
    this._apiCallRes();
  };

  storeInitialData = async () => {
    let brandingData = await StorageDataModification.GrievanceListData({}, "get");
    if (brandingData == null || brandingData == undefined) {
      this.setState({ listDataLoader: true })
    } else {
      this.setState({
        grievanceListData: brandingData.pjpList,
        totalDataCount: brandingData.totalCount,
        listDataLoader: false
      })
    }
  }


  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  }
  // this function used for fetching brand list data 
  _apiCallRes = async () => {
    this.setState({ refreshing: false, });
    let dataReq = {
      "limit": this.state.limit.toString(),
      "offset": (this.state.pageNum * this.state.limit).toString(),
      "searchFrom": this.state.fromDate,
      "searchTo": this.state.toDate,
      "selectedStatusId": this.state.selectedStatus,
      "itemType": this.state.brandItemType,
      "userId": "0",
      "fieldVisitId": "0",
    }

    let responseData = await MiddlewareCheck("brandingList", dataReq, this.props);
    if (responseData === false) {
      this._onNetworkError()
    } else {
      if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        if (this.state.pageNum == 0) {
          let brandingData = await StorageDataModification.brandingListData({}, "get");
          let brandingDataList = historyModifyData(responseData.data);
          if (brandingData == null || brandingData == undefined) {
            this.setState({
              brandingAllList: brandingDataList.pjpList,
              totalDataCount: brandingDataList.totalCount
            });
            await StorageDataModification.brandingListData(brandingDataList, "store");
          } else if (JSON.stringify(brandingData.pjpList) === JSON.stringify(brandingDataList.pjpList)) {
            this.setState({
              brandingAllList: brandingDataList.pjpList,
              totalDataCount: brandingDataList.totalCount
            });
            if (brandingData.totalCount !== brandingDataList.totalCount) {
              await StorageDataModification.brandingListData(brandingDataList, "store");
            }
          } else {
            this.setState({
              brandingAllList: brandingDataList.pjpList,
              totalDataCount: brandingDataList.totalCount
            });
            await StorageDataModification.brandingListData(brandingDataList, "store");

          }
          this.setState({ initialApiCall: true })
        } else {
          let brandingHistoryListData = historyModifyData(responseData.data)
          this.setState({
            brandingAllList: [...this.state.brandingAllList, ...brandingHistoryListData.pjpList],
            totalDataCount: brandingHistoryListData.totalCount
          });
        }

      } else {
        if (this.state.pageNum == 0) {
          await StorageDataModification.brandingListData({}, "clear");
          this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            brandingAllList: [],
            initialApiCall: true
          });
        }
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({
      pageLoader: false,
      listLoader: false,
      listDataLoader: false
    })
  }
  // this is fiunction used for back to previous page 
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
          if (this.state.brandingAllList.length >= this.state.totalDataCount) {
            this.setState({ listLoader: false })
            return null;
          } else {
            this._apiCallRes();
          }
        }
      );
    }
  };

  onClickListCheckbox = (item) => {
    let allItems = this.state.brandingAllList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].id == item.id) {
        allItems[i].tick = !(allItems[i].tick)
      }
    }
    this.state.brandingAllList = allItems;
    this.setState({ brandingAllList: this.state.brandingAllList })
    this.showHideBottomButton();
  }

  showHideBottomButton = () => {
    let counter = 0;
    let btnCounter = 0;
    for (let i = 0; i < this.state.brandingAllList.length; i++) {
      if (this.state.brandingAllList[i].tick == false) {
        counter++;
      } else {
        btnCounter++;
      }
    }
    if (counter == 0) {
      this.setState({
        selectAllCheckbox: true
      });
    } else {
      this.setState({
        selectAllCheckbox: false
      });
    }
    if (btnCounter == 0) {
      this.setState({
        showHideButton: false,
      });
    } else {
      this.setState({
        showHideButton: true,
      });
    }
  }
  // this function used for  render cantact list data
  renderContactList = ({ item, key }) => {
    return (
      <View key={key}>
        <View style={{ flex: 1, marginHorizontal: '2%' }}>
          {this.dataList(item, key)}
        </View>
      </View>
    );
  };

  checkBoxList = (item) => {
    return (
      <CheckBox
        type="tick"
        borderRadius={10}
        data={item.tick}
        onClickValue={() => this.onClickListCheckbox(item)}
        image={ImageName.YELLOW_TICK}
        additionalImgStyle={{ height: 20, width: 20 }}
      />
    )
  }

  onShowHideData = (item) => {
    let allItems = this.state.brandingAllList;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].id == item.id) {
        allItems[i].showHide = !(allItems[i].showHide)
      } else {
        allItems[i].showHide = false
      }
    }
    this.state.brandingAllList = allItems;
    this.setState({ brandingAllList: this.state.brandingAllList })
  }

  dataList = (item) => {
    return <View style={styles.contactInfo}>{this.ListData(item)}</View>;
  };
  // this function used for design list data 
  ListData = (item, key) => {
    return (
      <View style={styles.mainBox}>
        <TouchableOpacity style={styles.blueBox}
          activeOpacity={1}
          onPress={() => this.onShowHideData(item)}
        >
          <View style={styles.blueViewFlex}>
            <View style={styles.homeCircel}>
              <Image source={ImageName.HOME_LOGO} style={styles.homeLogo} />
            </View>
            <View style={{ marginLeft: "3%", flex: 1, justifyContent: "center" }} >
              <Text style={styles.saiEnterprisesText} numberOfLines={1}>{item.brandName}</Text>
            </View>
            <View style={styles.addVisitsButton}>
              <Text style={styles.addVisitBtnTxt}>{item.approvedStatus == 1 ? "Approved" : "Not Approved"}</Text>
            </View>
            <View style={{ marginLeft: '2%' }}>
              <Image source={item.showHide ? ImageName.RED_LOGO : ImageName.YELLOW_DOWN_ARROW} style={styles.dropDownArrow} />
            </View>
          </View>
        </TouchableOpacity>
        {item.showHide ? <React.Fragment>
          <View style={{ marginHorizontal: '5%', marginTop: 5 }}>
            <View style={{ marginTop: 15, flexDirection: 'row', }}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Image source={ImageName.CALENDER_LOGO} style={styles.iamgeLogo} />
                <View style={styles.flexColumnSec}>
                  <Text style={styles.headerText}>Requisition Date</Text>
                  <Text style={styles.textVisites}>{DateConvert.viewDateFormat(item.requestDate)}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Image source={ImageName.BILL_LOGO} style={styles.iamgeLogo} />
                <View style={styles.flexColumnSec}>
                  <Text style={styles.headerText}>Brand Name</Text>
                  <Text style={styles.textVisites}>{item.brandName}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 15, flexDirection: 'row', }}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Image source={ImageName.CLIPBOARD_TEXT} style={styles.iamgeLogo} />
                <View style={styles.flexColumnSec}>
                  <Text style={styles.headerText}>Description</Text>
                  <Text style={styles.textVisites}>{item.remarks}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Image source={ImageName.CLIPBOARD_TEXT} style={styles.iamgeLogo} />
                <View style={styles.flexColumnSec}>
                  <Text style={styles.headerText}>Created By</Text>
                  <Text style={styles.textVisites}>{item.createdByName}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 15 }} />
          </View>
        </React.Fragment> : null}
      </View>
    )
  };

  // ......open list item tooltip ..........

  _onPressToolTip = (item) => {
    const OnClickTooltip = (item) => {
      this.setState({
        brandingAllList: convertListData(this.state.brandingAllList, item),
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

  _onDelete = (item) => {
    this._onDeleteModal(item);
    this.setState({
      brandingAllList: convertListData(this.state.brandingAllList, item)
    })
  };





  _onEdit = (item) => {
    this._onEditModal(item);

    this.setState({
      brandingAllList: convertListData(this.state.brandingAllList, item)
    })

  }



  // for view details of item
  _onViewDetails = (item) => {
    this.setState({
      brandingAllList: convertListData(this.state.brandingAllList, item),
    });
  }

  // .......show hide modal,,,,,,
  _onContactModal = (item) => {
    if (this.state.isVisible == false) {
      this.setState({
        isVisible: true,
        selectedContactItem: item
      });
    } else {
      this.setState({
        isVisible: false,
      })
    }
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onClickActionTooltip()}
          disabled={this.state.showHideCheckBox || this.state.brandingAllList.length < 1}
        >
          <Image
            source={ImageName.HORIZONTAL_THREE_DOT} style={styles.tooltipBtn}
          />
        </TouchableOpacity>
      </Tooltip>
    )
  }


  // change the state for refresh
  _onStatusChange = async () => {
    this.setState({
      pageNum: 0,
      limit: 5,
      totalDataCount: 0,
      brandingAllList: [],
      refreshing: true,
      listLoader: true,
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
    this.state.selectedStatus = data.selectedStatusObj.id ? data.selectedStatusObj.id.toString() : "";
    this.state.brandItemType = data.selectedItemTypeObj.id ? data.selectedItemTypeObj.id.toString() : ""
    this.setState({
      fromDate: data.fromDateObj.fromDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.fromDateObj.rawDate),
      toDate: data.toDateObj.toDate.length == 0 ? "" : DateConvert.formatYYYYMMDD(data.toDateObj.rawDate),
      selectedStatus: this.state.selectedStatus,
      brandItemType: this.state.brandItemType
    })
    this.onFilterOpenAndClose();
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
      selectedStatus: "",
      brandItemType: ""

    })
  }
  // for design list header section 
  listHeaderSection = () => {
    return (
      <View>
        <View style={styles.headerActionArea}>
          <View style={styles.filter_action_btn}>
            <TouchableOpacity
              style={styles.filterBtn}
              activeOpacity={0.8}
              onPress={() => this.onFilterOpenAndClose()}
            // disabled={true}
            // disabled={this.state.showHideCheckBox || this.state.brandingAllList.length < 1}
            >
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
  // this function used for navigate CreateAndEditEnquiry page 
  onAddContact = () => {
    this.props.navigation.navigate("CreateAndEditEnquiry")
  }
  // this function used for design skeleton loader  
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
          {/* <FilterModal
            isVisible={this.state.filterVisibility}
            onCloseModal={() => this.onFilterOpenAndClose()}
            type={"branding"}
            onApply={(data) => this._onFilterWithApi(data)}
            resetData={() => this._onReset()}

          /> */}
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        {this.state.listDataLoader ?
          // <View style={{ height: Dimension.height / 1.2, justifyContent: "center", alignItems: "center" }}>
          //   <Loader />
          // </View>
          <SkeletonPlaceholder>
            {this.listHeaderSection()}
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              {this.ViewSkeletonPlaceholder()}
            </ScrollView>
          </SkeletonPlaceholder> :
          <React.Fragment>
            {/* {this.listHeaderSection()} */}

            {this.state.brandingAllList.length > 0 ? (
              <React.Fragment>
                <FlatList
                  data={this.state.brandingAllList}
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
                {this.state.initialApiCall ?
                  <View style={CustomStyle.noDataFoundViewForTabList}>
                    <NoDataFound />
                  </View> :
                  null
                }
              </React.Fragment>
            )}
          </React.Fragment>}

        {/* ................modal,,,,,,,,,, */}
        {/* {modalSection()} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList);
