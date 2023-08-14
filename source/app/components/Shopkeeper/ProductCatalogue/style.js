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
    subMain: {
        flex: 1,
    },
    viewinput: {
        marginTop: vp(15),
        width: '100%',
        paddingHorizontal: vp(20),
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 99,
    },
    viewcate: {
        paddingBottom: vp(100),
    },
    input: {
        marginTop: vp(8),
        // backgroundColor: 'red'
    },
    inputcontainer: {
        backgroundColor: colors.white,
    },
    subContainer: {
        // backgroundColor: colors.red,
        width: Dimensions.get('window').width / 4 - 20,
        //    marginRight: vp(15),
        // marginBottom: vp(17),
        // overflow: 'hidden',
        marginRight: 13.3,
        backgroundColor: 'green'
    },
    mainImage: {
        width: hp(86),
        height: hp(86),
        borderRadius: hp(10),
        overflow: 'hidden',
    },
    veg: {
        fontSize: fp(13),
        color: colors.grey,
        fontFamily: Font.regular,
        paddingHorizontal: vp(6),
        textAlign: 'center',
        paddingTop: vp(5),
        textTransform: 'capitalize',
    },
    flat: {
        // flexGrow:1,
        marginTop: vp(100),
        marginBottom: vp(10),
        // height:'100%'
    },
    image: {
        height: '100%',
        width: '100%',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(180),
    }
});

