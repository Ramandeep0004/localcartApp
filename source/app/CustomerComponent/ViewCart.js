import {Button, Icon, Image, Input, Text} from '@rneui/themed';
import React from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {ImageBackground, StatusBar, View} from 'react-native';
import {colors} from '../assets/global_style/colors';
import {Font} from '../assets/global_style/fontfamily';
import {fp, hp, hzp, vp, wp} from '../assets/global_style/fontsize';

//// onPress={() => props.navigation.navigate('customercart')} 
const ViewCartComp = props => {
  return (
    <View style={styles.containerMain}>
      <View style={styles.itemContainer}>
        <View style={styles.itemMain}>
          <Text style={styles.item}>2 Items</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹80</Text>
        </View>

        <View style={styles.cartMain}>
          <TouchableOpacity
            > 
            <View style={styles.buttonMain}> 
              <Text style={styles.cart}>View cart</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    borderRadius: hp(10),
    height: hp(75),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: hzp(20),
    flexDirection: 'row',
  },
  item: {
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.white,
  },
  price: {
    fontSize: fp(20),
    fontFamily: Font.regular,
    color: colors.white,
  },
  itemMain: {
    flex: 0.5,
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.2,
    paddingRight: wp(15),
  },
  cartMain: {
    flex: 0.3,
  },
  buttonMain: {
    paddingVertical: vp(10),
    borderWidth: hp(1),
    borderColor: colors.white,
    borderRadius: hp(30),
  },
  cart: {
    fontSize: fp(18),
    textAlign: 'center',
    fontFamily: Font.regular,
    color: colors.white,
  },
});

export default ViewCartComp;
