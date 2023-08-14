import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        // flex: 1,
        backgroundColor: colors.background,
    },
    viewinput: {
        marginTop: vp(60),
    },
    buttonstyle: {
        backgroundColor: colors.primary,
    },
    viewbutton: {
        position: 'absolute',
        bottom: 0,
        marginHorizontal: vp(20),
        marginBottom: hp(20),
    },
});

