import { useIsFocused } from '@react-navigation/native';
import { Badge, Header } from '@rneui/base';
import { Icon, Image, Text } from '@rneui/themed';
import {
    Collapse,
    CollapseBody,
    CollapseHeader
} from 'accordion-collapse-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import authController from '../../../../apis/Controller/auth.controller';
import customerProfileController from '../../../../apis/Controller/customer/customer.profile.controller';
import languageController from '../../../../apis/Controller/LanguageController/language.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import { capitalizeFirstLetter, renderImage } from '../../Helper/general';
import { styles } from './style';
import RNRestart from 'react-native-restart';
import { changeLanguages } from '../../../../translation';
import { t } from 'i18next';

const CustomerMyProfile = props => {
    const [data, setData] = useState(null);
    const [expand, setExpand] = useState(true);
    const [select, setSelect] = useState(null);
    const [expandlanguage, setExpandLaguage] = useState(false);

    let isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getSelectedLanguage();
            getProfile();
            setExpandLaguage(false);
        }
    }, [isFocus]);

    const getProfile = async () => {
        let response = await customerProfileController.customerProfile()
        if (response) {
            setData(response.user);
        }
        else return;
    };

    const logoutProfile = async () => {
        await authController.logout();
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
                leftContainerStyle={{ justifyContent: 'center' }}
                centerComponent={<Text numberOfLines={1} style={styles.title}>{t("profile.My Profile")}</Text>}
                rightComponent={
                    <TouchableOpacity onPress={() => props.navigation.navigate('customprofile')}>
                        <View style={styles.mainImage}>
                            <Image style={styles.image}
                                source={props.user && props.user.image ? renderImage(props.user.image, 'medium') : Images.user}
                            />
                        </View>
                    </TouchableOpacity>}
                statusBarProps={{
                    barStyle: 'light-content',
                    backgroundColor: colors.Secondary,
                    translucent: true
                }}
            />
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.ProfileMainView}>
                    <View style={base.container}>
                        <View style={base.row}>
                            <View style={base.col12}>
                                <View style={styles.profileContainer}>
                                    <View style={styles.profileMain}>
                                        <View style={styles.imgContainer}>
                                            <View style={styles.imgMain}>
                                                <TouchableOpacity onPress={() => props.navigation.navigate('customprofile')}>
                                                    <Image
                                                        style={styles.image}
                                                        source={data && data.image ? renderImage(data.image, 'medium') : Images.user}
                                                        resizeMode="cover"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {
                                            data ?
                                                <View style={styles.descriptionMain}>
                                                    <TouchableOpacity onPress={() => props.navigation.navigate('customprofile')}>
                                                        <Text style={styles.titleMain}>{capitalizeFirstLetter(data.first_name) + ' ' + capitalizeFirstLetter(data.last_name)}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => props.navigation.navigate('customprofile')}>
                                                        <Text style={styles.numberTxt}>{data.phonenumber ? data.phonenumber : null}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                null
                                        }

                                    </View>

                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                props.navigation.navigate('customereditprofile')
                                            }>
                                            <View style={styles.circleMain}>
                                                <Icon
                                                    name={Icons.pencil}
                                                    type={IconsType.octIcon}
                                                    color={colors.white}
                                                    size={Dimension.smallicon}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={base.container}>
                    <View style={styles.viewheader}>
                        <View style={base.col12}>
                            <View style={base.row}>
                                <View style={styles.Subone}>
                                    <Text style={styles.Info}>{t('profile.Your Information')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('customerwallet')}>
                        <View style={styles.MainView}>
                            <View style={base.col12}>
                                <View style={base.row}>
                                    <View style={styles.subone}>
                                        <View style={styles.viewIcon}>
                                            <Icon type={IconsType.antDesign} name={Icons.wallet} size={Dimension.verysmall} color={colors.lightgrey} />
                                        </View>
                                    </View>
                                    <View style={styles.subtwo}>
                                        <Text style={styles.order}>{t('profile.Wallet')}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('notification')}>
                        <View style={styles.MainView}>
                            <View style={base.col12}>
                                <View style={base.row}>
                                    <View style={styles.subone}>
                                        <View style={styles.viewIcon}>
                                            <Icon type={IconsType.simpleLineIcon} name={Icons.bell} size={Dimension.verysmall} color={colors.lightgrey} />
                                        </View>
                                    </View>
                                    <View style={styles.subtwo}>
                                        <Text style={styles.order}>{t('profile.Notifications')}</Text>
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
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('customersavedorder')}>
                        <View style={styles.MainView}>
                            <View style={base.col12}>
                                <View style={base.row}>
                                    <View style={styles.subone}>
                                        <View style={styles.viewIcon}>
                                            <Icon type={IconsType.fontAwesome} name={Icons.bookmarko} size={Dimension.verysmall} color={colors.lightgrey} />
                                        </View>
                                    </View>
                                    <View style={styles.subtwo}>
                                        <Text style={styles.order}>{t('profile.Saved Orders')}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('customersaveaddress')}>
                        <View style={styles.MainView}>
                            <View style={base.col12}>
                                <View style={base.row}>
                                    <View style={styles.subone}>
                                        <View style={styles.viewIcon}>
                                            <Icon type={IconsType.simpleLineIcon} name={Icons.locationpin} size={Dimension.verysmall} color={colors.lightgrey} />
                                        </View>
                                    </View>
                                    <View style={styles.subtwo}>
                                        <Text style={styles.order}>{t('profile.My Addresses')}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('customerreferral')}>
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
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('customerrewards')}>
                        <View style={styles.MainView}>
                            <View style={base.col12}>
                                <View style={base.row}>
                                    <View style={styles.subone}>
                                        <View style={styles.viewIcon}>
                                            <Icon type={IconsType.antDesign} name={Icons.gift} size={Dimension.semilarge} color={colors.lightgrey} />
                                        </View>
                                    </View>
                                    <View style={styles.subtwo}>
                                        <Text style={styles.order}>{t('profile.Rewards')}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('customerspinner')}>
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
                                        <Text style={styles.name}>{t('profile.Spin & Earn')}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('changepassword')}>
                        <View style={styles.MainView}>
                            <View style={base.col12}>
                                <View style={base.row}>
                                    <View style={styles.subone}>
                                        <View style={styles.viewIcon}>
                                            <Icon type={IconsType.feather} name={Icons.lock} size={Dimension.verysmall} color={colors.lightgrey} />
                                        </View>
                                    </View>
                                    <View style={styles.subtwo}>
                                        <Text style={styles.order}>{t('profile.Change Password')}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={base.container}>
                    <Collapse isExpanded={expand}
                        onToggle={(isExpanded) => setExpand(!expand)}>
                        <CollapseHeader>
                            <View style={styles.viewheader}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.Subone}>
                                            <Text style={styles.Info}>{t('profile.Other Information')}</Text>
                                        </View>
                                        <View style={styles.Subtwo}>
                                            <Icon type={IconsType.antDesign} name={expand ? Icons.caretup : Icons.caretdown} size={Dimension.Vsmall} color={colors.black} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>

                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('faq')}>
                                <View style={styles.mainView}>
                                    <View style={base.col12}>
                                        <View style={base.row}>
                                            <View style={styles.subone}>
                                                <View style={styles.viewIcon}>
                                                    <Icon type={IconsType.antDesign} name={Icons.questioncircleo} size={Dimension.verysmall} color={colors.lightgrey} />
                                                </View>
                                            </View>
                                            <View style={styles.subtwo}>
                                                <Text style={styles.order}>{t('profile.FAQ')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('aboutlocalcart')}>
                                <View style={styles.MainView}>
                                    <View style={base.col12}>
                                        <View style={base.row}>
                                            <View style={styles.subone}>
                                                <View style={styles.viewIcon}>
                                                    <Icon type={IconsType.antDesign} name={Icons.infocirlceo} size={Dimension.verysmall} color={colors.lightgrey} />
                                                </View>
                                            </View>
                                            <View style={styles.subtwo}>
                                                <Text style={styles.order}>{t('profile.About Local Cart')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('feedback')}>
                                <View style={styles.MainView}>
                                    <View style={base.col12}>
                                        <View style={base.row}>
                                            <View style={styles.subone}>
                                                <View style={styles.viewIcon}>
                                                    <Icon type={IconsType.octIcon} name={Icons.lightbulb} size={Dimension.smallicon} color={colors.lightgrey} />
                                                </View>
                                            </View>
                                            <View style={styles.subtwo}>
                                                <Text style={styles.order}>{t('profile.Contact Us/Feedback')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('privacypolicy')}>
                                <View style={styles.MainView}>
                                    <View style={base.col12}>
                                        <View style={base.row}>
                                            <View style={styles.subone}>
                                                <View style={styles.viewIcon}>
                                                    <Icon type={IconsType.material} name={Icons.erroroutline} size={Dimension.semilarge} color={colors.lightgrey} />
                                                </View>
                                            </View>
                                            <View style={styles.subtwo}>
                                                <Text style={styles.order}>{t('profile.Privacy Policy')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('termsconditions')}>
                                <View style={styles.MainView}>
                                    <View style={base.col12}>
                                        <View style={base.row}>
                                            <View style={styles.subone}>
                                                <View style={styles.viewIcon}>
                                                    <Icon type={IconsType.antDesign} name={Icons.book} size={Dimension.verysmall} color={colors.lightgrey} />
                                                </View>
                                            </View>
                                            <View style={styles.subtwo}>
                                                <Text style={styles.order}>{t('profile.Terms & Conditions')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {/* <View style={base.container}> */}
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
                                                    <Text style={styles.name}>{t('profile.Select Language')}</Text>
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
                                                    <Text style={select === 'en' ? styles.language1 : styles.language}>{t('English')}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => (selectLanguage('hi'), setSelect('hi'))}>
                                                    <Text style={select === 'hi' ? styles.language1 : styles.language}>{t('Hindi')}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => (selectLanguage('bn'), setSelect('bn'))}>
                                                    <Text style={select === 'bn' ? styles.language1 : styles.language}>{t('Bengali')}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => (selectLanguage('te'), setSelect('te'))}>
                                                    <Text style={select === 'te' ? styles.language1 : styles.language}>{t("Telugu")}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </CollapseBody>
                            </Collapse>
                            {/* </View> */}
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
                                                <Text style={styles.order}>{t('profile.Log out')}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </CollapseBody>
                    </Collapse>
                </View>
                <View style={base.container}>
                    <View style={styles.ImageContainer}>
                        <View style={styles.ImageMain}>
                            <Image
                                style={styles.image}
                                source={Images.logoimg}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView >
        </View >
    );
};

const mapStateToProps = state => ({
    notificationCount: state.NotifyReducer.notify,
    user: state.UserReducer.user,
});
export default connect(mapStateToProps)(CustomerMyProfile);
