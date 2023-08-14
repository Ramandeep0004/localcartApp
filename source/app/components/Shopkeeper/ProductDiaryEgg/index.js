import { useIsFocused } from '@react-navigation/native';
import { Button, Header, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import shopkeeperItemController from '../../../../apis/Controller/shopkeeper/shopkeeperItem.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { hp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import BreadSwitchList from '../../../ShopComponent/BreadSwitchList';
import NoRecord from '../../../ShopComponent/NoRecord';
import { renderImage } from '../../Helper/general';
import Loader from '../../Helper/loader';
import { Toaster } from '../../Helper/Toaster';
import { styles } from './style';

const ProductDiaryEgg = (props) => {
    let navigationParams = props && props.route && props.route.params;
    let categoryDetail = navigationParams && navigationParams.categoryDetail ? navigationParams.categoryDetail : null

    const [products, setProducts] = useState([]);
    const [shopDetail, setShopDetail] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [activeAllProducts, setActiveAllProducts] = useState(false);
    const [loader, setLoader] = useState(false);
    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            getProducts(1);
            setPage(1);
            setLoader(true);
        }
    }, [isFocus]);

    useEffect(() => {
        if (isFocus && products) {
            checkAllProductsStatus();
        }
    }, [isFocus, products]);

    const getProducts = async (page) => {
        let post = {
            category_id: categoryDetail ? categoryDetail.id : '',
            page: page ? page : 1,
        };

        let response = await shopkeeperItemController.categoriesWiseProductListing(post);
        if (response && response.status) {
            setShopDetail(response.shop);
            let list = response.products;
            if (list.length > 0) {
                if (post.page === 1) {
                    setProducts(list);
                } else {
                    setProducts([...products, ...list]);
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
                    getProducts([]);
                }
                setRefreshing(false);
            }
        }
        setFetching(false);
        setLoader(false);
        setRefreshing(false);
    };

    const isAllProductActive = (list) => {
        let status = false
        for (let i in list) {
            if (list[i].status === 0) {
                status = false
                return false
            }
            else {
                status = true
            }
        }
        return status
    };

    const checkAllProductsStatus = () => {
        let list = [...products];
        let status = isAllProductActive(list);
        if (status) {
            setActiveAllProducts(true);
        }
        else {
            setActiveAllProducts(false);
        }
    };

    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            getProducts(page);
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

    const onRefresh = () => {
        setRefreshing(true);
        getProducts(1);
    };

    const disableProduct = async (itemDetail) => {
        let post = {
            product_id: itemDetail ? itemDetail.id : ''
        }
        let response = await shopkeeperItemController.disableProduct(post);
        if (response && response.status) {
            let array = [...products];
            let index = array.findIndex(item => item.id === itemDetail.id);
            if (index != -1) {
                if (parseInt(itemDetail.status) === 1) {
                    array[index].status = 0;
                }
                else {
                    array[index].status = 1;
                }
            }
            setProducts(array);
            new Toaster().success(response.message);
        }
        else {
            return;
        }
    };

    const handleAllProductActive = async () => {
        if (activeAllProducts) {
            let response = await shopkeeperItemController.disableAllProduct();
            if (response && response.status) {
                let array = [...products];
                for (let i in array) {
                    array[i].status = 0;
                }
                setProducts(array);
                setActiveAllProducts(false);
                new Toaster().success(response.message);
            }
            else return;
        }
        else {
            let response = await shopkeeperItemController.enableAllProduct();
            if (response && response.status) {
                new Toaster().success(response.message);
                let array = [...products];
                for (let i in array) {
                    array[i].status = 1;
                }
                setProducts(array);
                setActiveAllProducts(true);
            }
            else return;
        }
    };
    
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
                centerComponent={categoryDetail ? <Text style={styles.title}>{categoryDetail.name}</Text> : null}
                rightComponent={<TouchableOpacity onPress={() => props.navigation.navigate('shopprofile')}>
                    <View style={styles.mainImage}>
                        <Image style={styles.image}
                            source={props && props.user && props.user.image ? renderImage(props.user.image) : Images.user}
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
                <View style={base.container}>
                    {
                        products && products.length > 0 ?
                            <View style={styles.viewrow}>
                                <View style={styles.viewone}>
                                    <Text style={styles.custom}>{t("Catalogue.Product Catalogue")}</Text>
                                    <Text style={styles.message}>{t("Catalogue.Adjust your product catalogue. You can publish/unpublish any item in your shop.")}</Text>
                                </View>
                                <View style={styles.viewtwo}>
                                    <ToggleSwitch
                                        isOn={activeAllProducts}
                                        onColor={colors.primary}
                                        offColor={colors.darkgrey}
                                        size='medium'
                                        onToggle={isOn => handleAllProductActive()}
                                        animationSpeed={300}
                                    />
                                </View>
                            </View>
                            :
                            null
                    }
                    <View style={styles.viewflat}>
                        <FlatList
                            contentContainerStyle={styles.flat}
                            data={products}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => (item, index)}
                            onEndReached={getMore}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={renderFooter}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            ListEmptyComponent={() => <NoRecord image={Images.cartnr} message={t('EmptyStates.No Product Found')} submain={styles.emptyContainer} />}
                            renderItem={({ item }) => (
                                <BreadSwitchList
                                    shopDetail={shopDetail}
                                    productDetail={item}
                                    disableProduct={(itemDetail) => disableProduct(itemDetail)}
                                    data={item}
                                />
                            )}
                        />
                    </View>
                </View>
                <View style={styles.viewbutton}>
                    <Button title={t('Catalogue.Add an item')}
                        buttonStyle={styles.button}
                        onPress={() => props.navigation.navigate('additemshop', { category: categoryDetail ? categoryDetail : '' })}
                    />
                </View>
            </>}
            <Loader loader={loader}></Loader>
        </View>
    )
};
const mapStateToProps = state => ({
    user: state.UserReducer.user,
});
export default connect(mapStateToProps)(ProductDiaryEgg);