import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../assets/global_style/fontsize';

export const styles = StyleSheet.create({
  main: {
    height: '100%'
  },
  viewheader3: {
    marginTop: hp(12)
  },
  container: {
    borderBottomWidth: 0,
    backgroundColor: colors.Secondary,
    paddingBottom: hp(22),
    paddingTop: hp(15),
    paddingHorizontal: vp(20),

  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
    borderColor: colors.offblue,
    backgroundColor: colors.offblue,

  },
  title: {
    fontSize: fp(26),
    paddingTop: hp(10),
    color: colors.white,
    fontFamily: Font.semiBold,
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'capitalize'
  },
  icon: {
    height: hp(50),
    width: hp(50),
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: Font.regular,
  },
  ProfileMainView: {
    width: "100%",
    backgroundColor: colors.white,
  },
  languageMain: {
    marginLeft: wp(34)
  },
  language: {
    fontFamily: Font.regular,
    fontSize: fp(18),
    color: colors.darkblack,
    marginTop: hp(15),
  },
  language1: {
    fontFamily: Font.semiBold,
    fontSize: fp(18),
    color: colors.darkblack,
    marginTop: hp(15),
  },
  scroll: {
    paddingBottom: hp(90),
    flexGrow: 1,
  },
  mainImage: {
    height: hp(54),
    width: hp(54),
    borderRadius: hp(27),
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',

  },
  ImageContainer: {
    marginTop: hp(30),
    alignItems: 'center',
    justifyContent: 'center'
  },
  ImageMain: {
    height: hp(90),
    width: wp(120)
  },
  imgMain: {
    height: hp(100),
    width: hp(100),
    borderRadius: hp(60),
    overflow: 'hidden',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(100),
    width: hp(100),
    borderRadius: hp(50),
    backgroundColor: colors.lightred,
    shadowColor: colors.darkgrey,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 0.5,
  },
  profileContainer: {
    marginVertical: vp(25),
    flexDirection: 'row',
  },
  profileMain: {
    flexDirection: 'row',
    flex: 0.7,
  },
  iconContainer: {
    flex: 0.3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  descriptionMain: {
    marginLeft: wp(18),
    marginTop: hp(18),
  },
  titleMain: {
    fontSize: fp(24),
    fontFamily: Font.semiBold,
    color: 'rgba(17, 17, 17, 1)',
  },
  numberTxt: {
    marginTop: hp(5),
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: 'rgba(128, 128, 128, 1)',
  },
  circleMain: {
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleMain1: {
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    backgroundColor: 'rgba(242, 242, 242, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Subone1: {
    flexDirection: 'row',
    flex: 0.7,
    marginTop: hp(15),
  },
  iconCircle: {
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    backgroundColor: 'rgba(242, 242, 242, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Subtwo2: {
    flex: 0.3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  Subone: {
    // marginTop: hp(15),
    flex: 0.5,
  },
  Subtwo: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  viewheader: {
    marginTop: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    marginTop: hp(34),
    flexDirection: 'row',
  },
  textmain: {
    justifyContent: 'center',
    marginLeft: wp(24)
  },
  Info: {
    fontSize: fp(16),
    fontFamily: Font.regular,
    color: 'rgba(128, 128, 128, 1)'
  },
  name: {
    fontFamily: Font.regular,
    fontSize: fp(18),
    color: colors.darkblack,

  },
  detailContainer1: {
    marginTop: hp(30),
    flexDirection: 'row'
  },
  viewheader2: {
    marginTop: hp(41),
  },
  subone: {
    flex: .11,
    // backgroundColor: 'red'
  },
  MainView: {
    marginTop: vp(15),
  },
  viewIcon: {
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    backgroundColor: colors.btngrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtwo: {
    flex: .89,
    justifyContent: 'center',
    paddingLeft: vp(20),
  },
  subtwo3: {
    flex: .89,
    justifyContent: 'center',
    paddingLeft: vp(28),
  },
  order: {
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.black,
  },
  mainView: {
    // alignItems: 'center',
    marginTop: vp(28),
  },
  notiText: {
    fontSize: fp(12),
    color: colors.white,
    fontFamily: Font.medium,
    // padding : hp(10)
  },
  badge: {
    marginTop: hp(7)
  },
});
