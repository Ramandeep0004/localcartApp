import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/global_style/colors";
import { Font } from "../../../assets/global_style/fontfamily";
import { fp, hp, hzp, vp, wp } from "../../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.GreyL,
  },
  scrollContainer: {
    paddingBottom: hp(30),
  },
  delTxt: {
    fontSize: fp(20),
    fontFamily: Font.semiBold,
    color: colors.darkblack,
  },
  delMain: {
    marginTop: hp(15),
  },
  AddressMain: {
    marginTop: hp(15),
  },
  productList: {
    height: hp(450),
    marginTop: hp(30),
  },
  titleMain: {
    marginTop: hp(24)
  },
  lineMain: {
    width: '100%',
    borderBottomWidth: hp(1),
    borderBottomColor: colors.inputbordercol,
  },
  addnoteContainer: {
    marginTop: hp(30)
  },
  noteCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    backgroundColor: colors.Secondary,
  },
  circleContainer: {
    alignItems: 'flex-end',
  },
  addnoteTxt: {
    marginTop: hp(8),
    fontFamily: Font.regular,
    fontSize: fp(18),
    color: colors.darkblack,

  },
  buttonContainer1: {
    backgroundColor: colors.greyy,
  },
  buttonTitle1: {
    color: colors.darkblack,
  },
  buttonContainer2: {
    backgroundColor: colors.primary
  },
  buttonMain: {
    marginTop: hp(25)
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
  delivery: {
    fontSize: fp(18),
    fontFamily: Font.semiBold,
    color: colors.black,
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
  image: {
    height: '100%',
    width: '100%',
  },
  MainImage: {
    height: hp(50),
    width: hp(50),
    borderRadius: hp(25),
    overflow: 'hidden',
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
    textTransform: 'capitalize'
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
  submain: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: vp(15),
    marginBottom: vp(30),
  },
  errorStyle: {
    color: colors.Secondary,
    marginLeft: fp(5),
    marginTop: hp(-20),
    fontFamily: Font.regular,
    fontSize: fp(14),
    marginBottom: hp(10),
  },
  buttonMain: {
    // marginTop: hp(20)
  },
  inputCon: {
    paddingLeft: wp(18),
    paddingRight: wp(10),
  },
  error: {
    margin: 0,
    padding: 0,
  },
  line: {
    height: hp(1),
    width: '100%',
    backgroundColor: colors.inputbordercol,
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
  input: {
    marginTop: vp(20),
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
  nodelivery: {
    backgroundColor: colors.offpink,
    marginVertical: vp(15),
    paddingHorizontal: vp(20),
    paddingVertical: vp(15),
    borderRadius: hp(6),
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
  Viewicon: {
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: hp(12)
  },
  tooltipMain: {
    borderRadius: hp(10),
    backgroundColor: colors.lightprimary
  },
  Viewicon2: {
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: hp(10)
  },
  tooltipText: {
    fontSize: fp(15),
    color: colors.black,
    fontFamily: Font.regular,
  },
});

