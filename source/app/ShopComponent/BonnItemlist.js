import { useIsFocused } from '@react-navigation/native';
import { Icon, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { isEmpty, renderImage } from '../components/Helper/general';
import Loader from '../components/Helper/loader';
import Validation from '../components/Helper/Validations';
import AddPriceModal from './AddPriceModal';
import NotesModal from './NotesModal';

const BonnItemList = (props) => {
    const [note, setNote] = useState(false);
    const [loader, setLoader] = useState(false);
    const [saveNote, setSaveNote] = useState(null);
    const [itemId, setItemId] = useState(null);
    const [addPrice, setAddPrice] = useState(false);
    let defaultValues = {
        price: null
    }
    const [values, setValues] = useState(defaultValues);
    let defaultErrors = {
        price: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
    }
    const [error, setError] = useState(defaultErrors);

    let Validations = new Validation(error);

    let isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setValues(defaultValues);
        }
    }, [isFocus]);

    const handleChange = async (name, value) => {
        let check = Validations.validateField(name, value);
        setError({ ...error, [name]: check });
        setValues({ ...values, [name]: value });
    };

    const handleItemFinalPrice = async () => {
        let validtn = new Validation(error);
        let isValid = await validtn.isFormValid(values);
        if (isValid && !isValid.haveError) {
            props.upadateOrderList(values.price, itemId);
            setAddPrice(false);
            setValues(defaultValues);
        }
        else {
            setError({ ...isValid.errors })
        }
    };

    const handleNote = (e) => {
        if (e) {
            setSaveNote(e);
            setNote(true);

        } else {
            setSaveNote(null);
            setNote(false);
        }
    };

    return (
        <>
            <FlatList
                contentContainerStyle={styles.flat}
                data={props.data}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                renderItem={({ item, i }) => (
                    <View style={styles.subcon}>
                        <View style={styles.mainimage}>
                            <TouchableOpacity onPress={() => props.action({ id: item.product_id, shop_id: item.shop_id })}>
                                <Image style={styles.image}
                                    source={item.products_image && item.products_image.length > 0 ? renderImage(item.products_image[0]) : Images.noImage}
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => props.action({ id: item.product_id, shop_id: item.shop_id })} style={styles.subContainer}>
                            {
                                <View style={styles.viewmain}>
                                    <View style={styles.subone}>
                                        <Text style={styles.bonn}>{item && item.products_title ? item.products_title : ''}<Text style={styles.quant}> {item && item.quantity ? `x ${item.quantity}` : ''}</Text></Text>
                                    </View>
                                    <View style={styles.subtwo}>
                                        {!isEmpty(item.comment) ?
                                            <TouchableOpacity onPress={() => handleNote(item.comment)}>
                                                <View style={[styles.viewicon, { backgroundColor: item.comment === '' || item.comment === null ? colors.btngrey : colors.Secondary }]}>
                                                    <Icon type={IconsType.feather}
                                                        name={Icons.messagesquare}
                                                        color={item.comment === '' || item.comment === null ? colors.black : colors.white}
                                                        size={Dimension.verysmall}
                                                    />
                                                </View>
                                            </TouchableOpacity> : null}
                                        <View style={styles.txtview}>
                                            {/* <Text style={styles.num}>₹48</Text> */}
                                        </View>
                                    </View>
                                </View>
                            }
                            <View style={styles.subOne}>
                                {item.products_units ?
                                    <Text style={styles.gram}>{item.products_units}</Text>
                                    :
                                    null
                                }
                            </View>
                            <View style={[styles.viewtext, base.row]}>
                                <View style={base.col9}>
                                    <Text style={styles.num}>{item && item.products_price ? `₹ ${item.products_price}` : ''}</Text>
                                </View>
                                {/* <Text style={styles.rupee}> ₹25</Text> */}
                                {
                                    props && props.orderDetails && parseInt(props.orderDetails.order_status) === 8 && item && item.products_price === ''
                                        || props && props.orderDetails && parseInt(props.orderDetails.order_status) === 8 && item && item.products_price === null ?
                                        <View style={base.col3}>
                                            <TouchableOpacity style={styles.buttonContainer} onPress={() => (setAddPrice(true), setItemId(item.product_id))}>
                                                <Text style={styles.AddTxt}>{t("orderSummary.Add Price")}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        null
                                }
                                {
                                    item && item.change_price ?
                                        <View style={base.col3}>
                                            <TouchableOpacity style={styles.buttonContainer} onPress={() => (setAddPrice(true), setItemId(item.product_id))}>
                                                <Text style={styles.AddTxt}>{t("orderSummary.Change")}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        null
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
            {
                note ?
                    <NotesModal item={saveNote}
                        open={note}
                        close={() => setNote(false)}
                    />
                    :
                    null
            }
            {addPrice ?
                <AddPriceModal
                    values={values}
                    open={addPrice}
                    isError={error}
                    priceProp={"handleOnChange"}
                    loading={loader}
                    close={() => (setAddPrice(false), setValues(defaultValues), setError(defaultErrors))}
                    handleChange={(field, value) =>
                        handleChange(field, value)
                    }
                    handleItemFinalPrice={() => handleItemFinalPrice()}
                /> : null}
            <Loader loader={loader}></Loader>
        </>
    );
};

const styles = StyleSheet.create({
    subcon: {
        flexDirection: 'row',
        marginBottom: vp(12),
        paddingBottom: vp(12),
        borderBottomWidth: 1,
        borderBottomColor: colors.bottomline,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(80),
        width: hp(80),
        overflow: 'hidden',
    },
    flat: {
        marginTop: vp(10),
    },
    // subContainer: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     paddingLeft: vp(15),
    //     // justifyContent: 'center',
    //     alignItems: 'center'
    // },
    subtwo: {
        flex: .15,
        // backgroundColor: 'green',
        alignItems: 'flex-end',
    },
    bonn: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        textTransform:'capitalize'
    },
    quant: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.semiBold,
    },
    gram: {
        fontSize: fp(14),
        color: colors.black,
        fontFamily: Font.regular,
        // paddingTop: vp(4),
    },
    num: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
    },
    rupee: {
        fontSize: fp(10),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        paddingTop: vp(3),
        marginLeft: vp(1),
        // backgroundColor: 'red',
        textDecorationLine: 'line-through'
    },
    viewtext: {
        flexDirection: 'row',
        paddingTop: vp(4),
    },
    viewicon: {
        height: hp(30),
        width: hp(30),
        borderRadius: hp(15),
        backgroundColor: colors.greyy,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtview: {
        // paddingTop: vp(20)
    },
    viewmain: {
        flexDirection: 'row'
    },
    subone: {
        flex: .85,
        // backgroundColor: 'red',
        justifyContent: 'center'
    },
    subContainer: {
        flex: 1,
        // flexDirection: 'row',
        paddingLeft: vp(15),
        // justifyContent: 'center',
        alignItems: 'flex-start',
    },
    subOne: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        height: hp(25),
        width: hp(72),
        paddingHorizontal: hzp(5),
        paddingVertical: vp(1),
        borderRadius: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    AddTxt: {
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.white,
    },
});

export default BonnItemList;