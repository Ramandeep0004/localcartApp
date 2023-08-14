import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../../../assets/global_style/fontsize';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.white,
    },
    imageMain: {
        height: "100%",
        width: "100%",
    },
    heading: {
        fontSize: fp(48),
        fontFamily: Font.semiBold,
        color: colors.Secondary,
    },
    headingMain: {
        marginTop: hp(10),
      //  width: '75%',
    },
    subHeading: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    descriptionMain: {
        marginTop: hp(32),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    resendTxt: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.Secondary,
    },
    subheadingMain: {
        marginTop: hp(16),
    },
    cirnumContainer: {
        marginHorizontal: hzp(50),
        marginTop: hp(42),
        // marginTop: hp(150),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    cirMain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: hzp(8),
        height: hp(70),
        width: hp(70),
        borderRadius: hp(35),
        backgroundColor: colors.lightpink,
    },
    cirMain2: {
        marginHorizontal: hzp(8),
        borderWidth: hp(1),
        borderColor: colors.inputbordercol,
        height: hp(70),
        width: hp(70),
        borderRadius: hp(35),
    },
    num: {
        fontSize: fp(26),
        fontFamily: Font.regular,
        color: colors.darkblack,
    },
    button: {
        backgroundColor: colors.primary,
    },
    buttonMain: {
     //   left: 0,
      //  bottom:0,
      //  marginBottom:hp(-220),
        // top: 0,
         marginTop: hp(150),
       // right: 0,
      //  position: 'absolute',
    },
    InputContainer: {
        height: fp(60),
        width: fp(60),
        paddingHorizontal: hzp(0),
        fontSize: fp(50),
        borderRadius: wp(30),
        backgroundColor: colors.lightpink,
        borderWidth: wp(1),
        borderColor: colors.buttonborder,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        // marginRight: wp(14),
        // marginLeft:wp(14)

    },
    pin: {
        fontSize: fp(26),
        fontFamily: Font.regular,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: colors.black,
    },
    inputContainer: {
        height: fp(70),
        width: fp(70),
        paddingHorizontal: fp(10),
        borderRadius: fp(50),
        backgroundColor: colors.lightpink,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: vp(15)
    },
    errorStyle: {
        color: colors.red,
        marginHorizontal: fp(60),
        marginTop: hp(5),
        fontFamily: Font.regular,
        fontSize: fp(15),
    },
});

export default styles;
