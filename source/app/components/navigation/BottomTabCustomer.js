import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/global_style/colors';
import { Dimension } from '../../assets/global_style/dimension';
import { Font } from '../../assets/global_style/fontfamily';
import { hp, vp } from '../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../assets/global_style/icon';
import CustomerCategory from '../Customer/customercategory';
import CustomerHome from '../Customer/customerhome';
import CustomerMyOrder from '../Customer/customermyorder';
import CustomerMyProfile from '../Customer/customermyprofile';
import CustomerProductSearch from '../Customer/productsearch';
import Search from '../Shopkeeper/Search';
import HeaderComp from './header';



const Tab = createBottomTabNavigator();

const CustomerTabs = (props) => {
    return (
        <View style={styles.footerArea}>
            <Tab.Navigator
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
                    name="customerhome"
                    component={CustomerHome}
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
                    name="customercategory"
                    component={CustomerCategory}
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
                    name="customermyorder"
                    component={CustomerMyOrder}
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
                                title={t('headers.My orders')}
                                navigation={props.navigation}

                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="customerSearch"
                    component={CustomerProductSearch}
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
                    name="customermyprofile"
                    component={CustomerMyProfile}
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
                    }}
                />

            </Tab.Navigator>
        </View>
    );
}

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
export default CustomerTabs;