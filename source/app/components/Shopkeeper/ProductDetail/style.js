import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.GreyL,
    },
    viewicon: {
        // backgroundColor: 'red',
        alignItems: 'flex-start',
        marginLeft: vp(-2),
        marginTop: vp(20),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(350),
        width: '90%',
        overflow: 'hidden',
    },
    viewimage: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: vp(100),
    },
    Mainimage: {
        height: hp(150),
        width: hp(150),
        overflow: 'hidden',
        borderRadius: vp(5),
        borderWidth: 1,
        borderColor: colors.primary,
    },
    Viewimage: {
        marginRight: vp(15),
    },
    scroll: {
        marginRight: vp(-10),
        marginTop: vp(20),
    },
});

