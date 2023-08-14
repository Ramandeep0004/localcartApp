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
    scroll: {
        flexGrow: 1,
    },
    item: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.black,
        marginBottom: vp(5)
    },
    viewbonn: {
        maxHeight: hp(425)
    },
    delivery: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
        marginTop: vp(10),
    },
    notes: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
        marginTop: vp(20),
    },
    mainbtn: {
        flexDirection: 'row',
        marginHorizontal: vp(20),
        marginTop: vp(20),
        marginBottom: vp(20),
    },
    btnone: {
        flex: .5,
        marginRight: vp(8),
    },
    btntwo: {
        flex: .5,
        marginLeft: vp(8),
    },
    buttonone: {
        backgroundColor: colors.btngrey,
    },
    title: {
        color: colors.black,
        fontSize: fp(16),
        fontFamily: Font.regular,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttontwo: {
        backgroundColor: colors.primary,
    },
    Item: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    Item22: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.Secondary,
    },
    list: {
        fontSize: fp(13),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        paddingTop: vp(5),
    },
    btmmain: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: vp(20),
        // marginTop: vp(20),
        marginBottom: vp(20),
    },
    MainBtn: {
        marginHorizontal: vp(20),
        // marginTop: vp(20),
        marginBottom: vp(20),
        // backgroundColor: 'red',
    },
    viewitem: {
        marginHorizontal: vp(20),
        marginTop: vp(20),
    },
    print: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
        marginTop: vp(20),
    },
    Shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    subimage: {
        height: hp(150),
        width: hp(150),
        overflow: 'hidden',
    },
    mainimage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(10)
    },
    container: {
        minHeight: vp(60),
    },
    inputMain: {
        height: hp(20),
        borderRadius: hp(20),
    },
    viewinput: {
        marginTop: vp(10)
    },
    inputTxt: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.regular,
    },
    inputCon: {
        backgroundColor: colors.white,
    },
});

