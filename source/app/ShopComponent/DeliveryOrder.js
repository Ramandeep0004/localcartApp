import { Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';

const DeliveryOrder = (props) => {
    return (
        <View>
            <View style={styles.Container}>
                <Text style={styles.txt}>{props && props.data}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        marginTop: vp(15),
        borderColor: colors.offgrey,
        borderRadius: hp(10),
        borderWidth: 1,
        paddingHorizontal: vp(20),
        paddingVertical: vp(20),
    },
    txt: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        lineHeight: hp(18)
    },
});

export default DeliveryOrder;