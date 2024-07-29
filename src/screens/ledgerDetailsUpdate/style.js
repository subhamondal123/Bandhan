import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize,Dimension } from "../../enums";

const styles = StyleSheet.create({
  headerSubText: {
    color: Color.COLOR.GRAY.DAVY_GRAY,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    fontSize: 14,
  },
  titleText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    fontSize: 16,
  },
  labelTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: 17,
  },
  labelValTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
  },
  docTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    fontSize: 12,
    marginRight: 5,
  },
  balanceAsonTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: 14,
  },
  checkBoxTxt: {
    color: Color.COLOR.GRAY.CORDUROY,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.SM,
  },
  listHeadMain: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: 5,
  },
  listHeadSubMain: {
    flexDirection: "row",
    justifyContent: "center",
  },
  mentionSecMain: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Color.COLOR.GRAY.GRAY_TINTS,
  },
  srmbTxtSec: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#604D8B",
  },
  amntBySec: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.COLOR.BLUE.LOTUS_BLUE,
    flex: 1,
  },
  fromSecMain: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Color.COLOR.GRAY.GRAY_TINTS,
  },
  custErpTxtSec: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#604D8B",
    flexDirection: "row",
  },
  inputSec: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  btnLoadSec: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  loaderSec: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  removeTabSec: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  redCloseImg: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
  checkSecMain: {
    marginTop: 20,
    flex: 1,
  },
  checkBoxSec: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  checkBoxBottomMain: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 5,
  },
  expandableMain: {
    marginLeft: 10,
    paddingRight: 20,
  },
});

export default styles;
