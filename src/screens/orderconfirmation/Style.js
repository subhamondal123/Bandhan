import { StyleSheet } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../enums";


const styles = StyleSheet.create({

    TakephotoText: {
        color: Color.COLOR.GRAY.ROUND_CAMEO,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        marginTop: 5,
        marginLeft: 10
    },
    TakeRemoveText: {
        color: Color.COLOR.WHITE.PURE_WHITE,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    },
    imgUploadView: {
        backgroundColor: Color.COLOR.GRAY.GRAY_TINTS,
        height: 110,
        width: 110,
        borderRadius: 20,
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
        height: 120,
        width: 120,
        borderRadius: 20,
        borderColor: Color.COLOR.BLUE.VIOLET_BLUE,
        borderWidth: 2,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },

    crossBtnImg: {
        backgroundColor: Color.COLOR.GRAY.SONIC_SILVER,
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
        borderColor: Color.COLOR.BLUE.VIOLET_BLUE,
        borderWidth: ' 0.8',
        justifyContent: 'center',
        alignItems: "center",
        borderStyle: "dashed"
    },

    addImg: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS,
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
    headerActionArea: {
        flexDirection: 'row',
        alignItems: "center",
        marginRight: '2%',
        // backgroundColor: Color.COLOR.WHITE.PURE_WHITE
    },
    removeBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#d4290f",
        // alignItems:"center",
        backgroundColor: "#d4290f",
    },

    filter_action_btn: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end"
    },
    filterBtn: {
        alignItems: 'flex-start',
        height: 25,
        marginRight: 10
    },
    filterImg: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    labelTxt: {
        color: Color.COLOR.GRAY.ROUND_CAMEO,
        fontSize: FontSize.XS,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
    }

});

export default styles;