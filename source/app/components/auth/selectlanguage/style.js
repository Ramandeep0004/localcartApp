import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/global_style/colors';
import {Font} from '../../../assets/global_style/fontfamily';
import {fp, hp, hzp, vp, wp} from '../../../assets/global_style/fontsize';

export const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: colors.white,
  },
  imageMain: {
    height: '100%',
    width: '100%',
  },
  linearGradient: {
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
    width: wp(130),
    height: hp(190),
  },
  imgFirst: {
    width: wp(130),
    height: hp(190),
    alignItems: 'center',
  },
  imgSecond: {
    width: wp(91),
    height: hp(96),
    position: 'absolute',
    bottom: 20,
    left: 17,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  txt: {
    paddingTop: hp(30),
    paddingBottom: hp(50),
    fontSize: fp(40),
    fontWeight: '500',
    color: colors.primary,
    textAlign: 'center',
  },
  checkStyle1: {
    flexDirection: 'row',
    marginTop: hp(60),
  },
  checkStyle2: {
    flexDirection: 'row',
    marginTop: hp(30),
  },
  chkbox1: {
    flex: 0.5,

    marginHorizontal: wp(10),
    paddingVertical: vp(20),
    backgroundColor: colors.lightpink,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(40),
    borderColor: colors.primary,
  },

  txt1: {
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.lightgrey,
  },
  txt3:{
    fontSize: fp(18),
    fontFamily: Font.semiBold,
    color: colors.black,
  },
  chkbox2: {
    flex: 0.5,
    marginHorizontal: wp(10),
    backgroundColor: colors.greyy,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(40),
    paddingVertical: vp(20),
  },
  txt2: {
    fontSize: fp(18),
    fontFamily: Font.regular,

    color: colors.lightgrey,
  },

  txt3: {
    fontSize: fp(18),
    fontFamily: Font.semiBold,
    color: colors.black,
  },
  chkbox4: {
    flex: 0.5,
    marginLeft: hp(10),
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: hp(30),
    paddingBottom: hp(30),
    borderRadius: 20,
    marginTop: hp(15),
  },
  txt4: {
    fontSize: fp(16),
    fontWeight: '400',
    color: colors.grey,
  },
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: hp(60),
    width: '100%',
  },
  btnTitle: {
    fontSize: fp(16),
    color: colors.white,
    fontWeight: '400',
    lineHeight: 15,
  },
  btnStyle: {
    backgroundColor: colors.primary,
  },
  mainview: {
    alignItems: 'center',
  },
  titleMain: {
    marginTop: hp(10),
  },

  title: {
    fontSize: fp(48),
    fontFamily: Font.semiBold,
    color: colors.Secondary,
  },
  logoMain: {
    marginTop: hp(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgcontainer: {
    height: hp(100),
    width: wp(170),
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
