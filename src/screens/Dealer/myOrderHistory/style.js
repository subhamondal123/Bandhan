import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },

  mainBox: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 2,
    shadowColor: '#000',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5,
  },

  blueBox: {
    backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
  },

  heaterSec: {
    marginHorizontal: '5%',
    marginTop: 10,
    alignItems: 'center'
  },

  headerflexRow: {
    marginTop: 8,
    flexDirection: 'row'
  },

  backImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },

  headerTextView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  orderMyHistoryText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginLeft: '5%',
    top: -5
  },

  cardSecView: {
    backgroundColor: '#F13748',
    padding: 5,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 18,
    height: 35
  },

  shopingImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },

  cartCountText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    marginTop: 2
  },

  threeDotImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginTop: 3
  },

  dateRangeMainView: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center'
  },

  dateRangeFlexRowView: {
    flexDirection: 'row',
    flex: 1
  },

  monthText: {
    color: "#747C90",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },

  dateText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: '5%'
  },

  dateRangeButton: {
    backgroundColor: '#1F2B4D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    borderRadius: 14
  },

  dateRangeRowView: {
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center'
  },

  whiteDateLogo: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },

  dateRangeText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },

  footerSec: {
    marginTop: 10,
    marginHorizontal: 20
  },

  footerUnderline: {
    borderTopColor: "#000",
    borderTopWidth: 0.7,
    borderBottomColor: '#000',
    borderBottomWidth: 0.7,
    padding: 8
  },

  totalOutstandingText: {
    color: '#1F2B4D',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    flex: 1
  },
  totalOutstandingValueText: {
    color: '#F13748',
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  footerButtonView: {
    marginHorizontal: 2,
    marginTop: 15,
    flexDirection: 'row'
  },
  mainTab: {
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: Color.COLOR.GRAY.GRAY_TINTS,
  },
  ActiveMainTab: {
    borderRadius: 25,
    backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,

    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  titleTxt: {
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    fontSize: 12,
    color: "#1F2B4D"
  },
  activeTitleTxt: {
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    fontSize: 12,
    color: Color.COLOR.WHITE.PURE_WHITE
  },

});

export default styles;