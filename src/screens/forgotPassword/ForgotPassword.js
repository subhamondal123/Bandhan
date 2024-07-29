import { CommonActions } from "@react-navigation/native";
import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ImageName } from "../../enums";
import { stateCheckForNetwork } from "../../redux/CustomerAction";
import { ErrorCode } from "../../services/constant";
import { MiddlewareCheck } from "../../services/middleware";
import {
  apiErrorResponseValidator,
  apiSuccessResponseValidator,
} from "../../services/Validators/apiResponseController";
import { BigTextButton, Loader, TextInputBox } from "../../shared";
import { validateModifiedData } from "./Function";
import styles from "./Style";
// this is forgate password page
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCredentialText: "",
      inputActive: false,
      pageLoader: false,
    };
  }
  // this is a initial function which is call first
  componentDidMount() {
    this._load();
  }

  _load = () => {};

  onUserCredentialTextChange = (value) => {
    this.setState({
      userCredentialText: value,
    });
  };
  // this is submit function with api call
  onSubmit = async () => {
    let data = {
      userCredentialText: this.state.userCredentialText,
    };
    let modifiedData = validateModifiedData(data);
    if (modifiedData.isValidated) {
      let reqData = {
        email: this.state.userCredentialText,
      };
      this.setState({ pageLoader: true });
      let responseData = await MiddlewareCheck("forgetpassword", reqData);
      if (
        responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR &&
        ErrorCode.ERROR.ERROR_CODE.SUCCESS
      ) {
        let userInfo = responseData.data.userInfo;
        userInfo["userCredential"] = this.state.userCredentialText;
        apiSuccessResponseValidator(responseData);
        this.props.navigation.navigate("MailCheck", {
          passwordResData: userInfo,
        });
      } else {
        apiErrorResponseValidator(responseData);
      }
      this.setState({ pageLoader: false });
    }
  };
  // this function used for navigate to previous screen
  _onBack = () => {
    this.props.navigation.goBack();
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
                  activeOpacity={0.9}
                  onPress={() => this._onBack()}
                >
                  <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
              </View>

              <View>
                <View style={styles.headView}>
                  <Image
                    source={{ uri: ImageName.CONTACT_WITH_BG }}
                    style={styles.backgroundImage}
                  />
                </View>
                <View style={styles.belowImageView}>
                  <Text style={styles.loginText}>
                    {"Forgot your Password?"}{" "}
                  </Text>
                  <Text style={styles.passConfirmText}>
                    Enter your email or phone no for the verification proccess,
                    we will send 4 digits code to your email or phone.
                  </Text>
                </View>

                <View style={styles.formInputSection}>
                  <View style={{ marginBottom: 17 }}>
                    <View style={{ height: 14 }} />
                    <View style={styles.formInputBox}>
                      <TextInputBox
                        placeholder={"Email id or phone number"}
                        value={this.state.userCredentialText}
                        onChangeText={(value) =>
                          this.onUserCredentialTextChange(value)
                        }
                        keyboardType={"default"}
                        returnKeyType={"done"}
                        isActive={this.state.inputActive}
                        onFocus={() => {
                          this.setState({ inputActive: true });
                        }}
                        onBlur={() => {
                          this.setState({ inputActive: false });
                        }}
                      />
                    </View>
                  </View>

                  <View style={styles.buttonSection}>
                    <BigTextButton
                      borderRadius={16}
                      backgroundColor={"#3b1f77"}
                      text={"Submit"}
                      onPress={() => this.onSubmit()}
                    />
                    {/* <TouchableOpacity
                      style={styles.buttonView}
                      activeOpacity={0.9}
                      onPress={() => this.onSubmit()}
                    >
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 40 }} />
            </ScrollView>
          </React.Fragment>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { CustomerRedux } = state;
  return { CustomerRedux };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      stateCheckForNetwork,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
