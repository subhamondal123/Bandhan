import { StyleSheet } from "react-native";
import { Color, Dimension ,FontFamily,FontSize} from "../../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },
  mainTile: {
    marginTop: 5,
    marginBottom: 5,
  },
  listContainer: {
    backgroundColor: '#F0F4F7',
    padding: 8,
    borderRadius: 26
  },
  listSubContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tmtTxtContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: '2%'
  },
  tmtTxt: {
    color: "#1F2B4D",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  mmTxt: {
    color: "#747C90",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR
  },
  valSec: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 0.8,
    borderColor: "#000",
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  cmImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  valTxtContainer: {
    width: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  valTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginTop: 2
  },
  cpImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  mtTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  headerContainer: {
    marginHorizontal: '5%',
    marginTop: 10
  },
  subHeaderContainer: {
    marginTop: 8,
    flexDirection: 'row'
  },
  backImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  stockTxtSec: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  stockTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    marginLeft: '5%',
    top: -5
  }, tdbImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginTop: 3
  },
  profileContainer: {
    backgroundColor: '#604D8B',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 15,
    marginTop: 10
  },
  subProfileContainer: {
    marginHorizontal: '2%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  lastStockTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  stockDateTxt: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  categorySec: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 15
  },
  footerSec: {
    marginTop: 10,
    marginHorizontal: '28%'
  },
  btnSec: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 20
  },


});

export default styles;