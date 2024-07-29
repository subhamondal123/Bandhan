import { CommonActions } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import styles from "./Style";
import { Common, LmsHeader, LmsHeaderWithFilter } from "./sub-component";
// this is header page
class Header extends React.Component {
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

  getHeaderData = () => {
    let headerRespObj = {
      commonHeaderVisible: false,
      //lms
      lmsHeader: false,
      lmsHeaderWithFilter: false,
      headerText: "",
    };


    switch (this.props.route.name) {
      case "Catalogue":
        headerRespObj.lmsHeaderWithFilter = true;
        headerRespObj.headerText = "Catalogue";
        break;

      case "PassbookAndRedemption":
        headerRespObj.lmsHeaderWithFilter = true;
        headerRespObj.headerText = "Pass Book";
        break;

      case "CatalogueItemDetails":
        headerRespObj.lmsHeader = true;
        headerRespObj.headerText = "Catalogue";
        break;

      default:
        headerRespObj.commonHeaderVisible = true;
        break;
    }

    return headerRespObj;
  };

  onFilterApply = (data) => {
    this.props.onFilterData(data);
  };
  // for reset data
  onDataReset = () => {
    this.props.onReset();
  };
  // ofor download data
  onDataDownload = () => {
    this.props.onDownloadData();
  };
  // for select notification
  onSelectNotification = () => {
    this.props.onPressNotification();
  };

  // this is main render to this page
  render() {
    let headerData = this.getHeaderData();

    return (
      <View style={styles.headerContainer}>
        {headerData.commonHeaderVisible ? <Common {...this.props} /> : null}
        {headerData.lmsHeaderWithFilter ? (
          <LmsHeaderWithFilter
            {...this.props}
            headerText={headerData.headerText}
            onApplyFilter={(data) => this.onFilterApply(data)}
            onResetFilter={() => this.onDataReset()}
            onNotificationData={() => this.onSelectNotification()}
          />
        ) : null}
        {headerData.lmsHeader ? (
          <LmsHeader
            {...this.props}
            headerText={headerData.headerText}
            onNotificationData={() => this.onSelectNotification()}
          />
        ) : null}
      </View>
    );
  }
}

export default Header;
