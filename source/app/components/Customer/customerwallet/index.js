import { Button, Icon, Input, Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { FlatList, ScrollView } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import WalletimgCom from '../../../CustomerComponent/Walletimg';
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import paymentController from '../../../../apis/Controller/paymentController/payment.controller';
import { RefreshControl } from 'react-native';
import { checkInOutDate, dateFormat } from '../../Helper/general';
import NoRecord from '../../../ShopComponent/NoRecord';
import { Images } from '../../../assets/global_style/images';
import { TouchableOpacity } from 'react-native';
import { t } from 'i18next';
import { ActivityIndicator } from 'react-native';
import { hp } from '../../../assets/global_style/fontsize';
import Loader from '../../Helper/loader';

const CustomerWallet = props => {
    let data = [
        { text: 100 },
        { text: 200 },
        { text: 500 },
        { text: 1000 },
        { text: 1500 },
        { text: 2000 },
    ];

    const [paymentDetails, setPaymentDetails] = useState([]);
    const [availiableBalance, setAvailiableBalance] = useState(null);
    const [loader, setLoader] = useState(false);
    const [amount, setAmount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [pagination, setPagination] = useState(true);
    const [page, setPage] = useState(1);
    const [fetching, setFetching] = useState(false);

    const isFocus = useIsFocused();
    useEffect(() => {
        setLoader(true);
        getPaymentDetails(1);
        setPage(1);
        setAmount(0);
    }, [isFocus]);

    const getPaymentDetails = async (page) => {
        let post = {
            page: page ? page : 1,
        };
        let response = await paymentController.walletLogs(post);
        if (response && response.status) {
            setAvailiableBalance(response.user_balance);
            let list = response.listing;
            if (list.length > 0) {
                if (post.page === 1) {
                    setPaymentDetails(list);
                } else {
                    setPaymentDetails([...paymentDetails, ...list]);
                }
                if (list.length < 20) {
                    setPagination(false);
                }
                else {
                    setPagination(true);
                }
                setPage(post.page + 1);
                setRefreshing(false);
            } else {
                setPagination(false);
                if (post.page === 1) {
                    setPaymentDetails([]);
                }
                setRefreshing(false);
            }
        }
        setFetching(false);
        setLoader(false);
        setRefreshing(false);
    };

    const onRefresh = () => {
        getPaymentDetails(1);
    };

    const handlePayment = (payment) => {
        setAmount(() => parseInt(amount) + payment)
    };

    const getWebView = () => {
        props.navigation.navigate('webview', { amount: amount });
    };

    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            getPaymentDetails(page);
        }
    };


    const renderFooter = () => {
        if (fetching) {
            return (
                <>
                    {fetching ? (
                        <ActivityIndicator
                            color={colors.primary}
                            size={'large'}
                            style={{ alignSelf: 'center', marginBottom: hp(20) }}
                        />
                    ) : null}
                </>
            );
        }
        else {
            return <View style={{ height: hp(25) }} />;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scroll}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.main}>
                <View style={base.container}>
                    <View style={styles.viewwal}>
                        <WalletimgCom
                            availiableBalance={availiableBalance}

                        />
                    </View>
                    <View style={styles.viewadd}>
                        <Input placeholder={t('myProfilePages.Enter Amount')}
                            keyboardType='number-pad'
                            value={amount > 0 ? (amount).toString() : ''}
                            leftIcon={<Icon type={IconsType.fontAwesome}
                                name={Icons.rupee}
                                size={Dimension.docicon}
                                color={colors.black}
                            />
                            }
                            errorStyle={styles.error}
                            onChangeText={(e) => setAmount(e)}
                        />
                        <View style={styles.view}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {data.map((item, i) => (
                                    <TouchableOpacity onPress={() => handlePayment(item.text)} key={i}>
                                        <View style={styles.viewtext}>
                                            <Icon
                                                name={Icons.plus}
                                                type={IconsType.entypo}
                                                size={Dimension.Vsmall}
                                                color={colors.black}
                                            />
                                            <Icon
                                                name={Icons.rupee}
                                                type={IconsType.fontAwesome}
                                                size={Dimension.small}
                                                color={colors.black}
                                            />
                                            <Text style={styles.num}>{item.text}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        {

                            <View style={styles.viewbtn}>
                                <Button
                                    title={t('myProfilePages.Add Money to wallet')}
                                    buttonStyle={amount ? styles.btnstyle : styles.btnstyle22}
                                    onPress={() => { amount ? getWebView() : null }}
                                />
                            </View>
                        }
                    </View>
                    <View style={styles.paymentMain}>
                        <Text style={styles.payment}>{t("myProfilePages.Payment History")}</Text>
                    </View>
                    <View style={styles.viewflat}>
                        <FlatList
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.flat}
                            data={paymentDetails}
                            onEndReached={getMore}
                            ListFooterComponent={renderFooter}
                            onEndReachedThreshold={0.1}
                            ListEmptyComponent={() => <NoRecord image={Images.cashflow} message={t('EmptyStates.No transactions Found')} submain={styles.nodata} />}
                            keyExtractor={(item, index) => (index)}
                            renderItem={({ item, index }) => (
                                <View style={[styles.viewmain]}>
                                    <View style={styles.submain}>
                                        <View style={base.col8}>
                                            {item && item.payment_id ? <Text style={styles.number}>{t("myProfilePages.Payment Id")} : {item.payment_id}</Text> : null}
                                            {item && item.order_register_id ? <Text style={styles.number}>{t("myProfilePages.Order Id")} : {item.order_register_id}</Text> : null}
                                            {item && item.created_at ? <Text style={styles.date}>{dateFormat(item.created_at)}   |   {checkInOutDate(item.created_at)}</Text> : null}
                                        </View>
                                        <View style={[base.col4,{justifyContent:"center",alignItems:'flex-end'}]}>
                                            {item.amount ? <Text style={styles.count}>₹ {item.amount}</Text> : null}
                                            {
                                               item && item.type ?
                                                    <View style={[styles.viewpending, item.type === 'IN' ? { backgroundColor: colors.offLgreen } : { backgroundColor: colors.RedL }]}>
                                                        <Text style={[styles.success, item.type === 'IN' ? { color: colors.parrotgreen } : { color: colors.red }]}>{item.type === 'IN' ? t('myProfilePages.IN') : item.type === "OUT" ? t('myProfilePages.OUT') : null}</Text>
                                                    </View>
                                                    :
                                                    null
                                            }
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>

                </View>
            </View>
            <Loader loader={loader}></Loader>
        </ScrollView>
    );
};
export default CustomerWallet;
