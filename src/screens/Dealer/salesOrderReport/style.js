import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },
  mainView: {
    marginHorizontal: 5,
    marginTop: 20,
  },

  marginSec: {
    marginHorizontal: "2%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  userImg: {
    height: 50,
    width: 50,
    resizeMode: "cover",
    borderRadius: 100,
  },

  nameSec: {
    marginLeft: 15,
    flex: 1,
    flexDirection: "column",
  },

  nameText: {
    color: "#1F2B4D",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },

  addressText: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
  },

  zoneText: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.LIGHT,
    marginLeft: "5%",
  },

  dealerText: {
    color: "#1F2B4D",
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  orderCycleSec: {
    borderTopWidth: 0.8,
    borderTopColor: "#F0F4F7",
    borderBottomColor: "#F0F4F7",
    borderBottomWidth: 0.8,
    alignItems: "center",
    // padding: 4
  },
  idTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  blackDropDown: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    top: 3,
  },

  orderAmount: {
    color: Color.COLOR.RED.AMARANTH,
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  aproveSec: {
    flexDirection: "row",
  },
  orderApproveSec: {
    flex: 1,
    flexDirection: "row",
  },
  orderApproveTxt: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  calenderImg: {
    height: 18,
    width: 18,
    resizeMode: "contain",
    marginTop: 2,
    marginLeft: "3%",
  },
  orderApproValTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: "2%",
  },
  rdTxt: {
    color: "#747C90",
    fontSize: 8,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  allApproTxt: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  vehicleSec: {
    marginTop: 10,
    marginHorizontal: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  deliverImg: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  vehicleNoTxt: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 5,
  },
  wbNumTxt: {
    color: "#1F2B4D",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  deliverContainer: {
    padding: 8,
    borderTopColor: "#747C90",
    borderTopWidth: 0.8,
    borderBottomColor: "#747C90",
    borderBottomWidth: 0.8,
  },
  startTxt: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  rdSec: {
    flexDirection: "row",
    marginLeft: "3%",
  },
  calClImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  rdValTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: "5%",
  },
  RDTxt: {
    color: "#1F2B4D",
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  pmSec: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  clockImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  pmValTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  pmTxt: {
    color: "#1F2B4D",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  vehicleTimeTxt: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  arrDeliSec: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  arriveTxt: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  arrRdSec: {
    flexDirection: "row",
    marginLeft: "1%",
  },
  rdClockImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  rdVal: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: "5%",
  },
  arrRdTxt: {
    color: "#1F2B4D",
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  arrPmSec: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  pmClockImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  pmVal: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  arrPmTxt: {
    color: "#1F2B4D",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  deliTxtSec: {
    backgroundColor: "#00B65E",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deliTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  erDispatchSec: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  erpTxt: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  delNumTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: "3%",
  },
  orderOtTxt: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  orderOtVal: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  dispatchOtTxt: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  dispatchOtTimeTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  orderDeliSec: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: "2%",
    alignItems: "center",
  },
  ORCtXt: {
    color: "#747C90",
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  orderApproImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  deliTermTxt: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: "8%",
  },
  toPayTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  bigBtnSec: {
    marginHorizontal: "33%",
    marginTop: 20,
  },
  calenderSec: {
    flexDirection: "row",
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: "#F0F4F7",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  dateSec: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendetrClockImg: {
    height: 18,
    width: 18,
    resizeMode: "contain",
    top: -2,
  },
  idTxtSec: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  itemStatusSec: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerSec: {
    marginHorizontal: "5%",
    marginTop: 10,
  },
  headerSubSec: {
    marginTop: 8,
    flexDirection: "row",
  },
  backImg: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  sorSec: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sorTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginLeft: "5%",
    top: -5,
  },
  tdbImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginTop: 3,
  },
  previousOrderMain: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  thisMontTxtSec: {
    marginHorizontal: "2%",
    flexDirection: "row",
    alignItems: "center",
  },
  thisMontTxt: {
    color: "#747C90",
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  footerMain: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  totalAmtTxtMain: {
    borderTopColor: "#000",
    borderTopWidth: 0.7,
    borderBottomColor: "#000",
    borderBottomWidth: 0.7,
    padding: 8,
  },
  totalAmtTxtSubMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalOutTxt: {
    color: "#1F2B4D",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    flex: 1,
  },
  totalAmtTxt: {
    color: "#F13748",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  bigBtnContainer: {
    marginHorizontal: 2,
    marginTop: 15,
    flexDirection: "row",
  },
});

export default styles;
