import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.background,
    },
    viewfilter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: hp(15),
    },
    filter: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.regular,
        paddingRight: vp(8),
        textTransform : 'capitalize'
    },
    filter2 : {
        fontSize: fp(18),
        color: colors.green,
        fontFamily: Font.regular,
        paddingRight: vp(8),
        textTransform : 'capitalize'
    },
    viewitem: {
        paddingBottom: vp(90),
    },
    flat: {
        flexGrow : 1,
        // marginTop: vp(15),
        paddingBottom: vp(10),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(250),
    }
});

