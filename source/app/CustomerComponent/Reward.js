import Clipboard from '@react-native-clipboard/clipboard';
import { Button, Icon, Image, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Share } from 'react-native';
import { ImageBackground, StatusBar, View } from 'react-native';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { Toaster } from '../components/Helper/Toaster';

const RewardComp = props => {
    const [copied, setCopied] = useState(false);

    const onShare = async () => {
        Share.share(
            {
                message: props.data.message ? ` ${props.data.message} : ${props.data.refferal_code}` : '',
            }
        ).then(({ action }) => {
            if (action === Share.sharedAction) {
                setCopied(false);
            }
            else {
                setCopied(false);
            }
        });
    };

    const copyToClipboard = async () => {
        let code = props && props.data.refferal_code ? props.data.refferal_code : ''

        setCopied(!copied);
        if (copied) {
            Clipboard.setString('');
        }
        else {
            Clipboard.setString(code);
            new Toaster().success(t("rewardsAndReferals.Text copied successfully"));
        }
    };

    return (
        <View style={styles.main}>
            <View style={[base.container, { backgroundColor: colors.white }]}>
                <View style={base.row}>
                    <View style={base.col12}>
                        <View style={styles.imgMain}>
                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.image}
                                    source={Images.reward2}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.contentMain}>
                            <View style={styles.circleMain}>
                                {
                                    props && props.data.rewards_points ? <Icon
                                        name={Icons.staro}
                                        type={IconsType.fontAwesome}
                                        color={colors.white}
                                        size={Dimension.semiLarge}
                                    />
                                        : null}
                            </View>
                            {
                                props && props.data.rewards_points ?
                                    <View style={styles.numberMain}>
                                        <Text style={styles.number}>{props.data.rewards_points}</Text>
                                    </View>
                                    :
                                    null
                            }
                        </View>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.subdesMain}>
                            <Text style={styles.subdes}>
                                {t('rewardsAndReferals.Refer to a friend and earn')} {props && props.data.refer_to_friend} {t("rewardsAndReferals.Points")}.
                            </Text>
                        </View>

                    </View>
                    {
                        props && props.data.refferal_code ?
                            <View style={styles.refferalCode}>
                                <View style={styles.vone}>
                                    <Text style={styles.code}>{props.data.refferal_code}</Text>
                                </View>
                                <View style={styles.vtwo}>
                                    <Icon
                                        type={IconsType.materialCommunity}
                                        name={copied ? Icons.filledClipboard : Icons.checkboxmultipleblankoutline}
                                        color={colors.black}
                                        size={Dimension.large}
                                        onPress={() => copyToClipboard()}
                                    />
                                </View>
                            </View>
                            :
                            null

                    }
                    {
                        props && props.data.refferal_code ?
                            <View style={base.col12}>
                                <View style={styles.buttonMain}>
                                    <Button
                                        buttonStyle={styles.button}
                                        title={t("rewardsAndReferals.Click here to share")}
                                        onPress={onShare}
                                    />
                                </View>
                            </View>
                            :
                            null
                    }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
    },
    imgContainer: {
        height: hp(230),
        width: '100%',
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

export default RewardComp;
