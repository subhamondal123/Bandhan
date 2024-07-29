import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";

import { stateCheckForNetwork } from "../../redux/CustomerAction";
import RenderHtml from "react-native-render-html";
import { Dimension, ImageName } from "../../enums";
import { MiddlewareCheck } from "../../services/middleware";
import { ErrorCode } from "../../services/constant";
import { Toaster } from "../../services/common-view-function";
import { Loader } from "../../shared";
import { AppInfo } from "../../services/config";
import { APP_INDEX } from "../../../globalConstant";
import { CustomStyle } from "../style";

// this is policy view page
class PolicyView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      htmlData: "",
      pageLoader: true,
    };
  }

  // set the initial data
  _onSetInitialStateData = async () => {
    this.setState({
      htmlData: "",
      pageLoader: true,
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
  // for naviaget to back screen
  _onBack = () => {
    this.props.navigation.goBack();
  };

  // this is first function where set state data
  _load = async () => {
    let responseData = await MiddlewareCheck("getApplicationPolicy", {
      policyType: this.props.route.params.type,
      packageName: AppInfo.getAppPackageName(),
      appIndex: APP_INDEX,
    });
    if (responseData) {
      if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.setState({ htmlData: responseData.data.body });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    } else {
      this.props.navigation.navigate("NetworkError");
    }
    this.setState({ pageLoader: false });
  };
  // for design list header section
  listHeaderSection = () => {
    return (
      <View style={styles.listHeaderMain}>
        <View style={styles.listHeaderSubMain}>
          <TouchableOpacity
            style={CustomStyle.backButtonView}
            onPress={() => this._onBack()}
          >
            <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
          </TouchableOpacity>
          <View style={CustomStyle.headerTextView}>
            {this.props.route.params.type == "privacyPolicy" ? (
              <Text style={CustomStyle.headerText}>Privacy Policy</Text>
            ) : (
              <Text style={CustomStyle.headerText}>Terms & Conditions</Text>
            )}
          </View>
          <View style={CustomStyle.backButtonView} />
        </View>
      </View>
    );
  };

  // this is main render to this page
  render() {
    if (this.state.pageLoader) {
      return <Loader />;
    } else {
      return (
        <SafeAreaView>
          {this.listHeaderSection()}
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: "5%" }}
          >
            <RenderHtml
              contentWidth={Dimension.width}
              source={{ html: this.state.htmlData }}
            />
            <View style={{ marginBottom: "20%" }} />
          </ScrollView>
        </SafeAreaView>
      );
    }
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PolicyView);
