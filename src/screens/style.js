import { StyleSheet } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, Padding } from '../enums';


const globalStyle = StyleSheet.create({
    //define all global styles here
    container: {
        backgroundColor: "#ffffff",
        height: Dimension.height,
        flex: 1
    },
    subContainer: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 10
    },
    assatesContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    backImg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    backSec: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },
    noDataFoundViewForTabList: {
        height: Dimension.height,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    headerText: {
        color: Color.COLOR.GRAY.DAVY_GRAY,
        fontFamily: FontFamily.FONTS.INTER.BOLD,
        fontSize: FontSize.LG
    },
    productBtn: {
        position: "absolute",
        bottom: "5%",
        alignSelf: 'center',
        width: "100%",
        marginHorizontal: "15%"
    },

    headerTextView: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButtonView: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },


})

export { globalStyle as CustomStyle };