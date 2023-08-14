import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../assets/global_style/fontsize';

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.GreyL,
    },
    flat: {
        flexGrow: 1
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
    viewflat: {
        flexGrow: 1,
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
    lorem2 : {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
        textTransform : 'capitalize'
    },
    lorem: {
        fontSize: fp(16),
        fontFamily: Font.semiBold,
        color: colors.black,
        textTransform : 'capitalize'
    },
    success: {
        color: colors.Green,
        fontSize: fp(13),
        fontFamily: Font.regular,
    },
    submain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subone: {
        flex: .5,
    },
    subtwo: {
        flex: .5,
        alignItems: 'flex-end',
        // backgroundColor: 'red'
    },
    number: {
        fontSize: fp(13),
        fontFamily: Font.regular,
        color: colors.black,
    },
    date: {
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.black,
        // paddingTop: vp(2),
    },
    count2 : {
        fontSize: fp(20),
        fontFamily: Font.regular,
        color: colors.black,
    },
    count: {
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.primary,
    },
    scroll: {
        flexGrow: 1,
    },
    nodata:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(150),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imgContainer: {
        height: hp(230),
        width: '100%',
    },
    imgMain: {
        marginTop: hp(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentMain: {
        marginTop: hp(30),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    
});
