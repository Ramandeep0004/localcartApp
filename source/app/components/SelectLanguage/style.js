import { StyleSheet } from "react-native";
import { colors } from "../../assets/global_style/colors";
import { fp, hp, wp } from "../../assets/global_style/fontsize";


export const styles = StyleSheet.create({
    main: {
        height: '100%',
    },
    linearGradient: {
        borderBottomLeftRadius: 65,
        borderBottomRightRadius: 65,
        width: wp(130),
        height:hp(190),
    },
    imgFirst:{
        width:wp(130),
        height:hp(190),
        alignItems:"center",
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
    checkStyle:{
        flexDirection:'row',
        paddingTop:hp(10),
    },
    chkbox1: {
        flex: .5,
        marginRight: wp(10),
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingTop: hp(30),
        paddingBottom: hp(30),
        borderRadius: 20,
        borderWidth: wp(2),
        borderColor: colors.primary
    },
    txt1: {
        fontSize: fp(16),
        fontWeight: '400',
        color: colors.primary,

    },
    chkbox2: {
        flex: .5,
        marginLeft: wp(10),
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingTop: hp(30),
        paddingBottom: hp(30),
        borderRadius: 20,
    },
    txt2: {
        fontSize: fp(16),
        fontWeight: '400',
        
        color: colors.grey
    },
    chkbox3: {
        flex: .5,
        marginRight: hp(10),
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingTop: hp(30),
        paddingBottom: hp(30),
        borderRadius: 20,
        marginTop: hp(15)
    },
    txt3: {
        fontSize: fp(16),
        fontWeight: '400',
        color: colors.grey
    },
    chkbox4: {
        flex: .5,
        marginLeft: hp(10),
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingTop: hp(30),
        paddingBottom: hp(30),
        borderRadius: 20,
        marginTop: hp(15)
    },
    txt4: {
        fontSize: fp(16),
        fontWeight: '400',
        color: colors.grey,
    },
    button:{
        position:"absolute",
        bottom:90,
        width:'100%',
    },
    btnTitle:{
        fontSize:fp(16),
        color:colors.white,
        fontWeight:'400',
        lineHeight:15,
    },
    btnStyle:{
        height:hp(68),
        borderRadius:20,
        backgroundColor:colors.primary
    },
    mainview:{
        alignItems:'center'
    },
    logoMain: {
        marginTop: hp(80),
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
