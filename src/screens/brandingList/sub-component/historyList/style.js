import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../../enums";


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

  addVisitsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // marginVertical:,
    marginLeft: 3,
    marginRight: 5,
    backgroundColor: "white"
  },
  addVisitBtnTxt: {
    color: Color.COLOR.BLUE.BULE_LIGHT_CUSTOMER,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    marginHorizontal: 10,
    paddingVertical: 8
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

  modalview: {
    backgroundColor: '#fff',
    marginRight: '5%',
    marginLeft: '5%',
    // paddingTop: 40,
    paddingBottom: 30,
    borderRadius: 10

  },
  modalHeaderSec: {
    backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10

  },
  marginView: {
    marginLeft: '5%',
    flexDirection: 'row'
  },
  profileNameText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    flex: 1
  },
  cancelSec: {
    height: 25,
    width: 25,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    top: -15,
    left: 1
  },
  cancelImg: {
    height: 15,
    width: 15,
    resizeMode: 'contain'
  },

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
    paddingBottom: 10,
    paddingTop: 15,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE
  },
  filter_action_btn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end"
  },
  crossImgView: {
    flex: 1
  },
  crossImg: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },


  buttonView: {
    height: 55,
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.COLOR.BLUE.CAPRI,
  },

  selectAll: {
    flexDirection: "row",
    paddingBottom: 10,
    paddingHorizontal: "5%"
  },

  priorityChangeButton: {
    backgroundColor: Color.COLOR.BLUE.PACIFIC,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },

  cancelButton: {
    backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: 14,
    fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
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
    backgroundColor: Color.COLOR.BLUE.BULE_LIGHT_CUSTOMER,
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
  homeCircel: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },

  saiEnterprisesText: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
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
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    flex: 1
  },

});

export default styles;