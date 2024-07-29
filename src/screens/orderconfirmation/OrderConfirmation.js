import React from "react";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../enums";
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView
} from "react-native";
import { stateCheckForNetwork, stateUserInformation } from "../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomCamera, DropdownInputBox, ImageUploadModal, Loader, TextInputBox } from "../../shared";

import { CommonData, ErrorCode, LengthValidate } from "../../services/constant";
import styles from "./Style";
import BigTextButton from "../../shared/big-text-button";
import { FileUpload, StorageDataModification, Toaster } from "../../services/common-view-function";
import { MiddlewareCheck, MiddlewareFileCheck, StoreUserOtherInformations } from "../../services/middleware";
import { DataValidator } from "../../validators";
import { modifyBrandNameArr, modifyBrandTypeArr, modifyDropdownArr, modifyOtsData, modifyReceivingData, modifyUnitArr, validateData } from "./Function";
import { CustomStyle } from "../style";
import { App_uri } from "../../services/config";


class OrderConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            pageLoader: false,
            listLoader: false,
            imageLoader: false,
            listDataLoader: false,
            visiblePhotoModal: false,

            add: CommonData.COMMON.STATUS,
            selectAddObj: {},
            trWeight: "",
            trWeightActive: false,
            vehicleLoad: "",
            vehicleLoadActive: false,

            unitArr: [],
            selectedUnitObj: {},
            documentArr: [],
            selectedDocumentObj: {},
            descriptionNotes: "",
            descriptionNotesActive: false,
            quantity: "",
            quantityActive: false,
            unit: "",
            unitActive: false,
            imgName: "",
            imgUri: "",
            userData: {
                isProject:0
            },
            docArr: [],
            otsDocArr: [],
            selectedItem: {},
            indexValue: "",
            docInfoText: "",
            docInfoActive: false,
            imageNull: false,

            allImages: [],
            allImgShow: [],
            propData: this.props.route.params.data,
            cameraVisible: false,


        };
    }

    componentDidMount() {
        this._load();
        StoreUserOtherInformations("", {}, this.props);

    }

    _load = async () => {
        let user = await StorageDataModification.userCredential({}, "get")
        this.state.userData.isProject = user.isProject == undefined || user.isProject == null ? 0 : user.isProject
        this.setState({ userData: this.state.userData })
        await this._apiCallRes();
        await this._fetchReceivingConfirmationDoc();
    };


    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    _apiCallRes = async () => {
        await this.getUnitData();
        await this.getDropdownTypeData();
        this.setState({
            pageLoader: false,
            listDataLoader: false,
            listLoader: false
        })
    }

    _onBack = () => {
        this.props.navigation.goBack();
    };

    _modifyImgShowingArr = () => {
        let mainArr = [];
        let tempArr = [];
        for (let i = 0; i < this.state.allImages.length; i++) {
            tempArr = [...tempArr, ...[this.state.allImages[i]]]
            if (i % 2 == 1) {
                mainArr = [...mainArr, ...[tempArr]]
                tempArr = [];
            }

            if (this.state.allImages.length % 2 == 1) {
                if (i == this.state.allImages.length - 1) {
                    mainArr = [...mainArr, ...[tempArr]]
                    tempArr = [];
                }
            }
        }

        this.state.allImgShow = mainArr;
        this.setState({
            allImgShow: this.state.allImgShow
        })
    }

    _fetchReceivingConfirmationDoc = async () => {
        let docArrData = [];
        this.setState({ listDataLoader: true });
        let responseData = await MiddlewareCheck("fetchReceivingConfirmationDoc", { orderId: this.state.propData.OrderId }, this.props);
        let receivingData = modifyReceivingData(responseData);
        let otsData = modifyOtsData(responseData);
        // let otsData ={};
        let docReceivingData = receivingData.docMainData;
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.selectedUnitObj.id = docReceivingData.length == 0 ? "1" : docReceivingData[0].unitId;
                this.setState({
                    otsDocArr: otsData.otsMainData == undefined || otsData.otsMainData == null ? [] : otsData.otsMainData,
                    docArr: docReceivingData.length == 0 ? docArrData : docReceivingData[0].modDocArr,
                    // quantity: docReceivingData.length == 0 ? "" : docReceivingData[0].receivedQuantity.toString(),
                    quantity: this.state.propData.TotalDispatchQuantity.toString(),
                    selectedUnitObj: this.state.selectedUnitObj,
                    descriptionNotes: docReceivingData.length == 0 ? "" : docReceivingData[0].remarks
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ listDataLoader: false });

    }
    getBrandTypeData = async () => {
        this.setState({ listDataLoader: true });
        let responseData = await MiddlewareCheck("getBrandingType", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    brandTypeArr: modifyBrandTypeArr(responseData.response.listData)
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ listDataLoader: false });
    }

    _OnSelectBrandingName = (value) => {
        let data = this.state.brandNameArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.setState({
            selectedBrandNameObj: value,
            brandNameArr: data,
        })
    }

    getBrandDropdownData = async () => {
        this.setState({ listDataLoader: true });
        let responseData = await MiddlewareCheck("getProductCategory", {}, this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    brandNameArr: modifyBrandNameArr(responseData.data)
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ listDataLoader: false });
    }

    _OnSelectBrandType = (value) => {
        let data = this.state.brandTypeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.setState({
            selectedBrandTypeObj: value,
            brandTypeArr: data,
        })
    }

    getUnitData = async () => {
        this.setState({ listDataLoader: true });
        let responseData = await MiddlewareCheck("unitDropdownData", this.props);
        if (responseData === false) {
            this._onNetworkError();
        } else {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    unitArr: modifyUnitArr(responseData.data)
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }
    getDropdownTypeData = async () => {
        this.setState({ listDataLoader: true });

        let responseData = await MiddlewareCheck("getDocumentTypeDropdown",{}, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({
                    documentArr: modifyDropdownArr(responseData.response)
                })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    _OnSelectUnit = (value) => {
        let data = this.state.unitArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.setState({
            selectedUnitObj: value,
            unitArr: data,
        })
    }

    _OnSelectStatus = (value) => {
        let data = this.state.add;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }

        this.setState({
            selectAddObj: value,
            add: data,
        })
    }

    _onDescriptionNotes = (value) => {
        this.setState({
            descriptionNotes: value
        })
    }

    _onQuantity = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "amount");
        this.setState({
            quantity: newText
        })
    }

    _onVehicleload = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "amount");
        this.setState({
            vehicleLoad: newText
        })
    }
    _onTrWeight = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "amount");
        this.setState({
            trWeight: newText
        })
    }


    _OnSelectDocument = (value) => {
        let data = this.state.documentArr;
        let arr = this.state.docArr;
        let imageNull = false;
        let obj = {
            assetType: value.name,
            assetTypeId: value.id,
            imageName: "",
            imgLoader: false,
        };

        arr.push(obj)
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].imageName.length == 0) {
                imageNull = true;
            } else {
                imageNull = false;
            }
        }

        this.state.docArr = arr;
        this.state.imageNull = imageNull;
        this.setState({
            docArr: this.state.docArr,
            selectedDocumentObj: value,
            documentArr: data,
            imageNull: this.state.imageNull
        })
    }

    _imageUploadModalSection = () => {
        const _onChooseGallery = async () => {
            let uploadData = await FileUpload.uploadImg();
            await this._onTakePhoto(false)
            await this._onImageUpload(uploadData);
        }
        const _onChooseCamera = async () => {
            // let uploadData = await FileUpload.uploadCameraImg();
            // await this.ImageUploadApiCall(uploadData);
            this.setState({ cameraVisible: true });
        }

        return (
            <ImageUploadModal
                isVisible={this.state.visiblePhotoModal}
                onGallerySelect={(value) => _onChooseGallery(value)}
                onCameraSelect={(value) => _onChooseCamera(value)}
                onCloseModal={(value) => this._onTakePhoto(value)}
            />
        )
    }

    onSelectPic = async (value) => {
        await this._onTakePhoto(false);
        await this._onImageUpload(value);
    }
    _onImageUpload = async (uploadData) => {
        this.state.docArr[this.state.indexValue].imgLoader = true
        this.setState({ docArr: this.state.docArr })
        let responseData = await MiddlewareFileCheck("crmImageupload", uploadData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.state.docArr[this.state.indexValue].imageName = responseData.response.fileName
                this.setState({ docArr: this.state.docArr, imageNull: false })
            }
            else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.state.docArr[this.state.indexValue].imgLoader = false
        this.setState({ docArr: this.state.docArr })

    }

    onSelectPhoto = (item, index) => {
        this.setState({ selectedItem: item, indexValue: index })
        this._onTakePhoto();
    }

    _onTakePhoto = async () => {
        this.state.visiblePhotoModal = !this.state.visiblePhotoModal;
        this.setState({
            visiblePhotoModal: this.state.visiblePhotoModal
        })
    }


    _onClose = (item, key) => {
        let arr = this.state.allImages;
        let tempArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].imagePath == item.imagePath) {

            } else {
                tempArr.push(arr[i]);
            }
        }

        this.state.allImages = tempArr;
        this.setState({
            allImages: this.state.allImages
        })
        this._modifyImgShowingArr();
    }

    _onRemovePhoto = (index) => {
        let arr = this.state.docArr;
        arr.splice(index, 1);
        this.setState({
            docArr: arr,
            imageNull: false,
            docInfoText: ""
        })
    }
    _onDocInfo = (value, key) => {

        this.state.docInfoText = value;
        this.setState({ docInfoText: this.state.docInfoText })
    }

    _onSubmit = async () => {
        let docArr = this.state.docArr,
            docMainArr = [];
        for (let i = 0; i < docArr.length; i++) {
            if (docArr[i].assetTypeId == 4) {
                Object.assign(docArr[i], { assetType: this.state.docInfoText.length == 0 ? "" : this.state.docInfoText, assetTypeId: docArr[i].assetTypeId, imageName: docArr[i].imageName })
            }
        }
        this.state.docArr = docArr;
        this.setState({
            docArr: this.state.docArr
        })

        let reqData = {
            "orderId": this.state.propData.OrderId,
            "orderNum": this.state.propData.OrderNo,
            "receivedQuantity": this.state.quantity,
            "unitId": this.state.selectedUnitObj.id ? this.state.selectedUnitObj.id : "1",
            "erpCode": this.state.propData.ERPCode,
            "remark": this.state.descriptionNotes,
            "docArr": this.state.docArr,

        }
        let validatedData = validateData(reqData);
        if (validatedData.status) {
            this.setState({ listDataLoader: true })
            let responseData = await MiddlewareCheck("postReceivingConfirmation", reqData, this.props);
            if (responseData == false) {
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster(responseData.message);
                    this.props.navigation.goBack();
                }
                else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ listDataLoader: false })
        }

    }

    listSection = () => {
        return (

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {this._imageUploadModalSection()}
                {/* {this.modalSection()} */}
                <View style={{ marginTop: 15, marginHorizontal: "5%" }}>
                    <View style={{ marginTop: 25 }}>
                        {this.state.otsDocArr.length > 0 ?
                            <Text style={styles.labelTxt}>Total Dispatch Quantity</Text>
                            :
                            null
                        }

                        {/* <View style={{ marginTop: 15, }}>
                            <TextInputBox
                                placeholder={"Dispatch Quantity*"}
                                value={this.state.propData.TotalDispatchQuantity.toString()}
                                height={45}
                                // onChangeText={(value) => this._onQuantity(value)}
                                keyboardType="numeric"
                                isActive={this.state.quantityActive}
                                onFocus={() => { this.setState({ quantityActive: true }) }}
                                onBlur={() => { this.setState({ quantityActive: false }) }}
                                maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                                editable={false}
                            />
                        </View> */}

                    </View>
                    <View style={{ marginTop: 20, flexDirection: "row" }}>
                        <View style={{ flex: 0.65 }}>
                            <TextInputBox
                                placeholder={"Received Quantity*"}
                                value={this.state.quantity}
                                height={45}
                                onChangeText={(value) => this._onQuantity(value)}
                                keyboardType="numeric"
                                isActive={this.state.quantityActive}
                                onFocus={() => { this.setState({ quantityActive: true }) }}
                                onBlur={() => { this.setState({ quantityActive: false }) }}
                                maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                                editable={this.state.userData.isProject == 0 ? false : true}
                            // editable={false}
                            />
                        </View>
                        <View style={{ flex: 0.07 }} />
                        <View style={{ flex: 0.3 }}>
                            <DropdownInputBox
                                selectedValue={this.state.selectedUnitObj.id ? this.state.selectedUnitObj.id.toString() : "1"}
                                data={this.state.unitArr}
                                onSelect={(value) => this._OnSelectUnit(value)}
                                headerText={"Unit*"}
                                selectedText={this.state.selectedUnitObj.name ? this.state.selectedUnitObj.name : "Unit"}
                                selectedTextColor={this.state.selectedUnitObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                isBackButtonPressRequired={true}
                                isBackdropPressRequired={true}
                                isDisabled={this.state.userData.isProject == 0 ? true : false}
                            />
                        </View>
                    </View>
                    {this.state.otsDocArr.length > 0 ?
                        null
                        :
                        <View style={{ marginTop: 25 }}>
                            <DropdownInputBox
                                selectedValue={this.state.selectedDocumentObj.id ? this.state.selectedDocumentObj.id.toString() : "0"}
                                data={this.state.documentArr}
                                onSelect={(value) => this._OnSelectDocument(value)}
                                headerText={"Document Type*"}
                                selectedText={this.state.selectedUnitObj.name ? this.state.selectedUnitObj.name : "Unit"}
                                selectedTextColor={this.state.selectedUnitObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                                isBackButtonPressRequired={true}
                                isBackdropPressRequired={true}
                                isDisabled={this.state.imageNull ? true : false}
                            />
                        </View>
                    }

                    <View style={{ marginTop: 25 }}>
                        {this.state.otsDocArr.length > 0 ?
                            <React.Fragment>
                                {this.state.otsDocArr.map((otsObj, key) => (

                                    <View key={key}>
                                        <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                            <View style={styles.tauchableSec}>
                                                {otsObj.AssetPath.length == 0 ?
                                                    <View style={styles.imgUploadView}>
                                                        <Image source={ImageName.CAMERA_LOGO} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                                                    </View>
                                                    :
                                                    <View style={styles.imgUploadView}>
                                                        <Image source={{ uri: otsObj.AssetPath }} style={styles.imgUploadView} />
                                                    </View>
                                                }
                                            </View>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={styles.TakephotoText}>AssetType : <Text style={{ color: "#000", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: '5%' }}>{otsObj.AssetType}</Text></Text>
                                                <Text style={styles.TakephotoText}>Created On : {otsObj.CreatedOn}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </React.Fragment>
                            :
                            <React.Fragment>
                                {this.state.docArr.map((obj, key1) => (
                                    <View key={key1}>
                                        <React.Fragment>
                                            <View style={{ flexDirection: "row" }}>
                                                {this.state.otsDocArr.length > 0 ?
                                                    null
                                                    :
                                                    <React.Fragment>
                                                        <View style={{ flex: 0.4 }}>

                                                            <Text style={styles.TakephotoText}>{obj.assetType}</Text>

                                                        </View>
                                                        <View style={{ flex: 0.4, justifyContent: "center", alignItems: "center" }}>
                                                            <TouchableOpacity style={styles.removeBtn} onPress={() => this._onRemovePhoto(key1)} activeOpacity={0.9}>
                                                                <Text style={styles.TakeRemoveText}>Remove</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </React.Fragment>
                                                }
                                            </View>
                                            <View style={{ marginTop: 15 }}>
                                                <TouchableOpacity style={styles.tauchableSec} onPress={() => this.onSelectPhoto(obj, key1)}
                                                    activeOpacity={0.9}>
                                                    <View style={styles.imgUploadView}>
                                                        {obj.imgLoader ?
                                                            <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                                                            :
                                                            <Image source={obj.imageName.length == 0 ? ImageName.CAMERA_LOGO : { uri: App_uri.IMAGE_VIEW_URI + obj.imageName }} style={obj.imageName.length == 0 ? { height: 40, width: 40, resizeMode: 'contain' } : styles.imgUploadView} />
                                                        }
                                                    </View>
                                                </TouchableOpacity>

                                                {obj.assetTypeId == 4 ?
                                                    <View style={{ marginVertical: 20 }}>
                                                        <TextInputBox
                                                            placeholder={"Add Document Info*"}
                                                            value={this.state.docInfoText}
                                                            height={45}
                                                            onChangeText={(value) => this._onDocInfo(value, key1)}
                                                            isActive={this.state.docInfoActive}
                                                            onFocus={() => { this.setState({ docInfoActive: true }) }}
                                                            onBlur={() => { this.setState({ docInfoActive: false }) }}

                                                        />
                                                    </View>
                                                    :
                                                    null
                                                }
                                            </View>
                                        </React.Fragment>

                                    </View>
                                ))
                                }
                            </React.Fragment>
                        }
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextInputBox
                            multiline={true}
                            placeholder={"Remarks*"}
                            value={this.state.descriptionNotes}
                            height={115}
                            onChangeText={(value) => this._onDescriptionNotes(value)}
                            keyboardType="default"
                            isActive={this.state.descriptionNotesActive}
                            onFocus={() => { this.setState({ descriptionNotesActive: true }) }}
                            onBlur={() => { this.setState({ descriptionNotesActive: false }) }}
                            blurOnSubmit={false}
                            alignItems='flex-start'
                            editable={this.state.otsDocArr.length > 0 ? false : true}
                        />
                    </View>
                    {this.state.listDataLoader ?
                        <View style={{ height: Dimension.height / 1.2, justifyContent: "center", alignItems: "center" }}>
                            <Loader />
                        </View> :
                        <React.Fragment>
                            {this.state.otsDocArr.length > 0 ?
                                null
                                :
                                <View style={{ marginHorizontal: '15%', marginTop: 25 }}>
                                    <BigTextButton
                                        height={40}
                                        borderRadius={16}
                                        backgroundColor={"#3168ff"}
                                        text={"Submit"}
                                        onPress={() => this._onSubmit()}
                                        isDisabled={this.state.imageLoader}
                                    />
                                </View>
                            }

                        </React.Fragment>

                    }
                </View>
                <View style={{ marginBottom: 50 }} />
            </ScrollView>


        )
    }



    listHeaderSection = () => {
        return (
            <View>
                <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={CustomStyle.backButtonView} onPress={() => this._onBack()}>
                            <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
                        </TouchableOpacity>
                        <View style={CustomStyle.headerTextView}>
                            <Text style={CustomStyle.headerText}>Order Details</Text>
                        </View>
                        <View style={CustomStyle.backButtonView} />
                    </View>
                </View>
                <View style={styles.headerActionArea}>
                    <View style={styles.filter_action_btn}>
                        {/* <TouchableOpacity
                            style={styles.filterBtn}
                            activeOpacity={0.8}
                            onPress={() => this.onFilterOpenAndClose()}
                        >
                            <Image source={ImageName.FILTER_LOGO} style={styles.filterImg} />
                        </TouchableOpacity> */}
                        <View>
                            {/* {this._TooltipAction()} */}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        if (this.state.cameraVisible) {
            return <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
        } else {
            return (
                <SafeAreaView>
                    {this.state.listDataLoader ?
                        <View style={{ height: Dimension.height, justifyContent: "center", alignItems: "center" }}>
                            <Loader />
                        </View>
                        : <React.Fragment>
                            {this.listHeaderSection()}
                            {this.listSection()}
                        </React.Fragment>}
                </SafeAreaView>
            );
        }
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateUserInformation,
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
