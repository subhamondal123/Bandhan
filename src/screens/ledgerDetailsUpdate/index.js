import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomStyle } from "../style";
import { Color, FontFamily, ImageName } from "../../enums";
import styles from "./style";
import {
  BigTextButton,
  CheckBox,
  CustomCamera,
  ImageUploadModal,
  TextInputBox,
} from "../../shared";
import { DataValidator } from "../../validators";
import {
  DateConvert,
  FileDownload,
  FileUpload,
  Toaster,
} from "../../services/common-view-function";
import {
  MiddlewareCheck,
  MiddlewareFileCheck,
} from "../../services/middleware";
import { ErrorCode } from "../../services/constant";
import { App_uri } from "../../services/config";
import { ExpandableTextView } from "../../pageShared";
import { validateData } from "./function";
// this is deatails page
export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmedAmt: "",
      confirmedAmtActive: false,
      visiblePhotoModal: false,
      cameraVisible: false,
      docRaw: "",
      docName: "",
      docMainName: "",
      remark: "",
      remarkActive: false,
      cameraLoader: false,
      selectCheckbox: true,
      selectAgreeCheckbox: true,
      selectDisAgreeCheckbox: false,
      selectBottomCheckbox: false,
    };
  }
  // this is initial function which is call first
  componentDidMount() {
    this.setState({
      docName: this.props.route.params.data.uplodedDocByCustomer,
      confirmedAmt:
        this.props.route.params.data.approvedStatus == 1
          ? this.props.route.params.data.pendingAmntByCompany.toString()
          : this.props.route.params.data.pendingAmntByCustomer.toString(),
      selectAgreeCheckbox:
        this.props.route.params.data.approvedStatus == 1 ? true : false,
      selectDisAgreeCheckbox:
        this.props.route.params.data.approvedStatus == 1 ? false : true,
    });
  }

  // this function used for navigate to previous screen
  _onBack = () => {
    this.props.navigation.goBack();
  };
  // this function used for list header section
  listHeaderSection = () => {
    return (
      <View style={styles.listHeadMain}>
        <View style={styles.listHeadSubMain}>
          <TouchableOpacity
            style={CustomStyle.backButtonView}
            onPress={() => this._onBack()}
          >
            <Image source={ImageName.BACK_IMG} style={CustomStyle.backImg} />
          </TouchableOpacity>
          <View style={[CustomStyle.headerTextView, { top: 5 }]}>
            <Text style={CustomStyle.headerText}>Ledger Confirmation</Text>
            <Text style={styles.headerSubText}>
              Balance as on{" "}
              <Text style={styles.balanceAsonTxt}>
                {this.props.route.params.data.ledgerAddDate}
              </Text>
            </Text>
          </View>
          <View style={CustomStyle.backButtonView} />
        </View>
      </View>
    );
  };
  // for design mentioned by srmb section
  mentionedBySrmb = () => {
    const onDownload = async () => {
      await FileDownload.downloadDocument(
        App_uri.CRM_BASE_URI + this.props.route.params.data.uplodedDocByCompany
      );
    };
    return (
      <View style={styles.mentionSecMain}>
        <View style={styles.srmbTxtSec}>
          <Text style={styles.titleText}>{"  SRMB"}</Text>
        </View>
        <View>
          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <Text style={styles.labelTxt}>
              {"Amount                      :"}
            </Text>
            <View style={{ width: 30 }} />
            <View style={styles.amntBySec}>
              <Text style={styles.labelValTxt}>
                {"\u20B9" +
                  " " +
                  this.props.route.params.data.pendingAmntByCompany}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <Text style={styles.labelTxt}>{"Creation Date           :"}</Text>
            <View style={{ width: 30 }} />
            <Text style={styles.labelValTxt}>
              {this.props.route.params.data.ledgerAddDate}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={[styles.labelTxt, { fontWeight: "600", fontSize: 15 }]}
            >
              {"Attached Ledger Docs"}
            </Text>
            <View style={{ height: 5 }} />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0.7 }}>
                <Text style={styles.labelValTxt}>
                  {this.props.route.params.data.uplodedDocByCompany.substring(
                    8
                  )}
                </Text>
              </View>
              <View style={{ flex: 0.2 }} />
              <TouchableOpacity
                style={{ alignItems: "flex-end" }}
                activeOpacity={0.8}
                onPress={() => onDownload()}
              >
                <Image
                  source={ImageName.DOWNLOAD_ICON}
                  style={{ height: 26, width: 26, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  // for take camera photo
  _onTakePhoto = async () => {
    this.state.visiblePhotoModal = !this.state.visiblePhotoModal;
    this.setState({
      visiblePhotoModal: this.state.visiblePhotoModal,
    });
  };

  // for upload img with api call
  _onImageUpload = async (uploadData) => {
    this.setState({
      listLoader: true,
      // imageLoader: true,
      imgName: uploadData.name,
      imgUri: uploadData.name,
    });
    this.setState({ cameraLoader: true });
    let imgData = await MiddlewareFileCheck(
      "crmImageupload",
      uploadData,
      this.props
    );
    if (imgData === false) {
      this._onNetworkError();
    } else {
      if (imgData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        this.state.docName = imgData.response.fileName;
        this.state.docRaw = uploadData.uri;
        this.state.docMainName = imgData.response.orgfilename;
        this.setState({
          docName: this.state.docName,
          docRaw: this.state.docRaw,
        });
      }
    }
    this.setState({ cameraLoader: false });
  };
  // for visible image upload model
  modalSection = () => {
    //for image picker
    const _onChooseGallery = async () => {
      await this._onTakePhoto();
      let uploadData = await FileUpload.uploadDocumentAndImage();
      await this._onImageUpload(uploadData);
    };

    // get photo from camera
    const _onChooseCamera = async () => {
      // await this._onTakePhoto();
      // let uploadData = await FileUpload.uploadCameraImg();
      // await _onImageUpload(uploadData);
      this.setState({ cameraVisible: true });
    };

    return (
      <ImageUploadModal
        isVisible={this.state.visiblePhotoModal}
        onGallerySelect={(value) => _onChooseGallery(value)}
        onCameraSelect={(value) => _onChooseCamera(value)}
        onCloseModal={(value) => this._onTakePhoto(value)}
      />
    );
  };
  // for design from party section
  fromPartySec = () => {
    const _onChangeAmount = (value) => {
      let txt = DataValidator.inputEntryValidate(value, "number");
      this.setState({
        confirmedAmt: txt,
      });
    };

    const onRemoveDoc = () => {
      this.setState({ docName: "" });
    };
    return (
      <View style={styles.fromSecMain}>
        <View style={styles.custErpTxtSec}>
          <Text style={styles.titleText}>
            {" "}
            {this.props.route.params.data.customerName}
          </Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.titleText}>
            {this.props.route.params.data.ERPCode}{" "}
          </Text>
        </View>
        <View>
          <View style={styles.inputSec}>
            <Text style={styles.labelTxt}>{"Amount Confirmed  :"}</Text>
            <View style={{ width: 10 }} />
            <View style={{ flex: 1 }}>
              <TextInputBox
                borderRadius={30}
                value={this.state.confirmedAmt}
                onChangeText={(value) => _onChangeAmount(value)}
                placeholder={"Amount"}
                keyboardType={"number-pad"}
                isActive={this.state.confirmedAmtActive}
                onFocus={() => {
                  this.setState({ confirmedAmtActive: true });
                }}
                onBlur={() => {
                  this.setState({ confirmedAmtActive: false });
                }}
                height={40}
                returnKeyType={"default"}
                fontSize={14}
                editable={this.state.selectAgreeCheckbox ? false : true}
              />
            </View>
          </View>
          <View style={styles.btnLoadSec}>
            <View style={{ flex: 0.55 }}>
              <Text style={styles.labelTxt}>{"Attach Ledger Doc :"}</Text>
            </View>
            <View style={{ width: 10 }} />
            {/* <View style={{ flex: 1 }}> */}
            <View style={{ flex: 0.45 }}>
              {this.state.docName.length == 0 ? (
                <>
                  {this.state.cameraLoader ? (
                    <View style={styles.loaderSec}>
                      <ActivityIndicator size={"small"} />
                    </View>
                  ) : (
                    <BigTextButton
                      text={"Upload"}
                      borderRadius={25}
                      backgroundColor={Color.COLOR.BLUE.DARK_BLUE}
                      fontSize={13}
                      height={40}
                      onPress={() => this._onTakePhoto()}
                    />
                  )}
                </>
              ) : (
                <View style={styles.removeTabSec}>
                  <Text style={styles.docTxt}>
                    {this.state.docName.substring(8)}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onRemoveDoc()}
                  >
                    <Image
                      source={ImageName.RED_CLOSE_IMG}
                      style={styles.redCloseImg}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  // for custom camera open
  onSelectPic = async (value) => {
    await this._onTakePhoto(false);
    await this._onImageUpload(value);
  };
  // for design check box section
  checkBoxSec = () => {
    const onClickSelectAgreeCheckBox = (value) => {
      let propdata =
        this.props.route.params.data.pendingAmntByCompany.toString();
      this.setState({
        selectDisAgreeCheckbox: false,
        selectAgreeCheckbox: true,
        confirmedAmt: propdata,
      });
    };

    const onClickSelectDisAgreeCheckBox = (value) => {
      this.setState({
        selectDisAgreeCheckbox: true,
        selectAgreeCheckbox: false,
        confirmedAmt: "",
      });
    };
    return (
      <View style={styles.checkSecMain}>
        <ExpandableTextView
          additionalTextStyle={{ fontSize: 13 }}
          data={
            "This is to inform that the above mentioned amount has been appearing in your name as per our books of account.A copy of the statement is enclosed herewith for your reference.You are kindly requested to confirm the above balance within15 days from the date of receipt of this information.In case of non-receipt of confirmation within the given period,we will treat the same balance as reflected in our books of accounts.If there is any discrepancy in the accounts, please inform accordingly with supporting documents so that corrective actions can be taken."
          }
        />
        <View style={styles.checkBoxSec}>
          <View style={{ marginRight: 10 }}>
            <CheckBox
              type="tick"
              borderRadius={5}
              data={this.state.selectAgreeCheckbox}
              onClickValue={() =>
                onClickSelectAgreeCheckBox(this.state.selectAgreeCheckbox)
              }
              image={ImageName.TICK_MARK_IMG}
              additionalImgStyle={{ height: 15, width: 15 }}
            />
          </View>
          <Text style={styles.checkBoxTxt}>Agree</Text>
          <View style={{ width: 50 }} />
          <View style={{ marginRight: 10 }}>
            <CheckBox
              type="tick"
              borderRadius={5}
              data={this.state.selectDisAgreeCheckbox}
              onClickValue={() =>
                onClickSelectDisAgreeCheckBox(this.state.selectDisAgreeCheckbox)
              }
              image={ImageName.TICK_MARK_IMG}
              additionalImgStyle={{ height: 15, width: 15 }}
            />
          </View>
          <Text style={styles.checkBoxTxt}>Disagree</Text>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: Color.COLOR.GRAY.GRAY_TINTS,
            marginTop: 15,
          }}
        />
      </View>
    );
  };
  // for design check box bottom section
  checkBoxBottomSec = () => {
    const onClickSelectCheckBox = () => {
      this.setState({ selectBottomCheckbox: !this.state.selectBottomCheckbox });
    };
    return (
      <View style={styles.checkBoxBottomMain}>
        <View style={{ top: 6 }}>
          <CheckBox
            type="tick"
            borderRadius={5}
            data={this.state.selectBottomCheckbox}
            onClickValue={() =>
              onClickSelectCheckBox(this.state.selectBottomCheckbox)
            }
            image={ImageName.TICK_MARK_IMG}
            additionalImgStyle={{ height: 15, width: 15 }}
          />
        </View>

        <View style={styles.expandableMain}>
          <ExpandableTextView
            additionalTextStyle={{ fontSize: 13 }}
            maxLength={200}
            data={
              "I / We hereby confirm the above mentioned balance appearing in your books of account subject to the below mentioned discrepancy(if any)"
            }
          />
        </View>
      </View>
    );
  };
  // for design remark section
  remarkSec = () => {
    const _onChange = (value) => {
      this.setState({ remark: value });
    };
    return (
      <View style={{ marginTop: 15 }}>
        <TextInputBox
          borderRadius={25}
          value={this.state.remark}
          onChangeText={(value) => _onChange(value)}
          placeholder={"Remarks"}
          keyboardType={"default"}
          isActive={this.state.remarkActive}
          onFocus={() => {
            this.setState({ remarkActive: true });
          }}
          onBlur={() => {
            this.setState({ remarkActive: false });
          }}
          height={90}
          returnKeyType={"default"}
          fontSize={12}
          multiline={true}
          maxLength={200}
          alignItems={"flex-start"}
        />
      </View>
    );
  };

  buttonSec = () => {
    const onUpdate = async () => {
      let dataReq = {
        amountAddedByCustomer: this.state.confirmedAmt,
        uplodedDocpathByCustomer: this.state.docName,
        ledgerId: this.props.route.params.data.ledgerId,
        approvedStatus:
          this.state.selectAgreeCheckbox ||
          this.state.selectDisAgreeCheckbox == false
            ? "1"
            : "2",
        acknowledge: this.state.selectBottomCheckbox,
        approvedDatetime: DateConvert.fullDateFormat(new Date()),
        remarks: this.state.remark,
      };

      if (validateData(dataReq).status) {
        let responseData = await MiddlewareCheck(
          "updateLedgerStatusByCustomer",
          dataReq,
          this.props
        );
        if (responseData === false) {
        } else {
          if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            this.props.navigation.goBack();
            this.props.route.params.onRefresh();
            Toaster.ShortCenterToaster(responseData.message);
          }
        }
      }
    };
    return (
      <View style={{ marginTop: 25, marginHorizontal: 45 }}>
        <BigTextButton
          text={"Submit"}
          backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
          borderRadius={25}
          onPress={() => onUpdate()}
        />
      </View>
    );
  };
  // this is main render to this page
  render() {
    if (this.state.cameraVisible) {
      return (
        <CustomCamera
          isVisible={this.state.cameraVisible}
          onCloseCamera={(value) => this.setState({ cameraVisible: value })}
          picData={(value) => this.onSelectPic(value)}
        />
      );
    } else {
      return (
        <SafeAreaView style={CustomStyle.container}>
          {this.listHeaderSection()}
          <View style={{ paddingTop: 20 }}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                {this.mentionedBySrmb()}
                {this.checkBoxSec()}
                {this.fromPartySec()}
                {this.checkBoxBottomSec()}
                {this.remarkSec()}
                {this.buttonSec()}
              </View>
              <View style={{ height: 100 }} />
            </ScrollView>
          </View>
          {this.modalSection()}
        </SafeAreaView>
      );
    }
  }
}
