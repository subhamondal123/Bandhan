import React from "react";
import { Color, Dimension, ImageName } from "../../../../enums";
import {
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,

} from "react-native";
import { stateCheckForNetwork } from "../../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CustomCamera, DropdownInputBox, ImageUploadModal, Loader, TextInputBox } from "../../../../shared";
import { CommonData, ErrorCode, LengthValidate } from "../../../../services/constant";
import styles from "./style";
import BigTextButton from "../../../../shared/big-text-button";
import { FileUpload, GetUserData, StorageDataModification, Toaster } from "../../../../services/common-view-function";
import { MiddlewareCheck, MiddlewareFileCheck, StoreUserOtherInformations } from "../../../../services/middleware";
import { DataValidator } from "../../../../validators";
import { modifyBrandArr, modifyBrandNameArr, modifyBrandTypeArr, modifyUnitArr, validateData } from "./function";

// this is new entry list page 
class NewEntryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listLoader: true,
            imageLoader: false,
            listDataLoader: true,
            visiblePhotoModal: false,

            brandNameArr: [],
            selectedBrandNameObj: {},

            brandTypeArr: [],
            selectedBrandTypeObj: {},

            unitArr: [],
            selectedUnitObj: {},
            descriptionNotes: "",
            descriptionNotesActive: false,
            quantity: "",
            quantityActive: false,
            unit: "",
            imgName: "",
            imgUri: "",
            userData: "",

            allImages: [],
            allImgShow: [],
            propData: {},
            cameraVisible: false

        };
    }
    // this is initial function which is call first 
    componentDidMount() {
        this._load();
        StoreUserOtherInformations("", {}, this.props);

    }
    // this is first first function where set state data
    _load = async () => {
        this._apiCallRes();
        this.setState({
            userData: await GetUserData.getAllUserData()
        })
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }
    // this is function used for fetching data 
    _apiCallRes = async () => {
        this.setState({ refreshing: false, });

        await this.getBrandDropdownData();
        await this.getBrandTypeData();
        await this.getUnitData();

        this.setState({
            listLoader: false,
            listDataLoader: false
        })
    }
    // this function used for back to previous page 
    _onBack = () => {
        this.props.navigation.goBack();
    };
    // for modify image data 
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
    // for fetching brand type data 
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
    // foe fetching brand drop down data 
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
    // for fetching unit data 
    getUnitData = async () => {
        this.setState({ listDataLoader: true });
        let responseData = await MiddlewareCheck("unitDropdownData", {}, this.props);
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
    // this function used for visible image upload modal section  
    _imageUploadModalSection = () => {
        const OnChooseGallery = async () => {
            let uploadData = await FileUpload.uploadImg();
            await this._onImageUpload(uploadData);
            await this._onTakePhoto(false)
        }
        const OnChooseCamera = async () => {
            // let uploadData = await FileUpload.uploadCameraImg();
            // await this.ImageUploadApiCall(uploadData);
            this.setState({ cameraVisible: true });
        }

        return (
            <ImageUploadModal
                isVisible={this.state.visiblePhotoModal}
                onGallerySelect={(value) => OnChooseGallery(value)}
                onCameraSelect={(value) => OnChooseCamera(value)}
                onCloseModal={(value) => this._onTakePhoto(value)}
            />
        )
    }
    // this function used for select gallery picture 
    onSelectPic = async (value) => {
        await this._onTakePhoto(false);
        await this._onImageUpload(value);
    }
    // this function used for upload imaage 
    _onImageUpload = async (uploadData) => {
        this.setState({
            listLoader: true,
            // imageLoader: true,
            imgName: uploadData.name,
            imgUri: uploadData.name,
        })
        this.setState({ imageLoader: true, })
        let responseData = await MiddlewareFileCheck("imageupload", uploadData, this.props);
        if (responseData == false) {
        } else {
            if (responseData.error == ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                let data = [
                    {
                        "images": responseData.data.filename,
                        "imagePath": uploadData.uri
                    }
                ]
                this.setState({
                    allImages: [...this.state.allImages, ...data]
                })
                this._modifyImgShowingArr();
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                // Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ imageLoader: false, })

    }
    // this function used for take camera photo 
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

    _onSubmit = async () => {
        let data = await StorageDataModification.userCredential({}, "get")
        let allImg = this.state.allImages;
        let imageArr = [];
        for (let i = 0; i < this.state.allImgShow.length; i++) {
            imageArr.push("/images/" + allImg[i].images)
        }

        let reqData = {
            "brandImage": imageArr,
            "fieldVisitId": "0",
            "requestNo": "",
            "stateId": this.state.userData.stateId,
            "districtId": this.state.userData.districtId,
            "zoneId": this.state.userData.zoneId,
            "customerId": this.state.propData.customerId,
            "brandingTypeId": this.state.selectedBrandTypeObj.id ? this.state.selectedBrandTypeObj.id : "",
            "productId": this.state.selectedBrandNameObj.id ? this.state.selectedBrandNameObj.id : "",
            "remarks": this.state.descriptionNotes,
            "allocatedQty": this.state.quantity,
            "unit": this.state.selectedUnitObj.id ? this.state.selectedUnitObj.id : "",
            "unitRate": "0",
            "totalAmount": "0",
            "status": "",
            "userId": "0"
        }
        let validatedData = validateData(reqData);
        if (validatedData.status) {
            this.setState({ listDataLoader: true })
            let responseData = await MiddlewareCheck("addBrandRequisition", reqData, this.props)
            if (responseData == false) {
                Toaster.ShortCenterToaster(responseData.message)
            } else {
                if (responseData.error == ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
                    Toaster.ShortCenterToaster(responseData.data.message)
                    this.props.onSaveDataToParent({ pageNum: 2 })
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ listDataLoader: false })
        }
    }
    // this function used for design list section
    listSection = () => {
        return (

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {this._imageUploadModalSection()}
                <View style={{ marginTop: 15 }}>
                    <DropdownInputBox
                        selectedValue={this.state.selectedBrandTypeObj.id ? this.state.selectedBrandTypeObj.id.toString() : "0"}
                        data={this.state.brandTypeArr}
                        onSelect={(value) => this._OnSelectBrandType(value)}
                        headerText={"Branding Type"}
                        selectedText={this.state.selectedBrandTypeObj.name ? this.state.selectedBrandTypeObj.name : "Brand Type"}
                        selectedTextColor={this.state.selectedBrandTypeObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                        isBackButtonPressRequired={true}
                        isBackdropPressRequired={true}
                    />
                    <View style={{ marginTop: 20 }}>
                        <DropdownInputBox
                            selectedValue={this.state.selectedBrandNameObj.id ? this.state.selectedBrandNameObj.id.toString() : "0"}
                            data={this.state.brandNameArr}
                            onSelect={(value) => this._OnSelectBrandingName(value)}
                            headerText={"Brand Name"}
                            selectedText={this.state.selectedBrandNameObj.name ? this.state.selectedBrandNameObj.name : "Brand Name"}
                            selectedTextColor={this.state.selectedBrandNameObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                        />
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <TextInputBox
                            multiline={true}
                            placeholder={"Item Description & Note"}
                            value={this.state.descriptionNotes}
                            height={115}
                            onChangeText={(value) => this._onDescriptionNotes(value)}
                            keyboardType="default"
                            maxLength={LengthValidate.VALIDATIONS.DESCRIPTINON_MAX}
                            isActive={this.state.descriptionNotesActive}
                            onFocus={() => { this.setState({ descriptionNotesActive: true }) }}
                            onBlur={() => { this.setState({ descriptionNotesActive: false }) }}
                            blurOnSubmit={false}
                            alignItems='flex-start'
                        />
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <TextInputBox
                            placeholder={"Quantity"}
                            value={this.state.quantity}
                            height={45}
                            onChangeText={(value) => this._onQuantity(value)}
                            keyboardType="numeric"
                            isActive={this.state.quantityActive}
                            onFocus={() => { this.setState({ quantityActive: true }) }}
                            onBlur={() => { this.setState({ quantityActive: false }) }}
                            maxLength={LengthValidate.VALIDATIONS.MOBILE_MIN}
                        />
                    </View>
                    <View style={{ marginTop: 25 }}>

                        <DropdownInputBox
                            selectedValue={this.state.selectedUnitObj.id ? this.state.selectedUnitObj.id.toString() : "0"}
                            data={this.state.unitArr}
                            onSelect={(value) => this._OnSelectUnit(value)}
                            headerText={"Unit"}
                            selectedText={this.state.selectedUnitObj.name ? this.state.selectedUnitObj.name : "Unit"}
                            selectedTextColor={this.state.selectedUnitObj.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                        />
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <Text style={styles.TakephotoText}>Take Photo</Text>
                        {this.state.allImgShow.length == 0 ?
                            <React.Fragment>
                                <View style={styles.takePicContain}>
                                    <TouchableOpacity style={styles.tauchableSec} onPress={() => this._onTakePhoto()}
                                        activeOpacity={0.9}>
                                        <View style={styles.imgUploadView}>
                                            <Image source={ImageName.CAMERA_LOGO} style={styles.cameraLogo} />
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            </React.Fragment> :
                            <React.Fragment>
                                {this.state.allImgShow.map((item, key) => (
                                    <React.Fragment key={key}>
                                        <View style={styles.mainView}>
                                            <View style={styles.mainImageView}>
                                                {item.map((item1, key1) => (
                                                    <React.Fragment key={key1}>
                                                        <View style={styles.flexANdMarginView}>
                                                            <View style={styles.logisticImageView}>
                                                                <Image source={{ uri: item1.imagePath }} style={styles.TakephotoImg} />
                                                                <View style={styles.closeContain}>
                                                                    <TouchableOpacity style={styles.crossBtnImg} onPress={() => this._onClose(item1, key1)}
                                                                        activeOpacity={0.9}>
                                                                        <Image style={styles.crossImg} source={ImageName.WHITE_CROSS} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </React.Fragment>
                                                ))}
                                            </View>
                                        </View>

                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                            // ))
                        }
                        {this.state.imageLoader ?
                            <View style={styles.loaderContain}>
                                <ActivityIndicator size="large" color={Color.COLOR.BLUE.BULE_LIGHT_CUSTOMER} />
                            </View>
                            :
                            <>
                                {this.state.allImgShow.length == 0 ?
                                    null : (
                                        <React.Fragment>
                                            <TouchableOpacity style={styles.addImgField} activeOpacity={0.9} onPress={() => this._onTakePhoto()}>
                                                <View style={styles.addImg}>
                                                    <Image source={ImageName.WHITE_PLUS} style={styles.addImgIcon} />
                                                </View>
                                            </TouchableOpacity>
                                        </React.Fragment>
                                    )}
                            </>
                        }

                    </View>
                    {this.state.listDataLoader ?
                        <View style={styles.listLoader}>
                            <Loader />
                        </View> :
                        <View style={{ marginHorizontal: '15%', marginTop: 25 }}>
                            <BigTextButton
                                text={"Submit"}
                                onPress={() => this._onSubmit()}
                                isDisabled={this.state.imageLoader}
                            />
                        </View>
                    }
                </View>
                <View style={{ marginBottom: 200 }} />
            </ScrollView>


        )
    }

    // this is main render to this page 
    render() {
        if (this.state.cameraVisible) {
            return <CustomCamera isVisible={this.state.cameraVisible} onCloseCamera={(value) => this.setState({ cameraVisible: value })} picData={(value) => this.onSelectPic(value)} />
        } else {
            return (
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View>
                        {this.state.listDataLoader ?
                            <View style={styles.listLoader}>
                                <Loader />
                            </View>
                            : <React.Fragment>
                                {this.listSection()}
                            </React.Fragment>}
                    </View>
                </KeyboardAvoidingView>
            );
        }
    }
}

const mapStateToProps = (state) => {
    const { CustomerAction } = state;
    return { CustomerAction };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(NewEntryList);
