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

// this is scheme page
class Scheme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoader: true,
      formLoader: true,
    };
  }
  // this is initial function which is call first
  componentDidMount() {
    this._load();
  }
  // this is first function where set state data
  _load = async () => {
    this.setState({
      formLoader: false,
      pageLoader: false,
    });
  };
  // for navigate to back screen
  _onBack = () => {
    this.props.navigation.goBack();
  };

  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  };

  _onAvail = () => {};
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
            <View style={styles.schemeSec}>
              <View style={styles.schemeTabSec}>
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
                  <Text style={CustomStyle.headerText}>Scheme</Text>
                </View>
                <View style={CustomStyle.backButtonView} />
              </View>
            </View>
            <View style={styles.diwaliOfferSec}>
              <View style={styles.imageTextView}>
                <Text style={styles.offerText}>Diwali Offet</Text>
                <View style={{ marginTop: 40 }}>
                  <Image
                    source={ImageName.GROUP_OFFER}
                    style={styles.offerImage}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      color: Color.COLOR.GRAY.DAVY_GRAY,
                      fontSize: FontSize.MD,
                      fontFamily: FontFamily.FONTS.INTER.BOLD,
                    }}
                  >
                    Get a 50% off for Diwali{" "}
                  </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      color: Color.COLOR.BLACK.PURE_BLACK,
                      fontSize: FontSize.LG,
                      fontFamily: FontFamily.FONTS.INTER.BOLD,
                    }}
                  >
                    *Velid for only 44 hours{" "}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.bigBtnSec}>
              <BigTextButton
                borderRadius={16}
                backgroundColor={Color.COLOR.BLUE.BULE_LIGHT_CUSTOMER}
                text={"Avail"}
                // fontSize={FontSize.SM}
                onPress={() => this._onAvail()}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(Scheme);
