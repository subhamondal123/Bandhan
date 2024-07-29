import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  stateAllCountries,
  stateCheckForNetwork,
} from "../../../../redux/CustomerAction";
import styles from "./style";
import { Color, FontFamily, FontSize, ImageName } from "../../../../enums";
import { CustomStyle } from "../../../style";
import { StorageDataModification } from "../../../../services/common-view-function";
import { MiddlewareCheck } from "../../../../services/middleware";
import { ErrorCode } from "../../../../services/constant";

// this is common page
class Common extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerText: "",
      isVisibleModal: false,
      isSuccessAttendance: false,
      pageLoader: false,
      attendanceLoader: false,
    };
  }
  // this is initial function which is call first
  componentDidMount() {
    this._load();
  }
  //
  _load = async () => {
    await this._getUserInfoFromApi();
  };

  // for get the user info
  _getUserInfoFromApi = async () => {
    let headerData = await StorageDataModification.headerData({}, "get");
    if (headerData == null || headerData == undefined) {
      this.setState({ pageLoader: true });
    }
    let responseData = await MiddlewareCheck("getGeneralData", {}, this.props);
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (
        responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR &&
        responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS
      ) {
        if (
          headerData == null ||
          headerData == undefined ||
          headerData !== responseData.data
        ) {
          this.setState({ pageLoader: true });
          // this.props.stateUserInformation(responseData.data);
          await StorageDataModification.headerData(responseData.data, "store");
          this.setState({ pageLoader: false });
        }
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };

  // for network errror
  _onNetworkError = async () => {
    let headerData = await StorageDataModification.headerData({}, "get");
    if (headerData !== null || headerData !== undefined) {
      this.setState({ pageLoader: true });
      // this.props.stateUserInformation(headerData);
      this.setState({ pageLoader: false });
    }
  };

  _onToggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  // for notification page
  _onNotification = () => {
    this.props.navigation.navigate("Notification");
  };
  _onProfile = () => {
    this.props.navigation.navigate("ProfilePage");
  };

  // this is main render to this page
  render() {
    let headerNameViewCheck = true,
      fingerprintViewCheck = false,
      notificationViewCheck = false,
      profileCheck = false,
      userImg = ImageName.PROFILE_GRAY;
    if (this.props.route.name == "Dashboard") {
      headerNameViewCheck = false;
      fingerprintViewCheck = true;
      notificationViewCheck = true;
    } else if (this.props.route.name == "CrmDashboard") {
      notificationViewCheck = true;
    }
    return (
      <View style={styles.headerContainer}>
        <View style={styles.mainView}>
          <Image source={ImageName.BANDHAN_LOGO} style={styles.bandhanImg} />
          <Text style={styles.bandhanTxt}>Bandhan</Text>
          {headerNameViewCheck ? (
            <View style={styles.headerMiddleSection}>
              <Text style={CustomStyle.headerText}>
                {this.state.headerText}
              </Text>
            </View>
          ) : (
            <View style={styles.headerMiddleSection} />
          )}
          <TouchableOpacity
            style={styles.drawerIconSection}
            activeOpacity={0.9}
            onPress={() => this._onToggleDrawer()}
          >
            <Image source={ImageName.MENU_BANDHAN} style={styles.drawerIcon} />
          </TouchableOpacity>
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Common);
