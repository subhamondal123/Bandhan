import React from "react";
import { Image, SafeAreaView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { stateCheckForNetwork, stateUserInformation } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton } from "../../../shared";
import { DynamicOrderCartDetailsList } from "../../../pageShared";

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
    {
        id: 3,
        name: "TMT 500",
        discount: "20%",
        amount: "2748",
    },
    {
        id: 4,
        name: "TMT 500",
        discount: "20%",
        amount: "2748",
    },
    {
        id: 5,
        name: "TMT 500",
        discount: "20%",
        amount: "2748",
    },
    {
        id: 6,
        name: "TMT 500",
        discount: "20%",
        amount: "2748",
    },
    {
        id: 7,
        name: "TMT 500",
        discount: "20%",
        amount: "2748",
    }
]

// this is order summery list page 
class OrderSummeryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerListOrder: []
        };
    }
    // this is a initial function which is call first 
    componentDidMount = async () => {
        await this._load();
    }
    // for navigate to previous screen 
    _onBack = () => {
        this.props.navigation.goBack();
    };

    // this is first function where set state data 
    _load = async () => {
        this.setState({
            customerListOrder: StaticData
        })
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }
    // for render contact list data 
    renderContactList = (item, key) => {
        return (
            <View style={{}}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    listSection = (item, key) => {
        return (
            <View key={key}>
                <DynamicOrderCartDetailsList
                    data={item}
                    props={this.props}
                />
            </View>
        )
    }
    // for design header section 
    _onHeaderSec = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerSubContainer}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                    </TouchableOpacity>
                    <View style={styles.summeryTxtSec}>
                        <Text style={styles.orderSummeryTxt}>Order Summery</Text>

                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.tdbImg} />
                </View>
            </View>
        )
    }

    onRecentOrder = () => {
        this.props.navigation.navigate("OrderHistoryList")
    }

    profileTileSec = () => {
        return (
            <View style={styles.profileTitleContainer}>
                <View style={styles.rameshTabSec}>
                    <TouchableOpacity style={styles.rameshTab}>
                        <Image source={ImageName.DUMMY_PROFILE_IMG} style={styles.dpiImg} />
                        <View style={{ marginLeft: '3%' }}>
                            <Text style={styles.rameshTxt}>Ramesh Roy</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.rameshNumSec} >
                        <Image source={ImageName.SHOPING_ORDER_BOX} style={styles.sobImg} />
                        <View style={{ width: 5 }} />
                        <Text style={styles.rameshNumTxt}>240</Text>
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <View style={styles.orderIdSec}>
                        <View style={styles.orderIdSubSec}>
                            <Text style={styles.orderIdTxt}>Order ID  <Text style={styles.orderIdNum}>{"# 2468"}</Text></Text>
                            <View style={{ flex: 1 }} />
                            <Text style={styles.orderDateTxt}>23 May 2023</Text>
                            <View style={styles.downloadImgSec}>
                                <Image source={ImageName.ORDER_BLUE_DOWNLOAD_IMG} style={styles.orderDownloadImg} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    _onPlaceOreder = () => {
        this.props.navigation.navigate("OrderSuccessFully")
    }

    _onAddMore = () => {
        this.props.navigation.navigate("CreateOrderList")

    }
    // for design footer section 
    _onfooterSec = () => {
        return (
            <>
                <View style={styles.totalNumSec}>
                    <View style={styles.totalNumSubSec}>
                        <View style={styles.totalNumTxtSec}>
                            <Text style={styles.totalTxt}>Total</Text>
                            <Image source={ImageName.BLUE_SHOPING_BOX} style={styles.shopImg} />
                            <View style={styles.totalNumImgSec}>
                                <Image source={ImageName.BLUE_SHOPING_ORDER_BOX} style={styles.shopOrderImg} />
                                <Text style={styles.totalNumTxt}>32</Text>
                            </View>
                        </View>
                        <Text style={styles.totalAmtTxt}>{'\u20B9' + " " + 2473}</Text>
                    </View>
                </View>
                <View style={styles.btnSec}>
                    <View style={{ flex: 1 }}>
                        <BigTextButton
                            text={"Add More"}
                            backgroundColor={"#1F2B4D"}
                            borderRadius={30}
                            fontSize={14}
                            onPress={() => this._onAddMore()}
                        />
                    </View>
                    <View style={{ width: 95 }} />
                    <View style={{ flex: 1 }}>
                        <BigTextButton
                            text={"Place Order"}
                            backgroundColor={"#F13748"}
                            borderRadius={30}
                            fontSize={14}
                            onPress={() => this._onPlaceOreder()}
                        />
                    </View>
                </View>
            </>
        )
    }
    // this is main render to this page 
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this._onHeaderSec()}
                {this.profileTileSec()}
                <React.Fragment>
                    <FlatList
                        data={this.state.customerListOrder}
                        renderItem={(item, key) => this.renderContactList(item, key)}
                        keyExtractor={(item, key) => key}
                        // onEndReached={this.fetchMore}
                        onEndReachedThreshold={0.1}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.refreshing}
                    //         onRefresh={() => this.onRefresh()}
                    //     />
                    // }
                    />
                </React.Fragment>
                {this._onfooterSec()}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummeryList);
