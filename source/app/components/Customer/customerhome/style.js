import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        // flex:1,
        height: '100%',
        backgroundColor: colors.GreyL,
    },
    scroll: {
        paddingTop: hp(20),
        paddingBottom: vp(15),
    },
    scroll22: {
        paddingTop: hp(20),
        paddingBottom: hp(125),
    },
    deliver: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    addressMain: {

        left: 0,
        right: 0,
        top: 0,
        marginTop: hp(120),
        marginLeft: wp(20),
        position: 'absolute',
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
        paddingRight: vp(15)
    },
    ViewMain: {
        backgroundColor: colors.white,
        paddingBottom: vp(20),
        paddingTop: vp(20),
        borderBottomLeftRadius: hp(30),
        borderBottomRightRadius: hp(30),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        zIndex:99999,
        elevation: 2,
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

        marginTop: vp(-15)
    },
    categoryMain: {
        marginTop: hp(15
        ),
    },
    category: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
        marginTop: vp(10)
    },
    subContainer: {

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
    buttonstyle: {
        height: hp(45),
        borderRadius: hp(10),
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.offgrey,
        paddingVertical: 0
    },
    title: {
        fontSize: fp(15),
        color: colors.black,
        fontFamily: Font.regular,
    },
    button: {
        marginTop: vp(5)
    },

    feature: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
        marginTop: vp(20),
    },
    viewflat: {
        marginBottom: hp(60),
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

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
        width: '70%',
        marginTop: vp(40),
    },
    MainImage: {
        height: hp(200),
        width: '100%',
        // backgroundColor: 'red',
        // overflow: 'hidden',
        // marginTop: vp(25),
        borderRadius: hp(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    image22: {
        height: '100%',
        width: '100%',
        borderRadius: hp(20),

    },
    Flat: {
        // marginTop: vp(10),
        paddingBottom: vp(10),
    },
    met: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: hp(70),
        marginHorizontal: vp(20),
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
