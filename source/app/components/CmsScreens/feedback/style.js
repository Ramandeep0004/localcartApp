import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";

export const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: colors.GreyL,
    },
    detailContainer1:{
        flexDirection:'row',
        marginTop:hp(12),
    },
    cardContainer:{
        paddingHorizontal:hzp(20),
        paddingVertical:vp(20),
        marginTop:hp(20),
        backgroundColor:colors.Secondary,
        borderRadius:hp(10),
    },
    listContainer: {
        marginVertical: vp(7)
    },
    detailContainer: {
        flexDirection: 'row'
    },
    iconMain: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textMain: {
        marginLeft: wp(15),
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.white,
    },
    inputMain: {
        marginTop: hp(35)
    },
    inputContainer: {
        borderRadius:hp(30),
        minHeight: hp(120),
    },
    button: {
        backgroundColor: colors.primary,
    },
    buttonMain: {
        //position: 'absolute',
        bottom: 0,
        marginBottom: hp(10)
    },
    inputTxt:{
        marginBottom:hp(55),
    },
    errorStyle: {
        color: colors.Secondary,
        fontFamily: Font.regular,
        fontSize: fp(14),
        margin: hp(5),
        padding: 0,
    },

});
export default styles;