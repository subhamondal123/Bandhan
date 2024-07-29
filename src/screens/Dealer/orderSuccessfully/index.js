import React from "react";
import { Image, SafeAreaView, Text, View, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { stateCheckForNetwork, stateUserInformation } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton } from "../../../shared";
import { MiddlewareCheck } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { orderSuccessfullmodifyData } from "./function";
import { DateConvert, Toaster } from "../../../services/common-view-function";
import LottieViewLoad from "../../../shared/lottieViewLoad";

// this is order successfull page 
class OrderSuccessFully extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderSuccessfullData: {
                profilePic: "",
                createdAt: "",
                deliveryStatus: "",
                userName: "",
                profilePic: "",
                contactTypeName: "",
                deliveryPartnerDetails: [],
                approvedStatus: ""
            },
            oderSuccessfulLoader: false
        };
    }
    // this is a initial function which is call first
    componentDidMount = async () => {
        await this._load();
    }
    // this function used for navigate to back page 
    _onBack = () => {
        this.props.navigation.goBack();
        this.props.route.params.onUpdateCart();
    };

    // this is first function where set state data
    _load = async () => {
        this.setState({ oderSuccessfulLoader: true });
        let reqData = {
            "orderNumber": this.props.route.params.orderId.recordNumber
        }
        let responseData = await MiddlewareCheck("orderSuccessfullyDetails", reqData, this.props);
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let oderData = orderSuccessfullmodifyData(responseData.response[0]);
                this.setState({ orderSuccessfullData: oderData });
                // this.props.route.params.onRefreshList();

            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ oderSuccessfulLoader: false });
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }
    // for design header section 
    headerSec = () => {
        return (
            <View style={styles.headerSec}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <Image source={ImageName.THREE_DOT_BLACK} style={styles.tdbImg} />
            </View>
        )
    }
    _onBill = () => {
        this.props.navigation.navigate("OrderPaymentScreen")
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginHorizontal: 15 }}>
                    {this.headerSec()}
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

                        <View style={styles.titleViewLoadSec}>
                            <LottieViewLoad height={250} type={"Gpay_Tick"} autoPlay={true} loop={true} />
                        </View>
                        <View style={styles.successfullTxtSec}>
                            <Text style={styles.haveTxt}>You Have</Text>
                            <Text style={styles.successfullTxt}>Successfully</Text>
                            <Text style={styles.placeOrderTxt}>Place the Order</Text>
                        </View>
                        <View style={{ marginTop: 10, borderWidth: 0.5, borderColor: '#000' }} />
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.orderIdSec}>
                                <Text style={styles.orderIdTxt}>Order ID</Text>
                                <Text style={styles.orderNumTxt}># {this.state.orderSuccessfullData.orderNumber}</Text>
                            </View>
                            <View style={styles.orderDateSec}>
                                <Text style={styles.orderDatetXT}>Order Date</Text>
                                <Text style={styles.orderDateSucsTxt}>{DateConvert.formatDDfullMonthYYYY(this.state.orderSuccessfullData.createdAt)}</Text>
                            </View>
                            <View style={styles.orderStatusSec}>
                                <Text style={styles.orderStatusTxt}>Order Status</Text>
                                <View style={styles.approveStatusSec}>
                                    <Text style={styles.approveStatusTxt}>{this.state.orderSuccessfullData.approvedStatus}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginBottom: 100 }} />
                    </ScrollView>


                </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccessFully);
