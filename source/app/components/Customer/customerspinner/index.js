import { useIsFocused } from '@react-navigation/native';
import { Image, Text } from '@rneui/base';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import spinAndWheelController from '../../../../apis/Controller/spinandwheel.controller';
import { base } from '../../../assets/global_style/base';
import { Images } from '../../../assets/global_style/images';
import Congratulations from '../../../ShopComponent/Congratulations';
import SpinnerComp from '../../../ShopComponent/SpineerComp';
import Loader from '../../Helper/loader';
import styles from './style';


const SpinnerWheel = props => {
    let defaultValues = {
        winnerValue: null,
        winnerIndex: null
    }
    let ref = null;
    const [values, setValues] = useState(defaultValues);
    const [state, setState] = useState(false);
    const [tryAgain, setTryAgain] = useState(false);
    const [collectPoints, setCollectPoints] = useState(null);
    const [token, setToken] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [spinnerStatus, setSpinnerStatus] = useState(false);
    const [availableTime, setAvaiableTime] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [loader, setLoader] = useState(false);

    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            getList();
            getSpinnerStatus();
        }
    }, [isFocus]);

    useEffect(() => {
        if (collectPoints) {
            getSpinnerStatus();
        }
    }, [collectPoints]);

    useEffect(() => {
        if (isFocus && spinnerStatus === false) {
            const intervalId = setInterval(() => {
                getSpinnerStatus();
            }, 3000);
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [isFocus, spinnerStatus]);


    const getList = async () => {
        let response = await spinAndWheelController.spinnerList();
        if (response && response.status) {
            setToken(response && response.spiner && response.spiner.token)
            if (response.spiner && response.spiner.spin_earn) {
                let b = participants
                b.length = 0
                let list = response.spiner.spin_earn
                let update = [...participants]
                for (let i in list) {
                    let data = list[i]
                    update.push(`✪${data.toString()}`)
                }
                setParticipants(update);
            }
        } else {
            setParticipants([]);
        }
    };

    const getSpinnerStatus = async () => {
        let response = await spinAndWheelController.getSpinnerStatus();
        if (response && response.status) {
            if (parseInt(response.spin_status) === 1) {
                setSpinnerStatus(true);
            }
            else {
                setSpinnerStatus(false);
                setAvaiableTime(response.spin_time);
            }
            setLoader(false);
            setRefreshing(false);
        } else {
            setSpinnerStatus(false);
            setLoader(false);
            setRefreshing(false);
        }
    };

    const savePoints = async (points) => {
        let val = { ...values, winnerValue: points, token: token }
        let response = await spinAndWheelController.saveSpinnerPoints(val);
        if (response && response.status) {
            setCollectPoints(response && response.win_points);
            if (parseInt(points) > 0) {
                setState(true);
            } else {
                setTryAgain(true);
            }
        } else {
            setTryAgain(false);
            setState(false);
        }
    };

    const onRefresh = () => {
        getSpinnerStatus();
    };

    return (
        <View style={styles.main}>
            <ScrollView contentContainerStyle={styles.scroll}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}
            >
                {!loader && spinnerStatus ?
                    <View>
                        <SpinnerComp
                            setValues={setValues}
                            participants={participants}
                            values={values}
                            savePoints={(e) => savePoints(e)}
                        />
                    </View>
                    :
                    !loader ?
                        <View style={styles.emptySpine}>
                            <View style={base.container}>
                                <View style={styles.Mainview}>
                                    <View style={styles.Mainimage}>
                                        <Image style={styles.image}
                                            source={Images.clock}
                                            resizeMode='contain'
                                        />
                                    </View>
                                </View>
                                <Text style={styles.message}>{t("spinAndWheel.Your next spin will be available in")} {availableTime}</Text>
                            </View>
                        </View>
                        :
                        null

                }
                {state ?
                    <Congratulations
                        open={state}
                        close={() => {
                            setState(false),
                                getList()
                        }}
                        heading={t("spinAndWheel.Congratulations")}
                        message1={`You have won the ${collectPoints} points`}
                        // message2={'qwerdxczxzxc'}
                        buttonText={t('spinAndWheel.OK')}
                        onPress={() => {
                            setState(false),
                                getList()
                        }}
                    /> : null}
                {tryAgain ?
                    <Congratulations
                        open={tryAgain}
                        close={() => {
                            setTryAgain(false),
                                getList()
                        }}
                        heading={t("spinAndWheel.Ohh!!! Better luck next time")}
                        message1={t('spinAndWheel.Try again after some time if spinner is available')}
                        // message2={'qwerdxczxzxc'}
                        buttonText={t('spinAndWheel.OK')}
                        onPress={() => {
                            setTryAgain(false),
                                getList()
                        }}
                    /> : null}
            </ScrollView>
            <Loader loader={loader}></Loader>
        </View>
    );
}
export default SpinnerWheel;