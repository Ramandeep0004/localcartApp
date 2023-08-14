import { Button, CheckBox, Icon, Image, Input, Text } from '@rneui/themed';
import React from 'react';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ImageBackground, StatusBar, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, hzp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';

const TrendingList = (props) => {
    const { index } = props;
    const [check, setcheck] = useState();
    return (
        <View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flat}
                data={props.data}
                horizontal={true}
                keyExtractor={(index, item) => (item, index)}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={styles.mainimage}>
                            <Image style={styles.image} source={Images.bread} resizeMode='contain' />
                        </View>
                        <Text style={styles.bonn}>Bonn Brown Bread</Text>
                        <View style={styles.mainview}>
                            <View style={styles.viewone}>
                                <Text style={styles.num}>₹24</Text>
                                <Text style={styles.count}>₹25</Text>
                            </View>
                            <View style={styles.viewtwo}>
                                <View style={styles.viewadd}>
                                    <Text style={styles.add}>Add</Text>
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
    flat: {
        marginTop: vp(20),
    },
    container: {
        marginRight: vp(20),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(178),
        width: hp(178),
    },
    bonn: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
        paddingTop: vp(7),
    },
    mainview: {
        flexDirection: 'row',
        marginTop: vp(10),
    },
    viewone: {
        flex: .8,
        flexDirection: 'row',
        // backgroundColor: 'green'
    },
    viewtwo: {
        flex: .2,
        // backgroundColor: 'red'
    },
    num: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    count: {
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textDecorationLine: 'line-through',
        paddingTop: vp(3),
        paddingLeft: vp(5)
    },
    add: {
        fontSize: fp(12),
        color: colors.white,
        fontFamily: Font.regular,
    },
    viewadd: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(4),
        paddingVertical: vp(5),
        paddingHorizontal: vp(15),
    },
});

export default TrendingList;