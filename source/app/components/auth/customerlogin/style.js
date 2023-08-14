import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../../../assets/global_style/fontsize';

const styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor: colors.white,
    },
    imageMain: {
        height: '100%',
        width: '100%',
    },
    imgContainer1: {
        height: hp(246),
        width: '100%',
    },
    image: {
        height: '100%',

        width: '100%',
    },

    inputContainer: {
        borderColor: colors.inputbordercol,
        borderRadius: hp(40),
        borderWidth: hp(1),
    },
    imgcontainer: {
        height: hp(100),
        width: wp(180),
    },
    logoMain: {
        // bottom:0,
        left: 0,
        right: 0,
        position: 'absolute',
        marginTop: hp(-170),
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        paddingLeft: hp(10),
        fontSize: fp(18),
        fontFamily: Font.Extralight,
        color: colors.gray,
    },
    error: {
        height: 0,
    },
    inputcontainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
    },
    inputMain1: {
        marginTop: hp(50),
    },
    txtMain: {
        alignItems: 'flex-end',
    },

    button: {
        backgroundColor: colors.primary,
    },
    buttonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(40),
    },
    btntitle: {
        color: colors.offwhite,
    },
    desMain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(40),
    },
    forgottext: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textAlign: 'center',
    },
    forgotTxt: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.Secondary,
    },
    registrationTxt: {
        textAlign: 'center',
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    clickTxt: {
        textAlign: 'center',
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.Secondary,
    },
    clicktxt: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.Secondary,
    },
    recovertxt: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textAlign: 'center',
    },
    horiline: {
        width: wp(200),
        borderBottomColor: colors.black,
        borderBottomWidth: wp(1),
    },
    lineMain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(70),
    },
    textMain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(70),
    },
    descripMain: {
        // position: 'absolute',
        // top: 0,
        marginTop: hp(10),
        // left:0,
        // right:0,
        // bottom:0,
        // marginBottom: hp(10)
    },
    titleMain: {
        marginTop: hp(10),
    },

    title: {
        fontSize: fp(48),
        fontFamily: Font.semiBold,
        color: colors.Secondary,
    },
    subtitle: {
        color: colors.lightgrey,
        fontFamily: Font.regular,
        fontSize: fp(20),
    },
    ContainerMain: {
        marginTop: hp(30),
        alignItems: 'center',
        justifyContent: 'center'
    },
    newTxt: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    signTxt: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.Secondary,
    },
});

export default styles;
