import React from "react";
import { AlertMessage, Color, ImageName } from '../../../../enums';
import styles from './style';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    FlatList,
    KeyboardAvoidingView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import {
    stateCheckForNetwork,
    setDeviceId,
    stateAllCountries,
    stateUserInformation
} from '../../../../redux/CustomerAction';
import { ErrorCode, LengthValidate, } from '../../../../services/constant';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CheckBox, CustomCamera, DropdownInputBox, ImageUploadModal, Loader, TextInputBox } from "../../../../shared";
import BigTextButton from "../../../../shared/big-text-button";
import { districtModifyData, modifyCustomerArr, modifyCustomerTypeArr, modifyDistrictArrData, modifyStateArrData, modifyZoneArrData, stateModifyData, zoneModifyData } from "./function";
import { MiddlewareCheck, MiddlewareFileCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { FileUpload, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { CustomStyle } from "../../../style";
import { getAllUserData } from "../../../../services/common-view-function/getUserData";
import { App_uri } from "../../../../services/config";

// this is GrievenceNewEntry page 
class GrievenceNewEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            searchActive: false,
            selectedVisitorType: {},
            visitorTypeArr: [],
            stateArr: [],
            distArr: [],
            zoneArr: [],
            selectedStateObj: {},
            selectedDistObj: {},
            selectedZoneObj: {},
            pageNum: 0,
            searchText: "",
            selectedCustomer: {},
            countryId: "",
            customerArr: [],
            visiblePhotoModal: false,
            imageLoader: false,
            imgName: "",
            imgUri: "",
            cameraVisible: false
        }
    }
    // this is a initial function which is call first
    componentDidMount() {
        this._load();
        StoreUserOtherInformations("", {}, this.props);

    }
    // this is the first function where set the state data
    _load = async () => {
        let userData = await getAllUserData()
        await this._onFetchCustomerType();

        await this.getStateData(userData.countryId)
        this.setState({
            countryId: userData.countryId,
            pageLoader: false
        })

        await this.clearData()
    }

    // this function used for back to the previous page 
    _onBack = () => {
        this.props.navigation.goBack();
    };
    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _onSelectVisitorType = (value) => {
        this.setState({ selectedVisitorType: value })
    }

    _onFetchCustomerType = async () => {
        let responseData = await MiddlewareCheck("getCustGrievancesTypes", {}, this.props);
        if (responseData == false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    visitorTypeArr: modifyCustomerTypeArr(responseData.response)
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _onChangeRemark = (value) => {
        this.state.allObjData.remark = value;
        this.setState({
            allObjData: this.state.allObjData
        })
    }

    _onRatingSuccess = () => {
        this.props.onSaveDataToParent({ pageNum: 2 })
    }

    // this is submit function that is used for navigate to FeedbackForm page
    _onSubmit = async () => {
        // check selectedCustomer id data
        if ((this.state.selectedVisitorType.id == undefined || this.state.selectedVisitorType.id == null)) {
            Toaster.ShortCenterToaster("Please select a Department !");
        } else {
            let reqData = {
                grievanceTypId: this.state.selectedVisitorType.id ? this.state.selectedVisitorType.id : "0",
                remarks: this.state.searchText,
                imagePath: this.state.imgName
            }
            this.setState({ submitLoader: true })
            let responseData = await MiddlewareCheck("saveCustGrievances", reqData, this.props)
            if (responseData) {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message)
                    this.props.onSaveDataToParent()
                }
            }
            this.setState({ submitLoader: false })

        }


    }
    // this function used for fetching state data
    getStateData = async (value) => {
        let reqData = {
            countryId: value,
            "fieldVisitId": "0",
            "userId": "0"
        }
        let responseData = await MiddlewareCheck("getaStateData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let stateData = stateModifyData(responseData);
                this.setState({
                    stateArr: modifyStateArrData(stateData.stateList)
                })
            }
        }
    }
    // this function used for district data
    getDistrictData = async (value) => {
        let reqData = {
            stateId: value,
            "fieldVisitId": "0",
            "userId": "0"
        }
        let responseData = await MiddlewareCheck("getaDistrictData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let districtData = districtModifyData(responseData);
                this.setState({
                    distArr: modifyDistrictArrData(districtData.districtList)
                })
            }
        }
    }
    // this function used for zone data
    getZoneData = async (value) => {
        let reqData = {
            cityId: value,
            "fieldVisitId": "0",
            "userId": "0"
        }
        let responseData = await MiddlewareCheck("getaZoneData", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let zoneData = zoneModifyData(responseData);
                this.setState({
                    zoneArr: modifyZoneArrData(zoneData.zoneList)
                })
            }
        }
        this.setState({ zoneLoader: false })
    }

    clearData = () => {
        this.setState({
            selectedVisitorType: {},
            selectedStateObj: {},
            selectedDistObj: {},
            selectedZoneObj: {},
            searchText: ""
        })
    }

    _onCheck = (item, key) => {
        let arr = this.state.customerArr;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].customerId == item.customeselectedCustomerrId) {
                arr[i].isCheck = !arr[i].isCheck;
            } else {
                arr[i].isCheck = false;
            }
        }
        this.setState({
            customerArr: arr
        })

        if (this.state.selectedCustomer.customerId && (this.state.selectedCustomer.customerId == item.customerId)) {
            this.setState({
                selectedCustomer: {}
            })
        } else {
            this.setState({
                selectedCustomer: item
            })
        }
    }

    // this is search text onChange function used for setState searchText value
    _onSearchText = (value) => {
        this.setState({
            searchText: value
        })
    }
    // this function used for design customer item section
    customerItemSection = ({ item, key }) => {
        return (
            <View style={styles.mainBox} key={key}>
                <View style={styles.blueBox}>
                    <View style={styles.blueViewFlex}>
                        <View style={styles.homeCircel}>
                            <Image source={item.profilePic ? { uri: App_uri.IMAGE_VIEW_URI + item.profilePic } : ImageName.NO_IMG} style={styles.homeLogo} />
                        </View>
                        <View style={{ marginLeft: '5%', flex: 0.8 }}>
                            <Text style={styles.saiEnterprisesText}>{item.customerName}</Text>
                        </View>
                        <View style={styles.addVisitsButton}>
                            <CheckBox
                                borderRadius={40}
                                data={item.isCheck}
                                onClickValue={() => this._onCheck(item, key)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.textFlexView}>
                    <View style={{ flex: 1, marginRight: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={ImageName.MAIL_ICON} style={styles.mailIcon} />
                            <View style={{ flexDirection: 'column', marginLeft: '2%' }}>
                                <Text style={styles.headerText}>Email</Text>
                                <Text style={styles.textVisites}>{item.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 2 }}>
                            <Image source={ImageName.CALL_ICON} style={styles.callIcon} />
                            <View style={{ flexDirection: 'column', marginLeft: '2%' }}>
                                <Text style={styles.headerText}>Phone</Text>
                                <Text style={styles.textVisites}>{item.phoneNumber}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.textFlexView}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={ImageName.PROFILE_REMOVE} style={styles.pRemoveIcon} />
                            <View style={{ flexDirection: 'column', marginLeft: '2%' }}>
                                <Text style={styles.headerText}>Visitor Type</Text>
                                <Text style={styles.textVisites}>{item.contactTypeName}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
    // this function used for render stateField dropdown input box and design
    statefield = () => {
        const _onSelectState = (value) => {
            this.setState({ selectedStateObj: value })
            this.getDistrictData(value.id)
        }
        return (
            <View style={{ marginTop: 15 }}>
                <DropdownInputBox
                    selectedValue={this.state.selectedStateObj.id ? this.state.selectedStateObj.id.toString() : "0"}
                    data={this.state.stateArr}
                    onSelect={(value) => _onSelectState(value)}
                    headerText={"State*"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                    height={45}
                />
            </View>
        )
    }
    // this function used for render distZoneFiled dropdown input box and design 
    distZoneFiled = () => {
        const _onSelectDist = (value) => {
            this.setState({ selectedDistObj: value })
            this.getZoneData(value.id)

        }
        const _onSelectZone = (value) => {
            this.setState({ selectedZoneObj: value })

        }
        return (
            <View style={{ marginTop: 15, flexDirection: 'row' }}>
                <View style={{ flex: 0.5, marginHorizontal: '1%' }}>
                    <DropdownInputBox
                        selectedValue={this.state.selectedDistObj.id ? this.state.selectedDistObj.id.toString() : "0"}
                        data={this.state.distArr}
                        onSelect={(value) => _onSelectDist(value)}
                        headerText={"District*"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                        height={45}
                    />
                </View>
                <View style={{ flex: 0.5, marginHorizontal: '1%' }}>
                    <DropdownInputBox
                        selectedValue={this.state.selectedZoneObj.id ? this.state.selectedZoneObj.id.toString() : "0"}
                        data={this.state.zoneArr}
                        onSelect={(value) => _onSelectZone(value)}
                        headerText={"Zone*"}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                        height={45}
                    />
                </View>
            </View>
        )
    }

    // this function used for fetching customer list data 
    _onFetchCustomerList = async () => {
        if (this.state.selectedVisitorType.id == undefined || this.state.selectedVisitorType.id == null) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.VISITOR_TYPE_ERROR);
        } else if (this.state.selectedStateObj.id == undefined || this.state.selectedStateObj.id == null) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.STATE_ERROR);
        } else if (this.state.selectedDistObj.id == undefined || this.state.selectedDistObj.id == null) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.DISTRICT_ERROR);
        } else if (this.state.selectedZoneObj.id == undefined || this.state.selectedZoneObj.id == null) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.CREATE_ENQUIRY.SOURCE_INFO.ZONE_ERROR);
        } else {
            this.setState({
                custSearchLoader: true
            })
            let reqData = {
                "custTypeId": this.state.selectedVisitorType.id.toString(),
                "custSearchTextVal": this.state.searchText,
                "countryId": this.state.countryId,
                "stateId": this.state.selectedStateObj.id ? this.state.selectedStateObj.id.toString() : "",
                "districtId": this.state.selectedDistObj.id ? this.state.selectedDistObj.id.toString() : "",
                "zoneId": this.state.selectedZoneObj.id ? this.state.selectedZoneObj.id.toString() : "",
                "fieldVisitId": "0",
                "userId": "0"
            }
            let responseData = await MiddlewareCheck("getSearchedCustomerData", reqData, this.props);

            if (responseData == false) {
                this._onNetworkError();
            } else {
                if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    let info = await StorageDataModification.userCredential({}, "get");
                    this.setState({
                        customerArr: modifyCustomerArr(responseData.data, info.userId)
                    })
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({
                custSearchLoader: false
            })
        }
    }

    _onTakePhoto = async (type) => {
        this.setState({
            visiblePhotoModal: type
        })
    }

    // for custom camera open
    onSelectPic = async (value) => {
        this._onTakePhoto(false)
        await this.ImageUploadApiCall(value);
    }

    ImageUploadApiCall = async (uploadData) => {
        this.setState({ imageLoader: true })
        let imgData = await MiddlewareFileCheck("crmImageupload", uploadData, this.props);
        if (imgData) {
            if (imgData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.imgName = imgData.response.fileName;
                this.state.imgUri = uploadData.uri;
                this.setState({ imgUri: this.state.imgUri, imgName: this.state.imgName })
            }
        }
        this.setState({ imageLoader: false })
    }

    modalSec = () => {
        const OnChooseGallery = async () => {
            this._onTakePhoto(false)
            let uploadData = await FileUpload.uploadImg();
            await this.ImageUploadApiCall(uploadData);
        }
        const OnChooseCamera = async () => {
            this.setState({ cameraVisible: true });
        }
        return (
            <>
                <ImageUploadModal
                    isVisible={this.state.visiblePhotoModal}
                    onGallerySelect={(value) => OnChooseGallery(value)}
                    onCameraSelect={(value) => OnChooseCamera(value)}
                    onCloseModal={(value) => this._onTakePhoto(false)}
                />
            </>
        )
    }
    // this is main render to this page 
    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <SafeAreaView style={styles.container}>
                    {
                        this.state.cameraVisible ?
                            <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
                            :
                            null
                    }
                    {this.state.pageLoader ?
                        <React.Fragment>
                            <View style={CustomStyle.noDataFoundViewForTabList}>
                                <Loader />
                            </View>
                        </React.Fragment> :
                        <React.Fragment>
                            <View style={{}}>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ marginTop: 15 }}>
                                        <DropdownInputBox
                                            selectedValue={this.state.selectedVisitorType.id ? this.state.selectedVisitorType.id.toString() : "0"}
                                            data={this.state.visitorTypeArr}
                                            onSelect={(value) => this._onSelectVisitorType(value)}
                                            headerText={"Choose Department*"}
                                            isBackButtonPressRequired={true}
                                            isBackdropPressRequired={true}
                                            height={45}
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <TextInputBox
                                            placeholder={"Remarks"}
                                            value={this.state.searchText}
                                            onChangeText={(value) => this._onSearchText(value)}
                                            isRightIcon={false}
                                            keyboardType="default"
                                            rightIcon={ImageName.SEARCH_LOGO}
                                            isActive={this.state.searchActive}
                                            onFocus={() => { this.setState({ searchActive: true }) }}
                                            onBlur={() => { this.setState({ searchActive: false }) }}
                                            returnKeyType="done"
                                            height={90}
                                            alignItems={"flex-start"}
                                            multiline={true}
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <View style={styles.mainHeadBody}>
                                            {this.state.imgName.length > 0 ?
                                                <TouchableOpacity style={styles.headerLogoSec} onPress={() => this._onTakePhoto(true)}>
                                                    <Image source={{ uri: App_uri.BASE_URI + this.state.imgName }} style={{ height: 140, width: 140, borderRadius: 70, resizeMode: "contain" }} />
                                                </TouchableOpacity>
                                                :
                                                <React.Fragment>
                                                    <TouchableOpacity style={styles.headerLogoSec} onPress={() => this._onTakePhoto(true)} disabled={this.state.imageLoader}>
                                                        {this.state.imageLoader ?
                                                            <View>
                                                                <ActivityIndicator />
                                                            </View> :
                                                            <View>
                                                                <Image source={ImageName.CAMERA_LOGO} style={styles.mainHeaderLogo} />
                                                            </View>
                                                        }
                                                    </TouchableOpacity>
                                                </React.Fragment>
                                            }
                                            <View>
                                                <Text style={styles.headerLogoTxt}>Take a photo from your</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.headerLogoTxt}>Phone or upload from phone gallery</Text>
                                            </View>

                                        </View>
                                    </View>

                                    <View style={{ marginHorizontal: '15%', marginTop: 40 }}>
                                        {this.state.submitLoader ? <View>
                                            <ActivityIndicator />
                                        </View> :
                                            <BigTextButton
                                                text={"Proceed"}
                                                onPress={() => this._onSubmit()}
                                            />
                                        }

                                    </View>
                                </View>
                                <View style={{ marginBottom: 150 }} />
                            </View>
                        </React.Fragment>
                    }
                </SafeAreaView >
                {this.modalSec()}
            </KeyboardAvoidingView>
        )
    };
};

const mapStateToProps = (state) => {
    const { Sales360Redux } = state
    return { Sales360Redux }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        stateCheckForNetwork,
        setDeviceId,
        stateAllCountries,
        stateUserInformation
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GrievenceNewEntry);