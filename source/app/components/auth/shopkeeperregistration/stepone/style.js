import { StyleSheet } from 'react-native';
import { colors } from '../../../../assets/global_style/colors';
import { Font } from '../../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../../assets/global_style/fontsize';



const styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor:colors.white,
    },
    sliderMain: {
        marginTop: hp(42),
    },
    scrollContainer:{
        paddingBottom:hp(30),
    },
    sliderContainer: {
        flexDirection: 'row',
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
    headingMain: {
        flexDirection:'row',
        marginTop: hp(70),

    },
    iconMain:{
        justifyContent:'center'
    },
    heading: {
        paddingLeft:wp(15),
        fontSize: fp(48),
        fontFamily: Font.semiBold,
        color: colors.Secondary,
    },
    cirContainer: {
        marginTop: hp(45),
        alignItems: 'center',
        justifyContent: 'center',
    },
    circlMain: {
        height: hp(130),
        width: hp(130),
        borderRadius: hp(65),
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
    scrollMain: {
        paddingBottom: hp(20)
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
        marginTop: hp(18),

    },
});

export default styles;
