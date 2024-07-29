import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        // flex: 1
    },

    backImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    feedBackHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    },

    marginView: {
        // flexDirection: 'row',
        alignItems: 'flex-end'
    },
    cancelSec: {
        height: 20,
        width: 20,
        borderRadius: 14,
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5
    },
    cancelImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },

    mainBox: {
        paddingBottom: '10%',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        borderRadius: 8,
        marginTop: 20,
        borderColor: Color.COLOR.GRAY.LIGHT_GRAY_COLOR,
        borderWidth: 0.7
    },
    blueBox: {
        backgroundColor: '#4492ca',
        height: 60,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center'
    },
    blueViewFlex: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        alignItems: 'center'
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
    saiEnterprisesText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    textDealer: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    addVisitsButton: {
        flex: 0.2,
    },

    textFlexView: {
        flexDirection: 'row',
        marginTop: 8,
        marginHorizontal: '5%'
    },
    headerText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    textVisites: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    checkBoxLabel: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    mailIcon: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginTop: 3
    },
    callIcon: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginTop: 3
    },
    pRemoveIcon: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginTop: 3
    },
    loaderContainer: {
        height: 170,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ndfContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    mainHeadBody: {
        alignItems: "center",
        paddingBottom: "5%"
    },
    mainHeaderLogo: {
        height: 110,
        width: 110,
      
        resizeMode: "contain"
    },
    headerLogoSec: {
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        height:150,
        width:150,
        borderRadius: 80,
        justifyContent:"center",
        alignItems:"center"
    },
    headerLogoTxt: {
        color: Color.COLOR.BLUE.DARK_BLUE,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: 11
    },



});

export default styles;