import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.GreyL,
        // position : 'relative',
        // zIndex : -1
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
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
    viewimage: {
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
        marginRight: vp(138)
    },
    viewmain: {
        flexDirection: 'row',
        marginTop: vp(40),
    },
    viewone: {
        flex: .5,
        marginRight: vp(8),
    },
    viewtwo: {
        flex: .5,
        marginLeft: vp(8),
    },
    mainview: {
        flexDirection: 'row',
    },
    changeNumber: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    container: {
        backgroundColor: 'transparent',
        height: hp(60),
        borderColor: colors.inputbordercol,
        borderRadius: hp(40),
        color: colors.black,
        borderWidth: hp(1),
        zIndex: 99,
        fontFamily: Font.regular,
        fontWeight: '200',
        fontStyle: 'normal',
        fontSize: fp(17),
        paddingLeft: wp(29),
        paddingRight: wp(15),
        // marginBottom: hp(8),
    },
    bank: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.black,
    },
    buttonstyle: {
        backgroundColor: colors.primary,
    },
    input: {
        marginTop: vp(20),
    },
    viewbutton: {
        marginTop: vp(20),
    },
});

