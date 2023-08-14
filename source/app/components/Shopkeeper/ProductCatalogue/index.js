import { useIsFocused } from '@react-navigation/native';
import { Image } from '@rneui/base';
import { Icon, Input } from '@rneui/themed';
import { t } from 'i18next';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import shopkeeperItemController from '../../../../apis/Controller/shopkeeper/shopkeeperItem.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { hp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import NoRecord from '../../../ShopComponent/NoRecord';
import { capitalizeFirstLetter, renderImage } from '../../Helper/general';
import Loader from '../../Helper/loader';
import { styles } from './style';


const ProductCatalouge = (props) => {
    let navigationParams = props && props.route && props.route.params;
    let shopId = navigationParams && navigationParams.shopId ? navigationParams.shopId : null

    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [loader, setLoader] = useState(false);
    const [SearchLoader, setSearchLoader] = useState(false);
    const [keyword, setSearch] = useState('');
    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            getCategories('', 1)
            setSearch('');
            setPage(1);
            setLoader(true);
        }
    }, [isFocus]);

    const getCategories = async (search, page) => {
        let post = {
            search: search,
            page: page ? page : 1,
        };

        let response = await shopkeeperItemController.shopCategories(post, shopId);
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
        if (pagination) {
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
            {!loader && <View style={styles.main}>
                <View style={styles.viewinput}>
                    <View style={styles.input}>
                        <Input
                            placeholder={t('search.Search')}
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
                            style={{ flexGrow: 1, marginHorizontal: -20, }}
                            contentContainerStyle={styles.flat}
                            data={categories}
                            showsVerticalScrollIndicator={false}
                            columnWrapperStyle={{ width: (Dimensions.get('window').width - 50) / 4 }}
                            onEndReached={getMore}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={renderFooter}
                            keyExtractor={(item, index) => (item, index)}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            ListEmptyComponent={() => <NoRecord image={Images.cartnr} message={t('EmptyStates.No catalogue found')} submain={styles.emptyContainer} />}
                            numColumns={4}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ width: '100%', marginLeft: 10, }} onPress={() => props.navigation.navigate('productdiaryegg', { categoryDetail: item })}>
                                    <View style={{ width: '100%', alignItems: 'center' }}>
                                        <View style={styles.mainImage}>
                                            <Image style={styles.image}
                                                source={item.image ? renderImage(item.image, 'medium') : Images.dummyCategory}
                                                resizeMode='cover'
                                            />
                                        </View>
                                        {
                                            item.name ?
                                                <View style={{ marginBottom: hp(10) }}>
                                                    <Text style={styles.veg}>{capitalizeFirstLetter(item.name)}</Text>
                                                </View>
                                                :
                                                null
                                        }
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </View>}
            <Loader loader={loader}/>
        </>
    )
};
export default ProductCatalouge;