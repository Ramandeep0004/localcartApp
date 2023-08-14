import { Icon, Image, Input, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { styles } from './style';
import { ScrollView } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Dimension } from '../../../assets/global_style/dimension';
import { colors } from '../../../assets/global_style/colors';
import { Images } from '../../../assets/global_style/images';
import { StatusBar } from 'react-native';
import shopkeeperProfileController from '../../../../apis/Controller/shopkeeper/shopkeeper.profile.controller';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../Helper/loader';
import { renderImage } from '../../Helper/general';
import { hp, wp } from '../../../assets/global_style/fontsize';
import ToggleSwitch from 'toggle-switch-react-native';
import shopsController from '../../../../apis/Controller/shops.controller';
import { Toaster } from '../../Helper/Toaster';
import { t } from 'i18next';
import { TouchableOpacity } from 'react-native';

const ShopProfile = props => {

    const [expand, setExpand] = useState(false);
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;

    const [profileDetail, setProfileDetail] = useState(null);
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [productToggle, setPrductToggle] = useState(false);
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            getProfile();
        }
    }, [isFocus]);

    const getProfile = async () => {
        let response = await shopkeeperProfileController.getShopkeeperProfile();
        if (response && response.status) {
            if (response.user && response.user.shop) {
                if (response.user && response.user.shop && parseInt(response.user.shop.is_price) === 1) {
                    setPrductToggle(true);
                }
                else {
                    setPrductToggle(false);
                }
            }
            setProfileDetail(response.user);
            setLoader(false);
            setRefreshing(false);
        }
        else {
            setLoader(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        getProfile();
    };

    const handleProductPrice = async () => {
        let response = await shopsController.shopProductPriceOnOffHandle();
        if (response && response.status) {
            if (parseInt(response.price_status) === 1) {
                setPrductToggle(true);
            }
            else {
                setPrductToggle(false);
            }
            new Toaster().success(response.message)
        }
        else return;
    };

    return (
        // <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
        <ScrollView
            contentContainerStyle={styles.scroll}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
        >
            <View style={base.container}>
                {
                    profileDetail && !loader ?
                        <View style={base.col12}>
                            <View style={styles.ImageContainer}>
                                <View style={styles.imgContainer}>
                                    <View style={styles.imgMain}>
                                        <Image
                                            style={styles.image}
                                            source={profileDetail && profileDetail.image ? renderImage(profileDetail.image, 'medium') : Images.user}
                                            resizeMode="cover"
                                        />
                                    </View>
                                </View>
                                {/* <View style={styles.cirContainer2}>
                                    <View style={styles.circleMain2}>
                                        <Icon
                                            name={Icons.pencil}
                                            type={IconsType.simpleLineIcon}
                                            color={colors.white}
                                            size={Dimension.semilarge}
                                            onPress={() => props.navigation.navigate('editprofile')}
                                        />
                                    </View>
                                </View> */}
                            </View>
                            <View style={styles.viewedit}>
                                <TouchableOpacity onPress={() => props.navigation.navigate('editprofile')}>
                                    <Text style={styles.edit}>{t("shopKeeperSignUp.Edit Profile")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        null
                }
                {
                    profileDetail && !loader ?
                        <View style={styles.subCon}>
                            <View style={styles.Viewmain}>
                                <View style={[base.col12]}>
                                    <View style={[styles.Vone, base.row]}>
                                        <Text style={styles.shop2}>{t('shopKeeperSignUp.Show/hide product prices')}</Text>
                                    </View>
                                </View>
                            </View>
                            {
                                profileDetail && profileDetail.first_name && profileDetail.last_name ?
                                    <View style={[base.col12, base.row]}>
                                        <View style={[base.col1]}>
                                            <Icon type={IconsType.octIcon}
                                                name={Icons.people}
                                                color={colors.black}
                                                size={Dimension.verysmall}
                                            />
                                        </View>
                                        <View style={base.col9}>
                                            <Text numberOfLines={1} style={styles.name}>{t("shopKeeperSignUp.Name")}</Text>
                                            <Text style={styles.Name}>{profileDetail.first_name}{' '}{profileDetail.last_name}</Text>
                                        </View>
                                        <View style={[base.col2, styles.ToggleSwitch]}>
                                            <ToggleSwitch
                                                isOn={productToggle}
                                                onColor={colors.primary}
                                                offColor={colors.darkgrey}
                                                size='medium'
                                                onToggle={handleProductPrice}
                                                animationSpeed={300}
                                            />
                                        </View>
                                    </View>
                                    : null
                            }
                            {
                                profileDetail && profileDetail.phonenumber ?
                                    <View style={styles.submain}>
                                        <View style={base.subrow}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.feather}
                                                    name={Icons.phone}
                                                    color={colors.black}
                                                    size={Dimension.verysmall}
                                                />
                                            </View>
                                            <View style={styles.textline}>
                                                <Text numberOfLines={1} style={styles.name}>{t("shopKeeperSignUp.Mobile Number")}</Text>
                                                <Text style={styles.Name}>{profileDetail.phonenumber}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    : null
                            }
                            {profileDetail && profileDetail.email ? <View style={styles.submain}>
                                <View style={base.subrow}>
                                    <View style={styles.viewIcon}>
                                        <Icon type={IconsType.antDesign}
                                            name={Icons.mail}
                                            color={colors.black}
                                            size={Dimension.verysmall}
                                        />
                                    </View>
                                    <View style={styles.textline}>
                                        <Text numberOfLines={1} style={styles.name}>{t('shopKeeperSignUp.Email Address')}</Text>
                                        <Text style={styles.email}>{profileDetail.email}</Text>
                                    </View>
                                </View>
                            </View> : null}
                            {profileDetail && profileDetail.aadhar_no ? <View style={styles.submain}>
                                <View style={base.subrow}>
                                    <View style={styles.viewIcon}>
                                        <Icon type={IconsType.fontAwesome5}
                                            name={Icons.fingerprint}
                                            color={colors.black}
                                            size={Dimension.verysmall}
                                        />
                                    </View>
                                    <View style={styles.textline}>
                                        <Text numberOfLines={1} style={styles.name}>{t("shopKeeperSignUp.Aadhar Number")}</Text>
                                        <Text style={styles.Name}>{profileDetail.aadhar_no}</Text>
                                    </View>
                                </View>
                            </View> : null}
                            {profileDetail && profileDetail.address ?
                                <View style={styles.submain}>
                                    <View style={base.subrow}>
                                        <View style={styles.viewIcon}>
                                            <Icon type={IconsType.ionIcon}
                                                name={Icons.locationoutline}
                                                color={colors.black}
                                                size={Dimension.verysmall}
                                            />
                                        </View>
                                        <View style={styles.textline}>
                                            <Text numberOfLines={1} style={styles.name}>{t("shopKeeperSignUp.Address")}</Text>
                                            <Text style={styles.email}>{profileDetail.address && profileDetail.address.address ? `${profileDetail.address.address},` : null} {profileDetail.address.city_name ? `${profileDetail.address.city_name},` : null} {profileDetail.address.district_name ? `${profileDetail.address.district_name},` : null} {profileDetail.address.state_name ? `${profileDetail.address.state_name}` : null}</Text>
                                        </View>
                                    </View>
                                </View> : null}
                            {
                                profileDetail && profileDetail.shop && profileDetail.shop.shop_name ?
                                    <View style={styles.submain}>
                                        <View style={base.subrow}>
                                            <View style={styles.viewimage}>
                                                <Image style={styles.image}
                                                    source={Images.shopname}
                                                    resizeMode='stretch'
                                                />
                                            </View>
                                            <View style={styles.textline}>
                                                <Text numberOfLines={1} style={styles.name}>{t("shopKeeperSignUp.Shop Name")}</Text>
                                                <Text style={styles.Name}>{profileDetail && profileDetail.shop && profileDetail.shop.shop_name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                            }
                            {
                                profileDetail && profileDetail.shop && profileDetail.shop.shop_type_name ?
                                    <View style={styles.submain}>
                                        <View style={base.subrow}>
                                            <View style={styles.viewimage}>
                                                <Image style={styles.image}
                                                    source={Images.Storeshop}
                                                    resizeMode='stretch'
                                                />
                                            </View>
                                            <View style={styles.textline}>
                                                <Text numberOfLines={1} style={styles.name}>{t("shopKeeperSignUp.Shop Type")}</Text>
                                                {
                                                    profileDetail && profileDetail.shop && parseInt(profileDetail.shop.shopkepeer_type) === 3 ?
                                                        <Text style={styles.Name}>Organic, Non organic</Text>
                                                        :
                                                        <Text style={styles.Name}>{profileDetail && profileDetail.shop && profileDetail.shop.shop_type_name}</Text>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                            }

                            {
                                profileDetail && profileDetail.shop && profileDetail.shop.shopkeeper_type_name ?
                                    <View style={styles.submain}>
                                        <View style={base.subrow}>
                                            <View style={styles.viewimage}>
                                                <Image style={styles.image}
                                                    source={Images.shopcate}
                                                    resizeMode='stretch'
                                                />
                                            </View>
                                            <View style={styles.textline}>
                                                <Text numberOfLines={1} style={styles.name}>{t("shopKeeperSignUp.Shopkeeper Type")}</Text>
                                                <Text style={styles.Name}>{profileDetail && profileDetail.shop && profileDetail.shop.shopkeeper_type_name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                            }
                            {/* Shop Category ---Collapse */}
                            {
                                profileDetail && profileDetail.categories ?
                                    <View>
                                        <View style={styles.submain}>
                                            <View style={base.subrow}>
                                                <View style={styles.viewimage}>
                                                    <Image style={styles.image}
                                                        source={Images.clerk}
                                                        resizeMode='stretch'
                                                    />
                                                </View>
                                                <View style={styles.textline}>
                                                    <Text numberOfLines={1} style={styles.category}>{t("shopKeeperSignUp.Shop Categories")}</Text>
                                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: hp(10), alignItems: 'center' }}>

                                                        {profileDetail.categories.map((data, i) => {
                                                            return (
                                                                <View style={{
                                                                    backgroundColor: colors.background, height: hp(30), maxWidth: wp(100), marginRight: hp(10), marginVertical: hp(10), borderRadius: hp(10), paddingHorizontal: hp(10), alignItems: 'center', justifyContent: 'center', shadowColor: colors.lightgrey,
                                                                    shadowOffset: {
                                                                        width: 0,
                                                                        height: 6,
                                                                    },
                                                                    shadowOpacity: 0.20,
                                                                    shadowRadius: 5.62,
                                                                    elevation: 6
                                                                }}>
                                                                    <Text style={styles.Name} key={i}>{`${data.category_name}`}</Text>
                                                                </View>
                                                            )
                                                        })}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                            }

                            {
                                profileDetail && profileDetail.shop && profileDetail.shop.shop_gstin ?
                                    <View style={styles.submain}>
                                        <View style={base.subrow}>
                                            <View style={styles.viewimage}>
                                                <Image style={styles.image}
                                                    source={Images.clerk}
                                                    resizeMode='stretch'
                                                />
                                            </View>
                                            <View style={styles.textline}>
                                                <Text numberOfLines={1} style={styles.name}>{t("shopKeeperSignUp.Shop GST Number")}</Text>
                                                <Text style={styles.Name}>{profileDetail && profileDetail.shop && profileDetail.shop.shop_gstin}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null
                            }

                            {
                                profileDetail && profileDetail.bank && profileDetail.bank.account_no ? <View style={styles.submain}>
                                    <View style={base.subrow}>
                                        <View style={styles.viewimage}>
                                            <Image style={styles.image}
                                                source={Images.account}
                                                resizeMode='stretch'
                                            />
                                        </View>
                                        <View style={styles.textline}>
                                            <Text numberOfLines={1} style={styles.name}>{t("shopKeeperSignUp.Bank Account Number")}</Text>
                                            <Text style={styles.Name}>{profileDetail.bank && profileDetail.bank.account_no}</Text>
                                        </View>
                                    </View>
                                </View>
                                    :
                                    null
                            }
                        </View> : null}
            </View>
            <Loader loader={loader} />
        </ScrollView>
        // </View>
    );
};
export default ShopProfile;
