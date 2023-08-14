import { Icon, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { Linking } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, hzp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { renderImage } from '../components/Helper/general';

const ShopStoreLoc = (props) => {
    const { showtext, showbtn, showText, showBtn, item } = props;

    return (
        <>
            {item ?
                <View style={styles.viewmain}>
                    <View style={{ width: wp(90) }}>
                        <View style={styles.mainimage}>
                            <Image style={styles.image}
                                source={item.image ? renderImage(item.image, "medium") : Images.dummyShop}
                            />
                        </View>
                        <View style={styles.Mainimage}>
                            <View style={styles.imageSub}>
                                <Image style={styles.image}
                                    source={item.user && item.user.user_image ? renderImage(item.user.user_image, "small") : Images.user}
                                // resizeMode='cover'
                                />
                            </View>
                        </View>
                        {item.shop_tag ? <View style={[styles.badge, {
                            backgroundColor: item.shop_tag === "Bronze" ? colors.bronze :
                                item.shop_tag === "Bronze Plus" ? colors.bronze :
                                    item.shop_tag === "Silver" ? colors.silver :
                                        item.shop_tag === "Silver Plus" ? colors.silver :
                                            item.shop_tag === "Gold" ? colors.gold :
                                                item.shop_tag === "Gold Plus" ? colors.gold :
                                                    item.shop_tag === "Platinum" ? colors.platinum :
                                                        item.shop_tag === "Platinum Plus" ? colors.platinum :
                                                            item.shop_tag === "Diamond" ? colors.diamond :
                                                                colors.white
                        }]}>
                            <Text style={[styles.badge_txt, {
                                color: item.shop_tag === "Silver" ? colors.black :
                                    item.shop_tag === "Silver Plus" ? colors.black :
                                        item.shop_tag === "Gold" ? colors.black :
                                            item.shop_tag === "Gold Plus" ? colors.black :
                                                item.shop_tag === "Platinum" ? colors.black :
                                                    item.shop_tag === "Platinum Plus" ? colors.black :
                                                        item.shop_tag === "Diamond" ? colors.black :
                                                            colors.white
                            }]}>{item.shop_tag}</Text>
                        </View> : null}
                    </View>

                    <View style={styles.submain}>
                        <View style={styles.Main}>
                            <View style={styles.mainone}>
                                {item && item.shop_name ? <Text style={styles.store}>{item.shop_name}</Text> : null}
                            </View>
                            <View style={styles.maintwo}>
                                {item && item.shop_type ?
                                    <View style={styles.vieworganic}>
                                        <Text style={styles.organic}>{item && item.shop_type && item.shop_type.title}</Text>
                                    </View> : null}
                            </View>
                        </View>
                        {item && item.user && item.shopkeeper_type ?
                            <Text style={styles.arnav}>{item && item.user && item.user.first_name} {item && item.user && item.user.last_name} ({item && item.shopkeeper_type && item.shopkeeper_type.title}) </Text> : null}
                        {item && item.shop_open_time && item.shop_close_time ?
                            <Text style={styles.arnav}>{t("shopDetail.Shop Time")} : {item && item.shop_open_time && item.shop_open_time} - {item && item.shop_close_time && item.shop_close_time} </Text> : null}
                        {item && item.shop_open_time && item.shop_close_time ?
                            <Text style={styles.arnav}>{t("shopDetail.Home Delivery")} : <Text style={item && item.home_delivery === 1 ? styles.arnav33 : styles.arnav22}>{item && item.home_delivery === 1 ? t('shopDetail.Available') : t('shopDetail.Not Available')}</Text></Text> : null}
                        {item && item.address && item.address.address ?
                            <View style={styles.mainloc}>
                                <View style={[styles.mainOne, {}]}>
                                    <View style={{ width: wp(12) }}>
                                        <Icon
                                            name={Icons.ioslocationsharp}
                                            type={IconsType.ionIcon}
                                            size={Dimension.Vsmall}
                                            color={colors.lightgrey}
                                            style={styles.icon}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.lore}>{item && item.address && item.address.address}</Text>
                                    </View>
                                </View>
                                {item && item.google_map_url ?
                                    <View style={styles.mainTwo}>
                                        <TouchableOpacity onPress={() => Linking.openURL(item && item.google_map_url)}>
                                            <Icon
                                                name={Icons.map}
                                                color={colors.black}
                                                type={IconsType.feather}
                                                size={Dimension.verysmall}
                                            />
                                        </TouchableOpacity>
                                    </View> : null}
                            </View> : null}
                    </View>
                </View> : null}
        </>
    );
};

const styles = StyleSheet.create({
    viewmain: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    image: {
        height: '100%',
        width: '100%',
        // borderRadius: hp(20),

    },
    mainimage: {
        height: hp(90),
        width: hp(90),
        borderRadius: hp(45),
        overflow: 'hidden',

    },
    Mainimage: {
        height: hp(40),
        width: hp(40),

        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: hp(-7),
        marginRight: vp(-3),

    },
    imageSub: {
        overflow: 'hidden',
        borderRadius: hp(20),
        borderWidth: hp(2),
        borderColor: colors.lightred
    },
    submain: {
        flex: 1,
        paddingLeft: vp(25),
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    Main: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    mainone: {
        flex: .7,
        // backgroundColor: 'green',
    },
    maintwo: {
        flex: .3,
        // marginTop: vp(-10),
        // backgroundColor: 'red'
    },
    store: {
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.black,
        textTransform: "capitalize",
        marginTop: hp(25)
    },
    organic: {
        fontSize: fp(12),
        color: colors.darkkgreen,
        fontFamily: Font.medium,
        textTransform: "capitalize",
    },
    vieworganic: {
        backgroundColor: colors.offLgreen,
        height: vp(23),
        borderRadius: hp(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
    arnav: {
        fontSize: fp(16),
        color: colors.grey,
        fontFamily: Font.medium,
        paddingTop: vp(4),
        textTransform: "capitalize",
    },
    arnav22: {
        fontSize: fp(16),
        color: colors.red,
        fontFamily: Font.medium,
        paddingTop: vp(4),
        textTransform: "capitalize",
    },
    arnav33: {
        fontSize: fp(16),
        color: colors.darkkgreen,
        fontFamily: Font.medium,
        paddingTop: vp(4),
        textTransform: "capitalize",
    },
    mainloc: {
        flexDirection: 'row',
        paddingTop: vp(4),
        // backgroundColor: 'red',
        justifyContent: 'center',
    },
    mainOne: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    mainTwo: {
        width: wp(30),
    },
    lore: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.grey,
        paddingLeft: vp(3),
        textTransform: "capitalize",
    },
    icon: {
        marginTop: vp(1),
        marginLeft: vp(-2)
    },
    badge: {
        backgroundColor: colors.Secondary,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        height: vp(23),
        paddingHorizontal: hzp(10),
        borderRadius: wp(20),
        position: 'absolute',
        bottom: 0,
        marginBottom: hp(-40)
    },
    badge_txt: {
        fontSize: fp(12),
        fontFamily: Font.semiBold,
        paddingVertical: hp(3),
        color: colors.white,

    },
});

export default ShopStoreLoc;
