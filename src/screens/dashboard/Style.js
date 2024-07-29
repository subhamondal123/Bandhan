import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../enums";

const styles = StyleSheet.create({

    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
        flex: 1
    },

    headerDataBox: {
        borderRadius: 20,
        backgroundColor: "#070457",
        height: 150


    },
    slideDataBox: {
        borderRadius: 20,
        backgroundColor: "#BECDF4",
        height: 155,
        marginTop: 40,
        marginHorizontal: '1%'

    },

    lineBox: {
        height: 50,
        borderLeftWidth: 3,
        borderLeftColor: '#808DAF',
        borderRadius: 4
    },

    sideBox: {
        height: 50,
        borderLeftWidth: 3,
        borderLeftColor: '#5ddab3',
        borderRadius: 4
    },


    shadowText: {
        color: '#fff',
        textShadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        textShadowRadius: 5,
        fontSize: 20,
        fontWeight: '700',
        textAlign: "center"
    },

    tooltipListView: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderColor: Color.COLOR.GRAY.GRAY_COLOR,
        borderBottomWidth: 0.5
    },
    tooltipText: {
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM
    },

    boxValueText: {
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.LG,
        color: Color.COLOR.WHITE.PURE_WHITE,
        marginLeft: 5,
        marginRight: 5
    },
    boxText: {
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        fontSize: FontSize.MD,
        color: Color.COLOR.WHITE.PURE_WHITE
    },
    boxCircle: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        justifyContent: 'center',
        alignItems: 'center',

    },
    boxImg: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    brandImg: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    textPartyCode: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    valueText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.REGULAR,
        marginTop: 5
    },
    swaiperText: {
        color: "#1C165B",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
    totalStanding: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.MD,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textAlign: "center"
    },
    partyAccountCode: {
        color: "#1C165B",
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

    stockUpdateButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        height: 150

    },
    partyAccountText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        marginTop: 20,
        marginLeft: '2%'
    },
    shopNameText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        marginLeft: '2%',
        top: -5
    },
    shopValueName: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        fontSize: 13
    },

    dashBoardMainBox: {
        marginHorizontal: '5%',
        marginTop: 30
    },
    buttonmainBox: {
        marginTop: 10,
        flexDirection: 'row'
    },
    flexButton: {
        flex: 0.5,
        marginHorizontal: '4%'
    },
    pcTxt: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    loyalTxt: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    tsTxt: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    asTxt: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    pcodeTxt: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    pacTxt: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    tocTxt: {
        flexDirection: 'column',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    creditBottomSec:{
        // flex:1,
        flexDirection: "row", 
        paddingVertical: 10, 
        borderTopWidth: 0.5, 
        borderColor: Color.COLOR.BLUE.LOTUS_BLUE, 
        borderBottomWidth: 0.5 ,

    },
    bottomDaysSec:{
        justifyContent:"center",
        flex:0.25,
        borderRightWidth:0.5,
        borderColor:Color.COLOR.BLUE.LOTUS_BLUE,
    },
    bottomDaysSecRight:{
        justifyContent:"center",
        flex:0.25,
        borderRightWidth:0.5,
        borderColor:Color.COLOR.WHITE.PURE_WHITE,
    },
    bottomDaysTxt:{
        textAlign:"center",
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
    },



});

export default styles;