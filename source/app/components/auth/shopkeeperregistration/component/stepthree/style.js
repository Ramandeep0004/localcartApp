import {StyleSheet} from 'react-native';
import { colors } from '../../../../../assets/global_style/colors';
import { Font } from '../../../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../../../assets/global_style/fontsize';


const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor:colors.white
  },
  sliderMain: {
    marginTop: hp(42),
  },
  sliderContainer: {
    flexDirection: 'row',
  },
  cirMain1: {
    flex: 0.2,
  },
  cirMain2: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cirMain3: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 0.2,
  },
  ring: {
    height: hp(24),
    width: hp(24),
    borderRadius: hp(12),
    borderWidth: hp(1.6),
    borderColor: colors.Secondary,
  },
  ring1: {
    height: hp(24),
    width: hp(24),
    borderRadius: hp(12),
    borderWidth: hp(1.6),
    borderColor: colors.inputbordercol,
  },
  line: {
    marginVertical: vp(8),
    marginLeft: wp(20),
    width: wp(150),
    borderWidth: hp(1.54),
    borderColor: colors.inputbordercol,
  },
  headingMain:{
    marginTop:hp(40),

  },
  heading:{
    fontSize:fp(48),
    fontFamily:Font.semiBold,
    color:colors.Secondary,
  },
  cirContainer: {
    marginTop: hp(44),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circlMain: {
    height: hp(180),
    width: hp(180),
    borderRadius: hp(90),
    backgroundColor: colors.greyy,
    overflow: 'hidden',
  },
  userimageLogo: {
    height: '100%',
    width: '100%',
  },
  cirContainer2: {
    position: 'absolute',
    right: wp(110),
    top: hp(135),
    bottom: 0,
  },
  circleMain2: {
    height: hp(44),
    width: hp(44),
    borderRadius: hp(22),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    height: hp(60),
    borderColor: colors.inputbordercol,
    borderRadius: hp(40),
    borderWidth: hp(1),
  },
  inputMain: {
    marginTop: hp(10),
  },
  scrollMain:{
  paddingBottom:hp(20)
  },
  button2:{
    backgroundColor:colors.primary
  },
  button1:{
    backgroundColor:colors.greyy,
  },
  btntitle:{
    color:colors.black,
  },
  buttonMain:{
    marginTop:hp(30),
   // position:'absolute',
   // bottom:0
  //  top:0,
  //   left:0,
  //   right:0,
    //width:'100%',
    // marginBottom:hp(30)
  },
});

export default styles;
