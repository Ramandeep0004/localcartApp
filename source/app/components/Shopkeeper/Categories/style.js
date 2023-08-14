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
    subMain: {
        flex: 1,
    },
    viewinput: {
        // marginTop: vp(20),
        marginTop: vp(12),
        width: '100%',
        paddingHorizontal: vp(20),
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 99,
    },
    viewcate: {
        flexGrow: 1,
        // paddingBottom: vp(200),
    },
    inputcontainer: {
        backgroundColor: colors.white,
        
    },
    input: {
        marginTop: vp(8),
        // backgroundColor: 'red'
    },
    error: {
        margin: hp(0),
        padding: hp(0),
    },
    subContainer: {
        // backgroundColor: colors.red,
        width: Dimensions.get('window').width / 4 - 20,
        marginRight: 13.3,
        marginBottom: vp(17),
        borderRadius: vp(5),
        overflow: 'hidden'
    },
    mainImage: {
        height: hp(86),
        width: hp(86),
        borderRadius: vp(10),
        overflow: 'hidden'
    },
    veg: {
        fontSize: fp(13),
        color: colors.grey,
        fontFamily: Font.regular,
        paddingHorizontal: vp(6),
        textAlign: 'center',
        paddingTop: vp(5),
    },
    flat: {
        flexGrow: 1,
        marginTop: vp(100),
        paddingBottom: vp(155),
        // height:'100%'
    },
    image: {
        height: '100%',
        width: '100%',
    },
    emptyContainer: {
        height: '100%',
        width: '100%',
        // marginTop: vp(15),
    },
    scroll22: {
        paddingTop: hp(100),
        paddingBottom: hp(170),
    },
});

