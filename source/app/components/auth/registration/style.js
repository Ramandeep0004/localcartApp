import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../assets/global_style/fontsize';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.white,
    },
    imageMain: {
        height: "100%",
        width: "101%",
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imgcontainer: {
        height: hp(175),
        width: wp(180),
    },
    logoMain: {
        marginTop: hp(30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleMain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(200),
    },
    title: {
        fontSize: fp(23),
        fontFamily: Font.regular,
        color: colors.darkblack,
    },
    button1: {
        backgroundColor: colors.primary,
    },
    buttonMain1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(50),
    },
    button2: {
        backgroundColor: colors.offgrey,
    },
    buttonMain2: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(20),
    },
    btntitle2: {
        color: colors.darkblack,
    },
    titleMain: {
        marginTop: hp(30),
    },

    title: {
        fontSize: fp(48),
        fontFamily: Font.semiBold,
        color: colors.Secondary,
    },

});

export default styles;
