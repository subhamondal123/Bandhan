import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
    },
    cardSection: {
        flexDirection: "row",
        backgroundColor: "#FFE1E1",
        borderRadius: 20,
        padding: 10,
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
        flex: 1,
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
    percentageTxt: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 9,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR
    },
    headingTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.LG,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,

    },

    mainTab: {
        borderRadius: 25,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor: Color.COLOR.GRAY.GRAY_TINTS,
    },
    ActiveMainTab: {
        borderRadius: 25,
        backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 5,
        marginRight: 5,
    },

    activeTitleTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12,
        color: Color.COLOR.WHITE.PURE_WHITE
    },

    titleTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12,
        color: "#1F2B4D"
    },

    mainBox: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 2,
        shadowColor: '#000',

        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 5,
    },

    blueBox: {
        backgroundColor: Color.COLOR.BLUE.VIOLET_BLUE,
        height: 110,
        borderRadius: 15,
        justifyContent: 'center',
    },

    // list design 

    listMainDesign: {
        marginHorizontal: 15,
        marginTop: 10
    },

    mainListColor: {
        backgroundColor: '#F0F4F7',
        padding: 14,
        borderRadius: 14
    },

    flexRowView: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: "center"
    },

    alignCenterView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    redParsentLogo: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center'
    },

    productText: {
        color: "#1F2B4D",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: '2%'
    },

    productNameText: {
        color: '#747C90',
        fontSize: 10,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: '5%'
    },

    progressView: {
        flexDirection: 'row',
        justifyContent: "flex-end"
    },

    mtText: {
        color: '#747C90',
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: '5%'
    },

    blueUnderline: {
        borderWidth: 0.4,
        borderColor: '#89CDEF',
        marginTop: 12
    },

    listCenterView: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },

    plusMinusView: {
        flexDirection: 'row',
        paddingVertical: 5,
        borderWidth: 0.8,
        borderColor: "#000",
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        backgroundColor: '#fff'
    },

    totalAmountText: {
        color: '#1F2B4D',
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: '5%'
    },
    totalText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    totalItemText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: '5%',
        flex: 1
    },

    redTotalAmount: {
        color: '#F13748',
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },

    headerSecView: {
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 15,
        alignItems: 'center'
    },

    backImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },

    headerTextView: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row"
    },

    cardView: {
        backgroundColor: '#F13748',
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 18,
        height: 35
    },

    shopingImg: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
    },

    cartCount: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.BOLD,
        marginTop: 2
    },

    threeDot: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginTop: 3
    },

    subCategoryView: {
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 5,
        marginHorizontal: 15
    },
    listContainer: {
        marginHorizontal: 15,
        marginTop: 10
    },
    subListContainer: {
        backgroundColor: '#F0F4F7',
        padding: 14,
        borderRadius: 14
    },
    btnPress: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: "center",
        marginRight: 10,
    },
    logo_Txt: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    redLogo: {
        height: 26,
        width: 26,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    },
    proDesc: {
        color: "#1F2B4D",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: '2%'
    },
    circulerContainer: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    mtTxt: {
        color: '#747C90',
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: '5%'
    },
    quantityContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    subQuanContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 0.8,
        borderColor: "#000",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        backgroundColor: "#fff"
    }, cmIcon: {
        height: 21,
        width: 21,
        resizeMode: 'contain'
    },
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 45
    },
    tmTxt: {
        color: '#1F2B4D',
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        marginLeft: '5%'
    },
    categoryContainer: {
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 5,
        marginHorizontal: 15
    },
    subCateContainer: {
        flexDirection: "row",
        marginTop: 5,
        marginHorizontal: 15
    },
    loadContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 60,
    },
    tmContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15
    },
    totalTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    amountTxt: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
        flex: 1
    },
    timTxt: {
        color: '#F13748',
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM
    },
    bigBtnContainer: {
        marginHorizontal: 10,
        marginTop: 15,
        flexDirection: "row"
    },
    activityContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },





});

export default styles;