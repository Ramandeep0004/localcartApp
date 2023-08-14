import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.background,
    },
    viewwhite: {
        height: hp(90),
        backgroundColor: colors.white,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(116),
        width: hp(116),
        overflow: 'hidden',
        borderRadius: hp(58),
    },
    viewimage: {
        alignItems: 'center',
        marginTop: vp(25),
    },
    viewImage: {
        height: hp(50),
        width: hp(50),
        borderRadius: hp(25),
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.white,
        position: 'absolute',
        bottom: -5,
        right: 115,
    },
    bablu: {
        fontSize: fp(24),
        fontFamily: Font.semiBold,
        color: colors.black,
        textAlign: 'center',
        marginTop: vp(20),
    },
    pandit: {
        fontSize: fp(16),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        textAlign: 'center',
        marginTop: vp(4)
    },
    Mainimage: {
        height: hp(260),
        width: hp(260),
        overflow: 'hidden',
    },
    Mainview: {
        backgroundColor: colors.white,
        marginTop: vp(45),
        alignItems: 'center',
        paddingTop: vp(20),
        paddingBottom: vp(30),
        borderRadius: hp(10),
    },
    scan: {
        fontSize: fp(20),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textAlign: 'center',
        marginTop: vp(20),
    },
    upi: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textAlign: 'center',
    },
    viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.greyy,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 12,
        top: 12,
    },
    MainView: {
        backgroundColor: colors.white,
        marginTop: vp(45),
        alignItems: 'center',
        paddingTop: vp(70),
        paddingBottom: vp(30),
        paddingHorizontal: vp(20),
        borderRadius: hp(10),
    },
    MainView22: {
        backgroundColor: colors.white,
        // marginTop: vp(45),
        // alignItems: 'center',
        // paddingTop: vp(70),
        paddingBottom: vp(30),
        paddingHorizontal: vp(20),
        borderRadius: hp(10),
    },
    upload: {
        fontSize: fp(20),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        textAlign: 'center',
        marginTop: vp(20),
    },
    submain: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderColor: colors.inputbordercol,
        backgroundColor: colors.offgrey,
        borderRadius: hp(30),
        height: hp(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vp(75),
    },
    submain22: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderColor: colors.inputbordercol,
        backgroundColor: colors.offgrey,
        borderRadius: hp(30),
        height: hp(50),
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: vp(75),
    },
    Upload: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        paddingLeft: vp(10),
    },
    touch: {
        width: '100%',
    },
});

