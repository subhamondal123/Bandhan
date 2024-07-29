import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, VirtualizedView } from "../../../shared";

let StaticData = [
  // status -- 1:not reviewed,2:pending,3:Approved,4:order proccessed,5:order delivered,6:order rejected
  {
    id: 1,
    name: "Ramesh Roy",
    orderId: "286648",
    orderAmount: "1000000",
    orderDate: "2011-08-12T20:17:46.384Z",
    status: 1,
    check: false,
  },
  {
    id: 2,
    name: "Ramesh Roy",
    orderId: "286648",
    orderAmount: "1000000",
    orderDate: "2011-08-12T20:17:46.384Z",
    status: 2,
    check: false,
  },
  {
    id: 3,
    name: "Ramesh Roy",
    orderId: "286648",
    orderAmount: "1000000",
    orderDate: "2011-08-12T20:17:46.384Z",
    status: 3,
    check: false,
  },
  {
    id: 4,
    name: "Ramesh Roy",
    orderId: "286648",
    orderAmount: "1000000",
    orderDate: "2011-08-12T20:17:46.384Z",
    status: 4,
    check: false,
  },
  {
    id: 5,
    name: "Ramesh Roy",
    orderId: "286648",
    orderAmount: "1000000",
    orderDate: "2011-08-12T20:17:46.384Z",
    status: 5,
    check: false,
  },
  {
    id: 6,
    name: "Ramesh Roy",
    orderId: "286648",
    orderAmount: "1000000",
    orderDate: "2011-08-12T20:17:46.384Z",
    status: 3,
    check: false,
  },
  {
    id: 7,
    name: "Ramesh Roy",
    orderId: "286648",
    orderAmount: "1000000",
    orderDate: "2011-08-12T20:17:46.384Z",
    status: 2,
    check: false,
  },
  {
    id: 8,
    name: "Ramesh Roy",
    orderId: "286648",
    orderAmount: "1000000",
    orderDate: "2011-08-12T20:17:46.384Z",
    status: 1,
    check: false,
  },
  {
    id: 9,
    name: "Ramesh Roy",
    orderId: "286648",
    orderAmount: "1000000",
    orderDate: "2011-08-12T20:17:46.384Z",
    status: 2,
    check: false,
  },
];
// this is sales order report page
class SalesOrderReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerListOrder: [],
    };
  }
  // this is a initial page which is call first
  componentDidMount = async () => {
    await this._load();
  };
  // this is first function where set state data
  _load = async () => {
    this.setState({
      customerListOrder: StaticData,
    });
  };

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  };

  onOrderDetails = (item) => {
    this.props.navigation.navigate("SelectedOrderDetail", { data: { item } });
  };
  // for render contact list section data
  renderContactList = (item) => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        {this.listSection(item.item, item.index)}
      </View>
    );
  };

  onShowHide = (data, key) => {
    let allItem = this.state.customerListOrder;
    for (let i = 0; i < allItem.length; i++) {
      if (allItem[i].id == data.id) {
        allItem[i].check = !allItem[i].check;
      } else {
        allItem[i].check = false;
      }
    }
    this.state.customerListOrder = allItem;
    this.setState({ customerListOrder: this.state.customerListOrder });
  };
  // this function used for design list show hide data
  _listShowHideData = () => {
    return (
      <>
        <View
          style={{
            marginTop: 10,
            borderTopColor: "#747C90",
            borderTopWidth: 0.8,
          }}
        />
        <View style={{ marginTop: 20 }}>
          <View style={styles.aproveSec}>
            <View style={styles.orderApproveSec}>
              <Text style={styles.orderApproveTxt}>Order Approve </Text>
              <Image
                source={ImageName.CALENDER_CLOCK_IMG}
                style={styles.calenderImg}
              />
              <Text style={styles.orderApproValTxt}>
                23<Text style={styles.rdTxt}>rd</Text>
              </Text>
            </View>
            <Text style={styles.allApproTxt}>All Approved</Text>
          </View>
          <View style={styles.vehicleSec}>
            <Image
              source={ImageName.ORDER_DELIVERED_VAN}
              style={styles.deliverImg}
            />
            <Text style={styles.vehicleNoTxt}>
              Vehicle No. <Text style={styles.wbNumTxt}>WB3338BV99</Text>
            </Text>
          </View>

          <View style={styles.deliverContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.startTxt}>Start</Text>
              <View style={styles.rdSec}>
                <Image
                  source={ImageName.CALENDER_CLOCK_IMG}
                  style={styles.calClImg}
                />
                <Text style={styles.rdValTxt}>
                  24<Text style={styles.RDTxt}>rd</Text>
                </Text>
              </View>
              <View style={styles.pmSec}>
                <Image source={ImageName.CLOCK_LOGO} style={styles.clockImg} />
                <Text style={styles.pmValTxt}>
                  9.45<Text style={styles.pmTxt}>PM</Text>
                </Text>
              </View>
              <Text style={styles.vehicleTimeTxt}>Vehicle in Time</Text>
            </View>
            <View style={styles.arrDeliSec}>
              <Text style={styles.arriveTxt}>Arrive</Text>
              <View style={styles.arrRdSec}>
                <Image
                  source={ImageName.CALENDER_CLOCK_IMG}
                  style={styles.rdClockImg}
                />
                <Text style={styles.rdVal}>
                  24<Text style={styles.arrRdTxt}>rd</Text>
                </Text>
              </View>
              <View style={styles.arrPmSec}>
                <Image
                  source={ImageName.CLOCK_LOGO}
                  style={styles.pmClockImg}
                />
                <Text style={styles.pmVal}>
                  9.45<Text style={styles.arrPmTxt}>PM</Text>
                </Text>
              </View>
              <View style={styles.deliTxtSec}>
                <Text style={styles.deliTxt}>Delivered</Text>
              </View>
            </View>
            <View style={styles.erDispatchSec}>
              <Text style={styles.erpTxt}>ERP</Text>
              <Text style={styles.delNumTxt}>DELR09877</Text>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.orderOtTxt}>
                  Order Qty <Text sty={styles.orderOtVal}>12</Text>
                </Text>
              </View>
              <Text style={styles.dispatchOtTxt}>
                Dispatch Qty.<Text style={styles.dispatchOtTimeTxt}>12:06</Text>
              </Text>
            </View>
          </View>
          <View style={styles.orderDeliSec}>
            <Text style={styles.ORCtXt}>Order Receiving Confirmation</Text>
            <View sty={{ marginLeft: "3%" }}>
              <Image
                source={ImageName.ORDER_APPROVED_TICK}
                style={styles.orderApproImg}
              />
            </View>
            <Text style={styles.deliTermTxt}>
              Delivery Term:<Text style={styles.toPayTxt}>To Pay</Text>
            </Text>
          </View>
          <View style={styles.bigBtnSec}>
            <BigTextButton
              text={"Order Details"}
              fontSize={12}
              backgroundColor={"#1F2B4D"}
              borderRadius={18}
            />
          </View>
        </View>
      </>
    );
  };

  listSection = (item, key) => {
    const statusSection = (status) => {
      return (
        <Image
          source={
            status == 1
              ? ImageName.GREY_CIRCLE_IMG
              : status == 2
              ? ImageName.ORDER_PENDING_IMG
              : status == 3
              ? ImageName.ORDER_APPROVED_TICK
              : status == 4
              ? ImageName.ORDER_PROCESSED_IMG
              : status == 5
              ? ImageName.ORDER_DELIVERED_VAN
              : status == 5
              ? ImageName.RED_CLOSE_IMG
              : null
          }
          style={{
            height: 20,
            width: 20,
            resizeMode: "contain",
            marginRight: "2%",
          }}
        />
      );
    };

    const _approvedOrder = () => {
      this.props.navigation.navigate("ApproveOrderList");
    };
    return (
      <View key={key}>
        <View style={styles.mainView} activeOpacity={0.9}>
          <TouchableOpacity
            style={styles.orderCycleSec}
            onPress={() => this.onShowHide(item, key)}
            activeOpacity={0.9}
          >
            <View style={styles.calenderSec}>
              <View style={styles.dateSec}>
                <Image
                  source={ImageName.CALENDER_CLOCK_IMG}
                  style={styles.calendetrClockImg}
                />
                <View style={{ width: 5 }} />
                <Text style={styles.dateText}>23 Jan</Text>
              </View>
              <View style={{ width: 20 }} />
              <View style={styles.idTxtSec}>
                <Text style={styles.orderValue}>
                  {/* something is wrong in style this line ID */}
                  <Text style={styles.idTxt}>#24678</Text>
                </Text>
              </View>
              <Image
                source={ImageName.DOWN_ARROW}
                style={styles.blackDropDown}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.marginSec}
            activeOpacity={0.9}
            onPress={() => _approvedOrder()}
          >
            <Image
              source={ImageName.DUMMY_PROFILE_IMG}
              style={styles.userImg}
            />
            <View style={styles.nameSec}>
              <Text style={styles.nameText} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.dealerText}>{"dealer"}</Text>
            </View>
            <View style={styles.itemStatusSec}>
              {statusSection(item.status)}
            </View>
            <Text style={styles.orderAmount}>
              {"\u20B9" + "" + item.orderAmount}
            </Text>
          </TouchableOpacity>
          {item.check ? <>{this._listShowHideData()}</> : null}
        </View>
      </View>
    );
  };
  // for navigate to previous page
  _onBack = () => {
    this.props.navigation.goBack();
  };
  // this function used for design header sec
  _onHeaderSec = () => {
    return (
      <View style={styles.headerSec}>
        <View style={styles.headerSubSec}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
            <Image source={ImageName.BACK_IMG} style={styles.backImg} />
          </TouchableOpacity>
          <View style={styles.sorSec}>
            <Text style={styles.sorTxt}>Sales Order Report</Text>
          </View>
          {/* <Image source={ImageName.THREE_DOT_BLACK} style={styles.tdbImg} /> */}
        </View>
      </View>
    );
  };
  // for design previous section
  previousOrderSec = () => {
    return (
      <View style={styles.previousOrderMain}>
        <View style={styles.thisMontTxtSec}>
          <Text style={styles.thisMontTxt}>This Month</Text>

          <View style={{ flex: 1, marginLeft: "3%" }}>
            <Text
              style={{
                color: Color.COLOR.BLACK.PURE_BLACK,
                fontSize: 11,
                fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
              }}
            >
              June 23,2023
            </Text>
          </View>
          <View style={{ width: 120, top: -5 }}>
            <BigTextButton
              text={"Previous Order"}
              backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
              height={30}
              fontSize={12}
              fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
              borderRadius={25}
            />
          </View>
        </View>
      </View>
    );
  };
  _onCreateOrder = () => {
    this.props.navigation.navigate("CreateOrderList");
  };
  // for design footer section
  _onFooterSec = () => {
    return (
      <View style={styles.footerMain}>
        <View style={styles.totalAmtTxtMain}>
          <View style={styles.totalAmtTxtSubMain}>
            <Text style={styles.totalOutTxt}>Total Outstanding</Text>
            <Text style={styles.totalAmtTxt}>{"\u20B9" + " " + 2473}</Text>
          </View>
        </View>
        <View style={styles.bigBtnContainer}>
          <BigTextButton
            text={"Update Orders"}
            fontSize={12}
            backgroundColor={"#1F2B4D"}
            borderRadius={24}
          />
          <View style={{ width: 35 }} />
          <BigTextButton
            text={"Create an Order"}
            fontSize={12}
            backgroundColor={"#F13748"}
            borderRadius={24}
            onPress={() => this._onCreateOrder()}
          />
        </View>
        <View style={{ height: 100 }} />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._onHeaderSec()}
        {this.previousOrderSec()}
        <VirtualizedView>
          <React.Fragment>
            <FlatList
              data={this.state.customerListOrder}
              renderItem={(item, key) => this.renderContactList(item, key)}
              keyExtractor={(item, key) => key}
              // onEndReached={this.fetchMore}
              onEndReachedThreshold={0.1}
              // ListFooterComponent={this.renderLoader}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              // refreshControl={
              //     <RefreshControl
              //         refreshing={this.state.refreshing}
              //         onRefresh={() => this.onRefresh()}
              //     />
              // }
            />
          </React.Fragment>
          {this._onFooterSec()}
        </VirtualizedView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesOrderReport);
