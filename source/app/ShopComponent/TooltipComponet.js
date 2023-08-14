import { useIsFocused } from '@react-navigation/native';
import {Icon, Tooltip } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';


const TooltipComponent = props => {
    const [open, setOpen] = useState(false);

    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setOpen(false);
        }
    }, [isFocus]);

    return (
        <View style={props && props.Mainstyle ? props.Mainstyle : styles.Viewicon2}>
        <Tooltip
            visible={open}
            containerStyle={styles.tooltipMain}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            popover={
                <Text style={styles.tooltipText}>
                    {
                        t('Shop is currently closed.You may contact when the shop is open.')
                    }
                </Text>
            }
            height={hp(70)}
            width={hp(280)}
            withOverlay={false}
            backgroundColor={colors.lightprimary}
            >
            <Icon type={IconsType.feather}
                name={Icons.phone}
                size={Dimension.smallicon}
                color={colors.white}
            />
        </Tooltip>
    </View>
    );
};

const styles = StyleSheet.create({
    Viewicon2: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: hp(12)
    },
    tooltipText: {
        fontSize: fp(15),
        color: colors.black,
        fontFamily: Font.regular,
    },
    tooltipMain : {
        borderRadius : hp(10),
        backgroundColor : colors.lightprimary
    }
});

export default TooltipComponent;
