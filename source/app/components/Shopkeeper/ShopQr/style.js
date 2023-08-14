import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.background,
    },
    viewwhite: {
        height: hp(90),
        backgroundColor: colors.white,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(116),
        width: hp(116),
        overflow: 'hidden',
        borderRadius: hp(58),
    },
    viewimage: {
        alignItems: 'center',
        marginTop: vp(25),
    },
    viewImage: {
        height: hp(50),
        width: hp(50),
        borderRadius: hp(25),
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.white,
        position: 'absolute',
        bottom: -5,
        right: 115,
    },
    bablu: {
        fontSize: fp(24),
        fontFamily: Font.semiBold,
        color: colors.black,
        textAlign: 'center',
        marginTop: vp(20),
    },
    pandit: {
        fontSize: fp(16),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        textAlign: 'center',
        marginTop: vp(4)
    },
    Mainimage: {
        height: hp(260),
        width: hp(260),
        overflow: 'hidden',
    },
    Mainview: {
        backgroundColor: colors.white,
        marginTop: vp(45),
        alignItems: 'center',
        paddingTop: vp(20),
        paddingBottom: vp(30),
        borderRadius: hp(10),
    },
    scan: {
        fontSize: fp(20),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textAlign: 'center',
    },
    buttonstyle: {
        backgroundColor: colors.primary,
    },
    viewbutton: {
        marginHorizontal: vp(20),
        position: 'absolute',
        bottom: 20,
    },
});

