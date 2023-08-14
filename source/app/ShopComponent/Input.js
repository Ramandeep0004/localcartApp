import { Icon, Input } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const InputCom = (props) => {

    const handleChange = (e) =>{
      props.getInpuData(e)
    };
    
    return (
        <View>
            <View style={styles.input}>
                <Input placeholder='Search' 
                       leftIcon={<Icon type={IconsType.antDesign} 
                       name={Icons.search1} 
                       size={Dimension.semiLarge}
                       color={colors.grey} 
                       />}
                    inputContainerStyle={styles.inputcontainer}
                    errorStyle={styles.error}
                    value={props.values}
                    // onChangeText={(e) => handleChange(e)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputcontainer: {
        backgroundColor: colors.white,
    },
    input: {
        marginTop: vp(8),
        // backgroundColor: 'red'
    },
    error: {
        margin: hp(0),
        padding: hp(0),
    },
});

export default InputCom;