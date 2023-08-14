import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, vp } from "../../../assets/global_style/fontsize";




export const styles = StyleSheet.create({
    scroll: {
        paddingBottom:hp(20),
    },
    main: {
        flex: 1,
        backgroundColor: colors.GreyL,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(165),
        width: hp(165),
    },
    viewimage: {
        alignItems: 'center',
        marginVertical: vp(20),
    },
    text: {
        fontSize: fp(14.5),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        marginTop: vp(12)
    },
    Text: {
        fontSize: fp(15),
        fontFamily: Font.medium,
        color: colors.black,
    },
    history: {
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.black,
        marginTop: vp(10),
    },
    region: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        // backgroundColor: 'green',

    },
    icon: {
        // paddingBottom: vp(),
        // backgroundColor: 'red',
        marginTop: vp(-2)
    },
    flat: {
        // backgroundColor: 'red',
        marginTop: vp(12),
        paddingBottom: vp(15)
    },
    containerMain:{
        marginTop:hp(20),
    },
});
export default styles;