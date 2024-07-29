import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },
  cardSection: {
    flexDirection: "row",
    backgroundColor: "#FFE1E1",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
  },
  profileSec: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  profileImgSec: {
    height: 60,
    width: 60,
    borderRadius: 30,
    resizeMode: "cover",
  },
  profileDetailsTopSec: {
    flexDirection: "row",
  },
  profileDetailsSec: {
    flex: 1,
    marginTop: 5,
  },
  profileMainDetailsSec: {
    marginLeft: 10,
    flex: 1,
  },
  iconSection: {
    flexDirection: "row",
  },
  iconImg: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  profileDetailsBottomSec: {
    top: -5,
  },
  profileNameTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  profileTypeTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  percentageTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: 9,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  headingTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  listSecMain: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  productDetailTab: {
    backgroundColor: "#F0F4F7",
    padding: 14,
    borderRadius: 14,
  },
  tmtSec: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  tmtTxtImgSec: {
    flexDirection: "row",
    alignItems: "center",
  },
  tmtTxt: {
    color: "#1F2B4D",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: "2%",
  },
  parcentageImg: {
    height: 26,
    width: 26,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  progessContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  mtTxt: {
    color: "#747C90",
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: "5%",
  },
  mtValTxt: {
    color: "#1F2B4D",
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: "5%",
  },
  dropdownContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  amtValSec: {
    flexDirection: "row",
    paddingVertical: 5,
    borderWidth: 0.8,
    borderColor: "#000",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },
  minusImg: {
    height: 21,
    width: 21,
    resizeMode: "contain",
  },
  valSec: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  valTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  plusImg: {
    height: 21,
    width: 21,
    resizeMode: "contain",
  },
  totalSec: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "3%",
  },
  totalTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  totalItemTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: "5%",
    flex: 1,
  },
  totalAmt: {
    color: "#F13748",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  bigBtnSec: {
    marginHorizontal: "30%",
    marginTop: 15,
  },
  headerMain: {
    marginTop: 10,
    flexDirection: "row",
    marginHorizontal: 15,
  },
  backImg: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  selProductTxtSec: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  tdbImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginTop: 3,
  },
  profileTitleMain: {
    backgroundColor: "#F0F4F7",
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 15,
    marginTop: 10,
  },
  profileTitleSubMain: {
    marginHorizontal: "2%",
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  totalcartTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  shopImgTab: {
    backgroundColor: "#F13748",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 18,
    height: 35,
  },
  shopImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  itemValTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    marginTop: 2,
  },
  categoryMain: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 15,
  },
  subCategoryMain: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 15,
  },
});

export default styles;
