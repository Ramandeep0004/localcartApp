import { useIsFocused } from '@react-navigation/native';
import { Button, CheckBox, Chip, Icon, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import actionController from '../../apis/Controller/actionController';
import customerAuthController from '../../apis/Controller/customer.auth.controller';
import shopkeeperAuthController from '../../apis/Controller/shopkeeper.auth.controller';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import SearchDropDown from '../components/Helper/dropdown';
import Validation from '../components/Helper/Validations';


const Filter = props => {
    const [select, setSelect] = useState([]);
    const [selectedShopkeeperType, setSelectedShopkeeperType] = useState([]);
    const [location, setLocation] = useState([]);
    const [shopType, SetShopType] = useState([]);
    const [shopkeeperType, setShopkeeperType] = useState([]);
    const [loader, setLoader] = useState(false);
    const [filtersValue, setFiltersValue] = useState();
    const [selectedShopStatus, setSelectedShopStatus] = useState(null);
    const [sort, setSort] = useState([
        { name: t('Filters.Avaliable'), value: "available", checked: false },
        { name: t('Filters.Not Available'), value: "not_available", checked: false },
    ]);

    let defaultValues = {
        locationName: null,
    };
    const [values, setValues] = useState(defaultValues);
    const [isError, setError] = useState({
        locationName: {
            rules: [],
            isValid: true,
            message: ""
        },
    });

    let validation = new Validation(isError);
    const handleChange = (field, v) => {
        let node = validation.validateField(field, v);
        setError({ ...isError, [field]: node });
        setValues({ ...values, [field]: v });
    }

    let isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus && props.filter) {
            setFiltersValue(props.filter.homeDelivery);
            setValueHome();
            setSelect(props.filter.shopType);
            setSelectedShopkeeperType(props.filter.shopkeeperType);
            searchloaction();
            setSelectedShopStatus(props.filter.shopStatus);
        }
        else {
            setValueHome();
            setSelect([]);
            setSelectedShopkeeperType([]);
            searchloaction();
            setSelectedShopStatus(null);
        }
        getShopkeeperType();
        getShopType();
    }, [isFocus]);


    useEffect(() => {
        if (isFocus && props && props.user) {
            setNameLocation();
        }
    }, [isFocus, props && props.user]);

    const setValueHome = async () => {
        let value = props && props.filter;
        let array = [...sort];
        array.map(e => {
            if (e.value == value.homeDelivery) {
                e.checked = true;
            }
            else {
                e.checked = false;
            }
        });
        setSort(array);
    };

    const searchloaction = async () => {
        let response = await customerAuthController.getAddress();
        if (response && response.status) {
            if (response.listing.length > 0) {
                setLocation(response.listing);
            } else {
                setLocation([]);
            }
        }
        setLoader(false);
    };

    const setNameLocation = async () => {
        if (props && props.filter && props.filter.location) {
            let response = await customerAuthController.getAddress();
            if (response && response.status) {
                let array = response.listing;
                var itemIndex = array.find(i => parseInt(i.city_id) === props.filter.location);
                setValues({
                    ...values,
                    locationName: itemIndex ? itemIndex : null
                })
            }
            setLoader(false);
        }
        else {
            setValues({
                locationName: {
                    id: props && props.user && props.user.address && props.user.address.city_id ? props.user.address.city_id : '',
                    name: props && props.user && props.user.address && props.user.address.city_name ? props.user.address.city_name : ''
                }
            })
        }
    };

    const isExist = (id) => {
        let array = [...select];
        let index = array.findIndex((item) => item.id === id)
        return index === -1 ? false : index;
    };

    const setValuess = async (item) => {
        let array = [...select];
        let status = await isExist(item.id);
        if (status === false) {
            array.push(item);
        }
        else {
            return;
        }
        setSelect(array);
    };


    const isExist2 = (id) => {
        let array = [...selectedShopkeeperType];
        let index = array.findIndex((item) => item.id === id)
        return index === -1 ? false : index;
    };

    const handleShopkeeperType = async (item) => {
        setSelectedShopkeeperType([])
        let array = [...selectedShopkeeperType];
        let status = await isExist2(item.id);
        if (status === false) {
            array.splice(0, 1);
            array.push(item);
        }
        else {
            return;
        }
        setSelectedShopkeeperType(array);
    };

    const removeItem = (data) => {
        let updatedSelectedValue = select.filter((previous) => {
            return data !== previous
        })
        setSelect(updatedSelectedValue);
    };

    const removeItem2 = (data) => {
        let updatedSelectedValue = selectedShopkeeperType.filter((previous) => {
            return data !== previous
        })
        setSelectedShopkeeperType(updatedSelectedValue);
    };

    const getShopType = async () => {
        let post = {
            search: ''
        }
        let response = await shopkeeperAuthController.shopType(post);
        if (response && response.status) {
            SetShopType(response.listing);
        }
        else return null
    };

    const getShopkeeperType = async () => {
        let response = await shopkeeperAuthController.shopkeeperType();
        if (response && response.status) {
            let lang = response.listing;
            let data = lang.map(({ id: id, title: name }) => ({ id, name }));
            setShopkeeperType(data);
        }
    };

    const applyFilters = async () => {
        let filters = {
            location: values.locationName ? values.locationName.city_id : '',
            shopType: select ? select : null,
            shopStatus: selectedShopStatus ? selectedShopStatus : '',
            homeDelivery: filtersValue ? filtersValue : '',
            shopkeeperType: selectedShopkeeperType ? selectedShopkeeperType : [],
        };
        await actionController.setFilter(filters);
        props.close();
        props.reRenderApi();
    };

    const removeFilters = async () => {
        let filters = {
            category: [],
            shopType: [],
            shopkeeperType: [],
            shopStatus: '',
            location: "",
            homeDelivery: "",
        };
        await actionController.setFilter(filters);
        props.close()
        props.reRenderApi()
    };


    return (
        <>

            <Modal isVisible={props.open}
                style={styles.modal}
                backdropColor={colors.gray}
                backdropOpacity={0.85}
                onBackdropPress={() => props.close()} >
                <View style={styles.mainicon}>
                    <TouchableOpacity onPress={() => (props.close())} >
                        <View style={styles.viewicon}>
                            <Icon type={IconsType.antDesign}
                                name={Icons.close}
                                size={Dimension.semilarge}
                                color={colors.white}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.maincontainer}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.container}
                    >
                        <ScrollView contentContainerStyle={styles.scroll} nestedScrollEnabled={true} keyboardShouldPersistTaps={'handled'}>
                            <Text style={styles.filter}>{t('Filters.Filters')}</Text>
                            {
                                select && select.length > 0 ?
                                    <View style={styles.viewchip2}>
                                        {
                                            select && select.length > 0 ?
                                                select.map((data, i) => {
                                                    return (
                                                        <Chip
                                                            title={data.title}
                                                            key={i}
                                                            icon={<Icon type={IconsType.antDesign}
                                                                name={Icons.close}
                                                                color={colors.black}
                                                                size={Dimension.Vsmall}
                                                                onPress={() => removeItem(data)}
                                                            />}
                                                            iconRight
                                                            titleStyle={styles.title}
                                                            buttonStyle={styles.chipcon}
                                                        />
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </View> : null}
                            <View style={base.row}>
                                {
                                    selectedShopkeeperType && selectedShopkeeperType.length > 0 ?
                                        <View style={styles.viewchip}>
                                            {
                                                selectedShopkeeperType.map((data, i) => {
                                                    return (
                                                        <Chip
                                                            title={data.name}
                                                            key={i}
                                                            icon={<Icon type={IconsType.antDesign}
                                                                name={Icons.close}
                                                                color={colors.black}
                                                                size={Dimension.Vsmall}
                                                                onPress={() => removeItem2(data)}
                                                            />}
                                                            iconRight
                                                            titleStyle={styles.title}
                                                            buttonStyle={styles.chipcon2}
                                                        />
                                                    )
                                                })

                                            }
                                        </View>
                                        : null
                                }
                                {
                                    selectedShopStatus ?
                                        <View style={styles.viewchip}>
                                            <Chip
                                                title={selectedShopStatus}
                                                icon={<Icon type={IconsType.antDesign}
                                                    name={Icons.close}
                                                    color={selectedShopStatus === 'open' ? colors.parrotgreen : colors.red}
                                                    size={Dimension.Vsmall}
                                                    onPress={() => setSelectedShopStatus(null)}
                                                />}
                                                iconRight
                                                titleStyle={selectedShopStatus === 'open' ? styles.openChip : styles.closeChip}
                                                buttonStyle={selectedShopStatus === 'open' ? styles.chipOpenContain : styles.chipCloseContain}
                                            />
                                        </View>
                                        : null
                                }
                            </View>
                            {
                                selectedShopkeeperType && selectedShopkeeperType.length > 0 || select && select.length > 0 || selectedShopStatus ?
                                    <View style={styles.bottomLine}></View>
                                    :
                                    null
                            }
                            <View style={base.col12}>
                                <SearchDropDown
                                    labelStyle={styles.labelStyle}
                                    value={values.locationName}
                                    title={t('Filters.Location')}
                                    right={styles.rightIcon}
                                    placeholder={t('Filters.Select Location')}
                                    list={location}
                                    onChange={item => {
                                        handleChange('locationName', item);
                                    }}
                                    // defaultValue={values.locationName && values.locationName.city_name +', '+ values.locationName.district_name}
                                    defaultValue={values.locationName && values.locationName.name}
                                />
                            </View>
                            <Text style={styles.shop}>{t("Filters.Shop Type")}</Text>
                            <View style={styles.subCon}>
                                {
                                    shopType ?
                                        shopType.map((data, i) => {
                                            return (
                                                <TouchableOpacity onPress={() => setValuess(data)} key={i}>
                                                    <View style={[styles.vone, { backgroundColor: select && select.includes(data) ? colors.offpink : colors.greyy }]}>
                                                        <Text style={select && select.includes(data) ? styles.organic : styles.non}>{data.title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                        :
                                        null
                                }
                            </View>
                            <Text style={styles.shop}>{t("Filters.Shopkeeper Type")}</Text>
                            <View style={styles.subCon}>
                                {
                                    shopkeeperType ?
                                        shopkeeperType.map((data, i) => {
                                            return (
                                                <TouchableOpacity onPress={() => handleShopkeeperType(data)} key={i}>
                                                    <View style={[styles.vone, { backgroundColor: selectedShopkeeperType && selectedShopkeeperType.includes(data) ? colors.primary : colors.greyy }]}>
                                                        <Text style={selectedShopkeeperType && selectedShopkeeperType.includes(data) ? styles.organic : styles.non}>{data.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                        :
                                        null
                                }
                            </View>
                            <Text style={styles.shop}>{t("Filters.Shop Status")}</Text>
                            <View style={styles.subCon2}>
                                <TouchableOpacity onPress={() => setSelectedShopStatus('open')} >
                                    <View style={[styles.vone, { backgroundColor: selectedShopStatus && selectedShopStatus === 'open' ? colors.lightgreen : colors.greyy }]}>
                                        <Text style={selectedShopStatus && selectedShopStatus === 'open' ? styles.open : styles.non}>{t("Filters.Open")}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelectedShopStatus('close')}>
                                    <View style={[styles.vone, { backgroundColor: selectedShopStatus && selectedShopStatus === 'close' ? colors.lightred : colors.greyy }]}>
                                        <Text style={selectedShopStatus && selectedShopStatus === 'close' ? styles.close : styles.non}>{t("Filters.Close")}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.shop}>{t("Filters.Home Delivery")}</Text>
                            <View style={styles.submain}>
                                {/* <View style={styles.mainone}> */}
                                {sort.map((item, index) => (
                                    <CheckBox
                                        key={index}
                                        titleProps={{
                                            style: {
                                                fontSize: fp(16), fontFamily: Font.regular, color: colors.black, paddingLeft: vp(10)
                                            }
                                        }}
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        containerStyle={styles.checkcon}
                                        title={item.name}
                                        checked={item.checked}
                                        onPress={() => {
                                            let array = [...sort];
                                            array.map(e => {
                                                if (e.value == item.value) {
                                                    e.checked = true;
                                                }
                                                else {
                                                    e.checked = false;
                                                }
                                            });
                                            setSort(array);
                                            setFiltersValue(item.value);
                                        }}
                                        checkedColor={colors.primary}
                                    />
                                ))}
                            </View>
                            <View style={styles.buttonMain}>
                                <Button
                                    buttonStyle={styles.button}
                                    title={t("Filters.Apply")}
                                    onPress={() => applyFilters()}
                                />
                            </View>
                            <View style={styles.removefilter}>
                                <TouchableOpacity onPress={() => removeFilters()}>
                                    <Text style={styles.removefiltertext}>{t("Filters.Remove filters")}</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 0,
    },
    maincontainer: {
        backgroundColor: colors.white,
        // paddingVertical: vp(20),
        paddingHorizontal: vp(25),
        width: '100%',
    },
    filter: {
        fontSize: fp(24),
        color: colors.black,
        fontFamily: Font.semiBold,
        textAlign: 'center',
    },
    viewchip: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // borderBottomWidth: 1,
        // borderBottomColor: colors.inputbordercol,
        // marginBottom: vp(20),
        marginTop: vp(10),
        // paddingBottom: vp(5),
    },
    viewchip2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // borderBottomWidth: 1,
        // borderBottomColor: colors.inputbordercol,
        marginBottom: vp(5),
        marginTop: vp(10),
        // paddingBottom: vp(15),
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderBottomColor: colors.inputbordercol,
        marginBottom: vp(5),
        // marginTop: vp(10),
        paddingBottom: vp(15),
    },
    title: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        paddingRight: vp(5)
    },
    openChip: {
        fontSize: fp(16),
        color: colors.parrotgreen,
        fontFamily: Font.regular,
        paddingRight: vp(5)
    },
    closeChip: {
        fontSize: fp(16),
        color: colors.red,
        fontFamily: Font.regular,
        paddingRight: vp(5)
    },
    chipcon: {
        backgroundColor: colors.offpink,
        marginRight: vp(5),
        paddingHorizontal: vp(20)
    },
    chipcon2: {
        backgroundColor: colors.primary,
        marginRight: vp(5),
        paddingHorizontal: vp(20)
    },
    chipOpenContain: {
        backgroundColor: colors.lightgreen,
        marginRight: vp(5),
        paddingHorizontal: vp(20)
    },
    chipCloseContain: {
        backgroundColor: colors.lightred,
        marginRight: vp(5),
        paddingHorizontal: vp(20)
    },
    inputcontainer: {
        backgroundColor: colors.white,
        marginTop: vp(12)
    },
    shop: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.semiBold,
    },
    subCon: {
        flexDirection: 'row',
        marginTop: vp(15),
        marginBottom: vp(20),
    },
    subCon2: {
        flexDirection: 'row',
        marginTop: vp(15),
        marginBottom: vp(30),
    },
    organic: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
    },
    open: {
        fontSize: fp(16),
        color: colors.parrotgreen,
        fontFamily: Font.regular,
    },
    close: {
        fontSize: fp(16),
        color: colors.red,
        fontFamily: Font.regular,
    },
    non: {
        fontSize: fp(16),
        color: colors.lightgrey,
        fontFamily: Font.regular,
    },
    vone: {
        height: hp(40),
        // width: hp(95),
        paddingHorizontal: vp(20),
        borderRadius: hp(20),
        // backgroundColor: colors.offpink,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vp(10),
    },
    vtwo: {
        height: hp(40),
        width: hp(127),
        borderRadius: hp(20),
        // backgroundColor: colors.greyy,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vp(10),
    },
    vthree: {
        height: hp(40),
        width: hp(74),
        borderRadius: hp(20),
        // backgroundColor: colors.greyy,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vp(10),
    },
    submain: {
        // flex: 1,
        flexDirection: 'row',
        marginTop: vp(15),
        marginBottom: vp(30),
        backgroundColor: 'red'
    },
    checkcon: {
        margin: 0,
        padding: 0,
        backgroundColor: colors.white,
    },
    viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainicon: {
        alignItems: 'flex-end',
        // backgroundColor: 'red',
        width: '100%',
        paddingHorizontal: vp(10),
        marginBottom: vp(20),
    },
    mainone: {
        flex: .5,
        backgroundColor: 'red',
    },
    rightIcon: {
        // position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 99999,
        // backgroundColor: 'red',
    },
    button: {
        backgroundColor: colors.primary,
    },
    removefilter: {
        marginVertical: hp(10),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    removefiltertext: {
        fontSize: fp(16),
        color: colors.Secondary,
        fontFamily: Font.semiBold,
    },
    labelStyle: {
        color: colors.black,
        fontFamily: Font.semiBold,
        fontSize: fp(16),
        marginBottom: hp(12),
        marginLeft: hp(-5)
    },
    scroll: {
        flexGrow: 1,
        paddingVertical: vp(20),
    },
});
const mapStateToProps = state => ({
    filter: state.filtersReducer.filters,
    user: state.UserReducer.user,
});
export default connect(mapStateToProps)(Filter);
