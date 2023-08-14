import { Icon, Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/global_style/colors';
import { Dimension } from '../../assets/global_style/dimension';
import { Font } from '../../assets/global_style/fontfamily';
import { fp, hp, hzp, vp } from '../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../assets/global_style/icon';

export const ToastConfig = {
  customSuccess: ({text1, text2, props}) => (
    <View style={styles.cont}>
      <View style={[styles.main, styles.colorMain.success]}>
        <View style={[styles.iconMain, styles.iconBack.success]}>
          <Icon
            name={Icons.check}
            type={IconsType.feather}
            size={Dimension.smallicon}
            color={colors.primary}
          />
        </View>
        <View style={styles.textMain}>
          <Text style={[styles.text1, styles.colorText.success]}>{text1}!</Text>
          <Text style={styles.text2}>{text2}</Text>
        </View>
      </View>
    </View>
  ),
  customError: ({text1, text2, props}) => (
    <View style={styles.cont}>
      <View style={[styles.main, styles.colorMain.error]}>
        <View style={[styles.iconMain, styles.iconBack.error]}>
          <Icon
            name={Icons.check}
            type={IconsType.feather}
            size={Dimension.smallicon}
            color={colors.errorText}
          />
        </View>
        <View style={styles.textMain}>
          <Text style={[styles.text1, styles.colorText.error]}>{text1}!</Text>
          <Text style={styles.text2}>{text2}</Text>
        </View>
      </View>
    </View>
  ),
  customInfo: ({text1, text2, props}) => (
    <View style={styles.cont}>
      <View style={[styles.main, styles.colorMain.info]}>
        <View style={[styles.iconMain, styles.iconBack.info]}>
          <Icon
            name={Icons.check}
            type={IconsType.feather}
            size={Dimension.smallicon}
            color={colors.infoText}
          />
        </View>
        <View style={styles.textMain}>
          <Text style={[styles.text1, styles.colorText.info]}>{text1}!</Text>
          <Text style={styles.text2}>{text2}</Text>
        </View>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  cont: {
    width: '100%',
    paddingHorizontal: hzp(24),
    position: 'absolute',
    top: 0,
  },
  main: {
    paddingHorizontal: hzp(15),
    paddingVertical: vp(12),
    borderWidth: hp(1.5),
    borderRadius: hp(10),
    //  zIndex: 9,
    shadowColor: colors.toastShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconMain: {
    height: hp(50),
    width: hp(50),
    borderRadius: hp(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.successBorder,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  textMain: {
    paddingLeft: hp(15),
    flex: 1,
  },
  text1: {
    fontSize: fp(18),
    color: colors.primary,
    fontFamily: Font.bold,
  },
  text2: {
    fontSize: fp(15),
    color: colors.darkGrey,
    fontFamily: Font.regular,
    marginTop: hp(2),
    flexWrap: 'wrap',
  },
  colorMain: {
    success: {
      backgroundColor: colors.successBack,
      borderColor: colors.successBorder,
    },
    error: {
      backgroundColor: colors.errorBack,
      borderColor: colors.errorBorder,
    },
    info: {
      backgroundColor: colors.infoBack,
      borderColor: colors.infoBorder,
    },
  },
  colorText: {
    success: {
      color: colors.primary,
    },
    error: {
      color: colors.errorText,
    },
    info: {
      color: colors.infoText,
    },
  },
  iconBack: {
    success: {
      backgroundColor: colors.successBorder,
    },
    error: {
      backgroundColor: colors.errorBorder,
    },
    info: {
      backgroundColor: colors.infoBorder,
    },
  },
});
