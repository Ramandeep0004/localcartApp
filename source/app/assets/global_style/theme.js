import { colors } from './colors';
import { StyleSheet } from 'react-native';
import { createTheme } from '@rneui/themed';


import { fp, vp, hp, hzp, wp } from './fontsize';
import { Font } from './fontfamily';
export const Theme = createTheme({
    components: {

        Button: {
            type: 'solid',
            titleStyle: {
                color: colors.white,
                fontSize: fp(16),
                fontFamily: Font.regular,
                textAlign: 'center',
                alignItems: 'center',
                width: '100%',
            },
            buttonStyle: {
                borderRadius: wp(40),
                paddingVertical: vp(18),
                paddingHorizontal: hzp(18),
                // width:'100%',
            },
            containerStyle: {
                borderRadius: wp(40),
            },
        },
        Text: {
            h1Style: {
                fontFamily: Font.semiBold,
                fontSize: hp('3.5%'),
            },
            h2Style: {
                fontFamily: Font.semiBold,
                fontSize: hp('3%'),
            },
            h3Style: {
                fontFamily: Font.semiBold,
                fontSize: hp('2.5%'),
            },
            h4Style: {
                fontFamily: Font.semiBold,
                fontSize: hp('2%'),
            },

            color: colors.black,
            fontSize: hp('1.9%'),
            fontFamily: Font.regular,
        },
        Input: {
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: wp(6),
            paddingRight: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            marginVertical: 0,
            marginHorizontal: 0,
            labelStyle: {
                color: colors.black,
                fontFamily: Font.semiBold,
                fontSize: fp(16),
                fontWeight: 'normal',
            },
            placeholderTextColor: colors.lightgrey,
            containerStyle: {

                paddingRight: vp(0),
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,

                margin: 0,
                marginHorizontal: 0
            },
            inputContainerStyle: {
                height: hp(60),
                borderColor: colors.inputbordercol,
                borderRadius: hp(40),
                borderWidth: hp(1),
                fontFamily: Font.regular,
                // backgroundColor:colors.offwhite,

                marginLeft: hzp(0),
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: wp(20),
                paddingRight: wp(20),
                marginTop: 0,
                marginBottom: 0,
                marginRight: 0,
                paddingVertical: 0,
                paddingHorizontal: 0,
                marginVertical: 0,
                marginHorizontal: 0,
                width: '100%',
            },
            errorStyle: {
                color: colors.Secondary,
                fontFamily: Font.regular,
                fontSize: fp(14),
                margin: hp(5),
                padding: 0,
            },
            fontFamily: Font.regular,
            fontSize: fp(17),
        },
        CheckBox: {
            size: hp(25),
            titleProps: {
                style: {
                    fontFamily: Font.regular,
                    fontSize: fp(18),
                    paddingHorizontal: hzp(0),
                    color: colors.lightgrey,
                },
            },
            containerStyle: {
                backgroundColor: 'orange',
                borderWidth: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingVertical: 0,
                paddingHorizontal: 0,
                marginVertical: 0,
                marginHorizontal: 0,
                flex: 1,
            },
            inputContainerStyle: {
                backgroundColor: 'orange',
                borderWidth: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingVertical: 0,
                paddingHorizontal: 0,
                marginVertical: 0,
                marginHorizontal: 0,
                flex: 1,
            },
        },
    },
});
