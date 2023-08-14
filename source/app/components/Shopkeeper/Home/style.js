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
    scroll: {
        paddingTop: hp(20),
        paddingBottom: vp(0),
    },
    scroll22: {
        paddingTop: hp(20),
        paddingBottom: hp(110),
    },
    deliver: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    viewmain: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: vp(5)
    },
    lorem: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
        paddingRight: vp(8)
    },
    ViewMain: {
        backgroundColor: colors.white,
        paddingBottom: vp(20),
        paddingTop: vp(20),
        borderBottomLeftRadius: hp(30),
        borderBottomRightRadius: hp(30),
        borderBottomLeftRadius: hp(30),
        borderBottomRightRadius: hp(30),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    
        elevation: 2,
        zIndex:99999
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(54),
        width: hp(54),
        borderRadius: hp(27),
        overflow: 'hidden',
    },
    viewimage: {
        alignItems: 'flex-end',
        marginRight: -2,
    },
    Mainimage: {
        height: hp(187),
        // backgroundColor: 'red',
        overflow: 'hidden',
        paddingVertical: 0,
        // width: '100%',
    },
    viewImage: {
        // backgroundColor: 'red',
        marginTop: vp(-15)
    },
    category: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
        marginTop: vp(10)
    },
    subContainer: {
        // backgroundColor: colors.red,
        width: Dimensions.get('window').width / 4 - 20,
        marginRight: vp(15),
        marginBottom: vp(17),
    },
    mainImage: {
        height: hp(86),
        width: hp(86),
        overflow: 'hidden'
    },
    veg: {
        fontSize: fp(13),
        color: colors.black,
        fontFamily: Font.regular,
        paddingHorizontal: vp(6),
        textAlign: 'center',
        paddingTop: vp(5),
    },
    flat: {
        marginTop: vp(15),
    },
    buttonStyle: {
        height: hp(45),
        // width: '95%',
        borderRadius: hp(10),
        backgroundColor: colors.white,
        borderWidth: hp(1),
        marginHorizontal: vp(10),
        // borderTopLeftRadius: 0,
        // borderTopRightRadius: 0,
        // borderBottomLeftRadius: 0,
        // borderBottomRightRadius: 0,
        borderColor: colors.buttonborder,
        paddingVertical: hp(10),
        overflow: 'hidden'
    },
    title: {
        fontSize: fp(15),
        color: colors.black,
        fontFamily: Font.regular,
    },
    button: {
        marginTop: vp(5),
        marginHorizontal: vp(-10)
    },
    feature: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
        marginTop: vp(20),
    },
    viewflat: {
        marginTop: vp(15),
        paddingBottom: vp(65),
    },
    emptyContainer: {
        height: hp(130),
        width: hp(130),
        overflow: 'hidden'
    },
    emptyState: {
        height: '100%',
        width: '100%',
    },
    MainImage: {
        height: hp(200),
        width: '100%',
        // backgroundColor: 'red',
        // overflow: 'hidden',
        // marginTop: vp(25),
        borderRadius: hp(20),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999999
    },
    image22: {
        height: '100%',
        width: '100%',
        borderRadius: hp(20),

    },
    Flat: {
        // marginTop: vp(10),
        paddingBottom: vp(50),
    },
    inputcontainer: {
        backgroundColor: colors.white,
    },
    input: {
        marginTop: vp(15),
        // backgroundColor: 'red'
    },
    error: {
        margin: hp(0),
        padding: hp(0),
    },
});
