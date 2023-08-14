import { useIsFocused } from '@react-navigation/native';
import { Button, Header, Icon, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { SectionList } from 'react-native';
import { FlatList, LogBox, RefreshControl, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import filtersController from '../../../../apis/Controller/actionController';
import shopsController from '../../../../apis/Controller/shops.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { hp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import CategoriesModal from '../../../CustomerComponent/Categories';
import NewFeatureItem from '../../../CustomerComponent/newFeatureList';
import NoRecord from '../../../ShopComponent/NoRecord';
import ShopStoreLoc from '../../../ShopComponent/ShopStoreLocation';
import { renderImage } from '../../Helper/general';
import Loader from '../../Helper/loader';
import BottomAddedCart from '../../Helper/showCartBottom';
import SuccessPopup from '../../Helper/successPopup';
import { styles } from './style';

let ref = null;
const ShopStore = (props) => {
    const navigationParams = props && props.route && props.route.params;
    const ref = useRef();
    const [deleteCart, setDeleteCart] = useState(false);
    const [category, setCategory] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [singleItem, setSingleItem] = useState();
    const [arr, setArr] = useState([]);
    const [loader, setLoader] = useState(false);
    const [shopDetail, setShopDetail] = useState();
    const [productCategories, setProductCategories] = useState([]);
    const [productCategoriesList, setProductCategoriesList] = useState([]);
    const [noProductFound, setNoProductFound] = useState(false);
    const isFocus = useIsFocused()
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (isFocus) {
            getData();
            setResentVisitShopsFilter();
            setLoader(true)
        }
    }, [isFocus]);

    const isExist = (id) => {
        let filters = { ...props.searchFilter };
        let shops = [...filters.shops];
        let array = [...shops];
        let index = array.findIndex((item) => item.id === id);
        return index === -1 ? false : index;
    };

    const setResentVisitShopsFilter = async () => {
        let item = navigationParams.item
        let shopDetail = {
            id: item.id,
            shop_name: item.shop_name,
            shop_type: item.shop_type,
            image: item.image,
            status: item.status,
            address: item.address,
        }
        let filters = { ...props.searchFilter };
        let shops = [...filters.shops];
        let status = await isExist(item.id);
        if (status === false) {
            if (shops.length > 3) {
                shops.splice(3, 1);
                shops.unshift(shopDetail);
            }
            else {
                if (shops.length === 0) {
                    shops.push(shopDetail);
                }
                else if (shops.length > 0) {
                    shops.unshift(shopDetail);
                }
            }
        }
        else return shops
        filters = {
            ...filters,
            shops: shops,
        }
        await filtersController.setResentVisitShopsFilter(filters);
    };

    const checkEmptyStates = async (list) => {
        let showEmptyState = false;
        for (let i in list) {
            if (list[i].data.length > 0) {
                showEmptyState = false;
                return false;
            }
            else {
                showEmptyState = true;
            }
        }
        return showEmptyState;
    };

    const getData = async () => {
        const value = props && props.products;
        let post = {
            id: navigationParams && navigationParams.item ? navigationParams.item.id : null,
            category: arr
        };

        let response = await new shopsController.shopDetail(post)
        if (response && response.status) {
            setLoader(false)
            setShopDetail(response && response.shop);
            if (response && response.shop && response.shop.products_categories.length > 0) {
                let cats = [];
                let list = response && response.shop && response.shop.products_categories;

                let result = await checkEmptyStates(list);
                setNoProductFound(result);
                for (let i in list) {
                    cats.push({
                        id: list[i].id,
                        name: list[i].category_name,
                        count: list[i].data.length
                    });
                    if (!result) {
                        for (let j in list[i].data) {
                            let existed_item = value.find(item => item.id === list[i].data[j].id && item.shop_id === list[i].data[j].shop_id)
                            if (existed_item) {
                                list[i].data[j]['quantity'] = existed_item && existed_item.quantity ? existed_item.quantity : 0;
                            } else {
                                list[i].data[j]['quantity'] = 0;
                            }
                        }
                    }

                }
                setProductCategoriesList(cats);
                setProductCategories(list)

                setRefreshing(false);
            } else {
                setProductCategories([])
            }
        }
        setLoader(false)
        setRefreshing(false);
    };


    const isExist2 = (id) => {
        let array = [...productCategories];
        let index = array.findIndex((item) => item.id === id);
        return index === -1 ? false : index;
    };


    const setItems = async (item, index) => {
        let list = [...productCategories]
        let list2 = [...productCategoriesList]
        let status = await isExist2(item.id);

        if (status !== false) {
            let itemDetail = list[status]
            list.splice(status, 1);
            list2.splice(status, 1);
            list2.unshift({
                id: itemDetail.id,
                name: itemDetail.category_name,
                count: itemDetail.data.length
            })
            list.unshift(itemDetail);
        }
        setProductCategoriesList(list2);
        setProductCategories(list);
        setCategory(false);
        ref.current.scrollToLocation({
            sectionIndex: 0,
            itemIndex: 0,
        })
    };


    const onRefresh = () => {
        setRefreshing(true);
        getData();
    };


    const addToCart = async (item) => {
        const value = props && props.products ? [...props.products] : [];
        let array = [...productCategories];
        if (value.length > 0) {
            if (item.shop_id === value[0].shop_id) {
                item = { ...item, quantity: item.quantity++ };
                setProductCategories(array);
                await new filtersController.setAddToCarts(item);
            } else {
                setDeleteCart(true);
                setSingleItem(item);
            }
        } else {
            item = { ...item, quantity: item.quantity++ };
            setProductCategories(array);
            await new filtersController.setAddToCarts(item);
        }

    };

    const setArray = async () => {
        const value = props && props.products ? [...props.products] : [];
        let list = [...productCategories];
        for (let i in list) {
            if (list[i].data.length > 0) {
                for (let j in list[i].data) {
                    let existed_item = value.find(item => item.id === list[i].data[j].id && item.shop_id === list[i].data[j].shop_id)
                    if (existed_item) {
                        list[i].data[j]['quantity'] = existed_item && existed_item.quantity ? existed_item.quantity : 0;
                    } else {
                        list[i].data[j]['quantity'] = 0;
                    }
                }
            }
        }
        setProductCategories(list)
    };


    const removeFromCart = async (item) => {
        let array = [...productCategories];
        item = { ...item, quantity: item.quantity-- }
        setProductCategories(array);
        await new filtersController.setRemoveFromCarts(item);

    };

    // const handleTotal = () => {
    //     let total = totalPrice(value);
    //     setTotalvalue(total);
    // }

    const onConfirm = async () => {
        setDeleteCart(false);
        await new filtersController.setEmptyCarts();
        let array = [...productCategories];
        let item = { ...singleItem, quantity: singleItem.quantity++ }
        setProductCategories(array);
        await new filtersController.setAddToCarts(item);
    };

    const renderItem = ({ section, index }) => {
        if (index !== 0) return null;
        return (
            <FlatList
                style={{ flex: 1, paddingLeft: hp(15), paddingBottom: hp(15) }}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                disableVirtualization={true}
                contentContainerStyle={styles.flat}
                data={section.data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(i, index) => index}
                numColumns={2}
                renderItem={({ item }) =>
                    <NewFeatureItem
                        item={item}
                        shopDetail={shopDetail}
                        navigation={props.navigation}
                        addcart={(item) => addToCart(item)}
                        removecart={(item) => removeFromCart(item)}
                        setArray={() => setArray()}
                    />}
                windowSize={12}
            />

        )
    }

    return (
        <View style={styles.main}>
            <Header
                placement="center"
                containerStyle={styles.container}
                style={styles.header}
                leftComponent={{
                    type: IconsType.antDesign,
                    icon: Icons.arrowleft,
                    color: colors.white,
                    style: styles.icon,
                    size: Dimension.large,
                    onPress: () => props.navigation.goBack(),
                }}
                centerComponent={<Text numberOfLines={1} style={styles.title}>{navigationParams && navigationParams.item && navigationParams.item.shop_name ? navigationParams.item.shop_name : shopDetail ? shopDetail.shop_name : ""}</Text>}
                rightComponent={<TouchableOpacity onPress={() => props.navigation.navigate('myprofileshop')}>
                    <View style={styles.mainImage}>
                        <Image style={styles.image}
                            source={props && props.user && props.user.image ? renderImage(props && props.user && props.user.image) : Images.user}
                        />
                    </View>
                </TouchableOpacity>}
                statusBarProps={{
                    barStyle: 'light-content',
                    backgroundColor: colors.Secondary,
                    translucent: true
                }}
            />
            {
                loader === false ?
                    <View style={{ flex: 1 }}>
                        <View style={[{ flex: 1 }]}>
                            <View style={styles.viewstore}>
                                {shopDetail ?
                                    <ShopStoreLoc
                                        item={shopDetail}
                                        showtext={true}
                                        showbtn={true}
                                        showText={false}
                                        showBtn={false}
                                    />
                                    : null
                                }
                            </View>
                            {
                                noProductFound === false ?
                                    <SectionList
                                        ref={ref}
                                        stickySectionHeadersEnabled
                                        showsVerticalScrollIndicator={false}
                                        disableVirtualization={true}
                                        contentContainerStyle={[
                                            styles.scroll3, {
                                                paddingBottom: props && props.products.length > 0 ? hp(180) : hp(50)
                                            }]}
                                        style={{ flex: 1 }}
                                        sections={productCategories}
                                        keyExtractor={(item, index) => index}
                                        renderSectionHeader={({ section: { title, data } }) => {
                                            return (
                                                <View
                                                    style={[styles.submain2]}
                                                >
                                                    {
                                                        data && data.length > 0 ?
                                                            <View style={styles.viewtext}>
                                                                <Text style={styles.feature}>{title}</Text>
                                                            </View>
                                                            :
                                                            null
                                                    }
                                                </View>)
                                        }}
                                        renderItem={renderItem}
                                        refreshControl={
                                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                        }
                                    />
                                    :
                                    <NoRecord
                                        image={Images.noCategory}
                                        message={t('EmptyStates.No Product Found')}
                                        submain={styles.submain}
                                    />

                            }
                        </View>

                    </View>
                    :
                    null
            }
            {
                category ?
                    <CategoriesModal
                        open={category}
                        close={() => setCategory(false)}
                        productsCategories={productCategoriesList}
                        setItems={(e, i) => setItems(e, i)}
                        setProductCategoriesList={(e) => setProductCategoriesList(e)}
                    />
                    :
                    null
            }
            <View style={[styles.met, { bottom: props && props.products.length > 0 ? hp(90) : 0, }]}>
                {
                    productCategoriesList.length > 1 && noProductFound === false && loader === false ?
                        <View style={[
                            styles.viewbrowse,
                        ]}>
                            {
                                !category
                                &&
                                <Button
                                    title={t('shopDetail.Browse Categories')}
                                    icon={<Icon
                                        name={Icons.list}
                                        type={IconsType.ionIcon}
                                        size={Dimension.verysmall}
                                        color={colors.white}
                                    />}
                                    buttonStyle={styles.buttonstyle}
                                    onPress={() => setCategory(true)} />
                            }
                        </View>
                        :
                        null
                }

            </View>
            {props && props.products.length > 0 && !loader ?
                <BottomAddedCart
                    navigation={props.navigation}
                    shopDetail={shopDetail}
                    withoutBottom={true}
                    action={() => props.navigation.navigate('mycart')}
                />
                : null}
            {loader ? <Loader loader={loader} /> : null}

            {deleteCart ? <SuccessPopup
                open={deleteCart}
                close={() => setDeleteCart(false)}
                onConfirm={() => onConfirm()}
                RightButtonText={t("SuccessPopup.Proceed")}
                message={t('SuccessPopup.Doyouwantemptyyourcart?')}
                message1={t('SuccessPopup.For_adding_new')}
                label={t("SuccessPopup.Cart not empty?")}
            /> : null}
        </View>
    )
};
const mapStateToProps = state => ({
    user: state.UserReducer.user,
    products: state.AddToCartReducer.products,
    searchFilter: state.SearchFilter.search,
});
export default connect(mapStateToProps)(ShopStore);
