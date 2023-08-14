import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/global_style/colors';
import {hp} from '../../../assets/global_style/fontsize';

export const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: colors.GreyL,
  },
  inputMain: {
    marginTop: hp(60),
  },
  button: {
    backgroundColor: colors.primary,
  },
  buttonMain: {
    position: 'absolute',
    bottom: 0,
    marginBottom: hp(-430),
  },
});
