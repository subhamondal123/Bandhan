import React from "react";
import {
    SafeAreaView, TextInput, TouchableOpacity, View
} from "react-native";
import { stateCheckForNetwork, customerOrderData } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { FlatList } from "react-native";
import { Text } from "react-native";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { Image } from "react-native";
import { BigTextButton, DropdownInputBox, Loader, NoDataFound, TextInputBox, VirtualizedView } from "../../../shared";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { ScrollView } from "react-native";
// import CustomerSubCategoryTab from "../../../pageShared/order/customerSubCategoryTab";
// import { DynamicProfileCard } from "../../../pageShared";
import { MiddlewareCheck, StoreUserOtherInformations } from "../../../services/middleware";
import { ErrorCode } from "../../../services/constant";
import { modifyBrandList, modifyProductList, modifyProfileData, modifyRequestProduct } from "./function";
import { ActivityIndicator } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { DataConvert, DateConvert, StorageDataModification, Toaster } from "../../../services/common-view-function";
import { DataValidator } from "../../../validators";
import { CustomerSubCategoryTab } from "../../../pageShared";

const bar = {
    activeStrokeWidth: 5,
    inActiveStrokeWidth: 5,
    inActiveStrokeOpacity: 0.2
};

const categoryData = [
    {
        id: 1,
        title: "Usual",
        icon: ImageName.YELLOW_OPEN_BOX_LOGO,
        check: true

    },
    {
        id: 2,
        title: "Offers",
        icon: ImageName.RED_PERCENTAGE_LOGO,
        check: false

    },
    {
        id: 3,
        title: "Popular",
        icon: ImageName.YELLOW_STAR_ICON,
        check: false
    },
    {
        id: 4,
        title: "New",
        icon: ImageName.NEW_COLLECTION_ICON,
        check: false
    },
]
// this is create order list page 
class CreateOrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subCategoryLoader: false,
            pageLoader: false,
            listLoader: false,
            refreshing: true,
            pageNum: 0,
            limit: 50,
            totalDataCount: 0,
            initialApiCall: false,
            addCartLoader: false,
            categoryArrData: categoryData,
            subCategoryArrData: [],
            selectProductList: [],
            selectedBrandId: "",
            totalItemAmount: 0,
            profileData: {},
            selectedItemArr: [],
            totalAddedItems: 0,
            selectedAllItems: [],
            customerId: ""
        };
    }
    // this is initial function which is call first 
    componentDidMount = async () => {
        let cust = await StorageDataModification.userCredential({}, "get")
        let custId = cust.customerId.toString();
        this.setState({ customerId: custId })
        await StorageDataModification.OrderCustomerProfileData({}, "clear")
        await this._load();
    }

    // navigate to back screen
    _onBack = async () => {
        await StorageDataModification.OrderCustomerProfileData({}, "clear")
        this.props.navigation.goBack();
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    //initial load function
    _load = async () => {
        await this.getProfileData()
        await this.storeBrandData()
        await this._getBrandList()
        StoreUserOtherInformations("", {}, this.props);
    };

    //store brand data
    storeBrandData = async () => {
        let listData = await StorageDataModification.BrandListData({}, "get");
        if (listData == null || listData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                subCategoryArrData: listData.brandList,
                pageLoader: false
            })
        }
    }

    //store list data
    storeInitialData = async () => {
        let listData = await StorageDataModification.selectProductListData({}, "get");
        if (listData == null || listData == undefined) {
            this.setState({ pageLoader: true })
        } else {
            this.setState({
                selectProductList: listData.pjpList,
                totalDataCount: listData.totalCount,
                pageLoader: false
            })
        }
    }
    // this function used for fetching data
    getProfileData = async () => {
        let cust = await StorageDataModification.userCredential({}, "get")
        let custId = cust.customerId.toString();
        let reqData = {
            customerId: custId
        };

        let responseData = await MiddlewareCheck("getCustomerDataWithCartItemCount", reqData, this.props)
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedProfileData = modifyProfileData(responseData.response)
                this.setState({
                    profileData: modifiedProfileData
                })
                let profileData = modifiedProfileData;
                let storeData = await StorageDataModification.OrderCustomerProfileData({}, "get")

                profileData["cartItems"] = storeData ? storeData[custId] : [];
                profileData["userId"] = custId;
                if (storeData == null || storeData == undefined) {
                    profileData["totalItemAmount"] = 0;
                } else {
                    profileData["totalItemAmount"] = storeData[custId].totalItemAmount;
                }
                this.setState({
                    totalItemAmount: (storeData == null || storeData == undefined) ? 0 : storeData[custId].totalItemAmount
                })
                let finalObjData = storeData ? storeData : {};
                if (finalObjData.hasOwnProperty(custId)) {
                } else {
                    finalObjData[custId] = profileData;
                }
                await StorageDataModification.OrderCustomerProfileData(finalObjData, "store")
            }
        }
    }

    //get brand data
    _getBrandList = async () => {
        this.setState({ subCategoryLoader: true })

        let responseData = await MiddlewareCheck("conversionAllLanding", {}, this.props)
        if (responseData === false) {
            this._onNetworkError()
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let brandData = await StorageDataModification.BrandListData({}, "get");
                let modifiedData = modifyBrandList(responseData.response);
                if (brandData == null || brandData == undefined) {
                    this.setState({
                        subCategoryArrData: modifiedData.brandList,
                    })
                    await StorageDataModification.BrandListData(modifiedData, "store");
                } else {
                    this.setState({
                        subCategoryArrData: modifiedData.brandList,
                    })
                    await StorageDataModification.BrandListData(modifiedData, "store");
                }
                if (this.state.subCategoryArrData.length > 0) {
                    for (let i = 0; i < this.state.subCategoryArrData.length; i++) {
                        if (this.state.subCategoryArrData[i].check == true) {
                            await this.storeInitialData();
                            this.setState({ selectedBrandId: this.state.subCategoryArrData[i].labelId })
                            await this.getProductList(this.state.subCategoryArrData[i].labelId)
                        }
                        else {
                            this.state.subCategoryArrData[i].check = false
                        }
                    }
                }
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({ subCategoryLoader: false })
    }

    //get flatlist data
    getProductList = async (id) => {
        let cust = await StorageDataModification.userCredential({}, "get")
        let custId = cust.customerId.toString();

        this.setState({ refreshing: false, pageLoader: true });
        let reqData = {
            "limit": this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            "brandId": id
        }
        let responseData = await MiddlewareCheck("getAllProductBrandwiseList", reqData, this.props);

        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                if (this.state.pageNum == 0) {
                    let pjpData = await StorageDataModification.selectProductListData({}, "get");
                    let pjpListData = await modifyProductList(responseData, custId);

                    if (pjpData == null || pjpData == undefined) {
                        this.setState({
                            selectProductList: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        await StorageDataModification.selectProductListData(pjpListData, "store");
                    } else if (JSON.stringify(pjpData.pjpList) === JSON.stringify(pjpListData.pjpList)) {
                        this.setState({
                            selectProductList: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        if (pjpData.totalCount !== pjpListData.totalCount) {
                            await StorageDataModification.selectProductListData(pjpListData, "store");
                        }
                    } else {
                        this.setState({
                            selectProductList: pjpListData.pjpList,
                            totalDataCount: pjpListData.totalCount
                        });
                        await StorageDataModification.selectProductListData(pjpListData, "store");
                    }
                    this.setState({ initialApiCall: true })
                } else {
                    let pjpListData = modifyProductList(responseData, custId);
                    this.setState({
                        selectProductList: [...this.state.selectProductList, ...pjpListData.pjpList],
                        totalDataCount: pjpListData.totalCount
                    });
                }
            } else {
                if (this.state.pageNum == 0) {
                    await StorageDataModification.selectProductListData({}, "clear");
                    this.setState({
                        pageNum: 0,
                        limit: 10,
                        totalDataCount: 0,
                        selectProductList: [],
                        initialApiCall: true
                    });
                }
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
        this.setState({
            filterLoader: false,
            pageLoader: false,
            listLoader: false,
            listDataLoader: false
        })
    }

    onProductDetails = (item) => {
        this.props.navigation.navigate("selectedProductDetail", { data: item })
    }

    //for remove a product
    removeProduct = (item, key) => {
        let arr = this.state.selectProductList;
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {

            } else {
                newArr.push(arr[i])
            }
        }
        this.setState({ selectProductList: newArr })
    }

    //on decrement
    _onMinus = async (item, key) => {

        let cust = await StorageDataModification.userCredential({}, "get")
        let custId = cust.customerId.toString();

        let totalItemAmount = parseFloat(this.state.totalItemAmount) - (item.productRate / 10); // set total items amount

        let arr = this.state.selectProductList;
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                var quantity = parseFloat(arr[i].quantity);
                var result = (quantity - 0.1).toFixed(1);
                arr[i].quantity = parseFloat(result);
                arr[i].totalAmount = parseFloat(arr[i].quantity) * parseFloat(arr[i].productRate);

                // arr[i].quantity = arr[i].quantity - 1
                // arr[i].totalAmount = parseInt(arr[i].quantity) * parseInt(arr[i].productRate)
            }
        }
        this.setState({
            selectProductList: arr,
            totalItemAmount: totalItemAmount
        })
        // for store data update

        let storeData = await StorageDataModification.OrderCustomerProfileData({}, "get");
        let selectStoreData = storeData[custId];
        if (storeData && storeData[custId].cartItems.length > 0) {

            for (let i = 0; i < selectStoreData.cartItems.length; i++) {
                if (item.productId == selectStoreData.cartItems[i].productId) {
                    // selectStoreData.cartItems[i].quantity = selectStoreData.cartItems[i].quantity - 1
                    // selectStoreData.cartItems[i].totalPrice = parseInt(selectStoreData.cartItems[i].quantity) * parseInt(selectStoreData.cartItems[i].productRate)
                    var storeQuantity = parseFloat(selectStoreData.cartItems[i].quantity);
                    var storeResult = (storeQuantity - 0.1).toFixed(1);
                    selectStoreData.cartItems[i].quantity = parseFloat(storeResult);
                    selectStoreData.cartItems[i].totalPrice = parseFloat(selectStoreData.cartItems[i].quantity) * parseFloat(selectStoreData.cartItems[i].productRate);
                }
            }
        }
        storeData[custId] = selectStoreData;
        await StorageDataModification.OrderCustomerProfileData(storeData, "store")

    }

    // on increment
    _onPlus = async (item, key) => {
        let cust = await StorageDataModification.userCredential({}, "get")
        let custId = cust.customerId.toString();
        let totalItemAmount = parseFloat(this.state.totalItemAmount) + (item.productRate / 10); // set total items amount
        let arr = this.state.selectProductList;
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                var quantity = parseFloat(arr[i].quantity);
                var result = (quantity + 0.1).toFixed(1);
                arr[i].quantity = parseFloat(result);
                arr[i].totalAmount = parseFloat(arr[i].quantity) * parseFloat(arr[i].productRate);

                // arr[i].quantity = arr[i].quantity + 1

                // arr[i].totalAmount = parseInt(arr[i].quantity) * parseInt(arr[i].productRate);
            }
        }

        this.setState({
            selectProductList: arr,
            totalItemAmount: totalItemAmount,
            totalAddedItems: this.state.totalAddedItems
        })
        // for store data update
        let storeData = await StorageDataModification.OrderCustomerProfileData({}, "get");
        let selectStoreData = storeData[custId];
        if (storeData && storeData[custId].cartItems.length > 0) {

            for (let i = 0; i < selectStoreData.cartItems.length; i++) {
                if (item.productId == selectStoreData.cartItems[i].productId) {
                    // selectStoreData.cartItems[i].quantity = selectStoreData.cartItems[i].quantity + 1
                    // selectStoreData.cartItems[i].totalPrice = parseInt(selectStoreData.cartItems[i].quantity) * parseInt(selectStoreData.cartItems[i].productRate)
                    var storeQuantity = parseFloat(selectStoreData.cartItems[i].quantity);
                    var storeResult = (storeQuantity + 0.1).toFixed(1);
                    selectStoreData.cartItems[i].quantity = parseFloat(storeResult);
                    selectStoreData.cartItems[i].totalPrice = parseFloat(selectStoreData.cartItems[i].quantity) * parseFloat(selectStoreData.cartItems[i].productRate);

                }
            }
        }
        storeData[custId] = selectStoreData;
        await StorageDataModification.OrderCustomerProfileData(storeData, "store")
    }

    getTotalItemCount = (brandId, storeData) => {

        let totalItemAmount = 0;

        let selectStoreData = storeData[this.state.customerId];
        if (storeData && selectStoreData.cartItems.length > 0) {
            for (let i = 0; i < selectStoreData.cartItems.length; i++) {
                if (selectStoreData.cartItems[i].brandId !== brandId) {
                    totalItemAmount = parseFloat(totalItemAmount) + selectStoreData.cartItems[i].totalPrice;
                }
            }
        }
        return totalItemAmount;
    }

    _onChangeQuantity = async (val, item, key) => {
        let storeData = await StorageDataModification.OrderCustomerProfileData({}, "get");
        let totalAmountCheck = false;
        let tempAmount = (val.length > 0 ? parseFloat(val).toFixed(1) : 0);
        let totalItemAmount = (this.state.totalItemAmount) + (item.productRate * tempAmount);

        if (tempAmount == 0) {
            totalItemAmount = this.getTotalItemCount(this.state.selectedBrandId, storeData);
            totalAmountCheck = true;
        }
        let arr = this.state.selectProductList;
        let quant = DataValidator.inputEntryValidate(val, "amount");
        let t = "";
        if (quant.includes('.') && quant.split('.')[1].length > 1) {
            // Truncate the input value to allow only one digit after the decimal point
            const truncatedValue = parseFloat(quant).toFixed(1);
            t = truncatedValue.toString();
        } else {
            t = quant;
        }
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].quantity = t;
                arr[i].totalAmount = tempAmount * parseFloat(arr[i].productRate);
            }
            if (totalAmountCheck) {
                totalItemAmount = parseFloat(totalItemAmount) + parseFloat(arr[i].totalAmount);
            }
        }
        this.setState({ selectProductList: arr, totalItemAmount: totalItemAmount })
    }

    handleKeyPress = (event, item) => {
        const { key } = event.nativeEvent;
        // Check if the pressed key is a digit or a decimal point
        if (/^\d$/.test(key) || key === '.') {
            const decimalIndex = item.quantity.indexOf('.');
            // Check if there is already a decimal point
            if (decimalIndex > -1) {
                // Check if there are already digits after the decimal point
                const decimalPart = item.quantity.slice(decimalIndex + 1);
                if (decimalPart.length >= 1 && key !== '.') {
                    // Prevent entering more than one digit after the decimal point
                    return false;
                }
            }
        }
    };
    //to render list
    renderContactList = (item, key) => {
        return (
            <View style={{}}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    //list sectiion
    listSection = (item, key) => {
        return (
            <View key={key}>
                <View style={styles.listContainer}>
                    <View style={styles.subListContainer} >
                        <View >
                            <View style={styles.btnPress}>
                                <TouchableOpacity activeOpacity={0.9} onPress={() => this.onProductDetails(item)} style={{ flexDirection: "row" }}>
                                    <View style={styles.logo_Txt}>
                                        <Image source={ImageName.RED_PERCENTAGE_LOGO} style={styles.redLogo} />
                                        <View style={{ width: 10 }} />
                                        <Text style={styles.proDesc}>{item.productDescription}</Text>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    <View style={styles.circulerContainer}>
                                        <CircularProgressBase
                                            {...bar}
                                            value={60}
                                            radius={10}
                                            activeStrokeColor={'#00B65E'}
                                            inActiveStrokeColor={'#D1D1D1'}
                                            clockwise={false} />
                                        <Text style={styles.mtTxt}>{'\u20B9' + " " + item.productRate}/MT.</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: '#89CDEF', marginTop: 12 }} />
                            <View style={styles.quantityContainer}>
                                <View style={{ flex: 0.6 }}>
                                    <View style={styles.subQuanContainer}>
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => this._onMinus(item, key)} disabled={item.quantity == 0.0 ? true : false}>
                                            <Image source={ImageName.CIRCEL_MINUS} style={styles.cmIcon} />
                                        </TouchableOpacity>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                placeholder={"0.0"}
                                                defaultValue={item.quantity.toString()}
                                                onChangeText={(value) => this._onChangeQuantity(value, item, key)}
                                                maxLength={4}
                                                keyboardType="number-pad"
                                                style={{ color: Color.COLOR.BLUE.LOTUS_BLUE }}
                                            // onKeyPress={(e) => this.handleKeyPress(e, item)}
                                            />
                                            {/* <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{(item.quantity.toFixed(2))}</Text> */}
                                        </View>
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => this._onPlus(item, key)}>
                                            <Image source={ImageName.CIRCEL_PLUS} style={{ height: 21, width: 21, resizeMode: 'contain' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ width: 6 }} />
                                <View style={{ flex: 0.4 }}>
                                    <DropdownInputBox
                                        // selectedValue={selectedExpenseCategoryObj.id ? selectedExpenseCategoryObj.id.toString() : "0"}
                                        // data={expenseCategoryArr}
                                        // onSelect={(value) => _onSelectExpenceType(value)}   
                                        backgroundColor={"#fff"}
                                        headerText={"MT."}
                                        fontSize={10}
                                        borderRadius={20}
                                        unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                        upDownImages={[ImageName.UP_ARROW, ImageName.DOWN_ARROW]}
                                        isDisabled={true}

                                    />
                                </View>
                                <Text style={styles.tmTxt}>{'\u20B9' + " " + parseFloat(item.totalAmount).toFixed(1)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    updateCartCount = async () => {
        let cust = await StorageDataModification.userCredential({}, "get")
        let custId = cust.customerId.toString();
        let reqData = { customerId: custId }
        let responseData = await MiddlewareCheck("getCustomerDataWithCartItemCount", reqData, this.props)
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedProfileData = modifyProfileData(responseData.response)
                this.setState({
                    profileData: modifiedProfileData
                })
            }
        }
    }

    //header section
    headerSec = () => {
        const onPressCart = () => {
            this.props.navigation.navigate("DealerCartDetails", { data: this.state.profileData, onUpdateCart: this.updateCartCount })
        }
        return (
            <View style={styles.headerSecView}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                    <Image source={ImageName.BACK_IMG} style={styles.backImg} />
                </TouchableOpacity>
                <View style={styles.headerTextView}>
                    <Text style={styles.headingTxt}>Order for Customer</Text>
                </View>
                <TouchableOpacity style={styles.cardView} onPress={() => onPressCart()}>
                    <Image source={ImageName.SHOPING_ORDER_BOX} style={styles.shopingImg} />
                    <View style={{ width: 5 }} />
                    <Text style={styles.cartCount}>{this.state.profileData.cartCount}</Text>
                </TouchableOpacity>
                <Image source={ImageName.THREE_DOT_BLACK} style={styles.threeDot} />
            </View>
        )
    }

    //redirection to orderHistory
    onRecentOrder = () => {
        this.props.navigation.navigate("OrderHistoryList")
    }

    updateCart = async () => {
        let cust = await StorageDataModification.userCredential({}, "get")
        let custId = cust.customerId.toString();

        let reqData = { customerId: custId }
        let responseData = await MiddlewareCheck("getCustomerDataWithCartItemCount", reqData, this.props)
        if (responseData === false) {
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modifiedProfileData = modifyProfileData(responseData.response)
                this.setState({
                    profileData: modifiedProfileData
                })
            } else {
                Toaster.ShortCenterToaster(responseData.message)
            }
        }
    }

    //profileTile Section
    profileTileSec = (val) => {
        const onCart = () => {
            this.props.navigation.navigate("OrderCartDetails", { data: this.state.profileData, onUpdateCart: this.updateCartDetail, onUpdateList: this._getBrandList })
        }
        const onTabSelect = () => {
            this.props.navigation.navigate("OrderHistoryList", { data: this.state.profileData })
        }
        return (
            <View>
                <DynamicProfileCard props={this.props} data={this.state.profileData} onPressCart={(item) => onCart(item)} onPressTab={(val) => onTabSelect(val)} />
            </View>
        )
    }

    //category section
    categorySec = () => {
        const onSelectTab = (val) => {
            for (let i = 0; i < this.state.categoryArrData.length; i++) {
                if (this.state.categoryArrData[i] == val) {
                    this.state.categoryArrData[i].check = true
                } else {
                    this.state.categoryArrData[i].check = false
                }
            }
            this.setState({
                categoryArrData: this.state.categoryArrData
            })
        }

        return (
            <View style={styles.categoryContainer}>
                {this.state.categoryArrData.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {this.state.categoryArrData.map((item, key) => (
                            <View key={key}>
                                <CustomerSubCategoryTab data={item} onPressTab={(val) => onSelectTab(val)} />
                            </View>
                        ))}
                    </ScrollView>
                    :
                    null}
            </View>
        )
    }

    setSelectedItems = async (labelId) => {

        let cust = await StorageDataModification.userCredential({}, "get")
        let custId = cust.customerId.toString();
        let storeData = await StorageDataModification.OrderCustomerProfileData({}, "get");
        let selectedItemData = modifyRequestProduct(this.state.selectProductList, labelId);
        let selectStoreData = storeData[custId];
        let selectedItems = [];

        if (selectedItemData.length > 0) {
            if (selectStoreData.cartItems.length === 0) {
                selectStoreData.cartItems = selectedItemData;
                selectedItems = selectedItemData;
            } else {
                for (let i = 0; i < selectedItemData.length; i++) {
                    let index = "",
                        cartFoundCheck = false;
                    for (let j = 0; j < selectStoreData.cartItems.length; j++) {
                        if (selectStoreData.cartItems[j].productId == selectedItemData[i].productId) {
                            index = j;
                            cartFoundCheck = true;
                        }
                    }
                    if (cartFoundCheck) {
                        selectStoreData.cartItems[index].quantity = selectedItemData[i].quantity;
                        selectStoreData.cartItems[index].brandId = selectedItemData[i].brandId;
                        selectStoreData.cartItems[index].totalPrice = selectedItemData[i].totalPrice;
                        selectStoreData.totalItemAmount = selectStoreData.totalItemAmount;
                    } else {
                        selectStoreData.cartItems.push(selectedItemData[i]);
                        selectedItems.push(selectedItemData[i])
                    }
                }
            }
        }

        this.setState({ selectedAllItems: selectedItems })
        storeData[custId] = selectStoreData;
        await StorageDataModification.OrderCustomerProfileData(storeData, "store")
    }

    // sub category section
    subCategorySec = () => {
        const onSubCategory = (item) => {
            for (let i = 0; i < this.state.subCategoryArrData.length; i++) {
                if (this.state.subCategoryArrData[i] == item) {
                    this.state.subCategoryArrData[i].check = true
                }
                else {
                    this.state.subCategoryArrData[i].check = false
                }
            }
            this.setState({
                subCategoryArrData: this.state.subCategoryArrData,
                selectedBrandId: item.labelId
            })

            this.setSelectedItems(this.state.selectedBrandId)
            this.getProductList(item.labelId)
        }
        return (
            <View style={styles.subCateContainer}>
                {this.state.subCategoryArrData.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        {this.state.subCategoryArrData.map((data, key) => (
                            <View key={key}>
                                <TouchableOpacity style={data.check ? styles.ActiveMainTab : styles.mainTab} onPress={() => onSubCategory(data)} activeOpacity={0.9}>
                                    {data.title ?
                                        <View >
                                            <Text style={data.check ? styles.activeTitleTxt : styles.titleTxt}>{data.title}</Text>
                                        </View>
                                        : null}

                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                    :
                    null}
            </View>
        )
    }

    //for Flatlist skeliton

    ViewSkeletonPlaceholder = () => {
        let resData = [];

        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    //for subTab skeliton
    subTabSkeliton = () => {
        return (
            <View style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 8 }}>
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
                <View style={{ height: 80, width: 80, marginHorizontal: 5, borderRadius: 15 }} />
            </View>
        )
    }
    //for subCategory skeliton
    subCategoryabSkeliton = () => {
        return (
            <View style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 8 }}>
                <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 12 }} />
                <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 12 }} />
                <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 12 }} />
                <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 12 }} />
                <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 12 }} />
            </View>
        )
    }
    // fetch more
    fetchMore = async () => {
        if (this.state.initialApiCall) {
            if (this.state.listLoader) {
                return null;
            }
            this.setState(
                (prevState) => {
                    return { listLoader: true, pageNum: prevState.pageNum + 1 };
                },
                () => {
                    if (this.state.selectProductList.length >= this.state.totalDataCount) {
                        this.setState({ listLoader: false })
                        return null;
                    } else {
                        this.getProductList(this.state.selectedBrandId);
                    }
                }
            );
        }
    };
    // loader for scroll
    renderLoader = () => {
        return this.state.listLoader ? (
            <View
                style={styles.loadContainer}
            >
                <ActivityIndicator
                    size="large"
                    color={Color.COLOR.INDICATOR_COLOR.GRAY}
                />
            </View>
        ) : (
            <View style={{ marginBottom: 100 }} />
        );
    };

    //refresh list
    onRefresh = async () => {
        await StorageDataModification.OrderCustomerProfileData({}, "clear")
        await this._onStatusChange();
        await this._load();
    }

    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            totalDataCount: 0,
            selectProductList: [],
            refreshing: true,
            listLoader: true,
            pageLoader: true
        })
    }


    clearCartDetails = async () => {
        let cust = await StorageDataModification.userCredential({}, "get")
        let custId = cust.customerId.toString();

        let arr = this.state.selectProductList;
        let quantity = 0,
            totalPrice = 0

        for (let i = 0; i < arr.length; i++) {
            arr[i].quantity = quantity.toFixed(1);
            arr[i].totalAmount = totalPrice.toFixed(1);
        }
        this.state.selectProductList = arr;
        this.setState({ selectProductList: this.state.selectProductList, totalItemAmount: 0 })
        let storeData = await StorageDataModification.OrderCustomerProfileData({}, "get")
        storeData[custId].cartItems = [];
        await StorageDataModification.OrderCustomerProfileData(storeData, "store")
    }

    onOrderHis = () => {
        this.props.navigation.navigate("OrderHistoryList")
    }

    //footer sec
    _onFooterSec = () => {
        const addToCart = async () => {
            let cust = await StorageDataModification.userCredential({}, "get")
            let custId = cust.customerId.toString();

            let StoreData = await StorageDataModification.OrderCustomerProfileData({}, "get")

            let productData = modifyRequestProduct(this.state.selectProductList, this.state.selectedBrandId)
            let modArr = [...StoreData[custId].cartItems, ...productData]

            // /filter by duplicate array
            const uniqueArray = modArr.filter((obj, index, self) =>
                index === self.findIndex((o) =>
                    o.brandId === obj.brandId && o.productId === obj.productId
                )
            );
            //filter for quantity 0 removal
            const filteredCartItems = uniqueArray.filter(item => item.quantity !== 0);

            // primary - 2,secondary - 3

            let reqData = {
                orderDetails: filteredCartItems,
                contactId: custId,
                createdAt: DateConvert.fullDateFormat(new Date()),
                countryId: this.props.route.params.data.customerCountryId,
                stateId: this.props.route.params.data.customerStateId,
                districtId: this.props.route.params.data.customerDistrictId,
                zoneId: this.props.route.params.data.customerZoneId,
                transactionType: this.state.profileData.customerType == "Primary" ? "2" : "3"
            }


            if (reqData.orderDetails.length == 0) {
                Toaster.ShortCenterToaster("Please add atleast one product !")
            } else {
                this.setState({ addCartLoader: true })
                let responseData = await MiddlewareCheck("addProductForOrder", reqData, this.props);
                if (responseData == false) {
                    this._onNetworkError();
                } else {
                    if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                        this.updateCart();
                        this.clearCartDetails();
                        Toaster.ShortCenterToaster(responseData.message)
                    } else {
                        Toaster.ShortCenterToaster(responseData.message)
                    }
                }
                this.setState({ addCartLoader: false })
            }
        }
        return (
            <View style={{ marginTop: 10 }}>
                <View style={{ marginHorizontal: 15 }}>
                    <View style={styles.tmContainer}>
                        <Text style={styles.totalTxt}>Total</Text>
                        <Text style={styles.amountTxt}> Amount</Text>
                        <Text style={styles.timTxt}>{'\u20B9' + " " + this.state.totalItemAmount}</Text>
                    </View>
                    <View style={styles.bigBtnContainer}>
                        <View style={{ flex: 0.5 }}>
                            <BigTextButton
                                text={"Order History"}
                                fontSize={12}
                                fontColor={"#000"}
                                additionalStyles={{ borderColor: "#000", borderWidth: 0.5 }}
                                backgroundColor={"#fff"}
                                borderRadius={24}
                                onPress={() => this.onOrderHis()}
                            />
                        </View>
                        <View style={{ width: 35 }} />
                        <View style={{ flex: 0.5 }}>
                            {this.state.addCartLoader ?
                                <View style={styles.activityContainer}>
                                    <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                                </View>
                                :
                                <BigTextButton
                                    text={"Add to Cart"}
                                    fontSize={12}
                                    isLeftIcon={true}
                                    leftIcon={ImageName.SHOPING_ORDER_BOX}
                                    leftIconStyle={{ height: 18, width: 18 }}
                                    backgroundColor={"#F13748"}
                                    borderRadius={24}
                                    onPress={() => addToCart()}
                                />
                            }
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    updateCartDetail = () => {
        this.updateCart()
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.headerSec()}
                {/* {this.profileTileSec()} */}
                {this.categorySec()}
                {this.state.subCategoryLoader ?
                    <View style={{ marginHorizontal: 15 }}>
                        <SkeletonPlaceholder>
                            {this.subCategoryabSkeliton()}
                        </SkeletonPlaceholder>
                    </View>

                    :
                    <>
                        {this.subCategorySec()}
                    </>
                }
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        <View style={{ marginHorizontal: 15 }}>
                            {this.ViewSkeletonPlaceholder()}

                        </View>
                    </SkeletonPlaceholder> :

                    <React.Fragment>
                        {this.state.selectProductList.length > 0 ?
                            <>
                                <FlatList
                                    data={this.state.selectProductList}
                                    renderItem={(item, key) => this.renderContactList(item, key)}
                                    keyExtractor={(item, key) => key}
                                    // onEndReached={this.fetchMore}
                                    onEndReachedThreshold={0.1}
                                    // ListFooterComponent={this.renderLoader}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                // refreshControl={
                                //     <RefreshControl
                                //         refreshing={this.state.refreshing}
                                //         onRefresh={() => this.onRefresh()}
                                //     />
                                // }
                                />
                                {this._onFooterSec()}
                            </>
                            :
                            <React.Fragment>
                                {this.state.initialApiCall ?
                                    <View style={{ marginTop: 20, height: Dimension.height }}>
                                        <NoDataFound />
                                    </View> : null}
                            </React.Fragment>}

                        <View style={{ marginBottom: 80 }} />
                    </React.Fragment>
                }

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
            customerOrderData
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderList);
