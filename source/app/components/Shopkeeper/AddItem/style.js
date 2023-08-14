import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.GreyL,
    },
    inputcontainer: {
        minHeight: hp(120),
    },
    input: {
        marginTop: vp(22),
    },
    product: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        marginTop: vp(25)
    },
    lorem: {
        fontFamily: Font.regular,
        fontSize: fp(14),
        color: colors.lightgrey,
        marginTop: vp(5)
    },
    submain: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.inputbordercol,
        backgroundColor: colors.offgrey,
        borderRadius: hp(30),
        height: hp(54),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vp(15),
    },
    upload: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        paddingLeft: vp(10),
    },
    detail: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.regular,
        marginTop: vp(22),
    },
    detail22: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.regular,
        marginVertical: vp(15),
    },
    viewinput: {
        marginTop: vp(15),
    },
    viewinput22: {
        marginTop: vp(15),
        alignItems: 'center',
        backgroundColor: colors.offgrey,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.inputbordercol,
        borderRadius: hp(30),
        height: hp(54),
    },
    viewinput33: {
        marginTop: vp(15),
        paddingVertical:hp(35),
        paddingHorizontal:hzp(20),
        alignItems: 'center',
        backgroundColor: colors.offgrey,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.inputbordercol,
        borderRadius: hp(30),
    },
    button: {
        backgroundColor: colors.primary,
    },
    button22: {
        backgroundColor: colors.Secondary,
    },
    viewbutton: {
        marginBottom: vp(20),
        marginTop: vp(20),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(115),
        width: hp(115),
        overflow: 'hidden',
        marginRight: vp(20)
    },
    mainView: {
        marginTop: vp(25),
        marginRight: vp(-15)
    },
    viewicon: {
        position: 'absolute',
        top: 5,
        right: 5,
        height: hp(25),
        width: hp(25),
        borderRadius: hp(12.5),
        backgroundColor: colors.greyy,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        minHeight: hp(120),
        marginBottom: vp(20),
    },
    inputcontainer222: {
       backgroundColor:colors.white,
    },
    errorStyle: {
        color: colors.Secondary,
        marginHorizontal: hp(5),
        marginTop: hp(10),
        fontFamily: Font.regular,
        fontSize: fp(14),
        // backgroundColor: 'red'
      },
});

