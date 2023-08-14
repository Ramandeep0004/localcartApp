import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.GreyL,
    },
    delivery: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    viewdelivery: {
        backgroundColor: colors.white,
        paddingHorizontal: vp(20),
        paddingTop: vp(20),
    },
    mainview: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.offgrey,
        marginTop: vp(15),
        borderTopRightRadius: hp(10),
        borderTopLeftRadius: hp(10),
        paddingLeft: vp(20),
        paddingRight: vp(18),
        paddingVertical: vp(18),
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainone: {
        flex: .85,
    },
    maintwo: {
        flex: .15,
    },
    textline: {
        fontSize: fp(15),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textTransform: 'capitalize'
    },
    icon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.greyy,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon2: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.Secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewbonn: {
        marginTop: vp(10),
        maxHeight: hp(425),
    },
    viewbonn22: {
        marginTop: vp(40),
    },
    viewinfo: {
        marginTop: vp(20),
    },
    checkcon: {
        margin: 0,
        padding: 0,
        backgroundColor: colors.GreyL,
    },
    submain: {
        // flex: 1,
        flexDirection: 'row',
        marginTop: vp(15),
        marginBottom: vp(30),
    },
    buttonMain: {
        // marginTop: hp(20)
    },
    inputCon: {
        paddingLeft: wp(18),
        paddingRight: wp(10),
    },
    line: {
        height: hp(1),
        width: '100%',
        backgroundColor: colors.inputbordercol,
    },
    scroll: {
        flexGrow: 1,
    },
    error: {
        margin: 0,
        padding: 0,
    },
    mainnote: {
        flexDirection: 'row',
        marginTop: vp(18),
    },
    noteone: {
        flex: .89,
        justifyContent: 'center'
    },
    notetwo: {
        flex: .11,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
    },
    note: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    viewbill: {
        marginHorizontal: vp(-20),
        paddingBottom: vp(20),
        marginTop: vp(10),
    },
    mainbutton: {
        flexDirection: 'row',
        marginTop: vp(5),
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
    btnonestyle: {
        backgroundColor: colors.greyy,
    },
    btntwostyle: {
        backgroundColor: colors.primary,
    },
    titlebtn: {
        color: colors.black,
        fontSize: fp(16),
        fontFamily: Font.regular,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginTop: vp(20),
    },
    Icon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.Secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorStyle: {
        color: colors.Secondary,
        marginLeft: fp(5),
        marginTop: hp(-20),
        fontFamily: Font.regular,
        fontSize: fp(14),
        marginBottom: hp(10),
    },
    scrollContainer: {
        paddingBottom: hp(30)
    },
    AddressMain: {
        marginTop: hp(16),
    },
    viewgrey: {
        backgroundColor: colors.background,
        paddingVertical: vp(18),
        paddingHorizontal: vp(20),
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.offgrey,
        borderBottomRightRadius: hp(10),
        borderBottomLeftRadius: hp(10),
    },
    viewgrey22: {
        backgroundColor: colors.background,
        paddingVertical: vp(18),
        paddingHorizontal: vp(20),
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.offgrey,
        borderRadius: hp(10),
        marginTop: vp(15),
    },
    Viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: hp(12)
    },
    Viewicon2: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: hp(12)
    },
    image: {
        height: '100%',
        width: '100%',
    },
    MainImage: {
        height: hp(50),
        width: hp(50),
        borderRadius: hp(25),
        borderColor:'red',
        overflow: 'hidden',
        // justifyContent:'center',
        // alignSelf:'flex-start'
    },
    MainView: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: vp(15)
    },
    Vone: {
        flex: .85,
        // backgroundColor: 'green',
    },
    Vtwo: {
        flex: .15,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    bablu: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    nodelivery: {
        backgroundColor: colors.offpink,
        marginVertical: vp(15),
        paddingHorizontal: vp(20),
        paddingVertical: vp(15),
        borderRadius: hp(6),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    fusce: {
        fontSize: fp(15),
        color: colors.grey,
        fontFamily: Font.regular,
        lineHeight: hp(16),
    },
    fusce22: {
        fontSize: fp(15),
        color: colors.red,
        fontFamily: Font.regular,
        lineHeight: hp(16),
    },
    submainImage: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.inputbordercol,
        backgroundColor: colors.offgrey,
        borderRadius: hp(30),
        height: hp(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vp(15),
    },
    precautionItem: {
        // flex: 1,
        flexDirection: 'row',
        marginTop: vp(15),
        // marginBottom: vp(10),
    },
    upload: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        paddingLeft: vp(10),
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
    Con: {
        backgroundColor: colors.white,
        paddingHorizontal: vp(15),
        paddingVertical: vp(15),
        borderRadius: hp(10),
        marginTop: vp(15),
    },
    img: {
        fontSize: fp(15),
        fontFamily: Font.regular,
        color: colors.black,
        paddingLeft: hzp(6)
    },
    circle: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.offgrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewcircle: {
        alignItems: 'flex-end',
        // marginRight: vp(-5)
    },
    arnav: {
        fontSize: fp(16),
        color: colors.grey,
        fontFamily: Font.medium,
        paddingTop: vp(4),
        textTransform: "capitalize",
    },
    tooltipText: {
        fontSize: fp(15),
        color: colors.black,
        fontFamily: Font.regular,
    },
    tooltipMain : {
        borderRadius : hp(10),
        backgroundColor : colors.lightprimary
    }
});

