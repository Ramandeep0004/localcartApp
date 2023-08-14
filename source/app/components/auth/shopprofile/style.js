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
    shop2 : {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    viewtext: {
        marginTop: vp(-145),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    iconMain : {
        justifyContent : "flex-start"
    },
    ToggleSwitch : {
        // justifyContent: "flex-end"
    },
    IconName  : {
        justifyContent : "flex-start"
    },
    Mainimage: {
        height: hp(120),
        width: hp(120),
        borderRadius: hp(60),
        overflow: 'hidden',
    },
    mainName : {
      flexDirection : 'row'
    },
    mainsub: {
        alignItems: 'center',
    },
    Viewmain: {
        // paddingHorizontal: vp(20),
        backgroundColor: colors.white,
        paddingVertical: vp(20),
    },
    Vone: {
        // flex: .55,
        justifyContent : 'flex-end'
    },
    Vtwo: {
        // flex: .15,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
        justifyContent : 'flex-end',
        marginTop : hp(10)
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
        paddingVertical: vp(10),
        marginTop: vp(35),
        shadowColor: colors.lightgrey,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.62,
        elevation: 3

    },
    name: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        marginTop: vp(-2),
    },
    textline: {
        flex: 1,
        paddingLeft: vp(18),
    },
    textline2: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingRight: vp(10),
    },
    viewIcon: {
        // backgroundColor: 'red',
        width: hp(22),
    },
    Name: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        lineHeight: hp(25),
        textTransform:'capitalize'
    },
    email : {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        lineHeight: hp(25),
    },
    submain: {
        marginTop: vp(20),
    },
    scroll: {
        flexGrow: 1,
        paddingBottom: vp(70),
    },
    viewimage: {
        width: hp(18),
        height: hp(17),
        marginTop: hp(1),
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
    description: {
        marginTop: hp(10),
        fontSize: fp(15),
        fontFamily: Font.regular,
        color: colors.black,
        textTransform: 'capitalize',
    },
    category: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        marginTop: vp(-2),
    },
    viewText: {
        flex: 1,
        paddingLeft: vp(18),
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        alignItems: 'center',
    },
    subMain: {
        marginTop: vp(20),
    },
    textLine: {
        flexWrap: 'wrap',
        paddingRight: vp(10),
        flex: 1,
        paddingLeft: vp(38),
    },
    viewarrow: {
        // backgroundColor: 'red',
        width: wp(20),
        alignItems: 'flex-end',
        marginTop: vp(-4),
    },
    edit: {
        fontSize: fp(16),
        color: colors.Secondary,
        fontFamily: Font.medium,
    },
    viewedit: {
        // alignItems: 'flex-end',
        // marginVertical: vp(10),
        marginTop : hp(30),
        justifyContent : 'center',
        alignItems : 'center'
    },
});
