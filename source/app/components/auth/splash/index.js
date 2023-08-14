import React, { useEffect } from 'react';
import { base } from '../../../assets/global_style/base';
import styles from './style';
import { Images } from '../../../assets/global_style/images';
import { Image, Input, Button, Text } from '@rneui/themed';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import authController from '../.././../../apis/Controller/auth.controller'
import { useIsFocused } from '@react-navigation/native';
import filtersController from '../../../../apis/Controller/actionController';

const SplashMain = (props) => {
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            const timer = setTimeout(() => {
                initSplash()
            }, 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [isFocus]);

    useEffect(() => {
        getSearchFiletersData()
    }, []);

    const initSplash = async () => {
        let user = await authController.getLoginUser();
        if (user !== null) {
            filtersController.getCartDetail();
            if (user.user_type === 'shopkeeper') {
                if (user.shop === null) {
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'customerlogin' }]
                    });
                }
                else {
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'shophomescreen' }],
                    });
                }
            }
            else {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'customerhome' }],
                });
            }
        }
        else {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'selectlanguage' }],
            });
        }
    };

    const getSearchFiletersData = async () => {
        await filtersController.getSearchFilters();
    };

    return (

        <View style={styles.main}>
            <TouchableOpacity onPress={() => props.navigation.navigate('customerlogin')}>
                <ImageBackground style={styles.image} source={Images.splashbg} resizeMode="stretch">
                    <View style={base.container}>
                        <View style={base.row}>
                            <View style={base.col12}>
                                <View style={styles.logoMain}>
                                    <View style={styles.imgcontainer}>
                                        <Image style={styles.image} source={Images.logo} resizeMode='contain' />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>

    );
}
export default SplashMain;
