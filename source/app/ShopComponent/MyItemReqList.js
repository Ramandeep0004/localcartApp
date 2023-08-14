import { Button, Icon, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { renderImage } from '../components/Helper/general';
import Loader from '../components/Helper/loader';
import ItemDetailModal from '../CustomerComponent/itemDetailModal';
import NoteItem from './NoteItem';

const MyItemReqList = (props) => {
    let productDetail = props.productDetail
    const [items, setItems] = useState(false);
    const [note, setNote] = useState(false);
    const [dlt, setDlt] = useState(false);
    const [deleteItemId, setDeletRequestId] = useState(null);
    const [loader, setLoader] = useState(false);

    let categoriesName = productDetail && productDetail.categories ? productDetail.categories.map((item) => item.category_name).join(",") : ''

    return (
        <View>
            {
                productDetail ?
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => (setItems(true), props.getRequestedItemDetail(productDetail.id))}>
                            <View style={styles.submain}>
                                <View style={styles.mainimage}>
                                    <Image style={styles.image}
                                        source={productDetail.image ? renderImage(productDetail.image[0], 'medium') : Images.noImage}
                                        resizeMode='cover'
                                    />
                                </View>
                                <View style={styles.viewtext}>
                                    <View style={styles.viewmain}>
                                        <View style={styles.viewone}>
                                            <Text style={styles.bonn}>{productDetail.title ? productDetail.title : ''}</Text>
                                        </View>
                                        <View style={styles.viewtwo}>
                                            <View style={[styles.viewpending, parseInt(productDetail.request_status) === 0 ?
                                                { backgroundColor: colors.Lgreen } : parseInt(productDetail.request_status) === 1 ?
                                                    { backgroundColor: colors.offLgreen } : { backgroundColor: colors.lightred }]}>
                                                <Text style={[styles.pending, parseInt(productDetail.request_status) === 0 ?
                                                    { color: colors.black } : parseInt(productDetail.request_status) === 1 ?
                                                        { color: colors.parrotgreen } : { color: colors.red }]}
                                                >
                                                    {parseInt(productDetail.request_status) === 0 ?
                                                        t('status.Pending') : parseInt(productDetail.request_status) === 1 ? t('status.Accepted') : t('status.Refused')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {
                                        productDetail.categories ?
                                            <View style={styles.categories}>
                                                <Text style={styles.dairy} >{`${categoriesName}`}</Text>
                                            </View>
                                            :
                                            null
                                    }
                                    <View style={styles.viewnum}>
                                        {
                                            productDetail.price ?
                                                <View style={styles.vone}>
                                                    <Text style={styles.num}>{`₹ ${parseInt(productDetail.price)}`}</Text>
                                                </View>
                                                :
                                                null
                                        }
                                        <View style={styles.vtwo}>
                                            <TouchableOpacity onPress={() => setNote(true)}>
                                                {
                                                    parseInt(productDetail.request_status) === 2 ?
                                                        <View style={styles.viewIcon}>
                                                            <Icon type={IconsType.feather}
                                                                name={Icons.messagesquare}
                                                                size={Dimension.verysmall}
                                                                color={colors.white}
                                                            />
                                                        </View>
                                                        : null
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {
                            parseInt(productDetail.request_status) === 0 ?
                                <View style={styles.submaintwo}>
                                    <View style={styles.viewMain}>
                                        <View style={styles.mainbtn}>
                                            <View style={styles.btnone}>
                                                <Button title={t('SuccessPopup.Delete')}
                                                    buttonStyle={styles.buttonone}
                                                    titleStyle={styles.title}
                                                    onPress={() => (props.setDeleteModal(true), props.setDeleteID(productDetail.id))}
                                                />
                                            </View>
                                            <View style={styles.btntwo}>
                                                <Button title={t('SuccessPopup.Edit')}
                                                    buttonStyle={styles.buttontwo}
                                                    onPress={() => props.action(productDetail.id)}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                : null
                        }
                    </View>
                    :
                    null

            }
            {
                note ?
                    <NoteItem
                        open={note}
                        Note={productDetail.request_note}
                        close={() => setNote(false)}
                    />
                    :
                    null
            }
            {
                items ?
                    <ItemDetailModal
                        open={items}
                        close={() => setItems(false)}
                        itemDetail={props && props.itemDetail ? props.itemDetail : ''}
                    />
                    :
                    null
            }
            <Loader loader={loader}></Loader>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: hp(10),
        marginBottom: vp(20),
        overflow: 'hidden',
    },
    submain: {
        backgroundColor: colors.white,
        paddingHorizontal: vp(20),
        paddingTop: vp(15),
        flexDirection: 'row',
        paddingBottom: vp(15),
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
        marginTop: vp(15),
        paddingBottom: vp(10),
    },
    viewtext: {
        flex: 1,
        paddingLeft: vp(15),
        justifyContent: 'center',
    },
    bonn: {
        fontSize: fp(16),
        fontFamily: Font.semiBold,
        color: colors.black,
        textTransform : 'capitalize'
    },
    viewmain: {
        flexDirection: 'row',
    },
    viewone: {
        flex: .70,
    },
    viewtwo: {
        flex: .30,
        // backgroundColor: 'red'
    },
    pending: {
        fontSize: fp(13),
        fontFamily: Font.regular,
        color: colors.black,
    },
    viewpending: {
        backgroundColor: colors.Lgreen,
        // height: hp(21),
        paddingVertical: vp(4),
        paddingHorizontal: vp(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(15),
    },
    dairy: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.black,
        textTransform: 'capitalize'
    },
    num: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
        paddingTop: vp(4),
    },
    submaintwo: {
        backgroundColor: colors.white,
        borderTopWidth: 1.2,
        borderTopColor: colors.inputbordercol,
        marginHorizontal: vp(20),
    },
    viewMain: {
        backgroundColor: colors.white,
        paddingHorizontal: vp(20),
        paddingTop: vp(15),
        paddingBottom: vp(20),
        marginHorizontal: vp(-20),
    },
    mainbtn: {
        flexDirection: 'row',
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
    viewnum: {
        flexDirection: 'row',
    },
    vone: {
        flex: .89,
    },
    vtwo: {
        flex: .12,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
    },
    viewIcon: {
        height: hp(28),
        width: hp(28),
        borderRadius: hp(14),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Secondary,
    },
    categories: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingTop: hp(5),
        paddingRight: hp(5)
    }
});

export default MyItemReqList;