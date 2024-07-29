import React from "react";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../enums";
import styles from "./Style";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { stateCheckForNetwork } from "../../redux/CustomerAction";
import { ErrorCode, LengthValidate } from "../../services/constant";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropdownInputBox, Loader, TextInputBox } from "../../shared";
import BigTextButton from "../../shared/big-text-button";
import { MiddlewareCheck } from "../../services/middleware";
import { Toaster } from "../../services/common-view-function";
import { CustomStyle } from "../style";
import { modifyBrandArr } from "./Function";

// this is loyalty page
class Loyalty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoader: true,
      formLoader: true,
      brandArr: [],
      selectedBrandObj: {},
    };
  }
  // this is initial function which is call first
  componentDidMount() {
    this._load();
  }
  // this is first function where set state data
  _load = async () => {
    await this._onBrandDropDownData();
    this.setState({
      formLoader: false,
      pageLoader: false,
    });
  };
  // this function used for navigate to back screen
  _onBack = () => {
    this.props.navigation.goBack();
  };

  _OnSelectBrand = async (value) => {
    let data = this.state.brandArr;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == value.id) {
        data[i].check = true;
      }
    }
    this.state.selectedBrandObj = value;
    this.setState({
      selectedBrandObj: this.state.selectedBrandObj,
      brandArr: data,
    });
  };

  _onBrandDropDownData = async () => {
    this.setState({ pageLoader: true });
    let responseData = await MiddlewareCheck("getProductCategory", {});
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.setState({
          brandArr: modifyBrandArr(responseData.data),
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
    this.setState({ pageLoader: false });
  };

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  };
  // for design profile section
  _onProfileSec = () => {
    return (
      <View style={styles.profileSec}>
        <View style={{ flex: 0.3 }}>
          <View style={styles.userImgSec}>
            <Image source={ImageName.USER_IMG} style={styles.profileImg} />
          </View>
        </View>
        <View style={{ flex: 0.7 }}>
          <Text style={styles.curentOfferTxt}>Current Offer</Text>
          <Text style={styles.bikeTxt}>Bike and other's </Text>
        </View>
      </View>
    );
  };
  // this is main render to this page
  render() {
    return (
      <View style={styles.container}>
        {this.state.pageLoader ? (
          <View style={styles.loaderSec}>
            <Loader />
          </View>
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.loyaltySec}>
              <View style={styles.loyaltySubSec}>
                <TouchableOpacity
                  style={CustomStyle.backButtonView}
                  onPress={() => this._onBack()}
                >
                  <Image
                    source={ImageName.BACK_IMG}
                    style={CustomStyle.backImg}
                  />
                </TouchableOpacity>
                <View style={CustomStyle.headerTextView}>
                  <Text style={CustomStyle.headerText}>Loyalty</Text>
                </View>
                <View style={CustomStyle.backButtonView} />
              </View>
            </View>
            <View style={{ marginHorizontal: "5%", marginTop: 10 }}>
              {this._onProfileSec()}
              <View style={{ flexDirection: "row", marginTop: 60 }}>
                <TouchableOpacity style={styles.mainBox} activeOpacity={0.9}>
                  <View style={styles.skyCircel}>
                    <Image
                      source={ImageName.HEART_TICK}
                      style={styles.rupeesImg}
                    />
                  </View>
                  <Text style={styles.boxNumberText}>300</Text>
                  <Text style={styles.boxsubText}>Active Points</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainBox} activeOpacity={0.9}>
                  <View style={styles.skyCircel}>
                    <Image
                      source={ImageName.HEART_TICK}
                      style={styles.rupeesImg}
                    />
                  </View>
                  <Text style={styles.boxNumberText}>500</Text>
                  <Text style={styles.boxsubText}>Target Points</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={styles.subBox} activeOpacity={0.9}>
                  <View style={{ marginHorizontal: "5%" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.skyCircel}>
                        <Image
                          source={ImageName.HEART_TICK}
                          style={styles.rupeesImg}
                        />
                      </View>
                      <View style={{ marginLeft: "5%", top: -9 }}>
                        <Text style={styles.boxNumberText}>500</Text>
                        <Text style={styles.boxsubText}>Locked Points</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 40, marginHorizontal: "4%" }}>
                <DropdownInputBox
                  selectedValue={
                    this.state.selectedBrandObj.id
                      ? this.state.selectedBrandObj.id.toString()
                      : "0"
                  }
                  data={this.state.brandArr}
                  onSelect={(value) => this._OnSelectBrand(value)}
                  headerText={"Select new offer"}
                />
              </View>
              <View style={{ marginTop: 40, marginHorizontal: "4%" }}>
                <DropdownInputBox
                  selectedValue={
                    this.state.selectedBrandObj.id
                      ? this.state.selectedBrandObj.id.toString()
                      : "0"
                  }
                  data={this.state.brandArr}
                  onSelect={(value) => this._OnSelectBrand(value)}
                  headerText={""}
                />
              </View>
            </View>

            <View style={{ marginBottom: 120 }} />
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { CustomerAction } = state;
  return { CustomerAction };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      stateCheckForNetwork,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Loyalty);
