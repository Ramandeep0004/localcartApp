import { Button, Icon, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const ConfirmOrder = props => {
    const { item } = props;

    const handleNavigation = () => {
        props.navigation.navigate('ordersummary', { itemId: { id: props.itemID } });
        props.close();
    };


    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} >
                <View style={styles.maincontainer}>
                    <TouchableOpacity onPress={() => props.close()} >
                        <View style={styles.mainicon}>
                            <View style={styles.viewicon}>
                                <Icon type={IconsType.antDesign}
                                    name={Icons.close}
                                    size={Dimension.verysmall}
                                    color={colors.white}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.vieworder}>
                        <Text style={styles.order}>{t("shopOrders.Do you want to continue with")}</Text>
                        <Text style={styles.order}>{t("shopOrders.the order?")}</Text>
                    </View>
                    {item && parseInt(item.late_order_deducted) === 0
                        ? <View style={styles.mainbtn}>
                            <View style={styles.btnone}>
                                <Button title={t('shopOrders.Refuse')}
                                    buttonStyle={styles.buttonone}
                                    titleStyle={styles.title}
                                    loading={props.loader}

                                    loadingStyle={{
                                        color: 'black'
                                    }}
                                    onPress={() => props.onRefused()}
                                />
                            </View>
                            <View style={styles.btntwo}>
                                <Button title={t('shopOrders.View')}
                                    buttonStyle={styles.buttontwo}
                                    onPress={() => handleNavigation()}
                                />
                            </View>
                        </View> :
                        <View style={styles.mainbtn}>
                            <Button title={t('shopOrders.View')}
                                buttonStyle={styles.buttontwo}
                                onPress={() => handleNavigation()}
                            />
                        </View>}
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
    },
    maincontainer: {
        backgroundColor: colors.white,
        paddingTop: vp(15),
        paddingHorizontal: vp(20),
        width: '91%',
        borderRadius: vp(10),
        paddingBottom: vp(20)
    },
    mainicon: {
        alignItems: 'flex-end',
    },
    viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    order: {
        fontSize: fp(24),
        fontFamily: Font.regular,
        color: colors.black,
    },
    vieworder: {
        alignItems: 'center',
        marginTop: vp(25),
    },
    mainbtn: {
        flexDirection: 'row',
        marginTop: vp(25),
    },
    btnone: {
        flex: .5,
        marginRight: vp(8),
    },
    btntwo: {
        flex: .5,
        marginLeft: vp(8),
    },
    buttonone: {
        backgroundColor: colors.btngrey,
        width: '100%'
    },
    title: {
        color: colors.black,
        fontSize: fp(16),
        fontFamily: Font.regular,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttontwo: {
        backgroundColor: colors.primary,
    },
});

export default ConfirmOrder;
