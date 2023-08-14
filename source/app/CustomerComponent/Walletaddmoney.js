import { Button, Icon, Image, Input, Text } from '@rneui/themed';
import React from 'react';
import { ScrollView } from 'react-native';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { ImageBackground, StatusBar, View } from 'react-native';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';

const WalletAddMoney = props => {
    let data = [1, 2, 3, 4, 5, 6, 7];
    return (
        <View style={styles.containerMain}>
            <View style={[base.container, { paddingVertical: vp(20) }]}>
                <View style={styles.inputMain}>
                    <View style={base.col12}>
                        <Input
                            selectionColor={colors.Secondary}
                            leftIcon={{
                                name: Icons.rupee,
                                type: IconsType.fontAwesome,
                                size: Dimension.Vsmall,
                                color: colors.darkblack,
                            }}
                            placeholder="Enter Amount"
                            inputContainerStyle={{
                                backgroundColor: colors.greyy,
                                borderWidth: 0,
                                borderBottomWidth: 0,
                                paddingLeft: wp(30)

                            }}
                        />
                    </View>
                </View>
                <View style={base.col12}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={styles.tabContainer}>
                        {data.map(item => (

                            <View style={styles.btngroupMain}>
                                <View style={styles.addpriceContainer}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Icon
                                            name={Icons.plus}
                                            type={IconsType.entypo}
                                            size={Dimension.Vsmall}
                                            color={colors.black}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Icon
                                            name={Icons.rupee}
                                            type={IconsType.fontAwesome}
                                            size={Dimension.Vsmall}
                                            color={colors.black}
                                        />
                                    </View>

                                    <Text style={styles.rupes}>100</Text>
                                </View>
                            </View>

                        ))}
                    </ScrollView>
                </View>
                <View style={styles.buttonMain}>
                    <View style={base.col12}>
                        <Button
                            buttonStyle={styles.button}
                            title='Add Money to wallet'
                        />

                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerMain: {
        marginHorizontal: hzp(20),
        backgroundColor: colors.white,
        borderRadius: hp(10),
        shadowColor: colors.lightgrey,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    button: {
        backgroundColor: colors.primary,
    },

    btngroupMain: {
        marginHorizontal: hzp(8),
        borderWidth: hp(1),
        paddingHorizontal: hzp(17),
        paddingVertical: vp(8),
        borderColor: colors.greyy,
        borderRadius: hp(30),
    },
    addpriceContainer: {
        flexDirection: 'row',
    },
    buttonMain: {

        marginTop: hp(18),
    },
    rupes: {
        paddingLeft: wp(2),
        fontFamily: Font.regular,
        fontSize: fp(14),
        color: colors.black,
    },
});

export default WalletAddMoney;
