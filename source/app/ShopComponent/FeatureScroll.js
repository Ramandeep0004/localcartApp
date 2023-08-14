import React, { useEffect, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, vp } from '../assets/global_style/fontsize';

export const FeatureScroll = (props) => {
    const item = props;
    return (

        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps={'handled'}
            horizontal={true}
        >
            {props ? <View style={[styles.submain]}>
                {/* {props && props.types.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => props.setActiveIndex(item.id)}>
                        <View style={styles.tab2}>
                            <Text style={styles.text}>{item.name}</Text>
                            {props.active == item.id ? <View style={styles.tab3} /> : null}
                        </View>


                    </TouchableOpacity>
                ))} */}
                {props &&
                    <View style={styles.viewtext}>
                        <Text style={styles.feature}>Featers Items</Text>
                    </View>
                }
            </View> : null}
        </ScrollView>

    )
};

export const FixedFeatureScroll = (props) => {
    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 10,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <Animated.View
            style={{
                transform: [
                    {
                        translateY: animatedValue.interpolate({
                            inputRange: [0, 0],
                            outputRange: [100, 0]
                        })
                    }
                ],
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999999999,
            }}
        >

            {props ? <View style={styles.submain}>
                {props &&
                    <View style={styles.viewtext}>
                        <Text style={styles.feature}>Featers Items</Text>
                    </View>
                }
            </View> : null}
        </Animated.View>

    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    submain: {
        // flexDirection: 'row',
        backgroundColor: colors.white,
        width: '100%',
    },
    feature: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
        marginHorizontal: vp(20),
    },
    viewtext: {
        paddingVertical: vp(10),
        borderTopWidth: vp(1),
        borderTopColor: colors.inputbordercol,
        borderBottomWidth: 1,
        borderBottomColor: colors.inputbordercol,
        // marginHorizontal: vp(-20),
        backgroundColor: colors.white,
        marginBottom: vp(.5),
    },
    // tab3: {
    //     width: hp(100),

    //     // paddingHorizontal: hp(10),
    //     // paddingVertical: hp(5),
    //     height: hp(5),
    //     backgroundColor: colors.Secondary,
    //     position: 'absolute',
    //     bottom: 0,
    //     // borderBottomColor: colors.Secondary,
    //     // borderBottomWidth: hp(3),
    //     borderTopLeftRadius: hp(5),
    //     borderTopRightRadius: hp(5),
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // marginTop: vp(14)
    // },
    // tab2: {
    //     width: hp(100),
    //     paddingHorizontal: hp(10),
    //     paddingVertical: hp(15),
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // text: {
    //     fontSize: fp(16),
    //     fontFamily: Font.regular,
    //     color: colors.black,
    // },
    shadow: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
    },
});