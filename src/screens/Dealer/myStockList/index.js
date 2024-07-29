import React from "react";
import {
    Image,
    SafeAreaView, ScrollView, Text, TouchableOpacity, View
} from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { OrderHistoryListTile, SubCategoryTab } from "../../../pageShared";
import { FlatList } from "react-native";
import { Color, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, VirtualizedView } from "../../../shared";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
const bar = {
    activeStrokeWidth: 5,
    inActiveStrokeWidth: 5,
    inActiveStrokeOpacity: 0.2
};


let StaticData = [
    // status -- 1:not reviewed,2:pending,3:Approved,4:order proccessed,5:order delivered,6:order rejected
    {
        id: 1,
        orderId: "286648",
        orderAmount: "1000000",
        orderDate: "2011-08-12T20:17:46.384Z",
        status: 1,
        percentage: 60
    },
    {
        id: 2,
        orderId: "286648",
        orderAmount: "1000000",
        orderDate: "2011-08-12T20:17:46.384Z",
        status: 2,
        percentage: 60
    },
    {
        id: 3,
        orderId: "286648",
        orderAmount: "1000000",
        orderDate: "2011-08-12T20:17:46.384Z",
        status: 3,
        percentage: 60
    },
    {
        id: 4,
        orderId: "286648",
        orderAmount: "1000000",
        orderDate: "2011-08-12T20:17:46.384Z",
        status: 4,
        percentage: 60
    },
    {
        id: 5,
        orderId: "286648",
        orderAmount: "1000000",
        orderDate: "2011-08-12T20:17:46.384Z",
        status: 5,
        percentage: 60
    },
    {
        id: 6,
        orderId: "286648",
        orderAmount: "1000000",
        orderDate: "2011-08-12T20:17:46.384Z",
        status: 3,
        percentage: 60
    },
    {
        id: 7,
        orderId: "286648",
        orderAmount: "1000000",
        orderDate: "2011-08-12T20:17:46.384Z",
        status: 2,
        percentage: 60
    },
    {
        id: 7,
        orderId: "286648",
        orderAmount: "1000000",
        orderDate: "2011-08-12T20:17:46.384Z",
        status: 1,
        percentage: 60
    },
    {
        id: 7,
        orderId: "286648",
        orderAmount: "1000000",
        orderDate: "2011-08-12T20:17:46.384Z",
        status: 2,
        percentage: 60
    },
    {
        id: 7,
        orderId: "286648",
        orderAmount: "1000000",
        orderDate: "2011-08-12T20:17:46.384Z",
        status: 4,
        percentage: 60
    },

]

const subCategoryData = [
    {
        id: 1,
        title: "All",
        icon: ImageName.YELLOW_OPEN_BOX_LOGO,
        check: false

    },
    {
        id: 2,
        title: "TMT",
        icon: ImageName.RED_PERCENTAGE_LOGO,
        check: false

    },
    {
        id: 3,
        title: "Steel",
        icon: ImageName.YELLOW_STAR_ICON,
        check: false
    },
    {
        id: 4,
        title: "Nails",
        icon: ImageName.NEW_COLLECTION_ICON,
        check: false
    },
]


