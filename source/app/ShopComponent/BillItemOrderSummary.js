import { useIsFocused } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { loadLanguages, t } from 'i18next';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp } from '../assets/global_style/fontsize';
import { numberFormat } from '../components/Helper/general';
import { findPercentage } from '../components/Helper/orderHelpers';
import { Toaster } from '../components/Helper/Toaster';
import Validation from '../components/Helper/Validations';
import AddPriceModal from './AddPriceModal';

const BillItemOrderSummary = (props) => {
    const { finalTotalValue, totalValue, serviceChargesPrice, delivery_charges, service_charge,
        delivery_charge_type, afterDiscountBillTotal, type, deliveredOrderStatus, discount,
        orderDetails, userType, subTotal, handleSubTotalHideShow, extraCharges, finaltotalValueOnExtraCharges } = props;

    const [addDiscount, setAddDiscount] = useState(false);
    let defaultValues = {
        discount: null
    };
    const [values, setValues] = useState(defaultValues);
    let defaultErrors = {
        discount: {
            rules: [""],
            isValid: true,
            message: "",
        },
    }
    const [error, setError] = useState(defaultErrors);

    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setValues(defaultValues);
        }
    }, [isFocus]);

    let Validations = new Validation(error);

    const handleChange = async (name, value) => {
        if (value >= finalTotalValue) {
            new Toaster().error(t('toasterMessge.Discount should be less than the total amount'))
        }
        else {
            let check = Validations.validateField(name, value);
            setError({ ...error, [name]: check });
            setValues({ ...values, [name]: value });
        }
    };

    const handleDiscount = async () => {
        let validtn = new Validation(error);
        let isValid = await validtn.isFormValid(values);
        if (isValid && !isValid.haveError) {
            props.handleBillTotalOnDiscount(values);
            setAddDiscount(false);
        }
        else {
            setError({ ...isValid.errors })
        }
    };

    const handleAddPrice = () => {
        if (orderDetails && parseInt(orderDetails.order_status) === 2) {
            setAddDiscount(true);
        }
        else {
            setAddDiscount(false);
        }
    };

    return (
        <View style={styles.viewCon}>
            {
                totalValue ?
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
                            <Text style={styles.textitem}>{t("billTotal.Delivery Charges")} <Text style={styles.count22}> {delivery_charge_type === 'percentage' ? delivery_charges ? `( ${delivery_charges}%)` : null : null}</Text></Text>
                        </View>
                        <View style={styles.subTwo}>
                            <Text style={styles.count}>{delivery_charge_type === 'fixed_price' ? '₹' : null}{delivery_charge_type === 'fixed_price' && delivery_charges ? delivery_charges : null}{delivery_charge_type === 'percentage' && totalValue > 0 ? <Text style={styles.count}>₹{delivery_charge_type === 'percentage' ? numberFormat(findPercentage(totalValue, delivery_charges)) : null}</Text> : null}</Text>
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
                handleSubTotalHideShow && subTotal ?
                    <View style={styles.mainSub2}>
                        <View style={styles.subOne}>
                            <Text style={styles.textitem2}>{t("billTotal.Sub Total")}</Text>
                        </View>
                        <View style={styles.subTwo}>
                            <Text style={styles.count2}>₹{subTotal ? numberFormat(subTotal) : 0}</Text>
                        </View>
                    </View>
                    :
                    null
            }
            {
                deliveredOrderStatus && discount ?
                    <View style={styles.mainSub}>
                        <View style={styles.subOne}>
                            <Text style={styles.textitem}>{t('billTotal.Total Amount')}</Text>
                        </View>
                        <View style={styles.subTwo}>
                            <Text style={styles.count}>₹{finalTotalValue ? numberFormat(finalTotalValue) : 0}</Text>
                        </View>
                    </View>
                    :
                    null
            }
            {
                deliveredOrderStatus && userType === 'shopkeeper' ?
                    <View style={styles.mainSub}>
                        <Text style={styles.textitem}>{t('billTotal.Discount')}</Text>
                        {
                            orderDetails && parseInt(orderDetails.order_status) === 2 ?
                                <TouchableOpacity style={[styles.buttonContainer]} onPress={() => handleAddPrice()}>
                                    <Text style={styles.addDiscount}>{discount ? 'Added' : 'Add'}</Text>
                                </TouchableOpacity>
                                :
                                null
                        }
                        <View style={[styles.disValue]}>
                            <Text style={styles.count2}>- <Text style={styles.count}>{discount ? discount : 0}</Text></Text>
                        </View>
                    </View>
                    :
                    deliveredOrderStatus && userType === 'customer' && discount && discount > 0 ?
                        <View style={styles.mainSub}>
                            <Text style={styles.textitem}>{t('billTotal.Discount')}</Text>
                            <View style={[styles.disValue]}>
                                <Text style={styles.count2}>- <Text style={styles.count}>{discount ? discount : 0}</Text></Text>
                            </View>
                        </View>
                        :
                        null
            }
            {
                extraCharges ?
                    <>
                        <View style={styles.mainSub}>
                            <View style={styles.subOne}>
                                <Text style={styles.textitem}>{t("billTotal.Total Amount")}</Text>
                            </View>
                            <View style={styles.subTwo}>
                                <Text style={styles.count}>₹ {finalTotalValue}</Text>
                            </View>
                        </View>
                        <View style={styles.mainSub}>
                            <View style={styles.subOne}>
                                <Text style={styles.textitem}>Home delivery for another location extra charges will be <Text style={styles.count22}>{`(10 %)`}</Text></Text>
                            </View>
                            <View style={styles.subTwo}>
                                <Text style={styles.count}><Text style={styles.count}></Text>₹ {extraCharges}</Text>
                            </View>
                        </View>
                    </>
                    :
                    null
            }
            {
                finaltotalValueOnExtraCharges ?
                    <View style={styles.MainSub}>
                        <View style={styles.subOne}>
                            <Text style={styles.Textitem}>{t("billTotal.Bill Total")}</Text>
                        </View>
                        <View style={styles.subTwo}>
                            <Text style={styles.Count}>₹{finaltotalValueOnExtraCharges ? numberFormat(finaltotalValueOnExtraCharges) : 0}</Text>
                        </View>
                    </View>
                    :
                    finalTotalValue && afterDiscountBillTotal === null || finalTotalValue && afterDiscountBillTotal === '' || finalTotalValue && !afterDiscountBillTotal ?
                        <View style={styles.MainSub}>
                            <View style={styles.subOne}>
                                <Text style={styles.Textitem}>{t("billTotal.Bill Total")}</Text>
                            </View>
                            <View style={styles.subTwo}>
                                <Text style={styles.Count}>₹{finalTotalValue ? numberFormat(finalTotalValue) : 0}</Text>
                            </View>
                        </View>
                        :
                        afterDiscountBillTotal ?
                            <View style={styles.MainSub}>
                                <View style={styles.subOne}>
                                    <Text style={styles.Textitem}>{t("billTotal.Bill Total")}</Text>
                                </View>
                                <View style={styles.subTwo}>
                                    <Text style={styles.Count}>₹{afterDiscountBillTotal ? numberFormat(afterDiscountBillTotal) : 0}</Text>
                                </View>
                            </View>
                            :
                            null

            }
            {
                addDiscount ?
                    <AddPriceModal
                        values={values}
                        open={addDiscount}
                        placeholder={t('billTotal.Add Discount')}
                        tittle={t('billTotal.Add Discount')}
                        isError={error}
                        close={() => (setAddDiscount(false), setValues(defaultValues), setError(defaultErrors))}
                        handleChange={(field, value) =>
                            handleChange(field, value)
                        }
                        handleItemFinalPrice={() => handleDiscount()}
                    /> : null
            }
        </View >
    );
};

