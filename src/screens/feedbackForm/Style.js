import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize,Dimension } from "../../enums";

const styles = StyleSheet.create({
  backImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },

  feedBackHeader: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },

  mainSection: {
    borderWidth: 1,
    borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  headerTxt: {
    color: Color.COLOR.BLUE.BULE_LIGHT_CUSTOMER,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    fontSize: 14,
  },
  headerSection: {
    borderBottomWidth: 1,
    padding: 5,
    borderBottomColor: Color.COLOR.BLUE.BULE_LIGHT_CUSTOMER,
  },
  ratingSection: {
    marginTop: 10,
  },
  mainView: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: 10,
  },
  feedbackSec: {
    flexDirection: "row",
    justifyContent: "center",
  },
  submitBtnSec: {
    marginHorizontal: "15%",
    marginTop: 20,
  },
});

export default styles;
