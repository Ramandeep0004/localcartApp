import { useIsFocused } from '@react-navigation/native';
import { Badge, Header } from '@rneui/base';
import { Icon, Image, Text } from '@rneui/themed';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import authController from '../../../../apis/Controller/auth.controller';
import languageController from '../../../../apis/Controller/LanguageController/language.controller';
import shopkeeperProfileController from '../../../../apis/Controller/shopkeeper/shopkeeper.profile.controller';
import { changeLanguages } from '../../../../translation';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import { capitalizeFirstLetter, renderImage } from '../../Helper/general';
import { Toaster } from '../../Helper/Toaster';
import { styles } from './style';
import RNRestart from 'react-native-restart';
import { t } from 'i18next';

const MyProfileShop = (props) => {
    const [toggleSwitch, setToggleSwitch] = useState(false);
    const [shopStatus, setShopStatus] = useState(false);
    const [shopId, setShopId] = useState('');
    const [expand, setExpand] = useState(true);
    const [expandlanguage, setExpandLaguage] = useState(false);
    const [data, setData] = useState(null);
    const [select, setSelect] = useState(null);

    let isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getProfile();
            getSelectedLanguage();
            setExpandLaguage(false);
        }
    }, [isFocus]);


    const logoutProfile = async () => {
        await authController.logout();
    };

    const getProfile = async () => {
        let response = await shopkeeperProfileController.getShopkeeperProfile();
        if (response) {
            setData(response.user);
            setShopId(response.user.shop.id)
            if (response.user.shop.status === 1) {
                setShopStatus(true)
            }
            else {
                setShopStatus(false)
            }
        }
        else return;
    };


    const setUpShopStatus = async () => {
        let response = await shopkeeperProfileController.shopStatus();
        if (response) {
            if (response.message === 'Shop close') {
                setShopStatus(false);
            }
            else {
                setShopStatus(true);
            }
            new Toaster().success(response.message);
        }
        else return;
    };

    const selectLanguage = async (language) => {
        if (language) {
            changeLanguages(language);
            await languageController.setLaguage(language);
            RNRestart.Restart();
        }
        else return;
    };

    const getSelectedLanguage = async () => {
        let response = await languageController.getLanguage();
        if (response) {
            setSelect(response);
        }
        else {
            setSelect(null);
        }
    };

    return (
        <View style={styles.main}>
            <Header
                placement="center"
                containerStyle={styles.container}
                style={styles.header}
                centerComponent={<Text numberOfLines={1} style={styles.title}>{t("profile.My Profile")}</Text>}
                rightComponent={<TouchableOpacity onPress={() => props.navigation.navigate('shopprofile')}>
                    <View style={styles.mainImage}>
                        <Image style={styles.image}
                            source={props && props.user && props.user.image ? renderImage(props.user.image, 'medium') : Images.user}
                        />
                    </View>
                </TouchableOpacity>}
                statusBarProps={{
                    barStyle: 'light-content',
                    backgroundColor: colors.Secondary,
                    translucent: true
                }}
            />
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.main2}>
                    <View style={styles.mainview}>
                        {
                            data ?
                                <View style={styles.viewtext}>
                                    <View style={base.col12}>
                                        <View style={base.row}>
                                            <View>
                                                <View style={styles.mainimage}>
                                                    <TouchableOpacity onPress={() => props.navigation.navigate('shopprofile')}>
                                                        <Image style={styles.image}
                                                            source={data && data.shop && data.shop.image ? renderImage(data.shop.image, 'medium') : Images.dummyShop}
                                                            resizeMode='cover'
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.Mainimage}>
                                                    <Image style={styles.image}
                                                        source={data && data.image ? renderImage(data.image, 'medium') : Images.user}
                                                        resizeMode='cover'
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.viewbablu}>
                                                <View style={styles.viewone}>
                                                    {
                                                        data.shop ?
                                                            <TouchableOpacity onPress={() => props.navigation.navigate('shopprofile')}>
                                                                <Text style={styles.bablu}>{capitalizeFirstLetter(data.shop.shop_name)}</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            null
                                                    }
                                                    <TouchableOpacity onPress={() => props.navigation.navigate('shopprofile')}>
                                                        <Text style={styles.pandit2}>{capitalizeFirstLetter(data.first_name)} {capitalizeFirstLetter(data.last_name)} ({data.shop ? (data.shop.shopkeeper_type_name) : null})</Text>
                                                    </TouchableOpacity>
                                                    {
                                                        data && data.address && data.address.address ?
                                                            <View style={styles.viewloc}>
                                                                <View style={base.col12}>
                                                                    <View style={[base.row, styles.locttf]}>
                                                                        <View style={styles.viewloc2}>

                                                                            <Icon type={IconsType.ionIcon}
                                                                                name={Icons.locationsharp}
                                                                                size={Dimension.verysmall}
                                                                                color={colors.lightgrey} />
                                                                        </View>
                                                                        <Text style={styles.lore2}>{data.address.address}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            :
                                                            null
                                                    }
                                                </View>
                                                <View style={styles.viewtwo}>
                                                    <TouchableOpacity onPress={() => props.navigation.navigate('editprofile')}>
                                                        <View style={styles.viewicon}>
                                                            <Icon type={IconsType.simpleLineIcon}
                                                                name={Icons.pencil}
                                                                size={Dimension.verysmall}
                                                                color={colors.white}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                :
                                null
                        }

                    </View>
                    <View style={styles.Viewmain}>
                        <View style={base.col12}>
                            <View style={base.row}>
                                <View style={styles.Vone}>
                                    <Text style={styles.shop}>{t("profile.Shop open/close")}</Text>
                                </View>
                                <View style={styles.Vtwo}>
                                    <ToggleSwitch
                                        isOn={shopStatus}
                                        onColor={colors.primary}
                                        offColor={colors.darkgrey}
                                        size='medium'
                                        onToggle={setUpShopStatus}
                                        animationSpeed={300}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={base.container}>
                        <Text style={styles.info}>{t("profile.Your Information")}</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('myordershop')}>
                            <View style={styles.mainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.feather} name={Icons.shoppingbag} size={Dimension.verysmall} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t("profile.My Orders")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('wallet')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.antDesign} name={Icons.wallet} size={Dimension.verysmall} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t("profile.Wallet")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('bankDetailss')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.antDesign} name={Icons.wallet} size={Dimension.verysmall} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{'Bank details'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('shopkeeperSaveaddress')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.simpleLineIcon} name={Icons.locationpin} size={Dimension.verysmall} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t("profile.My Addresses")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('notification')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.simpleLineIcon} name={Icons.bell} size={Dimension.verysmall} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t("profile.Notifications")}</Text>
                                        </View>
                                        {
                                            props && props.notificationCount && props.notificationCount > 0 ?
                                                <View style={styles.badge}>
                                                    <Badge value={props.notificationCount > 99 ? '99+' : props.notificationCount}
                                                        status="error"
                                                        type="ionicon"
                                                        // badgeStyle={styles.count}
                                                        textStyle={styles.notiText}
                                                    />
                                                </View>
                                                :
                                                null
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('savedorder')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.fontAwesome} name={Icons.bookmarko} size={Dimension.verysmall} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t("profile.Saved Orders")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('productcatalouge', { shopId: shopId })}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.materialCommunity} name={Icons.formatlistcheckbox} size={Dimension.smallicon} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t("profile.Product Catalogue")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('myitemreq')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.octIcon} name={Icons.checklist} size={Dimension.verysmall} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t("profile.My Item Requests")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('shopqr')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.ionIcon} name={Icons.scan} size={Dimension.smallicon} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t("profile.Shop QR code")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('paymentqr')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.ionIcon} name={Icons.scan} size={Dimension.smallicon} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t("profile.Payment QR code")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('customerreferral')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.materialCommunity} name={Icons.starcircleoutline} size={Dimension.semilarge} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t('profile.Referral Code')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('customerrewards')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.antDesign} name={Icons.gift} size={Dimension.semilarge} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t("profile.Rewards")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('shopkeeperSpinnerWheel')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon name={Icons.spinnerfidget}
                                                    type={IconsType.fontisto} size={Dimension.docicon} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t('profile.Spin & Earn')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('shopcahngepassword')}>
                            <View style={styles.MainView}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.subone}>
                                            <View style={styles.viewIcon}>
                                                <Icon type={IconsType.feather} name={Icons.lock} size={Dimension.verysmall} color={colors.lightgrey} />
                                            </View>
                                        </View>
                                        <View style={styles.subtwo}>
                                            <Text style={styles.order}>{t("profile.Change Password")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Collapse isExpanded={expand}
                                onToggle={(isExpanded) => setExpand(!expand)}>
                                <CollapseHeader>
                                    <View style={styles.viewheader}>
                                        <View style={base.col12}>
                                            <View style={base.row}>
                                                <View style={styles.Subone}>
                                                    <Text style={styles.Info}>{t("profile.Other Information")}</Text>
                                                </View>
                                                <View style={styles.Subtwo}>
                                                    <Icon type={IconsType.antDesign} name={expand ? Icons.caretup : Icons.caretdown} size={Dimension.Vsmall} color={colors.black} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('faq')}>
                                        <View style={styles.mainView}>
                                            <View style={base.col12}>
                                                <View style={base.row}>
                                                    <View style={styles.subone}>
                                                        <View style={styles.viewIcon}>
                                                            <Icon type={IconsType.antDesign} name={Icons.questioncircleo} size={Dimension.verysmall} color={colors.lightgrey} />
                                                        </View>
                                                    </View>
                                                    <View style={styles.subtwo}>
                                                        <Text style={styles.order}>{t("profile.FAQ")}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('aboutlocalcart')}>
                                        <View style={styles.MainView}>
                                            <View style={base.col12}>
                                                <View style={base.row}>
                                                    <View style={styles.subone}>
                                                        <View style={styles.viewIcon}>
                                                            <Icon type={IconsType.antDesign} name={Icons.infocirlceo} size={Dimension.verysmall} color={colors.lightgrey} />
                                                        </View>
                                                    </View>
                                                    <View style={styles.subtwo}>
                                                        <Text style={styles.order}>{t("profile.About Local Cart")}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('feedback')}>
                                        <View style={styles.MainView}>
                                            <View style={base.col12}>
                                                <View style={base.row}>
                                                    <View style={styles.subone}>
                                                        <View style={styles.viewIcon}>
                                                            <Icon type={IconsType.octIcon} name={Icons.lightbulb} size={Dimension.smallicon} color={colors.lightgrey} />
                                                        </View>
                                                    </View>
                                                    <View style={styles.subtwo}>
                                                        <Text style={styles.order}>{t("profile.Contact Us/Feedback")}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('privacypolicy')}>
                                        <View style={styles.MainView}>
                                            <View style={base.col12}>
                                                <View style={base.row}>
                                                    <View style={styles.subone}>
                                                        <View style={styles.viewIcon}>
                                                            <Icon type={IconsType.material} name={Icons.erroroutline} size={Dimension.semilarge} color={colors.lightgrey} />
                                                        </View>
                                                    </View>
                                                    <View style={styles.subtwo}>
                                                        <Text style={styles.order}>{t("profile.Privacy Policy")}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('termsconditions')}>
                                        <View style={styles.MainView}>
                                            <View style={base.col12}>
                                                <View style={base.row}>
                                                    <View style={styles.subone}>
                                                        <View style={styles.viewIcon}>
                                                            <Icon type={IconsType.antDesign} name={Icons.book} size={Dimension.verysmall} color={colors.lightgrey} />
                                                        </View>
                                                    </View>
                                                    <View style={styles.subtwo}>
                                                        <Text style={styles.order}>{t("profile.Terms & Conditions")}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <Collapse isExpanded={expandlanguage} onToggle={(isExpanded) => setExpandLaguage(!expandlanguage)}>
                                        <CollapseHeader>
                                            <View style={styles.MainView}>
                                                <View style={base.col12}>
                                                    <View style={base.row}>
                                                        <View style={styles.subone}>
                                                            <View style={styles.viewIcon}>
                                                                <Icon name={Icons.language}
                                                                    type={IconsType.material}
                                                                    size={Dimension.smallicon} color={colors.lightgrey} />
                                                            </View>
                                                        </View>
                                                        <View style={styles.subtwo3}>
                                                            <Text style={styles.name}>{t("profile.Select Language")}</Text>
                                                        </View>
                                                        <View style={styles.Subtwo2}>
                                                            <Icon
                                                                type={IconsType.antDesign}
                                                                name={expandlanguage ? Icons.caretup : Icons.caretdown}
                                                                size={Dimension.Vsmall}
                                                                color={colors.black}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            <View style={base.container}>
                                                <View style={base.col12}>
                                                    <View style={styles.languageMain}>
                                                        <TouchableOpacity onPress={() => (selectLanguage('en'), setSelect('en'))}>
                                                            <Text style={select === 'en' ? styles.language1 : styles.language}>{t("English")}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => (selectLanguage('hi'), setSelect('hi'))}>
                                                            <Text style={select === 'hi' ? styles.language1 : styles.language}>{t("Hindi")}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => (selectLanguage('bn'), setSelect('bn'))}>
                                                            <Text style={select === 'bn' ? styles.language1 : styles.language}>{t("Bengali")}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => (selectLanguage('te'), setSelect('te'))}>
                                                            <Text style={select === 'te' ? styles.language1 : styles.language}>{t("Telugu")}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </CollapseBody>
                                    </Collapse>
                                    <TouchableOpacity onPress={() => logoutProfile()}>
                                        <View style={styles.MainView}>
                                            <View style={base.col12}>
                                                <View style={base.row}>
                                                    <View style={styles.subone}>
                                                        <View style={styles.viewIcon}>
                                                            <Icon type={IconsType.feather} name={Icons.logout} size={Dimension.verysmall} color={colors.lightgrey} />
                                                        </View>
                                                    </View>
                                                    <View style={styles.subtwo}>
                                                        <Text style={styles.order}>{t("profile.Log out")}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </CollapseBody>
                            </Collapse>
                        </View>
                    </View>
                    <View style={styles.viewImage}>
                        <View style={styles.MainImage}>
                            <Image style={styles.image}
                                source={Images.localcartlogo}
                                resizeMode='contain'
                            />
                        </View>
                        <Text style={styles.text}>v2.0.0</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};
const mapStateToProps = state => ({
    user: state.UserReducer.user,
    notificationCount: state.NotifyReducer.notify
});
export default connect(mapStateToProps)(MyProfileShop);