import { useIsFocused } from '@react-navigation/native';
import { Icon, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import shopkeeperItemController from '../../../../apis/Controller/shopkeeper/shopkeeperItem.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { hp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import DeleteModal from '../../../ShopComponent/DeleteModal';
import FilterItemReq from '../../../ShopComponent/FilteItemReq';
import MyItemReqList from '../../../ShopComponent/MyItemReqList';
import NoRecord from '../../../ShopComponent/NoRecord';
import Loader from '../../Helper/loader';
import { Toaster } from '../../Helper/Toaster';
import { styles } from './style';


const MyItemReq = (props) => {
    const [filterItem, setFilterItem] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteID, setDeleteID] = useState(null);
    const [itemList, setItemList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [itemDetail, setItemDetail] = useState([]);
    const [filterValue, setFilterValue] = useState(null);
    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            getItemsList(1);
            setPage(1);
            setLoader(true);
        }
    }, [isFocus]);


    useEffect(() => {
        setLoader(true);
        getItemsList(1);
    }, [props && props.itemStatus]);


    const getItemsList = async (page) => {
        let post = {
            request_status: props && props.itemStatus ? props.itemStatus : [],
            page: page ? page : 1,
        };

        let response = await shopkeeperItemController.itemListing(post);
        if (response && response.status) {
            let list = response.listing;
            if (list.length > 0) {
                if (post.page === 1) {
                    setItemList(list);
                } else {
                    setItemList([...itemList, ...list]);
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
                    setItemList([]);
                }
                setRefreshing(false);
            }
        }
        setFetching(false);
        setLoader(false);
        setRefreshing(false);
    };


    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            getItemsList(page);
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
        getItemsList(1);
    };


    const getRequestedItemDetail = async (productId) => {
        let id = productId ? productId : ''
        let response = await shopkeeperItemController.itemDetails(id);
        if (response) {
            setItemDetail(response.page);
            setLoader(false);
        }
        else {
            setLoader(false);
        }
    };

    const deleteItem = async () => {
        setDeleteModal(false)
        setLoader(true);
        let response = await shopkeeperItemController.deleteItem(deleteID);
        if (response) {
            new Toaster().success(response.message);
            getItemsList(1);
            setLoader(false);
        }
        else {
            setLoader(false);
            setDlt(false);
        }
    };

    return (
        <>
            {!loader && <View style={styles.main}>
                <View style={base.container}>
                    <TouchableOpacity onPress={() => setFilterItem(true)}>
                        <View style={styles.viewfilter}>
                            <Text style={styles.filter}>{t("Filters.Filter")}</Text>
                            <Icon type={IconsType.antDesign}
                                name={Icons.caretdown}
                                color={colors.black}
                                size={Dimension.Vsmall}
                            />
                            {props && props.itemStatus.length > 0 ? <View style={{ position: 'absolute', backgroundColor: colors.red, height: hp(10), width: hp(10), borderRadius: hp(10), top: 6, right: 53 }} /> : null}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.viewitem}>
                        <FlatList
                            contentContainerStyle={styles.flat}
                            data={itemList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => (item, index)}
                            onEndReached={getMore}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={renderFooter}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            ListEmptyComponent={() => <NoRecord image={Images.cartnr} message={t('EmptyStates.No Request Found')} submain={styles.emptyContainer} />}
                            renderItem={({ item }) => (
                                <MyItemReqList
                                    productDetail={item}
                                    reRenderFunction={() => getItemsList(1)}
                                    getRequestedItemDetail={(productId) => getRequestedItemDetail(productId)}
                                    itemDetail={itemDetail}
                                    action={(item) => props.navigation.navigate('editrequest', { item: item })}
                                    setDeleteModal={(e) => setDeleteModal(e)}
                                    setDeleteID={(e) => setDeleteID(e)}
                                />
                            )}
                        />
                    </View>
                    {
                        filterItem ?
                            <FilterItemReq
                                open={filterItem}
                                close={() => setFilterItem(false)}
                                value={(e) => setFilterValue(e)}
                            />
                            :
                            null
                    }
                    {deleteModal ? <DeleteModal
                        message1={t('deletPopUp.Delete item request?')}
                        message2={t('deletPopUp.Are you sure to delete this item request?')}
                        // message3={'This process cannot be undone.'}
                        buttonTitle1={t('deletPopUp.Cancel')}
                        buttonTitle2={t('deletPopUp.Delete')}
                        open={deleteModal}
                        IconType={IconsType.antDesign}
                        IconName={Icons.delete}
                        IconColor={colors.red}
                        IconSize={Dimension.Large}
                        close={() => setDeleteModal(false)}
                        deletItemRequest={() => deleteItem()}
                    /> : null}
                </View>
            </View>}
            <Loader loader={loader}></Loader>
        </>
    )
};

const mapStateToProps = state => ({
    itemStatus: state.RequestedItemsFilters.filters,
});
export default connect(mapStateToProps)(MyItemReq);