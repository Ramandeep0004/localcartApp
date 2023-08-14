import {StyleSheet} from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, hzp, wp } from '../../../assets/global_style/fontsize';



const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor:colors.white,
  },
  imageMain:{
    height:"100%",
    width:"100%",
  },
  heading: {
    fontSize: fp(48),
    fontFamily: Font.semiBold,
    color: colors.Secondary,
  },
  headingMain: {
    marginTop:hp(10),
    width: '60%',
  },
  subheadingMain: {
    marginTop: hp(16),
  },
  subHeading: {
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.lightgrey,
    lineHeight:hp(25),
  },
  inputContainer:{
    borderColor:colors.inputbordercol,
    borderRadius:hp(40),
    borderWidth:hp(1),
  },
  
  inputMain:{
    marginTop:hp(42)
  },
  button:{
    backgroundColor:colors.primary
  },
  btnMain:{
    marginTop:hp(20)
  },
  imgcontainer: {
    height: hp(100),
    width: wp(180),
  },
  logoMain: {
    marginTop:hp(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    height:"100%",
    width:"100%",
  },
  txtMain:{
    marginTop:hp(75),
    alignItems:'center',
    justifyContent:'center'
  },
  backTo:{
    fontSize:fp(18),
    fontFamily:Font.regular,
    color:colors.black,
  },
  login:{
    fontSize:fp(18),
    fontFamily:Font.regular,
    color:colors.Secondary,
  },
  cirnumContainer: {
    marginTop: hp(42),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cirMain: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: hzp(8),
    height: hp(70),
    width: hp(70),
    borderRadius: hp(35),
    backgroundColor: colors.lightpink,
  },
  cirMain2: {
    marginHorizontal: hzp(8),
    borderWidth: hp(1),
    borderColor: colors.inputbordercol,
    height: hp(70),
    width: hp(70),
    borderRadius: hp(35),
  },
  num: {
    fontSize: fp(26),
    fontFamily: Font.regular,
    color: colors.darkblack,
  },
  descriptionMain: {
    marginTop: hp(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeading: {
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.lightgrey,
  },
  resendTxt: {
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.Secondary,
  },
  button:{
    backgroundColor:colors.primary,
  },
  btnMain:{
    marginTop:hp(20)
  },
  
});

export default styles;
