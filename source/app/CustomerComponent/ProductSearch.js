import { Button, Icon, Image, Input, Text } from '@rneui/themed';
import React from 'react';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../assets/global_style/fontsize';
import { Images } from '../assets/global_style/images';
import { renderImage } from '../components/Helper/general';

const ProductSearchComp = props => {
    return (
        <View>
            <FlatList
                contentContainerStyle={styles.flat}
                data={props.data}
                keyExtractor={(item, index) => (index)}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => props.action(item)}>
                        <View style={styles.subContainer}>
                            <View style={styles.listMain}>
                                <View style={styles.imageMain}>
                                    <View style={styles.imgContainer}>
                                        <Image
                                            style={styles.image}
                                            source={item.image ? renderImage(item.image[0], 'medium') : Images.dummyCategory}
                                        />
                                    </View>
                                </View>
                                <View style={styles.titleMain}>
                                    <Text style={styles.shoptitle}>{item.shop_name ? item.shop_name : ''}</Text>
                                    <Text style={styles.title}>{item.title ? item.title : ''} </Text>
                                    <Text style={styles.weightTxt}>{item.units ? item.units : ''}</Text>
                                </View>
                            </View>
                            <View style={styles.line}></View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listMain: {
        flexDirection: 'row',
        alignItems:'center'
    },
    flat: {
        paddingBottom: hp(30),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    weightTxt: {
        lineHeight: hp(26),
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.darkblack,
    },
    imgContainer: {
        height: hp(60),
        width: wp(60),
    },
    shoptitle: {
        fontSize: fp(17),
        fontFamily: Font.semiBold,
        color: colors.darkblack,
    },
    title: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.darkblack,
    },
    titleMain: {
        marginTop: hp(5),
        marginLeft: hp(15)
    },
    subContainer: {
        // marginVertical: vp(10),
        marginBottom: vp(15),
    },
    line: {
        marginTop: hp(15),
        borderBottomColor: colors.buttonborder,
        borderBottomWidth: wp(1),
    },
});

export default ProductSearchComp;
