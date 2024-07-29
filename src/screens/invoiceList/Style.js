import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../enums";


const styles = StyleSheet.create({

  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },

  homeCircel: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  homeLogo: {
    height: 18,
    width: 18,
    resizeMode: 'contain'
  },
  dropDownArrow: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },

  // ........list,,,,,,,,,,,,,,,,

  tooltipText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
    fontSize: FontSize.SM
  },

  tooltipListView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  //For modal css

  filterImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },

  tooltipBtn: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  filterBtn: {
    alignItems: 'flex-start',
    height: 25,
    marginRight: 10
  },

  headerActionArea: {
    flexDirection: 'row',
    alignItems: "center",
    marginRight: '2%',
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE
  },

  filter_action_btn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end"
  },

  buttonView: {
    height: 55,
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.COLOR.BLUE.CAPRI,
  },

  // ..........for list item
  mainBox: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: '1%'

  },

  blueBox: {
    backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',

  },

  blueViewFlex: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: "center"
  },

  saiEnterprisesText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },

  smallText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },

  // =====================================================
  iamgeLogo: {
    height: 20,
    width: 20,
    marginTop: 2,
    resizeMode: 'contain'
  },

  flexColumnSec: {
    flexDirection: 'column',
    marginLeft: '5%'
  },

  headerText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM
  },

  textVisites: {
    color: Color.COLOR.GRAY.PHILIPPINE_GRAY,
    fontSize: 11,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    flex: 1,
    textAlign:"center"
  },

  conversionButton: {
    flexDirection: 'row',
    marginLeft: '2%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 2,
    borderColor: Color.COLOR.BLUE.VIOLET_BLUE,
    borderWidth: 1,
    shadowColor: '#000'
 },
  subCircel: {
    height: 20,
    width: 20,
    borderRadius: 18,
    backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
    justifyContent: 'center',
    alignItems: "center",
    marginRight: 5
  },
  subImgLogo: {
    height: 18,
    width: 18,
    resizeMode: 'center'
  },

  subBoxText: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD
  },


});

export default styles;