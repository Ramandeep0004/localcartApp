import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.GreyL,
    },
    //Header
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        borderColor: colors.offblue,
        backgroundColor: colors.offblue,

    },
    container: {
        borderBottomWidth: 0,
        backgroundColor: colors.Secondary,
        paddingBottom: hp(22),
        paddingTop: hp(15),
        paddingHorizontal: vp(20),

    },
    title: {
        fontSize: fp(26),
        paddingTop: hp(10),
        color: colors.white,
        fontFamily: Font.semiBold,
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'capitalize',
    },
    icon: {
        height: hp(50),
        width: hp(50),
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: Font.regular,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainImage: {
        height: hp(54),
        width: hp(54),
        borderRadius: hp(27),
        overflow: 'hidden',
    },
    inputcontainer: {
        backgroundColor: colors.white,
    },
    viewicon: {
        height: hp(58),
        width: hp(58),
        borderRadius: hp(29),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewmain: {
        // marginTop: vp(24),
        marginTop: vp(160),
        width: '100%',
        paddingHorizontal: vp(20),
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 99,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(18),
        width: hp(16),
        overflow: 'hidden',
    },
    viewflat: {
        // paddingBottom: vp(200),
    },
    nodata: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(200),
    },
    Flat: {
        flexGrow:1,
      
        paddingBottom: vp(150),
    },
    scroll22: {
        paddingTop: hp(100),
        paddingBottom: hp(240),
    },
    store: {
        fontSize: fp(19),
        color: colors.black,
        fontFamily: Font.semiBold,
        textTransform: 'capitalize',
    },
});

