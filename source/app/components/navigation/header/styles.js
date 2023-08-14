import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, vp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        borderColor: colors.offblue,
        backgroundColor: colors.offblue,

    },
    container: {
        borderBottomWidth: 0,
        backgroundColor: colors.Secondary,
        paddingBottom: hp(22),
        paddingTop: hp(15),
        paddingHorizontal: vp(20),

    },
    title: {
        fontSize: fp(26),
        paddingTop: hp(10),
        color: colors.white,
        fontFamily: Font.semiBold,
        alignItems: 'center',
        justifyContent: 'center',
        textTransform : 'capitalize'
    },
    icon: {
        height: hp(50),
        width: hp(50),
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: Font.regular,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(54),
        width: hp(54),
        borderRadius: hp(27),
        overflow: 'hidden',
    },
});