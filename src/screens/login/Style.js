import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Padding, Dimension } from '../../enums';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        height: Dimension.height,
        flex: 1
    },
    backgroundImageView: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 30
    },
    backgroundImage: {
        width: 135,
        height: 135,
        resizeMode: 'contain'
    },
    belowImageView: {
        justifyContent: "center",
        marginHorizontal: "10%"
    },
    welcomeText: {
        fontSize: FontSize.SM,
        color: Color.COLOR.GRAY.PHILIPPINE_SILVER,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD
    },
    loginText: {
        fontSize: 36,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    formInputSection: {
        marginTop: 32,
        marginHorizontal: "10%",
    },
    formLabel: {
        fontSize: 13,
        color: Color.COLOR.GRAY.PHILIPPINE_SILVER,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },
    formInputBox: {
        height: 55,
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        elevation: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    formInputLeftIconView: {
        marginHorizontal: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formInputLeftIcon: {
        height: 14,
        width: 16,
        resizeMode: 'cover'
    },
    verticalBlueLine: {
        height: 20,
        width: 2,
        backgroundColor: Color.COLOR.BLUE.MAXIMUM_BLUE
    },
    textInput: {
        fontSize: FontSize.SM,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        marginHorizontal: 21,
        flex: 1
    },
    focusedTextInput: {
        fontSize: FontSize.SM,
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD,
        marginHorizontal: 21,
        flex: 1
    },
    forgotText: {
        fontSize: FontSize.XS,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        // alignSelf: "flex-end",

    },
    forgotTextView: {
        justifyContent: "flex-end",
        // alignItems:"flex-end",
        flex: 0.4
    },
    chooseProductText: {
        fontSize: FontSize.XS,
        color: Color.COLOR.GRAY.SONIC_SILVER,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
        alignSelf: "flex-end",
        marginTop: 10
    },
    buttonSection: {
        marginTop: 35
    },
    buttonView: {
        height: 55,
        borderRadius: 10
    },
    linearGradient: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3b1f77"
    },
    buttonText: {
        fontSize: FontSize.MD,
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontFamily: FontFamily.FONTS.INTER.BOLD
    },

    alertMsg: {
        fontSize: 11,
        color: Color.COLOR.RED.PURE_RED,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM,
    },

    textTremsConditions: {
        color: Color.COLOR.BLUE.VIOLET_BLUE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        textDecorationLine: 'underline',


    },

    letterText: {
        color: Color.COLOR.BLACK.PURE_BLACK,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.REGULAR
    },

    //modal section
    modalview: {
        backgroundColor: '#fff',
        marginRight: '5%',
        marginLeft: '5%',
        paddingBottom: 30,
        borderRadius: 10

    },
    modalHeaderSec: {
        backgroundColor: "#3b1f77",
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

    updateButton: {
        paddingBottom: 8,
        paddingTop: 8,
        paddingHorizontal: '5%',
        backgroundColor: "#3b1f77",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    updateText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.MEDIUM
    },

})

export default styles;