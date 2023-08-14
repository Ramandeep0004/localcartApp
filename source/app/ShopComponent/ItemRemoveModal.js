import { useIsFocused } from '@react-navigation/native';
import { Button, Icon, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import OrderController from '../../apis/Controller/order.controller';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { compareTwoStrings, renderImage } from '../components/Helper/general';
import { Toaster } from '../components/Helper/Toaster';
import NotesModal from './NotesModal';
import NotesOrder from './NotesOrder';
import OrderItemRemove from './OrderItemRemoveModal';


const ItemRemoveModal = props => {
    const { requestId, originalOrderId, originalAddress } = props;
    const [itemReqDetails, setItemReqDetails] = useState(null);
    const [loader, setLoader] = useState(false);
    const [note, setNote] = useState(false);
    const [message, setMessage] = useState(null);
    const [shownote, setShownote] = useState(true);
    const [finalTotalValue, setFinalTotalvalue] = useState(null);
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getOrderDetails();
        }
    }, [isFocus]);

    const getOrderDetails = async () => {
        setLoader(true);
        let response = await OrderController.orderRequestDetails(requestId);
        if (response && response.status) {
            setItemReqDetails(response.page);
            setLoader(false);

        } else {
            setLoader(false);
        }
    };

    const submitRequest = async (e) => {
        let post = {
            order_request_id: originalOrderId,
            order_id: requestId,
            status: e
        }
        setLoader(true);
        let response = await OrderController.orderRequestAction(post);
        if (response && response.status) {
            props.close();
            props.getOrderDetails();
            setLoader(false);
            new Toaster().success(response.message);

        } else {
            setLoader(false);
        }
    };

    const handleComment = async (e) => {
        setMessage(e.comment);
        setNote(true);
    }


    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} >
                {/* <Toast config={ToastConfig} /> */}
                {itemReqDetails && <View style={styles.maincontainer}>
                    <ScrollView nestedScrollEnabled={true}>
                        <View style={base.container}>
                            <View style={styles.viewmain}>
                                <View style={styles.viewone}>
                                    <Text style={styles.Item}>{t("orderEditRequest.Order Edit Request")}</Text>
                                </View>
                                <View style={styles.viewtwo}>
                                    <TouchableOpacity onPress={() => props.close()}>
                                        <View style={styles.viewicon}>
                                            <Icon type={IconsType.antDesign} 
                                            name={Icons.close} 
                                            color={colors.white} 
                                            size={Dimension.large} 
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* Packing-> Accepted orderList */}
                            <View>
                                <OrderItemRemove
                                    item={itemReqDetails}
                                    originalAddress={originalAddress}
                                />
                            </View>
                            {itemReqDetails.address ? <>
                                <Text style={styles.delivery}>{compareTwoStrings(originalAddress, itemReqDetails && itemReqDetails.address) ? t('orderEditRequest.Delivery Address') : t('orderEditRequest.Delivery Address updated')}</Text>
                                {compareTwoStrings(originalAddress, itemReqDetails && itemReqDetails.address) ?
                                    <View style={styles.viewran}>
                                        <Text style={styles.south}>{itemReqDetails.address}</Text>
                                    </View> : <>
                                        <View style={styles.viewsouth}>
                                            <Text style={styles.south}>{itemReqDetails.address}</Text>
                                        </View>
                                        {originalAddress ? <View style={styles.viewran}>
                                            <Text style={styles.south}>{originalAddress}</Text>
                                        </View> : null}
                                    </>}
                            </> : null}
                            {itemReqDetails.notes ? <View style={styles.viewMain}>
                                <View style={styles.vone}>
                                    <Text style={styles.note}>{t("orderEditRequest.Note")}</Text>
                                </View>
                                <View style={styles.vtwo}>
                                    <TouchableOpacity style={itemReqDetails.notes ? styles.viewIcon : styles.viewIcon22} onPress={() => setShownote(!shownote)}>
                                        <Icon type={IconsType.octIcon}
                                            name={Icons.pencil}
                                            color={itemReqDetails.notes ? colors.white : colors.Secondary}
                                            size={Dimension.verysmall}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View> : null}
                            {shownote && itemReqDetails.notes ? <NotesOrder Note={itemReqDetails.notes} /> : null}
                            {itemReqDetails && itemReqDetails.items.length > 0 ? <View style={styles.viewone}>
                                <Text style={styles.delivery}>{t("orderEditRequest.Updated Items")}</Text>
                            </View> : null}
                            {itemReqDetails && itemReqDetails.items.length > 0 ? <View style={styles.subCon}>
                                <FlatList
                                    nestedScrollEnabled={true}
                                    data={itemReqDetails.items}
                                    keyExtractor={(item, index) => (index)}
                                    renderItem={({ item, index }) => (
                                        <View style={itemReqDetails.items.length - 1 ==
                                            index ? styles.viewRow22 : styles.viewRow}>
                                            <View style={styles.mainimage}>
                                                <Image style={styles.image}
                                                    source={item.products_image ? renderImage(item.products_image, 'medium') : Images.bread}
                                                    resizeMode='contain'
                                                />
                                            </View>
                                            <View style={styles.mainview}>
                                                <View style={styles.mainone}>
                                                    <Text style={styles.bonn}>{item.item_name}{' '}{parseInt(item.quantity) > 0 ? 'X' : null}{' '}{parseInt(item.quantity) > 0 ? item.quantity : null}</Text>
                                                    <Text style={item.request_type === 'updated' ? styles.bonn22 : styles.bonn33}>{item.request_type}</Text>
                                                </View>
                                                <View style={styles.maintwo}>
                                                    {item.comment ? <TouchableOpacity style={styles.circle} onPress={() => handleComment(item)} >
                                                        <Icon type={IconsType.feather}
                                                            name={Icons.messagesquare}
                                                            color={colors.white}
                                                            size={Dimension.verysmall}
                                                            onPress={() => setNote(true)}
                                                        />
                                                    </TouchableOpacity> : null}
                                                </View>
                                            </View>

                                        </View>
                                    )}
                                />
                            </View> : null}
                            <View style={styles.mainbtn}>
                                <View style={styles.btnone}>
                                    <Button title={t('orderEditRequest.Decline')}
                                        buttonStyle={styles.buttonone}
                                        titleStyle={styles.title}
                                        onPress={() => submitRequest(2)}
                                    />
                                </View>
                                <View style={styles.btntwo}>
                                    <Button title={t('orderEditRequest.Accept')}
                                        buttonStyle={styles.buttontwo}
                                        onPress={() => submitRequest(1)}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>}
                {
                    note && message ?
                        <NotesModal
                            item={message}
                            open={note}
                            close={() => setNote(false)}
                        />
                        :
                        null
                }
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: vp(20),
        margin: 0,
    },
    maincontainer: {
        backgroundColor: colors.white,
        paddingTop: vp(15),
        // paddingHorizontal: vp(20),
        width: '91%',
        maxHeight: '97.5%',
        borderRadius: vp(10),
        paddingBottom: vp(20)
    },
    viewmain: {
        flexDirection: 'row',
    },
    Item: {
        fontSize: fp(22),
        color: colors.black,
        fontFamily: Font.regular,
    },
    viewone: {
        flex: .89,
        justifyContent: 'center',
    },
    viewtwo: {
        flex: .11,
        // backgroundColor: 'red'
    },
    viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    delivery: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
        marginTop: vp(15),
    },
    south: {
        color: colors.lightgrey,
        fontSize: fp(15),
        fontFamily: Font.regular,
    },
    viewsouth: {
        marginTop: vp(20),
        paddingHorizontal: vp(20),
        paddingVertical: vp(20),
        backgroundColor: colors.btngrey,
        borderRadius: hp(10),
    },
    viewran: {
        marginTop: vp(15),
        paddingHorizontal: vp(20),
        paddingVertical: vp(20),
        borderColor: colors.btngrey,
        borderWidth: 1,
        borderRadius: hp(10),
    },
    viewMain: {
        flexDirection: 'row',
        marginTop: vp(20),
    },
    vone: {
        flex: .9,
    },
    vtwo: {
        flex: .1,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
    },
    note: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    viewIcon: {
        height: hp(30),
        width: hp(30),
        borderRadius: hp(15),
        backgroundColor: colors.Secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.Secondary,
        borderWidth: hp(1),
    },
    viewIcon22: {
        height: hp(30),
        width: hp(30),
        borderRadius: hp(15),
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: hp(1),
        borderColor: colors.Secondary
    },
    subCon: {
        backgroundColor: colors.GreyL,
        borderRadius: hp(10),
        paddingHorizontal: vp(20),
        paddingTop: vp(20),
        paddingBottom: vp(10),
        marginTop: vp(20),
        maxHeight: hp(270),
    },
    viewRow: {
        flexDirection: 'row',
        marginBottom: vp(10),
        paddingBottom: vp(10),
        borderBottomWidth: 1,
        borderBottomColor: colors.btngrey,
        alignItems: 'center',
    },
    viewRow22: {
        flexDirection: 'row',
        marginBottom: vp(10),
        // paddingBottom: vp(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(40),
        width: hp(42),
        overflow: 'hidden',
    },
    bonn: {
        fontSize: fp(16),
        fontFamily: Font.semiBold,
        color: colors.black,
        paddingLeft: vp(20),
        textTransform: 'capitalize',
    },
    bonn22: {
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.black,
        marginTop: vp(5),
        marginLeft: vp(20),
        textTransform: 'capitalize',
        height: hp(18),
        width: hp(60),
        borderRadius: hp(20),
        backgroundColor: colors.Lgreen,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden'
    },
    bonn33: {
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.black,
        marginLeft: vp(20),
        marginTop: vp(5),
        textTransform: 'capitalize',
        height: hp(18),
        width: hp(60),
        borderRadius: hp(20),
        backgroundColor: colors.lightred,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
    },
    mainview: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainone: {
        flex: .90,
        alignSelf: 'center',

    },
    maintwo: {
        flex: .10,
        // backgroundColor: 'green',
        alignItems: 'flex-end',
    },
    circle: {
        height: hp(28),
        width: hp(28),
        borderRadius: hp(14),
        backgroundColor: colors.Secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainbtn: {
        flexDirection: 'row',
        marginHorizontal: vp(20),
        marginTop: vp(20),
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
    subcontainer: {
        backgroundColor: colors.white,
        marginTop: vp(20),
        paddingHorizontal: hzp(20),
        paddingVertical: vp(20),
        borderRadius: hp(10),
        marginHorizontal: vp(2),
        overflow: 'hidden',
    },
    checkcon: {
        margin: 0,
        padding: 0,
        marginHorizontal: 0,
        backgroundColor: colors.white,
        marginLeft: vp(-5)
    },
    flat: {
        paddingBottom: vp(10),
    },
    SubMain: {
        borderBottomWidth: 1,
        borderBottomColor: colors.LLgrey,
        marginBottom: vp(15),
        paddingBottom: vp(15),
    },
    textqr: {
        fontSize: fp(16),
        color: colors.Secondary,
        fontFamily: Font.regular,
    },
    Pending: {
        fontSize: fp(13),
        color: colors.black,
        fontFamily: Font.regular,
    },
    viewpending: {
        height: hp(23),
        width: hp(70),
        borderRadius: hp(20),
        backgroundColor: colors.Lgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewaccept: {
        height: hp(23),
        width: hp(70),
        borderRadius: hp(20),
        backgroundColor: colors.offLgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accept: {
        fontSize: fp(13),
        color: colors.parrotgreen,
        fontFamily: Font.regular,
    },
    mainpend: {
        alignItems: 'flex-end',
        marginRight: vp(-5)
    },
    item: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        paddingTop: vp(2)
    },
    amount: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.regular,
    },
    rupee: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.semiBold,
    },
    pick: {
        fontSize: fp(11),
        color: colors.lightgrey,
        fontFamily: Font.regular,
    },
    viewrow: {
        alignItems: 'flex-end',
        paddingTop: vp(4)
    },
    viewpay: {
        marginTop: vp(8),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    MainImage: {
        height: hp(50),
        width: hp(50),
        borderRadius: hp(25),
        overflow: 'hidden',
    },
    MainView: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: vp(15)
    },
    Vone: {
        flex: .85,
        // backgroundColor: 'green',
    },
    Vtwo: {
        flex: .15,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    bablu: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    lore: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        marginTop: vp(-2),
        paddingLeft: vp(5)
    },
    viewloc: {
        marginTop: vp(2),
        paddingLeft: vp(2)
    },
    Viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainSub: {
        flexDirection: 'row',
        marginTop: vp(5),
        marginBottom: vp(5),
        paddingBottom: vp(10),
        borderBottomWidth: 1,
        borderBottomColor: colors.bottomline,
    },
    mainSub222: {
        flexDirection: 'row',
        marginTop: vp(5),
        marginBottom: vp(5),
        paddingBottom: vp(10),
        // borderBottomWidth: 1,
        // borderBottomColor: colors.bottomline,
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
    priceMain: {
        marginTop: hp(10),
        backgroundColor: colors.GreyL,
        justifyContent: 'center',
        paddingHorizontal: hp(10),
        borderRadius: hp(5),
        alignItems: 'center'
    },
    count: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    borderliness: {
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
    }

});

export default ItemRemoveModal;
