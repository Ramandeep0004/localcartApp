import { Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import NotesModal from './NotesModal';

const NotesOrder = (props) => {
    return (
        <>
            {
                props && props.Note ?
                    <View style={styles.subMain}>
                        <Text style={styles.fusce}>{props.Note}</Text>
                    </View>
                    :
                    null

            }
        </>

    );
};

const styles = StyleSheet.create({
    subMain: {
        backgroundColor: colors.offpink,
        marginTop: vp(15),
        paddingHorizontal: vp(20),
        paddingVertical: vp(15),
        borderRadius: hp(6),
    },
    fusce: {
        fontSize: fp(16),
        color: colors.grey,
        fontFamily: Font.regular,
        lineHeight: hp(16),
    },
});

export default NotesOrder;