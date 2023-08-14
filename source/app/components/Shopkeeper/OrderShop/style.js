import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.white,
    },
    viewpie: {
        marginTop: vp(25),
        borderRadius: hp(10),
        backgroundColor: colors.white,
        overflow: 'hidden'
    },
    pie: {
        alignItems: 'center',
        paddingVertical: vp(20)
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(232),
        width: hp(130),
    },
    viewone: {
        flexDirection: 'row',
        marginBottom: vp(20),
        alignItems: 'center'
    },
    num: {
        fontSize: fp(13),
        fontFamily: Font.regular,
        color: colors.black,
    },
    viewnum: {
        height: hp(28),
        width: hp(28),
        borderRadius: hp(14),
        backgroundColor: colors.yellowp,
        borderWidth: 2,
        borderColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewnum2: {
        height: hp(28),
        width: hp(28),
        borderRadius: hp(14),
        backgroundColor: colors.orange,
        borderWidth: 2,
        borderColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pending: {
        fontSize: fp(15),
        fontFamily: Font.regular,
        color: colors.white,
        paddingLeft: vp(10),
    },
    viewtwo: {
        flexDirection: 'row',
        marginBottom: vp(20),
        alignItems: 'center',
    },
    viewthree: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    maincircle: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginLeft: vp(-15),
        marginTop: vp(25),
    },
    viewcount: {
        height: hp(28),
        width: hp(28),
        borderRadius: hp(14),
        backgroundColor: colors.green,
        borderWidth: 2,
        borderColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewNum: {
        height: hp(28),
        width: hp(28),
        borderRadius: hp(14),
        backgroundColor: colors.Secondary,
        borderWidth: 2,
        borderColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    order: {
        fontSize: fp(14),
        color: colors.black,
        fontFamily: Font.regular,
    },
    quant: {
        fontSize: fp(24),
        color: colors.black,
        fontFamily: Font.semiBold,
    },
    viewquant: {
        position: 'absolute',
        top: 68,
        alignItems: 'center',
    },
    title: {
        fontSize: fp(14),
        color: colors.lightgrey,
        fontFamily: Font.regular,
    },
    Title: {
        fontSize: fp(14),
        color: colors.black,
        fontFamily: Font.semiBold,
    },
    buttonstyle: {
        height: hp(50),
        backgroundColor: colors.white,
        paddingVertical: 0,
    },
    viewtab: {
        marginTop: vp(40),
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    viewmain: {
        // flex: 1,
        height: '100%',
        backgroundColor: colors.GreyL,
    },
    select: {
        fontSize: fp(16),
        color: colors.Secondary,
        fontFamily: Font.regular,
    },
    viewselect: {
        alignItems: 'flex-end',
        marginTop: hp(15),
    },
    checkcon: {
        margin: 0,
        padding: 0,
        marginHorizontal: 0,
        backgroundColor: colors.white,
        marginLeft: vp(-5)
    },
    viewflat: {
        //    flex:1,
        paddingBottom: vp(160),
    },
    viewflat2: {
        //    flex:1,
        paddingBottom: vp(70),
    },
    mainbutton: {
        flexDirection: 'row',
        paddingHorizontal: vp(20),
        position: 'absolute',
        bottom: 0,
        paddingVertical: vp(20),
        backgroundColor: colors.white,
        marginBottom: vp(74),
    },
    btnone: {
        flex: .5,
        marginRight: vp(8),
    },
    btntwo: {
        flex: .5,
        marginLeft: vp(8),
    },
    btnonestyle: {
        backgroundColor: colors.greyy,
    },
    btntwostyle: {
        backgroundColor: colors.primary,
    },
    titlebtn: {
        color: colors.black,
        fontSize: fp(16),
        fontFamily: Font.regular,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
    },
    flat: {
        flex: 1,
        paddingBottom: vp(30),

    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(100),
    },
    MainBtn: {
        marginHorizontal: vp(20),
        marginBottom: vp(85),
        backgroundColor: colors.white,
    },
    buttontwo: {
        backgroundColor: colors.primary,

    },
    textStyle1: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        lineHeight: hp(20),
    },
    textStyle2: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        lineHeight: hp(20),
    }
});

