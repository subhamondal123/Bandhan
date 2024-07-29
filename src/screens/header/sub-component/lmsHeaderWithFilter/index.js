import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Color, FontFamily, FontSize } from "../../../../enums";
import { StorageDataModification } from "../../../../services/common-view-function";

import SvgComponent from "../../../../assets/svg";
import { Filter } from "../../../../pageShared";
import styles from "./styles";
// this is lms header with filter page
class LmsHeaderWithFilter extends React.Component {
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

      isVisibleFilter: false,
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
  // this is first function where set state data
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
  // for visible logout modal
  _onLogoutModal = () => {
    this.setState({
      logoutModal: !this.state.logoutModal,
    });
  };
  // for visible filter modal
  filterModal = () => {
    this.setState({ isVisibleFilter: !this.state.isVisibleFilter });
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
  // for render filter modal
  modalSec = () => {
    return (
      <>
        <Filter
          isVisible={this.state.isVisibleFilter}
          onCloseModal={() => this.filterModal()}
          props={this.props}
        />
      </>
    );
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

          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Text style={styles.headerTxt}>{this.props.headerText}</Text>
          </View>

          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => this.filterModal()}
          >
            <SvgComponent svgName={"filter"} strokeColor={"#1F2B4D"} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onNotification()}
            style={styles.notificationTab}
          >
            <SvgComponent
              svgName={"notification"}
              strokeColor={"#1F2B4D"}
              height={24}
              width={24}
            />
          </TouchableOpacity>
        </View>
        {this.modalSec()}
      </View>
    );
  }
}

export default LmsHeaderWithFilter;
