import { Image, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import Header from '../header/Header';
import styles from './Style';
import { Color, FontFamily, ImageName } from '../../enums';
import Swiper from 'react-native-swiper';
import { MiddlewareCheck, StoreUserOtherInformations } from '../../services/middleware';
import { ErrorCode } from '../../services/constant';
import { dashBoardModifyData, modifyAllData, sortArrayByNameAscending } from './Function';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { CommonFunctions, Permissions, StorageDataModification, Toaster } from '../../services/common-view-function';
import { CryptoDecoder } from '../../services/auth';

import {
  stateCheckForNetwork, loginData
} from '../../redux/CustomerAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let buttonSecData = [
  [
    {
      id: 1,
      buttonBackgroundColor: "",
      headText: "Stock Update",
      image: ImageName.BOX_FILL,
      type: "stockUpdate"

    },
    {
      id: 2,
      buttonBackgroundColor: "",
      headText: "Grievance",
      image: ImageName.GRIVENANCE_LOGO,
      type: "grievance",


    }
  ],
  [
    {
      id: 1,
      buttonBackgroundColor: "",
      headText: "Branding",
      image: ImageName.FRAME_LOGO,
      type: "branding"

    },
    {
      id: 2,
      buttonBackgroundColor: "",
      headText: "Scheme",
      image: ImageName.SCHEME_LOGO,
      type: "scheme"

    }
  ],
  [
    {
      id: 1,
      buttonBackgroundColor: "",
      headText: "Loyalty",
      image: ImageName.LUCIDE_COINS,
      type: "loyalty"

    },
    {
      id: 2,
      buttonBackgroundColor: "",
      headText: "Associates",
      image: ImageName.ASSOCIATES_LOGO,
      type: "associates"

    }
  ],
  [
    {
      id: 1,
      buttonBackgroundColor: "red",
      headText: "TCS Ion",
      image: ImageName.TCSION_ICON,
      type: "tcsIon"

    },

  ],

]
// this is dashboard page 
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoader: true,
      swaiperData: [],
      dashMainData: {},
      dashBoardButton: buttonSecData,

      initialApiCall: false,
      userDetails: {},
      creditData: [],
      creditLoader: false
    }
  }

  // set the initial data
  _onSetInitialStateData = async () => {
    this.setState({
      pageLoader: true
    })
  }
  // this is initial function which is call first 
  componentDidMount = async () => {
    // this._unsubscribe = this.props.navigation.addListener(
    //   'focus', async () => {
    await this._onSetInitialStateData();
    // this.activeCustomer();
    await this._load();
    await this.getCreditCycleData()
    StoreUserOtherInformations("", {}, this.props);
    // })

  }

  // componentWillUnmount() {
  //   this.setState = (state, callback) => {
  //     return;
  //   };

  // }

  storeInitialData = async () => {
    let dashBoardData = await StorageDataModification.dashBoardData({}, "get");
    if (dashBoardData == undefined || dashBoardData == null) {
      this.setState({ pageLoader: true })
    } else {
      this.setState({
        dashMainData: dashBoardData
      })
    }
  }
  // this is firt function where set state data
  _load = async () => {
    await Permissions.GetAllPermissionsForAccess("all");

    this.setState({
      userDetails: await StorageDataModification.userCredential({}, "get")
    })
    // await this.storeInitialData();
    await this.fetchApiCall();

  }


  // this function used for fetching api data 
  fetchApiCall = async () => {
    this.setState({
      pageLoader: true
    });

    let responseData = await MiddlewareCheck("getCustomerDetails", {}, this.props);
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let dashData = dashBoardModifyData(responseData.response);

        let partyOutstandingData = sortArrayByNameAscending(dashData.partyOutStanding)
        console.log("partyOutstandingData===", partyOutstandingData)
        this.state.swaiperData = partyOutstandingData

        this.setState({
          dashMainData: dashData
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message)

      }
    }
    this.setState({
      pageLoader: false
    })
  }

  getCreditCycleData = async () => {
    this.setState({ creditLoader: true })
    let responseData = await MiddlewareCheck("getPartyCreditCycles", {}, this.props);
    console.log("---", responseData)
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let modData = modifyAllData(responseData.response)
        this.setState({
          creditData: modData
        })
      } else {
        Toaster.ShortCenterToaster(responseData.message)
      }
    }
    this.setState({ creditLoader: false })
  }

  _onButtonPress = (item1, key1) => {
    switch (item1.type) {
      case "stockUpdate":
        this.props.navigation.navigate("StockMainDetails",);
        break;
      case "grievance":
        this.props.navigation.navigate("GrievencePage");
        break;
      case "branding":
        this.props.navigation.navigate("BrandingList");
        break;
      case "scheme":
        // this.props.navigation.navigate("Scheme");
        break;
      case "loyalty":
        // this.props.navigation.navigate("Loyalty");
        break;
      case "associates":
        this.props.navigation.navigate("Associates");
        break;
      case "tcsIon":
        Linking.openURL("https://www.tcsion.com/dotcom/TCSSMB/Login/login.html")
        // this.props.navigation.navigate("Associates");
        break;
    }

  }
  // this function used for design button box 
  buttonBox = (item1, key1) => {
    let count = "";
    let backgroundColor = "";
    switch (item1.type) {
      case "stockUpdate":
        count = this.state.dashMainData.stockUpdate == undefined && this.state.dashMainData.stockUpdate == null && this.state.dashMainData.stockUpdate == "0" ? "0" : this.state.dashMainData.stockUpdate;
        backgroundColor = "#95ACE8"
        break;
      case "grievance":
        count = this.state.dashMainData.grivance == undefined && this.state.dashMainData.grivance == null && this.state.dashMainData.grivance == "0" ? "0" : this.state.dashMainData.grivance;
        backgroundColor = "#ec8ef1"
        break;
      case "branding":
        count = this.state.dashMainData.branding == undefined && this.state.dashMainData.branding == null && this.state.dashMainData.branding == "0" ? "0" : this.state.dashMainData.branding;
        backgroundColor = "#FFBC97"
        break;
      case "scheme":
        count = this.state.dashMainData.scheme == undefined && this.state.dashMainData.scheme == null && this.state.dashMainData.scheme == "0" ? "0" : this.state.dashMainData.scheme;
        backgroundColor = "#F76770"
        break;
      case "loyalty":
        count = this.state.dashMainData.subLoyalty == undefined && this.state.dashMainData.subLoyalty == null && this.state.dashMainData.subLoyalty == "0" ? "0" : this.state.dashMainData.subLoyalty;
        backgroundColor = "#f88a87"
        break;
      case "associates":
        count = this.state.dashMainData.associates == undefined && this.state.dashMainData.associates == null && this.state.dashMainData.associates == "0" ? "0" : this.state.dashMainData.associates;
        backgroundColor = "#6e7ef7"
        break;
    }
    return (
      <View style={styles.flexButton}>
        <TouchableOpacity style={[styles.stockUpdateButton, { backgroundColor: item1.type == "tcsIon" ? Color.COLOR.BLUE.DE_5902 : backgroundColor, marginRight: item1.type == "tcsIon" ? 12 : 0 }]} activeOpacity={0.9}
          onPress={() => this._onButtonPress(item1, key1)}>
          <View style={styles.boxCircle}>
            <Image source={item1.image} style={styles.boxImg} />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.boxValueText}>{count}</Text>
          </View>
          <View>
            <Text style={styles.boxText}>{item1.headText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  // this function used for design sleleton loader 
  ViewSkeletonPlaceholder = () => {
    return (
      <>
        <View style={styles.dashBoardMainBox} >
          <View style={styles.headerDataBox} />
          <View style={styles.slideDataBox} />
          <View style={{ marginTop: 40, flexDirection: 'row' }} >
            <View style={styles.flexButton}>
              <View style={styles.stockUpdateButton} />
            </View>
            <View style={styles.flexButton}>
              <View style={styles.stockUpdateButton} />
            </View>
          </View>
          <View style={{ marginTop: 40, flexDirection: 'row' }} >
            <View style={styles.flexButton}>
              <View style={styles.stockUpdateButton} />
            </View>
            <View style={styles.flexButton}>
              <View style={styles.stockUpdateButton} />
            </View>
          </View>
          <View style={{ marginTop: 40, flexDirection: 'row' }} >
            <View style={styles.flexButton}>
              <View style={styles.stockUpdateButton} />
            </View>
            <View style={styles.flexButton}>
              <View style={styles.stockUpdateButton} />
            </View>
          </View>
        </View>

      </>

    )
  }

  creditLimit = () => {
    return (
      <View style={{ backgroundColor: Color.COLOR.WHITE.WHITE_SMOKE, borderRadius: 15 }}>
        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
          <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 16, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, textDecorationLine: "underline" }}>Credit Cycle</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <ScrollView horizontal>
            {this.state.creditData.map((item, key) => (
              <View key={key} style={{ borderWidth: 1, borderColor: Color.COLOR.GRAY.GRAY_TINTS, padding: 10, marginHorizontal: 5, borderRadius: 10 }}>
                <View style={{}}>
                  <Text style={[styles.bottomDaysTxt, { fontSize: 14, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }]}>{item.accountNo}</Text>
                </View>
                <View style={{ flexDirection: "row", borderTopWidth: 0.5, borderTopColor: Color.COLOR.BLUE.LOTUS_BLUE }}>
                  <View style={{ flex: 0.25, paddingHorizontal: 5, borderRightWidth: 0.5, borderColor: Color.COLOR.BLUE.LOTUS_BLUE, }}>
                    <View style={{ borderBottomColor: Color.COLOR.BLUE.LOTUS_BLUE, borderBottomWidth: 0.5, paddingVertical: 5 }}>
                      <Text style={styles.bottomDaysTxt}>0-30 days</Text>
                    </View>
                    <View style={{ paddingVertical: 7 }}>
                      <Text style={styles.bottomDaysTxt}>{item.partyCreditCycle.outStanding_0to30}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 0.25, paddingHorizontal: 5, borderRightWidth: 0.5, borderColor: Color.COLOR.BLUE.LOTUS_BLUE, }}>
                    <View style={{ borderBottomColor: Color.COLOR.BLUE.LOTUS_BLUE, borderBottomWidth: 0.5, paddingVertical: 5 }}>
                      <Text style={styles.bottomDaysTxt}>31-60 days</Text>
                    </View>
                    <View style={{ paddingVertical: 7 }}>
                      <Text style={styles.bottomDaysTxt}>{item.partyCreditCycle.outStanding_31to60}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 0.25, paddingHorizontal: 5, borderRightWidth: 0.5, borderColor: Color.COLOR.BLUE.LOTUS_BLUE, }}>
                    <View style={{ borderBottomColor: Color.COLOR.BLUE.LOTUS_BLUE, borderBottomWidth: 0.5, paddingVertical: 5 }}>
                      <Text style={styles.bottomDaysTxt}>61-90 days</Text>
                    </View>
                    <View style={{ paddingVertical: 7 }}>
                      <Text style={styles.bottomDaysTxt}>{item.partyCreditCycle.outStanding_61to90}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 0.25, paddingHorizontal: 5 }}>
                    <View style={{ borderBottomColor: Color.COLOR.BLUE.LOTUS_BLUE, borderBottomWidth: 0.5, paddingVertical: 5 }}>
                      <Text style={styles.bottomDaysTxt}>{">90 days"}</Text>
                    </View>
                    <View style={{ paddingVertical: 7 }}>
                      <Text style={styles.bottomDaysTxt}>{item.partyCreditCycle.outStanding_91s}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }


  // this is main render to this page 
  render() {
    const graphViewStyle = { height: 250, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' };
    return (
      <SafeAreaView style={styles.container}>
        <Header {...this.props} />
        {this.state.pageLoader ?
          <SkeletonPlaceholder>
            {this.ViewSkeletonPlaceholder()}
          </SkeletonPlaceholder> :
          <>

            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <View style={styles.dashBoardMainBox}>
                <Text style={styles.shopNameText}>Shop Name :<Text style={styles.shopValueName}>  {this.state.userDetails.custBusinessName == "" || this.state.userDetails.custBusinessName == null ? this.state.userDetails.customerName : this.state.userDetails.custBusinessName}</Text></Text>

                <View style={styles.headerDataBox} >
                  <View style={{ marginHorizontal: '5%' }}>
                    <View style={{ flexDirection: 'row', marginTop: 15, }}>
                      <View style={styles.pcTxt}>
                        <Text style={styles.textPartyCode}>Party code</Text>
                        <Text style={styles.valueText}>{this.state.dashMainData.partyCode}</Text>
                      </View>
                      <View style={styles.sideBox}></View>
                      <View style={styles.loyalTxt}>
                        <Text style={styles.textPartyCode}>Loyalty</Text>
                        <Text style={styles.valueText}>{this.state.dashMainData.loyalty}</Text>
                      </View>
                    </View>
                    <View style={{ borderBottomColor: "#5ddab3", borderBottomWidth: 1, marginTop: 10 }} />
                    <View style={{ flexDirection: 'row', marginTop: 15, }}>
                      <View style={styles.tsTxt}>
                        <Text style={styles.textPartyCode}>Target Sale</Text>
                        <Text style={styles.valueText}>{this.state.dashMainData.targetSale}</Text>
                      </View>
                      <View style={styles.sideBox}></View>
                      <View style={styles.asTxt}>
                        <Text style={styles.textPartyCode}>Achieve Sale</Text>
                        <Text style={styles.valueText}>{this.state.dashMainData.achieveSale}</Text>
                      </View>
                    </View>
                  </View>
                  {this.state.swaiperData.length > 0 ?
                    <Text style={styles.partyAccountText}>Party Out Standing</Text>
                    : null}
                </View>
                {this.state.swaiperData.length > 0 ?
                  <>
                    <Swiper style={graphViewStyle}
                      automaticallyAdjustContentInsets={true}>
                      {/* {this.state.swaiperData.length > 0 ?
                    <React.Fragment> */}
                      {this.state.swaiperData.map((item, key) => (
                        <React.Fragment key={key}>
                          <View style={styles.slideDataBox}>
                            <View style={{ marginHorizontal: '5%' }}>
                              <View style={{ flexDirection: 'row', marginTop: 15, }}>
                                <View style={styles.pcodeTxt}>
                                  <Text style={styles.swaiperText}>Party code</Text>
                                  <Text style={styles.valueText}>{item.partyCode}</Text>
                                </View>
                                <View style={styles.lineBox} />
                                <View style={styles.pacTxt}>
                                  <Text style={styles.partyAccountCode}>Party Account Code</Text>
                                  <Text style={styles.valueText}>{item.accountNo}</Text>
                                </View>
                              </View>
                              <View style={{ borderBottomColor: "#808DAF", borderBottomWidth: 1, marginTop: 10 }} />
                              <View style={styles.tocTxt} >
                                <Text style={styles.totalStanding}>Total Out Standing</Text>
                                <Text style={styles.shadowText}>{item.totalOutstanding}</Text>
                              </View>
                            </View>
                          </View>
                        </React.Fragment>
                      ))}
                      {/* </React.Fragment>
                     :
                    <React.Fragment>
                      <View style={{ marginTop: 100, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.partyAccountText}>No Data Found !</Text>
                      </View>
                    </React.Fragment>} */}

                    </Swiper>
                  </> : null}
                {/* :
                  <View style={{ backgroundColor: "red", justifyContent: "red", alignItems: "center" }}>
                    <Text style={styles.partyAccountText}>Party Out Standing</Text>
                  </View>
                } */}
                {this.state.creditLoader ? null : this.state.creditData.length > 0 ? this.creditLimit() : null}

                {this.state.dashBoardButton.map((item, key) => (
                  <React.Fragment key={key}>
                    <View style={styles.buttonmainBox}>
                      {item.map((item1, key1) => (
                        <React.Fragment key={key1}>
                          {this.buttonBox(item1, key1)}
                        </React.Fragment>
                      ))}
                    </View>
                  </React.Fragment>
                ))}
              </View>
              <View style={{ marginBottom: 20 }} />
            </ScrollView>
          </>
        }
      </SafeAreaView >
    )
  }
}

const mapStateToProps = (state) => {
  const { CustomerRedux } = state
  return { CustomerRedux }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    stateCheckForNetwork,
    loginData
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
