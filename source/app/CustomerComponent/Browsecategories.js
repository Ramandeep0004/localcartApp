import { Icon, Text } from '@rneui/themed';
import React from 'react';

import { StyleSheet, View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';



const BrowseCategoriesComp = props => {
  return (
    <View style={styles.buttomMain}>
    <View style={styles.ContainerMain}>
        <View style={styles.iconMain}>
            <Icon
            name={Icons.list}
            type={IconsType.ionIcon}
            size={Dimension.smallicon}
            color={colors.white}
            />
        </View>
        <View style={styles.textMain}>
            <Text style={styles.browsecate}>Browse Categories</Text>
        </View>
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
    buttomMain:{
        height: hp(50),
        paddingVertical: vp(10),
       // width: hp(182),
         paddingHorizontal:hzp(12),
         width:"62%",
        // paddingVertical:vp(9),
        borderRadius:hp(24),
        backgroundColor:colors.Secondary,
    },
    ContainerMain:{
        flexDirection:'row',
        
    },
    browsecate:{
        paddingLeft:wp(5),
        fontSize:fp(18),
        fontFamily:Font.regular,
        color:colors.white,
    },
    iconMain:{
        justifyContent:'center',
    },
  
});

export default BrowseCategoriesComp;
