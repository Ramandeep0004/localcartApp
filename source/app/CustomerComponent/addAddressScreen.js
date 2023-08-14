import { useIsFocused } from '@react-navigation/native';
import { Button, Input } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { LogBox, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import filtersController from '../../apis/Controller/actionController';
import AddressController from '../../apis/Controller/address.controller';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import LocationService from '../components/Helper/loaction';
import Loader from '../components/Helper/loader';
import { Toaster } from '../components/Helper/Toaster';
import Validation from '../components/Helper/Validations';

const AddAddresses = props => {
    const navparam = props && props.route && props.route.params;
    const [addressLists, setAddressLists] = useState([]);
    const [loader, setLoader] = useState(false);
    let defaultValues = {
        address: null,
        village: null,
        city: null,
        district: null,
        state: null,
    };
    const [values, setValues] = useState(defaultValues);
    const [locationss, setLocationss] = useState(null);
    const [isError, setError] = useState({
        address: {
            rules: ['required'],
            isValid: true,
            message: '',
        },
        village: {
            rules: ['required'],
            isValid: true,
            message: '',
        },
        city: {
            rules: ['required'],
            isValid: true,
            message: '',
        },
        district: {
            rules: ['required'],
            isValid: true,
            message: '',
        },
        state: {
            rules: ['required'],
            isValid: true,
            message: '',
        },
    });

    const isFocus = useIsFocused();

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (isFocus) {
            getAddressList();
        }
    }, [isFocus]);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

        if (navparam && navparam.edit) {
            getProfile();
        }
    }, [navparam && navparam.edit]);

    let validation = new Validation(isError);

    const handleChange = (field, value) => {
        let node = validation.validateField(field, value);
        setError({ ...isError, [field]: node });
        if (value instanceof Date || value instanceof Object || value instanceof Array || typeof value == 'boolean') {
            setValues({
                ...values,
                [field]: value ? value : null,
            });
        } else if (!value || !value.trim()) {
            setValues({
                ...values,
                [field]: value ? '' : null,
            });
        } else {
            setValues({
                ...values,
                [field]: value ? value.trimLeft() : null,
            });
        }
    };

    const getProfile = async () => {
        setLoader(true);
        let user = navparam && navparam.item;
        setValues({
            ...values,
            address: user.address,
            village: { id: user.mandal, name: user.village_name },
            city: { id: user.city, name: user.cities_name },
            district: { id: user.district, name: user.district_name },
            state: { id: user.state, name: user.state_name },
        });
        setLoader(false);
    };

    const getAddressList = async () => {
        let response = await AddressController.addressList();
        if (response && response.status) {
            let list = response.listing;
            setAddressLists(list);
        } else {
            setLoader(false)
        }
    };



    const savedata = async () => {
        if (navparam && navparam.edit) {
            editSubmit();
        } else {
            submit();
        }
    };

    const submit = async () => {
        let validation = new Validation(isError);
        let isValid = await validation.isFormValid(values);
        if (isValid && !isValid.haveError) {
            setLoader(true);
            let res = await new AddressController.addAddress(values);
            if (res && res.status) {
                if (addressLists && addressLists.length === 0) {
                    await new filtersController.setSavedAddresss({ ...res && res.data, checked: true });
                    new Toaster().success(res.message);
                    setValues(defaultValues);
                    props.navigation.goBack();
                } else {
                    new Toaster().success(res.message);
                    setValues(defaultValues);
                    props.navigation.goBack();
                }
            }
            setLoader(false);
        } else {
            setError({ ...isValid.errors });
        }
    };

    const add = props && props.savedAddress

    const editSubmit = async () => {
        let validation = new Validation(isError);
        let isValid = await validation.isFormValid(values);
        if (isValid && !isValid.haveError) {
            setLoader(true);
            let res = await new AddressController.editAddress(navparam && navparam.item && navparam.item.id, values);
            if (res && res.status) {
                if (parseInt(add && add.id) === parseInt(res && res.data && res.data.id)) {
                    await new filtersController.setSavedAddresss({ ...res && res.data, checked: true });
                    new Toaster().success(res.message);
                    setValues(defaultValues);
                    props.navigation.goBack();
                } else {
                    new Toaster().success(res.message);
                    setValues(defaultValues);
                    props.navigation.goBack();
                }
            }
            setLoader(false);
        } else {
            setError({ ...isValid.errors });
        }
    };


    const getAddress = async () => {
        const grant = await new LocationService().checkLocation();
        if (grant == false) {
            await new LocationService().location();
        } else {
            await new LocationService().location();
        }
    }


    const getAddressDetail = (item) => {
        setLocationss(item);
        if (item) {
            setValues({
                ...values,
                village: { id: item.village_id, name: item.village_name },
                city: { id: item.city_id, name: item.city_name },
                district: { id: item.district_id, name: item.district_name },
                state: { id: item.state_id, name: item.state_name },
            });
            setError({...isError,   village: {
                rules: ['required'],
                isValid: true,
                message: '',
            },
            city: {
                rules: ['required'],
                isValid: true,
                message: '',
            },
            district: {
                rules: ['required'],
                isValid: true,
                message: '',
            },
            state: {
                rules: ['required'],
                isValid: true,
                message: '',
            },})
        }
    };


    return (
        <>
            <View style={styles.modal}>
                <View style={styles.containerMain}>
                    <View style={styles.inputMain}>
                        <View style={base.col12}>
                            <Input
                                selectionColor={colors.Secondary}
                                placeholder={t("addAddress.Address/nearby")}
                                value={values.address}
                                errorMessage={
                                    !isError.address.isValid
                                        ? isError.address.message
                                        : null
                                }
                                onChangeText={e => handleChange('address', e)}
                            />
                        </View>
                        <View style={base.col12}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail, from: "shophomescreen" })}>
                                <Input
                                    selectionColor={colors.Secondary}
                                    placeholder={t("addAddress.Village")}
                                    value={values.village && values.village.name}
                                    editable={false}
                                    errorMessage={
                                        !isError.village.isValid
                                            ? isError.village.message
                                            : null
                                    }
                                    onChangeText={e => handleChange('village', e)}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={base.col12}>
                            <View style={base.row}>
                                <View style={base.col6}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail, from: "shophomescreen" })}>
                                        <Input
                                            selectionColor={colors.Secondary}
                                            placeholder={t("addAddress.City")}
                                            value={values.city && values.city.name}
                                            editable={false}
                                            errorMessage={
                                                !isError.city.isValid
                                                    ? isError.city.message
                                                    : null
                                            }
                                            onChangeText={e => handleChange('city', e)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={base.col6}>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail, from: "shophomescreen" })}>
                                        <Input
                                            selectionColor={colors.Secondary}
                                            placeholder={t("addAddress.District")}
                                            value={values.district && values.district.name}
                                            editable={false}
                                            errorMessage={
                                                !isError.district.isValid
                                                    ? isError.district.message
                                                    : null
                                            }
                                            onChangeText={e => handleChange('district', e)}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={base.col12}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail, from: "shophomescreen" })}>
                                <Input
                                    selectionColor={colors.Secondary}
                                    placeholder={t("addAddress.State")}
                                    value={values.state && values.state.name}
                                    editable={false}
                                    errorMessage={
                                        !isError.state.isValid
                                            ? isError.state.message
                                            : null
                                    }
                                    onChangeText={e => handleChange('state', e)}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.buttomMain}>
                    <View style={base.col12}>
                        <Button buttonStyle={styles.buttonContainer} title={t("addAddress.Save")}
                            onPress={() => savedata()}
                        />
                    </View>
                </View>
            </View>
            <Loader loader={loader}></Loader>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: colors.GreyL,
    },
    buttomMain: {
        marginTop: hp(15),
        marginHorizontal: hp(20)
    },
    inputMain: {
        marginTop: hp(40),
    },
    buttonContainer: {
        backgroundColor: colors.primary,
    },
    iconContainer: {
        alignItems: 'flex-end',
    },
    containerMain: {
        paddingHorizontal: hzp(20),
    },
    addComment: {
        fontSize: fp(24),
        fontFamily: Font.semiBold,
        color: colors.darkblack,
    },
    listMain: {
        paddingTop: hp(8),
        paddingBottom: hp(10),
    },

    cancle: {
        paddingLeft: wp(8),
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.white,
    },
    listView: {
        flex: 1,
        backgroundColor: colors.GreyL,
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
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: vp(10),
        marginBottom: vp(100),
    },
    titleMain: {
        marginTop: vp(5),
    },
});

const mapStateToProps = state => ({
    user: state.UserReducer.user,
    savedAddress: state.SavedAddReducer.savedAddress,
});
export default connect(mapStateToProps)(AddAddresses);
