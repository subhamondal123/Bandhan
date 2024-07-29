import React from "react";
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, VirtualizedView } from "../../../shared";
import { FlatList } from "react-native";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import Header from "../../header/Header";
import { DashboardSelectionBox, OrderDashboardChart, OrderDashboardCustomerList, ProductOfferCard } from "../../../pageShared";

let selectionData = [
    {
        id: 1,
        backgroundColor: "#E06336",
        text: "Create New \n Order",
        image: ImageName.CREATE_ORDER_IMG
    }, {
        id: 2,
        backgroundColor: "#A087C3",
        text: "Sales \n History",
        image: ImageName.ORDER_HISTORY_IMG

    }, {
        id: 3,
        backgroundColor: "#54DD9B",
        text: "Upload \n Other Sales",
        image: ImageName.LOYALTY_SCHEME_IMG

    }

]


let customerListData = [
    //status - 1:Demand Increase,2:New Cycle Start,3:Low Stock,4:Order Request
    {
        id: 1,
        customer_name: "Ramesh Roy",
        dealerText: "Dealer",
        amount: "2215",
        days: "10",
        status: 3,
        imageName: ImageName.DUMMY_PROFILE_IMG
    },
    {
        id: 2,
        customer_name: "Sukanta Samanta",
        dealerText: "Dealer",
        amount: "4815",
        days: "5",
        status: 4,
        imageName: ImageName.DUMMY_PROFILE_IMG

    },
    {
        id: 3,
        customer_name: "Subha Mondal",
        dealerText: "Dealer",
        amount: "72005",
        days: "5",
        status: 1,
        imageName: ImageName.DUMMY_PROFILE_IMG

    },
    {
        id: 4,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 5,
        imageName: ImageName.DUMMY_PROFILE_IMG

    },
    {
        id: 5,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 2,
        imageName: ImageName.DUMMY_PROFILE_IMG

    },
    {
        id: 6,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 4,
        imageName: ImageName.DUMMY_PROFILE_IMG

    },
    {
        id: 7,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 2,
        imageName: ImageName.DUMMY_PROFILE_IMG

    },
    {
        id: 8,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 1,
        imageName: ImageName.DUMMY_PROFILE_IMG

    },
    {
        id: 9,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "25",
        status: 3,
        imageName: ImageName.DUMMY_PROFILE_IMG

    },
    {
        id: 10,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 1,
        imageName: ImageName.DUMMY_PROFILE_IMG

    },

]

// this is sales report dashboard page 
class SaleReportDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: customerListData,


        };
    }
    // this is initial function which is call first
    componentDidMount = async () => {
        await this._load();
    }
    // this is first function where set state data
    _load = async () => {

    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    // ====================================================================================================================

    onPressTab = (value) => {
        if (value.id == "1") {
            this.props.navigation.navigate("CreateSalesOrderList")
        }
        // if (value.id == "2") {
        //     this.props.navigation.navigate("OrderHistoryList")
        // }
        // if (value.id == "4") {
        //     this.props.navigation.navigate("MyStock")
        // }
    }

    // this function used for render contact list section
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
                <OrderDashboardCustomerList
                    data={item}
                    props={this.props}
                />
            </View>
        )
    }
    // this function used for design footer section 
    footerSec = () => {
        return (
            <View>
                <View style={{ marginHorizontal: '22%', marginTop: 25 }}>
                    <BigTextButton
                        text={"Search Other Associates"}
                        backgroundColor={'#1F2B4D'}
                        fontColor={"#fff"}
                        fontSize={12}
                        borderRadius={22}
                    />
                </View>
            </View>
        )

    }

    // this function used for design sales order description section 
    salesOrderSection = () => {
        const _onSalesOrderReport = () => {
            this.props.navigation.navigate("SalesOrderReport")
        }
        return (
            <View style={{ marginTop: 15 }}>
                <TouchableOpacity style={styles.mainTab} activeOpacity={0.9} onPress={() => _onSalesOrderReport()}>
                    <Text style={styles.salesOrderTitleTxt}>Sales Order Report</Text>
                    <Text style={styles.salesOrderTitleSubTxt}>This Month Sales Order status</Text>
                    <View style={styles.soContainer}>
                        <View style={styles.approveContainer}>
                            <Image source={ImageName.GREEN_TICK_ICON} style={styles.gtiImg} />
                            <Text style={styles.approvedTxt}> Approved</Text>
                            <Text style={styles.approvedVal}>  20</Text>
                        </View>
                        <View style={styles.partialContainer}>
                            <Image source={ImageName.ORDER_PARTIAL_ICON} style={styles.opiImg} />
                            <Text style={styles.partialTxt}> Partial</Text>
                            <Text style={styles.partialVal}>  20</Text>
                        </View>
                        <View style={styles.pendingContainer}>
                            <Image source={ImageName.GRAY_CIRCEL_ICON} style={styles.gciImg} />
                            <Text style={styles.pendingTxt}> Pending</Text>
                            <Text style={styles.pendingVal}>  20</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    // this function used for design total outstanding section 
    totalOutstandingSection = () => {
        const nav = () => {
            this.props.navigation.navigate("CreateSalesOrderList")

        }
        return (
            <View style={{ marginTop: 15 }}>
                <TouchableOpacity style={styles.totalOutStandingView} onPress={() => nav()}>
                    <View style={styles.toSec}>
                        <Text style={styles.salesOrderTitleTxt}>Total Outstanding</Text>
                        <View style={styles.toValSec}>
                            <Text style={styles.toValTxt}>23</Text>
                        </View>
                    </View>
                    <Text style={styles.salesOrderTitleSubTxt}>This Month Payment status</Text>
                    <View style={styles.receivedSec}>
                        <Text style={styles.receivedNum}>{'\u20B9' + " " + 24738988}</Text>
                        <Text style={styles.receivedTxt}>Received  <Text style={styles.numTxt}>{'\u20B9' + " " + 2473}</Text></Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    suggestedCustomerSec = () => {
        return (
            <View>
                <View style={styles.mtaSec}>
                    <Image source={ImageName.ACHIVE_TARGET_POINTS} style={styles.atpImg} />
                    <Text style={styles.mtaTxt}>My Top Associates</Text>
                </View>
                <React.Fragment>
                    <FlatList
                        data={this.state.customerList}
                        renderItem={(item, key) => this.renderContactList(item, key)}
                        keyExtractor={(item, key) => key}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={this.footerSec}

                    />
                </React.Fragment>
            </View>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.bandhanSec}>
                        <Image source={ImageName.BANDHAN_LOGO} style={styles.bandhanImg} />

                        <Text style={styles.bandhanTxt}>Bandhan</Text>
                    </View>
                </View>
                <VirtualizedView>
                    <ScrollView>
                        <View style={{ marginHorizontal: '5%' }}>
                            <DashboardSelectionBox data={selectionData} onSelectTab={(value) => this.onPressTab(value)} />
                            {this.salesOrderSection()}
                            {this.totalOutstandingSection()}
                            {this.suggestedCustomerSec()}
                        </View>
                        <View style={{ marginBottom: 100 }} />
                    </ScrollView>
                </VirtualizedView>
            </SafeAreaView >
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

export default connect(mapStateToProps, mapDispatchToProps)(SaleReportDashboard);