// this is my stock list page 
class MyStockList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerListOrder: [],
            subCategoryArrData: subCategoryData
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
        this.setCategoryInitially()
    };
    // for set initial category
    setCategoryInitially = () => {
        let arr = this.state.subCategoryArrData;
        for (let i = 0; i < arr.length; i++) {
            if (i == 0) {
                arr[i].check = true;
            } else {
                arr[i].check = false;
            }
        }

        this.state.subCategoryArrData = arr;
        this.setState({
            subCategoryArrData: this.state.subCategoryArrData
        })
    }

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }
    // for render list section 
    renderContactList = (item,) => {
        return (
            <View style={{ marginHorizontal: 15 }}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    onPressTile = (val) => {
        this.props.navigation.navigate("SelectedOrderDetail", { data: val })
    }
    // this function used for design list section 
    listSection = (item, key) => {
        return (
            <View key={key}>
                <View style={styles.mainTile}>

                    <View style={styles.listContainer}>
                        <View style={styles.listSubContainer}>
                            <View style={styles.tmtTxtContainer}>
                                <Text style={styles.tmtTxt}>{"TMT 700 000"}</Text>
                                <Text style={styles.mmTxt}>15 mm </Text>
                            </View>
                            <View style={{ marginRight: '3%' }}>
                                <CircularProgressBase
                                    {...bar}
                                    value={item.percentage}
                                    radius={10}
                                    activeStrokeColor={'#00B65E'}
                                    inActiveStrokeColor={'#D1D1D1'}
                                    clockwise={false} />
                            </View>
                            <View style={{ marginRight: '3%' }}>
                                <View style={styles.valSec}>
                                    <Image source={ImageName.CIRCEL_MINUS} style={styles.cmImg} />
                                    <View style={{ width: 5 }} />
                                    <View style={styles.valTxtContainer}>
                                        <Text style={styles.valTxt}>15.5</Text>

                                    </View>
                                    <View style={{ width: 5 }} />
                                    <Image source={ImageName.CIRCEL_PLUS} style={styles.cpImg} />
                                </View>
                            </View>

                            <Text style={styles.mtTxt}>MT.</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
    // this function used for navigate to previous page 
    _onBack = () => {
        this.props.navigation.goBack();
    };
    // this function use for design header section 
    _onHeaderSec = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.subHeaderContainer}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                    </TouchableOpacity>
                    <View style={styles.stockTxtSec}>
                        <Text style={styles.stockTxt}>My Stock</Text>
                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={styles.tdbImg} />
                </View>
            </View>
        )
    }

    onRecentOrder = () => {
        this.props.navigation.navigate("OrderHistoryList")
    }

    onPressCart = () => {
        this.props.navigation.navigate("OrderCartDetails")
    }
    // for design profile title section 
    profileTileSec = () => {
        return (
            <View style={styles.profileContainer}>
                <View style={styles.subProfileContainer}>
                    <View>
                        <Text style={styles.lastStockTxt}>Last Stock in</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View>
                        <Text style={styles.stockDateTxt}>23 May 2023</Text>
                    </View>
                </View>
            </View>
        )
    }
    // for design category section
    subCategorySec = () => {
        const onSelectTab = (val) => {
            let arr = this.state.subCategoryArrData;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == val.id) {
                    arr[i].check = true
                } else {
                    arr[i].check = false
                }
            }
            this.state.subCategoryArrData = arr;
            this.setState({ subCategoryArrData: this.state.subCategoryArrData })
        }
        return (
            <View style={styles.categorySec}>
                {this.state.subCategoryArrData.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {this.state.subCategoryArrData.map((item, key) => (
                            <View key={key}>
                                <SubCategoryTab
                                    data={item}
                                    inActiveBGColor={"#fff"}
                                    additionStyles={
                                        {
                                            borderColor: "#D9D9D9",
                                            borderWidth: 0.5,
                                            borderRadius: 25,
                                            paddingTop: 7,
                                            paddingBottom: 7,
                                            paddingRight: 5,
                                            paddingLeft: 5,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    onPressTab={(value) => onSelectTab(value)}
                                />
                            </View>
                        ))}
                    </ScrollView>
                    :
                    null}
            </View>
        )
    }
    // for design footer section
    _onFooterSec = () => {
        return (
            <View style={styles.footerSec}>
                <BigTextButton
                    text={"Create a Sales Order"}
                    fontSize={12}
                    backgroundColor={"#1F2B4D"}
                    borderRadius={22}
                />
                <View style={{ height: 100 }} />
            </View>
        )
    }
    // for design button section
    buttonSec = () => {
        return (
            <View style={styles.btnSec}>
                <View style={{ width: 80 }}>
                    <BigTextButton
                        text={"Add New"}
                        fontSize={12}
                        backgroundColor={Color.COLOR.RED.AMARANTH}
                        borderRadius={25}
                    />
                </View>
                <View style={{ flex: 1 }} />
                <View style={{ width: 70 }}>
                    <BigTextButton
                        text={"Update"}
                        fontSize={12}
                        borderRadius={25}
                        backgroundColor={Color.COLOR.BLUE.LOTUS_BLUE}
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
                {this.profileTileSec()}
                {this.subCategorySec()}
                <VirtualizedView>
                    <React.Fragment>
                        <FlatList
                            data={this.state.customerListOrder}
                            renderItem={(item, key) => this.renderContactList(item, key)}
                            keyExtractor={(item, key) => key}
                            // onEndReached={this.fetchMore}
                            onEndReachedThreshold={0.1}
                        // ListFooterComponent={this.renderLoader}
                        // showsHorizontalScrollIndicator={false}
                        // showsVerticalScrollIndicator={false}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={this.state.refreshing}
                        //         onRefresh={() => this.onRefresh()}
                        //     />
                        // }
                        />
                    </React.Fragment>
                    {this.buttonSec()}
                    <View style={{ height: 50 }} />

                </VirtualizedView>


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

export default connect(mapStateToProps, mapDispatchToProps)(MyStockList);
