import { Icon, Text } from '@rneui/themed';
import React, { useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import AddAddressModal from './AddaddressModal';

const DeliveryaddressComp = props => {
  const [address, setAddress] = useState();
  return (
    <View>
      <View style={styles.ContainerMain}>
        <View style={styles.buttonContainer}>
          <View style={styles.ContainerMain1}>
            <Text style={styles.addressTxt}>
              3891 south view Ranchview Richardson, India 62639
            </Text>
          </View>
          <View style={styles.ContainerMain2}>
          <TouchableOpacity onPress={() => setAddress(true)}>
            <View style={styles.circleMain}>
              <Icon
                name={Icons.pencil}
                type={IconsType.octIcon}
                size={Dimension.semilarge}
                color={colors.darkblack}
              />
            </View>
            </TouchableOpacity>
           
          </View>
        </View>
      </View>
      <View>
    {address ? <AddAddressModal open={address} close={() => setAddress(false)} /> : null} 
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerMain: {
    borderWidth: hp(1),
    borderColor: colors.buttonborder,
    borderRadius: hp(12),
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: vp(20),
    paddingHorizontal: hzp(20),
  },
  ContainerMain1: {
    flex: 0.8,
  },
  circleMain: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    backgroundColor: colors.greyy,
  },
  ContainerMain2: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  addressTxt: {
    fontSize: fp(16),
    fontFamily: Font.regular,
    color: colors.lightgrey,
  },
});

export default DeliveryaddressComp;
