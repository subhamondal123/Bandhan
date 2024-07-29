import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },
  upperSection: {
    flexDirection: "row"
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center"
  },

  leftSection: {
    flex: 1
  },
  bottomRightSec: {
    marginRight: 5,
    flexDirection: 'row',
    alignItems: "center"
  },
  bottomLeftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  bottomTitleTxt: {
    color: "#00B65E",
    fontSize: 12,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    top: 3
  },
  supTxt: {
    color: "#00B65E",
    fontSize: 9,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,

  },
  subTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: 11,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    top: -5
  },
  bottomSubTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: 10,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    top: -3
  },
  amountPerMtTxt: {
    color: "#747C90",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginRight: 10
  },
  totalAmountTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  listContainer: {
    backgroundColor: '#F0F4F7',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 15
  },
  crossImg: {
    height: 13,
    width: 13,
    resizeMode: 'contain',
    top: -5
  },
  subBottomRightSec: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 0.8,
    borderColor: "#000",
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    alignItems: "center"
  },
  numTxtContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
  },
  numTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 2
  },
  cmImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  cpImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  mtTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginLeft: 5
  },
  salesBtn: {
    backgroundColor: '#FFE1E1',
    borderRadius: 12,
    padding: 8
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dummyImg: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
    borderRadius: 100
  },
  rameshTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    flex: 1
  },
  colorTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  dealerTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    flex: 1
  },
  numberTxt: {
    color: "#F13748",
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  headerContainer: {
    marginHorizontal: '5%',
    marginTop: 10
  },
  subHeadContainer: {
    marginTop: 8,
    flexDirection: 'row'
  },
  backImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  aoTxtContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  approveTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginLeft: '5%',
    top: -5
  },
  threeDotImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginTop: 3
  },
  totalContainer: {
    marginTop: 15,
    marginHorizontal: '5%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    borderTopColor: "#000",
    borderTopWidth: 0.5,
    padding: 6
  },
  subTotalContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center'
  },
  totalTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  ubTxt: {
    color: '#F13748',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginRight: '5%'
  },
  bigBtnContainer: {
    marginTop: 15,
    marginHorizontal: '5%',
    flexDirection: 'row'
  },


});

export default styles;