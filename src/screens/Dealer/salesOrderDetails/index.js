import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  stateCheckForNetwork,
  stateUserInformation,
} from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton } from "../../../shared";
import { DynamicOrderCartDetailsList } from "../../../pageShared";

let StaticData = [
  {
    id: 1,
    name: "TMT 500",
    discount: "20%",
    amount: "2748",
  },
  {
    id: 2,
    name: "TMT 500",
    discount: "20%",
    amount: "2748",
  },
  {
    id: 3,
    name: "TMT 500",
    discount: "20%",
    amount: "2748",
  },
  {
    id: 4,
    name: "TMT 500",
    discount: "20%",
    amount: "2748",
  },
  {
    id: 5,
    name: "TMT 500",
    discount: "20%",
    amount: "2748",
  },
  {
    id: 6,
    name: "TMT 500",
    discount: "20%",
    amount: "2748",
  },
  {
    id: 7,
    name: "TMT 500",
    discount: "20%",
    amount: "2748",
  },
];

// this is sales order details page
class SalesOrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerListOrder: [],
    };
  }
  // this is a initial function which is call first
  componentDidMount = async () => {
    await this._load();
  };
  // this fiunction used for navigate to previous page
  _onBack = () => {
    this.props.navigation.goBack();
  };

  // this is first fucntion where set state data
  _load = async () => {
    this.setState({
      customerListOrder: StaticData,
    });
  };

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  };
  // for render contact list data
  renderContactList = (item, key) => {
    return <View style={{}}>{this.listSection(item.item, item.index)}</View>;
  };

  listSection = (item, key) => {
    return (
      <View key={key}>
        <DynamicOrderCartDetailsList data={item} props={this.props} />
      </View>
    );
  };
  // for design header section
  _onHeaderSec = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
            <Image source={ImageName.BACK_IMG} style={styles.backImg} />
          </TouchableOpacity>
          <View style={styles.sOrderTxtSec}>
            <Text style={styles.salesOrderTxt}>Sales Order Detail</Text>
          </View>
          <Image source={ImageName.THREE_DOT_BLACK} style={styles.tdbImg} />
        </View>
      </View>
    );
  };

  onRecentOrder = () => {
    this.props.navigation.navigate("OrderHistoryList");
  };
  // for design profile title section
  profileTileSec = () => {
    return (
      <View style={styles.profileTitleSec}>
        <View style={styles.rameshTabTxtSec}>
          <TouchableOpacity style={styles.rameshTxtTab}>
            <Image
              source={ImageName.DUMMY_PROFILE_IMG}
              style={styles.profileImg}
            />
            <View style={{ marginLeft: "3%" }}>
              <Text style={styles.rameshTxt}>Ramesh Roy</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rameshNumTxt}>
            <Image
              source={ImageName.SHOPING_ORDER_BOX}
              style={styles.shopImg}
            />
            <View style={{ width: 5 }} />
            <Text style={styles.rameshNumTxt}>240</Text>
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <View style={styles.orderIdSec}>
            <View style={styles.orderIdSubSec}>
              <Text style={styles.orderIdTxt}>
                Order ID <Text style={styles.orderIdNumTxt}>{"# 2468"}</Text>
              </Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.orderDateTxt}>23 May 2023</Text>
              <View style={styles.downloadImgSec}>
                <Image
                  source={ImageName.ORDER_BLUE_DOWNLOAD_IMG}
                  style={styles.orderDownloadImg}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _onPlaceOreder = () => {
    this.props.navigation.navigate("OrderSuccessFully");
  };

  _onAddMore = () => {
    this.props.navigation.navigate("CreateOrderList");
  };

  _onfooterSec = () => {
    return (
      <>
        <View style={{ marginTop: 15, marginHorizontal: "5%" }} />
        <View style={styles.billInfoSec}>
          <Text style={styles.billInfoTxt}>Bill Information</Text>
          <Text style={styles.billInfoNumTxt}>{"\u20B9" + " " + 2473}</Text>
          <View style={styles.partialTxtSec}>
            <Text style={styles.partialTxt}>Partial</Text>
          </View>
        </View>
        <View style={styles.btnSec}>
          <BigTextButton
            text={"Update Payment"}
            backgroundColor={"#fff"}
            additionalStyles={{ borderColor: "#000", borderWidth: 1 }}
            borderRadius={22}
            fontColor={"#000"}
            fontSize={12}
          />
          <View style={{ width: 95 }} />
          <BigTextButton
            text={"Repeat Order"}
            backgroundColor={"#F13748"}
            borderRadius={22}
            fontSize={12}
            onPress={() => this.onUpdatePayment()}
          />
        </View>
      </>
    );
  };

  //this is main render to this page
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._onHeaderSec()}
        {this.profileTileSec()}
        <React.Fragment>
          <FlatList
            data={this.state.customerListOrder}
            renderItem={(item, key) => this.renderContactList(item, key)}
            keyExtractor={(item, key) => key}
            // onEndReached={this.fetchMore}
            onEndReachedThreshold={0.1}
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
        {this._onfooterSec()}
        <View style={{ marginBottom: 40 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesOrderDetails);
