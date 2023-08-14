import { Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { numberFormat } from '../components/Helper/general';
import { findPercentage } from '../components/Helper/orderHelpers';

const BillItem = (props) => {
    const { finalTotalValue, totalValue, serviceChargesPrice, delivery_charges, service_charge, delivery_charge_type, type, forHandlePriceToggle, subTotal, extraCharges, finaltotalValueOnExtraCharges } = props;


    return (
        <View style={styles.viewCon}>
            {
                totalValue && forHandlePriceToggle ?
                    <View style={styles.mainSub}>
                        <View style={styles.subOne}>
                            <Text style={styles.textitem}>{t("billTotal.Items Total")}</Text>
                        </View>
                        <View style={styles.subTwo}>
                            <Text style={styles.count}>₹{totalValue ? numberFormat(totalValue) : 0}</Text>
                        </View>
                    </View>
                    :
                    null
            }
            {
                (parseInt(type) === 1 || type === null) && parseInt(delivery_charges) > 0 ?
                    <View style={styles.mainSub}>
                        <View style={styles.subOne}>
                            <Text style={styles.textitem}>{t("billTotal.Delivery Charges")}  <Text style={styles.count22}>{delivery_charge_type === 'percentage' ? delivery_charges ? `( ${delivery_charges}%)` : null : null}</Text></Text>
                        </View>
                        <View style={styles.subTwo}>
                            <Text style={styles.count}>{delivery_charge_type === 'fixed_price' ? '₹' : null}{delivery_charge_type === 'fixed_price' && delivery_charges ? delivery_charges : null}{delivery_charge_type === 'percentage' && totalValue > 0 ? <Text style={styles.count}>{forHandlePriceToggle === null ? '' : delivery_charge_type === 'percentage' ? `₹ ${numberFormat(findPercentage(totalValue, delivery_charges))}` : null}</Text> : null}</Text>
                        </View>
                    </View>
                    : null
            }
            <View style={styles.mainSub}>
                <View style={styles.subOne}>
                    <Text style={styles.textitem}>{t("billTotal.Service Fee")}</Text>
                </View>
                <View style={styles.subTwo}>
                    <Text style={styles.count}>₹{serviceChargesPrice && serviceChargesPrice.service_charge ? numberFormat(parseInt(serviceChargesPrice.service_charge)) : service_charge}</Text>
                </View>
            </View>
            {
                forHandlePriceToggle === null && subTotal ?
                    <View style={styles.MainSub}>
                        <View style={styles.subOne}>
                            <Text style={styles.Textitem}>{t("billTotal.Sub Total")}</Text>
                        </View>
                        <View style={styles.subTwo}>
                            <Text style={styles.Count}>₹{subTotal ? numberFormat(subTotal) : 0}</Text>
                        </View>
                    </View>
                    :
                    null
            }
            {
                finalTotalValue && forHandlePriceToggle ?
                    <>
                        {
                            extraCharges ?
                                <>
                                    <View style={styles.mainSub}>
                                        <View style={styles.subOne}>
                                            <Text style={styles.textitem}>{t("billTotal.Total Amount")}</Text>
                                        </View>
                                        <View style={styles.subTwo}>
                                            <Text style={styles.count}>₹{numberFormat(finalTotalValue)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.mainSub}>
                                        <View style={styles.subOne}>
                                            <Text style={styles.textitem}>Home delivery for another location extra charges will be <Text style={styles.count22}> {`(10 %)`}</Text></Text>
                                        </View>
                                        <View style={styles.subTwo}>
                                            <Text style={styles.count}><Text style={styles.count}>{`₹ ${extraCharges}`}</Text></Text>
                                        </View>
                                    </View>
                                </>
                                :
                                null
                        }
                        <View style={styles.MainSub}>
                            <View style={styles.subOne}>
                                <Text style={styles.Textitem}>{t("billTotal.Bill Total")}</Text>
                            </View>
                            <View style={styles.subTwo}>
                                {
                                    finaltotalValueOnExtraCharges ?
                                        <Text style={styles.Count}>₹{finaltotalValueOnExtraCharges ? numberFormat(finaltotalValueOnExtraCharges) : 0}</Text>
                                        :
                                        <Text style={styles.Count}>₹{finalTotalValue ? numberFormat(finalTotalValue) : 0}</Text>
                                }
                            </View>
                        </View>
                    </>
                    :
                    null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    mainSub: {
        flexDirection: 'row',
        marginBottom: vp(15),
    },
    subOne: {
        flex: .50,
        // backgroundColor: 'red',
    },
    subTwo: {
        flex: .50,
        // backgroundColor: 'green',
        alignItems: 'flex-end',
    },
    textitem: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    Textitem: {
        fontSize: fp(16),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    viewCon: {
        backgroundColor: colors.white,
        marginTop: vp(20),
        paddingHorizontal: vp(20),
        paddingTop: vp(20),
    },
    count: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    count22: {
        fontSize: fp(16),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    Count: {
        fontSize: fp(16),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    MainSub: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: colors.greyy,
        paddingTop: vp(10),
        paddingBottom: vp(20),
    },
});

const mapStateToProps = state => ({
    user: state.UserReducer.user,
    products: state.AddToCartReducer.products,
});
export default connect(mapStateToProps)(BillItem);