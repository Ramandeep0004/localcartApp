import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";



const styles = StyleSheet.create({
    dropmain: {
        marginVertical: vp(0),
        marginHorizontal: hzp(0),
    },
    labelStyle: {
        color: colors.black,
        fontFamily: Font.medium,
        fontSize: fp(15),
        fontWeight: 'normal',
        marginHorizontal: fp(0),
    },
    container: {
        // paddingTop:hp(30),
        // padding: fp(0),
        // paddingTop: hp(0),
        //overflow: 'hidden',
        // backgroundColor: 'green'
    },
    itemContainer: {

        // backgroundColor:'red',
        //  marginTop: hp(-30),
        // backgroundColor:'red',
        // maxHeight: fp(200),
        borderColor: colors.black,
        //   borderBottomWidth: 0,
        //   borderLeftWidth: fp(1.5),
        //   borderRightWidth: fp(1.5),
        borderRadius: fp(15),
        borderTopLeftRadius: hp(8),
        borderTopRightRadius: hp(8),
        //paddingTop: hp(20),
        // paddingLeft: wp(20),
        // paddingRight: wp(20),
        // paddingBottom: wp(20),
        backgroundColor: colors.white,
        // overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 2,

        marginHorizontal: hzp(2),
        // marginVertical: vp(0),
        // marginBottom: hp(20),
        maxHeight: hp(240),
        borderBottomWidth: 1,
        borderBottomColor: colors.greyy,
        // paddingTop: hp(30),
    },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.greyy,
    },


    itemText: {
        fontFamily: Font.medium,
        fontSize: fp(14),
        color: colors.lightgrey,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyy,
        // marginBottom: vp(10),
        paddingBottom: vp(16),
        paddingHorizontal: vp(20),
    },
    itemDisableText: {
        fontFamily: Font.medium,
        fontSize: fp(14),
        color: colors.grey,
    },
    item: {
        // backgroundColor:'red',
        // marginBottom: fp(20),
        color: colors.black,
        // marginTop: hp(5),
        paddingTop: hp(5),
        paddingBottom: hp(5),
        paddingHorizontal: hzp(0),
        borderBottomWidth: fp(1),
        borderBottomColor: colors.white,
        borderRadius: hp(15),
        //   backgroundColor: colors.white,
        overflow: 'hidden',
    },
    placeholder: {
        color: colors.lightgrey,
        fontFamily: Font.regular,
        fontSize: fp(15),
    },
    inputContainerStyle: {
        // paddingRight:wp(20),
        height: hp(60),
        borderColor: colors.inputbordercol,
        borderRadius: hp(40),
        color: colors.black,
        borderWidth: hp(1),
        zIndex: 99,
        backgroundColor: colors.transparent,

        fontFamily: Font.regular,
        fontWeight: '200',
        fontStyle: 'normal',
        fontSize: fp(17),
        // borderColor: colors.border,
        // borderTopWidth: hp(0),
        // borderBottomWidth: hp(1.2),
        // borderLeftWidth: hp(0),
        // borderRightWidth: hp(0),
        // borderRadius: hp(0),
        // paddingHorizontal: hzp(0),
        // paddingRight: hzp(0),
        paddingLeft: wp(29),
        paddingRight: wp(15),
        marginBottom: hp(8),
        // paddingBottom:hp(7),
        // paddingVertical: Platform.OS === 'ios' ? vp(25) : vp(0),
        // marginTop: vp(8),
        // marginBottom:vp(0),
        // backgroundColor:'red'
    },
    errorStyle: {
        color: colors.Secondary,
        fontFamily: Font.regular,
        fontSize: fp(14),
        margin: hp(5),
        padding: 0,
    },
    space: {
        height: Platform.OS === 'ios' ? fp(10) : fp(18),
    },
    rightIcon: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? hp(55) : hp(10),
        right: hp(20),
        zIndex: -1,
        // backgroundColor: 'red',
    },
    leftIcon: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? hp(55) : hp(8),
        left: wp(6),
        zIndex: 100,
    },
});

export default styles;
