import { Icon, Text } from '@rneui/themed';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import RedeemPopup from '../components/Helper/redeemPopup';
import SuccessPopup from '../components/Helper/successPopup';

const RedeemPointsComp = props => {
    const [redeemPopup, setRedeemPopup] = useState(false);
    const [redeemPoints, setRedeemPoints] = useState(0);
    const { data, availablePoints } = props;
    let color = [
        {
            color: colors.skyblue,
            border: colors.skyblue
        }
        , {
            color: colors.pink,
            border: colors.pink
        },
        {
            color: colors.purple,
            border: colors.purple
        },
        {
            color: colors.blue,
            border: colors.blue
        },
    ];

    const handlePopup = async (e) => {
        setRedeemPoints(e);
        setRedeemPopup(true);
    };
    const onConfirm = async () => {
        props.addPointsToWallet(redeemPoints && redeemPoints.points)
        setRedeemPopup(false)
    };

    return (
        <View style={styles.main}>
            <View style={[base.container]}>

                {data.map((item, index) =>
                (
                    <View key={index} style={styles.maincard}>
                        <View style={[styles.submaincardone, { backgroundColor: color[index % color.length].color }]}>
                            <Icon
                                type={IconsType.material}
                                name={Icons.stars}
                                color={colors.gold}
                                size={Dimension.big}
                            />
                        </View>
                        <View style={[styles.submaincardtwo, { borderBottomColor: color[index % color.length].color, borderTopColor: color[index % color.length].color, borderTopWidth: 1, borderBottomWidth: 1 }]}>
                            <Text style={styles.maincardText}>Redeem {item.points} points and get exclusive rewards</Text>
                            <Text style={styles.maincardTex22t}>Earn ₹{item.cash} in your wallet by redeem your points.</Text>
                        </View>
                        <View style={[styles.submaincardthree, {
                            borderBottomColor: color[index % color.length].color,
                            borderTopColor: color[index % color.length].color,
                            borderRightColor: color[index % color.length].color,
                            borderTopWidth: 1, borderBottomWidth: 1,
                            borderRightWidth: 1,
                            borderTopRightRadius: hp(15),
                            borderBottomRightRadius: hp(15)
                        }]}>
                            {availablePoints && parseInt(availablePoints.rewards_points) > 0 ? <View style={{ backgroundColor: colors.gold, paddingHorizontal: hp(10), paddingVertical: hp(2), borderRadius: hp(20), overflow: 'hidden', borderWidth: 1.5, borderColor: colors.gold }}>
                                <TouchableOpacity onPress={() => handlePopup(item)}>
                                    <Text style={styles.coins}>Redeem</Text>
                                </TouchableOpacity>
                            </View> : null}
                        </View>
                    </View>
                ))}
            </View>
            {redeemPopup ? <RedeemPopup
                open={redeemPopup}
                close={() => setRedeemPopup(false)}
                onConfirm={() => onConfirm()}
                message={`Redeem ${redeemPoints && redeemPoints.points} points and earn ₹${redeemPoints && redeemPoints.cash} in your wallet.`}
                RightButtonText={'Redeem'}
                label={'Redeem points?'}
            /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        height: '100%',
        // width: '100%',
    },
    maincard: {
        flexDirection: 'row',
        // maxHeight: hp(100),
        backgroundColor: colors.white,
        borderRadius: hp(15),
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: hp(20),
    },
    submaincardone: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(7)
    },
    submaincardtwo: {
        flex: 0.60,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: hp(10),
        paddingVertical: hp(7)
    },
    submaincardthree: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(7)
    },
    maincardText: {
        fontFamily: Font.semiBold,
        color: colors.black,
        fontSize: fp(18),
        marginBottom: hp(5)
    },
    maincardTex22t: {
        fontFamily: Font.medium,
        color: colors.grey,
        fontSize: fp(16),
    },
    coins: {
        fontFamily: Font.semiBold,
        color: colors.black,
        fontSize: fp(16),
    },
    imgMain: {
        marginTop: hp(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentMain: {
        marginTop: hp(30),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    circleMain: {
        height: hp(38),
        width: hp(38),
        backgroundColor: colors.primary,
        borderRadius: hp(19),
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        paddingLeft: wp(10),
        fontSize: fp(38),
        fontFamily: Font.bold,
        color: colors.darkblack,
    },
    subdesMain: {
        marginTop: hp(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
    subdes: {
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.darkblack,
    },
    code: {
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.lightgrey,
        marginLeft: hp(60),
    },
    button: {
        backgroundColor: colors.primary,
    },
    buttonMain: {
        marginTop: hp(40),
    },
    refferalCode: {
        marginTop: vp(30),
        backgroundColor: colors.input,
        height: hp(60),
        width: '100%',
        borderRadius: hp(40),
        flexDirection: 'row',
        paddingHorizontal: vp(20)
    },
    vone: {
        flex: .9,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    vtwo: {
        flex: .1,
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: hp(60),
    },
});

export default RedeemPointsComp;
