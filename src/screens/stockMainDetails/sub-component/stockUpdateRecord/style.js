import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },

  mainBox: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: "1%",
  },

  iamgeLogo: {
    height: 20,
    width: 20,
    marginTop: 2,
    resizeMode: "contain",
  },

  flexColumnSec: {
    flexDirection: "column",
    marginLeft: "5%",
  },

  blueBox: {
    backgroundColor: Color.COLOR.BLUE.BULE_LIGHT_CUSTOMER,
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: "center",
  },

  blueViewFlex: {
    flexDirection: "row",
    marginHorizontal: "5%",
    alignItems: "center",
  },

  homeCircel: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  homeLogo: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  },

  dropDownArrow: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  },

  saiEnterprisesText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
  },

  headerText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
  },

  recordText: {
    color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    flex: 1,
  },

  headerActionArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 15,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
  },
  filter_action_btn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  filterImg: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  activityLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  stockListSec: {
    marginHorizontal: "5%",
    marginTop: 5,
  },
  brandSizeSec: {
    marginTop: 15,
    flexDirection: "row",
  },
  brandSec: {
    flexDirection: "row",
    flex: 1,
  },
  sizeSec: {
    flexDirection: "row",
    flex: 1,
  },
  qtyUnitSec: {
    marginTop: 15,
    flexDirection: "row",
  },
  qtySec: {
    flexDirection: "row",
    flex: 1,
  },
  unitSec: {
    flexDirection: "row",
    flex: 1,
  },
  createRecordSec: {
    marginTop: 15,
    flexDirection: "row",
  },
  createDateSec: {
    flexDirection: "row",
    flex: 1,
  },
  recordSec: {
    flexDirection: "row",
    flex: 1,
  },
  itemCreateDateSec: {
    marginLeft: "5%",
    flex: 1,
  },
});

export default styles;
