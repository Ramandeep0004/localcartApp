import { Icon, Image, Input, Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { base } from '../../../assets/global_style/base';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Dimension } from '../../../assets/global_style/dimension';
import { colors } from '../../../assets/global_style/colors';
import { Images } from '../../../assets/global_style/images';
import { StatusBar } from 'react-native';
import customerProfileController from '../../../../apis/Controller/customer/customer.profile.controller';
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import Loader from '../../Helper/loader';
import { renderImage } from '../../Helper/general';
import { t } from 'i18next';
import { TouchableOpacity } from 'react-native';

const CustomProfile = props => {
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    const [profileDetail, setProfileDetail] = useState(null);
    const [loader, setLoader] = useState(false);
    const isFocus = useIsFocused();
    useEffect(() => {
        setLoader(true)
        getProfile();
    }, [isFocus]);

    const getProfile = async () => {

        let response = await customerProfileController.customerProfile();
        if (response && response.status) {
            setProfileDetail(response.user);
            setLoader(false);
        }
        else {
            setLoader(false)
        }
    };

    return (
        // <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
        <View style={base.container}>
            {profileDetail && !loader ?
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
                                    onPress={() => props.navigation.navigate('customereditprofile')}
                                />
                            </View>
                        </View> */}
                    </View>
                    <View style={styles.viewedit}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('customereditprofile')}>
                            <Text style={styles.edit}>{t("customersignup.Edit Profile")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                null
            }

            {profileDetail && !loader ? <View style={styles.subCon}>
                <View style={base.subrow}>
                    <View style={styles.viewIcon}>
                        <Icon type={IconsType.octIcon} name={Icons.people} color={colors.black} size={Dimension.verysmall} />
                    </View>
                    {profileDetail && profileDetail.first_name && profileDetail.last_name ? <View style={styles.textline}>
                        <Text numberOfLines={1} style={styles.name}>{t("customersignup.Name")}</Text>
                        <Text style={styles.Name}>{profileDetail.first_name}{' '}{profileDetail.last_name}</Text>
                    </View> : null}
                </View>
                {profileDetail && profileDetail.phonenumber ? <View style={styles.submain}>
                    <View style={base.subrow}>
                        <View style={styles.viewIcon}>
                            <Icon type={IconsType.feather} name={Icons.phone} color={colors.black} size={Dimension.verysmall} />
                        </View>
                        <View style={styles.textline}>
                            <Text numberOfLines={1} style={styles.name}>{t("customersignup.Mobile Number")}</Text>
                            <Text style={styles.Name}>{profileDetail.phonenumber}</Text>
                        </View>
                    </View>
                </View> : null}
                {profileDetail && profileDetail.email ? <View style={styles.submain}>
                    <View style={base.subrow}>
                        <View style={styles.viewIcon}>
                            <Icon type={IconsType.antDesign} name={Icons.mail} color={colors.black} size={Dimension.verysmall} />
                        </View>
                        <View style={styles.textline}>
                            <Text numberOfLines={1} style={styles.name}>{t("customersignup.Email Address")} </Text>
                            <Text style={styles.email}>{profileDetail.email}</Text>
                        </View>
                    </View>
                </View> : null}
                {profileDetail && profileDetail.aadhar_no ? <View style={styles.submain}>
                    <View style={base.subrow}>
                        <View style={styles.viewIcon}>
                            <Icon type={IconsType.fontAwesome5} name={Icons.fingerprint} color={colors.black} size={Dimension.verysmall} />
                        </View>
                        <View style={styles.textline}>
                            <Text numberOfLines={1} style={styles.name}>{t("customersignup.Aadhar Number")} </Text>
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
                                <Text numberOfLines={1} style={styles.name}>{t("customersignup.Address")} </Text>
                                <Text style={styles.email}>{profileDetail.address && profileDetail.address.address ? `${profileDetail.address.address},` : null} {profileDetail.address.city_name ? `${profileDetail.address.city_name},` : null} {profileDetail.address.district_name ? `${profileDetail.address.district_name},` : null} {profileDetail.address.state_name ? `${profileDetail.address.state_name}` : null}</Text>
                            </View>
                        </View>
                    </View> : null}
            </View> : null}
            <Loader loader={loader} />
        </View>
        // </View>
    );
};
export default CustomProfile;
