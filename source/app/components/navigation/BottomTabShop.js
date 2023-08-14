import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { colors } from '../../assets/global_style/colors';
import { Icons, IconsType } from '../../assets/global_style/icon';
import { Dimension } from '../../assets/global_style/dimension';
import { Icon, Image } from '@rneui/themed';
import { hp, hzp, vp } from '../../assets/global_style/fontsize';
import { Font } from '../../assets/global_style/fontfamily';
import ShopHome from '../Shopkeeper/Home';
import HeaderComp from './header';
import OrderShop from '../Shopkeeper/OrderShop';
import MyOrderShop from '../Shopkeeper/MyOrder';
import MyOrderSummary from '../Shopkeeper/MyOrderSummary';
import MyProfileShop from '../Shopkeeper/MyProfile';
import Categoriess from '../Shopkeeper/Categories';
import Search from '../Shopkeeper/Search';
import { t } from 'i18next';


const Tab = createBottomTabNavigator();

function MyTabs(props) {
    return (
        <View style={styles.footerArea}>
            <Tab.Navigator
                initialRouteName='ordershop'
                screenOptions={{
                    tabBarHideOnKeyboard:true,
                    tabBarActiveTintColor: colors.black,
                    tabBarInactiveTintColor: colors.tabgrey,
                    tabBarLabelStyle: {
                        fontFamily: Font.lightBold,
                        textTransform: "capitalize",
                    },
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: colors.white,
                        height: hp(80),
                        borderTopWidth: 0,
                    },
                }}>
                <Tab.Screen
                    name="shophomescreen"
                    component={ShopHome}
                    options={{
                        // tabBarLabel: 'Home',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon
                                type={IconsType.foundation}
                                name={Icons.home}
                                color={color}
                                size={Dimension.semiLarge}
                                style={focused ? [styles.icon] : styles.Icon}
                            />
                        ),
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="categories"
                    component={Categoriess}
                    options={{
                        // tabBarLabel: 'Home',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon
                                type={IconsType.ionIcon}
                                name={Icons.grid}
                                color={color}
                                size={Dimension.large}
                                style={focused ? [styles.icon] : styles.Icon}
                            />
                        ),
                        // headerShown: false,
                        header: ({ navigation, route, options }) => (
                            <HeaderComp
                                // left="back"
                                right='profile'
                                title={t('headers.Categories')}
                                navigation={props.navigation}

                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ordershop"
                    component={OrderShop}
                    options={{
                        // tabBarLabel: 'Home',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon
                                type={IconsType.entypo}
                                name={Icons.shoppingbag}
                                color={color}
                                size={Dimension.large}
                                style={focused ? [styles.icon] : styles.Icon}
                            />
                        ),
                        header: ({ navigation, route, options }) => (
                            <HeaderComp
                                // left="back"
                                right='profile'
                                title={t('headers.Orders')}
                                navigation={props.navigation}

                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="search"
                    component={Search}
                    options={{
                        // tabBarLabel: 'Home',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon
                                type={IconsType.feather}
                                name={Icons.search}
                                color={color}
                                size={Dimension.large}
                                style={focused ? [styles.icon] : styles.Icon}
                            />
                        ),
                        header: ({ navigation, route, options }) => (
                            <HeaderComp
                                // left="back"
                                right='profile'
                                title={t('headers.Search')}
                                navigation={props.navigation}

                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="myprofileshop"
                    component={MyProfileShop}
                    options={{
                        // tabBarLabel: 'Home',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon
                                type={IconsType.fontAwesome}
                                name={Icons.user}
                                color={color}
                                size={Dimension.semiLarge}
                                style={focused ? [styles.icon] : styles.Icon}
                            />
                        ),
                        headerShown: false,
                        // header: ({ navigation, route, options }) => (
                        //     <HeaderComp
                        //         right='profile'
                        //         title='My profile'
                        //         navigation={props.navigation}

                        //     />
                        // ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}

export default MyTabs;

const styles = StyleSheet.create({
    footerArea: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    label: {
        fontSize: hp(18),
        fontFamily: Font.regular,
        marginTop: hp(-10),
        marginBottom: vp(6),
    },
    tabstyle: {
        height: hp(100),
        backgroundColor: colors.offblue,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 4,
        borderBottomColor: colors.Secondary,
        paddingBottom: vp(8)
    },
    Icon: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 4,
        borderBottomColor: colors.white,
        paddingBottom: vp(8)
    },
    image: {
        height: '100%',
        width: '100%',
    },
    homeimage: {
        height: hp(21),
        width: hp(21),
    },
    dateimage: {
        height: hp(24),
        width: hp(24),
    },
});
