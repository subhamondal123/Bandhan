import React from "react";
import { Color, Dimension, ImageName } from "../../enums";
import styles from "./Style";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import {
  stateCheckForNetwork,
  stateUserInformation,
} from "../../redux/CustomerAction";
import { ErrorCode } from "../../services/constant";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ImageUploadModal, Loader, Modal } from "../../shared";
import {
  DateConvert,
  FileUpload,
  Toaster,
} from "../../services/common-view-function";
import {
  MiddlewareCheck,
  MiddlewareFileCheck,
} from "../../services/middleware";
import { App_uri } from "../../services/config";
import { CustomStyle } from "../style";
import { DistZoneStateViewModal } from "../../pageShared";
import { modifyResData } from "./Function";

// this is profile page
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePhotoModal: false,
      profileImgLoader: false,
      imageUrl: "",
      userInfoData: {},
      imageName: "",
      pageLoader: true,

      zoneDistDetailsModal: false,
      modalDataType: "state",
    };
  }

  // set the initial data
  _onSetInitialStateData = async () => {
    this.setState({
      pageLoader: true,
    });
  };
  // this is initial function which is call first
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      await this._onSetInitialStateData();
      this._load();
    });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  // for visible details modal
  _detailsModal = () => {
    this.setState({
      detailsModal: !this.state.detailsModal,
    });
  };
  // for navigate to back screen
  _onBack = () => {
    this.props.navigation.goBack();
  };
  // for get user info data from api
  _getUserInfoFromApi = async () => {
    let responseData = await MiddlewareCheck(
      "getCustomerProfileDetails",
      {},
      this.props
    );
    if (responseData) {
      if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.setState({
          userInfoData: modifyResData(responseData.response[0]),
        });
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };
  // this is first function where set state data
  _load = async () => {
    await this._getUserInfoFromApi();
    this.setState({
      imageName: this.state.userInfoData.profileImgUrl
        ? this.state.userInfoData.profileImgUrl
        : "",
      pageLoader: false,
    });
  };

  _onDistZoneDetailsModal = (value) => {
    this.setState({
      zoneDistDetailsModal: !this.state.zoneDistDetailsModal,
    });

    if (value !== undefined || value !== null) {
      this.state.modalDataType = value;
      this.setState({
        modalDataType: this.state.modalDataType,
      });
    }
  };
  // for visible image upload modal
  modalSection = () => {
    return (
      <>
        <ImageUploadModal
          isVisible={this.state.visiblePhotoModal}
          onGallerySelect={(value) => this._onChooseGallery(value)}
          onCameraSelect={(value) => this._onChooseCamera(value)}
          onCloseModal={(value) => this._onTakePhoto(value)}
        />
        {this.state.zoneDistDetailsModal ? (
          <DistZoneStateViewModal
            isVisible={this.state.zoneDistDetailsModal}
            data={
              this.state.modalDataType == "state"
                ? this.state.userInfoData.stateName
                : this.state.modalDataType == "district"
                ? this.state.userInfoData.districtName
                : this.state.modalDataType == "zone"
                ? this.state.userInfoData.zoneName
                : ""
            }
            headerText={
              this.state.modalDataType == "state"
                ? "All States"
                : this.state.modalDataType == "district"
                ? "All Districts"
                : this.state.modalDataType == "zone"
                ? "All Zones"
                : ""
            }
            onCloseModal={() => this._onDistZoneDetailsModal()}
          />
        ) : null}
      </>
    );
  };

  // get photo from Gallery
  _onChooseGallery = async () => {
    await this._onTakePhoto();
    let uploadData = await FileUpload.uploadImg();
    await this._onImageUpload(uploadData);
  };

  // get photo from camera
  _onChooseCamera = async () => {
    await this._onTakePhoto();
    let uploadData = await FileUpload.uploadCameraImg();
    await this._onImageUpload(uploadData);
  };

  _onImageUpload = async (uploadData) => {
    this.setState({
      visiblePhotoModal: false,
      profileImgLoader: true,
      pageLoader: true,
      // imageName: uploadData.name,
    });

    let responseData = await MiddlewareFileCheck("imageupload", uploadData);
    if (responseData == false) {
    } else {
      if (responseData.error == ErrorCode.ERROR.ERROR.WITHOUT_ERROR) {
        await this._onSaveProfilePic(responseData);
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
    this.setState({ profileImgLoader: false, pageLoader: false });
  };
  // for save profile picture
  _onSaveProfilePic = async (imageUploadData) => {
    let responseData = await MiddlewareCheck("profilePicUpdate", {
      profilePic: imageUploadData.data.path + imageUploadData.data.filename,
    });
    if (responseData) {
      if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        let userInfo = this.props.Sales360Redux.userInfo;
        userInfo.details.profileImgUrl =
          imageUploadData.data.path + imageUploadData.data.filename;
        this.props.stateUserInformation(userInfo);
        this.setState({
          imageName: imageUploadData.data.path + imageUploadData.data.filename,
        });
        Toaster.ShortCenterToaster(responseData.message);
      } else {
        Toaster.ShortCenterToaster(responseData.message);
      }
    }
  };
  // for take photo on camera
  _onTakePhoto = async () => {
    this.state.visiblePhotoModal = !this.state.visiblePhotoModal;
    this.setState({
      visiblePhotoModal: this.state.visiblePhotoModal,
    });
  };
  // this is main render to this page
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.pageLoader ? (
          <View style={styles.loaderSec}>
            <Loader />
          </View>
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {this.modalSection()}
            <ImageBackground
              source={{ uri: App_uri.IMAGE_VIEW_URI + this.state.imageName }}
              style={styles.backgroundImg}
              blurRadius={5}
            >
              <TouchableOpacity
                style={styles.backImgTab}
                activeOpacity={0.9}
                onPress={() => this._onBack()}
              >
                <Image source={ImageName.BACK_IMG} style={styles.backImg} />
              </TouchableOpacity>
              <View style={styles.profileSec}>
                {this.state.profileImgLoader ? (
                  <View style={styles.activityLoaderSec}>
                    <ActivityIndicator
                      size="small"
                      color={Color.COLOR.BLUE.VIOLET_BLUE}
                    />
                  </View>
                ) : (
                  <React.Fragment>
                    <View style={styles.imgViewSec}>
                      <Image
                        source={{
                          uri: App_uri.IMAGE_VIEW_URI + this.state.imageName,
                        }}
                        style={styles.profileImg}
                      />
                    </View>
                    {/* <View style={styles.profileCameraView}>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() => this._onTakePhoto()}>
                                                <Image source={ImageName.CAMERA_LOGO} style={styles.profileCamera} />
                                            </TouchableOpacity>
                                        </View> */}
                    <View style={styles.profileUnselectCameraView} />
                  </React.Fragment>
                )}
              </View>
            </ImageBackground>
            <View style={styles.profileView}>
              <Text style={styles.profileName}>
                {this.state.userInfoData.name}
              </Text>
            </View>
            <View style={styles.mainView}>
              <View style={styles.textInputView}>
                <View style={styles.detailsMainView}>
                  <Text style={styles.headerText}>Name</Text>
                  <Text style={styles.subTextName}>
                    {this.state.userInfoData.customerName}
                  </Text>
                  <View
                    style={{
                      marginTop: 5,
                      borderWidth: 0.4,
                      borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
                    }}
                  />
                </View>
                <View style={styles.detailsMainView}>
                  <Text style={styles.headerText}>Email</Text>
                  <Text style={styles.subTextName}>
                    {this.state.userInfoData.email}
                  </Text>
                  <View
                    style={{
                      marginTop: 5,
                      borderWidth: 0.4,
                      borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
                    }}
                  />
                </View>
                <View style={styles.detailsMainView}>
                  <Text style={styles.headerText}>Phone No</Text>
                  <Text style={styles.subTextName}>
                    {this.state.userInfoData.phoneNumber}
                  </Text>
                  <View
                    style={{
                      marginTop: 5,
                      borderWidth: 0.4,
                      borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
                    }}
                  />
                </View>
                <View style={styles.detailsMainView}>
                  <Text style={styles.headerText}>Contact Type Name</Text>
                  <Text style={styles.subTextName}>
                    {this.state.userInfoData.contactTypeName}
                  </Text>
                  <View
                    style={{
                      marginTop: 5,
                      borderWidth: 0.4,
                      borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
                    }}
                  />
                </View>
                <View style={styles.detailsMainView}>
                  <Text style={styles.headerText}>Customer Business Name</Text>
                  <Text style={styles.subTextName}>
                    {this.state.userInfoData.custBusinessName}
                  </Text>
                  <View
                    style={{
                      marginTop: 5,
                      borderWidth: 0.4,
                      borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
                    }}
                  />
                </View>
                <View style={styles.detailsMainView}>
                  <Text style={styles.headerText}>State</Text>
                  <View style={styles.showAll1Sec}>
                    <View style={styles.stateNameSec}>
                      <Text numberOfLines={2} style={styles.subTextName}>
                        {this.state.userInfoData.stateName}
                      </Text>
                    </View>
                    <Text
                      style={styles.textShowMore}
                      onPress={() => this._onDistZoneDetailsModal("state")}
                    >
                      Show All
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      borderWidth: 0.4,
                      borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
                    }}
                  />
                </View>
                <View style={styles.detailsMainView}>
                  <Text style={styles.headerText}>District</Text>
                  <View style={styles.showAll2Sec}>
                    <View style={styles.distNameSec}>
                      <Text numberOfLines={2} style={styles.subTextName}>
                        {this.state.userInfoData.districtName}
                      </Text>
                    </View>
                    <Text
                      style={styles.textShowMore}
                      onPress={() => this._onDistZoneDetailsModal("district")}
                    >
                      Show All
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      borderWidth: 0.4,
                      borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
                    }}
                  />
                </View>
                <View style={styles.detailsMainView}>
                  <Text style={styles.headerText}>Zone</Text>
                  <View style={styles.showAll3Sec}>
                    <View style={styles.zoneNameSec}>
                      <Text numberOfLines={2} style={styles.subTextName}>
                        {this.state.userInfoData.zoneName}
                      </Text>
                    </View>
                    <Text
                      style={styles.textShowMore}
                      onPress={() => this._onDistZoneDetailsModal("zone")}
                    >
                      Show All
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      borderWidth: 0.4,
                      borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
                    }}
                  />
                </View>
                <View style={styles.detailsMainView}>
                  <Text style={styles.headerText}>Address</Text>
                  <Text style={styles.subTextName}>
                    {this.state.userInfoData.address}
                  </Text>
                  <View
                    style={{
                      marginTop: 5,
                      borderWidth: 0.4,
                      borderColor: Color.COLOR.GRAY.PHILIPPINE_GRAY,
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )}
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
      stateCheckForNetwork,
      stateUserInformation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
