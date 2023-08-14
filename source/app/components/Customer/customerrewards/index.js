import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { RefreshControl } from 'react-native';
import {
    ScrollView,
    View
} from 'react-native';
import referralController from '../../../../apis/Controller/ReferralController/referral.controller';
import { hp } from '../../../assets/global_style/fontsize';
import RedeemPointsComp from '../../../CustomerComponent/redeemPoints';
import RewardComp from '../../../CustomerComponent/Reward';
import Loader from '../../Helper/loader';
import { Toaster } from '../../Helper/Toaster';
import styles from './style';

const CustomerReferral = props => {
    const [data, setData] = useState([]);
    const [rewardCards, setRewardCards] = useState([]);
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const isFocus = useIsFocused()
    useEffect(() => {
        setLoader(true);
        getData();
        getRewardsCardData();
    }, [isFocus]);

    const getData = async () => {
        let response = await referralController.getRefferal();
        if (response && response.status) {
            setData(response.data);
            setLoader(false);
            setRefreshing(false);
        }
        else {
            setLoader(false);
        }
        setRefreshing(false);
    };

    const getRewardsCardData = async () => {
        let response = await referralController.getRewardsCards();
        if (response && response.status) {
            setRewardCards(response.reward_cards);
            setLoader(false);
            setRefreshing(false);
        }
        else {
            setRewardCards([]);
            setLoader(false);
        }
        setRefreshing(false);
    };

    const addPointsToWallet = async (e) => {
        setLoader(true);
        let response = await referralController.pointsToWallet(e);
        if (response && response.status) {
            getData();
            getRewardsCardData();
            new Toaster().success(response.message);
            setLoader(false);
            setRefreshing(false);
        }
        else {
            setLoader(false);
        }
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        getData();
        getRewardsCardData();
    };

    return (
        <View style={styles.main}>
            <ScrollView
            showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                }
                contentContainerStyle={{ flexGrow: 1, }} style={{ paddingBottom: hp(20) }}>
                <RewardComp
                    navigation={props.navigation}
                    data={data}
                />
                {rewardCards && rewardCards.length > 0 ? <View style={{ marginVertical: hp(20) }}>
                    <RedeemPointsComp
                        navigation={props.navigation}
                        availablePoints={data}
                        data={rewardCards}
                        addPointsToWallet={(e) => addPointsToWallet(e)}
                    />
                </View> : null}
            </ScrollView>
            <Loader loader={loader}></Loader>
        </View>
    );
};
export default CustomerReferral;
