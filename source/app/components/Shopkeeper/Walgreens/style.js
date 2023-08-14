import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.GreyL,
    },

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
    viewstore: {
        paddingTop: vp(25),
        backgroundColor: colors.white,
        marginHorizontal: vp(-20),
        paddingHorizontal: vp(20),
        paddingBottom: vp(40),
    },
    feature: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
        marginHorizontal: vp(20),
    },
    viewtext: {
        paddingVertical: vp(10),
        borderTopWidth: vp(1),
        borderTopColor: colors.inputbordercol,
        borderBottomWidth: 1,
        borderBottomColor: colors.inputbordercol,
        marginHorizontal: vp(-20),
        backgroundColor: colors.white,
        marginBottom: vp(2)
    },
    mainview: {
        backgroundColor: colors.white,
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
    viewitem: {
        paddingTop: vp(15),
        paddingBottom: vp(150),
        backgroundColor: colors.GreyL,
    },
    viewmain: {
        backgroundColor: colors.primary,
        marginVertical: vp(18),
        marginHorizontal: vp(20),
        borderRadius: hp(10),
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: vp(15),
        paddingVertical: vp(15),
    },
    viewone: {
        flex: .57,
        // backgroundColor: 'red',
        justifyContent: 'center',
    },
    viewtwo: {
        flex: .13,
        // backgroundColor: 'green',
        justifyContent: 'center',
    },
    viewthree: {
        flex: .3,
        // backgroundColor: 'red',
        justifyContent: 'center',
    },
    item: {
        fontSize: fp(16),
        color: colors.white,
        fontFamily: Font.regular,
    },
    num: {
        fontSize: fp(18),
        color: colors.white,
        fontFamily: Font.semiBold,
    },
    cart: {
        fontSize: fp(16),
        color: colors.white,
        fontFamily: Font.regular,
    },
    viewcart: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: hp(25),
        paddingVertical: vp(10),
        paddingHorizontal: vp(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewbrowse: {
        flexDirection: 'row',
        // backgroundColor: colors.Secondary,
        // borderRadius: hp(25),
        justifyContent: 'center',
        alignItems: 'center',
        width: hp(182),
        // paddingVertical: vp(14),
        // paddingHorizontal: vp(14),
        position: 'absolute',
        bottom: 0,
        marginHorizontal: vp(120),
        marginBottom: vp(115)
    },
    browse: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.white,
        paddingLeft: vp(10),
    },
    buttonstyle: {
        backgroundColor: colors.Secondary,
        height: hp(50),
        paddingVertical: vp(10)
    },
});

