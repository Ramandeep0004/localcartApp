import { Button, Icon, Image, Input, Text } from '@rneui/themed';
import React from 'react';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ImageBackground, StatusBar, View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Images } from '../assets/global_style/images';

const SearchProductList = props => {
    return (
        <View>
            <FlatList
                contentContainerStyle={styles.flat}
                data={props.data}
                horizontal={true}
                keyExtractor={(item, index) => (item, index)}
                renderItem={({ item, index }) => (
                    <View style={styles.subContainer}>
                        <View style={styles.imgContainer}>
                            <Image
                                style={styles.image}
                                source={item.img}
                                resizeMode="stretch"
                            />
                        </View>
                        <View style={styles.titleMain}>
                            <Text style={styles.productname}>{item.productname}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <View style={styles.rupessMain}>
                                <Text style={styles.rupees}>₹24</Text>

                                <Text style={styles.price}>₹25</Text>
                            </View>
                            <View style={styles.butttonMain}>
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.AddTxt}>ADD</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    subContainer: {
        // paddingHorizontal: hzp(10),
        backgroundColor: 'red',
    },
    AddTxt: {
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.white,
    },
    buttonContainer: {
        paddingHorizontal: hzp(18),
        paddingVertical: vp(5),
        borderRadius: hp(5),
        backgroundColor: colors.primary,
    },
    butttonMain: {
        marginRight: wp(3),
        flex: 0.8,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    price: {
        marginLeft: wp(3),
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textDecorationLine: 'line-through',
        marginTop: vp(4),
    },
    rupees: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    rupessMain: {
        flex: 0.2,
        flexDirection: 'row',
    },
    priceContainer: {
        marginTop: hp(10),
        flexDirection: 'row',
    },
    titleMain: {
        width: '90%',
        marginTop: hp(8),
    },
    productname: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    flat: {
        // marginHorizontal:hzp(12),
    },
    imgContainer: {
        width: wp(178),
        height: hp(190),
        backgroundColor: 'green',
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

export default SearchProductList;
