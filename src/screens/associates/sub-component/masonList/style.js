import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        // flex: 1
    },
    mainView: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 10
    },
    backImg: {
        height: 25,
        width: 20,
        resizeMode: 'contain',
        marginTop: 10,
        flex: 1
    },
    backSec: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },
    mainBox: {
        // paddingBottom: '10%',
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: 0.8,
        borderRadius: 8,
        marginTop: 20,
        marginHorizontal: '1%'

    },

    flexColumnSec: {
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: '3%'
    },

    blueBox: {
        backgroundColor: '#3168ff',
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
    idText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD
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

    addVisitsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // marginVertical:,
        marginHorizontal: 3,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    addVisitBtnTxt: {
        color: Color.COLOR.BLUE.VIOLET_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        marginHorizontal: 10,
        paddingVertical: 8
    },
    itemLoader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 100,
    }


});

export default styles;