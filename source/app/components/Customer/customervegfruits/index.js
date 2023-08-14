import { useIsFocused } from '@react-navigation/native';
import { Header, Icon, Image, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, LogBox, RefreshControl, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import shopsController from '../../../../apis/Controller/shops.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { hp, vp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import Filter from '../../../ShopComponent/Filter';
import NoRecord from '../../../ShopComponent/NoRecord';
import StoreListing from '../../../ShopComponent/StoreListing';
import { compareObj, renderImage } from '../../Helper/general';
import LocationService from '../../Helper/loaction';
import Loader from '../../Helper/loader';
import { totalPrice } from '../../Helper/orderHelpers';
import BottomAddedCart from '../../Helper/showCartBottom';
import { styles } from './style';

const CustomerVegFruit = (props) => {
    const navigationParams = props && props.route && props.route.params;
    const [filter, setFilter] = useState();
    const [shops, setShops] = useState([]);
    const [values, setValues] = useState(null);
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [keyword, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [pagination, setPagination] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [totalValue, setTotalvalue] = useState(0);
    const [SearchLoader, setSearchLoader] = useState(false);
    const isFocus = useIsFocused();
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (isFocus) {
            setValues(null);
            getShopsListing("", 1);
            setLoader(true);
            setPage(1);
        }
        getAddress();
    }, [isFocus]);

    useEffect(() => {
        handleTotal();
    }, [props && props.products]);

    const getShopsListing = async (search, page) => {
        let post = {
            search: search,
            page: page ? page : 1,
            category: navigationParams && navigationParams.item ? navigationParams.item.id : null,
        };
        let response = await shopsController.shopsListing(post)
        if (response && response.status) {
            let list = response.shops;
            if (list.length > 0) {
                if (post.page === 1) {
                    setShops(list);
                } else {
                    setShops([...shops, ...list]);
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
                    setShops([]);
                }
                setRefreshing(false);
            }
        }
        setFetching(false);
        setLoader(false);
        setRefreshing(false);
        setSearchLoader(false);
    };

    const reRenderApi = () => {
        getShopsListing("", 1);
    };

    const getAddress = async () => {
        const grant = await new LocationService().checkLocation();
        if (grant == false) {
            await new LocationService().location();
        } else {
            await new LocationService().location();
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getShopsListing("", 1);
    };

    const handleTotal = () => {
        let total = totalPrice(value);
        setTotalvalue(total);
    }
    const search = useCallback(debounce(getShopsListing, 1000), []);
    const value = props && props.products

    const dummy = {
        "category": [],
        "shopType": [],
        "shopkeeperType": [],
        "shopStatus": "",
        "location": "",
        "homeDelivery": "",
    };

    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            getShopsListing(keyword, page);
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
        <View style={styles.main}>
            <Header
                placement="center"
                containerStyle={styles.container}
                style={styles.header}
                leftContainerStyle={{ justifyContent: 'center' }}
                leftComponent={{
                    type: IconsType.antDesign,
                    icon: Icons.arrowleft,
                    color: colors.white,
                    style: styles.icon,
                    size: Dimension.large,
                    onPress: () => props.navigation.goBack(),
                }}
                centerComponent={<Text numberOfLines={1} style={styles.title}>{navigationParams && navigationParams.item ? navigationParams.item.category_name ? navigationParams.item.category_name : navigationParams.item.name : 'Veg & Fruits'}</Text>}
                rightComponent={
                    <TouchableOpacity onPress={() => props.navigation.navigate('customermyprofile')}>
                        <View style={styles.mainImage}>
                            <Image style={styles.image}
                                source={props.user && props.user.image ? renderImage(props.user.image, 'medium') : Images.user}
                            />
                        </View>
                    </TouchableOpacity>}
                statusBarProps={{
                    barStyle: 'light-content',
                    backgroundColor: colors.Secondary,
                    translucent: true
                }}
            />
            {!loader && <>
                <View style={styles.viewmain}>
                    <View style={base.row}>
                        <View style={base.col10}>
                            <Input placeholder={t('home.Search for shops in your city')}
                                leftIcon={<Icon type={IconsType.antDesign}
                                    name={Icons.search1}
                                    size={Dimension.verysmall}
                                    color={colors.grey}
                                />}
                                rightIcon={
                                    SearchLoader ? (
                                        <ActivityIndicator
                                            color={colors.black}
                                            size={'small'}
                                            style={{ alignSelf: 'center' }}
                                        />
                                    ) :
                                        null
                                }
                                inputContainerStyle={styles.inputcontainer}
                                value={keyword}
                                onChangeText={e => {
                                    setSearch(e);
                                    search(e);
                                    setSearchLoader(true);
                                }}
                            />
                        </View>
                        <View style={base.col2}>
                            {compareObj(props && props.filter, dummy) === false ? <View style={{ height: hp(15), width: hp(15), borderRadius: hp(10), backgroundColor: 'red', position: 'absolute', top: 0, right: 10, zIndex: 99999 }} /> : null}
                            <TouchableOpacity onPress={() => setFilter(true)} >
                                <View style={[styles.viewicon]}>
                                    <View style={styles.mainimage}>
                                        <Image style={styles.image}
                                            source={Images.lines}
                                            resizeMode='stretch' />

                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[base.container, { flex: 1, }]}>
                    <FlatList
                        style={{ paddingTop: vp(100), }}
                        ListHeaderComponent={() => {
                            return (<View style={{ marginBottom: hp(10) }}>
                                <Text style={styles.store}>Shops in your city</Text>
                            </View>)
                        }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
                        contentContainerStyle={styles.Flat}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        data={shops}
                        onEndReached={getMore}
                        ListFooterComponent={renderFooter}
                        onEndReachedThreshold={0.1}
                        keyExtractor={(i, index) => index}
                        ListEmptyComponent={() => <NoRecord image={Images.store} message={t('EmptyStates.No Shop Found')} submain={styles.emptyState} />}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <StoreListing
                                item={item}
                                action={(item) => props.navigation.navigate('customerstore', { item: item })}
                            />
                        )}
                    />
                </View>
                {props.products.length > 0 ?
                    <BottomAddedCart
                        navigation={props.navigation}
                        withoutBottom={true}
                        action={() => props.navigation.navigate('customercart')}
                    />
                    : null}
            </>}
            {filter ?
                <Filter
                    open={filter}
                    close={() => setFilter(false)}
                    reRenderApi={() => reRenderApi()}
                    navigation={props.navigation}
                />
                : null}
            <Loader loader={loader}></Loader>
        </View>
    )
};
const mapStateToProps = state => ({
    user: state.UserReducer.user,
    products: state.AddToCartReducer.products,
    filter: state.filtersReducer.filters,
});
export default connect(mapStateToProps)(CustomerVegFruit);