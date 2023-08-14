import { Button, Icon, Image, Input, Text } from '@rneui/themed';
import React from 'react';

import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ImageBackground, StatusBar, View } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, wp } from '../../../assets/global_style/fontsize';
import { Images } from '../../../assets/global_style/images';
import { homeLabel } from '../../../assets/global_style/values/home';
import { header } from '../../auth/customerchangepassword/style2';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animated } from 'react-native';
const HEADER_HEIGHT = 210 / 2;

const ImageHeaderCom =  ({ animatedValue }) => {
    
    console.log(headerHeight,'-------------------')
    const insets = useSafeAreaInsets();


  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 100],
    //outputRange: [HEADER_HEIGHT + upside.top, upside.marginTop - 90],
    extrapolate: 'clamp'
  });
    return (
        <>
        <Animated.View
        // style={{
        //   position: 'absolute',
        //   top: 0,
        //   left: 0,
        //   right: 0,
        //   zIndex: 10,
        //   height: headerHeight,
        //   backgroundColor: 'lightblue'
         // }}
        //  style={{
        //    top: 0,
        //    left: 0,
        //    right: 0,
        //    zIndex: 10,
        //    height: headerHeight,
        //    backgroundColor: 'lightblue'}}>
        >
            <View style={styles.imgContainer}>
                <Image  style={styles.imageMain}
                source={Images.headerimage}
                resizeMode='stretch'/>
            </View>
           <View style={styles.headingMain}>
            <View style={base.container}>
                    <Text style={[styles.heading]}>
                    Customer Sign up
                    </Text>
                    </View>
            </View>
        
         </Animated.View>
         </>
      
    );
};

const styles = StyleSheet.create({
    imageMain: {
        height: '100%',
        width: '100%',
    },
    imgContainer:{
        height:hp(40),
        position: 'absolute',
        //top: hp(20),
        width:'100%',
        top:0,
        left: 0,
        right:0,
        //marginLeft: wp(24),
    },
    headingMain: {
        marginTop: hp(50),
        width: '60%',
        //position: 'absolute',
        //top: hp(20),
        //left: 0,
        //marginLeft: wp(24),
       
    },
    heading: {
        fontSize: fp(48),
        fontFamily: Font.semiBold,
        color: colors.Secondary,
    },
    
});

export default ImageHeaderCom;
