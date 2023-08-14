import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";

const styles = StyleSheet.create({
  modalContainer: {
    // marginTop: hp(45),
    // marginHorizontal:hzp(24),
    borderRadius: hp(12),
    backgroundColor: colors.white,
    padding: wp(22)
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  head_img: {
    backgroundColor: colors.Secondaryrgba,
    width: wp(120),
    height: wp(120),
    borderRadius: wp(60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  imng_area: {
    width: wp(70),
    height: wp(70),
  },
  titletxt: {
    textAlign: 'center',
    fontFamily: Font.bold,
    fontSize: fp(24),
    color: colors.darkblack
  },
  titleconent: {
    textAlign: 'center',
    fontFamily: Font.medium,
    fontSize: fp(16),
    color: colors.darkgrey
  },
  viewmain: {
    flexDirection: 'row',
    marginBottom : hp(30)
  },
  vone: {
    flex: .9,
    justifyContent: 'center',
  },
  vtwo: {
    flex: .1,
  },
  comment: {
    fontSize: fp(22),
    color: colors.black,
    fontFamily: Font.regular,
  },
  viewicon: {
    height: hp(30),
    width: hp(30),
    borderRadius: hp(20),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub: {
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.lightgrey,
    paddingTop: hp(15)
  },
  Sub: {
    fontSize: fp(18),
    fontFamily: Font.medium,
    color: colors.lightgrey,
    paddingTop: hp(15)
  },
  mobilenumber: {
    paddingTop: hp(60)
  },
  otpcontainer: {
    marginVertical: hp(50),
    justifyContent: 'center',
    // marginHorizontal: hzp(55),
    // flex: 1,
    backgroundColor: 'red'
  },
  Otp: {
    fontSize: fp(16),
    color: colors.lightgrey,
    fontFamily: Font.regular,
  },

  inputContainer: {
    height: fp(62),
    width: fp(45),
    paddingHorizontal: fp(0),
    fontSize: fp(50),
    borderRadius: wp(12),
    backgroundColor: colors.Secondaryrgba,
    borderWidth: wp(1),
    borderColor: colors.primary,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: vp(6),
  },
  head: {
    marginBottom: hp(50),
    alignSelf: 'center',
  },
  recive: {
    fontSize: fp(18),
    color: colors.lightgrey,
    fontFamily: Font.regular,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  didt: {
    marginTop: hp(70),
    marginBottom: hp(10)
  },
  resend: {
    color: colors.primary,
  },
  process_end: {
    height: '100%',
    width: '100%',
    // backgroundColor:'red'
  },
  errorStyle: {
    color: colors.red,
    marginHorizontal: fp(12),
    fontFamily: Font.regular,
    fontSize: fp(16),
    textAlign: 'center',
    marginTop: hp(60)
  },
  process: {
    // paddingTop: hp(20),
    // position: 'absolute',
    // bottom: hp(18),
    // left: 0,
    // right: 0,
    width: '100%',
    marginHorizontal: hzp(15)
  },
  buttonstyle: {
    backgroundColor: colors.primary
  }
});

export default styles;