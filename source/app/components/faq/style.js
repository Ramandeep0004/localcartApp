
import { StyleSheet } from "react-native";
import { colors } from "../../assets/global_style/colors";
import { Font } from "../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.GreyL,
        // flex: 1,
        height: '100%',
    },
    viewmain: {
        paddingBottom: hp(20),

    },
    inputBox: {
        marginTop: hp(30),
        padding: 0,
        lineHeight: 0,
        marginBottom: 0,
        //backgroundColor:'red',
        //height:'100%',

    },
    inputcontainer: {
        backgroundColor: colors.input,
        backgroundColor: colors.white,
        fontFamily: Font.bold
    },
    headerStyle: {
        marginTop: hp(10),
        borderRadius: hp(20),
        backgroundColor: colors.offgrey,
        marginBottom: hp(20),
        justifyContent: 'center',
        paddingVertical: hp(22),
        paddingRight: wp(20),
        overflow: 'hidden',
        marginHorizontal: hp(1)
    },

    headerText: {
        fontFamily: Font.semiBold,
        color: colors.black,
        fontSize: fp(18),
        paddingLeft: wp(24),
        paddingRight: wp(0),

    },
    bodyStyle: {
        marginHorizontal: hzp(1.5),
        backgroundColor: colors.white,
        marginTop: vp(-40),
        borderBottomLeftRadius: vp(20),
        borderBottomRightRadius: vp(20),
        marginBottom: hp(20)

    },
    bodyText: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        paddingHorizontal: vp(26),
        paddingBottom: hp(25),
        paddingTop: hp(15)
    },
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: vp(20),
        paddingVertical: vp(10),
    },
    text: {
        fontSize: fp(15),
        color: colors.black,
        fontFamily: Font.regular,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    MainContainer: {
        marginTop: vp(0),
        maxHeight: hp(220),
        borderRadius: hp(20),
        overflow: 'hidden',
    },
    subMain: {
        flex: 1,
    },
    seacrhs: {
        backgroundColor: colors.lightyellow,
        padding: wp(8),
        borderRadius: wp(6)
    },
    sdf: {
        //backgroundColor:'red',
        paddingLeft: wp(10),
        fontSize: fp(60),
        fontFamily: Font.bold
    },
});
