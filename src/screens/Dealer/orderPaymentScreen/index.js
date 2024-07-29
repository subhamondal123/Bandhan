import React from "react";
import { Image, SafeAreaView, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, CheckBox, ImageViewModal, TextInputBox, VirtualizedView } from "../../../shared";
import { DataValidator } from "../../../validators";
import { DateConvert, FileDownload, FileUpload, Toaster } from "../../../services/common-view-function";
import { modifyPaymentHistoryList, validateData } from "./function";
import { MiddlewareCheck, MiddlewareFileCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { App_uri } from "../../../services/config";

let boxData = [
    {
        id: 1,
        text: 'Cash',
        image: ImageName.PURSE_ICON,
        check: false
    },
    {
        id: 2,
        text: 'Upi',
        image: ImageName.UPI_LOGO,
        check: false

    },
    {
        id: 3,
        text: 'Net Banking',
        image: ImageName.CHEQUE_LOGO,
        check: false

    },
    {
        id: 4,
        text: 'Cheque',
        image: ImageName.CHEQUE_LOGO,
        check: false

    },
    {
        id: 5,
        text: 'Demand Draft',
        image: ImageName.UPI_LOGO,
        check: false

    },
    {
        id: 6,
        text: 'Credit card',
        image: ImageName.CARD_LOGO,
        check: false

    },
    {
        id: 7,
        text: 'Debit card',
        image: ImageName.CARD_LOGO,
        check: false

    },
    {
        id: 8,
        text: 'Other',
        image: ImageName.UPI_LOGO,
        check: false

    }
]

const checkBoxArr = [
    {
        id: 0,
        name: 'Due',
        check: true
    },
    {
        id: 1,
        name: 'Full Pay',
        check: false

    },
    {
        id: 2,
        name: 'Partial Pay',
        check: false

    },
]
// this is order payment history page 
class OrderPaymentHistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentHistory: [],
            totalDataCount: "",
            paymentCheck: false,
            paidAmount: "",
            paidAmountActive: false,
            paymentMode: boxData,
            commentText: "",
            selectPaymentmode: {},
            selectPaymentStatus: "0",
            imgName: "",
            imgUri: "",
            docLoader: false,
            documentImg: "",
            paymentHistoryLoader: false,
            updatePaymentLoader: false,
            imageModalVisibility: false,
            totalBillAmount: 0
        };
    }
    // this is a initial function which is call first 
    componentDidMount = async () => {
        await this._load();
    }
    // this is first function where set state data 
    _load = async () => {
        this.setState({ paymentHistoryLoader: true });
        let responseData = await MiddlewareCheck("paymentHistory", { orderNumber: this.props.route.params.data.recordNumber }, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let paymentHistoryData = modifyPaymentHistoryList(responseData);
                this.setState({
                    paymentHistory: paymentHistoryData.paymentHistoryList,
                    totalBillAmount: paymentHistoryData.totalBillAmount
                });
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ paymentHistoryLoader: false });

    };
    // for navigate to previous screen 
    _onBack = () => {
        this.props.navigation.goBack();
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }


    // this function used for header section design implement here
    _onHeaderSec = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.updatePaymentSec}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                    </TouchableOpacity>
                    <View style={styles.updatePayTxtSec}>
                        <Text style={styles.updatePayTxt}>Update Payment</Text>

                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.tdbImg} />
                </View>
                <View style={{ marginTop: 10 }} />
                <View style={styles.orderIdSec}>
                    <View style={styles.orderIdSubSec}>
                        <Text style={styles.orderIdTxt}>Order ID  <Text style={styles.recordNumTxt}>#{this.props.route.params.data.recordNumber}</Text></Text>
                        <View style={{ flex: 1 }} />
                        <Text style={styles.createDateTxt}>{DateConvert.formatDDfullMonthYYYY(this.props.route.params.data.createdAt)}</Text>
                        <View style={styles.redCircleImgSec}>
                            <Image source={ImageName.RED_CIRCEL_DOWNLOAD} style={styles.rcdImg} />
                        </View>
                    </View>

                </View>

            </View>
        )
    }

    // for total bill amount design here
    totalBillAmountSection = () => {
        return (
            <View style={styles.billSec}>
                <Image source={ImageName.ORDER_BILL_ICON} style={styles.billImg} />
                <Text style={styles.profileLocTxt}>Total Bill</Text>
                <Text style={styles.billAmountTxt}>{'\u20B9' + this.state.totalBillAmount}</Text>
            </View>
        )
    }

    // for check box function and design implement here
    checkBoxSection = () => {
        const _onCheck = (item, key) => {
            let selectedOption = "";
            for (let i = 0; i < checkBoxArr.length; i++) {
                if (i == key) {
                    checkBoxArr[i].check = true;
                    selectedOption = checkBoxArr[i].id
                    if (checkBoxArr[i].id == "1") {
                        this.setState({ paidAmount: this.state.totalBillAmount.toString() })
                    } else {
                        this.setState({ paidAmount: "" })
                    }
                } else {
                    checkBoxArr[i].check = false;
                }
            }
            this.setState({ selectPaymentStatus: selectedOption })
        }
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {checkBoxArr.map((item, key) => (
                    <View style={styles.checkBoxSec} key={key} >
                        <CheckBox
                            type={"tick"}
                            borderRadius={30}
                            data={item.check}
                            onClickValue={(value) => _onCheck(item, key)}
                            backgroundColor={"#D0D9DF"}
                            selectBackgroundColor={Color.COLOR.GREEN.LIGHT_GREEN}
                            borderWidth={0}
                        />
                        <Text style={styles.checkBoxTxt}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>
        )
    }
    onPaidAmount = (value) => {
        let newText = DataValidator.inputEntryValidate(value, "number")
        this.setState({ paidAmount: newText })
    }
    // this function used for paid amount text input field
    amountFieldSection = () => {
        return (
            <View style={{ marginTop: 25 }}>
                <TextInputBox
                    placeholder={"Paid Amount"}
                    height={45}
                    value={this.state.paidAmount}
                    onChangeText={(value) => this.onPaidAmount(value)}
                    keyboardType="number-pad"
                    isActive={this.state.paidAmountActive}
                    onFocus={() => { this.setState({ paidAmountActive: true }) }}
                    onBlur={() => { this.setState({ paidAmountActive: false }) }}
                    returnKeyType="done"
                    borderRadius={20}
                    activeBGColor={"#D0D9DF"}
                    inactiveBGColor={"#D0D9DF"}
                    placeholderTextColor={"#1F2B4D"}
                    editable={this.state.selectPaymentStatus == 1 ? false : true}
                />
            </View>
        )
    }

    // this function used for comment text
    _onCommentText = (value) => {
        this.setState({
            commentText: value
        })
    }

    // for select payment mode this function used
    _onPaymentMode = (item) => {
        for (let i = 0; i < this.state.paymentMode.length; i++) {
            if (this.state.paymentMode[i] == item) {
                this.state.paymentMode[i].check = true;
            } else {
                this.state.paymentMode[i].check = false;
            }
        }
        this.setState({
            selectPaymentmode: item,
            paymentMode: this.state.paymentMode
        })
    }

    //clear all data
    clearAllData = () => {
        for (let i = 0; i < this.state.paymentMode.length; i++) {
            this.state.paymentMode[i].check = false;
        }
        this.setState({
            selectPaymentmode: {},
            selectPaymentStatus: "0",
            documentImg: "",
            paidAmount: "",
            commentText: ""
        })
    }

    // this function used for update payment Api call 
    _onUpdatePayment = async () => {
        let validatedData = validateData(this.state);
        if (validatedData.status) {
            let reqData = {
                "paymentModeId": this.state.selectPaymentmode.id ? this.state.selectPaymentmode.id : "",
                "paymentStatus": this.state.selectPaymentStatus ? this.state.selectPaymentStatus : "",
                "suportingDocPath": this.state.documentImg,
                "paidAmount": this.state.paidAmount,
                "orderNumber": this.props.route.params.data.recordNumber,
                "createdAt": DateConvert.fullDateFormat(new Date())
            }
            this.setState({ updatePaymentLoader: true })
            let responseData = await MiddlewareCheck("updatePayment", reqData, this.props);
            if (responseData === false) {
                this._onNetworkError()
            } else {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    Toaster.ShortCenterToaster("Payment Updated")
                    this.clearAllData();
                    this._load();
                } else {
                    Toaster.ShortCenterToaster(responseData.message)
                }
            }
            this.setState({ updatePaymentLoader: false })
        }
    }

    // for Upload document press button
    _onUploadDoc = async () => {
        let uploadData = await FileUpload.uploadDocumentAndImage();
        await this._onDocUpload(uploadData);
    }

    // for doc upload Api call here
    _onDocUpload = async (uploadData) => {
        this.setState({ docLoader: true, })
        this.setState({
            docLoader: true,
            imgName: uploadData.name,
            imgUri: uploadData.uri,
        })
        let responseData = await MiddlewareFileCheck("fileupload", uploadData, this.props);
        if (responseData == false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let imgData = responseData.response.fileName;
                this.setState({
                    documentImg: imgData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ docLoader: false })
    }

    // for payment history list design implementation

    paymentHistory = () => {
        const onDownloadDoc = async (doc) => {
            await FileDownload.downloadDocument(App_uri.CRM_BASE_URI + doc)

        }
        return (
            <View>
                {this.state.paymentHistoryLoader ?
                    <View>
                        <ActivityIndicator />
                    </View> :
                    <React.Fragment>
                        {this.state.paymentHistory.length > 0 ?
                            <React.Fragment>
                                <View style={{ flexDirection: "row", width: Dimension.width - 40 }}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                        {this.state.paymentHistory.map((item, key) => (
                                            <View key={key} >
                                                <View style={styles.paymentContainer} >
                                                    <View style={styles.paymentSubContainer}>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={styles.dateFormateTxt}>{DateConvert.formatDDfullMonthYYYY(item.createdAt)}</Text>

                                                            <View style={styles.paidAmountSec}>
                                                                <Image source={ImageName.CASH_IN_HAND_ICON} style={styles.cashImg} />
                                                                <Text style={styles.paidAmountTxt}>{'\u20B9' + " " + item.paidAmount}</Text>
                                                            </View>

                                                            <View style={{ flexDirection: "row" }}>
                                                                <View style={styles.orderImgSec}>
                                                                    <Image source={ImageName.ORDER_RECEIPT_IMG} style={styles.orderImg} />
                                                                </View>
                                                                <Text style={styles.billAmtTxt}>{'\u20B9' + " " + item.orderActtualBillAmount}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.paidDocSec}>
                                                            <Text style={styles.paidTxt}>Paid by <Text style={styles.paymentItemTxt}>{item.paymentModeId == 1 ? "Cash" : item.paymentModeId == 2 ? "Upi" : item.paymentModeId == 3 ? "Net Banking" : item.paymentModeId == 4 ? "Cheque" : item.paymentModeId == 5 ? "Demand Draft" : item.paymentModeId == 6 ? "Credit Card" : item.paymentModeId == 7 ? "Debit Card" : "Others"}</Text></Text>
                                                            <View style={{ flex: 1, marginLeft: 15 }}>
                                                                <Image source={item.paymentModeId == 1 ? ImageName.PURSE_ICON : item.paymentModeId == 2 ? ImageName.UPI_LOGO : item.paymentModeId == 3 ? ImageName.CHEQUE_LOGO : item.paymentModeId == 4 ? ImageName.CHEQUE_LOGO : item.paymentModeId == 5 ? ImageName.UPI_LOGO : item.paymentModeId == 6 ? ImageName.CARD_LOGO : item.paymentModeId == 7 ? ImageName.CARD_LOGO : ImageName.UPI_LOGO} style={styles.upiLogo} />
                                                            </View>
                                                            <TouchableOpacity style={styles.downloadTab} onPress={() => onDownloadDoc(item.suportingDocPath)}>
                                                                <View style={styles.downloadDocImgSec}>
                                                                    <Image source={ImageName.ORDER_DOCUMENT_DOWNLOAD} style={styles.docDownloadImg} />

                                                                </View>
                                                                <Text style={styles.docTxt}>Document</Text>

                                                            </TouchableOpacity>
                                                        </View>

                                                    </View>
                                                </View>

                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            </React.Fragment>
                            :
                            null
                        }
                    </React.Fragment>
                }
            </View>
        )
    }
    // for design payment mode section 
    paymentModeSec = () => {
        return (
            <View>
                <View style={styles.payModeTxtSec}>
                    <Text style={styles.paymodeTxt}>Payment Mode</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.state.paymentMode.map((item, key) => (
                        <TouchableOpacity style={styles.payModeTab} key={key} onPress={() => this._onPaymentMode(item)} activeOpacity={0.9}>
                            <View style={item.check ? styles.selectActivePaymentMode : styles.inActivePaymentMode}>
                                <Image source={item.image} style={styles.itemImg} />
                                <Text style={styles.itemTxt}>{item.text}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        )
    }
    // for design upload section 
    uploadDocSec = () => {

        const onRemoveDoc = () => {
            this.setState({ documentImg: "" })
        }

        const onShowDoc = (docData) => {
            this.setState({
                imageModalVisibility: true
            })
        }

        return (
            <View style={styles.uploadContainer}>
                <View style={{ flex: 0.7 }}>
                    <Text style={styles.uploadDocTxt}>Upload Document</Text>
                    <Text style={styles.docAvailTxt}>If any document available</Text>
                </View>
                {this.state.documentImg.length > 0 ?
                    <View style={styles.showRemoveTabSec}>
                        <TouchableOpacity style={styles.showDocTab} onPress={() => onShowDoc(this.state.documentImg)}>
                            <Image source={ImageName.DOCUMENT_YELLOW} style={styles.docYlwImg} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} style={{ top: -25, left: -10 }} onPress={() => onRemoveDoc()}>
                            <Image source={ImageName.RED_CLOSE_IMG} style={styles.redCloseImg} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flex: 0.3, marginTop: 3 }}>
                        {this.state.docLoader ?
                            <View>
                                <ActivityIndicator />
                            </View> :
                            <BigTextButton
                                text={"Upload"}
                                fontSize={12}
                                fontColor={"#000"}
                                backgroundColor={"#fff"}
                                borderRadius={18}
                                additionalStyles={{ borderColor: '#000', borderWidth: 1 }}
                                onPress={() => this._onUploadDoc()}
                            />
                        }
                    </View>
                }

            </View>
        )
    }

    modalSection = () => {
        const closeImageModal = () => {
            this.setState({ imageModalVisibility: false })
        }
        return (
            <>
                <ImageViewModal
                    isVisible={this.state.imageModalVisibility}
                    onBackButtonPress={() => closeImageModal()}
                    onBackdropPress={() => closeImageModal()}
                    props={this.props}
                    link={App_uri.CRM_BASE_URI + this.state.documentImg}
                />
            </>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._onHeaderSec()}
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={{ marginHorizontal: '5%' }}>
                        {this.totalBillAmountSection()}
                        {this.paymentHistory()}
                        {this.checkBoxSection()}
                        {this.amountFieldSection()}
                        <View style={{ marginTop: 15 }}>
                            {this.paymentModeSec()}
                            {this.uploadDocSec()}
                            <View style={{ marginTop: 30 }}>
                                <TextInputBox
                                    placeholder={"Comment"}
                                    height={85}
                                    value={this.state.commentText}
                                    onChangeText={(value) => this._onCommentText(value)}
                                    borderRadius={20}
                                    alignItems={"flex-start"}
                                    placeholderTextColor={"#1F2B4D"}
                                />
                            </View>
                            <View style={styles.btnLoadSec}>
                                {this.state.updatePaymentLoader ?
                                    <View>

                                        <ActivityIndicator />
                                    </View >
                                    :
                                    <React.Fragment>
                                        {
                                            this.state.docLoader ?
                                                null :

                                                <BigTextButton
                                                    text={"Update Payment"}
                                                    fontSize={12}
                                                    fontColor={"#fff"}
                                                    backgroundColor={"#1F2B4D"}
                                                    borderRadius={22}
                                                    onPress={() => this._onUpdatePayment()}

                                                />
                                        }

                                    </React.Fragment>
                                }

                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 80 }} />
                </ScrollView>
                {this.modalSection()}
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentHistoryPage);
