import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    SafeAreaView
} from "react-native";
import { AlertMessage, Color, Dimension, FontSize, ImageName } from "../../enums";
import styles from "./Style";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    stateCheckForNetwork, loginData
} from '../../redux/CustomerAction';
import { modifyLoginData, modLoginData } from "./Function";
import { BigTextButton, DropdownInputBox, Loader, Modal, TextInputBox } from "../../shared";
import { MiddlewareCheck } from "../../services/middleware";
import { CommonData, ErrorCode, LengthValidate } from "../../services/constant";
import { DataValidator } from "../../validators";
import { CommonActions } from "@react-navigation/native";
import { DeviceInfo } from '../../services/config';
import { Permissions, StorageDataModification, Toaster } from "../../services/common-view-function";

// PushNotification.localNotification({
//     autoCancel: true,
//     bigText:
//       'This is local notification demo in React Native app. Only shown, when expanded.',
//     subText: 'Local Notification Demo',
//     title: 'Local Notification Title',
//     message: 'Expand me to see more',
//     vibrate: true,
//     vibration: 300,
//     playSound: true,
//     soundName: 'default',
//     // actions: '["Yes", "No"]'
// })

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            userIdActive: false,
            password: "",
            passwordActive: false,
            userIdError: false,
            passwordError: false,
            pageLoader: false,
            alertMessage: "",
            logInType: 0,
            fcmToken: "",
            openModal: false,
            customerArr: [],
            selectedCustomerObj: {},
            loginArr: []
        };
    }

    componentDidMount = async () => {
        await Permissions.GetAllPermissionsForAccess("all");
    }

    _onChangeUserId = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.setState({
            userId: newText
        })

        if (this.state.userIdError == true) {
            this.setState({
                userIdError: false
            })
        }
    }

    _onChangePassword = (value) => {
        this.setState({
            password: value
        })
        if (this.state.passwordError == true) {
            this.setState({
                passwordError: false
            })
        }
    }

    _onForgotPassword = () => {
        this.props.navigation.navigate("ForgotPassword");
    }

    _onClearLoginData = () => {
        this.setState({
            userId: "",
            password: ""
        })
    }

    openSelectionModal = () => {
        let modLoginArr = modifyLoginData(this.state.loginArr);
        this.setState({ customerArr: modLoginArr });

        if (this.state.openModal == false) {
            this.setState({ openModal: true })
        } else {
            this.setState({ openModal: false })
        }
    }

    closeSelectionModal = () => {
        if (this.state.openModal == false) {
            this.setState({ openModal: true })
        } else {
            this.setState({ openModal: false })
        }
        // this.clearDropdownData();
    }

    clearDropdownData = () => {
        this.setState({ selectedCustomerObj: {} })
    }

    _onLogin = async () => {
        this.state.userId = this.state.userId.replace(/\s+/g, '');
        let errorCount = 0;
        let msg = "";
        let data = {
            userId: this.state.userId,
            password: this.state.password
        }

        if (data.userId == null || data.userId == undefined || data.userId.length == 0) {
            msg = AlertMessage.MESSAGE.EMAIL.EMAIL_EMPTY;
            errorCount++;
        }
        // else if (emailModValidator(data.userId) == false) {
        //     msg = AlertMessage.MESSAGE.EMAIL_PASSWORD.INCORRECT;
        //     errorCount++;
        // }

        else if (data.password == null || data.password == undefined || data.password.length == 0) {
            msg = AlertMessage.MESSAGE.PASSWORD.PASSWORD_EMPTY;
            errorCount++;
        }
        this.setState({ alertMessage: msg })
        if (errorCount === 0) {
            let reqData = {
                "username": this.state.userId,
                "password": this.state.password,
                "platform": Platform.OS,
                "deviceId": await DeviceInfo.DeviceUniqueId(),
                "fcmToken": this.state.fcmToken,
                "businessType": "",
                "type": this.state.logInType,
                "moduleId": CommonData.ModuleType.BANDHAN_APP
            }
            this.setState({ pageLoader: true })
            // let responseData = await MiddlewareCheck("customerLogin", reqData);
            let responseData = await MiddlewareCheck("mobileLogin", reqData);
            console.log("login----responseData", JSON.stringify(responseData))
            this.setState({ pageLoader: false })
            if (responseData == false) {
                this.setState({ alertMessage: "Network Error!" });
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.setState({ loginArr: responseData.response })
                    await StorageDataModification.userMenuPermision(responseData.response[0].moduleDetails, "store");
                    if (responseData.response.length > 1) {
                        let modLoginArr = modLoginData(responseData.response)
                        this.setState({ loginArr: modLoginArr })
                        this.openSelectionModal();
                    } else {
                        if (responseData.response[0].approvedStatus == 0) {
                            Toaster.ShortCenterToaster("Account not Approved !")
                        } else if (responseData.response[0].loginAccess == 0) {
                            Toaster.ShortCenterToaster("Restricted Access !")
                        } else {
                            await StorageDataModification.authData(responseData.response[0].token, "store");
                            await StorageDataModification.userCredential(responseData.response[0], "store");
                            this.props.loginData(responseData.response);
                            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'DrawerNav' }] }));
                        }
                    }
                } else {
                    this.setState({ alertMessage: responseData.message });
                }
            }
        }
    }

    // for go to pollicy page 
    _onPolicy = (type) => {
        this.props.navigation.navigate("PolicyView", { "type": type });
    }

    _onUpdate = async () => {
        if (this.state.selectedCustomerObj.id == undefined || this.state.selectedCustomerObj.id == null || this.state.selectedCustomerObj.id == 0) {
            Toaster.ShortCenterToaster("Please select the Brand !")
        } else if (this.state.selectedCustomerObj.loginAccess == "0") {
            Toaster.ShortCenterToaster("Restricted Access !")
        }
        else {
            await StorageDataModification.authData(this.state.selectedCustomerObj.token, "store");
            await StorageDataModification.userCredential(this.state.selectedCustomerObj, "store");
            this.props.loginData(this.state.loginArr);
            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'DrawerNav' }] }));
            this.closeSelectionModal();
        }
    }

    modalSection = () => {
        const _OnSelectCustomer = (value, index) => {
            let arr = this.state.loginArr;

            for (let i = 0; i < arr.length; i++) {
                if (value.customerId == arr[i].customerId) {
                    arr[i].isActive = "1"
                } else {
                    arr[i].isActive = "0"
                }

            }
            this.state.loginArr = arr;
            this.setState({ selectedCustomerObj: value, loginArr: this.state.loginArr })
        }
        return (
            <Modal
                onBackdropPress={() => this.closeSelectionModal()}
                isVisible={this.state.openModal}
                children={
                    <View style={styles.modalview}>
                        <View style={styles.modalHeaderSec}>
                            <View style={styles.marginView}>
                                <Text style={styles.profileNameText}>Select Brand</Text>
                            </View>
                        </View>
                        <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <DropdownInputBox
                                selectedValue={this.state.selectedCustomerObj.id ? this.state.selectedCustomerObj.id.toString() : "0"}
                                data={this.state.customerArr}
                                onSelect={(value) => _OnSelectCustomer(value)}
                                headerText={"Select Brand*"}
                                selectedText={this.state.selectedCustomerObj.name ? this.state.selectedCustomerObj.name : "Unit"}
                                selectedTextColor={this.state.selectedCustomerObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                isBackButtonPressRequired={true}
                                isBackdropPressRequired={true}
                            />
                        </View>
                        <View style={{ marginHorizontal: '10%', marginTop: 15 }}>
                            <TouchableOpacity style={styles.updateButton}
                                activeOpacity={0.9}
                                onPress={() => this._onUpdate()}>
                                <Text style={styles.updateText}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>

                        <Loader />
                    </View>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.backgroundImageView}>
                            <View style={{ height: 140, width: 140, borderRadius: 300, backgroundColor: '#3b1f77', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImageName.SECURITY_SAFE} style={{ height: 80, width: 80, resizeMode: 'contain' }} />
                            </View>
                        </View>
                        <View style={styles.belowImageView}>
                            <Text style={styles.loginText}>{"Hey,\nLogin Now"} </Text>
                        </View>

                        <View style={styles.formInputSection}>
                            <View style={{ marginBottom: 32 }}>
                                <TextInputBox
                                    placeholder={"Username, phone no"}
                                    value={this.state.userId}
                                    onChangeText={(value) => this._onChangeUserId(value)}
                                    keyboardType={"default"}
                                    returnKeyType={"next"}
                                    blurOnSubmit={false}
                                    refName={ref => this.firstTextInput = ref}
                                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    isActive={this.state.userIdActive}
                                    onFocus={() => { this.setState({ userIdActive: true }) }}
                                    onBlur={() => { this.setState({ userIdActive: false }) }}
                                />
                            </View>
                            <View style={{ marginBottom: 32 }}>
                                <TextInputBox
                                    placeholder={"Password"}
                                    value={this.state.password}
                                    onChangeText={(value) => this._onChangePassword(value)}
                                    secureTextEntry={true}
                                    refName={ref => this.secondTextInput = ref}
                                    maxLength={LengthValidate.VALIDATIONS.PASSWORD_MAX}
                                    isActive={this.state.passwordActive}
                                    onFocus={() => { this.setState({ passwordActive: true }) }}
                                    onBlur={() => { this.setState({ passwordActive: false }) }}
                                />
                            </View>
                            <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                                <View style={{ flex: 0.6, flexDirection: "row" }}>
                                    {this.state.alertMessage == "" ? null : <React.Fragment>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Image source={ImageName.RED_EXCLAMATION} style={{ height: 15, width: 15, resizeMode: "contain" }} />
                                            <View style={{ marginLeft: 10 }}>
                                                <Text style={styles.alertMsg}>{this.state.alertMessage}</Text>
                                            </View>
                                        </View>
                                    </React.Fragment>}
                                </View>
                            </View>
                            <View style={styles.buttonSection}>
                                <BigTextButton
                                    height={45}
                                    borderRadius={16}
                                    backgroundColor={"#3b1f77"}
                                    text={"Login"}
                                    fontSize={FontSize.SM}
                                    onPress={() => this._onLogin()}
                                />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                                <Text style={styles.forgotText}>By signing in,you agree to our <Text style={styles.textTremsConditions} onPress={(type) => this._onPolicy("termCondition")}>Terms </Text><Text style={styles.forgotText}>and  </Text><Text style={styles.textTremsConditions} onPress={(type) => this._onPolicy("privacyPolicy")} >Privacy Policy</Text></Text>
                            </View>
                        </View>
                        <View style={{ height: 90 }} />
                    </ScrollView>
                }
                {this.modalSection()}
                {/* </KeyboardAvoidingView> */}
            </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
