import { Image, Text } from '@rneui/themed';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { capitalizeFirstLetter, renderImage } from '../../app/components/Helper/general';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Images } from '../assets/global_style/images';
import NoRecord from './NoRecord';

const CategoryList = (props) => {

    return (
        <FlatList
            style={{
                flex: 1,
                marginHorizontal: -20,
                paddingTop: vp(15),
                paddingBottom: vp(10)
            }}
            contentContainerStyle={styles.flat}
            data={props.data}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ width: (Dimensions.get('window').width - 50) / 4 }}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={() => <NoRecord image={Images.cartnr} message={'No Category Found'} style={styles.emptyContainer} />}
            numColumns={4}
            renderItem={({ item, index }) => (
                <TouchableOpacity style={{ width: '100%', marginLeft: 10, }} onPress={() => props.action(item)}>
                    <View style={styles.catMain}>
                        <View style={styles.mainImage}>
                            <Image style={styles.image}
                                source={item.image  ? renderImage(item.image, 'medium') : Images.dummyCategory}
                            // resizeMode='cover'
                            />
                        </View>
                        <View style={{ marginBottom: hp(10) }}>
                            <Text style={styles.veg}>{item.category_name ? capitalizeFirstLetter(item.category_name) : capitalizeFirstLetter(item.name)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    subContainer: {
        // backgroundColor: colors.red,
        width: Dimensions.get('window').width / 4 - 20,
        //    marginRight: vp(15),
        // marginBottom: vp(17),
        // overflow: 'hidden',
        marginRight: 13.3,
    },
    catMain:{
        width: '100%', 
        alignItems: 'center',
        zIndex: 99999,
    },
    mainImage: {
        width: hp(86),
        height: hp(86),
        borderRadius: hp(10),
        overflow: 'hidden',
    },
    veg: {
        fontSize: fp(13),
        color: colors.grey,
        fontFamily: Font.regular,
        paddingHorizontal: vp(6),
        textAlign: 'center',
        paddingTop: vp(5),
        textTransform: 'capitalize',
    },
    flat: {
         flexGrow:1,
        //paddingBottom: 
        // height:'100%'
    },
    image: {
        height: '100%',
        width: '100%',
    },
    emptyContainer: {
        height: '100%',
        width: '100%',
        // marginTop: vp(15),
    }
});

export default CategoryList;