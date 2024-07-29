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
  RefreshControl,
  Linking

} from 'react-native';
import { ErrorCode } from '../../../../services/constant';
import { FilterModal, Loader, NoDataFound, TextInputBox } from "../../../../shared";
import { MiddlewareCheck } from "../../../../services/middleware";
import { associatesModifyData, registrationlistModifyData } from "./function";
import { DateConvert, Toaster } from "../../../../services/common-view-function";
import { CustomStyle } from "../../../style";
import _debounce from 'lodash/debounce';

// this is SubDealer List page 
class SubDealerList extends React.Component {
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
      toDate: "",
      isApiCall: true,
      searchText: "",
      selectedContactTypeObj: {},
      filterVisibility: false,

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
    let reqData = {
      "limit": this.state.limit.toString(),
      "offset": (this.state.pageNum * this.state.limit).toString(),
      "searchName": this.state.searchText,
      "contactTypeId": this.state.selectedContactTypeObj.id == undefined || this.state.selectedContactTypeObj.id == null ? "" : this.state.selectedContactTypeObj.id
    }
    let responseData = await MiddlewareCheck("getCustomerAssociates", reqData, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let registrationList = associatesModifyData(responseData.response)
        if (registrationList.registrationList.length == 0) {
          this.state.isApiCall = false;
        }
        this.setState({
          registrationListData: [...this.state.registrationListData, ...registrationList.registrationList],
          totalDataCount: registrationList.totalCount
        })
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
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
      isApiCall: true,
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
      endDate: "",
      selectedContactTypeObj: {},
      searchText: ""
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
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 100,
        }}
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
        if (this.state.isApiCall) {
          this._load();
        } else {
          this.setState({ listLoader: false })
          return null;

        }
      }
    );
  };

  renderStockList = ({ item, key }) => {
    return (
      <View key={key}>
        <View style={{}}>
          {this.ListData(item, key)}
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

  onPhoneNumber = (phoneNo) => {
    Linking.openURL(`tel:${phoneNo}`);
  }
  // this function used for design list data
  ListData = (item, key) => {
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
                <Text style={styles.idText}>{item.contactTypeName}</Text>
              </View>
              <TouchableOpacity style={styles.addVisitsButton} activeOpacity={0.9} onPress={() => this.onPhoneNumber(item.phoneNumber)} >
                <Text style={styles.addVisitBtnTxt}>{item.phoneNumber}</Text>
              </TouchableOpacity>
              {/* <View style={{ marginLeft: '2%' }}>
                <Image source={item.showHide ? ImageName.YELLOW_UP_ARROW : ImageName.YELLOW_DOWN_ARROW} style={styles.dropDownArrow} />
              </View> */}
            </TouchableOpacity>
          </View>
          {/* {item.showHide ?
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
          } */}
        </View>
      </React.Fragment>
    )
  }

  onFilterOpenAndClose = (type) => {
    this.setState({
      filterVisibility: type
    })
  }

  // for filter with api call
  _onFilterWithApi = async (data) => {
    this.setState({
      selectedContactTypeObj: data.selectedContactTypeObj == undefined || data.selectedContactTypeObj == null ? "" : data.selectedContactTypeObj,
    })
    this.onFilterOpenAndClose(false);
    await this._onStatusChange();
    await this._load();
  }

  modalSection = () => {
    return (
      <View>
        {/* filter modal */}
        <FilterModal
          isVisible={this.state.filterVisibility}
          onCloseModal={() => this.onFilterOpenAndClose(false)}
          type={"associateList"}
          onApply={(data) => this._onFilterWithApi(data)}
          resetData={() => this._onReset()}

        />
      </View>
    )
  }

  _onBack = () => {
    this.props.navigation.goBack();
  };

  debouncedFetchData = _debounce(async () => {
    await this.onRefresh(); // Pass the searchText to fetchData
  }, 400);

  searchSec = () => {
    const onSearch = async (val) => {
      this.setState({ searchText: val })
      await this.debouncedFetchData()

    }

    const onPressSearchIcon = () => {
      this.onRefresh()
    }

    return (
      <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <TextInputBox
            placeholder={"Search Associates"}
            // isRightIcon={true}
            fontSize={FontSize.XS}
            rightIcon={ImageName.SEARCH_LOGO}
            rightIconStyle={{ height: 25, width: 25 }}
            rightIconDisabled={this.state.listLoader}
            height={42}
            borderRadius={22}
            value={this.state.searchText}
            onChangeText={(value) => onSearch(value)}
            onPressRightIcon={() => onPressSearchIcon()}
          />
        </View>
      </View>
    )
  }


  // this is main render to this page 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={CustomStyle.assatesContainer}>
          <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
            <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
          </TouchableOpacity>
          <View style={CustomStyle.headerTextView}>
            <Text style={CustomStyle.headerText}>Associates</Text>
          </View>
          {/* <View style={CustomStyle.backButtonView} /> */}
          <View style={{ flex: 0.1 }}>
            <TouchableOpacity
              style={styles.filterBtn}
              activeOpacity={0.8}
              onPress={() => this.onFilterOpenAndClose(true)}
            // disabled={true}
            // disabled={this.state.showHideCheckBox || this.state.orderAllList.length < 1}
            >
              <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
            </TouchableOpacity>
            {/* <View>
                                {this._TooltipAction()}
                            </View> */}
          </View>
        </View>
        {this.searchSec()}
        {this.state.listDataLoader ?
          <View style={styles.loaderContainer}>
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
        <View style={{ marginBottom: 40 }} />
        {this.modalSection()}
      </SafeAreaView >
    )
  };
};



export default SubDealerList;