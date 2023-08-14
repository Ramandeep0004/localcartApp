import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.black,
    },
    viewtext: {
        // height: hp(100),
        flexDirection: 'row',
        // backgroundColor: 'red'
    },
    text: {
        fontSize: fp(22),
        fontFamily: Font.semiBold,
        color: colors.white,
        paddingLeft: vp(60)
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(528),
        width: '100%',
    },
    viewimage: {
        // justifyContent: 'center',
        // alignItems: 'center'
        marginTop: vp(130)
    },
});

