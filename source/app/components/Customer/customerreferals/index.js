import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { FlatList } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import NoRecord from '../../../ShopComponent/NoRecord';
import { Images } from '../../../assets/global_style/images';
import { TouchableOpacity } from 'react-native';
import referralController from '../../../../apis/Controller/ReferralController/referral.controller';
import Loader from '../../Helper/loader';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { hp } from '../../../assets/global_style/fontsize';
import { checkInOutDate, dateFormat } from '../../Helper/general';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icon, Image } from '@rneui/base';
import { t } from 'i18next';

const CustomerRewards = props => {
    const [loader, setLoader] = useState(false);
    const [rewardsListing, setRewardsListing] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [refreshings, setRefreshings] = useState(true);

    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            getRewardsListing(1);
            setPage(1);
        }
    }, [isFocus]);

    const getRewardsListing = async (page) => {
        let post = {
            page: page ? page : 1,
        };
        let response = await referralController.getRewardsListing(post);
        if (response && response.status) {
            let list = response.listing
            if (list.length > 0) {
                if (post.page === 1) {
                    setRewardsListing(response.listing);
                }
                else {
                    setRewardsListing([...rewardsListing, ...list]);
                }
                if (list.length < 20) {
                    setPagination(false);
                }
                else {
                    setPagination(false);
                }
                setPage(post.page + 1)
            }
            else {
                if (post.page === 1) {
                    setRewardsListing([]);
                }
                setPagination(false);
            }
            setLoader(false);
            setRefreshing(false);
            setPagination(false);
        }
        else {
            setLoader(false);
            setRefreshing(false);
            setPagination(false);
        }
    };

    const onRefresh = () => {
        getRewardsListing();
    };

    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            getRewardsListing(page);
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
            <View style={base.container}>
                <View style={base.col12}>
                    <View style={styles.imgMain}>
                        <View style={styles.imgContainer}>
                            <Image
                                style={styles.image}
                                source={Images.reward1}
                                resizeMode="cover"
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.paymentMain}>
                    <Text style={styles.payment}>{t("rewardsAndReferals.Rewards History")}</Text>
                </View>
                <View style={styles.viewflat}>
                    <FlatList
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.flat}
                        data={rewardsListing}
                        onEndReached={getMore}
                        ListFooterComponent={renderFooter}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        ListEmptyComponent={() => <NoRecord image={Images.reward2} message={t('EmptyStates.No Rewards Found')} submain={styles.nodata} />}
                        keyExtractor={(item, index) => (index)}
                        renderItem={({ item }) => (
                            <>
                                {item.points ? <View style={styles.viewmain}>
                                    <View style={styles.mainrow}>
                                        {
                                            item.rel_type ?
                                                <View style={styles.mainone}>
                                                    <Text style={styles.lorem}>{item.title}</Text>
                                                </View>
                                                :
                                                null
                                        }
                                        <View style={styles.maintwo}>
                                            <Icon type={IconsType.materialCommunity}
                                                name={Icons.starcircleoutline}
                                                color={colors.primary}
                                                size={Dimension.semiLarge}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.submain}>
                                        <View style={styles.subone}>
                                            <Text style={styles.date}>{item.created ? `${dateFormat(item.created)}  |  ${checkInOutDate(item.created)}` : ''}</Text>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.count2}><Text style={styles.count}>{item.points ? item.points : ''}</Text></Text>
                                        </View>
                                    </View>
                                </View> : null}
                            </>
                        )}
                    />
                </View>
            </View>
            <Loader loader={loader}></Loader>
        </View>
    );
};
export default CustomerRewards;
