import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import {fp, hp, vp, wp} from '../../../assets/global_style/fontsize';

export const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor:colors.GreyL
  },
  scroll: {
   paddingBottom: vp(20),
  },
  container:{
    backgroundColor:'transparent',
    height: hp(60),
    borderColor: colors.inputbordercol,
    borderRadius: hp(40),
    color: colors.black,
    borderWidth: hp(1),
    zIndex: 99,
    fontFamily: Font.regular,
    fontWeight: '200',
    fontStyle: 'normal',
    fontSize: fp(17),
    paddingLeft: wp(29),
    paddingRight: wp(15),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imgMain: {
    height: hp(120),
    width: hp(120),
    borderRadius: hp(60),
    overflow: 'hidden',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(128),
    width: hp(128),
    borderRadius: hp(64),
    backgroundColor: colors.lightred,
  },
  ImageContainer: {
    marginTop: hp(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputMain: {
    marginTop: hp(40),
  },
  buttonMain: {
    marginTop: hp(30),
    width: '100%',
  },
  button: {
    backgroundColor: colors.primary,
  },
  cirContainer2: {
    position: 'absolute',
    right: wp(124),
    bottom: 0,
    bottom:hp(5),
},
circleMain2: {
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
},
changeNumber : {
  fontSize: fp(16),
  fontFamily: Font.regular,
  color: colors.black,
},
});
