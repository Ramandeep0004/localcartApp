import { Icon, Image, Text } from '@rneui/themed';
import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { renderImage } from '../../app/components/Helper/general'
import { t } from 'i18next';


const StoreListing = (props) => {
    const item = props && props.item;
    console.log(item && item.address);
    return (
        <DropShadow style={styles.Shadow}>
            <TouchableOpacity onPress={() => props.action(item)} style={{ flexGrow: 1 }}>
                {item ? <View style={styles.subCon}>
                    <View style={styles.mainopen}>
                        <View style={[styles.viewopen, { backgroundColor: item && parseInt(item.status) === 1 ? colors.lightgreen : colors.lightred }]}>
                            <Text style={[styles.open, { color: item && parseInt(item.status) === 1 ? colors.parrotgreen : colors.red }]}>{item && parseInt(item.status) === 1 ? t('shopsListing.Open') : t('shopsListing.Close')}</Text>
                        </View>
                    </View>
                    <View style={styles.Main}>
                        <View style={styles.MainImage}>
                            <Image
                                style={styles.image}
                                source={item && item.image ? renderImage(item && item.image, 'medium') : Images.dummyShop}
                            />
                        </View>
                        <Text style={styles.store} numberOfLines={2}>{item && item.shop_name}</Text>
                        {item && item.shop_type ? <Text style={styles.diary}>{item && parseInt(item.shop_type) === 1 ? t('shopsListing.Organic') : item && parseInt(item.shop_type) === 3 ? t('shopsListing.Non Organic') : t('shopsListing.Organic, Non Organic')}</Text> : null}
                        {
                            item && item.address ?
                                <View style={styles.submain}>
                                    <View>
                                        <Icon
                                            type={IconsType.ionIcon}
                                            name={Icons.locationsharp}
                                            color={colors.grey}
                                            size={Dimension.Vsmall}
                                        />
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection:'row',
                                        flexWrap: 'wrap',
                                        alignItems:'center'
                                    }}>
                                        <Text numberOfLines={2} style={styles.lore}>{item && item.address && item.address.address}, {item && item.address && item.address.city}</Text>
                                    </View>
                                </View>
                                :
                                null
                        }
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
                        }]}>
                            {item.shop_tag}
                        </Text>
                    </View> : null}
                </View> : null}

            </TouchableOpacity>
        </DropShadow >
    );
};

const styles = StyleSheet.create({
    subCon: {
        backgroundColor: colors.white,
        width: Dimensions.get('window').width / 2 - 33,
        marginRight: vp(20),
        marginBottom: vp(21),
        paddingHorizontal: vp(10),
        borderRadius: hp(10),
        marginLeft: vp(2),
        marginTop: vp(2),
        flexGrow: 1,
        overflow: 'hidden'
    },
    badge: {
        backgroundColor: colors.Secondary,
        textAlign: 'center',
        alignItems: 'center',
        transform: [{ rotate: '-45deg' }],
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        marginTop: hp(20),
        marginLeft: wp(-110),
    },
    badge_txt: {
        fontSize: fp(12),
        fontFamily: Font.semiBold,
        paddingVertical: hp(3),
        color: colors.white,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    open: {
        fontSize: fp(10.5),
        fontFamily: Font.medium,
        textTransform: 'capitalize'
        // color: colors.parrotgreen,
    },
    viewopen: {
        //height: hp(18),
        //width: hp(48),
        // backgroundColor: colors.offLgreen,
        borderRadius: hp(20),
        paddingHorizontal: hp(12),
        paddingVertical: hp(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainopen: {
        alignItems: 'flex-end',
        marginTop: vp(10)
    },
    MainImage: {
        height: hp(90),
        width: hp(90),
        borderRadius: hp(45),
        overflow: 'hidden',
    },
    Main: {
        alignItems: 'center',
        marginTop: vp(8),
        paddingBottom: vp(20),
    },
    store: {
        fontSize: fp(19),
        color: colors.black,
        fontFamily: Font.semiBold,
        paddingTop: vp(12),
        textTransform: 'capitalize',
        textAlign: 'center'
    },
    diary: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.grey,
        textTransform: 'capitalize'
    },
    submain: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: vp(4),
        // backgroundColor: 'red'
    },
    lore: {
        fontSize: fp(14),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        // marginTop: vp(-1),
        textTransform: 'capitalize',
        paddingLeft: vp(4),
    },
    Flat: {
        // marginTop: vp(10),
        paddingBottom: vp(10),
    },
    Shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        flexGrow: 1
    },
    emptyState: {
        height: '100%',
        width: '100%',
        // marginTop : vp(50)
    }
});

export default StoreListing;