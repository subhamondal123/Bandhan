import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ImageName } from "../../enums";
import { CustomStyle } from "../style";
import styles from "./Style";
import { StockUpdateEntry, StockUpdateRecord } from "./sub-component";

// this is stock main details page
class StockMainDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      allData: {},
      isNewEntryActive: true,
      isHistoryActive: false,
    };
  }
  // this is initial function which is call first
  componentDidMount() {
    this._load();
  }
  // this is first function where set state data
  _load = async () => {};
  // for navigate to back screen
  _onBack = () => {
    this.props.navigation.goBack();
  };

  onSaveDataEntryFrom = (childData) => {
    if (childData.pageNum == 2) {
      this.onClickHistory();
    }
  };
  onClickHistory = () => {
    this.setState({
      isNewEntryActive: false,
      isHistoryActive: true,
    });
  };

  onSaveDataHistoryFrom = (childData) => {
    let allData = this.state.allData;
    Object.assign(allData, childData.data);
    this.setState({
      pageNum: childData.pageNum,
      allData: allData,
    });

    if (childData.type == "next") {
      this.setState({
        isPjpCompleted: true,
      });
    }
  };

  onClickNewEntry = () => {
    this.setState({
      pageNum: 1,
      isNewEntryActive: true,
      isHistoryActive: false,
    });
  };
  onClickHistory = () => {
    this.setState({
      pageNum: 2,
      isNewEntryActive: false,
      isHistoryActive: true,
    });
  };
  // for design tab section
  tabSection = () => {
    return (
      <View style={styles.tabSec}>
        <TouchableOpacity
          style={{ flex: 0.5 }}
          onPress={this.onClickNewEntry}
          activeOpacity={0.9}
        >
          <View style={styles.tabSec}>
            <Text
              style={
                this.state.isNewEntryActive
                  ? styles.activetabText
                  : styles.inactivetabText
              }
            >
              New Entry
            </Text>
          </View>
          <View
            style={
              this.state.isNewEntryActive
                ? styles.activeUnderline
                : styles.inactiveUnderline
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 0.5 }}
          onPress={this.onClickHistory}
          activeOpacity={0.9}
        >
          <View style={styles.tabSec}>
            <Text
              style={
                this.state.isHistoryActive
                  ? styles.activetabText
                  : styles.inactivetabText
              }
            >
              Record
            </Text>
          </View>
          <View
            style={
              this.state.isHistoryActive
                ? styles.activeUnderline
                : styles.inactiveUnderline
            }
          />
        </TouchableOpacity>
      </View>
    );
  };
  // this is main render to this page
  render() {
    return (
      <SafeAreaView style={CustomStyle.container}>
        <View style={styles.mainView}>
          <View style={styles.stockSec}>
            <TouchableOpacity
              style={CustomStyle.backButtonView}
              onPress={() => this._onBack()}
            >
              <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
            </TouchableOpacity>
            <View style={CustomStyle.headerTextView}>
              <Text style={CustomStyle.headerText}>Stock Update</Text>
            </View>
            <View style={CustomStyle.backButtonView} />
          </View>
          {this.tabSection()}
          {this.state.pageNum == 1 ? (
            <StockUpdateEntry
              {...this.props}
              onSaveDataToParent={this.onSaveDataEntryFrom}
              allData={this.state.allData}
            />
          ) : null}
          {this.state.pageNum == 2 ? (
            <StockUpdateRecord
              {...this.props}
              onSaveDataToParent={this.onSaveDataHistoryFrom}
              allData={this.state.allData}
            />
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

export default StockMainDetails;
