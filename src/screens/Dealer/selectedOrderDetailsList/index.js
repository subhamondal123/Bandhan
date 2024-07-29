import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import {
  Color,
  Dimension,
  FontFamily,
  FontSize,
  ImageName,
} from "../../../enums";
import { BigTextButton, CheckBox, NoDataFound } from "../../../shared";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import {
  DateConvert,
  StorageDataModification,
  Toaster,
} from "../../../services/common-view-function";
import { modifyProfileData, orderHistoryDetailsModifyData } from "./function";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

// this is order deatails list page
class OrderDetailsList extends React.Component {
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
      listCheck: true,
      profileData: {},
      totalBillAmount: 0,
      placeOrderLoader: false,
    };
  }
  // this is a initial function which is call first
  componentDidMount = async () => {
    await this.storeInitialData();
    await this.getProfileData();
    await this._load();
  };
  // for navigate to previous page
  _onBack = () => {
    this.props.navigation.goBack();
  };

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  };

  _load = async () => {
    await this._orderHistoryDetailsApiCall();
  };

  // for store data call
  storeInitialData = async () => {
    let listData = await StorageDataModification.orderHistoryListDetails(
      {},
      "get"
    );
    if (listData == null || listData == undefined) {
      this.setState({ pageLoader: true });
    } else {
      this.setState({
        orderHistoryList: listData.orderList,
        totalDataCount: listData.totalCount,
        pageLoader: false,
      });
    }
  };
  // for fetch profile data
  getProfileData = async () => {
    let cust = await StorageDataModification.userCredential({}, "get");
    let custId = cust.customerId.toString();
    let reqData = { customerId: custId };
    let responseData = await MiddlewareCheck(
      "getCustomerDataWithCartItemCount",
      reqData,
      this.props
    );
    if (responseData === false) {
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let modifiedProfileData = modifyProfileData(responseData.response);
        this.setState({
          profileData: modifiedProfileData,
        });
      }
    }
  };
  // for order history details api call
  _orderHistoryDetailsApiCall = async () => {
    this.setState({ refreshing: false });
    let reqData = {
      limit: this.state.limit.toString(),
      offset: (this.state.pageNum * this.state.limit).toString(),
      orderNumber: this.props.route.params.data.recordNumber,
    };
    let responseData = await MiddlewareCheck(
      "getOrderHistoryDetails",
      reqData,
      this.props
    );
    if (responseData === false) {
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        if (this.state.pageNum == 0) {
          let orderHistoryDetailsData =
            await StorageDataModification.orderHistoryListDetails({}, "get");
          let orderHistoryData = orderHistoryDetailsModifyData(responseData);
          if (
            orderHistoryDetailsData == null ||
            orderHistoryDetailsData == undefined
          ) {
            this.setState({
              orderHistoryList: orderHistoryData.orderList,
              totalDataCount: orderHistoryData.totalCount,
            });
            await StorageDataModification.orderHistoryListDetails(
              orderHistoryData,
              "store"
            );
          } else if (
            JSON.stringify(orderHistoryDetailsData.orderList) ===
            JSON.stringify(orderHistoryData.orderList)
          ) {
            this.setState({
              orderHistoryList: orderHistoryData.orderList,
              totalDataCount: orderHistoryData.totalCount,
            });
            if (
              orderHistoryDetailsData.totalCount !== orderHistoryData.totalCount
            ) {
              await StorageDataModification.orderHistoryListDetails(
                orderHistoryData,
                "store"
              );
            }
          } else {
            this.setState({
              orderHistoryList: orderHistoryData.orderList,
              totalDataCount: orderHistoryData.totalCount,
            });
            await StorageDataModification.orderHistoryListDetails(
              orderHistoryData,
              "store"
            );
          }
          this.setState({ initialApiCall: true });
        } else {
          let orderHistoryData = orderHistoryDetailsModifyData(responseData);
          this.setState({
            orderHistoryList: [
              ...this.state.orderHistoryList,
              ...orderHistoryData.orderList,
            ],
            totalDataCount: orderHistoryData.totalCount,
          });
        }
      } else {
        if (this.state.pageNum == 0) {
          await StorageDataModification.orderHistoryListDetails({}, "clear");
          this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            orderHistoryList: [],
            initialApiCall: true,
          });
        }
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
    this.setState({
      pageLoader: false,
      listLoader: false,
    });
  };
  // for render list data section
  renderContactList = (item, key) => {
    return <View style={{}}>{this.listSection(item.item, item.index)}</View>;
  };

  _onCheckBox = () => {
    this.setState({
      listCheck: !this.state.listCheck,
    });
  };
  // for design list section
  listSection = (item, key) => {
    return (
      <View key={key}>
        <View style={styles.mainView}>
          <View style={styles.listContainer}>
            <View style={styles.listSubContainer}>
              <View style={styles.listTxtSec}>
                <Text style={styles.brandName}>{item.brandName}</Text>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.mtTxt}>{item.quantity.toFixed(1)} M.T</Text>
              </View>
              <View style={styles.statusTotalSec}>
                {/* <View style={{ marginTop: 10 }} /> */}
                <View style={styles.statusSec}>
                  <Text style={styles.statusTxt}>Status : </Text>
                  <Text
                    style={{
                      color:
                        item.approvedStatus == "1"
                          ? Color.COLOR.GREEN.APPLE_GREEN
                          : Color.COLOR.RED.AMARANTH,
                      fontSize: FontSize.XS,
                      fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
                    }}
                  >
                    {item.approvedStatus == "1" ? "Approved" : "Not Approved"}
                  </Text>
                </View>

                {/* <Text style={{ fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#747C90", top: 8 }}>{"Applied Discount"}  <Text style={{ color: '#F13748', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{"20%"}</Text></Text> */}
                <View style={styles.totalPriceSec}>
                  {/* <Text style={{ fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#747C90", top: 8, textDecorationLine: "line-through" }}>{'\u20B9' + " " + 2473}</Text> */}
                  <Text style={styles.totalPriceTxt}>
                    {"  \u20B9" + item.totalPrice}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _onHeaderSec = () => {
    return (
      <View style={styles.headerMain}>
        <View style={styles.headerSubMain}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
            <Image source={ImageName.BACK_IMG} style={styles.backImg} />
          </TouchableOpacity>
          <View style={styles.orderDetailTxtSec}>
            <Text style={styles.orderDetailTxt}>My Order Details</Text>
          </View>
          <TouchableOpacity
            style={styles.cartCountTab}
            onPress={() => this.onPressCart()}
          >
            <Image
              source={ImageName.SHOPING_ORDER_BOX}
              style={styles.shopImg}
            />
            <View style={{ width: 5 }} />
            <Text style={styles.cartCountTxt}>
              {this.state.profileData.cartCount}
            </Text>
          </TouchableOpacity>
          <Image source={ImageName.THREE_DOT_BLACK} style={styles.tdbImg} />
        </View>
        <View style={{ marginBottom: 10 }} />
      </View>
    );
  };
  onPressCart = () => {
    this.props.navigation.navigate("DealerCartDetails");
  };
  // for design profileTitleSec
  profileTileSec = () => {
    return (
      <View style={styles.profileTitleMain}>
        <View style={styles.profileTitleSubMain}>
          <TouchableOpacity style={styles.totalCartTab}>
            <View style={{ marginLeft: "3%" }}>
              <Text style={styles.totalCartTxt}>Total Cart Items</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // for design order Id section
  orderIdSec = () => {
    return (
      <View style={styles.orderIdMain}>
        <View style={styles.orderIdsubMain}>
          <Text style={styles.orderIdTxt}>
            Order ID{" "}
            <Text style={styles.orderRecord}>
              #{this.props.route.params.data.recordNumber}
            </Text>
          </Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.createDate}>
            {DateConvert.formatDDfullMonthYYYY(
              this.props.route.params.data.createdAt
            )}
          </Text>
          <View style={styles.downloadImgSec}>
            <Image
              source={ImageName.RED_CIRCEL_DOWNLOAD}
              style={styles.downloadImg}
            />
          </View>
        </View>
      </View>
    );
  };

  onUpdatePayment = () => {
    this.props.navigation.navigate("orderPaymentScreen");
  };

  onUpdateCartData = () => {
    this.getProfileData();
  };
  onRepeatOrder = async () => {
    let cust = await StorageDataModification.userCredential({}, "get");
    let custId = cust.customerId.toString();
    let reqData = {
      orderNumber: this.props.route.params.data.recordNumber,
      userId: custId,
    };

    
    this.setState({ placeOrderLoader: true });
    let responseData = await MiddlewareCheck(
      "repeatOrder",
      reqData,
      this.props
    );
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.props.navigation.navigate("DealerCartDetails", {
          data: this.props.route.params.data,
          onUpdateCart: this.onUpdateCartData,
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }

    this.setState({ placeOrderLoader: false });
  };
  // this function used for design footer section
  _onFooterSec = () => {
    let totalAmountData = 0;
    for (let i = 0; i < this.state.orderHistoryList.length; i++) {
      totalAmountData =
        totalAmountData + parseFloat(this.state.orderHistoryList[i].totalPrice);
    }

    this.state.totalBillAmount = totalAmountData;
    const _onUpdatePayment = () => {
      this.props.navigation.navigate("OrderPaymentScreen", {
        data: this.props.route.params.data,
      });
    };
    return (
      <>
        <View style={{ marginTop: 15, marginHorizontal: "5%" }} />
        <View style={styles.billInfoSec}>
          <Text style={styles.billInfoTxt}>Bill Information</Text>
          <Text style={styles.totalBillAmtTxt}>
            {"\u20B9" + " " + this.state.totalBillAmount.toFixed(1)}
          </Text>
          <View style={styles.partialSec}>
            <Text style={styles.partialTxt}>Partial</Text>
          </View>
        </View>
        <View style={styles.bigBtnSec}>
          <BigTextButton
            text={"Update Payment"}
            backgroundColor={"#fff"}
            additionalStyles={{ borderWidth: 0.8, borderColor: "#000" }}
            borderRadius={22}
            fontColor={"#000"}
            fontSize={12}
            onPress={() => _onUpdatePayment()}
          />
          <View style={{ width: 95 }} />
          {this.state.placeOrderLoader ? (
            <>
              <View style={{ width: 95 }} />
              <ActivityIndicator
                size={"small"}
                color={Color.COLOR.BLUE.LOTUS_BLUE}
              />
            </>
          ) : (
            <BigTextButton
              text={"Repeat Order"}
              backgroundColor={"#F13748"}
              borderRadius={22}
              fontSize={12}
              onPress={() => this.onRepeatOrder()}
            />
          )}
        </View>
        <View style={{ height: 50 }} />
      </>
    );
  };

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
            this.setState({ listLoader: false });
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 200,
        }}
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

  // change the state for refresh
  _onStatusChange = async () => {
    this.setState({
      pageNum: 0,
      limit: 10,
      totalDataCount: 0,
      orderHistoryList: [],
      refreshing: true,
      listLoader: true,
      pageLoader: true,
    });
  };

  //refresh list data
  onRefresh = async () => {
    await this._onStatusChange();
    await this._load();
  };

  ViewSkeletonPlaceholder = () => {
    let resData = [];
    for (let i = 0; i < 7; i++) {
      resData.push(
        <View
          style={[styles.mainBox, { marginVertical: 10, marginHorizontal: 12 }]}
          key={i}
        >
          <View style={styles.blueBox} />
        </View>
      );
    }
    return resData;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._onHeaderSec()}
        {/* {this.profileTileSec()} */}
        {this.orderIdSec()}
        {this.state.pageLoader ? (
          <SkeletonPlaceholder>
            {this.ViewSkeletonPlaceholder()}
          </SkeletonPlaceholder>
        ) : (
          <React.Fragment>
            {this.state.orderHistoryList.length > 0 ? (
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
            ) : (
              <React.Fragment>
                {this.state.initialApiCall ? (
                  <View style={{ marginTop: 20, height: Dimension.height }}>
                    <NoDataFound />
                  </View>
                ) : null}
              </React.Fragment>
            )}
          </React.Fragment>
        )}

        {/* <View style={{ marginBottom: 78 }} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsList);