const styles = StyleSheet.create({
    mainSub: {
        flexDirection: 'row',
        marginBottom: vp(15),
    },
    mainSub2: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: colors.greyy,
        paddingTop: vp(10),
        paddingBottom: vp(20),
    },
    subOne: {
        flex: .85,
        // backgroundColor: 'red',
    },
    subTwo: {
        flex: .21,
        // backgroundColor: 'green',
        alignItems: 'flex-end',
    },
    textitem: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    textitem2: {
        fontSize: fp(16),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    addDiscount: {
        fontSize: fp(12),
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
    count2: {
        fontSize: fp(16),
        fontFamily: Font.semiBold,
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
        paddingTop: vp(15),
        paddingBottom: vp(20),
    },
    buttonContainer: {
        height: hp(20),
        width: hp(52),
        marginLeft: hp(10),
        paddingHorizontal: hzp(5),
        paddingVertical: vp(1),
        borderRadius: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.LLgrey,
    },
    discountMain: {
        flexDirection: 'row'
    },
    disValue: {
        flex: .99,
        // backgroundColor: 'green',
        alignItems: 'flex-end',
    }
});

const mapStateToProps = state => ({
    user: state.UserReducer.user,
    products: state.AddToCartReducer.products,
});
export default connect(mapStateToProps)(BillItemOrderSummary);