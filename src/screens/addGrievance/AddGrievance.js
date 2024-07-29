import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ImageName } from "../../enums";
import { FloatingButton } from "../../shared";
import { CustomStyle } from "../style";
import styles from "./Style";
import { GrievenceHistoryList, GrievenceNewEntry } from "./sub-component";
import NetInfo from "@react-native-community/netinfo";
import { Toaster } from "../../services/common-view-function";

// this is Grievence Page
class GrievencePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      allData: {},
      isNewEntryActive: true,
      isHistoryActive: false,
      networkType: "",
    };
  }
  // this is a initial function which is call first
  componentDidMount() {
    this._load();
  }
  // this is the first function where set the state data
  _load = async () => { };
  //this function used for back to the previous page
  _onBack = () => {
    this.props.navigation.goBack();
  };

  onSaveDataEntryFrom = (childData) => {
    this.setState({
      pageNum: 2,
      isNewEntryActive: false,
      isHistoryActive: true
    })
    // if (childData.pageNum == 2) {
    //   this.onClickHistory();
    // }
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

  tabSection = () => {
    return (
      <View style={{ flexDirection: "row", marginTop: 10 }}>
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
        <View style={{ marginLeft: "5%", marginRight: "5%", marginTop: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={CustomStyle.backButtonView}
              onPress={() => this._onBack()}
            >
              <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
            </TouchableOpacity>
            <View style={CustomStyle.headerTextView}>
              <Text style={CustomStyle.headerText}>Grievance</Text>
            </View>
            <View style={CustomStyle.backButtonView} />
          </View>
          {this.tabSection()}
          {this.state.pageNum == 1 ? (
            <GrievenceNewEntry
              {...this.props}
              onSaveDataToParent={this.onSaveDataEntryFrom}
              allData={this.state.allData}
            />
          ) : null}
          {this.state.pageNum == 2 ? (
            <GrievenceHistoryList
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

export default GrievencePage;
