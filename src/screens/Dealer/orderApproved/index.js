import React from "react";
import { Image, SafeAreaView, Text, View, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton } from "../../../shared";

// this is order approved page 
class OrderApproved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // this is initial function which is call first
    componentDidMount = async () => {
        await this._load();
    }
    // this is first function where set state data
    _load = async () => {

    };
    // this function used for navigate previous page 
    _onBack = () => {
        this.props.navigation.goBack();
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
    // this function used for design profile  card section 
    profileCardSection = () => {
        const onPressWhatsapp = () => {
            let url = "whatsapp://send?text=" + "" + "&phone=" + "9330285871";
            Linking.openURL(url)
                .then(data => {
                    console.log("WhatsApp Opened");
                })
                .catch(() => {
                    alert("Make sure WhatsApp installed on your device");
                });
        }

        const onPressPhone = () => {
            Linking.openURL('tel:' + "9330285871")
        }

        return (
            <View style={styles.cardSection}>
                <View style={styles.profileSec}>
                    <Image source={ImageName.DUMMY_PROFILE_IMG} style={styles.profileImgSec} />
                </View>
                <View style={styles.profileMainDetailsSec}>
                    <View style={styles.profileDetailsTopSec}>
                        <View style={styles.profileDetailsSec}>
                            <View>
                                <Text style={styles.profileNameTxt} numberOfLines={1}>Ramesh Roy</Text>
                            </View>
                        </View>
                        <View style={styles.iconSection}>
                            <TouchableOpacity onPress={() => onPressWhatsapp()}>
                                <Image source={ImageName.REAL_WHATSAPP_ICON} style={styles.iconImg} />
                            </TouchableOpacity>
                            <View style={{ width: 5 }} />
                            <TouchableOpacity onPress={() => onPressPhone()}>
                                <Image source={ImageName.TELEGRAM_LOGO} style={styles.iconImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.profileDetailsBottomSec}>
                        <Text style={styles.profileTypeTxt}>Dealer</Text>
                    </View>
                </View>
            </View>
        )
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginHorizontal: 15 }}>
                    {this.headerSec()}
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <ImageBackground source={ImageName.ORDER_SUCCESSFULLY} style={styles.orderImg} />
                        <View style={styles.approvedTxtSec}>
                            <Text style={styles.uHaveTxt}>You Have</Text>
                            <Text style={styles.approvedTxt}>Approved</Text>
                            <Text style={styles.tOrderTxt}>The Order</Text>
                        </View>
                        <View style={{ marginTop: 10, borderWidth: 0.5, borderColor: '#000' }} />
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.orderIdSec}>
                                <Text style={styles.orderIdTxt}>Order ID</Text>
                                <Text style={styles.colorTxt}>#78543</Text>
                            </View>
                            <View style={styles.orderDateSec}>
                                <Text style={styles.orderDateTxt}>Order Date</Text>
                                <Text style={styles.janTxt}>23 Jan</Text>
                            </View>
                        </View>
                        <View style={styles.orderGenTxtSec}>
                            <Text style={styles.orderGenTxt}>Order invoice is Generated Now</Text>
                        </View>
                        <View style={styles.bigBtnSec}>
                            <BigTextButton
                                text={"Download Invoice"}
                                backgroundColor={"#1F2B4D"}
                                isLeftIcon={true}
                                leftIcon={ImageName.ORDER_DOWNLOAD}
                                leftIconStyle={{ height: 25, width: 25 }}
                                fontSize={14}
                                height={55}
                                borderRadius={28}
                            />
                        </View>
                        <View style={styles.invoiceTxtSec}>
                            <Text style={styles.invoiceCustTxt}>Please Share the Invoice with customer</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            {this.profileCardSection()}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ marginBottom: 80 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderApproved);
