import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../../../assets/global_style/fontsize';

const styles = StyleSheet.create({
    main: {
       flex:1,
        backgroundColor: colors.white,
    },
    scrollContainer:{
        paddingBottom:hp(30),
    },
    mainContainer:{
        paddingTop:hp(40),
        height:'100%'
    },
    imageMain:{
        height:"100%",
        width:"100%",
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
    imageMain: {
        height: "100%",
        width: "100%",
    },
    bankdetailMain: {
        marginTop: hp(20),
    },
    steponeMain: {
         marginTop: hp(-30),
        
     //     height:'100%',
          //flex:1,
           //backgroundColor:'red'
    },
    sliderMain: {
        marginTop: hp(20),
    },
    sliderContainer: {
        flexDirection: 'row',
    },
    subHeadMain:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: fp(40),
    },
    cirMain1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ImageContainer: {
        //position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        //marginTop: hp(24),
        marginHorizontal: hzp(20)
    },
    ContainerMain:{
        //paddingTop:hp(250),
    },
    cirMain2: {
        flex: 0.5,
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
        backgroundColor: colors.Secondary,
        borderColor: colors.Secondary
    },
    ring1: {
        height: hp(24),
        width: hp(24),
        borderRadius: hp(12),
        borderWidth: hp(1.6),
        backgroundColor: colors.white,
        borderColor:colors.Secondary
    },
    line: {
        height: fp(2.8),
        flex: 1,
        backgroundColor: colors.Secondary,
        marginRight: fp(-1),
      },
      inActiveLine: {
        height: fp(2.8),
        flex: 1,
        backgroundColor: colors.inputbordercol,
        marginRight: fp(-1),
      },
   
    headingMain: {
        marginTop: hp(40),
        marginBottom:hp(50),
        flexDirection : 'row'
    },
    skipMain : { 
        marginTop: hp(28),
        // marginBottom:hp(60),
    },
    heading: {
        fontSize: fp(48),
        fontFamily: Font.semiBold,
        color: colors.Secondary,
    },
    skipButton : {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.Secondary,
        // paddingLeft : hp(90),
        justifyContent : 'flex-end'
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
        marginTop: hp(42),
    },
    scrollMain: {
        paddingBottom: hp(20),
    },
    button2: {
        backgroundColor: colors.primary
    },
    button1: {
        backgroundColor: colors.greyy,
    },
    btntitle: {
        color: colors.black,
    },
    buttonMain: {
        marginTop: hp(40)
    },
    iconMain:{
        justifyContent:'center',
        marginTop : hp(15),
        marginLeft : hp(2)
    }, 
});

export default styles;
