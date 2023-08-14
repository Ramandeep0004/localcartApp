import {Button, Icon, Image, Input, Text} from '@rneui/themed';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ImageBackground, StatusBar, View} from 'react-native';
import {hp, wp} from '../../../assets/global_style/fontsize';
import {Images} from '../../../assets/global_style/images';

const LogoHeaderCom = props => {
  return (
    <View>
      <View style={{height: hp(250)}}>
        <Image
          style={styles.imageMain}
          source={Images.headerimg}
          resizeMode="cover"
        />
      </View>
      <View style={styles.logoMain}>
        <View style={styles.imgcontainer}>
          <Image
            style={styles.image}
            source={Images.logo}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoMain: {
    // bottom:0,
    left: 0,
    right: 0,
    position: 'absolute',
    marginTop: hp(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageMain: {
    height: '100%',
    width: '100%',
  },
  imgcontainer: {
    height: hp(100),
    width: wp(180),
  },
  image: {
    height: '100%',

    width: '100%',
  },
});

export default LogoHeaderCom;
