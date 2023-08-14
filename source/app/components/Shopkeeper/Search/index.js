import { Icon, Image, Input, Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { ScrollView } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Dimension } from '../../../assets/global_style/dimension';
import { colors } from '../../../assets/global_style/colors';
import SearchList1 from '../../../CustomerComponent/Searchlist1';
import ProductSearchComp from '../../../CustomerComponent/ProductSearch';
import { hp, vp } from '../../../assets/global_style/fontsize';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import StoreListing from '../../../ShopComponent/StoreListing';
import { useState } from 'react';
import filtersController from '../../../../apis/Controller/actionController';
import searchController from '../../../../apis/Controller/search.controller';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { capitalizeFirstLetter, renderImage } from '../../Helper/general';
import { Images } from '../../../assets/global_style/images';
import NoRecord from '../../../ShopComponent/NoRecord';
import ItemModal from '../../../CustomerComponent/ItemModal';
import BottomAddedCart from '../../Helper/showCartBottom';
import { t } from 'i18next';

const Search = props => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [shops, setShops] = useState([]);
    const [keyword, setSearch] = useState(null);
    const [SearchLoader, setSearchLoader] = useState(false);
    const [values, setValues] = useState(null);
    const [productDetailPopup, setProductDetailPopup] = useState(false);
    const [productitem, setProductitem] = useState(null);

    const input = React.createRef();
    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            setSearch(null);
            setValues(null);
            setShops([]);
            setCategories([]);
            setProducts([]);
        }
    }, [isFocus]);

    useEffect(() => {
        setTimeout(() => input.current?.focus(), 100);
    }, [isFocus]);

    const getSearchData = async (e) => {
        let post = {
            search: e ? e : ''
        }
        let response = await searchController.search(post);
        if (response && response.status) {
            if (e.length > 2 && response.products && response.products.length > 0
                || e.length > 2 && response.categories && response.categories.length > 0
                || e.length > 2 && response.shops && response.shops.length > 0) {
                setValues(e);
            }
            setProducts(response.products);
            setCategories(response.categories);
            setShops(response.shops);
            setSearchLoader(false);
        }
        setSearchLoader(false);
    };


    const isExist = (values) => {
        let filters = { ...props.resentSearch };
        let inputValue = [...filters.inputValue];
        let array = [...inputValue];
        let index = array.findIndex((item) => item === values);
        return index === -1 ? false : index;
    };

    const setSearchFilter = async () => {
        if (values) {
            let filters = { ...props.resentSearch }
            let search = [...filters.inputValue]
            let status = await isExist(values);
            if (status === false) {
                if (values === '') {
                    return;
                }
                else {
                    if (search.length > 3) {
                        search.splice(0, 1);
                        search.push(values);
                    }
                    else {
                        search.push(values);
                    }
                }
            }
            else return;
            filters = {
                ...filters,
                inputValue: search
            }
            await filtersController.setResentVisitShopsFilter(filters);
        }
        else return;
    };

    const getSearchValue = (inputItem) => {
        setSearchLoader(true);
        if (inputItem) {
            getSearchData(inputItem);
            setSearch(inputItem);
        }
        else {
            setSearchLoader(false);
        }
    };

    const search = useCallback(debounce(getSearchData, 1000), []);

    const handleProductview = (item) => {
        setProductitem(item)
        setProductDetailPopup(true)
    };

    return (
        <View>
            <View style={styles.main}>
                <View style={styles.viewinput}>
                    <Input
                        ref={input}
                        placeholder={t('search.Search')}
                        onBlur={setSearchFilter}
                        inputContainerStyle={styles.inputCon}
                        leftIcon={<Icon type={IconsType.antDesign}
                            name={Icons.search1}
                            size={Dimension.smallicon}
                            color={colors.lightgrey}
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
                        value={keyword}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                search(e);
                                setSearch(e);
                                setSearchLoader(true);
                            }
                            else {
                                setProducts([]);
                                setCategories([]);
                                setShops([]);
                                setSearch(e);
                                setSearchLoader(false);
                            }
                        }}
                    />
                </View>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: hp(80), flexGrow: 1 }}
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                >
                    <View style={base.container}>
                        <View style={styles.searchBody}>
                            {
                                products && products.length > 0 ||
                                    categories && categories.length > 0 ||
                                    shops && shops.length > 0 ?
                                    <View>
                                        {
                                            shops && shops.length > 0 ?
                                                <>
                                                    <View style={styles.trendingMain}>
                                                        <Text style={styles.trendingTxt}>{t("search.Shops")}</Text>
                                                    </View>
                                                    <View style={styles.viewflat}>
                                                        <FlatList
                                                            nestedScrollEnabled={true}
                                                            showsVerticalScrollIndicator={false}
                                                            contentContainerStyle={styles.flat}
                                                            horizontal={true}
                                                            data={shops}
                                                            keyExtractor={(i, index) => (i, index)}
                                                            renderItem={({ item }) => (
                                                                <StoreListing
                                                                    item={item}
                                                                    action={(item) => props.navigation.navigate('shopstore', { item: item })}
                                                                />
                                                            )}
                                                        />
                                                    </View>
                                                </>
                                                :
                                                null
                                        }
                                        {
                                            categories && categories.length > 0 ?
                                                <View style={styles.viewcate}>
                                                    <View style={styles.cateTarget}>
                                                        <Text style={styles.categoryName}>{t("search.Categories")}</Text>
                                                    </View>
                                                    <FlatList
                                                        nestedScrollEnabled={true}
                                                        data={categories}
                                                        contentContainerStyle={styles.flat}
                                                        showsVerticalScrollIndicator={false}
                                                        horizontal={true}
                                                        keyExtractor={(item, index) => (item, index)}
                                                        renderItem={({ item }) => (
                                                            <TouchableOpacity onPress={() => props.navigation.navigate('shopvegfruit', { item: item })}>
                                                                <View style={styles.categoryMain}>
                                                                    <View style={styles.mainImage}>
                                                                        <Image style={styles.image}
                                                                            source={item.image ? renderImage(item.image, 'medium') : Images.dummyCategory}
                                                                        />
                                                                    </View>
                                                                    <View style={{ marginBottom: hp(10) }}>
                                                                        <Text style={styles.veg}>{capitalizeFirstLetter(item.category_name)}</Text>
                                                                    </View>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )}
                                                    />
                                                </View>
                                                :
                                                null
                                        }
                                        {
                                            products && products.length > 0 ?
                                                <View >
                                                    <View style={styles.SerchheadingMain}>
                                                        <Text style={styles.serachHeading}>{t("search.Products")}</Text>
                                                    </View>
                                                    <View style={styles.searchproductlistMain}>
                                                        <ProductSearchComp
                                                            action={(e) => handleProductview(e)}
                                                            data={products}
                                                            navigation={props.navigation}
                                                        />
                                                    </View>
                                                </View>
                                                :
                                                null
                                        }
                                    </View>
                                    :
                                    props && props.resentSearch && props.resentSearch.inputValue && props.resentSearch.inputValue.length > 0 && keyword === null ||
                                        props && props.resentSearch && props.resentSearch.inputValue && props.resentSearch.inputValue.length > 0 && keyword === '' ||
                                        props && props.resentSearch && props.resentSearch.shops && props.resentSearch.shops.length > 0 && keyword === null ||
                                        props && props.resentSearch && props.resentSearch.shops && props.resentSearch.shops.length > 0 && keyword === '' ?
                                        <>
                                            {
                                                props && props.resentSearch && props.resentSearch.inputValue.length > 0 ?
                                                    <View style={styles.searchlistMain1}>
                                                        <SearchList1
                                                            action={() => ''}
                                                            navigation={props.navigation}
                                                            getSearchValue={getSearchValue}
                                                        />
                                                    </View>
                                                    :
                                                    null
                                            }
                                            {
                                                props && props.resentSearch && props.resentSearch.shops.length > 0 ?
                                                    <>
                                                        <View style={styles.trendingMain}>
                                                            <Text style={styles.trendingTxt}>{t("search.Recent Visited Shops")}</Text>
                                                        </View>
                                                        <View style={styles.viewflat}>
                                                            <FlatList
                                                                nestedScrollEnabled={true}
                                                                showsVerticalScrollIndicator={false}
                                                                contentContainerStyle={styles.flat}
                                                                data={props && props.resentSearch && props.resentSearch.shops}
                                                                keyExtractor={(item, index) => (item, index)}
                                                                numColumns={2}
                                                                renderItem={({ item }) => (
                                                                    <StoreListing
                                                                        item={item}
                                                                        action={(item) => props.navigation.navigate('shopstore', { item: item })}
                                                                    />
                                                                )}
                                                            />

                                                        </View>
                                                    </>
                                                    :
                                                    null
                                            }
                                        </>
                                        :
                                        <View style={styles.viewrecord}>
                                            <NoRecord image={Images.search}
                                                message={t('EmptyStates.No results found')}
                                                style={styles.emptyContainer}
                                            />
                                        </View>
                            }
                        </View>
                    </View>
                </ScrollView>
                {props && props.products.length > 0 ?
                    <BottomAddedCart
                        navigation={props.navigation}
                        action={() => props.navigation.navigate('mycart')}
                    />
                    : null}

            </View>
            {productDetailPopup ?
                <ItemModal
                    id={productitem}
                    open={productDetailPopup}
                    close={() => {
                        setProductDetailPopup(false)
                    }}
                    navigation={props.navigation}
                />
                : null}

        </View>
    );
};
const mapStateToProps = state => ({
    products: state.AddToCartReducer.products,
    resentSearch: state.SearchFilter.search,
});
export default connect(mapStateToProps)(Search);
