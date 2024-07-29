import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
    // flex: 1
  },

  imageTextView: {
    marginHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  offerText: {
    color: Color.COLOR.BLUE.VIOLET_BLUE,
    fontSize: FontSize.XL,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
  },
  offerImage: {
    height: 120,
    width: 120,
    resizeMode: "contain",
  },
  loaderSec: {
    height: Dimension.height / 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  schemeSec: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: 10,
  },
  schemeTabSec: {
    flexDirection: "row",
    justifyContent: "center",
  },
  diwaliOfferSec: {
    marginHorizontal: "5%",
    marginTop: 20,
  },
  bigBtnSec: {
    flex: 1,
    marginHorizontal: "10%",
    marginTop: 60,
  },
});

export default styles;
