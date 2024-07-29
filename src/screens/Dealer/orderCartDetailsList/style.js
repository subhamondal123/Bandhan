import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    height: Dimension.height,
  },

  mainBox: {
    backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
    elevation: 2,
    shadowColor: '#000',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5,
  },

  blueBox: {
    backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
    height: 90,
    borderRadius: 8,
    justifyContent: 'center',
  },



  // profile Sec
  cardSection: {
    flexDirection: "row",
    backgroundColor: "#FFE1E1",
    borderRadius: 20,
    padding: 14,
    alignItems: "center"

  },

  activeCardSection: {
    flexDirection: "row",
    backgroundColor: "#BED9ED",
    borderRadius: 20,
    padding: 14,
    alignItems: "center"

  },
  profileSec: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  profileImgSec: {
    height: 60,
    width: 60,
    borderRadius: 30,
    resizeMode: "cover"
  },
  profileDetailsTopSec: {
    flexDirection: "row",
  },
  profileDetailsSec: {
    flex: 1,
    marginTop: 5
  },
  profileMainDetailsSec: {
    marginLeft: 10,
    flex: 1
  },
  iconSection: {
    flexDirection: "row",
  },
  iconImg: {
    height: 40,
    width: 40,
    resizeMode: "contain"
  },
  profileDetailsBottomSec: {
    top: -5
  },
  profileNameTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },
  profileTypeTxt: {
    color: Color.COLOR.BLUE.LOTUS_BLUE,
    fontSize: FontSize.XS,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
  },

  delivaryPartnerView: {
    marginTop: 60,
    marginHorizontal: '5%',
    flexDirection: 'row',
    borderTopColor: '#000',
    borderBottomColor: "#000",
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    alignItems: 'center',
    padding: 4
  },
  deliveryPartnerText: {
    color: "#1F2B4D",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    flex: 1
  },
  headerContainer: {
    marginHorizontal: '5%',
    marginTop: 10,
    alignItems: 'center'
  },
  headSubContainer: {
    marginTop: 8,
    flexDirection: 'row'
  },
  backImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  cartTxtDSec: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cartTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.LG,
    fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
  },
  pDataSec: {
    backgroundColor: '#F13748',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 18,
    height: 35
  },
  sobImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  cartCount: {
    color: Color.COLOR.WHITE.PURE_WHITE,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.BOLD,
    marginTop: 2
  },
  tdiImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginTop: 3
  },
  totalItemSec: {
    marginTop: 15,
    marginHorizontal: '5%'
  },
  totalItemSubSec: {
    flexDirection: 'row',
    marginTop: 5
  },
  totalItemTxtSec: {
    flexDirection: 'row',
    flex: 1
  },
  totalTxt: {
    color: Color.COLOR.BLACK.PURE_BLACK,
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  itemTxtSec: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemTxt: {
    color: "#F13748",
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    marginLeft: 10
  },
  tmTxt: {
    color: '#F13748',
    fontSize: FontSize.SM,
    fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
  },
  btnSec: {
    marginTop: 15,
    marginHorizontal: '5%',
    flexDirection: 'row'
  },
  activitySec: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  loaderActvitySec: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200
  },

});

export default styles;