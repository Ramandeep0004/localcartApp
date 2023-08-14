import { Icon, Image, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { Dimensions, FlatList } from 'react-native';

import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';

const FeatureitemListing = props => {
    const [num, setNum] = useState(1);
    const incNumber = () => {
        setNum(num + 1);
    };
    const decNumber = () => {
        setNum(num - 1);
    };
    return (
        <View>

            <FlatList
                contentContainerStyle={styles.listMain}
                // data={[1, 2, 3, 4,5,6,7,8,9,10]}
                data={[{ img: Images.bread, name: 'Bonn Brown Bread' },
                { img: Images.bread, name: 'Bonn Atta Whole Wheat Bread' },
                { img: Images.bread1, name: 'Bonn Brown Bread' },
                { img: Images.bread2, name: 'Bonn Atta Whole Wheat Bread' },
                { img: Images.bread },
                { img: Images.bread },
                { img: Images.bread },
                { img: Images.bread },


                ]}
                numColumns={2}
                keyExtractor={(index, item) => (index, item)}
                renderItem={({ item }) => (
                    <View>

                        <View style={styles.containerlist}>

                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.image}
                                    source={item.img}
                                    resizeMode="cover"
                                />
                            </View>

                        </View>

                        <View style={styles.textMain}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.grmTxt}>400 g</Text>
                            <View style={styles.priceContainer}>
                                <View style={styles.priceMain}>
                                    <Text style={styles.rupesTxt}>₹24</Text>

                                </View>
                                <View>
                                    <Text style={styles.rupesTxt2}>₹25</Text>
                                </View>
                                <View style={styles.iconMain}>
                                    <View>
                                        <Icon
                                            onPress={decNumber}
                                            name={Icons.minus}
                                            type={IconsType.entypo}
                                            size={Dimension.Vsmall}
                                            color={colors.white}
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.numText}>1</Text>
                                    </View>
                                    <View>
                                        <Icon
                                            onPress={incNumber}
                                            name={Icons.plus}
                                            type={IconsType.entypo}
                                            size={Dimension.Vsmall}
                                            color={colors.white}
                                        />
                                    </View>
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
    containerlist: {
        width: Dimensions.get('window').width / 2 - 28,
        backgroundColor: colors.offgrey,
        marginHorizontal: hzp(10),
        marginVertical: vp(10),
    },
    image: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
    imgContainer: {
        height: hp(180),
    },
    textMain: {
        width: "80%",
        marginLeft: wp(10)
    },
    name: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.black,
    },
    grmTxt: {
        marginTop: hp(18),
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    priceContainer: {
        marginTop: hp(10),
        flexDirection: 'row',
    },
    rupesTxt: {
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    rupesTxt2: {
        marginTop: hp(2),
        marginLeft: wp(4),
        textDecorationLine: 'line-through',
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    iconMain: {
        marginLeft: wp(65),
        paddingHorizontal: hzp(5),
        paddingVertical: vp(5),
        borderRadius: hp(8),
        backgroundColor: colors.primary,
        flexDirection: 'row',
    },
    numText: {
        paddingHorizontal: hzp(5),
        fontSize: fp(11),
        fontFamily: Font.regular,
        color: colors.white,
    },
});

export default FeatureitemListing;
