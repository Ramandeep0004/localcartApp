import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../../../assets/global_style/fontsize';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.GreyL,
  },
  listMain: {
    paddingBottom: hp(175),
    // marginTop: hp(20),
  },
  ContainerList: {
    marginVertical: vp(12),
  },
  addressContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: vp(20),
    paddingHorizontal: hzp(20),
    borderWidth: hp(1),
    borderColor: colors.buttonborder,
    borderRadius: hp(10),
  },
  addressContainer2: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: vp(20),
    paddingHorizontal: hzp(20),
    borderWidth: hp(1),
    borderColor: colors.Secondary,
    backgroundColor: 'rgba(255, 232, 225, 1)',
    borderRadius: hp(10),
  },
  addressTxt: {
    fontSize: fp(16),
    fontFamily: Font.regular,
    color: colors.lightgrey,
  },
  buttonMain: {
    position: 'absolute',
    bottom: 0,
    marginBottom: hp(30),
  },
  button: {
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: fp(16),
    fontFamily: Font.regular,
    color: 'rgba(128, 128, 128, 1)'
  },
  titleMain: {
    marginVertical: hp(20)
  },
  nameMain: {
    flexDirection: 'row',
  },
  name: {
    fontSize: fp(14),
    fontFamily: Font.semiBold,
    color: colors.darkblack,
    textTransform: 'capitalize'
  },
  nameContainer: {
    flex: 0.9,
  },
  iconMain: {
    flex: 0.1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  AddressContainer: {
    flex: 0.75,
    flexDirection: 'row',
    // backgroundColor:'red'
    // marginTop:hp(20),
  },
  addressMain: {
    width: '90%',
    marginLeft: wp(8),
    justifyContent: 'center',
  },
  address: {
    fontSize: fp(14),
    fontFamily: Font.regular,
    color: colors.darkblack,
    textTransform: 'capitalize'
  },
  contactConatiner: {
    flexDirection: 'row',
    marginTop: hp(12),
  },
  editDelete: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor:'red'
    // marginTop: hp(8),
  },
  iconMainEdit: {
    // flex:0.1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: hp(10),
  },
  numberMain: {
    marginLeft: wp(8),
    justifyContent: 'center',
  },
  editBox: {
    width: wp(120),
    borderRadius: hp(5),
    backgroundColor: colors.white,
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: vp(15),
    shadowColor: colors.lightgrey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
  },
  Txt: {
    fontSize: fp(14),
    fontFamily: Font.regular,
    color: colors.darkblack,

  },
  one: {
    borderBottomWidth: wp(1),
    borderColor: colors.buttonborder,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    paddingBottom: hp(8),
    marginBottom: hp(8),
  },
  Txt1: {
    fontSize: fp(13),
    fontFamily: Font.regular,
    color: colors.darkblack,
  },
  editContainer: {
    position: 'absolute',
    top: 0,
    marginTop: hp(25),
    right: 0,
    marginRight: wp(30),
  },
  line: {
    borderBottomWidth: wp(1),
    width: "100%",
    borderColor: colors.buttonborder,
  },
  nodata: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(230),
  }
});

export default styles;
