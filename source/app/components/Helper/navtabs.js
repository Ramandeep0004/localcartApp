import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated, } from 'react-native';
import { colors } from '../../assets/global_style/colors';
import { Font } from '../../assets/global_style/fontfamily';
import { fp, hp} from '../../assets/global_style/fontsize';

export const NavgationTabs = (props) => {


    return (

        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps={'handled'}
            horizontal={true}
        >
            {props ? <View style={[styles.submain, styles.shadow]}>
                {props && props.types.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => (props.setActiveIndex(item.id), props.handleFilter(item.value))}>
                        <View style={props.active === 5 ? [styles.tab2] : styles.tab2}>
                            <Text style={props.active == item.id ? styles.text : styles.Text}>{item.name}</Text>
                            {props.active == item.id ? <View style={styles.tab3} /> : null}
                        </View>
                    </TouchableOpacity>
                ))}
            </View> : null}
        </ScrollView>

    )
};

export const FixedNavgationTabs = (props) => {
    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 0,
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
                            outputRange: [500, 0]
                        })
                    }
                ],
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 999999999
            }}
        >
            <ScrollView
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                horizontal={true}
            >
                {props ? <View style={[styles.submain, styles.shadow]}>
                    {props && props.types.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => (props.setActiveIndex(item.id), props.handleFilter(item.value))}>
                            <View style={styles.tab2}>
                                <Text style={props.active == item.id ? styles.text : styles.Text}>{item.name}</Text>
                                {props.active == item.id ? <View style={styles.tab3} /> : null}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View> : null}
            </ScrollView>
        </Animated.View>

    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    submain: {
        flexDirection: 'row',
        backgroundColor: colors.white,
    },
    // tab: {
    //     width: hp(90),

    //     // paddingHorizontal: hp(10),
    //     // paddingVertical: hp(5),
    //     borderBottomColor: colors.Secondary,
    //     borderBottomWidth: hp(5),
    //     borderTopLeftRadius: hp(5),
    //     borderTopRightRadius: hp(5),
    //     // justifyContent: 'center',
    //     // alignItems: 'center',
    //     // marginTop: vp(14)
    // },
    tab3: {
        width: hp(100),

        // paddingHorizontal: hp(10),
        // paddingVertical: hp(5),
        height: hp(5),
        backgroundColor: colors.Secondary,
        position: 'absolute',
        bottom: 0,
        // borderBottomColor: colors.Secondary,
        // borderBottomWidth: hp(3),
        borderTopLeftRadius: hp(5),
        borderTopRightRadius: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: vp(14)
    },
    tab2: {
        width: hp(100),
        paddingHorizontal: hp(10),
        paddingVertical: hp(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: fp(16),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    Text: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
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