import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },

  todayOrderCard: {
    backgroundColor: "#F0F4F7",
    padding: 14,
    marginTop: 25,
    borderRadius: 14
  },

  productText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 35
  },

  widthView: {
    marginTop: 5,
    width: 150,
    top: 30
  },

  myStockReportText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  itemRs: {
    color: "#F13748",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  approveText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },

  marginSec: {
    marginHorizontal: '2%',
    flexDirection: 'row'
  },

  parsentText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    top: 5
  },

  targetText: {
    color: "#747C90",
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  achivedText: {
    color: "#747C90",
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    top: -4
  },
  targetMt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 8
  },

  tillDateView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },

  tillDateOrderText: {
    color: '#1F2B4D',
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },

  tillDateMtText: {
    color: '#5F5F5F',
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    top: -5
  },

  MtAount: {
    color: "#F13748",
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  tmtView: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    borderRadius: 10,
    borderColor: Color.COLOR.RED.AMARANTH,
    borderWidth: 1.2,
    borderStyle: "dashed",
    width: Dimension.width / 1.25,
    marginHorizontal: 5
  },

  marginHorizntalView: {
    marginHorizontal: 10,
    padding: 9
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  newProductRecommendationText: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: 13,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  magicStrickLogo: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },

  twoTmt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    marginLeft: "5%",
    marginTop: 3
  },

  mmforeValue: {
    color: '#5F5F5F',
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginLeft: "10%"
  },

  textPredicted: {
    color: "#747C90",
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },

  demandText: {
    color: '#000',
    fontSize: 12,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  productPersentValue: {
    color: "#F13748",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  greenUpArrow: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    top: -3
  },

  alertStockView: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },

  alertImg: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },

  alertForStockText: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: 10
  },

  alertForStockView: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    borderRadius: 10,
    borderColor: Color.COLOR.RED.AMARANTH,
    borderWidth: 1.2,
    borderStyle: "dashed",
    width: Dimension.width / 1.25,
    marginHorizontal: 5
  },

  paddingView: {
    marginHorizontal: 10,
    padding: 9
  },

  centerView: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  columnFlexView: {
    flexDirection: 'column',
    flex: 1
  },

  tmtText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    marginTop: 3
  },

  mmText: {
    color: '#5F5F5F',
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginLeft: "12%"
  },

  predictedText: {
    color: "#747C90",
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },

  desText: {
    color: '#000',
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  marginleftView: {
    marginLeft: 5,
    alignItems: "center"
  },

  stockLeftText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  whiteCircel: {
    height: 22,
    width: 22,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  whiteCircelText: {
    color: "#1F2B4D",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 2
  },

  amountView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10
  },

  yellowAmount: {
    color: "#FFCB44",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginRight: '5%'
  },

  userImg: {
    height: 55,
    width: 55,
    resizeMode: 'contain'
  },

  marginLeftView: {
    flex: 1,
    marginLeft: '2%'
  },

  userNameText: {
    color: "#fff",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginRight: '5%'
  },

  erpText: {
    color: "#d1d1d1",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  receiveAmountText: {
    color: "#41EB99",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  updateStockButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },

  stockLastUpdateText: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },

  stockUpdateDate: {
    color: "#1F2B4D",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  todayOrderText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  todayOrderValueText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  mtText: {
    color: "#747C90",
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },

  qtyText: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  lastWeekOrderStatusText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 5
  },

  flexRow: {
    flexDirection: 'row',
    marginTop: 8
  },

  approvedSec: {
    backgroundColor: '#00B65E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 100,
    height: 30
  },

  partialSec: {
    backgroundColor: '#F8B200',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 105,
    height: 32
  },

  pendingSec: {
    backgroundColor: '#D1D1D1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 105,
    height: 32
  },
  truckImg: {
    height: 27,
    width: 42,
    resizeMode: "contain"
  },
  mainTab: {
    borderRadius: 20,
    backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15

  },
  salesOrderTitleTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  salesOrderTitleSubTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    top: -5
  },

  modalview: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    paddingBottom: Padding.PADDING.NORMAL_PX_PADDING.NORMAL_PADDING_30PX,
    borderRadius: 12,
    maxHeight: Dimension.height,
    right: 0,
    left: 0,
    marginHorizontal: "2%",
  },
  modalHeaderTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    textAlign: "center"
  },
  totalOutStandingView: {
    borderRadius: 20,
    backgroundColor: "#604D8B",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15
  },
  salesOrderTitleTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    flex: 1
  },
  parsentSec: {
    flexDirection: 'row',
    flex: 0.2,
    alignItems: "center"
  },
  appSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10
  },
  approvedTxtSec: {
    flexDirection: "row",
    alignItems: "center"
  },
  gtiImg: {
    height: 18,
    width: 18,
    resizeMode: 'contain'
  },
  salesApproText: {
    color: "#D1D1D1",
    fontSize: 11,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },
  approValTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: 11,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },
  partialTxtSec: {
    flexDirection: "row",
    alignItems: "center"
  },
  opiImg: {
    height: 18,
    width: 18,
    resizeMode: 'contain'
  },
  partialTxt: {
    color: "#D1D1D1",
    fontSize: 11,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },
  partialValTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: 11,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },
  pendingTxtSec: {
    flexDirection: "row",
    alignItems: "center"
  },
  gciImg: {
    height: 18,
    width: 18,
    resizeMode: 'contain'
  },
  pendingTxt: {
    color: "#D1D1D1",
    fontSize: 11,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },
  pendingValTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: 11,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },
  selectTxtSec: {
    justifyContent: "center",
    marginVertical: 10
  },
  proceedTab: {
    backgroundColor: Color.COLOR.RED.AMARANTH,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14
  },
  proceedTxt: {
    color: "#fff",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
  },
  totalSaleTxtSec: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  receivedTxt: {
    color: "#D1D1D1",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  rameshTxtSec: {
    backgroundColor: '#725F9F',
    padding: 7,
    borderRadius: 12
  },
  rameshTxtSubSec: {
    flexDirection: 'row',
    marginHorizontal: 5
  },


});

export default styles;