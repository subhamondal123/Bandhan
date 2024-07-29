import React from "react";
import { Color, Dimension, FontFamily, FontSize, ImageName, Padding, ScreenText } from '../../../../enums';
import styles from './style';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl

} from 'react-native';
import { ErrorCode } from '../../../../services/constant';
import { Loader, NoDataFound } from "../../../../shared";
import { MiddlewareCheck } from "../../../../services/middleware";
import { registrationlistModifyData } from "./function";
import { DateConvert, Toaster } from "../../../../services/common-view-function";
import DatePicker from "react-native-date-picker";
//this is Mason List page 
class MasonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      registrationListData: [],
      totalDataCount: 0,
      pageNum: 0,
      limit: 5,
      refreshing: true,
      listDataLoader: true,
      listLoader: true,

      startDate: "",
      startDateCheck: false,
      statDateRaw: new Date(),

      endDate: "",
      endDateCheck: false,
      endDateRaw: new Date(),
      fromDate: "",
      toDate: ""




    }
  }
  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  }
  // this is a initial function which is call first
  componentDidMount() {
    this._load();
  }
  // this is the first function where set the state data
  _load = async () => {
    this.setState({ refreshing: false, });
    // let dataReq = {
    //   "limit": this.state.limit.toString(),
    //   "offset": (this.state.pageNum * this.state.limit).toString(),
    //   "searchTextCustName": "",
    //   "searchTextCustType": "",
    //   "searchTextCustPhone": "",
    //   "searchTextCustBusinessName": "",
    //   "searchCustPartyCode": "",
    //   "searchCustVisitDate": "",

    //   "searchFrom": this.state.startDate,
    //   "searchTo": this.state.endDate,

    // }
    // let responseData = await MiddlewareCheck("registrationList", dataReq, this.props);
    // if (responseData === false) {
    //   this._onNetworkError()
    // } else {
    //   if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
    //     let registrationList = registrationlistModifyData(responseData.response)
    //     this.setState({
    //       registrationListData: [...this.state.registrationListData, ...registrationList.registrationList],
    //       totalDataCount: registrationList.totalCount
    //     })
    //   } else {
    //     Toaster.ShortCenterToaster(responseData.message)
    //   }
    // }
    this.setState({
      listLoader: false,
      listDataLoader: false
    })

  }

  // change the state for refresh
  _onStatusChange = async () => {
    this.setState({
      pageNum: 0,
      limit: 5,
      totalDataCount: 0,
      registrationListData: [],
      refreshing: true,
      listLoader: true,
      listDataLoader: true,
    })
  }

  _onSearch = async () => {
    await this._onStatusChange();
    await this._load();
  }

  _onReset = async () => {
    await this._onStatusChange();
    await this._load();
    await this._onClearData()

  }

  _onClearData = () => {
    this.setState({
      startDate: "",
      endDate: ""
    })
  }

  onShowHideData = (item) => {

    let allItems = this.state.registrationListData;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].recordId == item.recordId) {
        allItems[i].showHide = !(allItems[i].showHide)
      } else {
        allItems[i].showHide = false
      }
    }
    this.state.registrationListData = allItems;
    this.setState({ registrationListData: this.state.registrationListData })
  }
  // this function used for render item loader 
  renderLoader = () => {
    return this.state.listLoader ? (
      <View
        style={styles.itemLoader}
      >
        <ActivityIndicator
          size="large"
          color={Color.COLOR.INDICATOR_COLOR.GRAY}
        />
      </View>
    ) : (
      <View style={{ marginBottom: 200 }} />
    );
  };

  onRefresh = async () => {
    this.setState({
      // refreshing: true,
      // listLoader: true,
      // listDataLoader:true,
      registrationListData: [],
    })
    await this._onStatusChange();
    await this._load();
  }
  // this function used for fetch more data
  fetchMore = async () => {
    if (this.state.listLoader) {
      return null;
    }
    this.setState(
      (prevState) => {
        return { listLoader: true, pageNum: prevState.pageNum + 1 };
      },
      () => {
        if (this.state.registrationListData.length >= this.state.totalDataCount) {
          this.setState({ listLoader: false })
          return null;
        } else {
          this._load();
        }
      }
    );
  };

  renderStockList = ({ item, key }) => {
    return (
      <View key={key}>
        <View style={{}}>
          {/* {this.ListData(item, key)} */}
        </View>
      </View>
    );
  };

  _onOpenStartDate = () => {
    this.setState({
      startDateCheck: !this.state.startDateCheck
    })
  }

  _onStartDateSelect = (selectedDate) => {
    let statDateRaw = this.state.statDateRaw,
      startDate = "";
    if (selectedDate) {
      startDate = DateConvert.formatYYYYMMDD(selectedDate);
      statDateRaw = selectedDate;
    }
    this.setState({
      startDate: startDate,
      statDateRaw: statDateRaw
    })
    this._onOpenStartDate();
  }

  _onOpenEndDate = () => {
    this.setState({
      endDateCheck: !this.state.endDateCheck
    })
  }

  _onEndDateSelect = (selectedDate) => {
    let endDateRaw = this.state.endDateRaw,
      endDate = "";
    if (selectedDate) {
      endDate = DateConvert.formatYYYYMMDD(selectedDate);
      endDateRaw = selectedDate;
    }
    this.setState({
      endDate: endDate,
      endDateRaw: endDateRaw
    })
    this._onOpenEndDate();
  }
  // this function used for design list data
  ListData = (item, key) => {

    let statusText = ""
    if (item.approvedStatus == 1) {
      statusText = "CRM Verified"
    } else {
      statusText = "Not Verified"
    }
    return (

      <React.Fragment>
        <View style={styles.mainBox}>
          <View style={styles.blueBox}>
            <TouchableOpacity style={styles.blueViewFlex}
              activeOpacity={1}
              onPress={() => this.onShowHideData(item)}>
              <View style={styles.homeCircel}>
                <Image source={ImageName.HOME_LOGO} style={styles.homeLogo} />
              </View>
              <View style={{ marginLeft: '5%', flex: 1 }}>
                <Text style={styles.saiEnterprisesText}>{item.customerName}</Text>
                <Text style={styles.idText}>ID:{item.recordId}</Text>
              </View>
              <TouchableOpacity style={styles.addVisitsButton} activeOpacity={0.9} >
                <Text style={styles.addVisitBtnTxt}>{statusText}</Text>
              </TouchableOpacity>
              <View style={{ marginLeft: '2%' }}>
                <Image source={item.showHide ? ImageName.YELLOW_UP_ARROW : ImageName.YELLOW_DOWN_ARROW} style={styles.dropDownArrow} />
              </View>
            </TouchableOpacity>
          </View>
          {item.showHide ?
            <React.Fragment>
              <View style={{ marginHorizontal: '2%', marginTop: 5 }}>
                <View style={{ flexDirection: 'row', marginTop: 15, }}>
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>District</Text>
                    <Text style={styles.textVisites}>{item.cityName.length ? item.cityName : "N/A"}</Text>
                  </View>
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Zone</Text>
                    <Text style={styles.textVisites}>{item.zoneName}</Text>
                  </View>
                </View>
                <View style={{ borderWidth: 0.3, borderColor: "#999", marginTop: 14 }} />
                <View style={{ flexDirection: 'row', marginTop: 15, }}>
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Customar Type</Text>
                    <Text style={styles.textVisites}>{item.contactTypeName}</Text>
                  </View>
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Date</Text>
                    <Text style={styles.textVisites}>{(item.visitDate) ? DateConvert.viewDateFormat(item.visitDate) : "N/A"}</Text>
                  </View>
                </View>
                <View style={{ borderWidth: 0.3, borderColor: "#999", marginTop: 14 }} />
                <View style={{ flexDirection: 'row', marginTop: 15, }}>
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Pin Code</Text>
                    <Text style={styles.textVisites}>{item.pincode.length ? item.pincode : "N/A"}</Text>
                  </View>
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Phone No</Text>
                    <Text style={styles.textVisites}>{item.phoneNumber.length ? item.phoneNumber : "N/A"}</Text>
                  </View>
                </View>
                <View style={{ borderWidth: 0.3, borderColor: "#999", marginTop: 14 }} />
                <View style={{ flexDirection: 'row', marginTop: 15, }}>
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Customar Business Name</Text>
                    <Text style={styles.textVisites}>{item.custBusinessName.length ? item.custBusinessName : "N/A"}</Text>
                  </View>
                  <View style={styles.flexColumnSec}>
                    <Text style={styles.headerText}>Party Code</Text>
                    <Text style={styles.textVisites}>{item.partyCode.length ? item.partyCode : "N/A"}</Text>
                  </View>
                </View>
                <View style={{ marginBottom: 15 }} />
              </View>

            </React.Fragment>
            :
            null
          }
        </View>
      </React.Fragment>
    )
  }
  // this is main render to this page 
  render() {
    return (
      <SafeAreaView style={styles.container}>

        {this.state.listDataLoader ?
          <View style={{ height: Dimension.height / 1.5, justifyContent: 'center', alignItems: 'center' }}>
            <Loader />
          </View> :
          <React.Fragment>
            {this.state.registrationListData.length > 0 ?
              <React.Fragment>
                <FlatList
                  data={this.state.registrationListData}
                  renderItem={(item, key) => this.renderStockList(item, key)}
                  keyExtractor={(item, key) => key}
                  onEndReached={this.fetchMore}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={this.renderLoader}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.onRefresh()}
                    />
                  }
                />
              </React.Fragment>
              :
              <React.Fragment>
                <View style={{ flex: 1, marginTop: 20 }}>
                  <NoDataFound />
                </View>
              </React.Fragment>
            }
          </React.Fragment>
        }
        <View style={{ marginBottom: 130 }} />

      </SafeAreaView >
    )
  };
};



export default MasonList;