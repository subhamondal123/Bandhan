import { StyleSheet } from "react-native";
import { Color, Dimension,FontFamily,FontSize } from "../../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },
  headerContainer: {
    marginHorizontal: '5%',
    marginTop: 10
  },
  headerSubContainer: {
    marginTop: 8,
    flexDirection: 'row'
  },
  backImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  summeryTxtSec: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  orderSummeryTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  tdbImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginTop: 3
  },
  profileTitleContainer: {
    backgroundColor: '#FFE1E1',
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 15,
    marginTop: 10
  },
  rameshTabSec: {
    marginHorizontal: '2%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  rameshTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  dpiImg: {
    height: 40,
    width: 40,
    resizeMode: 'cover'
  },
  rameshTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  rameshNumSec: {
    backgroundColor: '#F13748',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 18,
    height: 35
  },
  sobImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  rameshNumTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    marginTop: 2
  },
  orderIdSec: {
    backgroundColor: '#604D8B',
    borderRadius: 14,
    padding: 8
  },
  orderIdSubSec: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  orderIdTxt: {
    color: "#D1D1D1",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  orderDateTxt: {
    color: "#D1D1D1",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginRight: '5%'
  },
  orderIdNum: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  downloadImgSec: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderDownloadImg: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  totalNumSec: {
    marginTop: 15,
    marginHorizontal: '5%'
  },
  totalNumSubSec: {
    flexDirection: 'row',
    marginTop: 5
  }, totalNumTxtSec: {
    flexDirection: 'row',
    flex: 1
  },
  totalTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  shopImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginLeft: '15%'
  },
  totalNumImgSec: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  shopOrderImg: {
    height: 18,
    width: 18,
    resizeMode: 'contain'
  },
  totalNumTxt: {
    color: "#F13748",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: '8%',
    marginTop: 3
  },
  totalAmtTxt: {
    color: '#F13748',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  btnSec: {
    marginTop: 15,
    marginHorizontal: '5%',
    flexDirection: 'row'
  },

});

export default styles;