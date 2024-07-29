import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Color, FontFamily, FontSize } from "../../../../enums";
import { StorageDataModification } from "../../../../services/common-view-function";
import styles from "./style";
import SvgComponent from "../../../../assets/svg";
import { VisitFilterModal } from "../../../../pageShared";
// this is lms header page
class LmsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: "",
      isVisibleModal: false,
      isSuccessAttendance: false,
      pageLoader: false,
      attendanceLoader: true,
      attendanceSuccessLoader: false,
      isAttendancePermission: true,

      attendanceDropDownArr: [],
      attendanceDropDownObj: {},
      showDropDown: false,
      logoutModal: false,
      logOutLoader: false,

      isVisibleRouteFilterModal: false,
    };
  }
  // this is initial function which is call first
  componentDidMount() {
    this._load();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  // this is the first function where set state data
  _load = async () => {};

  // for network errror
  _onNetworkError = async () => {
    let headerData = await StorageDataModification.headerData({}, "get");
    if (headerData !== null || headerData !== undefined) {
      this.setState({ pageLoader: true });
      this.props.stateUserInformation(headerData);
      this.setState({ pageLoader: false });
    }
  };
  // for visible logout mopdal
  _onLogoutModal = () => {
    this.setState({
      logoutModal: !this.state.logoutModal,
    });
  };
  // for visible filter modal
  routefilterModal = () => {
    this.setState({
      isVisibleRouteFilterModal: !this.state.isVisibleRouteFilterModal,
    });
  };

  onApplyFilter = (data) => {
    this.props.onApplyFilter(data);
    this.routefilterModal();
  };
  // for reset data
  onResetData = () => {
    this.props.onResetFilter();
  };

  onNotification = () => {
    this.props.onNotificationData();
  };
  // this is main render to this page
  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.gamificationMainView}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.props.navigation.goBack()}
          >
            <SvgComponent svgName={"back"} strokeColor={"#1F2B4D"} />
          </TouchableOpacity>

          <View style={styles.headerTxtSec}>
            <Text style={styles.headerTxt}>{this.props.headerText}</Text>
          </View>

          <TouchableOpacity
            onPress={() => this.onNotification()}
            style={{
              borderRadius: 100,
              borderWidth: 0.5,
              borderColor: "#D1D1D1",
              padding: 5,
            }}
          >
            <SvgComponent
              svgName={"notification"}
              strokeColor={"#1F2B4D"}
              height={24}
              width={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LmsHeader;
