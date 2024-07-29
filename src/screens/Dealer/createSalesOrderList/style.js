import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily,FontSize } from "../../../enums";


const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
    },
    mainTab: {
        width: 85,
        borderRadius: 10,
        backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
        marginRight: 5,
        height: 86


    },
    mainImg: {
        height: 25,
        width: 25,
        resizeMode: "contain"
    },
    imgSec: {
        marginBottom: 10
    },
    titleSec: {

    },
    titleTxt: {
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
        fontSize: 12,
        color: Color.COLOR.WHITE.PURE_WHITE
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
        height: 80,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center',
    },
    headerContainer: {
        marginHorizontal: '5%',
        marginTop: 10
    },
    headerSubContainer: {
        marginTop: 8,
        flexDirection: 'row'
    },
    backImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    csoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    csoTxt: {
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
    subTabContainer: {
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 5
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 100,
    }
});

export default styles;