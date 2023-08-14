import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
    },
    inputcontainer: {
        backgroundColor: colors.GreyL,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        borderColor: colors.offblue,
        backgroundColor: colors.offblue,

    },
    mainImage: {
        height: hp(54),
        width: hp(54),
        borderRadius: hp(27),
        overflow: 'hidden',
    },
    title: {
        fontSize: fp(26),
        paddingTop: hp(10),
        color: colors.white,
        fontFamily: Font.semiBold,
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: "capitalize",
    },
    viewicon: {
        height: hp(58),
        width: hp(58),
        borderRadius: hp(29),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        borderBottomWidth: 0,
        backgroundColor: colors.Secondary,
        paddingBottom: hp(22),
        paddingTop: hp(15),
        paddingHorizontal: vp(20),

    },
    viewmain: {
        marginTop: vp(158),
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
        // marginBottom: vp(350),
    },

    viewflat22: {
        paddingBottom: vp(0),
        marginBottom: vp(350),
    },
    Flat: {
        flexGrow:1,
      
        paddingBottom: vp(150),
    },
    Flat22: {
        // marginTop: vp(10),
        paddingBottom: vp(120),
    },
    met: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: hp(0),
        zIndex: 999999
    },
    viewbrowse: {
        flexDirection: 'row',
        // backgroundColor: colors.Secondary,
        // borderRadius: hp(25),
        justifyContent: 'center',
        alignSelf: 'center',
        width: hp(182),
        marginBottom: hp(20)
        // paddingVertical: vp(14),
        // paddingHorizontal: vp(14),
    },
    mainview: {
        backgroundColor: colors.white,
        marginHorizontal: vp(-20),
    },
    viewmain22: {
        backgroundColor: colors.primary,
        marginVertical: vp(18),
        marginHorizontal: vp(20),
        borderRadius: hp(10),
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: vp(15),
        paddingVertical: vp(15),
        marginBottom: hp(30)
    },
    viewone: {
        flex: .50,
        // backgroundColor: 'red',
        justifyContent: 'center',
    },
    item: {
        fontSize: fp(16),
        color: colors.white,
        fontFamily: Font.regular,
    },
    viewtwo: {
        flex: .20,
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: hp(5)
    },
    num: {
        fontSize: fp(18),
        color: colors.white,
        fontFamily: Font.semiBold,
    },
    viewthree: {
        flex: .3,
        // backgroundColor: 'red',
        justifyContent: 'center',
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
    cart: {
        fontSize: fp(16),
        color: colors.white,
    },
    scroll22: {
        paddingTop: hp(100),
        paddingBottom: hp(240),
    },
    emptyState :{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(140),
    },
    store: {
        fontSize: fp(19),
        color: colors.black,
        fontFamily: Font.semiBold,
        textTransform: 'capitalize',
    },
});
