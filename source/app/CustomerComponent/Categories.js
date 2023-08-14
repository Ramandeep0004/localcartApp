import { Button, Icon, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import {
    FlatList, StyleSheet, TouchableOpacity, View
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const CategoriesModal = props => {

    return (
        <>
            <View style={props && props.products.length > 0 ? styles.modal : styles.modal2}>
                <View style={styles.listView}>
                    <View style={styles.flatlistContainer}>
                        <FlatList
                            contentContainerStyle={styles.listMain}
                            data={props.productsCategories}
                            keyExtractor={(item, index) => (`category-list` + index)}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => props.setItems(item, index)}>
                                    {
                                        item.count && parseInt(item.count) > 0 ?
                                            <View style={styles.containerlist}>
                                                <View style={styles.titleMain}>
                                                    <Text style={item.checked === true ? styles.Name : styles.name}>{item.name}</Text>
                                                </View>
                                                <View style={styles.numMain}>
                                                    <Text style={item.checked === true ? styles.Num : styles.num}>{parseInt(item.count)}</Text>
                                                </View>
                                            </View>
                                            : null
                                    }
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
                <View style={styles.mainicon}>
                    <Button
                        title={t('shopDetail.Cancel')}
                        icon={<Icon
                            name={Icons.cross}
                            type={IconsType.entypo}
                            size={Dimension.verysmall}
                            color={colors.white}
                        />}
                        buttonStyle={styles.buttonstyle}
                        onPress={() => props.close()} />
                </View>
            </View>
            <View style={styles.shawodDrop}>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    buttonstyle: {
        backgroundColor: colors.Secondary,
        height: hp(50),
        paddingVertical: vp(10),
    },
    shawodDrop: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        marginBottom: hp(0),
        left: 0,
        right: 0,
        zIndex: 11,
        paddingHorizontal: hzp(25),
        // backgroundColor: 'pink'
    },
    modal2: {
        position: 'absolute',
        bottom: -75,
        // marginBottom: hp(34),
        left: 0,
        right: 0,
        zIndex: 11,
        paddingHorizontal: hzp(25),
        // backgroundColor: 'pink'
    },
    listMain: {
        paddingTop: hp(8),
        paddingBottom: hp(10),
    },
    flatlistContainer: {
        marginTop: vp(20),

    },
    cancle: {
        paddingLeft: wp(8),
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.white,
    },
    listView: {
        borderRadius: hp(15),
        backgroundColor: colors.white,
        minHeight: hp(300),
        maxHeight: hp(500),
    },

    viewicon: {
        marginTop: hp(12),
        flexDirection: 'row',
        paddingHorizontal: hzp(15),
        paddingVertical: vp(10),
        borderRadius: hp(24),
        backgroundColor: colors.Secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    num: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    Num: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    titleMain: {
        flex: 0.8,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    numMain: {
        flex: 0.2,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    mainicon: {
        flexDirection: 'row',
        // backgroundColor: colors.Secondary,
        // borderRadius: hp(25),
        justifyContent: 'center',
        alignSelf: 'center',
        width: hp(120),
        marginBottom: vp(100),
        marginTop: vp(10),
    },
    containerlist: {
        paddingHorizontal: hzp(20),
        marginBottom: vp(20),
        flexDirection: 'row',
    },
    name: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textTransform: 'capitalize'
    },
    Name: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
        textTransform: 'capitalize'
    },
});

const mapStateToProps = state => ({
    products: state.AddToCartReducer.products,
});
export default connect(mapStateToProps)(CategoriesModal);
