import React from "react";
import {
    Image,
    SafeAreaView, Text, View, TouchableOpacity
} from "react-native";
import { stateCheckForNetwork, stateUserInformation } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import { FlatList } from "react-native";
import { Color, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton } from "../../../shared";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
const bar = {
    activeStrokeWidth: 5,
    inActiveStrokeWidth: 5,
    inActiveStrokeOpacity: 0.2
};

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

// this is approve order page 
class ApproveOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerListOrder: []
        };
    }
    // this is initial function which is call first
    componentDidMount = async () => {
        await this._load();
    }
    // this is first function where set state data
    _load = async () => {
        this.setState({
            customerListOrder: StaticData
        })
    };
    // this function used for back to previous page 
    _onBack = () => {
        this.props.navigation.goBack();
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }
    // this function used for render list section 
    renderContactList = (item, key) => {
        return (
            <View style={{}}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }
    // this function used for design list section 
    listSection = (item, key) => {
        return (
            <View key={key}>

                <View style={styles.listContainer}>
                    <View style={styles.upperSection}>
                        <View style={styles.leftSection}>
                            <Text style={styles.titleTxt}>{"TMT 500"}</Text>
                            <Text style={styles.subTxt}>15 mm </Text>
                        </View>
                        <View style={styles.rightSection}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.amountPerMtTxt}>{'\u20B9' + " " + 2473}/MT  <Text style={styles.totalAmountTxt}>{'\u20B9' + 9999}</Text></Text>
                                <Image source={ImageName.CROSS_IMG} style={styles.crossImg} />

                            </View>

                        </View>
                    </View>

                    <View style={styles.bottomSection}>
                        <View style={styles.bottomLeftSection}>
                            <View>
                                <Text style={styles.bottomTitleTxt}>{1120}<Text style={styles.supTxt}>MT. </Text></Text>
                                <Text style={styles.bottomSubTxt}>remain </Text>
                            </View>
                            <View style={{ marginLeft: 5 }}>
                                <CircularProgressBase
                                    {...bar}
                                    value={60}
                                    radius={12}
                                    activeStrokeColor={'#00B65E'}
                                    inActiveStrokeColor={'#D1D1D1'}
                                    clockwise={false} />
                            </View>

                        </View>
                        <View style={styles.bottomRightSec}>
                            <View style={styles.subBottomRightSec}>
                                <Image source={ImageName.CIRCEL_MINUS} style={styles.cmImg} />
                                <View style={{ width: 5 }} />
                                <View style={styles.numTxtContainer}>
                                    <Text style={styles.numTxt}>15.5</Text>
                                </View>
                                <View style={{ width: 5 }} />
                                <Image source={ImageName.CIRCEL_PLUS} style={styles.cpImg} />
                            </View>
                            <Text style={styles.mtTxt}>MT.</Text>
                        </View>
                    </View>
                </View>
            </View >
        )
    }
    // this function used for design profile section 
    profileSec = () => {
        const _onSalesOrderDetails = () => {
            // this.props.navigation.navigate("SalesOrderDetails")
        }
        return (
            <View style={{ marginHorizontal: 15 }}>
                <View style={{ marginTop: 10 }} />
                <TouchableOpacity style={styles.salesBtn} activeOpacity={0.9} onPress={() => _onSalesOrderDetails()}>
                    <View style={styles.btnContainer}>
                        <Image source={ImageName.DUMMY_PROFILE_IMG} style={styles.dummyImg} />
                        <View style={{ marginLeft: '2%', flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.rameshTxt}>Ramesh Roy</Text>
                                <Text style={styles.colorTxt}>#897432</Text>
                            </View>
                            <View style={{ flexDirection: 'row', top: -4 }}>
                                <Text style={styles.dealerTxt}>Dealer</Text>
                                <Text style={styles.numberTxt}>{'\u20B9' + " " + 2473}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    // this function used for design header section 
    _onHeaderSec = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.subHeadContainer}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                    </TouchableOpacity>
                    <View style={styles.aoTxtContainer}>
                        <Text style={styles.approveTxt}>Approve Order</Text>

                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.threeDotImg} />
                </View>

            </View>
        )
    }
    // this function used for navigate order approved page 
    _onApprovedOreder = () => {
        this.props.navigation.navigate("OrderApproved")
    }
    // this function used for design footer section 
    _onfooterSec = () => {
        return (
            <>
                <View style={styles.totalContainer}>
                    <View style={styles.subTotalContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.totalTxt}>Total Bill </Text>
                        </View>
                        <Text style={styles.ubTxt}>{'\u20B9' + " " + 2473}</Text>

                    </View>
                </View>
                <View style={styles.bigBtnContainer}>
                    <View style={{ width: 100 }}>
                        <BigTextButton
                            text={"Cancel Order"}
                            borderRadius={30}
                            fontSize={12}
                            fontColor={"#000"}
                            backgroundColor={'#fff'}
                            fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                            additionalStyles={{ borderWidth: 0.8, borderColor: '#000' }}
                        // onPress={() => this._onPlaceOreder()}
                        />
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ width: 150 }}>
                        <BigTextButton
                            text={"Approve the Order"}
                            backgroundColor={"#00B65E"}

                            fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                            borderRadius={30}
                            fontSize={12}
                            onPress={() => this._onApprovedOreder()}
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
                {this.profileSec()}
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
    const { CustomerRedux } = state;
    return { CustomerRedux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ApproveOrder);
