import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";


const styles = StyleSheet.create({

    container: {
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        height: Dimension.height,
    },
    blueCircle: {
        backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE,
        height: 104,
        width: 104,
        borderRadius: 52,
        justifyContent: "center",
        alignItems: "center"
    },
    cameraImg: {
        height: 22,
        width: 22,
        resizeMode: "contain"
    },
    uploadLabelTxt: {
        marginTop: 10,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: 10,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    headTxt: {
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.POPPINS.MEDIUM,
    },
    locationImg: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    deliveryImg: {
        height: 45,
        width: 45,
        resizeMode: "contain"
    },
    locationTxt: {
        marginLeft: 10,
        color: Color.COLOR.BLUE.LOTUS_BLUE,
        fontSize: 11,
        fontFamily: FontFamily.FONTS.POPPINS.REGULAR,
    },
    underline: {
        borderWidth: 0.5,
        borderColor: Color.COLOR.BLUE.LOTUS_BLUE
    },
    backImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    ancTxt: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    threeDotImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginTop: 3
    }

});

export default styles;