import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp } from '../../../assets/global_style/fontsize';

const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.background,
    },
    subMain: {
        flex: 1,
    },
    viewinput: {
        marginTop: vp(12),
        width: '100%',
        paddingHorizontal: vp(20),
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 99,
    },
    viewcate: {
        // flexGrow: 1,
        // paddingBottom: vp(200),
    },
    inputcontainer: {
        backgroundColor: colors.white,
    },
    input: {
        marginTop: vp(8),
        // backgroundColor: 'red'
    },
    error: {
        margin: hp(0),
        padding: hp(0),
    },
    subContainer: {
        // backgroundColor: colors.red,
        width: Dimensions.get('window').width / 4 - 20,
        marginRight: 13.3,
        marginBottom: vp(17),
        borderRadius: vp(5),
        overflow: 'hidden'
    },
    mainImage: {
        height: hp(86),
        width: hp(86),
        borderRadius: vp(10),
        overflow: 'hidden',
    },
    veg: {
        fontSize: fp(13),
        color: colors.grey,
        fontFamily: Font.regular,
        paddingHorizontal: vp(6),
        textAlign: 'center',
        paddingTop: vp(5),
        textTransform : 'capitalize'
    },
    flat: {
        flexGrow: 1,
        marginTop: vp(100),
        paddingBottom: vp(160),
        // height:'100%'
    },
    image: {
        height: '100%',
        width: '100%',
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(140),
    },
    met: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: hp(90),
        zIndex: 999999
    },
    viewbrowse: {
        flexDirection: 'row',
        // backgroundColor: colors.Secondary,
        // borderRadius: hp(25),
        justifyContent: 'center',
        alignSelf: 'center',
        width: hp(182),
        marginBottom: hp(20)
        // paddingVertical: vp(14),
        // paddingHorizontal: vp(14),
    },
    mainview: {
        backgroundColor: colors.white,
        marginHorizontal: vp(-20),
    },
    viewmain22: {
        backgroundColor: colors.primary,
        marginVertical: vp(18),
        marginHorizontal: vp(20),
        borderRadius: hp(10),
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: vp(15),
        paddingVertical: vp(15),
        marginBottom: hp(30)
    },
    viewone: {
        flex: .50,
        // backgroundColor: 'red',
        justifyContent: 'center',
    },
    item: {
        fontSize: fp(16),
        color: colors.white,
        fontFamily: Font.regular,
    },
    viewtwo: {
        flex: .20,
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: hp(5)
    },
    num: {
        fontSize: fp(18),
        color: colors.white,
        fontFamily: Font.semiBold,
    },
    viewthree: {
        flex: .3,
        // backgroundColor: 'red',
        justifyContent: 'center',
    },
    viewcart: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: hp(25),
        paddingVertical: vp(10),
        paddingHorizontal: vp(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
    cart: {
        fontSize: fp(16),
        color: colors.white,
    },
    scroll22: {
        paddingTop: hp(100),
        paddingBottom: hp(175),
    },
});

export default styles;
