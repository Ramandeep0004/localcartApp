import { useIsFocused } from '@react-navigation/native';
import { Button, Icon, Image, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import filtersController from '../../../../apis/Controller/actionController';
import AddressController from '../../../../apis/Controller/address.controller';
import dashboardController from '../../../../apis/Controller/dashboard.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { hp, vp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import AddAddressModal from '../../../CustomerComponent/AddaddressModal';
import AddressModal from '../../../CustomerComponent/Addressmodal';
import CategoryList from '../../../ShopComponent/CategoryList';
import InputCom from '../../../ShopComponent/Input';
import NoRecord from '../../../ShopComponent/NoRecord';
import StoreListing from '../../../ShopComponent/StoreListing';
import { isEmptyObj, renderImage } from '../../Helper/general';
import Loader from '../../Helper/loader';
import BottomAddedCart from '../../Helper/showCartBottom';
import Sliders from '../../Helper/sliderHome';
import { FocusAwareStatusBar } from '../../Helper/statusBar';
import { styles } from './style';

const ShopHome = (props) => {
    const [addressList, setAddressList] = useState(false);
    const [addAddress, setAddAddress] = useState(false);
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [savedAddress, setSavedAddress] = useState(null);
    const [addressLists, setAddressLists] = useState([]);
    let add = props && props.savedAddress

    let isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getAddressList();
            getData();
            setLoader(true);
            getAddressFromSyncStorage();
        }
    }, [isFocus]);


    const getData = async () => {
        let response = await dashboardController.homePage();
        if (response && response.status) {
            setData(response.data);
            setLoader(false)
            setRefreshing(false);
            getAddressFromSyncStorage();
        }
        else return setLoader(false)
    };


    const getAddressList = async () => {
        let response = await AddressController.addressList();
        if (response && response.status) {
            let list = response.listing;
            for (let i in list) {
                if (add && add.id === list[i].id) {
                    list[i]['checked'] = add && add.checked ? add.checked : false;
                } else {
                    list[i]['checked'] = false;
                }
            }
            setAddressLists(list);
        } else {
            setAddressLists([]);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getData();
    };

    const saveAdd = async (data) => {
        let item = { ...data, checked: data.checked = true }
        await new filtersController.setSavedAddresss(item);
        let array = [...addressLists];
        array.map(e => {
            if (e.id == item.id) {
                e.checked = true;
            }
            else {
                e.checked = false;
            }
        });
        setAddressLists(array);
        getAddressFromSyncStorage();
        setAddressList(false);
    };


    const handleOpenAddressPopup = () => {
        getAddressFromSyncStorage();
        if (addressLists.length > 0) {
            setAddressList(true)
        } else {
            props.navigation.navigate('addaddresses')
        }
    };


    const getAddressFromSyncStorage = async () => {
        let response = await filtersController.getAddress();
        if (response) {
            setSavedAddress(response);
            await new filtersController.setSavedAddresss(response);
        } else {
            setSavedAddress(null);
        }
    };


    return (
        <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT, flex: 1 }]}>
            <FocusAwareStatusBar backgroundColor={colors.white} barStyle='dark-content' translucent />
            {
                data ?
                    <View style={styles.ViewMain}>
                        <View style={base.container}>
                            <View style={base.row}>
                                <View style={base.col8}>
                                    <Text style={styles.deliver}>{t("home.Deliver to")} </Text>
                                    <TouchableOpacity onPress={() => handleOpenAddressPopup()}>
                                        <View style={styles.viewmain}>
                                            {savedAddress && !isEmptyObj(savedAddress) ? <Text style={styles.textline} numberOfLines={1}>{savedAddress.address}{', '}{savedAddress.village_name}{', '}{savedAddress.cities_name}{', '}{savedAddress.district_name}{', '}{savedAddress.state_name}</Text> : <Text style={styles.textline}>{t("home.Select Address")} </Text>}
                                            <Icon type={IconsType.antDesign}
                                                name={Icons.caretdown}
                                                size={Dimension.Vsmall}
                                                color={colors.black}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={base.col4}>
                                    <View style={styles.viewimage}>
                                        <TouchableOpacity style={styles.mainimage} onPress={() => props.navigation.navigate('myprofileshop')}>
                                            <Image style={styles.image}
                                                source={props.user && props.user.image ? renderImage(props.user.image, 'medium') : Images.user}
                                                resizeMode='cover' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    null
            }
            {data ?
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: props && props.products.length > 0 ? vp(50) : 0 }}
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps={'handled'}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    {data ? <View style={[base.container, { flexGrow: 1 }]}>
                        <View style={styles.input}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('search')}>
                                <Input
                                    placeholder={t('home.Search')}
                                    leftIcon={<Icon type={IconsType.antDesign}
                                        name={Icons.search1}
                                        size={Dimension.semiLarge}
                                        color={colors.grey}
                                    />}
                                    inputContainerStyle={styles.inputcontainer}
                                    errorStyle={styles.error}
                                    editable={false}
                                // value={props.values}
                                // onChangeText={(e) => handleChange(e)}
                                />
                            </TouchableOpacity>
                        </View>
                        {data && data.slider && data.slider.length > 0 ?
                            <View style={styles.MainImage}>
                                <Sliders item={data ? data.slider : []} />
                            </View> : null}
                        {data && data.category && data.category.length > 0 ?
                            <View style={{ flex: 1, paddingBottom: data.shop && data.shop.length === 0 ? hp(110) : 0, }}>
                                <Text style={styles.category}>{t("home.Categories")}</Text>
                                <CategoryList
                                    action={(item) => props.navigation.navigate('shopvegfruit', { item: item })}
                                    data={data.category}
                                />
                                <View style={styles.button}>
                                    <Button title={t('home.Explore all')}
                                        titleStyle={styles.title}
                                        buttonStyle={styles.buttonStyle}
                                        color={colors.white}
                                        onPress={() => props.navigation.navigate('categories')}
                                    />
                                </View>
                            </View>
                            : null}
                        {data && data.shop && data.shop.length > 0 ?
                            <>
                                <Text style={styles.feature}>{t("home.Featured Shops")}</Text>
                                <View style={styles.viewflat}>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={styles.Flat}
                                        disableVirtualization={true}
                                        data={data && data.shop}
                                        keyExtractor={(i, index) => index}
                                        ListEmptyComponent={() => { !loader && <NoRecord image={Images.store} message={t('EmptyStates.No Shop Found')} style={styles.emptyState} />; }}
                                        onEndReachedThreshold={0.1}
                                        numColumns={2}
                                        renderItem={({ item }) => (
                                            <StoreListing
                                                item={item}
                                                action={(item) => props.navigation.navigate('shopstore', { item: item })} />
                                        )} />
                                </View>
                            </>
                            : null}
                    </View> : null}
                </ScrollView> : null}
            {props && props.products.length > 0 ?
                <BottomAddedCart
                    navigation={props.navigation}
                    action={() => props.navigation.navigate('mycart')}
                />
                : null}
            {addAddress ?
                <AddAddressModal
                    open={addAddress}
                    close={() => setAddAddress(false)}
                    navigation={props.navigation}
                />
                : null}
            {addressList ?
                <AddressModal
                    open={addressList}
                    addressLists={addressLists}
                    close={() => setAddressList(false)}
                    navigation={props.navigation}
                    saveAdd={(e) => saveAdd(e)}
                />
                : null}
            <Loader loader={loader}></Loader>
        </View>
    )
};
const mapStateToProps = state => ({
    user: state.UserReducer.user,
    savedAddress: state.SavedAddReducer.savedAddress,
    products: state.AddToCartReducer.products,
});
export default connect(mapStateToProps)(ShopHome);
