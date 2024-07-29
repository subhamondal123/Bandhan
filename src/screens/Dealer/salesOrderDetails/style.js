import { StyleSheet } from "react-native";
import { Color, Dimension,FontFamily,FontSize } from "../../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },
  headerContainer: {
    marginHorizontal: "5%",
    marginTop: 10,
  },
  headerSubContainer: {
    marginTop: 8,
    flexDirection: "row",
  },
  backImg: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  sOrderTxtSec: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  salesOrderTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  tdbImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginTop: 3,
  },
  profileTitleSec: {
    backgroundColor: "#FFE1E1",
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 15,
    marginTop: 10,
  },
  rameshTabTxtSec: {
    marginHorizontal: "2%",
    flexDirection: "row",
    alignItems: "center",
  },
  rameshTxtTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    height: 40,
    width: 40,
    resizeMode: "cover",
  },
  rameshTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  rameshNumTxt: {
    backgroundColor: "#F13748",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 18,
    height: 35,
  },
  shopImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  rameshNumTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    marginTop: 2,
  },
  orderIdSec: {
    backgroundColor: "#604D8B",
    borderRadius: 14,
    padding: 8,
  },
  orderIdSubSec: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderIdTxt: {
    color: "#D1D1D1",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  orderIdNumTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  orderDateTxt: {
    color: "#D1D1D1",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginRight: "5%",
  },
  downloadImgSec: {
    justifyContent: "center",
    alignItems: "center",
  },
  orderDownloadImg: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  billInfoSec: {
    top: 10,
    flexDirection: "row",
    marginHorizontal: "5%",
    borderBottomColor: "#000",
    borderBottomWidth: 0.9,
    borderTopColor: "#000",
    borderTopWidth: 0.9,
    padding: 10,
    alignItems: "center",
  },
  billInfoTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    flex: 1,
    marginTop: 3,
  },
  billInfoNumTxt: {
    color: "#F13748",
    fontSize: FontSize.MD,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginRight: "5%",
  },
  partialTxtSec: {
    backgroundColor: "#F8B200",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  partialTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  btnSec: {
    marginHorizontal: "5%",
    flexDirection: "row",
    marginTop: 25,
  },
});

export default styles;
