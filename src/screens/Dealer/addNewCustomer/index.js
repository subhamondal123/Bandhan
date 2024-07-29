import React from "react";
import { Image, SafeAreaView, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, CheckBox, DropdownInputBox, TextInputBox } from "../../../shared";

let StaticData = [
    {
        id: 1,
        name: "TMT 500",
        discount: "20%",
        amount: "2748",
    },
    {
        id: 2,
        name: "TMT 500",
        discount: "20%",
        amount: "2748",
    },

]

let boxData = [
    {
        id: 1,
        text: 'Cash',
        image: ImageName.PURSE_ICON
    },
    {
        id: 2,
        text: 'Card',
        image: ImageName.CARD_LOGO

    },
    {
        id: 3,
        text: 'Cheque',
        image: ImageName.CHEQUE_LOGO

    },
    {
        id: 4,
        text: 'others',
        image: ImageName.UPI_LOGO

    }
]



// this is add new customer page 
class AddNewCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: "",
            customerNameActive: false,
            businessName: "",
            businessNameActive: false,
            customerTypeArr: [],
            selectedCustomerTypeObj: {},
            tradeNo: "",
            tradeNoActive: false,
            gstNo: "",
            gstNoActive: false,
            productArr: [],
            selectedProductObj: {},
            approxOrderValue: "",
            approxOrderValueActive: false,
            shopName: "",
            shopNameActive: false,
            stateArr: [],
            selectedStateObj: {},
            districtArr: [],
            selectedDistrictObj: {},
            zoneArr: [],
            selectedZoneObj: {},
            pincode: "",
            pincodeActive: false,
            address: "",
            addressActive: false,
            deliveryPartnerArr: [],
            selectedDeliveryPartnerObj: {}

        };
    }
    // this is initial function which is call first
    componentDidMount = async () => {
        await this._load();
    }
    // this is first function where set state data
    _load = async () => {
        this.setState({
            paymentHistory: StaticData
        })
    };
    // this function used for back previous page 
    _onBack = () => {
        this.props.navigation.goBack();
    };
    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }
    // this function used for design header section 
    _onHeaderSec = () => {
        return (
            <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                    </TouchableOpacity>
                    <View style={styles.ancTxt}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, }}>Add New Customer</Text>

                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.threeDotImg} />
                </View>
            </View>
        )
    }
    // this function used for design image upload section 
    uploadImgSec = () => {
        return (
            <View style={{ marginTop: 30 }}>
                <TouchableOpacity style={styles.blueCircle}>
                    <Image source={ImageName.CAMERA_LOGO} style={styles.cameraImg} />
                    <Text style={styles.uploadLabelTxt}>Upload Image</Text>
                </TouchableOpacity>
            </View>
        )
    }
    // this function used for design customer name section 
    customerNameSec = () => {
        const _onChange = (value) => {
            this.setState({
                customerName: value
            })
        }
        return (
            <TextInputBox
                placeholder={"Customer Name*"}
                value={this.state.customerName}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.customerNameActive}
                onFocus={() => { this.setState({ customerNameActive: true }) }}
                onBlur={() => { this.setState({ customerNameActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
            />
        )
    }
    // this function used for business name section  
    businessNameSec = () => {
        const _onChange = (value) => {
            this.setState({
                businessName: value
            })
        }
        return (
            <TextInputBox
                placeholder={"Business Name*"}
                value={this.state.businessName}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.businessNameActive}
                onFocus={() => { this.setState({ businessNameActive: true }) }}
                onBlur={() => { this.setState({ businessNameActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
            />
        )
    }
    // this function used for design customer type section 
    customerTypeSec = () => {
        const _onChange = (value) => {
            this.setState({
                selectedCustomerTypeObj: value
            })
        }
        return (
            <DropdownInputBox
                selectedValue={this.state.selectedCustomerTypeObj.id ? this.state.selectedCustomerTypeObj.id.toString() : "0"}
                data={this.state.customerTypeArr}
                borderRadius={25}
                onSelect={(value) => _onChange(value)}
                headerText={"Customer Type*"}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                selectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                backgroundColor={"#F0F4F7"}

            />
        )
    }
    // this function used for design target license section 
    targetLicenseSec = () => {
        const _onChange = (value) => {
            this.setState({
                tradeNo: value
            })
        }
        return (
            <TextInputBox
                placeholder={"Trade License No."}
                value={this.state.tradeNo}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.tradeNoActive}
                onFocus={() => { this.setState({ tradeNoActive: true }) }}
                onBlur={() => { this.setState({ tradeNoActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
            />
        )
    }
    // this function used for design gst section 
    gstSec = () => {
        const _onChange = (value) => {
            this.setState({
                gstNo: value
            })
        }
        return (
            <TextInputBox
                placeholder={"GST No."}
                value={this.state.gstNo}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.gstNoActive}
                onFocus={() => { this.setState({ gstNoActive: true }) }}
                onBlur={() => { this.setState({ gstNoActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
            />
        )
    }
    // this function used for design product section 
    productSec = () => {
        const _onChange = (value) => {
            this.setState({
                selectedProductObj: value
            })
        }
        return (
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 0.7 }}>
                    <DropdownInputBox
                        selectedValue={this.state.selectedProductObj.id ? this.state.selectedProductObj.id.toString() : "0"}
                        data={this.state.productArr}
                        borderRadius={25}
                        onSelect={(value) => _onChange(value)}
                        headerText={"Select Products"}
                        fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                        selectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                        unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                        backgroundColor={"#F0F4F7"}

                    />
                </View>
                <View style={{ width: 5 }} />
                <View style={{ flex: 0.3 }}>
                    <BigTextButton
                        text={"Add More"}
                        backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                        borderRadius={25}
                        fontSize={12}
                    />
                </View>
            </View>
        )
    }

    // this function used for design order value section 
    orderValueSec = () => {
        const _onChange = (value) => {
            this.setState({
                approxOrderValue: value
            })
        }
        return (
            <TextInputBox
                placeholder={'\u20B9' + " " + "00000"}
                value={this.state.approxOrderValue}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.approxOrderValueActive}
                onFocus={() => { this.setState({ approxOrderValueActive: true }) }}
                onBlur={() => { this.setState({ approxOrderValueActive: false }) }}
                maxLength={20}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}

            />
        )
    }
    // this function used for design shop name section 
    shopNameSec = () => {
        const _onChange = (value) => {
            this.setState({
                shopName: value
            })
        }
        return (
            <TextInputBox
                placeholder={"Shop Name*"}
                value={this.state.shopName}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.shopNameActive}
                onFocus={() => { this.setState({ shopNameActive: true }) }}
                onBlur={() => { this.setState({ shopNameActive: false }) }}
                maxLength={20}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}

            />
        )
    }
    // this function used for design state section 
    stateSec = () => {
        const _onChange = (value) => {
            this.setState({
                selectedStateObj: value
            })
        }
        return (
            <DropdownInputBox
                selectedValue={this.state.selectedStateObj.id ? this.state.selectedStateObj.id.toString() : "0"}
                data={this.state.stateArr}
                borderRadius={25}
                onSelect={(value) => _onChange(value)}
                headerText={"State*"}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                selectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                backgroundColor={"#F0F4F7"}
            />
        )
    }
    // this function used for design district section 
    districtSec = () => {
        const _onChange = (value) => {
            this.setState({
                selectedDistrictObj: value
            })
        }
        return (
            <DropdownInputBox
                selectedValue={this.state.selectedDistrictObj.id ? this.state.selectedDistrictObj.id.toString() : "0"}
                data={this.state.districtArr}
                borderRadius={25}
                onSelect={(value) => _onChange(value)}
                headerText={"District*"}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                selectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                backgroundColor={"#F0F4F7"}
            />
        )
    }
    // this function used for design zone  section 
    zoneSec = () => {
        const _onChange = (value) => {
            this.setState({
                selectedZoneObj: value
            })
        }
        return (
            <DropdownInputBox
                selectedValue={this.state.selectedZoneObj.id ? this.state.selectedZoneObj.id.toString() : "0"}
                data={this.state.zoneArr}
                borderRadius={25}
                onSelect={(value) => _onChange(value)}
                headerText={"Zone*"}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                selectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                backgroundColor={"#F0F4F7"}
            />
        )
    }
    // this function used for design pin code  section 
    pincodeSec = () => {
        const _onChange = (value) => {
            this.setState({
                pincode: value
            })
        }
        return (
            <TextInputBox
                placeholder={"Pincode"}
                value={this.state.pincode}
                borderRadius={25}
                height={45}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.pincodeActive}
                onFocus={() => { this.setState({ pincodeActive: true }) }}
                onBlur={() => { this.setState({ pincodeActive: false }) }}
                maxLength={20}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}

            />
        )
    }
    // this function used for design address section 
    addressSec = () => {
        const _onChange = (value) => {
            this.setState({
                address: value
            })
        }
        return (
            <TextInputBox
                placeholder={"Detail Address*"}
                value={this.state.address}
                borderRadius={25}
                height={90}
                onChangeText={(value) => _onChange(value)}
                isActive={this.state.addressActive}
                onFocus={() => { this.setState({ addressActive: true }) }}
                onBlur={() => { this.setState({ addressActive: false }) }}
                maxLength={200}
                alignItems={"flex-start"}
                activeBGColor={"#F0F4F7"}
                inactiveBGColor={"#F0F4F7"}
                activeTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                inactiveTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                placeholderTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                fontFamily={FontFamily.FONTS.POPPINS.REGULAR}

            />
        )
    }
    // this function used for design geo location section 
    geoLocationSec = () => {

        return (
            <>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 15 }}>
                    <Image source={ImageName.ORDER_CUSOMER_LOCATION_IMG} style={styles.locationImg} />
                    <Text style={styles.locationTxt}>Fetch Geo Location of the shop</Text>
                    <View style={{ flex: 1 }} />
                    <Image source={ImageName.BLUE_GOOGLE_MAP_ICON} style={styles.deliveryImg} />

                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 15 }}>
                    <Image source={ImageName.DELIVERY_PARTNER_ICON} style={styles.locationImg} />
                    <Text style={styles.locationTxt}>Mapped with Delivery Partner</Text>
                </View>
            </>

        )
    }
    // this function used for design delivery partner section 
    deliveryPartnerSec = () => {
        const _onChange = (value) => {
            this.setState({
                selectedDeliveryPartnerObj: value
            })
        }
        return (
            <View style={{ marginHorizontal: 15 }}>
                <DropdownInputBox
                    selectedValue={this.state.selectedDeliveryPartnerObj.id ? this.state.selectedDeliveryPartnerObj.id.toString() : "0"}
                    data={this.state.deliveryPartnerArr}
                    borderRadius={25}
                    onSelect={(value) => _onChange(value)}
                    headerText={"Select Delivery Partner of the location*"}
                    fontFamily={FontFamily.FONTS.POPPINS.REGULAR}
                    selectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                    unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                    backgroundColor={"#F0F4F7"}
                />
            </View>

        )
    }
    // this function used for design add new section 
    addNewSec = () => {
        return (
            <View style={{ marginHorizontal: 15 }}>
                <View style={styles.underline} />
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Text style={styles.locationTxt}>If the customer belongs any {'\n'} other Location</Text>
                    <View style={{ flex: 1 }} />
                    <View style={{ width: 130 }}>
                        <BigTextButton
                            text={"Add New Shop"}
                            backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                            fontSize={12}
                            fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                            borderRadius={25}
                        />
                    </View>
                </View>
                <View style={styles.underline} />
            </View>
        )
    }
    // this function used for design button section 
    buttonSec = () => {
        return (
            <View style={{ flexDirection: "row", marginHorizontal: 15, marginTop: 10 }}>
                <View style={{ width: 70 }}>
                    <BigTextButton
                        text={"Reset"}
                        backgroundColor={Color.COLOR.WHITE.PURE_WHITE}
                        fontColor={Color.COLOR.BLUE.LOTUS_BLUE}
                        fontSize={12}
                        fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                        borderRadius={25}
                        additionalStyles={{ borderWidth: 0.5, borderColor: Color.COLOR.BLUE.LOTUS_BLUE }}
                    />
                </View>
                <View style={{ flex: 1 }} />
                <View style={{ width: 80 }}>
                    <BigTextButton
                        text={"Submit"}
                        fontSize={12}
                        fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                        borderRadius={25}
                    />
                </View>
            </View>
        )
    }

    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._onHeaderSec()}
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={{ marginHorizontal: 15, justifyContent: "center", alignItems: "center" }}>
                        {this.uploadImgSec()}
                        <View style={{ marginTop: 20 }} />
                        {this.customerNameSec()}
                        <View style={{ marginTop: 20 }} />
                        {this.businessNameSec()}
                        <View style={{ marginTop: 20 }} />
                        {this.customerTypeSec()}
                        <View style={{ marginTop: 20 }} />
                        <Text style={styles.headTxt}>Statutory Information</Text>
                        <View style={{ marginTop: 20 }} />
                        {this.targetLicenseSec()}
                        <View style={{ marginTop: 20 }} />
                        {this.gstSec()}
                        <View style={{ marginTop: 20 }} />
                        <Text style={styles.headTxt}>Prefer Product</Text>
                        <View style={{ marginTop: 20 }} />
                        {this.productSec()}
                        <View style={{ marginTop: 20 }} />
                        {this.orderValueSec()}
                        <View style={{ marginTop: 20 }} />
                        <Text style={styles.headTxt}>Shop Address</Text>
                        <View style={{ marginTop: 20 }} />
                        {this.shopNameSec()}
                        <View style={{ marginTop: 20 }} />
                        {this.stateSec()}
                        <View style={{ marginTop: 20 }} />
                        {this.districtSec()}
                        <View style={{ marginTop: 20 }} />
                        {this.zoneSec()}
                        <View style={{ marginTop: 20 }} />
                        {this.pincodeSec()}
                        <View style={{ marginTop: 20 }} />
                        {this.addressSec()}
                        <View style={{ marginTop: 20 }} />
                    </View>
                    {this.geoLocationSec()}
                    <View style={{ marginTop: 20 }} />
                    {this.deliveryPartnerSec()}
                    <View style={{ marginTop: 20 }} />
                    {this.addNewSec()}
                    <View style={{ marginTop: 20 }} />
                    {this.buttonSec()}
                    <View style={{ height: 80 }} />
                </ScrollView>

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

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCustomer);
