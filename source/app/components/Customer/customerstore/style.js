import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../../../assets/global_style/fontsize';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.GreyL,
    },
    storeContainer1: {
        marginTop: hp(36),
    },
    container: {
        borderBottomWidth: 0,
        backgroundColor: colors.Secondary,
        paddingBottom: hp(22),
        paddingTop: hp(15),
        paddingHorizontal: vp(20),

    },
    image: {
        height: "100%",
        width: "100%",
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
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        borderColor: colors.offblue,
        backgroundColor: colors.offblue,

    },
    lineMain1: {
        marginTop: hp(30),
        width: '100%',
        borderBottomWidth: hp(1),
        borderBottomColor: colors.inputbordercol,
    },
    lineMain2: {
        width: '100%',
        borderBottomWidth: hp(1),
        borderBottomColor: colors.inputbordercol,
    },
    featureTxt: {
        paddingVertical: vp(15),
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    featureList: {
        height: hp(500),
        marginLeft: wp(30),
        marginTop: hp(20),
    },
    browseMain: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "75%",
        position: 'absolute',
        bottom: 0,
        marginLeft: wp(50),
        left: 0,
        marginBottom: hp(130),
    },
    viewCartMain: {
        position: 'absolute',
        bottom: 0,
        marginBottom: hp(-50),
        width: '100%',
        left: 0,
        left: wp(25),
        right: 0,
        // top:hp(-30),
    },
    line: {
        borderBottomWidth: hp(1),
        borderBottomColor: colors.Secondary,
        width: wp(60),
    },
    mainview: {
        borderTopWidth: hp(1),
        borderColor: colors.buttonborder,
        backgroundColor: colors.white,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        marginBottom: hp(-70)
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
    item: {
        fontSize: fp(16),
        color: colors.white,
        fontFamily: Font.regular,
    },
    viewtwo: {
        flex: .13,
        // backgroundColor: 'green',
        justifyContent: 'center',
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
        fontFamily: Font.regular,
    },
    viewstore: {
        paddingTop: vp(25),
        backgroundColor: colors.white,
       // marginHorizontal: vp(-20),
        paddingHorizontal: vp(20),
        paddingBottom: vp(40),
    },
    submain2: {
        // flexDirection: 'row',
        backgroundColor: colors.white,
        width: '100%',
    },
    feature: {
        fontSize: fp(18),
        fontFamily: Font.medium,
        fontWeight: '400',
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
    flat: {
        marginTop: vp(20),
        //paddingBottom: hp(70),
    },
    met: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: hp(0)
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
    buttonstyle: {
        backgroundColor: colors.Secondary,
        height: hp(50),
        paddingVertical: vp(10)
    },
    mainview: {
        backgroundColor: colors.white,
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
        fontFamily: Font.regular,
    },
    scroll: {
        // marginTop: vp(20),
        paddingBottom: hp(50),
    },
    scroll3: {
        // marginTop: vp(20),
        //paddingBottom: hp(210),
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

export default styles;
