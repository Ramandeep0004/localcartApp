import { StyleSheet } from "react-native";
import { hp, vp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
    },
    scroll: {
        paddingTop: hp(20),
        // paddingBottom: vp(20),
    },
    flat: {
        // marginTop: vp(15),
        // paddingBottom: vp(20),
    },
    nodata: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(230),
    }
});

