import React from "react";
import styles from "./Style";
import CustomStyle from "../style";
import {
  AlertMessage,
  Color,
  FontFamily,
  ImageName,
  Dimension,
} from "../../enums";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Toaster } from "../../services/common-view-function";
import LinearGradient from "react-native-linear-gradient";
import { MiddlewareCheck } from "../../services/middleware";
import { ErrorCode } from "../../services/constant";
import {
  apiErrorResponseValidator,
  apiSuccessResponseValidator,
} from "../../services/Validators/apiResponseController";
import { BigTextButton, Loader } from "../../shared";
import { DataValidator } from "../../validators";
// this is otp verify password page
class OtpVerifyChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      pageLoader: false,
      propData: {},
    };
  }
  // this is initial function which is call first
  componentDidMount = () => {
    this._load();
  };
  // this is first function where set state data
  _load = () => {
    if (
      this.props.route.params !== undefined ||
      this.props.route.params !== null
    ) {
      this.setState({
        propData: this.props.route.params.propData,
      });
    }
  };

  _onOtpInput = (input) => {
    let newText = "";
    newText = DataValidator.inputEntryValidate(input, "number");
    this.setState({
      otp: newText,
    });
  };
  // for navigate to back screen
  _onBack = () => {
    this.props.navigation.goBack();
  };
  // for verify otp with api call
  _onOtpVerify = async () => {
    if (this.state.otp.length == 4) {
      let reqData = {
        otp: this.state.otp,
        userId: this.state.propData.userId,
        requestId: this.state.propData.requestId,
      };
      this.setState({ pageLoader: true });
      let responseData = await MiddlewareCheck("otpverification", reqData);
      if (
        responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR &&
        ErrorCode.ERROR.ERROR_CODE.SUCCESS
      ) {
        apiSuccessResponseValidator(responseData);
        this.props.navigation.replace("CreateNewPassword", {
          propData: this.state.propData,
        });
      } else {
        apiErrorResponseValidator(responseData);
      }
      this.setState({ pageLoader: false });
    } else {
      Toaster.ShortCenterToaster(AlertMessage.MESSAGE.OTP.EMPTY_OTP);
    }
  };
  // for resend otp
  _onResend = async () => {
    this.setState({ pageLoader: true });
    let responseData = await MiddlewareCheck("forgetpassword", {
      email: this.state.propData.userCredential,
    });
    if (
      responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR &&
      ErrorCode.ERROR.ERROR_CODE.SUCCESS
    ) {
      apiSuccessResponseValidator(responseData);
    } else {
      apiErrorResponseValidator(responseData);
    }
    this.setState({ pageLoader: false });
  };
  // this is main render to this page
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.pageLoader ? (
          <Loader />
        ) : (
          <React.Fragment>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.backSec}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => this._onBack()}
                >
                  <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
              </View>

              <View style={styles.contentSec}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 40,
                  }}
                >
                  <View style={styles.boxSec}>
                    <Image
                      source={{ uri: ImageName.CUSTOMER_SEARCH_WITH_BG }}
                      style={styles.boxImg}
                    />
                  </View>
                </View>
                <View style={{ marginTop: 43 }}>
                  <Text style={styles.mailText}>Verification{"\n"}Code</Text>
                </View>
                <View style={{ marginTop: 13 }}>
                  <Text style={styles.belowMailText}>
                    Enter the 4 digits code that you received on your email.
                  </Text>
                </View>
              </View>

              <View style={styles.otpmainView}>
                <OTPInputView
                  style={{ width: "60%", height: 45 }}
                  pinCount={4}
                  code={this.state.otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  onCodeChanged={(code) => this._onOtpInput(code)}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.otpView}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={(code) => {
                    console.log(`Code is ${code}, you are good to go!`);
                  }}
                  placeholderTextColor={Color.COLOR.GRAY.PHILIPPINE_SILVER}
                  placeholderCharacter={"0"}
                />
              </View>

              <View style={{ marginTop: 17, marginHorizontal: "10%" }}>
                <Text
                  style={styles.resendText}
                  onPress={() => this._onResend()}
                >
                  Resend OTP{" "}
                </Text>
              </View>

              <View style={styles.buttonSec}>
                <View style={styles.buttonSection}>
                  <BigTextButton
                    borderRadius={16}
                    backgroundColor={"#3b1f77"}
                    text={"Verify"}
                    onPress={() => this._onOtpVerify()}
                  />
                  {/* <TouchableOpacity
                    style={styles.buttonView}
                    activeOpacity={0.9}
                    onPress={() => this._onOtpVerify()}
                  >
                    <View style={styles.linearGradient}>
                      <Text style={styles.buttonText}>Verify</Text>
                    </View>
                  </TouchableOpacity> */}
                </View>
              </View>

              <View style={{ height: 60 }} />
            </ScrollView>
          </React.Fragment>
        )}
      </SafeAreaView>
    );
  }
}
export default OtpVerifyChangePassword;
