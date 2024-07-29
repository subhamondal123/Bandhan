import React from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, DropdownInputBox, Modal, VirtualizedView } from "../../../shared";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import Header from "../../header/Header";
import { DashboardSelectionBox, OrderDashboardChart, ProductOfferCard } from "../../../pageShared";
import { CommonFunctions, StorageDataModification, Toaster } from "../../../services/common-view-function";
const bar = {
    activeStrokeWidth: 15,
    inActiveStrokeWidth: 15,
    inActiveStrokeOpacity: 0.2
};

const chartData = [
    { x: "Jan", y1: 100, y2: 200 },
    { x: "Feb", y1: 80, y2: 170 },
    { x: "March", y1: 70, y2: 140 },
    { x: "April", y1: 20, y2: 190 }
];

let selectionData = [
    {
        id: 1,
        iconBackgroundColor: "#F13748",
        backgroundColor: "#FFE4DC",
        text: "Create My \n Order",
        image: ImageName.CREATE_ORDER_IMG,
        fontSize: 12,
        redIcon: true
    }, {
        id: 2,
        iconBackgroundColor: "#F137A7",
        backgroundColor: "#FFD4F6",
        text: "Create\n Sales order",
        image: ImageName.ORDER_HISTORY_IMG,
        fontSize: 12,
        redIcon: true
    }, {
        id: 3,
        iconBackgroundColor: "#54DD9B",
        text: "Loyalty &\n Scheme",
        image: ImageName.LOYALTY_SCHEME_IMG,
        fontSize: 12,
        redIcon: false

    }, {
        id: 4,
        iconBackgroundColor: "#A087C3",
        text: "My Order \n History",
        image: ImageName.ORDER_HISTORY_IMG,
        fontSize: 12,
        redIcon: false


    }, {
        id: 5,
        iconBackgroundColor: "#5CA9E2",
        text: "Sales order \n Report",
        image: ImageName.ORDER_MY_SALES_IMG,
        fontSize: 12,
        redIcon: false


    }, {
        id: 6,
        iconBackgroundColor: "#FFA8B0",
        text: "Other \n Activity",
        image: ImageName.ORDER_OTHER_ACTIVITY_IMG,
        fontSize: 12,
        redIcon: false
    }

]


let staticData = [
    {
        id: 1,
        tmtText: "TMT 200",
        mmText: "45mm.",
        marketDemandText: "Market Demand Increase",
        desText: "in your location, suggested to take orders",
        predicted: "Predicted",
        persentText: "90%"
    },
    {
        id: 2,
        tmtText: "TMT 400",
        mmText: "75mm.",
        marketDemandText: "Market Demand Increase",
        desText: "in your location, suggested to take orders",
        predicted: "Predicted",
        persentText: "20%"
    },
    {
        id: 3,
        tmtText: "TMT 500",
        mmText: "55mm.",
        marketDemandText: "Market Demand Increase",
        desText: "in your location, suggested to take orders",
        predicted: "Predicted",
        persentText: "40%"
    },
    {
        id: 4,
        tmtText: "TMT 800",
        mmText: "12mm.",
        marketDemandText: "Market Demand Increase",
        desText: "in your location, suggested to take orders",
        predicted: "Predicted",
        persentText: "70%"
    }
]


let alertStockData = [
    {
        id: 1,
        tmtText: "TMT 200",
        mmText: "45mm.",
        marketDemandText: "Few Stock Left",
        desText: "suggest to Reorder",
        predicted: "Predicted",
        persentText: "90%"
    },
    {
        id: 2,
        tmtText: "TMT 400",
        mmText: "75mm.",
        marketDemandText: "Few Stock Left",
        desText: "suggest to Reorder",
        predicted: "Predicted",
        persentText: "20%"
    },
    {
        id: 3,
        tmtText: "TMT 500",
        mmText: "55mm.",
        marketDemandText: "Few Stock Left",
        desText: "suggest to Reorder",
        predicted: "Predicted",
        persentText: "40%"
    },
    {
        id: 4,
        tmtText: "TMT 800",
        mmText: "12mm.",
        marketDemandText: "Few Stock Left",
        desText: "suggest to Reorder",
        predicted: "Predicted",
        persentText: "70%"
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
    },
    {
        id: 2,
        customer_name: "Sukanta Samanta",
        dealerText: "Dealer",
        amount: "4815",
        days: "5",
        status: 4,
    },
    {
        id: 3,
        customer_name: "Subha Mondal",
        dealerText: "Dealer",
        amount: "72005",
        days: "5",
        status: 1,
    },
    {
        id: 4,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 5,
    },
    {
        id: 5,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 2,
    },
    {
        id: 6,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 4,
    },
    {
        id: 7,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 2,
    },
    {
        id: 8,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 1,
    },
    {
        id: 9,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "25",
        status: 3,
    },
    {
        id: 10,
        customer_name: "Debaditta Halder",
        dealerText: "Dealer",
        amount: "5215",
        days: "5",
        status: 1,
    },

]

