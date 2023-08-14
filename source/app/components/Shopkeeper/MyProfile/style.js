import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        flexGrow : 1
    },
    main2: {
        // height: '100%',
        backgroundColor: colors.GreyL,
        paddingBottom: vp(90)
    },
    container: {
        borderBottomWidth: 0,
        backgroundColor: colors.Secondary,
        paddingBottom: hp(22),
        paddingTop: hp(15),
        paddingHorizontal: vp(20),

    },
    mainImage: {
        height: hp(54),
        width: hp(54),
        borderRadius: hp(27),
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',

    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        borderColor: colors.offblue,
        backgroundColor: colors.offblue,

    },
    title: {
        fontSize: fp(26),
        paddingTop: hp(10),
        color: colors.white,
        fontFamily: Font.semiBold,
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'capitalize'
    },
    scroll: {
        flexGrow: 1,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(100),
        width: hp(100),
        borderRadius: hp(50),
        overflow: 'hidden',
    },
    Mainimage: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: colors.white,
        position: 'absolute',
        bottom: 0,
        marginBottom: hp(0),
        right: -2,
    },
    mainview: {
        paddingTop: vp(20),
        backgroundColor: colors.white,
        paddingBottom: vp(20),
        borderBottomWidth: 1,
        borderBottomColor: colors.inputbordercol,
    },
    viewbablu: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: vp(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewone: {
        flex: .84,
    },
    viewtwo: {
        flex: .16,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    bablu: {
        fontSize: fp(24),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    pandit: {
        fontSize: fp(14),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        paddingTop: vp(1),
    },
    pandit2: {
        fontSize: fp(16),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        paddingTop: vp(1),
    },
    lore: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        marginTop: vp(-2),
        paddingLeft: vp(5)
    },
    lore2: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        marginTop: vp(-2),
        paddingLeft: vp(2),
        flex: 1
    },
    viewloc: {
        paddingTop: vp(5),

    },
    viewloc2: {
        marginLeft: vp(-5),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(20)
    },
    locttf: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewtext: {
        paddingHorizontal: vp(20),
    },
    Viewmain: {
        paddingHorizontal: vp(20),
        backgroundColor: colors.white,
        paddingVertical: vp(20),
    },
    languageMain: {
        marginLeft: wp(34)
    },
    language: {
        fontFamily: Font.regular,
        fontSize: fp(18),
        color: colors.darkblack,
        marginTop: hp(15),
    },
    language1: {
        fontFamily: Font.semiBold,
        fontSize: fp(18),
        color: colors.darkblack,
        marginTop: hp(15),
    },
    subtwo: {
        flex: .89,
        justifyContent: 'center',
        paddingLeft: vp(20),
    },
    Subtwo2: {
        flex: 0.3,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    subtwo3: {
        flex: .89,
        justifyContent: 'center',
        paddingLeft: vp(28),
    },
    Vone: {
        flex: .85,
    },
    Vtwo: {
        flex: .15,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
    },
    shop: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.regular,
    },
    info: {
        fontSize: fp(17.5),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        marginTop: vp(13),
    },
    subone: {
        flex: .11,
        // backgroundColor: 'red'
    },
    subtwo: {
        flex: .89,
        justifyContent: 'center',
        paddingLeft: vp(20),
    },
    order: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.black,
    },
    order2: {

    },
    viewIcon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.btngrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainView: {
        // alignItems: 'center',
        marginTop: vp(28),
    },
    MainView: {
        marginTop: vp(15),
    },
    Subone: {
        flex: .94,
        // backgroundColor: 'red',
        justifyContent: 'center'
    },
    Subtwo: {
        flex: .06,
        // backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    Info: {
        fontSize: fp(17.5),
        color: colors.lightgrey,
        fontFamily: Font.regular,
    },
    viewheader: {
        marginTop: vp(25)
    },
    MainImage: {
        height: hp(70),
        width: hp(124),
        overflow: 'hidden',
    },
    viewImage: {
        alignItems: 'center',
        marginTop: vp(60),
        marginBottom: vp(30),
    },
    text: {
        fontSize: fp(12),
        color: colors.GreyLight,
        fontFamily: Font.regular,
        paddingTop: vp(6),
    },
    badge: {
        marginTop: hp(7)
    },
    notiText: {
        fontSize: fp(12),
        color: colors.white,
        fontFamily: Font.medium,
        // padding : hp(10)
    }
});

