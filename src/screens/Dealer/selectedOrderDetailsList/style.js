import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },

  mainView: {
    marginHorizontal: "5%",
    marginTop: 20,
  },

  mainBox: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 2,
    shadowColor: "#000",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5,
  },

  blueBox: {
    backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
    height: 90,
    borderRadius: 8,
    justifyContent: "center",
  },

  listSubView: {
    backgroundColor: "#F0F4F7",
    padding: 14,
    borderRadius: 22,
  },

  listFlexRowView: {
    flexDirection: "row",
    alignItems: "center",
  },

  listColumnSec: {
    flexDirection: "column",
    flex: 1,
    marginLeft: "2%",
  },

  brandText: {
    color: "#1F2B4D",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },

  productNameText: {
    color: "#747C90",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    top: -8,
  },

  unitValueText: {
    color: "#1F2B4D",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  discountText: {
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    color: "#747C90",
    top: 8,
  },
  discountValueText: {
    color: "#F13748",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },

  centerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    backgroundColor: "#F0F4F7",
    padding: 14,
    borderRadius: 22,
  },
  listSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  listTxtSec: {
    flexDirection: "column",
    flex: 1,
    marginLeft: "2%",
  },
  brandName: {
    color: "#1F2B4D",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  productName: {
    color: "#747C90",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    top: -8,
  },
  mtTxt: {
    color: "#1F2B4D",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  statusTotalSec: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  statusSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  totalPriceSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  totalPriceTxt: {
    color: Color.COLOR.GREEN.APPLE_GREEN,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    top: 8,
  },
  headerMain: {
    marginHorizontal: "5%",
    marginTop: 10,
  },
  headerSubMain: {
    marginVertical: 10,
    flexDirection: "row",
  },
  backImg: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  orderDetailTxtSec: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orderDetailTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  cartCountTab: {
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
  cartCountTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    marginTop: 2,
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
    marginBottom: 2,
  },
  profileTitleSubMain: {
    marginHorizontal: "2%",
    flexDirection: "row",
    alignItems: "center",
  },
  totalCartTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  totalCartTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  orderIdMain: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  orderIdsubMain: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  orderIdTxt: {
    color: "#747C90",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  orderRecord: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  createDate: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginRight: "5%",
  },
  downloadImgSec: {
    justifyContent: "center",
    alignItems: "center",
  },
  downloadImg: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  billInfoSec: {
    top: 10,
    flexDirection: "row",
    marginHorizontal: "5%",
    borderBottomColor: "#000",
    borderBottomWidth: 0.9,
    borderTopColor: "#000",
    borderTopWidth: 0.9,
    padding: 10,
    alignItems: "center",
  },
  billInfoTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    flex: 1,
    marginTop: 3,
  },
  totalBillAmtTxt: {
    color: "#F13748",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginRight: "5%",
  },
  partialSec: {
    backgroundColor: "#F68217",
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  partialTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  bigBtnSec: {
    marginHorizontal: "5%",
    flexDirection: "row",
    marginTop: 25,
  },
});

export default styles;
