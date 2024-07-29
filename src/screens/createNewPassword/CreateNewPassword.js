import React from "react";
import { AlertMessage, Color, FontFamily, FontSize, ImageName, Padding, ScreenText } from '../../enums';
import styles from './Style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    stateCheckForNetwork,
} from '../../redux/CustomerAction';
import LinearGradient from 'react-native-linear-gradient';
import { ErrorCode, LengthValidate } from '../../services/constant';
import { validationCheck } from "./Function"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BigTextButton, Loader, NoDataFound, TextInputBox } from "../../shared";
import { MiddlewareCheck } from "../../services/middleware";
import { Toaster } from "../../services/common-view-function";
import { apiErrorResponseValidator, apiResponseValidator, apiSuccessResponseValidator } from "../../services/Validators/apiResponseController";
// this is Create New Password page 
class CreateNewPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            passwordCheck: true,
            confirmPasswordCheck: true,
            PassActive: false,
            confirmActive: false,
            passError: false,
            confirmPassError: false,
            pageLoader: false,
            propData: {}


        }
    }
    // this is initial function which is call first
    componentDidMount() {
        if (this.props.route.params !== undefined || this.props.route.params !== null) {
            this.setState({
                propData: this.props.route.params.propData,
            });
        }
    }
    // this is password onChange function which is set state password value 
    _onPassword = (value) => {
        this.setState({
            password: value

        })
    }
    // this is confirm password onChange function which is set state confirm password value 
    _onConfirmassword = (value) => {
        this.setState({
            confirmPassword: value

        })
    }
    // this function used for back previous page 
    _onBack = () => {
        this.props.navigation.goBack();
    }
    // this function used for visible password 
    _eyeVisiable = (data) => {
        if (data == "PasswordNew") {
            this.state.passwordCheck = !this.state.passwordCheck;
        } else {
            this.state.confirmPasswordCheck = !this.state.confirmPasswordCheck;
        }

        this.setState({
            passwordCheck: this.state.passwordCheck,
            confirmPasswordCheck: this.state.confirmPasswordCheck
        })

    }

    _onCreate = async () => {
        let data = {
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        let validPass = validationCheck(data)
        if (validPass.status) {
            this.setState({ pageLoader: true })
            let reqObj = {
                "userId": this.state.propData.userId,
                "newpassword": this.state.confirmPassword,
                "requestId": this.state.propData.requestId
            }
            let responseData = await MiddlewareCheck("resetpassword", reqObj);
            this.setState({ pageLoader: false })
            if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                apiSuccessResponseValidator(responseData);
                this.props.navigation.navigate("PasswordUpdateSuccess");
            } else {
                apiErrorResponseValidator(responseData);
            }
        } else {
            this.setState(validPass.stateObj);
        }
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.pageLoader ?
                    <Loader />
                    :
                    <React.Fragment>
                        <ScrollView showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            <View style={styles.backSec}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={this._onBack}>
                                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                                </TouchableOpacity>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={styles.mainView}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center', paddingVertical: 10
                                }}>
                                    <Image source={{ uri: ImageName.KEY_WITH_BG }} style={styles.backgroundImage} />
                                </View>

                                <View style={styles.belowImageView}>
                                    <Text style={styles.loginText}>Reset Password</Text>
                                    <Text style={styles.passConfirmText}>Set the New Password for your account & access all the features</Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={styles.formLabel}>Password</Text>
                                    <View style={styles.formInputBox}>
                                        <TextInputBox
                                            placeholder={"Enter Your Password"}
                                            value={this.state.password}
                                            onChangeText={(value) => this._onPassword(value)}
                                            secureTextEntry={this.state.passwordCheck}
                                            maxLength={LengthValidate.VALIDATIONS.PASSWORD_MAX}
                                            isRightIcon={true}
                                            keyboardType="default"
                                            rightIcon={this.state.passwordCheck ? ImageName.CLOSE_EYE : ImageName.OPEN_EYE}
                                            onPressRightIcon={() => this._eyeVisiable("PasswordNew")}
                                            refName={ref => this.firstTextInput = ref}
                                            isActive={this.state.PassActive}
                                            onFocus={() => { this.setState({ PassActive: true }) }}
                                            onBlur={() => { this.setState({ PassActive: false }) }}
                                            onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                        />

                                    </View>
                                </View>
                                <View style={{ marginBottom: 15 }}>
                                    <Text style={styles.formLabel}>Confirm Password</Text>
                                    <View style={styles.formInputBox}>
                                        <TextInputBox
                                            placeholder={"Enter Your Confirm Password"}
                                            value={this.state.confirmPassword}
                                            onChangeText={(value) => this._onConfirmassword(value)}
                                            secureTextEntry={this.state.confirmPasswordCheck}
                                            maxLength={LengthValidate.VALIDATIONS.PASSWORD_MAX}
                                            isRightIcon={true}
                                            keyboardType="default"
                                            rightIcon={this.state.confirmPasswordCheck ? ImageName.CLOSE_EYE : ImageName.OPEN_EYE}
                                            onPressRightIcon={() => this._eyeVisiable()}
                                            refName={ref => this.secondTextInput = ref}
                                            isActive={this.state.confirmActive}
                                            onFocus={() => { this.setState({ confirmActive: true }) }}
                                            onBlur={() => { this.setState({ confirmActive: false }) }}
                                            returnKeyType="done"
                                        />
                                    </View>
                                </View>
                                <View style={styles.buttonSection}>
                                    <BigTextButton
                                        borderRadius={16}
                                        backgroundColor={"#3b1f77"}
                                        text={"Create"}
                                        onPress={() => this._onCreate()}
                                    />
                                </View>
                                <View style={{ marginBottom: 50 }} />
                            </View>
                        </ScrollView>
                    </React.Fragment>
                }
            </SafeAreaView>
        )
    };
};

const mapStateToProps = (state) => {
    const { CustomerRedux } = state
    return { CustomerRedux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPassword);