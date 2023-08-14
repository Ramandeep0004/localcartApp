import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, hzp, vp } from '../../../assets/global_style/fontsize';

export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.GreyL,
        // paddingBottom : hp(70)
    },
    inputMain: {
        marginTop: hp(24),
    },
    ContainerList: {
        marginVertical: vp(15),
    },
    viewflat: {
        marginTop: hp(10)
    },
    viewcate: {
        // flexGrow:1,
    },
    detailContainer: {
        flexDirection: 'row',
    },
    iconMain1: {
        flex: 0.7,
    },
    iconMain2: {
        flex: 0.3,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    searchMain: {
        marginTop: hp(20),
    },
    searchBody: {
        flexGrow: 1,
        marginTop: vp(110),
    },
    trendingTxt: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
    },
    trendingMain: {
        marginTop: hp(15),
    },
    searchproductlistMain: {
        marginTop: hp(20),
    },
    searchlistMain1: {
        marginTop: hp(10),
    },
    serachHeading: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    SerchheadingMain: {
        marginTop: hp(20),
    },
    inputCon: {
        backgroundColor: colors.white,
    },
    viewinput: {
        backgroundColor: colors.white,
        // marginHorizontal: vp(-20),
        paddingHorizontal: vp(20),
        paddingTop: vp(20),
        width: '100%',
        paddingHorizontal: vp(20),
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 99,

    },
    viewtrend: {
        paddingRight: vp(-20),
    },
    mainImage: {
        height: hp(120),
        width: hp(120),
        borderRadius: vp(10),
        overflow: 'hidden'
    },
    veg: {
        fontSize: fp(13),
        color: colors.grey,
        fontFamily: Font.regular,
        paddingHorizontal: vp(6),
        textAlign: 'center',
        paddingTop: vp(5),
    },
    flat: {
        //  flexGrow:1,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    categoryMain: {
        marginRight: hp(10)
    },
    categoryName: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
    },
    cateTarget: {
        marginTop: hp(10),
        marginBottom: hp(20)
    },
    emptyContainer: {
        height: '100%',
        width: '100%',
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginTop: hp(100),
    },
    viewrecord: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
});
