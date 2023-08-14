import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, View } from 'react-native';
import HTML from 'react-native-render-html';
import cmsController from '../../../../apis/Controller/cmsPages.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, hzp, vp } from '../../../assets/global_style/fontsize';
import Loader from '../../Helper/loader';
import { styles } from './style';


const PrivacyPolicy = (props) => {
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const isFocus = useIsFocused();
    useEffect(() => {
        getApidata();
    }, [isFocus]);

    const getApidata = async () => {
        setLoader(true)
        let response = await cmsController.termsAndConditions();
        if (response && response.status) {
            setData(response.page);
            setLoader(false);
            setRefreshing(false);
        }
        else {
            setLoader(false)
        }
    };

    const onRefresh = () => {
        getApidata();
    };

    return (

        <View style={styles.main}>
            <ScrollView contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={base.container}>
                    <HTML
                        source={{ html: data && data.description }}
                        contentWidth={Dimensions.get('window').width}
                        tagsStyles={{
                            p: {
                                color: colors.black,
                                fontFamily: Font.regular,
                                fontSize: fp(15),
                                marginTop: vp(10),
                                // marginBottom: vp(15),
                                lineHeight: vp(20),
                            },
                            h6: {
                                color: colors.black,
                                fontSize: fp(18),
                                fontFamily: Font.medium,
                                marginTop: vp(10)
                            },
                            h1: {
                                color: colors.black,
                                fontSize: fp(30),
                                fontFamily: Font.medium,
                                marginTop: vp(10)
                            },
                            h3: {
                                color: colors.black,
                                fontSize: fp(22),
                                fontFamily: Font.medium,
                                marginTop: vp(10)
                            },
                            h4: {
                                color: colors.black,
                                fontSize: fp(20),
                                fontFamily: Font.medium,
                                marginTop: vp(10)
                            },
                            h2: {
                                color: colors.black,
                                fontSize: fp(26),
                                fontFamily: Font.medium,
                                marginTop: vp(10)
                            },
                            h5: {
                                color: colors.black,
                                fontSize: fp(19),
                                fontFamily: Font.medium,
                                marginTop: vp(10)
                            },
                            strong: {
                                // backgroundColor: 'red',
                                fontSize: vp(18),
                                color: colors.black,
                                fontFamily: Font.regular,
                                // marginTop: vp(10),
                                // marginBottom: vp(10)
                            },
                            ul: {
                                color: colors.black,
                                fontFamily: Font.regular,
                                fontSize: fp(15),
                                marginTop: vp(0),
                                marginLeft: hzp(10),
                                // paddingBottom: vp(30),
                                lineHeight: vp(23),
                                marginBottom: vp(10),
                                padding: 0,
                                // borderBottomWidth: vp(1),
                                // borderBottomColor: colors.lightgrey,
                            },
                           
                            li: {
                                padding: 0,
                                margin: 0,
                                paddingLeft: hzp(7),
                                color: colors.black,
                                fontFamily: Font.regular,
                                fontSize: fp(15),
                                marginBottom:hp(10)
                            },
                        }}
                    />
                </View>
            </ScrollView>
            <Loader loader={loader}></Loader>
        </View>

    )
};
export default PrivacyPolicy;