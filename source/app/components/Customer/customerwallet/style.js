import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp } from '../../../assets/global_style/fontsize';

export const styles = StyleSheet.create({


    main: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.GreyL,
    },
    viewwal: {
        // backgroundColor: 'red',
        marginTop: vp(10),
    },
    viewadd: {
        backgroundColor: colors.white,
        borderRadius: hp(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingHorizontal: vp(20),
        paddingVertical: vp(20),
    },
    viewtext: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: hp(30),
        borderColor: colors.Lgrey,
        paddingHorizontal: vp(8),
        paddingVertical: vp(8),
        marginRight: vp(20)
    },
    num: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.black,
        paddingLeft: vp(3),
    },
    view: {
        paddingRight: vp(-20),
    },
    error: {
        margin: 0,
        padding: 0,
    },
    btnstyle: {
        backgroundColor: colors.primary,
        height: hp(50),
        paddingVertical: vp(10)
    },
    viewbtn: {
        marginTop: vp(20),
    },
    payment: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
        marginTop: vp(20),
    },
    paymentMain: {
        marginTop: hp(10),
    },
    viewmain: {
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.inputbordercol,
        paddingBottom: vp(16),
        marginBottom: vp(16),
    },
    mainrow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainone: {
        flex: .85,
    },
    maintwo: {
        flex: .15,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
    },
    viewflat: {
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderTopLeftRadius: vp(5),
        borderTopRightRadius: hp(5),
        overflow: 'hidden',
        marginTop: vp(16),
        flexGrow: 1,
        paddingHorizontal: vp(20),
        paddingTop: vp(20),
        height: hp(510),
    },
    lorem: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.black,
        textTransform: 'capitalize'
    },
    success: {
        color: colors.Green,
        fontSize: fp(14),
        fontFamily: Font.regular,
        paddingHorizontal: vp(12),
        paddingVertical: vp(2),
        borderRadius: hp(20),
        overflow:'hidden'
    },
    submain: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: vp(4),
    },
    subone: {
        flex: .8,
    },
    subtwo: {
        flex: .5,
        alignItems: 'flex-end',
        // backgroundColor: 'red'
    },
    number: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.black,
    },
    btnstyle22: {
        backgroundColor: colors.gray,
        height: hp(50),
        paddingVertical: vp(10)
    },
    date: {
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.black,
        paddingTop: vp(7),
    },
    count: {
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    scroll: {
        marginBottom: hp(30),
        flexGrow: 1,
    },
    nodata: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(150),
    },
    viewpending: {
        // height: hp(23),
        // maxWidth: hp(200),
        // paddingHorizontal: hp(5),
        marginTop: hp(5),
        // paddingHorizontal: vp(12),
        // paddingVertical: vp(2),
        borderRadius: hp(20),
        // backgroundColor: colors.Lgreen,
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'row',
        overflow: 'hidden'
    },
});
