import { CommonActions } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { Color, Dimension, ImageName } from "../../enums";
import { ErrorCode } from "../../services/constant";
import { MiddlewareCheck } from "../../services/middleware";
import { modifyCountryArrData } from "./Function";
import styles from "./Style";
import {
  stateAllCountries,
  stateCheckForNetwork,
} from "../../redux/CustomerAction";
import { bindActionCreators } from "redux";
import {
  StorageDataModification,
  Toaster,
  userWarning,
} from "../../services/common-view-function";
import { AppInfo } from "../../services/config";
import { APP_INDEX } from "../../../globalConstant";
// this is splash screen page
class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      authCheck: false,
      versionData: {},
      authorizationCheck: true,
    };
  }
  // this is initial function which is call first
  componentDidMount = async () => {
    await this._load();
  };
  // this is first function where set state data
  _load = async () => {
    this.setState({
      authorizationCheck: await userWarning.actionUnauthorizedDeviceWorning(
        this.props
      ),
    });
    await this._onGetAppVersionInfo();
    if (await StorageDataModification.authData({}, "get")) {
      //chcek if user is logIn or not
      this.setState({ authCheck: true });
      this._onHideGoToNextPage();
    } else {
      this._onHideGoToNextPage();
    }

    this.getCountryData();
  };

  // for get the app version info
  _onGetAppVersionInfo = async () => {
    let responseData = await MiddlewareCheck("getCurrentAppVersionInfo", {
      packageName: AppInfo.getAppPackageName(),
      appIndex: APP_INDEX,
    });
    console.log("-getCurrentAppVersionInfo----", JSON.stringify(responseData))
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.setState({ versionData: responseData.response });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };
  // for get country data
  getCountryData = async () => {
    let responseData = await MiddlewareCheck("getAllCountryList", {}, this.props);
    console.log("getAllCountryList.getAllCountryList()----", responseData)

    if (responseData) {
      if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.props.stateAllCountries(modifyCountryArrData(responseData.response));
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };

  _onHideGoToNextPage = async () => {
    var that = this;
    that.myVar = setTimeout(function () {
      that._Hide_Splash_Screen();
    }, 1600);
  };

  // for splash screen hide and redirect to another page autometicaly
  _Hide_Splash_Screen = async () => {
     // let responseData = await MiddlewareCheck("getCurrentAppVersionInfo", {
    //   packageName: AppInfo.getAppPackageName(),
    //   appIndex: APP_INDEX,
    // });
    // if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS && responseData.success) {
    //   if (parseInt(responseData.response.versionCode) > parseInt(AppInfo.getCurrentAppBuildNumber())) {
    //     if (responseData.response.isUpdate == 2) {
    //       props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'NewVersionAvailable', "data": responseData.response }] }));
    //       navigateCheck = false;
    //     } else if (responseData.response.isUpdate == 1) {
    //       Toaster.ShortCenterToaster(AlertMessage.MESSAGE.UPDATE_VERSION.OPTIONAL);
    //     }
    //   }
    // }
    if (this.state.authCheck && this.state.authorizationCheck) {
      if (this.state.versionData.versionCode > AppInfo.getCurrentAppBuildNumber()) {
        if (this.state.versionData.isUpdate == 2) {
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "NewVersionAvailable" }],
            })
          );
        } else {
          if (this.state.versionData.isUpdate == 1) {
            Toaster.LongCenterToaster(
              "A new update is available. You can update the apk."
            );
          }
          this.setState({
            isVisible: false,
          });
          if (this.state.authCheck) {
            this.props.navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: "DrawerNav" }] })
            );
          } else {
            this._onWelcome();
          }
        }
      } else {
        this.setState({
          isVisible: false,
        });
        if (this.state.authCheck) {
          this.props.navigation.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: "DrawerNav" }] })
          );
        } else {
          this._onWelcome();
        }
      }
    } else {
      this._onWelcome();
    }
  };

  _onWelcome = () => {
    this.setState({ isVisible: false });
    if (this.state.authorizationCheck) {
      this.props.navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "LogIn" }] })
      );
    }
  };

  // for network erroe
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
    this.props.stateCheckForNetwork("SplashScreen");
  };
  // this is main render to this page
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={ImageName.BANDHAN_LANDING}
          style={{
            height: Dimension.height,
            width: Dimension.width,
            resizeMode: "stretch",
          }}
        />
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
      stateAllCountries,
      stateCheckForNetwork,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
