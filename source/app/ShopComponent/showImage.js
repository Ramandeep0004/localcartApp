import { Icon, Image, Text } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import Constant from '../../apis/constant';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, hzp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { UrlName } from '../components/Helper/general';

const ShowImage = (props) => {
    const { image } = props;
    return (
        <View>
            <DropShadow style={styles.Shadow}>
                <View style={styles.Con}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon type={IconsType.ionIcon}
                                    name={Icons.documenttextoutline}
                                    color={colors.black}
                                    size={Dimension.docicon}
                                />
                                <Text style={styles.img} numberOfLines={1}>{Image ? UrlName(image) : 'Image'}</Text>
                            </View>
                            {/* <Text style={styles.date}>25 april 2020</Text> */}
                        </View>
                        <View style={{ flex: 2, }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('fileWebView', { file: Constant.image + image, title: UrlName(image) })}>
                                <View style={styles.viewcircle}>
                                    <View style={styles.circle}>
                                        <Icon type={IconsType.antDesign}
                                            name={Icons.eyeo}
                                            size={Dimension.smallicon}
                                            color={colors.black}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </DropShadow>
        </View>
    );
};

const styles = StyleSheet.create({
    Con: {
        backgroundColor: colors.white,
        paddingHorizontal: vp(15),
        paddingVertical: vp(15),
        borderRadius: hp(10),
        marginTop: vp(15),
    },
    img: {
        fontSize: fp(15),
        fontFamily: Font.regular,
        color: colors.black,
        paddingLeft: hzp(6)
    },
    date: {
        fontSize: fp(13),
        fontFamily: Font.regular,
        color: colors.black,
        paddingTop: vp(6),
    },
    circle: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.offgrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewcircle: {
        alignItems: 'flex-end',
        // marginRight: vp(-5)
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(13),
        width: hp(18),
        overflow: 'hidden',
        backgroundColor: 'red'
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
    },
});

export default ShowImage;