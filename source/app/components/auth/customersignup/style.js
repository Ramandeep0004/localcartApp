import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../assets/global_style/fontsize';

const styles = StyleSheet.create({
  header: {
    //position: 'absolute',
   // backgroundColor: colors.primary,
    left: 0,
    // width: '100%',
    right: 0,
    //top:0,
    width: '100%',
    zIndex: 1,
  },
  imageMain: {
    height: '100%',
    width: '100%',
},
imgContainer:{
    height:hp(40),
    position: 'absolute',
    //top: hp(20),
    width:'100%',
    top:0,
    left: 0,
    right:0,
    zIndex:99,

    //marginLeft: wp(24),
},
  main: {
    flex: 1,
    backgroundColor: colors.white,
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
   marginTop: hp(70),
    width: '60%',
    // position:'absolute',
    // top:hp(20),
    // left:0,
    // marginLeft:wp(24)
  },
  cirContainer: {
    marginTop: hp(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circlMain: {
    height: hp(120),
    width: hp(120),
    borderRadius: hp(60),
    backgroundColor: colors.greyy,
    overflow: 'hidden',
  },
  userimageLogo: {
    height: '100%',
    width: '100%',
  },
  cirContainer2: {
    position: 'absolute',
    right: wp(130),
    top: hp(80),
    bottom: 0,
  },
  circleMain2: {
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
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
    marginTop: hp(42),
  },
  button: {
    backgroundColor: colors.primary,
  },
  btnMain: {
    marginTop: hp(20)
  },
  textContainer:{
    width:"100%",
    left:0,
    right:0,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
     marginTop:hp(30),
  },
  txt1: {
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.lightgrey,
  },
  txt2: {
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.Secondary,
  },
  scrollContainer:{
    paddingBottom:hp(70)
  },
  itemtext: {
    fontSize: fp(15),
    color: colors.lightgrey,
    marginBottom: vp(5),
    paddingBottom: vp(5),
    borderBottomWidth: 1,
    borderBottomColor: colors.input
  }
});

export default styles;
