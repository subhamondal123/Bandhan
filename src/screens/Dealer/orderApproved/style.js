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
    alignItems: "center"

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
    resizeMode: "cover"
  },
  profileDetailsTopSec: {
    flexDirection: "row",
  },
  profileDetailsSec: {
    flex: 1,
    marginTop: 5
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
    resizeMode: "contain"
  },
  profileDetailsBottomSec: {
    top: -5
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
  orderImg: {
    height: Dimension.height / 3,
    width: "100%"
  },
  approvedTxtSec: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  uHaveTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  approvedTxt: {
    color: '#F13748',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 8
  },
  tOrderTxt: {
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
  colorTxt: {
    color: '#1F2B4D',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  orderDateSec: {
    flexDirection: 'row',
    marginTop: 10
  },
  orderDateTxt: {
    color: '#1F2B4D',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    flex: 1
  },
  janTxt: {
    color: '#1F2B4D',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  orderGenTxtSec: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderGenTxt: {
    color: '#1F2B4D',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  bigBtnSec: {
    marginHorizontal: '22%',
    marginTop: 10
  },
  invoiceTxtSec: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  invoiceCustTxt: {
    color: '#1F2B4D',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },



});

export default styles;