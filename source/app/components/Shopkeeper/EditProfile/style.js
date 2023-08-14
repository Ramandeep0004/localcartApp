import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.GreyL,
    },
    headtabs: {
        marginTop: hp(20),
        backgroundColor: colors.greyy,
        borderRadius: wp(30),
        padding: wp(5),
        marginBottom: hp(0),
        height: hp(60),
        borderWidth: 1,
        borderColor: colors.inputbordercol,
        justifyContent: 'center',
    },
    title2: {
        color: colors.lightgrey,
        fontSize: fp(16),
        fontFamily: Font.regular,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
    },
    onebtnhead2: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        // borderWidth: wp(1),
        borderRadius: wp(25),
        height: hp(50),
        paddingVertical: vp(10),
    },
    onebtnhead: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
        // borderWidth: wp(1),
        borderRadius: wp(25),
        height: hp(50),
        paddingVertical: vp(10),
    },
    title: {
        color: colors.white,
        fontSize: fp(16),
        fontFamily: Font.regular,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
    },
});

