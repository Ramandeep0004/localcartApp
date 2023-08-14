import { Icon, Image, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import ItemModal from '../CustomerComponent/ItemModal';

const FeatureItem = props => {
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(false);
    return (
        <>
            <FlatList
                contentContainerStyle={styles.flat}
                data={props.data}
                keyExtractor={(item, index) => (item, index)}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View>
                            <TouchableOpacity onPress={() => setItem(true)}>
                                <View style={item.check == true ? styles.viewgrey : styles.mainimage}>
                                    <Image style={styles.image} source={Images.bread} resizeMode='stretch' />
                                </View>
                            </TouchableOpacity>
                            {item.check == true ? <View style={styles.viewstock}>
                                <Text style={styles.stock}>Out of Stock</Text>
                            </View> : null}
                        </View>
                        <Text numberOfLines={1} style={styles.bonn}>Bonn Brown Bread</Text>
                        <Text style={styles.gram}>400 g</Text>
                        {item.check == false ? <View style={styles.submain}>
                            <View style={styles.subone}>
                                <Text style={styles.num}>₹24</Text>
                                <Text style={styles.Num}>₹25</Text>
                            </View>
                            <View style={styles.subtwo}>
                                <View style={styles.viewicons}>
                                    <Icon
                                        name={Icons.minus}
                                        type={IconsType.entypo}
                                        size={Dimension.small}
                                        color={colors.white}
                                        onPress={() => count ? setCount(count - 1) : 0}
                                    />
                                    <Text style={styles.number}>{count}</Text>
                                    <Icon
                                        name={Icons.plus}
                                        type={IconsType.entypo}
                                        size={Dimension.small}
                                        color={colors.white}
                                        onPress={() => setCount(count + 1)}
                                    />
                                </View>
                            </View>
                        </View> : null}
                    </View>
                )}
            />
            {item ? <ItemModal open={item} close={() => setItem(false)} navigation={props.navigation} /> : null}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        width: Dimensions.get('window').width / 2 - 29,
        marginRight: vp(18),
        marginBottom: vp(18)
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(178),
        // width: hp(178),
    },
    flat: {
        marginTop: vp(20),
        paddingBottom: hp(70),
    },
    bonn: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
        paddingTop: vp(7),
    },
    gram: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.black,
        paddingTop: vp(4),
    },
    submain: {
        flexDirection: 'row',
        paddingTop: vp(7),
    },
    subone: {
        flex: .65,
        flexDirection: 'row',
        // backgroundColor: 'green',
    },
    subtwo: {
        flex: .35,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
    },
    num: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    Num: {
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textDecorationLine: 'line-through',
        paddingLeft: vp(3),
        paddingTop: vp(2)
    },
    viewicons: {
        backgroundColor: colors.primary,
        borderRadius: hp(4),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: hp(24),
        width: hp(64)
    },
    number: {
        fontSize: fp(10),
        fontFamily: Font.semiBold,
        color: colors.white,
    },
    stock: {
        fontSize: fp(10),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    viewstock: {
        backgroundColor: colors.greyy,
        borderColor: colors.inputbordercol,
        borderWidth: 1,
        borderRadius: hp(30),
        paddingVertical: vp(10),
        paddingHorizontal: vp(20),
        width: hp(105),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginTop: vp(80),
        marginLeft: vp(45)
    },
    viewgrey: {
        backgroundColor: colors.background,
        opacity: 0.4,
        height: hp(178),
    },
});

export default FeatureItem;
