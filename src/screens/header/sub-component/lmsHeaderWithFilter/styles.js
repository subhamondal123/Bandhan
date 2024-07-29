import { StyleSheet } from "react-native";
import { Color,FontFamily,FontSize,Dimension } from "../../../../enums";
const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    // elevation: 2,
    backgroundColor: "#fff",
    // shadowColor: Color.COLOR.GRAY.DARK_GRAY_COLOR,
    // shadowOffset: 5,
    // shadowOpacity: 5,
  },
  gamificationMainView: {
    marginHorizontal: "3%",
    flex: 1,
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
    paddingVertical: 10,
  },
  headerTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD,
    fontSize: FontSize.SM,
  },
  notificationTab: {
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "#D1D1D1",
    padding: 5,
  },
});

export default styles;
