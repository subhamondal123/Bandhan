import React from "react";
import { Color, Dimension, ImageName } from "../../../../enums";
import styles from "./style";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import {
  stateUserInformation,
  stateCheckForNetwork,
} from "../../../../redux/CustomerAction";
import { ErrorCode } from "../../../../services/constant";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  MiddlewareCheck,
  StoreUserOtherInformations,
} from "../../../../services/middleware";
import { modifyArrForShowing, stocklistModifyData } from "./function";
import {
  DateConvert,
  StorageDataModification,
  Toaster,
} from "../../../../services/common-view-function";
import { NoDataFound } from "../../../../shared";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { CustomStyle } from "../../../style";

// this is stock update record page
class StockUpdateRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownUpdown: false,
      listDataAll: [],
      stockListData: [],
      stockShowingList: [],
      totalDataCount: 0,
      pageNum: 0,
      limit: 10,
      refreshing: true,
      listDataLoader: false,
      listLoader: true,
      filterVisibility: false,
      fromDate: "",
      toDate: "",
      brandItemType: "",

      initialApiCall: false,
    };
  }
  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  };
  // this is initial function which is call first
  componentDidMount() {
    this._load();
    StoreUserOtherInformations("", {}, this.props);
  }
  // this is first function where set state data
  _load = async () => {
    await this.storeInitialData();
    await this._apiCallRes();
  };
  // for store initial data
  storeInitialData = async () => {
    let stockData = await StorageDataModification.stockListData({}, "get");
    if (stockData == null || stockData == undefined) {
      this.setState({ listDataLoader: true });
    } else {
      this.setState({
        stockListData: stockData.stockList,
        totalDataCount: stockData.totalCount,
        listDataLoader: false,
      });
    }
  };
  // for fetching api call
  _apiCallRes = async () => {
    this.setState({ refreshing: false });
    let dataReq = {
      fieldVisitId: "0",
      limit: this.state.limit.toString(),
      offset: (this.state.pageNum * this.state.limit).toString(),
      searchFrom: this.state.fromDate,
      searchTo: this.state.toDate,
      itemType: this.state.brandItemType,
      userId: "0",
    };
    let responseData = await MiddlewareCheck(
      "recordListForBrands",
      dataReq,
      this.props
    );
    if (responseData === false) {
      this._onNetworkError();
    } else {
      if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        if (this.state.pageNum == 0) {
          let stockData = await StorageDataModification.stockListData(
            {},
            "get"
          );
          let stockDataList = stocklistModifyData(responseData.data);
          if (stockData == null || stockData == undefined) {
            this.setState({
              stockListData: stockDataList.stockList,
              totalDataCount: stockDataList.totalCount,
            });
            await StorageDataModification.stockListData(stockDataList, "store");
          } else if (
            JSON.stringify(stockData.stockList) ===
            JSON.stringify(stockDataList.stockList)
          ) {
            this.setState({
              stockListData: stockDataList.stockList,
              totalDataCount: stockDataList.totalCount,
            });
            if (stockData.totalCount !== stockDataList.totalCount) {
              await StorageDataModification.stockListData(
                stockDataList,
                "store"
              );
            }
          } else {
            this.setState({
              stockListData: stockDataList.stockList,
              totalDataCount: stockDataList.totalCount,
            });
            await StorageDataModification.stockListData(stockDataList, "store");
          }
          this.setState({ initialApiCall: true });
        } else {
          let stockList = stocklistModifyData(responseData.data);
          this.state.stockListData = [
            ...this.state.stockListData,
            ...stockList.stockList,
          ];
          this.setState({
            stockListData: this.state.stockListData,
            totalDataCount: stockList.totalCount,
          });
        }
        // await this.modifyDataForShow();
      } else {
        if (this.state.pageNum == 0) {
          await StorageDataModification.stockListData({}, "clear");
          this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            stockListData: [],
            initialApiCall: true,
          });
        }
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
    this.setState({
      listLoader: false,
      listDataLoader: false,
    });
  };

  modifyDataForShow = async () => {
    this.state.stockShowingList = modifyArrForShowing(this.state.stockListData);
    this.setState({
      stockShowingList: this.state.stockShowingList,
    });
  };

  _onStatusChange = async () => {
    this.setState({
      pageNum: 0,
      limit: 10,
      totalDataCount: 0,
      stockListData: [],
      refreshing: true,
      listLoader: true,
      listDataLoader: true,
    });
  };

  onFilterOpenAndClose = () => {
    this.setState({
      filterVisibility: !this.state.filterVisibility,
    });
  };
  _onFilterWithApi = async (data) => {
    this.state.brandItemType = data.selectedItemTypeObj.id
      ? data.selectedItemTypeObj.id.toString()
      : "";
    this.setState({
      fromDate:
        data.fromDateObj.fromDate.length == 0
          ? ""
          : DateConvert.formatYYYYMMDD(data.fromDateObj.rawDate),
      toDate:
        data.toDateObj.toDate.length == 0
          ? ""
          : DateConvert.formatYYYYMMDD(data.toDateObj.rawDate),
      brandItemType: this.state.brandItemType,
    });
    this.onFilterOpenAndClose();
    await this.onRefresh();
  };

  // for reset the data
  _onReset = async () => {
    this.onFilterOpenAndClose();
    await this.clearFilterData();
    await this.onRefresh();
  };

  clearFilterData = async () => {
    this.setState({
      fromDate: "",
      toDate: "",
      brandItemType: "",
    });
  };

  onShowHideData = (item) => {
    let allItems = this.state.stockListData;
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].stockId == item.stockId) {
        allItems[i].showHide = !allItems[i].showHide;
      } else {
        allItems[i].showHide = false;
      }
    }
    this.state.stockListData = allItems;
    this.setState({ stockListData: this.state.stockListData });
  };
  // for render activity loader
  renderLoader = () => {
    return (
      <React.Fragment>
        {this.state.listLoader ? (
          <View style={styles.activityLoader}>
            <ActivityIndicator
              size="large"
              color={Color.COLOR.INDICATOR_COLOR.GRAY}
            />
          </View>
        ) : (
          <View style={{ marginBottom: 200 }} />
        )}
      </React.Fragment>
    );
  };

  onRefresh = async () => {
    await this._onStatusChange();
    await this._apiCallRes();
  };
  // for fetch more data
  fetchMore = async () => {
    if (this.state.initialApiCall) {
      if (this.state.listLoader) {
        return null;
      }
      this.setState(
        (prevState) => {
          return { listLoader: true, pageNum: prevState.pageNum + 1 };
        },
        () => {
          if (this.state.stockListData.length >= this.state.totalDataCount) {
            this.setState({ listLoader: false });
            return null;
          } else {
            this._apiCallRes();
          }
        }
      );
    }
  };
  // for render stock list data
  renderStockList = ({ item, key }) => {
    return (
      <View key={key}>
        <View style={{}}>{this.ListData(item, key)}</View>
      </View>
    );
  };
  // for design stock list data
  stockListAllData = (item, key) => {
    return (
      <View style={styles.stockListSec}>
        {/* {item.productArr.map((subItem, subKey) => ( */}
        <View style={[styles.mainBox, { paddingHorizontal: "5%" }]} key={key}>
          <View style={styles.brandSizeSec}>
            <View style={styles.brandSec}>
              <Image source={ImageName.GRAY_CUP} style={styles.iamgeLogo} />
              <View style={styles.flexColumnSec}>
                <Text style={styles.headerText}>Brand</Text>
                <Text style={styles.recordText}>{item.brand}</Text>
              </View>
            </View>
            <View style={styles.sizeSec}>
              <Image
                source={ImageName.CLIPBOARD_TICK}
                style={styles.iamgeLogo}
              />
              <View style={styles.flexColumnSec}>
                <Text style={styles.headerText}>Size Specs</Text>
                <Text style={styles.recordText}>{item.productName}</Text>
              </View>
            </View>
          </View>
          <View style={styles.qtyUnitSec}>
            <View style={styles.qtySec}>
              <Image source={ImageName.THREE_SQUARE} style={styles.iamgeLogo} />
              <View style={styles.flexColumnSec}>
                <Text style={styles.headerText}>Quantity</Text>
                <Text style={styles.recordText}>{item.qnty}</Text>
              </View>
            </View>
            <View style={styles.unitSec}>
              <Image source={ImageName.THREE_SQUARE} style={styles.iamgeLogo} />
              <View style={styles.flexColumnSec}>
                <Text style={styles.headerText}>Unit</Text>
                <Text style={styles.recordText}>{item.unit}</Text>
              </View>
            </View>
          </View>
          <View style={styles.createRecordSec}>
            <View style={styles.createDateSec}>
              <Image
                source={ImageName.CALENDER_LOGO}
                style={styles.iamgeLogo}
              />
              <View style={styles.flexColumnSec}>
                <Text style={styles.headerText}>Create Date</Text>
                <Text style={styles.recordText}>
                  {DateConvert.viewDateFormat(item.createDate)}
                </Text>
              </View>
            </View>
            <View style={styles.recordSec}>
              <Image
                source={ImageName.GRAY_BRIEFCASE}
                style={styles.iamgeLogo}
              />
              <View style={styles.flexColumnSec}>
                <Text style={styles.headerText}>Record</Text>
                <View>
                  <Text style={styles.recordText}>{item.records}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 8 }} />
        </View>
        {/* ))} */}

        <View style={{ marginBottom: 10 }} />
      </View>
    );
  };
  // for design list data section
  ListData = (item, key) => {
    return (
      <View style={styles.mainBox}>
        <View style={styles.blueBox}>
          <TouchableOpacity
            style={styles.blueViewFlex}
            activeOpacity={1}
            onPress={() => this.onShowHideData(item)}
          >
            <View style={styles.homeCircel}>
              <Image source={ImageName.HOME_LOGO} style={styles.homeLogo} />
            </View>
            <View style={styles.itemCreateDateSec}>
              <Text style={styles.saiEnterprisesText} numberOfLines={1}>
                {DateConvert.viewDateFormat(item.createDate)}
              </Text>
            </View>
            <View style={{ marginLeft: "2%" }}>
              <Image
                source={
                  item.showHide == true
                    ? ImageName.RED_LOGO
                    : ImageName.YELLOW_DOWN_ARROW
                }
                style={styles.dropDownArrow}
              />
            </View>
          </TouchableOpacity>
        </View>
        {item.showHide ? (
          <React.Fragment>{this.stockListAllData(item, key)}</React.Fragment>
        ) : null}
      </View>
    );
  };
  // for design list header section
  listHeaderSection = () => {
    return (
      <View>
        <View style={styles.headerActionArea}>
          <View style={styles.filter_action_btn}>
            <TouchableOpacity
              style={styles.filterBtn}
              activeOpacity={0.8}
              onPress={() => this.onFilterOpenAndClose()}
            >
              <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  // for design skeleton loader
  ViewSkeletonPlaceholder = () => {
    let resData = [];

    for (let i = 0; i < 7; i++) {
      resData.push(
        <View style={[styles.mainBox, { marginVertical: 10 }]} key={i}>
          <View style={styles.blueBox} />
        </View>
      );
    }
    return resData;
  };
  // this is main render to this page
  render() {
    const modalSection = () => {
      return (
        <View>
          {/* filter modal */}
          {/* <FilterModal
                        isVisible={this.state.filterVisibility}
                        onCloseModal={() => this.onFilterOpenAndClose()}
                        type={"stockUpdateList"}
                        onApply={(data) => this._onFilterWithApi(data)}
                        resetData={() => this._onReset()}
                        props={this.props}
                    /> */}
        </View>
      );
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 10 }} />
        {/* {this.listHeaderSection()} */}
        {this.state.listDataLoader ? (
          // <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
          //     <Loader />
          // </View>
          <SkeletonPlaceholder>
            {this.listHeaderSection()}
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {this.ViewSkeletonPlaceholder()}
            </ScrollView>
          </SkeletonPlaceholder>
        ) : (
          <React.Fragment>
            {this.state.stockListData.length > 0 ? (
              <React.Fragment>
                <FlatList
                  data={this.state.stockListData}
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
            ) : (
              <React.Fragment>
                {this.state.initialApiCall ? (
                  <View style={CustomStyle.noDataFoundViewForTabList}>
                    <NoDataFound />
                  </View>
                ) : null}
              </React.Fragment>
            )}
            {/* {modalSection()} */}
          </React.Fragment>
        )}
        <View style={{ marginBottom: 10 }} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { CustomerAction } = state;
  return { CustomerAction };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      stateUserInformation,
      stateCheckForNetwork,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StockUpdateRecord);
