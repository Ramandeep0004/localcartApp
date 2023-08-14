import { useIsFocused } from '@react-navigation/native';
import { Icon, Image, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import shopkeeperAuthController from '../../../../apis/Controller/shopkeeper.auth.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { hp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import NoRecord from '../../../ShopComponent/NoRecord';
import { capitalizeFirstLetter, renderImage } from '../../Helper/general';
import Loader from '../../Helper/loader';
import BottomAddedCart from '../../Helper/showCartBottom';
import { styles } from './style';


const Categoriess = (props) => {
    const [categories, setCategories] = useState([]);
    const [values, setValues] = useState(null);
    const [loader, setLoader] = useState(false);
    const [SearchLoader, setSearchLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(false);
    const [keyword, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(false);

    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getCategories('', 1)
            setSearch('');
            setValues('')
            setPage(1);
            setLoader(true);
        }
    }, [isFocus]);

    const getCategories = async (search, page) => {
        let post = {
            search: search,
            page: page ? page : 1,
        };

        let response = await shopkeeperAuthController.shopCategories(post);
        if (response && response.status) {
            let list = response.listing;
            if (list.length > 0) {
                if (post.page === 1) {
                    setCategories(list);
                } else {
                    setCategories([...categories, ...list]);
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
                    setCategories([]);
                }
                setRefreshing(false);
            }
        }
        setFetching(false);
        setLoader(false);
        setRefreshing(false);
        setSearchLoader(false)
    };

    const getMore = () => {
        if (pagination && !fetching && categories.length > 0) {
            setFetching(true);
            getCategories(keyword, page);
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
        getCategories("", 1);
    };

    const search = useCallback(debounce(getCategories, 1000), []);

    return (
        <>
            {!loader ?
                <View style={styles.main}>
                    <View style={styles.viewinput}>
                        <View style={styles.input}>
                            <Input
                                placeholder={t('home.Search')}
                                leftIcon={
                                    <Icon type={IconsType.antDesign}
                                        name={Icons.search1}
                                        size={Dimension.verysmall}
                                        color={colors.grey}
                                    />}
                                inputContainerStyle={styles.inputcontainer}
                                errorStyle={styles.error}
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
                                onChangeText={e => {
                                    setSearch(e);
                                    search(e)
                                    setSearchLoader(true)
                                }}
                            />
                        </View>
                    </View>
                    <View style={[base.container, styles.subMain]}>
                        <View style={styles.viewcate}>
                            <FlatList
                                style={{ marginHorizontal: -20, }}
                                data={categories}
                                // contentContainerStyle={styles.flat}
                                contentContainerStyle={props && props.products.length > 0 ? styles.scroll22 : styles.flat}
                                ListEmptyComponent={() => <NoRecord image={Images.noCategory} message={t('EmptyStates.No Categories Found')} style={styles.emptyContainer} />}
                                showsVerticalScrollIndicator={false}
                                onEndReached={getMore}
                                onEndReachedThreshold={0.1}
                                columnWrapperStyle={{ width: (Dimensions.get('window').width - 50) / 4 }}
                                ListFooterComponent={renderFooter}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                                keyExtractor={(item, index) => index}
                                numColumns={4}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={{ width: '100%', marginLeft: 10, }} onPress={() => props.navigation.navigate('shopvegfruit', { item: item })}>
                                        <View style={{ width: '100%', alignItems: 'center' }}>
                                            <View style={styles.mainImage}>
                                                <Image style={styles.image}
                                                    source={!item.image || item.image === null ? Images.dummyCategory : renderImage(item.image, 'medium')}
                                                />
                                            </View>
                                            <View style={{ marginBottom: hp(10) }}>
                                                <Text style={styles.veg}>{item.category_name ? capitalizeFirstLetter(item.category_name) : capitalizeFirstLetter(item.name)}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>

                </View>
                : null
            }
            {props && props.products.length > 0 && !loader ?
                <BottomAddedCart
                    navigation={props.navigation}
                    action={() => props.navigation.navigate('mycart')}
                /> : null}
            <Loader loader={loader}></Loader>
        </>
    )
};
const mapStateToProps = state => ({
    products: state.AddToCartReducer.products,
});
export default connect(mapStateToProps)(Categoriess);