import { Image } from '@rneui/themed';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { colors } from '../../assets/global_style/colors';
import { hp } from '../../assets/global_style/fontsize';
import { Images } from '../../assets/global_style/images';
import { renderImage } from './general';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Sliders = props => {
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ marginHorizontal: hp(20) }}>
                <Image
                    style={styles.image22}
                    source={item.image ? renderImage(item.image, 'large') : Images.frame}
                />
            </View>
        )
    }
    return (
        <View style={styles.viewcarousel}>
            <Carousel
                layout={'default'}
                autoplay={props.item && props.item.length === 1 ? false : true}
                loop={true}
                scrollEnabled
                data={props.item}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={width}
            />
            {/* <View style={styles.viewpagination}>
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={index}
                    containerStyle={{}}
                    dotStyle={{
                        width: 20,
                        height: 8,
                        borderRadius: 5,
                        marginHorizontal: 0,
                        backgroundColor: colors.Secondary
                    }}
                    inactiveDotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 1,
                        backgroundColor: colors.gray
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}

                />
            </View> */}
        </View>

    );
};

const styles = StyleSheet.create({

    viewcarousel: {
        height: hp(200),
        width: '100%',
        // backgroundColor: 'red',
        // overflow: 'hidden',
        // marginTop: vp(25),
        borderRadius: hp(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    image22: {
        height: '100%',
        width: '100%',
        borderRadius: hp(20),

    },
});
export default Sliders;