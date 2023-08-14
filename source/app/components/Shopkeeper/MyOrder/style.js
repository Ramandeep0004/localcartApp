import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.white,
    },
    viewfilter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: vp(10),
    },
    filter: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.regular,
        paddingRight: vp(8),
        textTransform:'capitalize'
    },
    vieworder: {
        paddingBottom: vp(85),
    },
    nodata:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(250),
    }
});

