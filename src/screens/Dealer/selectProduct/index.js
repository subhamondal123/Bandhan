import React from "react";
import {
  ImageBackground,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { stateCheckForNetwork } from "../../../redux/CustomerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { Color, FontFamily, FontSize, ImageName } from "../../../enums";
import {
  BigTextButton,
  DropdownInputBox,
  VirtualizedView,
} from "../../../shared";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import CustomerSubCategoryTab from "../../../pageShared/customerSubCategoryTab";

const bar = {
  activeStrokeWidth: 5,
  inActiveStrokeWidth: 5,
  inActiveStrokeOpacity: 0.2,
};

let StaticData = [
  {
    id: 1,
    name: "Ramesh Roy",
    address: "Bardhaman",
    zoneText: "Zone 2",
    dealerText: "Dealer",
  },
  {
    id: 2,
    name: "Ramesh Roy",
    address: "Bardhaman",
    zoneText: "Zone 2",
    dealerText: "Dealer",
  },
  {
    id: 3,
    name: "Ramesh Roy",
    address: "Bardhaman",
    zoneText: "Zone 2",
    dealerText: "Dealer",
  },
  {
    id: 4,
    name: "Ramesh Roy",
    address: "Bardhaman",
    zoneText: "Zone 2",
    dealerText: "Dealer",
  },
  {
    id: 5,
    name: "Ramesh Roy",
    address: "Bardhaman",
    zoneText: "Zone 2",
    dealerText: "Dealer",
  },
  {
    id: 6,
    name: "Ramesh Roy",
    address: "Bardhaman",
    zoneText: "Zone 2",
    dealerText: "Dealer",
  },
  {
    id: 7,
    name: "Ramesh Roy",
    address: "Bardhaman",
    zoneText: "Zone 2",
    dealerText: "Dealer",
  },
];

const categoryData = [
  {
    id: 1,
    title: "Usual",
    icon: ImageName.YELLOW_OPEN_BOX_LOGO,
    check: false,
  },
  {
    id: 2,
    title: "Offers",
    icon: ImageName.RED_PERCENTAGE_LOGO,
    check: false,
  },
  {
    id: 3,
    title: "Popular",
    icon: ImageName.YELLOW_STAR_ICON,
    check: false,
  },
  {
    id: 4,
    title: "New",
    icon: ImageName.NEW_COLLECTION_ICON,
    check: false,
  },
];
const subCategoryData = [
  {
    id: 1,
    title: "TMT",
    check: false,
  },
  {
    id: 2,
    title: "Steel",
    check: false,
  },
  {
    id: 3,
    title: "Nails",
    check: false,
  },
];
// this is select product list page
class SelectProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryArrData: categoryData,
      subCategoryArrData: subCategoryData,
      selectProductList: [],
    };
  }
  // this is a initial function which is call first
  componentDidMount = async () => {
    await this._load();
  };
  // this function used for navigate to previous screen
  _onBack = () => {
    this.props.navigation.goBack();
  };

  // this is the first function where set state data
  _load = async () => {
    this.setState({
      selectProductList: StaticData,
    });
  };

  onProductDetails = (item) => {
    this.props.navigation.navigate("OrderSummeryList", { data: item });
  };
  // for network error
  _onNetworkError = () => {
    this.props.navigation.navigate("NetworkError");
  };
  // for render list section data
  renderContactList = (item, key) => {
    return <View style={{}}>{this.listSection(item.item, item.index)}</View>;
  };
  // for design list section
  listSection = (item, key) => {
    return (
      <View key={key}>
        <View style={styles.listSecMain}>
          <TouchableOpacity
            style={styles.productDetailTab}
            activeOpacity={0.9}
            onPress={() => this.onProductDetails(item)}
          >
            <View style={styles.tmtSec}>
              <View style={styles.tmtTxtImgSec}>
                <Text style={styles.tmtTxt}>TMT 500</Text>
                <View style={{ width: 10 }} />
                <Image
                  source={ImageName.RED_PERCENTAGE_LOGO}
                  style={styles.parcentageImg}
                />
              </View>
              <View style={{ flex: 1 }} />
              <View style={styles.progessContainer}>
                {/* <View > */}
                <CircularProgressBase
                  {...bar}
                  value={60}
                  radius={10}
                  activeStrokeColor={"#00B65E"}
                  inActiveStrokeColor={"#D1D1D1"}
                  clockwise={false}
                />
                {/* </View> */}
                <Text style={styles.mtTxt}>{"\u20B9" + " " + 2473}/MT.</Text>
                <Text style={styles.mtValTxt}>{"\u20B9" + " " + 2473}</Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: "#89CDEF",
                marginTop: 12,
              }}
            />
            <View style={styles.dropdownContainer}>
              <View style={{ flex: 0.3 }}>
                <DropdownInputBox
                  // selectedValue={selectedExpenseCategoryObj.id ? selectedExpenseCategoryObj.id.toString() : "0"}
                  // data={expenseCategoryArr}
                  // onSelect={(value) => _onSelectExpenceType(value)}
                  backgroundColor={"#fff"}
                  headerText={"15 mm"}
                  fontSize={10}
                  borderRadius={20}
                  unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                  upDownImages={[ImageName.UP_ARROW, ImageName.DOWN_ARROW]}
                />
              </View>
              <View style={{ width: 5 }} />
              <View style={{ flex: 0.4 }}>
                <View style={styles.amtValSec}>
                  <Image
                    source={ImageName.CIRCEL_MINUS}
                    style={styles.minusImg}
                  />
                  <View style={styles.valSec}>
                    <Text style={styles.valTxt}>15.5</Text>
                  </View>
                  <Image
                    source={ImageName.CIRCEL_PLUS}
                    style={styles.plusImg}
                  />
                </View>
              </View>
              <View style={{ width: 5 }} />
              <View style={{ flex: 0.3 }}>
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
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // for design footer section
  _onFooterSec = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ marginHorizontal: "3%" }}>
          <View style={styles.totalSec}>
            <Text style={styles.totalTxt}>Total</Text>
            <Text style={styles.totalItemTxt}>32 items</Text>
            <Text style={styles.totalAmt}>{"\u20B9" + " " + 2473}</Text>
          </View>
          <View style={styles.bigBtnSec}>
            <BigTextButton
              text={"Add to Cart"}
              fontSize={12}
              isLeftIcon={true}
              leftIcon={ImageName.SHOPING_ORDER_BOX}
              leftIconStyle={{ height: 18, width: 18 }}
              backgroundColor={"#F13748"}
              borderRadius={24}
            />
          </View>
        </View>
      </View>
    );
  };
  // for design header section
  headerSec = () => {
    return (
      <View style={styles.headerMain}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
          <Image source={ImageName.BACK_IMG} style={styles.backImg} />
        </TouchableOpacity>
        <View style={styles.selProductTxtSec}>
          <Text style={styles.headingTxt}>Select Product</Text>
        </View>
        <Image source={ImageName.THREE_DOT_BLACK} style={styles.tdbImg} />
      </View>
    );
  };

  // for design profile title section
  profileTileSec = () => {
    const onPressCart = () => {
      this.props.navigation.navigate("DealerCartDetails");
    };
    return (
      <View style={styles.profileTitleMain}>
        <View style={styles.profileTitleSubMain}>
          <TouchableOpacity style={styles.cartItemTab}>
            <View style={{ marginLeft: "3%" }}>
              <Text style={styles.totalcartTxt}>Total Cart Items</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shopImgTab}
            onPress={() => onPressCart()}
          >
            <Image
              source={ImageName.SHOPING_ORDER_BOX}
              style={styles.shopImg}
            />
            <View style={{ width: 5 }} />
            <Text style={styles.itemValTxt}>240</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // for design category section
  categorySec = () => {
    return (
      <View style={styles.categoryMain}>
        {this.state.categoryArrData.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {this.state.categoryArrData.map((item, key) => (
              <View key={key}>
                <CustomerSubCategoryTab data={item} />
              </View>
            ))}
          </ScrollView>
        ) : null}
      </View>
    );
  };
  // for design sub category section
  subCategorySec = () => {
    return (
      <View style={styles.subCategoryMain}>
        {this.state.subCategoryArrData.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {this.state.subCategoryArrData.map((item, key) => (
              <View key={key}>
                <CustomerSubCategoryTab
                  data={item}
                  backgroundColor={"#fff"}
                  additionStyles={{
                    borderColor: "#D9D9D9",
                    borderWidth: 0.5,
                    borderRadius: 25,
                    paddingTop: 7,
                    paddingBottom: 7,
                    paddingRight: 5,
                    paddingLeft: 5,
                  }}
                />
              </View>
            ))}
          </ScrollView>
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.headerSec()}
        {this.profileTileSec()}
        {this.categorySec()}

        <VirtualizedView>
          <React.Fragment>
            {this.subCategorySec()}
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
          </React.Fragment>
          {this._onFooterSec()}
          <View style={{ marginBottom: 40 }} />
        </VirtualizedView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectProductList);
