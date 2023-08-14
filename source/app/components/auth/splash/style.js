import {StyleSheet} from 'react-native';
import { hp, wp } from '../../../assets/global_style/fontsize';


const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imgcontainer: {
    height: hp(140),
    width: wp(240),

  },
  logoMain: {
    marginTop: hp(270),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
