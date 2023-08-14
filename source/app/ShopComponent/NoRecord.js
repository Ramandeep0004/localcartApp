import { Image, Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Images } from '../assets/global_style/images';

const NoRecord = (props) => {
    return (
        <View style={props.submain ? props.submain : styles.submain}>
            <View style={styles.mainimage}>
                <Image style={props.style ? props.style : styles.image}
                    source={props.image ? props.image : Images.cartnr}
                    resizeMode='stretch'
                />
            </View>
            <Text style={styles.request}>{props.message ? props.message : 'No Request found'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(130),
        width: hp(130),
        overflow: 'hidden',
    },
    request: {
        fontSize: fp(22),
        fontFamily: Font.regular,
        color: colors.LLgrey,
        marginTop: hp(20),
    },
    submain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NoRecord;