import { StyleSheet } from "react-native";
import { FontFamily } from "../../enums";

const styles = StyleSheet.create({
    mainTab:{
        width:85,
        borderRadius:10,
        backgroundColor:"#F0F4F7",
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:15,
        paddingTop:15,
        paddingRight:10,
        paddingLeft:10,
        marginLeft:5,
        marginRight:5
    },
    ActiveMainTab:{
        width:85,
        borderRadius:10,
        backgroundColor:"#F0F4F7",
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:15,
        paddingTop:15,
        paddingRight:10,
        paddingLeft:10,
        marginLeft:5,
        marginRight:5,
        borderWidth: 1,
        borderColor: "#5CA9E2"
    },
    mainImg:{
        height:25,
        width:25,
        resizeMode:"contain"
    },
    imgSec:{
        marginBottom:10
    },
    titleSec:{
        
    },
    titleTxt:{
        fontFamily:FontFamily.FONTS.POPPINS.REGULAR,
        fontSize:12,
        color:"#1F2B4D",
    },
  
})

export default styles;