import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../../../assets/global_style/fontsize';

export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.white,
    },
    imageMain: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(250),
        overflow: 'hidden',
    },
    shop: {
        fontSize: fp(46),
        fontFamily: Font.semiBold,
        color: colors.Secondary,
    },
    viewtext: {
        marginTop: vp(-145),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    Mainimage: {
        height: hp(120),
        width: hp(120),
        borderRadius: hp(60),
        overflow: 'hidden',
    },
    edit: {
        fontSize: fp(16),
        color: colors.Secondary,
        fontFamily: Font.regular,
    },
    viewedit: {
        // alignItems: 'flex-end',
        // marginVertical: vp(10),
        marginTop : hp(15),
        justifyContent : 'center',
        alignItems : 'center'
    },
    mainsub: {
        alignItems: 'center',
        marginTop: vp(60),
    },
    viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        overflow: 'hidden',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: vp(135)
    },
    subCon: {
        backgroundColor: colors.white,
        borderRadius: hp(10),
        paddingHorizontal: vp(20),
        paddingVertical: vp(20),
        marginTop: vp(30),
        shadowColor: colors.lightgrey,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.regular,
    },
    textline: {
        flex: 1,
        paddingLeft: vp(18),
    },
    viewIcon: {
        // backgroundColor: 'red',
        width: hp(22),
    },
    Name: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        marginTop: vp(10),
        textTransform : 'capitalize'
    },
    email : {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        marginTop: vp(10),
    },
    submain: {
        marginTop: vp(20),
    },
    viewimage: {
        width: hp(20),
        height: hp(20),

    },
    image: {
        height: '100%',
        width: '100%',
    },
    imgMain: {
        height: hp(120),
        width: hp(120),
        borderRadius: hp(60),
        overflow: 'hidden',
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(128),
        width: hp(128),
        borderRadius: hp(64),
        backgroundColor: colors.lightred,
    },
    ImageContainer: {
        marginTop: hp(30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    cirContainer2: {
        position: 'absolute',
        right: wp(124),
        bottom: 0,
        bottom: hp(5),
    },
    circleMain2: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
