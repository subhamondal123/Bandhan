import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Color, ImageName } from "../../enums";
import { CustomStyle } from "../style";
import styles from "./Style";
import { Rating, AirbnbRating } from "react-native-ratings";
import { BigTextButton, Loader, TextInputBox } from "../../shared";
import { Toaster } from "../../services/common-view-function";
import { MiddlewareCheck } from "../../services/middleware";
import { ErrorCode, LengthValidate } from "../../services/constant";

const starArr = [
  {
    id: 1,
    title: "Company Marketing Supports to you",
    rating: 0,
  },
  {
    id: 2,
    title: "Company FSE Supports to you",
    rating: 0,
  },
  {
    id: 3,
    title: "Product Quality",
    rating: 0,
  },
  {
    id: 4,
    title: "Company Branding Supports to you",
    rating: 0,
  },
  {
    id: 5,
    title: "Company Supports in comparision to competition brand",
    rating: 0,
  },
];
// this is feed back form page
class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starArr: [],
      remark: "",
      remarkActive: false,
      pageLoader: true,
    };
  }
  // this is a initial function which is call first
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      this._onLoad();
    });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  // this is first function where set state data
  _onLoad = () => {
    this.setState({
      starArr: [
        {
          id: 1,
          title: "Company Marketing Supports to you",
          rating: 0,
        },
        {
          id: 2,
          title: "Company FSE Supports to you",
          rating: 0,
        },
        {
          id: 3,
          title: "Product Quality",
          rating: 0,
        },
        {
          id: 4,
          title: "Company Branding Supports to you",
          rating: 0,
        },
        {
          id: 5,
          title: "Company Supports in comparision to competition brand",
          rating: 0,
        },
      ],
    });
    this.setState({ pageLoader: false });
  };
  // this function used for navigate to previous screen
  _onBack = () => {
    this.props.navigation.goBack();
  };

  onRatingChange = (val, item) => {
    let arr = this.state.starArr;
    for (let i = 0; i < arr.length; i++) {
      if (item.id == arr[i].id) {
        arr[i].rating = val;
      }
    }
    this.state.starArr = arr;
    this.setState({
      starArr: this.state.starArr,
    });
  };

  _onChangeRemark = (val) => {
    this.setState({ remark: val });
  };
  // submit function with api call
  onSubmit = async () => {
    let arr = this.state.starArr;
    let errorCount = 0;
    let modArr = [];
    let modObj = {};

    for (let i = 0; i < arr.length; i++) {
      let rate = "";

      if (arr[i].rating == 0) {
        Toaster.ShortCenterToaster("Please enter Rating !");
        errorCount++;
      } else if (this.state.remark == "") {
        Toaster.ShortCenterToaster("Please enter Remarks !");
        errorCount++;
      } else {
        rate = arr[i].rating;
        modArr.push(rate);
      }
    }

    if (errorCount == 0) {
      this.setState({ pageLoader: true });
      modObj = {
        companyMarketingSupport: modArr[0],
        companyFseSupport: modArr[1],
        productQuality: modArr[2],
        companyBrandingSupport: modArr[3],
        competitionBrand: modArr[4],
      };
      let reqData = {
        companyMarketingSupport: modObj.companyMarketingSupport.toString(),
        companyFseSupport: modObj.companyFseSupport.toString(),
        productQuality: modObj.productQuality.toString(),
        companyBrandingSupport: modObj.companyBrandingSupport.toString(),
        competitionBrand: modObj.competitionBrand.toString(),
        remark: this.state.remark,
        fieldVisitId: "0",
        userId: "0",
      };
      let responseData = await MiddlewareCheck(
        "serviceFeedback",
        reqData,
        this.props
      );
      if (responseData == false) {
        this._onNetworkError();
      } else {
        if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
          Toaster.ShortCenterToaster(responseData.data.message);
          this.props.route.params.onRatingSuccess();
          this.props.navigation.goBack();
        } else {
          Toaster.ShortCenterToaster(responseData.message);
        }
      }

      this.setState({ pageLoader: false });
    }
  };
  // this is main render to this page
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={CustomStyle.container}>
          {this.state.pageLoader ? (
            <>
              <Loader />
            </>
          ) : (
            <View style={styles.mainView}>
              <View style={styles.feedbackSec}>
                <TouchableOpacity
                  style={CustomStyle.backButtonView}
                  activeOpacity={0.9}
                  onPress={() => this._onBack()}
                >
                  <Image
                    source={ImageName.BACK_IMG}
                    style={CustomStyle.backImg}
                  />
                </TouchableOpacity>
                <View style={CustomStyle.headerTextView}>
                  <Text style={CustomStyle.headerText}>Feedback</Text>
                </View>
                <View style={CustomStyle.backButtonView} />
              </View>

              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <>
                  {this.state.starArr.map((item, key) => (
                    <View key={key}>
                      <View style={styles.mainSection}>
                        <View style={styles.headerSection}>
                          <Text style={styles.headerTxt}>{item.title}</Text>
                        </View>
                        <View style={styles.ratingSection}>
                          <AirbnbRating
                            showRating={false}
                            count={5}
                            defaultRating={item.rating}
                            size={38}
                            selectedColor={"#e53a63"}
                            onFinishRating={(val) =>
                              this.onRatingChange(val, item)
                            }
                            starContainerStyle={{
                              width: "80%",
                              justifyContent: "space-between",
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  ))}

                  <View style={{ marginTop: 20 }}>
                    <TextInputBox
                      placeholder={"Remarks*"}
                      value={this.state.remark}
                      onChangeText={(value) => this._onChangeRemark(value)}
                      keyboardType="default"
                      isActive={this.state.remarkActive}
                      onFocus={() => {
                        this.setState({ remarkActive: true });
                      }}
                      onBlur={() => {
                        this.setState({ remarkActive: false });
                      }}
                      returnKeyType="done"
                      height={90}
                      multiline={true}
                      maxLength={LengthValidate.VALIDATIONS.REMARK_MAX}
                      alignItems={"flex-start"}
                    />
                  </View>

                  <View style={styles.submitBtnSec}>
                    <BigTextButton
                      onPress={() => this.onSubmit()}
                      text={"Submit"}
                    />
                  </View>
                  <View style={{ height: 200 }}></View>
                </>
              </ScrollView>
            </View>
          )}
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

export default FeedbackForm;
