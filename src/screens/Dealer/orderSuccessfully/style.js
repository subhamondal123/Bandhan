import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },
  headerSec: {
    marginTop: 10,
    flexDirection: 'row'
  },
  backImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  tdbImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginTop: 3
  },
  titleViewLoadSec: {
    justifyContent: "center",
    alignItems: "center"
  },
  successfullTxtSec: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }, haveTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  successfullTxt: {
    color: '#F13748',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 8
  },
  placeOrderTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginTop: 5
  },
  orderIdSec: {
    flexDirection: 'row',
    marginTop: 10
  },
  orderIdTxt: {
    color: '#1F2B4D',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    flex: 1
  },
  orderNumTxt: {
    color: '#1F2B4D',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  orderDateSec: {
    flexDirection: 'row',
    marginTop: 10
  },
  orderDatetXT: {
    color: '#1F2B4D',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    flex: 1
  },
  orderDateSucsTxt: {
    color: '#1F2B4D',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  orderStatusSec: {
    flexDirection: 'row',
    marginTop: 10
  },
  orderStatusTxt: {
    color: '#1F2B4D',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    flex: 1,
    marginTop: 3
  },
  approveStatusSec: {
    backgroundColor: '#D1D1D1',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  approveStatusTxt: {
    color: "#5F5F5F",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },




});

export default styles;