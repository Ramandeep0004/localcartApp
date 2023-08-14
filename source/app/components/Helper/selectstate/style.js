import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp } from '../../../assets/global_style/fontsize';


const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  line:{
    marginTop:hp(10),
    borderBottomWidth:hp(1),
   borderColor:colors.lightgrey,
    width:"100%",
  },
 
  inputMain1: {
    marginTop: hp(25),
    marginBottom:hp(-20)
  },
  flattext: {
    fontFamily:Font.regular,
    fontSize:fp(18),
    color: colors.lightgrey
  },
  Viewlist:{
    paddingHorizontal:hp(7),
    paddingVertical:hp(8),
    marginVertical:hp(12)
  },
  nodata:{
    fontFamily:Font.semiBold,
    fontSize:fp(17),
    color: colors.black,
    textAlign:'center',
    marginTop:hp(30)
  }

});

export default styles;

