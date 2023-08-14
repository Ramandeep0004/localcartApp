import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.GreyL,
        paddingBottom: vp(20)
    },
    scroll: {
        flexGrow: 1,
    },
    edit: {
        fontSize: fp(16),
        color: colors.Secondary,
        fontFamily: Font.regular,
    },
    viewedit: {
        alignItems: 'flex-end',
        marginVertical: vp(12),
    },
    viewbonn: {
        maxHeight: hp(425)
    },
    item: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.regular,
        marginBottom: vp(5),
    },
    delivery: {
        fontSize: fp(13),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        textTransform: 'capitalize'
    },
    notes: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
        marginTop: vp(20),
    },
    bill: {
        marginHorizontal: vp(-20),
    },
    buttonstyle: {
        backgroundColor: colors.btngrey,
    },
    Title: {
        color: colors.black,
        fontSize: fp(16),
        fontFamily: Font.regular,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        marginTop: vp(20),
    },
    mainbtn: {
        flexDirection: 'row',
        marginTop: vp(20),
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
        width: '100%'
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
    buttonpay: {
        backgroundColor: colors.primary,
    },
    viewbtn: {
        marginTop: vp(20),
    },
    Container: {
        marginTop: vp(15),
        borderColor: colors.offgrey,
        borderRadius: hp(10),
        borderWidth: 1,
        paddingHorizontal: vp(20),
        paddingVertical: vp(20),
    },
    txt: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        lineHeight: hp(18)
    },
    subMain: {
        backgroundColor: colors.offpink,
        marginTop: vp(15),
        paddingHorizontal: vp(20),
        paddingVertical: vp(15),
        borderRadius: hp(6),
    },
    fusce: {
        fontSize: fp(13),
        color: colors.grey,
        fontFamily: Font.regular,
        lineHeight: hp(16),
    },
    notes22: {
        fontSize: fp(16),
        color: colors.Secondary,
        fontFamily: Font.semiBold,
        marginTop: vp(20),
    },
    bill22: {
        justifyContent: 'center',
        alignItems: 'flex-end'
        // marginHorizontal: vp(10),
    },
    viewpending: {
        // height: hp(23),
        marginLeft: hp(10),
        paddingVertical: vp(4),
        paddingHorizontal: hp(12),
        borderRadius: hp(20),
        backgroundColor: colors.Lgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewpending222: {
        // height: hp(23),
        marginLeft: hp(10),
        paddingVertical: vp(4),
        paddingHorizontal: hp(12),
        borderRadius: hp(20),
        backgroundColor: colors.offLgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewpending33: {
        // height: hp(23),
        marginLeft: hp(10),
        paddingVertical: vp(4),
        paddingHorizontal: hp(12),
        borderRadius: hp(20),
        backgroundColor: colors.lightred,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