let imageArr = [
    {
        id: 1,
        image: ImageName.BANNER_LOGO
    },
    {
        id: 2,
        image: ImageName.BANNER_LOGO
    },
    {
        id: 3,
        image: ImageName.BANNER_LOGO
    },
    {
        id: 4,
        image: ImageName.BANNER_LOGO
    },
    {
        id: 5,
        image: ImageName.BANNER_LOGO
    }
]
// this is order dashboard page 
class OrderDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marketDemandIncrease: staticData,
            alertStock: alertStockData,
            customerList: customerListData,
            imageName: imageArr,
            chartData: chartData,
            todayOrderData: {
                todayOrderText: "27",
                targetQty: "897000",
                todayOrderQty: "2720006",
                todayOrderAmount: "99742457",
                orderStatus_Approved: "20",
                orderStatus_Pending: "10",
                orderStatus_Partial: "15",
                tillDateOrderQty: "67668",
                tillDateOrderAmount: "678964",
                targetAchivePercentage: 70,

            },
            visibleModal: false,
            selectedCustomerData: {},
            stateArr: [],
            districtArr: [],
            zoneArr: [],
            countryArr: [],
            selectedCountryObj: {},
            selectedDistrictObj: {},
            selectedStateObj: {},
            selectedZoneObj: {},

        };
    }

    // this is a initial function which is call first
    componentDidMount = async () => {
        await this._load();
    }

    // this is the first function where set the state data
    _load = async () => {
        let userData = await StorageDataModification.userCredential({}, "get");
        this.setState({ countryArr: JSON.parse(CommonFunctions.getDesiredLocationFormat(userData.locationData)) });
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    // for product card  design implement here
    productOfferSec = () => {
        return (
            <React.Fragment>
                <Text style={styles.productText}>Product Offers</Text>
                <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {this.state.imageName.map((item, key) => (
                        <View key={key}>
                            <ProductOfferCard
                                data={item}
                            />
                        </View>
                    ))}
                </ScrollView>
            </React.Fragment>
        )
    }

    // this function used for stock update piachat design implementation 
    stockReportChartSec = () => {
        return (
            <React.Fragment>
                <View style={styles.widthView}>
                    <Text style={styles.myStockReportText}>My Stock Report</Text>
                </View>
                <View>
                    <OrderDashboardChart data={this.state.chartData} />
                </View>
            </React.Fragment>
        )
    }

    // for my last order card design implement
    lastOrderSec = () => {
        const _onHistory = () => {
            this.props.navigation.navigate("OrderHistoryList")
        }
        return (
            <View style={styles.todayOrderCard}>
                <View style={styles.marginSec}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.todayOrderText}>My Last Order</Text>
                        <Text style={styles.mtText}>#25809   <Text style={styles.qtyText}>25 June 23</Text></Text>
                        <Text style={styles.lastWeekOrderStatusText}>23 Items   <Text style={styles.itemRs}>{'\u20B9' + "" + "25860"}</Text></Text>
                        <View style={styles.flexRow}>
                            <View style={styles.approvedSec}>
                                <Text style={styles.approveText}>Approved</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, width: 140 }}>
                            <BigTextButton
                                text={"Order History"}
                                backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                borderRadius={25}
                                fontSize={12}
                                onPress={() => _onHistory()}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <CircularProgressBase
                            {...bar}
                            value={this.state.todayOrderData.targetAchivePercentage}
                            radius={50}
                            activeStrokeColor={'#00B65E'}
                            inActiveStrokeColor={'#D1D1D1'}
                            clockwise={false}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.parsentText}>{this.state.todayOrderData.targetAchivePercentage}%</Text>
                                <Text style={styles.targetText}>{"Target"}</Text>
                                <Text style={styles.achivedText}>{"Achieved"}</Text>
                            </View>
                        </CircularProgressBase>
                        <Text style={styles.targetMt}>Target {this.state.todayOrderData.tillDateOrderAmount}MT.</Text>
                        <View style={styles.tillDateView}>
                            <Text style={styles.tillDateOrderText}>Till Date Order</Text>
                            <Text style={styles.tillDateMtText}>{this.state.todayOrderData.tillDateOrderQty}MT.  <Text style={styles.MtAount}>{'\u20B9' + "" + this.state.todayOrderData.tillDateOrderAmount}</Text></Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    // this function used for product recommendation section design implement
    newProductRecomendedSec = () => {
        return (
            <React.Fragment>
                <View style={{ marginTop: 20 }} />
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.newProductRecommendationText}>New Product Recommendation for You</Text>
                </View>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {this.state.marketDemandIncrease.map((item, key) => (
                        <View style={styles.tmtView} key={key}>
                            <View style={styles.marginHorizntalView}>
                                <View style={styles.flexRow}>
                                    <Image source={ImageName.RECOMENDATION_MAGIC_STICK_ICON} style={styles.magicStrickLogo} />
                                    <Text style={styles.twoTmt}>{item.tmtText}</Text>
                                    <Text style={styles.mmforeValue}>{item.mmText}</Text>
                                </View>
                                <View style={styles.flexRow}>
                                    <View style={{ flex: 0.8 }}>
                                        <Text style={styles.textPredicted}>{item.predicted} <Text style={styles.demandText}>{item.marketDemandText} </Text>{item.desText}</Text>
                                    </View>
                                    <View style={styles.parsentSec}>
                                        <View style={{ width: 12 }} />
                                        <Text style={styles.productPersentValue}>{item.persentText}</Text>
                                        <Image source={ImageName.GREEN_UP_ARROW} style={styles.greenUpArrow} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </React.Fragment>
        )
    }

    // for alert stock design implement
    alertForStockSec = () => {
        return (
            <React.Fragment>
                <View style={styles.alertStockView}>
                    <Image source={ImageName.ALERT_ICON} style={styles.alertImg} />
                    <Text style={styles.alertForStockText}>Alert for Stock</Text>
                </View>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {this.state.alertStock.map((item, key) => (
                        <View style={styles.alertForStockView} key={key}>
                            <View style={styles.paddingView}>
                                <View style={styles.centerView}>
                                    <View style={styles.columnFlexView}>
                                        <View style={styles.centerView}>
                                            <Text style={styles.tmtText}>{item.tmtText}</Text>
                                            <Text style={styles.mmText}>{item.mmText}</Text>
                                        </View>
                                        <View style={{}}>
                                            <Text style={styles.predictedText}>{item.predicted} <Text style={styles.desText}>{item.marketDemandText} </Text>{'\n' + item.desText}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.marginleftView}>
                                        <Text style={styles.parsentText}>{item.persentText}</Text>
                                        <Text style={styles.stockLeftText}>Stock Left</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </React.Fragment>
        )
    }

    // sales order report card design implement
    salesOrderSection = () => {
        const _onSalesOrderReport = () => {
            this.props.navigation.navigate("SaleReportDashboard")
        }
        return (
            <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={styles.mainTab} activeOpacity={0.9} onPress={() => _onSalesOrderReport()}>
                    <Text style={styles.salesOrderTitleTxt}>Sales Order Report</Text>
                    <Text style={styles.salesOrderTitleSubTxt}>This Month Sales Order status</Text>
                    <View style={styles.appSec}>
                        <View style={styles.approvedTxtSec}>
                            <Image source={ImageName.GREEN_TICK_ICON} style={styles.gtiImg} />
                            <Text style={styles.salesApproText}> Approved</Text>
                            <Text style={styles.approValTxt}>  20</Text>
                        </View>
                        <View style={styles.partialTxtSec}>
                            <Image source={ImageName.ORDER_PARTIAL_ICON} style={styles.opiImg} />
                            <Text style={styles.partialTxt}> Partial</Text>
                            <Text style={styles.partialValTxt}>  20</Text>
                        </View>
                        <View style={styles.pendingTxtSec}>
                            <Image source={ImageName.GRAY_CIRCEL_ICON} style={styles.gciImg} />
                            <Text style={styles.pendingTxt}> Pending</Text>
                            <Text style={styles.pendingValTxt}>  20</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    // this function used onpress tab for navigate to another page 
    onPressTab = (value) => {
        if (value.id == "1") {
            this.setState({ visibleModal: true })
            // this.props.navigation.navigate("CreateOrderList")
        }
        if (value.id == "2") {
            this.props.navigation.navigate("CreateSalesOrderList")
        }
        if (value.id == "4") {
            this.props.navigation.navigate("OrderHistoryList")
        }
        if (value.id == "5") {
            this.props.navigation.navigate("SalesOrderReport")
        }
        // if (value.id == "6") {
        //     this.props.navigation.navigate("OthersActivityDashboard")
        // }
    }
    // for selecte country  dropdown 
    _onSelectCountry = async (data) => {
        this.state.selectedCountryObj = data;
        this.setState({
            selectedCountryObj: this.state.selectedCountryObj,
            stateArr: data.state
        })
        // await this.getStateData(data.id);
    }

    // for select state data
    _onSelectState = async (data) => {
        this.state.selectedStateObj = data;
        this.setState({
            selectedStateObj: this.state.selectedStateObj,
            districtArr: data.city
        })
        // await this.getDistrictData(data.id);
    }

    // for change the dist and city
    _onSelectDistCity = async (data) => {
        this.state.selectedDistrictObj = data;
        this.setState({
            selectedDistrictObj: this.state.selectedDistrictObj,
            zoneArr: data.zone
        })
        // await this.getZoneData(data);
    }

    // for select the the zone
    _onSelectZone = (data) => {
        this.state.selectedZoneObj = data;
        this.setState({
            selectedZoneObj: this.state.selectedZoneObj
        })
    }

    onProceed = () => {
        let reqData = {
            customerCountryId: this.state.selectedCountryObj.id,
            customerStateId: this.state.selectedStateObj.id,
            customerDistrictId: this.state.selectedDistrictObj.id,
            customerZoneId: this.state.selectedZoneObj.id,
        }
        if (this.state.selectedCountryObj.id == undefined || this.state.selectedStateObj.id == null) {
            Toaster.ShortCenterToaster("Please Select State!")
        } else if (this.state.selectedDistrictObj.id == undefined || this.state.selectedZoneObj.id == null) {
            Toaster.ShortCenterToaster("Please Select Zone!")
        } else {
            this.props.navigation.navigate("CreateOrderList", { data: reqData })
            this.closeModal()
        }
    }

    // for close the modal section
    closeModal = () => {
        this.setState({ visibleModal: false })
        this.clearModalData()
    }

    clearModalData = () => {
        this.setState({
            selectedCountryObj: {},
            selectedStateObj: {},
            selectedDistrictObj: {},
            selectedZoneObj: {}
        })
    }

    // this function used for modal section design 
    modalSection = () => {
        // for on press proceed button this function used 
        return (
            <Modal
                isVisible={this.state.visibleModal}
                onBackdropPress={() => this.closeModal()}
                children={
                    <View style={styles.modalview}>
                        <View style={{ paddingHorizontal: 10, justifyContent: "center" }}>
                            <React.Fragment>
                                <View style={styles.selectTxtSec}>
                                    <Text style={styles.modalHeaderTxt}>Select Location</Text>
                                </View>
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ height: 10 }} />
                                    <DropdownInputBox
                                        selectedValue={this.state.selectedCountryObj.id ? this.state.selectedCountryObj.id.toString() : "0"}
                                        data={this.state.countryArr}
                                        onSelect={(value) => this._onSelectCountry(value)}
                                        headerText={"Country*"}
                                    />
                                </View>
                                {this.state.stateLoader ? null : <>
                                    <View style={{ marginTop: 8 }}>
                                        <DropdownInputBox
                                            selectedValue={this.state.selectedStateObj.id ? this.state.selectedStateObj.id.toString() : "0"}
                                            data={this.state.stateArr}
                                            onSelect={(value) => this._onSelectState(value)}
                                            headerText={"State*"}
                                        />
                                    </View>
                                </>}
                                {this.state.distLoader ?
                                    null :
                                    <>
                                        <View style={{ marginTop: 20 }}>
                                            <DropdownInputBox
                                                selectedValue={this.state.selectedDistrictObj.id ? this.state.selectedDistrictObj.id.toString() : "0"}
                                                data={this.state.districtArr}
                                                onSelect={(value) => this._onSelectDistCity(value)}
                                                headerText={"District/City*"}

                                            />
                                        </View>
                                    </>
                                }
                                {this.state.zoneLoader ?
                                    null :
                                    <View style={{ marginTop: 20 }}>
                                        <DropdownInputBox
                                            selectedValue={this.state.selectedZoneObj.id ? this.state.selectedZoneObj.id.toString() : "0"}
                                            data={this.state.zoneArr}
                                            onSelect={(value) => this._onSelectZone(value)}
                                            headerText={"Zone*"}
                                        />
                                    </View>
                                }
                            </React.Fragment>
                            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                                <TouchableOpacity style={styles.proceedTab} onPress={() => this.onProceed()}>
                                    <Text style={styles.proceedTxt}>Proceed</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            />
        )
    }

    // for total outstanding sales card design implement
    totalOutstandingSection = () => {
        return (
            <View style={{ marginTop: 15 }}>
                <TouchableOpacity style={styles.totalOutStandingView} activeOpacity={0.9}>
                    <View style={styles.totalSaleTxtSec}>
                        <Text style={styles.salesOrderTitleTxt}>Total Sales Outstanding</Text>
                        <View style={styles.whiteCircel}>
                            <Text style={styles.whiteCircelText}>23</Text>
                        </View>
                    </View>
                    <View style={styles.amountView}>
                        <Text style={styles.yellowAmount}>{'\u20B9' + " " + 24738988}</Text>
                        <Text style={styles.receivedTxt}>Received  <Text style={styles.receiveAmountText}>{'\u20B9' + " " + 2473}</Text></Text>
                    </View>
                    <View style={{ marginTop: 10 }} />
                    <View style={styles.rameshTxtSec}>
                        <View style={styles.rameshTxtSubSec}>
                            <Image source={ImageName.DUMMY_PROFILE_IMG} style={styles.userImg} />
                            <View style={styles.marginLeftView}>
                                <Text style={styles.userNameText}>Ramesh Roy</Text>
                                <Text style={styles.erpText}>DELR0317</Text>
                            </View>
                            <Text style={styles.yellowAmount}>{'\u20B9' + " " + 2473}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    // this is main render to this page 
    render() {
        const _onstockUpdate = () => {
            this.props.navigation.navigate("MyStock")
        }
        return (
            <SafeAreaView style={styles.container}>
                {this.modalSection()}
                <Header {...this.props} />
                <VirtualizedView>
                    <ScrollView>
                        <View style={{ marginHorizontal: '5%' }}>
                            <DashboardSelectionBox data={selectionData} onSelectTab={(value) => this.onPressTab(value)} />
                            {this.salesOrderSection()}
                            {this.totalOutstandingSection()}
                            {this.lastOrderSec()}
                            {this.newProductRecomendedSec()}
                            {this.stockReportChartSec()}
                            {this.alertForStockSec()}
                            <View style={styles.updateStockButton}>
                                <Text style={styles.stockLastUpdateText}>Stock Last Updated <Text style={styles.stockUpdateDate}>25th Jan 23</Text></Text>
                                <View style={{ width: 150 }}>
                                    <BigTextButton
                                        text={"Update Stock"}
                                        backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                        fontSize={14}
                                        borderRadius={25}
                                        onPress={() => _onstockUpdate()} />
                                </View>
                            </View>
                            {this.productOfferSec()}
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
    bindActionCreators({ stateCheckForNetwork },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(OrderDashboard);
