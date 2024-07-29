import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
    },

    profileLocTxt: {
        color: "#747C90",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },

    billSec: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15
    },
    billImg: {
        height: 110,
        width: 140,
        resizeMode: "center"
    },
    billAmountTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 25,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        top: -5
    },
    checkBoxTxt: {
        marginLeft: 10,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: FontSize.XS,
        color: Color.COLOR.BLACK.PURE_BLACK
    },

    selectActivePaymentMode: {
        height: 75,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#00B65E',
        borderRadius: 12,
        elevation: 1,
        marginHorizontal: 5,
        padding: 10
    },
    inActivePaymentMode: {
        height: 75,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: 12,
        elevation: 1,
        marginHorizontal: 5,
        padding: 10
    },
    headerContainer: {
        marginHorizontal: '5%',
        marginTop: 10
    },
    updatePaymentSec: {
        marginTop: 8,
        flexDirection: 'row'
    },
    backImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    updatePayTxtSec: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    updatePayTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    tdbImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginTop: 3
    },
    orderIdSec: {
        backgroundColor: "#1F2B4D",
        borderRadius: 22,
        padding: 8,
        marginBottom: 5
    },
    orderIdSubSec: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8
    },
    orderIdTxt: {
        color: "#D1D1D1",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    recordNumTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    createDateTxt: {
        color: "#D1D1D1",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginRight: '5%'
    },
    redCircleImgSec: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rcdImg: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    checkBoxSec: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    paymentContainer: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10,
        borderColor: "#F13748",
        borderWidth: 0.9,
        borderStyle: "dashed",
        marginHorizontal: 5,
        marginTop: 5,
        width: Dimension.width - 50,
    },
    paymentSubContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    dateFormateTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    paidAmountSec: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 15,
    },
    cashImg: {
        height: 26,
        width: 26,
        resizeMode: 'contain',
        top: -2
    },
    paidAmountTxt: {
        color: "#00B65E",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: 10
    }, orderImgSec: {
        height: 25,
        width: 25,
        borderRadius: 100,
        backgroundColor: '#F13748',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    }, orderImg: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },
    billAmtTxt: {
        color: '#F13748',
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    paidDocSec: {
        flexDirection: 'row',
        marginTop: 2,
        alignItems: 'center'
    },
    paidTxt: {
        color: '#747C90',
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    paymentItemTxt: {
        color: '#747C90',
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    upiLogo: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    }, downloadTab: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    downloadDocImgSec: {
        height: 25,
        width: 25,
        borderRadius: 100,
        backgroundColor: '#FF6A4D',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginRight: 5
    },
    docDownloadImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    }, docTxt: {
        color: '#747C90',
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    payModeTxtSec: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    paymodeTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    payModeTab: {
        flexDirection: 'row',
        marginTop: 20
    },
    itemImg: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    itemTxt: {
        color: "#747C90",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 3,
        textAlign: "center"
    },
    uploadContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    uploadDocTxt: {
        color: '#000',
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD
    },
    docAvailTxt: {
        color: '#000',
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    showRemoveTabSec: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    showDocTab: {
        borderWidth: 0.6,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderColor: Color.COLOR.BLUE.LOTUS_BLUE,
        justifyContent: "center",
        alignItems: "center"
    },
    docYlwImg: {
        height: 36,
        width: 36,
        resizeMode: 'contain'
    },
    redCloseImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    btnLoadSec: {
        justifyContent: 'center',
        marginTop: 25,
        marginHorizontal: '30%'
    },




});

export default styles;