import { Button, Icon, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Dimension } from '../assets/global_style/dimension';
import { StyleSheet, View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../assets/global_style/fontsize';
import { Toaster } from '../components/Helper/Toaster';
import { useState } from 'react';
import paymentController from '../../apis/Controller/paymentController/payment.controller';

const EncashmentComponent = props => {

    const [loader, setLoader] = useState(false);
    const { availiableBalance, transfer, transferAmount } = props;

    const submit = async () => {
        setLoader(true)
        let response = await paymentController.payout(transferAmount)
        if (response && response.status) {
            new Toaster().success(response.message);
            props.getIsTransfer();
            setLoader(false);
        }
        else {
            setLoader(false);
        }
    };
    return (
        <View style={styles.containerMain}>
            {availiableBalance ?
                <View style={styles.imgMain}>
                    <View style={styles.balance}>
                        <View style={{flexGrow:1 ,flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',marginBottom:hp(10) }}>
                            <Icon
                                type={IconsType.feather}
                                name={Icons.info}
                                size={Dimension.smallicon}
                                color={colors.black}
                            />
                            <Text style={styles.text1}>Available Bonus Amount <Text style={styles.textBold}>₹{availiableBalance && availiableBalance.bonus}</Text></Text>
                        </View>
                        {transfer && parseInt(transfer) === 1 ? <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',marginBottom:hp(10) }}>
                            <Icon
                                type={IconsType.feather}
                                name={Icons.info}
                                size={Dimension.smallicon}
                                color={colors.black}
                            />
                            {transferAmount && parseInt(transferAmount) > 0 ? <Text style={styles.text1}>Available Encashment Amount <Text style={styles.textBold}>₹{transferAmount && parseInt(transferAmount)}</Text></Text> : null}
                        </View> : null}
                        {transfer && parseInt(transfer) === 1 ? 
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                            {transferAmount && parseInt(transferAmount) > 0 ? <Text style={styles.text111}>Click on "Transfer" now to transfer encashment amount into your bank account.</Text> : null}
                        </View> : null}
                        {transfer && parseInt(transfer) === 1 ? < View style={{ marginTop: vp(15), marginHorizontal: vp(20), }}>
                            <Button title={'Transfer'}
                                buttonStyle={styles.btnstyle}
                                onPress={() => submit()}
                                loading={loader}
                                loadingProps={{
                                  size: 'small',
                                  color: 'white',
                                }}
                            />
                        </View> : null}
                    </View>
                </View> : null
            }
        </View >
    );
};

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',

        overflow: 'hidden',
    },
    balance: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // marginLeft: wp(30),
        marginVertical: hp(15),
        marginHorizontal: vp(20),
    },
    text1: {
        marginLeft: hp(5),
        fontSize: fp(17),
        fontFamily: Font.medium,
        color: colors.black,
    },
    text111: {
        fontSize: fp(17),
        fontFamily: Font.medium,
        color: colors.black,
    },
    textBold: {
        fontSize: fp(17),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    text2: {
        marginTop: hp(8),
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.white,
    },
    price: {
        marginLeft: wp(5),
        fontSize: fp(38),
        fontFamily: Font.semiBold,
        color: colors.white,
    },
    imgMain: {
        borderRadius: hp(10),
        maxHeight: hp(200),
        width: '100%',
        backgroundColor: 'rgba(188, 183, 89,0.4)',
        // borderRadius:hp(10),
        overflow: 'hidden',
    },
    containerMain: {
        marginTop: vp(10),
    },
    btnstyle: {
        backgroundColor: colors.Secondary,
        height: hp(40),
        paddingVertical: vp(10)
    },
});

export default EncashmentComponent;
