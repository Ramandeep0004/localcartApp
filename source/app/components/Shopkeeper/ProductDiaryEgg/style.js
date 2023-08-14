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
    },
    line : {
        fontFamily: Font.semiBold,
        height : hp(50),
        color : colors.lightgrey,
        paddingHorizontal : hp(5),
        justifyContent : 'center',
        alignItems : 'center'
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
    viewrow: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginHorizontal: vp(-20),
        paddingHorizontal: vp(20),
        paddingTop: vp(15),
    },
   
    viewone: {
        flex: .80,
        borderRightWidth : 0.7,
        marginVertical : hp(10),
        borderColor : colors.lightgrey,
        paddingRight : hp(5),
        paddingBottom : hp(10)
    },
    viewtwo: {
        flex: .2,
        alignItems: 'flex-end',
        justifyContent : 'center'
    },
    custom: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
    },
    message : {
        fontSize: fp(14),
        color: colors.black,
        fontFamily: Font.regular,
        paddingTop : hp(8),
        paddingRight : hp(5)
    },
    subCon: {
        flexDirection: 'row',
        paddingBottom: vp(12),
        marginBottom: vp(12),
        borderBottomWidth: 1,
        borderBottomColor: colors.offgrey,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(80),
        width: hp(80),
        overflow: 'hidden',
    },
    Con: {
        flex: 1,
        paddingLeft: vp(15),
    },
    viewRow: {
        flexDirection: 'row',
    },
    Viewone: {
        flex: .9,
    },
    Viewtwo: {
        flex: .2,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
    },
    bonn: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
    },
    gram: {
        fontSize: fp(14),
        color: colors.black,
        fontFamily: Font.regular,
        paddingTop: vp(5)
    },
    num: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
        paddingTop: vp(5)
    },
    flat: {
        flaxGrow: 1,
        marginTop: vp(20),
        paddingBottom: vp(45)
    },
    viewflat: {
        paddingBottom: vp(350),
    },
    button: {
        backgroundColor: colors.primary,
    },
    viewbutton: {
        position: 'absolute',
        paddingHorizontal: vp(20),
        backgroundColor: colors.white,
        bottom: 0,
        paddingVertical: vp(18),
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: hp(180),
    }
});

