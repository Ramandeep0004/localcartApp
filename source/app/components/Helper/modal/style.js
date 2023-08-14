import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../assets/global_style/fontsize';

const styles = StyleSheet.create({
    modalContainer: {

        paddingVertical: vp(26),
        backgroundColor: colors.inputbg,
        borderRadius: hp(10),
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: '100%',
        width: '100%',
    },
    imgMain: {

        height: hp(70),
        width: wp(70),
    },
    iconMain: {
        position: 'absolute',
        bottom: 0,
        top: hp(20),
        left: 0,
        right: 0
    },
    verifiedMain: {
        marginTop: hp(26),
        alignItems: 'center',
        justifyContent: 'center'
    },
    verified: {
        fontSize: fp(26),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    descriptionMain: {
        marginTop: hp(14),
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        width: "80%",
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textAlign: 'center'
    },
    buttonstyle: {
        backgroundColor: colors.primary,
        height: hp(50),
        paddingVertical: vp(5)
    },
    button: {
        marginHorizontal: vp(20),
        marginTop: vp(20)
    },
});

export default styles;