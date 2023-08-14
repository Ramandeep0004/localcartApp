import { StyleSheet } from 'react-native';
import { colors } from '../../../../../assets/global_style/colors';
import { Font } from '../../../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../../../assets/global_style/fontsize';


const styles = StyleSheet.create({
    main: {
        flex: 1,
        // backgroundColor:colors.white
    },
    sliderMain: {
        marginTop: hp(42),
    },
    sliderContainer: {
        flexDirection: 'row',
    },
    cirMain1: {
        flex: 0.2,
    },
    cirMain2: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cirMain3: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 0.2,
    },
    ring: {
        height: hp(24),
        width: hp(24),
        borderRadius: hp(12),
        borderWidth: hp(1.6),
        borderColor: colors.Secondary,
    },
    ring1: {
        height: hp(24),
        width: hp(24),
        borderRadius: hp(12),
        borderWidth: hp(1.6),
        borderColor: colors.inputbordercol,
    },
    line: {
        marginVertical: vp(8),
        marginLeft: wp(20),
        width: wp(150),
        borderWidth: hp(1.54),
        borderColor: colors.inputbordercol,
    },
    headingMain: {
        marginTop: hp(40),

    },
    heading: {
        fontSize: fp(48),
        fontFamily: Font.semiBold,
        color: colors.Secondary,
    },
    cirContainer: {
        marginTop: hp(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    circlMain: {
        height: hp(130),
        width: hp(130),
        borderRadius: hp(65),
        backgroundColor: colors.greyy,
        overflow: 'hidden',
    },
    userimageLogo: {
        height: '100%',
        width: '100%',
    },
    cirContainer2: {
        position: 'absolute',
        right: wp(128),
        // top: hp(135),
        bottom: 0,
    },
    circleMain2: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(22),
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        height: hp(60),
        borderColor: colors.inputbordercol,
        borderRadius: hp(40),
        borderWidth: hp(1),
    },
    inputMain: {
        marginTop: hp(42),
    },
    scrollMain: {
        paddingBottom: hp(20)
    },
    button2: {
        backgroundColor: colors.primary
    },
    button1: {
        backgroundColor: colors.greyy,
    },
    btntitle: {
        color: colors.black,
    },
    buttonMain: {
        marginTop: hp(42)
    },
    homeDeli: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.black,
    },
    checkboxMain: {
        marginTop: hp(20)
    },
    dropdown: {
        // paddingBottom: hp(20)
    },
    dropdown2: {
        marginBottom: hp(-20)
    },
    checkboxMain2: {
        marginTop: hp(25),
    },
    vone: {
        flex: 0.13,
        // backgroundColor: 'red'
    },
    checkcon: {
        margin: 0,
        padding: 0,
        backgroundColor: colors.white,
        marginTop: vp(-2),
    },
    errorStyle: {
        color: colors.Secondary,
        marginHorizontal: fp(10),
        // marginTop: hp(10),
        fontFamily: Font.regular,
        fontSize: fp(14),
        // backgroundColor: 'red'
    },
    errorStyle2: {
        color: colors.Secondary,
        marginHorizontal: fp(10),
        marginTop: hp(10),
        fontFamily: Font.regular,
        fontSize: fp(14),
        // backgroundColor: 'red'
    },
    vtwo: {
        flex: 0.87,
        paddingRight: wp(100),
        //    paddingLeft: vp(12),
    },
    Text: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    text: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    viewrow: {
        marginTop: hp(20),
        flexDirection: 'row'
    },
    inputMain2: {
        marginTop: hp(35)
    },
});

export default styles;
