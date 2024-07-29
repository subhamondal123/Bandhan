import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
    },

    todayOrderCard: {
        backgroundColor: "#F0F4F7",
        padding: 14,
        marginTop: 30,
        borderRadius: 14
    },

    marginSec: {
        marginHorizontal: '3%',
        flexDirection: 'row'
    },

    todayOrderText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    todayOrderValueText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    mtText: {
        color: "#747C90",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },

    qtyText: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    lastWeekOrderStatusText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        marginTop: 5
    },

    flexRow: {
        flexDirection: 'row',
        marginTop: 8
    },

    approvedSec: {
        backgroundColor: '#00B65E',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 105,
        height: 32
    },

    partialSec: {
        backgroundColor: '#F8B200',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 105,
        height: 32
    },

    pendingSec: {
        backgroundColor: '#D1D1D1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 105,
        height: 32
    },
    truckImg: {
        height: 27,
        width: 42,
        resizeMode: "contain"
    },
    mainTab: {
        borderRadius: 20,
        backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15

    },
    salesOrderTitleTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        flex: 1
    },
    salesOrderTitleSubTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 10,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        top: -5
    },



    //   ====================================================

    totalOutStandingView: {
        borderRadius: 20,
        backgroundColor: "#604D8B",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15
    },

    headerContainer: {
        height: 50,
        backgroundColor: "#fff",

    },
    soContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    approveContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    gtiImg: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    approvedTxt: {
        color: "#D1D1D1",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    approvedVal: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    partialContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    partialTxt: {
        color: "#D1D1D1",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    partialVal: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    pendingContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    gciImg: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    opiImg: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },
    pendingTxt: {
        color: "#D1D1D1",
        fontSize: 11,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    pendingVal: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },
    toSec: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    toValSec: {
        height: 22,
        width: 22,
        borderRadius: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    toValTxt: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginTop: 2
    }, receivedSec: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    receivedNum: {
        color: "#FFCB44",
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginRight: '5%'
    },
    receivedTxt: {
        color: "#D1D1D1",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    numTxt: {
        color: "#41EB99",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    mtaSec: {
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center'
    },
    atpImg: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    mtaTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: '5%'
    },
    bandhanSec: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '3%',
        marginTop: 6
    },
    bandhanImg: {
        height: 35,
        width: 35,
        resizeMode: 'contain'
    },
    bandhanTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 20,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginLeft: '5%'
    },

});

export default styles;