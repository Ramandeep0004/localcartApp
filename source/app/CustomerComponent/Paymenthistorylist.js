import { Icon, Text } from '@rneui/themed';
import React from 'react';

import { FlatList, StyleSheet, View } from 'react-native';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const PaymentHistoryCom = props => {
    let data = [1, 2, 3, 4, 5, 6, 7];
    return (
        <View style={styles.containerMain}>
            <FlatList
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={styles.listContainer}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                keyExtractor={(index, item) => (index, item)}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => (
                    <View style={base.mv_3}>
                        <View style={styles.containerlist}>
                            <View style={base.phz_4}>
                                <View style={styles.paymentdetailMain}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>Lorem ipsum</Text>
                                        <Text style={styles.number}>154632679</Text>
                                        <Text style={styles.number}>25 april 2020 | 4:00pm</Text>
                                    </View>
                                    <View style={styles.priceMain}>
                                        <Text style={styles.status}>Success</Text>
                                        <View style={base.mt_2}>
                                            <View style={styles.rupessMain}>
                                                <View style={styles.iconMain}>
                                                    <Icon
                                                        name={Icons.rupee}
                                                        type={IconsType.fontAwesome}
                                                        size={Dimension.Vsmall}
                                                        color={colors.darkblack}
                                                    />
                                                </View>
                                                <View style={styles.price}>
                                                    <Text style={styles.priceTxt}>300</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listMain: {
        maxHeight: hp(500),
        overflow: 'hidden',
        backgroundColor: colors.white,
        borderRadius: hp(6),
        shadowColor: colors.grey,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 5,
    },
    listContainer: {
        marginTop: hp(20),
        paddingBottom: hp(30),
        marginBottom: hp(200),
    },
    separator: {
        paddingVertical: vp(8),
        borderBottomColor: 'rgba(220, 220, 220, 1)',
        borderBottomWidth: wp(1),
        marginHorizontal: hzp(20)
    },
    paymentdetailMain: {
        marginTop: hp(8),
        paddingHorizontal: hzp(20),
        flexDirection: 'row',
    },
    priceMain: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
    },
    status: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.parrotgreen,
    },
    name: {
        fontSize: fp(16),
        fontFamily: Font.semiBold,
        color: colors.darkblack,
    },
    number: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.darkblack,
        lineHeight: hp(22),
    },
    heading: {
        fontFamily: Font.semiBold,
        fontSize: fp(24),
        color: colors.darkblack,
    },
    rupessMain: {
        flexDirection: 'row',
    },
    iconMain: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: wp(5),
    },
    priceTxt: {
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.darkblack,
    },
});

export default PaymentHistoryCom;
