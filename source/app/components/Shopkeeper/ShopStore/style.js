import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        flex: 1,
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
        textTransform: "capitalize",
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
       // marginHorizontal: vp(20),
        paddingHorizontal: vp(20),
        paddingBottom: vp(40),
    },
    feature: {
        fontSize: fp(18),
        fontFamily: Font.medium,
        color: colors.black,
        textTransform:'capitalize'
       // marginHorizontal: vp(20),
    },
    viewtext: {
        paddingVertical: vp(14),
        borderTopWidth: vp(2),
        borderTopColor: colors.inputbordercol,
        borderBottomWidth: vp(2),
        borderBottomColor: colors.inputbordercol,
        //marginHorizontal: vp(-20),
        paddingHorizontal: hp(20),
        backgroundColor: colors.white,
        marginBottom: vp(2)
    },
    mainview: {
        backgroundColor: colors.white,
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
        flex: .50,
        // backgroundColor: 'red',
        justifyContent: 'center',
    },
    viewtwo: {
        flex: .20,
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: hp(5)
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
        alignSelf: 'center',
        width: hp(182),
        marginBottom: hp(10)
        // paddingVertical: vp(14),
        // paddingHorizontal: vp(14),
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
    submain2: {
        // flexDirection: 'row',
        backgroundColor: colors.white,
        width: '100%',
    },
    container2: {
        // backgroundColor: 'red',
        width: Dimensions.get('window').width / 2 - 29,
        marginRight: vp(18),
        marginBottom: vp(18)
    },
    image2: {
        height: '100%',
        width: '100%',
    },
    mainimage2: {
        height: hp(178),
        // width: hp(178),
    },
    flat: {
        marginTop: vp(20),
        //paddingBottom: hp(70),
    },
    bonn: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
        paddingTop: vp(7),
    },
    gram: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.black,
        paddingTop: vp(4),
    },
    submain: {
        flexDirection: 'row',
        paddingTop: vp(7),
    },
    subone: {
        flex: .65,
        flexDirection: 'row',
        // backgroundColor: 'green',
    },
    subtwo: {
        flex: .35,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
    },
    num2: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    Num2: {
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textDecorationLine: 'line-through',
        paddingLeft: vp(3),
        paddingTop: vp(2)
    },
    viewicons: {
        backgroundColor: colors.primary,
        borderRadius: hp(4),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: hp(24),
        width: hp(64)
    },
    number: {
        fontSize: fp(10),
        fontFamily: Font.semiBold,
        color: colors.white,
    },
    stock: {
        fontSize: fp(10),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    viewstock: {
        backgroundColor: colors.greyy,
        borderColor: colors.inputbordercol,
        borderWidth: 1,
        borderRadius: hp(30),
        paddingVertical: vp(10),
        paddingHorizontal: vp(20),
        width: hp(105),
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: vp(80),
        marginLeft: vp(45)
    },
    viewgrey: {
        backgroundColor: colors.background,
        opacity: 0.4,
        height: hp(178),
    },
    met: {
        position: 'absolute',
        left: 0,
        right: 0,
       // marginBottom: hp(0)
    },
    emptyContainer: {
        height: '100%',
        width: '100%',
        // backgroundColor:'red'
    },
    scroll: {
        // marginTop: vp(20),
        paddingBottom: hp(50),
    },
    scroll3: {
        // marginTop: vp(20),
       // paddingBottom: hp(210),
        // // height:'100%',
        flexGrow:1
    },
    scroll22: {
        // paddingTop: hp(20),
        paddingBottom: hp(330),
    },
    submain : {
        flex: 1,
        alignItems: 'center',
        marginTop : hp(130)
    }
});
