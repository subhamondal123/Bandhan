import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize,Dimension } from "../../../../enums";

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    // elevation: 2,
    backgroundColor: "#fff",
    // shadowColor: Color.COLOR.GRAY.DARK_GRAY_COLOR,
    // shadowOffset: 5,
    // shadowOpacity: 5,
  },
  mainView: {
    marginHorizontal: "3%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerMiddleSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    textAlign: "center",
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
    color: Color.COLOR.BLACK.PURE_BLACK,
  },
  drawerIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  drawerIconSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  bandhanImg: {
    height: 35,
    width: 35,
    resizeMode: "contain",
  },
  bandhanTxt: {
    color: Color.COLOR.BLUE.VIOLET_BLUE,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.RAILWAY.SEMI_BOLD_ITALIC,
    marginLeft: "3%",
    top: -2,
  },
});

export default styles;
