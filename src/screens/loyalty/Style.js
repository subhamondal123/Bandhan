import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
    // flex: 1
  },
  profileImg: {
    height: 80,
    width: 80,
    resizeMode: "cover",
    borderRadius: 200,
  },
  mainBox: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    // paddingBottom: "3%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    borderRadius: 8,
    marginTop: 10,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: "4%",
    height: 140,
  },
  subBox: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    // paddingBottom: "3%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    borderRadius: 8,
    marginTop: 10,
    borderColor: "#000",
    justifyContent: "center",
    // alignItems: 'center',
    flex: 1,
    marginHorizontal: "4%",
    height: 140,
  },
  skyCircel: {
    height: 45,
    width: 45,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
  },
  boxNumberText: {
    color: Color.COLOR.YELLOW.GARGOYLE_GAS,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
  },
  boxsubText: {
    color: Color.COLOR.GRAY.SONIC_SILVER,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
  },
  rupeesImg: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  profileSec: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },
  userImgSec: {
    height: 80,
    width: 80,
    borderRadius: 200,
    borderColor: Color.COLOR.BLUE.VIOLET_BLUE,
    borderWidth: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  curentOfferTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
  },
  bikeTxt: {
    color: Color.COLOR.GRAY.GRAY_TINTS,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
  },
  loaderSec: {
    height: Dimension.height / 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  loyaltySec: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: 10,
  },
  loyaltySubSec: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default styles;
