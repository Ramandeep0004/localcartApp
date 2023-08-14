
import { useIsFocused } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { AccordionList } from 'accordion-collapse-react-native';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';
import cmsController from '../../../apis/Controller/cmsPages.controller';
import { base } from '../../assets/global_style/base';
import { colors } from '../../assets/global_style/colors';
import { Dimension } from '../../assets/global_style/dimension';
import { hp } from '../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../assets/global_style/icon';
import { Images } from '../../assets/global_style/images';
import NoRecord from '../../ShopComponent/NoRecord';
import Loader from '../Helper/loader';
import { styles } from './style';


const Faq = (props) => {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [fetch, setFetch] = useState(false);
    const [activeSections, setActiveSections] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            setPage(1);
            getApidata(1);
        }
    }, [isFocus]);

    const getApidata = async (page) => {
        let post = {
            page: page ? page : 1
        }
        let response = await cmsController.faQ(post)
        if (response && response.status) {
            setPage(post.page + 1);
            let list = response.listing;
            for (let i in list) {
                list[i]['expanded'] = false;
            }
            if (list.length > 0) {
                if (post.page === 1) {
                    setData(list);
                }
                else {
                    setData([...data, ...list]);
                }
                if (list.length < 10) {
                    setPagination(false);
                }
                else {
                    setPagination(true);
                }
            }
            else {
                if (post.page === 1) {
                    setData([]);
                }
                setPagination(false);
            }
        }
        else {
            setData([]);
            setPagination(false);
        }
        setLoader(false);
        setFetch(false);
        setRefreshing(false);
    };

    const getMore = () => {
        if (pagination && !fetch) {
            setFetch(true);
            getApidata(page);
        }
    };

    const onRefresh = () => {
        getApidata(1);
    };

    const head = (data, index, isActive) => {

        return (
            <View style={base.row}>
                <View style={base.col12}>
                    <View style={styles.headerStyle}>
                        <View style={base.row}>
                            <View style={base.col10}>
                                <Text style={styles.headerText} >{data.title ? data.title : null}</Text>
                            </View>
                            <View style={base.col2}>
                                <Icon
                                    name={isActive ? Icons.minus : Icons.plus}
                                    type={IconsType.antDesign}
                                    color={colors.black}
                                    size={Dimension.smallicon}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    const body = (data) => {
        return (
            <View style={styles.bodyStyle}>
                <Text style={styles.bodyText}>{data.description ? data.description : null}</Text>
            </View>
        )
    };

    const renderFooter = () => {
        if (fetch) {
            return (
                <>
                    {fetch ? (
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
            return <View style={{ height: hp(30) }} />;
        }
    };


    const _updateSections = activeSections => {
        setActiveSections(activeSections);
    };

    return (
        <View style={styles.main}>
            <View style={[base.container, styles.subMain]}>
                < ScrollView contentContainerStyle={styles.viewmain} showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View style={{ flex: 1, paddingTop: hp(30) ,   
         }}>
                            <AccordionList
                                contentContainerStyle={styles.viewmain}
                                showsVerticalScrollIndicator={false}
                                list={data}
                                activeSections={activeSections}
                                header={head}
                                body={body}
                                onChange={_updateSections}
                                keyExtractor={(item, index) => index}
                                onEndReached={() => getMore()}
                                onEndReachedThreshold={0.03}
                                ListFooterComponent={renderFooter}
                                renderAsFlatList={true}
                                underlayColor={'transparent'}
                                duration={500}
                                ListEmptyComponent={() => <NoRecord image={Images.store} message={t('EmptyStates.No Faq Found')} />}
                            />
                    </View>
                </ScrollView>
            </View>
            {loader ? <Loader loader={loader}></Loader> : null}
        </View>
    )
};
export default Faq;
