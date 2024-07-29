import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize, Padding } from "../../../../enums";


const styles = StyleSheet.create({

    TakephotoText: {
        color: Color.COLOR.GRAY.ROUND_CAMEO,
        fontSize: FontSize.SM,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        marginTop: 5,
        marginLeft: '5%'
    },
    imgUploadView: {
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        height: 80,
        width: 80,
        borderRadius: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TakephotoImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 15
    },
    takeImage: {
        height: 20,
        width: 20,
        resizeMode: 'cover',
        borderRadius: 15
    },
    tauchableSec: {
        height: 90,
        width: 90,
        borderRadius: 60,
        borderColor: Color.COLOR.BLUE.BULE_LIGHT_CUSTOMER,
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },

    crossBtnImg: {
        backgroundColor: "#e53a63",
        height: 25,
        width: 25,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    crossImg: {
        resizeMode: 'contain',
        height: 20,
        width: 20
    },

    addImgField: {
        height: 80,
        width: "100%",
        backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
        borderRadius: 10,
        marginTop: 15,
        borderColor: Color.COLOR.BLUE.BULE_LIGHT_CUSTOMER,
        borderWidth: 0.8,
        justifyContent: 'center',
        alignItems: "center",
        borderStyle: "dashed"
    },

    addImg: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: "#e53a63",
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImgIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    mainView: {
        marginLeft: '3%',
        marginRight: '3%'
    },
    mainImageView: {
        flexDirection: 'row',
        marginTop: 20
    },
    flexANdMarginView: {
        flex: 0.5,
        marginHorizontal: '2%'
    },
    logisticImageView: {
        flex: 1,
        height: Dimension.height / 4.7,
        borderRadius: 12,
    },
    takePicContain: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    closeContain: {
        position: 'absolute',
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraLogo: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    loaderContain: {
        width: '100%',
        height: undefined,
        paddingVertical: 15
    },
    listLoader: {
        height: Dimension.height / 1.2,
        justifyContent: "center",
        alignItems: "center"
    }

});

export default styles;