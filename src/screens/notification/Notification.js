import React from "react";
import { AlertMessage, Color, FontFamily, ImageName } from "../../enums";
import styles from "./Style";
import { CustomStyle } from "../style";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  stateCheckForNetwork,
  stateUserInformation,
} from "../../redux/CustomerAction";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Platform,
} from "react-native";
import { CommonData, ErrorCode } from "../../services/constant";
import { MiddlewareCheck } from "../../services/middleware";
import { Decoder } from "../../services/auth";
import { getIndex, registrationlistModifyData } from "./Function";
import { EditAndDeleteModal, Loader, Modal, NoDataFound } from "../../shared";
import Tooltip from "react-native-walkthrough-tooltip";
import { DateConvert, Toaster } from "../../services/common-view-function";
import { App_uri } from "../../services/config";

// this is notification page
class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoader: true,
      pageNum: 0,
      limit: 5,
      totalDataCount: 0,
      notificationArrData: [],
      refreshing: true,
      listLoader: true,
      unReadMsg: 0,
      showHideCheckBox: false,
      actionTooltip: false,

      listDataLoader: true,
      isVisibleModal: false,
      modalLoader: false,

      selectedItem: {},
    };
  }
  // for set initial state data
  _onSetInitialStateData = async () => {
    this.setState({
      listDataLoader: true,
      pageNum: 0,
      limit: 5,
      notificationArrData: [],
    });
  };

  // this is initial function which is call first
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      await this._onSetInitialStateData();
      this._load();
    });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  // for back
  _backAction = () => {
    this._onBack();
  };
  // for navigate to back screen
  _onBack = () => {
    this.props.navigation.goBack();
  };

  // this is first function where set state data
  _load = async () => {
    this._loaderCheck();
    this.setState({ pageLoader: true });
    this.setState({ refreshing: false });
    // let dataReq = {
    //     "limit": this.state.limit.toString(),
    //     "offset": (this.state.pageNum * this.state.limit).toString(),
    // }
    // let responseData = await MiddlewareCheck("notificationList", dataReq);
    // if (responseData) {
    //     if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
    //         let registrationList = registrationlistModifyData(responseData.data)
    //         this.setState({
    //             notificationArrData: [...this.state.notificationArrData, ...registrationList.notificationList],
    //             totalDataCount: registrationList.count
    //         })
    //     } else {
    //         Toaster.ShortCenterToaster(responseData.message)
    //     }
    // }

    this.setState({
      pageLoader: false,
      listDataLoader: false,
      listLoader: false,
    });
  };

  _loaderCheck = () => {
    this.setState({
      pageLoader: false,
      listLoader: false,
      refreshing: false,
    });
  };

  // _onMarkAllRead = async () => {
  //     let reqData = [];
  //     this.state.unReadMsg = 0;
  //     for (let i = 0; i < this.state.notificationArrData.length; i++) {
  //         if (this.state.notificationArrData[i].isRead == 0) {
  //             reqData.push(this.state.notificationArrData[i].id);
  //             this.state.notificationArrData[i].isRead = 1;
  //         }
  //     }
  //     // let updateData = await this._apiCallForUpdate({ "ids": reqData, "type": "READ" });
  //     if (updateData == true) {
  //         this.setState({
  //             notificationData: this.state.notificationData
  //         })
  //     }
  // }

  // _onCheckNotification = async (item) => {
  //     let key = getIndex(this.state.notificationArrData, item);
  //     // if (item.isRead == 0) {
  //     //     this.state.unReadMsg = this.state.unReadMsg - 1;
  //     //     await this._apiCallForUpdate({ "ids": [item.id], "type": "READ" });
  //     // }
  //     this.state.notificationArrData[key].isCheck = !this.state.notificationArrData[key].isCheck;
  //     this.state.notificationArrData[key].isRead = 1;
  //     this.setState({
  //         notificationData: this.state.notificationData
  //     })
  // }

  // fetch more data
  fetchMore = () => {
    if (this.state.listLoader) {
      return null;
    }
    this.setState(
      (prevState) => {
        return { listLoader: true, pageNum: prevState.pageNum + 1 };
      },
      () => {
        if (
          this.state.notificationArrData.length == this.state.totalDataCount
        ) {
          this.setState({ listLoader: false });
          return null;
        } else {
          this._load();
        }
      }
    );
  };

  // for render loader
  renderLoader = () => {
    return this.state.listLoader ? (
      <View style={styles.loaderSec}>
        <ActivityIndicator
          size="large"
          color={Color.COLOR.INDICATOR_COLOR.GRAY}
        />
      </View>
    ) : (
      <View style={{ marginBottom: 200 }} />
    );
  };

  // change the state for refresh
  _onStatusChange = async () => {
    this.setState({
      pageNum: 0,
      limit: 5,
      totalDataCount: 0,
      notificationArrData: [],
      listLoader: false,
      refreshing: true,
      pageLoader: true,
      listDataLoader: true,
    });
  };

  onRefresh = async () => {
    this.setState({
      notificationArrData: [],
    });
    await this._onStatusChange();
    await this._load();
  };

  _onPopupModal = (item) => {
    if (this.state.isVisibleModal == false) {
      this.setState({
        isVisibleModal: true,
        selectedItem: item,
      });
    } else {
      this.setState({
        isVisibleModal: false,
      });
    }
  };
  // for delete list data
  _onListDelete = async () => {
    this.setState({
      modalLoader: true,
    });
    let key = getIndex(this.state.notificationArrData, this.state.selectedItem);
    this.state.notificationArrData.splice(key, 1);
    this.state.totalDataCount = this.state.totalDataCount - 1;
    this.setState({
      notificationArrData: this.state.notificationArrData,
      totalDataCount: this.state.totalDataCount,
    });
    let reqData = {
      platform: "android",
      ids: [this.state.selectedItem.id.toString()],
    };
    let responseData = await MiddlewareCheck("deleteNotification", reqData);
    if (responseData) {
      if (
        responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR &&
        responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS
      ) {
        Toaster.ShortCenterToaster(responseData.data.message);
        this._onPopupModal();
      } else {
        Toaster.ShortCenterToaster(
          AlertMessage.MESSAGE.SERVER.INTERNAL_SERVER_ERROR
        );
      }
    }
    this.setState({
      modalLoader: false,
    });
  };

  // rendering the data
  renderNotificationItem = ({ item, key }) => {
    return (
      <View key={key}>
        <View style={{}}>{this.ListData(item, key)}</View>
      </View>
    );
  };
  // for design list data
  ListData = (item, key) => {
    return (
      <React.Fragment>
        {/* <View style={[styles.contentSec, item.isSeen == 1 ? { backgroundColor: Color.COLOR.BLUE.LIGHT_BLUE } : {}]}> */}
        <View style={styles.contentSec}>
          <View style={styles.contentSubSec}>
            <Image
              source={{ uri: item.image }}
              style={styles.notificationImg}
            />
            <View style={styles.textSec}>
              <Text style={styles.text}>{item.subject}</Text>
              {/* {item.isCheck ? */}
              <Text style={styles.bodyText}>{item.body}</Text>
              {/* :
                            null
                        } */}
              <Text style={styles.dateTimeText}>
                {DateConvert.viewDateFormat(item.createdAt)}
              </Text>
            </View>
            {/* {item.isRead == 0 ?
                        <View style={styles.status} /> :
                        <React.Fragment>
                            {item.isCheck ? */}
            <View style={{ flexDirection: "column" }}>
              {item.isSeen == 1 ? (
                <TouchableOpacity
                  onPress={() => this._onPopupModal(item)}
                  activeOpacity={0.7}
                  style={{}}
                >
                  <Image
                    source={ImageName.DELETE_WITH_RED}
                    style={styles.deleteImg}
                  />
                </TouchableOpacity>
              ) : (
                <View style={{ top: -5, marginLeft: "5%" }}>
                  <View style={styles.redCircel}>
                    <View style={styles.Circel} />
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.spaceUnderline} />
      </React.Fragment>
    );
  };
  // for design list header section
  listHeaderSection = () => {
    return (
      <View>
        <View style={styles.headerActionArea}>
          <View style={styles.headerSubActionArea}>
            <TouchableOpacity
              style={CustomStyle.backButtonView}
              onPress={() => this._onBack()}
            >
              <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
            </TouchableOpacity>
            <View style={CustomStyle.headerTextView}>
              <Text style={CustomStyle.headerText}>Notification</Text>
            </View>
            <View style={CustomStyle.backButtonView} />
          </View>
        </View>

        <EditAndDeleteModal
          type={"delete"}
          isVisible={this.state.isVisibleModal}
          onCancel={() => this._onPopupModal()}
          isLoading={this.state.modalLoader}
          onDelete={() => this._onListDelete()}
        />
      </View>
    );
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
          disabled={true}
          // disabled={this.state.showHideCheckBox || this.state.opportunityList.length < 1}
        >
          <Image
            source={ImageName.HORIZONTAL_THREE_DOT}
            style={styles.tooltipBtn}
          />
        </TouchableOpacity>
      </Tooltip>
    );
  };

  // this is main render to this page
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.listDataLoader ? (
          <View style={styles.loaderView}>
            <Loader />
          </View>
        ) : (
          <React.Fragment>
            {this.listHeaderSection()}

            {this.state.notificationArrData.length > 0 ? (
              <React.Fragment>
                <FlatList
                  data={this.state.notificationArrData}
                  renderItem={(item, key) =>
                    this.renderNotificationItem(item, key)
                  }
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
          </React.Fragment>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { CustomerRedux } = state;
  return { CustomerRedux };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      stateCheckForNetwork,
      stateUserInformation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
