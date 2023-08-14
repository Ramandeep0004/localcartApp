import React from 'react';
import styles from './style';
import { Button, Image, Text, Input, Icon } from '@rneui/themed';
import { ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Images } from '../../../assets/global_style/images';
import { homeLabel } from '../../../assets/global_style/values/home';
import ShopDetail from './component/steptwo';
import BankDetail from './component/stepthree';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import { Header } from '@react-navigation/stack';
import { hp, hzp } from '../../../assets/global_style/fontsize';
import ImageHeaderCom from '../component/imageheader';
import Validation from '../../Helper/Validations';
import shopkeeperAuthController from '../../../../apis/Controller/shopkeeper.auth.controller';
import Loader from '../../Helper/loader';
import { Toaster } from '../../Helper/Toaster';
import { t } from 'i18next';



const ShopkeeperpersonalDetail = (props) => {
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    const [loading, setLoading] = useState(false);
    const [customError, setCustomError] = useState(false);
    const [active, setActiveIndex] = useState(1);
    const steps = [1, 2];
    let defaultValues = {
        one: {
            image: null,
            shopName: null,
            category: [],
            googleMapURL: null,
            shopkeeperType: null,
            shopType: null,
            openTime: null,
            closeTime: null,
            GSTNumber: null,
            homeDelivery: null,
            self: null,
            thirdparty: null,
            deliverChargeType: null,
            deliverycharges: null
        },
        two: {
            bankName: null,
            accountNumber: null,
            confirmAccountNumber: null,
            IFSCNumber: null,
            phoneNumber: null
        },
    };
    const [values, setValues] = useState(defaultValues);

    const [error, setError] = useState({
        image: {
            rules: [""],
            isValid: true,
            message: "",
        },
        shopName: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        category: {
            rules: ["array"],
            isValid: true,
            message: "",
        },
        googleMapURL: {
            rules: ["required", 'url'],
            isValid: true,
            message: "",
        },
        shopkeeperType: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        shopType: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        openTime: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        closeTime: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        GSTNumber: {
            rules: ["gst"],
            isValid: true,
            message: "required",
        },
        homeDelivery: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        self: {
            rules: [""],
            isValid: true,
            message: "",
        },
        thirdparty: {
            rules: [""],
            isValid: true,
            message: "",
        },
        deliverChargeType: {
            rules: [""],
            isValid: true,
            message: "",
        },
        deliverycharges: {
            rules: ["numeric"],
            isValid: true,
            message: "",
        },
        bankName: {
            rules: [""],
            isValid: true,
            message: "",
        },
        accountNumber: {
            rules: ["numeric"],
            isValid: true,
            message: "",
        },
        confirmAccountNumber: {
            rules: ["numeric"],
            isValid: true,
            message: "",
        },
        IFSCNumber: {
            rules: [""],
            isValid: true,
            message: "",
        },
        phoneNumber: {
            rules: ["numeric"],
            isValid: true,
            message: "",
        },
    });

    let Validations = new Validation(error);

    const handleChange = (field, value, step) => {
        let node = Validations.validateField(field, value);
        setError({ ...error, [field]: node });
        if (
            value instanceof Date ||
            value instanceof Object ||
            value instanceof Array ||
            typeof value == 'boolean'
        ) {
            setValues({
                ...values,
                [step]: {
                    ...values[step],
                    [field]: value ? value : null,
                },
            });
        } else {
            setValues({
                ...values,
                [step]: {
                    ...values[step],
                    [field]: value,
                },
            });
        }
    };

    const submitForm = async step => {
        if (step === 1) {

            setLoading(true);
            let response = await shopkeeperAuthController.shopDetail(values.one)
            if (response) {
                new Toaster().success(response.message)
                setActiveIndex(2);
                setLoading(false)
            }
            setLoading(false)
        }
        else if (step === 2) {
            setLoading(true);
            let response = await shopkeeperAuthController.bankDetail(values.two);
            if (response) {
                new Toaster().success(response.message);
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'shophomescreen' }]
                })
            }
            setLoading(false)
        }
        else {
            setActiveIndex(step);
        }
    };


    return (
        <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
            <View style={styles.imgContainer}>
                <Image style={styles.imageMain}
                    source={Images.headerimage}
                    resizeMode='stretch'
                />
            </View>
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.ContainerMain}>
                        <View style={styles.ImageContainer}>

                            <View style={base.col12}>
                                <View style={styles.sliderMain}>
                                    <View style={styles.sliderContainer}>
                                        {active > 1 ? (
                                            <View style={styles.backArrow}>
                                                <Icon
                                                    type={IconsType.antDesign}
                                                    name={Icons.back}
                                                    color={colors.primary}
                                                    size={Dimension.backIcon}
                                                    onPress={() => setActiveIndex(active - 1)}
                                                />
                                            </View>
                                        ) : null}

                                        <View style={styles.cirMain1}>
                                            <View style={styles.subHeadMain}>
                                                {steps.map((item, index) => (
                                                    <>
                                                        <View
                                                            key={item}
                                                            style={
                                                                active < item
                                                                    ? styles.ring1
                                                                    : [styles.ring, { backgroundColor: colors.Secondary }]
                                                            } />
                                                        {item < 2 ? (
                                                            <View
                                                                style={
                                                                    active <= item
                                                                        ? [styles.inActiveLine]
                                                                        : styles.line
                                                                }
                                                            />
                                                        ) : null}
                                                    </>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {
                                active == 1
                                &&
                                <View style={base.col12}>
                                    <View style={styles.headingMain}>
                                        <Text style={styles.heading}>{t('shopKeeperSignUp.Shop details')}</Text>
                                    </View>
                                </View>
                            }
                            {
                                active == 2
                                &&
                                <View style={[styles.headingMain, base.col12]}>
                                    <View style={base.col10}>
                                        <Text style={styles.heading}>{t('shopKeeperSignUp.Bank Details')}</Text>
                                    </View>
                                    <View style={[styles.skipMain, base.col2]}>
                                        <TouchableOpacity onPress={() => props.navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'shophomescreen' }]
                                        })}>
                                            <Text style={styles.skipButton}>{t("shopKeeperSignUp.Skip")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={[base.container]}>
                        <View style={[base.row]}>
                            <View style={{ height: '100%' }}>
                                {/* <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1, paddingBottom: hp(250)}}> */}
                                <View style={{ flexGrow: 1 }}>
                                    {
                                        active == 1
                                        &&
                                        <View style={styles.steponeMain}>
                                            <ShopDetail
                                                values={values.one}
                                                navigation={props.navigation}
                                                error={error}
                                                customError={customError}
                                                setCustomError={(e) => setCustomError(e)}
                                                handleStates={(field, value) =>
                                                    handleChange(field, value, 'one')
                                                }
                                                onSubmit={async () => {
                                                    let err = { ...error };
                                                    if (values.one.homeDelivery === 1) {
                                                        if (values.one.self || values.one.thirdparty) {
                                                            setCustomError(false);
                                                        }
                                                        else {
                                                            setCustomError(true);
                                                        }
                                                    } else if (values.one.homeDelivery === 1 && (values.one.self !== null || values.one.thirdparty !== null)) {
                                                        err = {
                                                            ...error,
                                                            deliverChargeType: {
                                                                rules: ['required'],
                                                                isValid: true,
                                                                message: '',
                                                            },
                                                            deliverycharges: {
                                                                rules: ['required', "numeric"],
                                                                isValid: true,
                                                                message: '',
                                                            },
                                                        };
                                                    } else {
                                                        err = {
                                                            ...error,
                                                            deliverChargeType: {
                                                                rules: [],
                                                                isValid: true,
                                                                message: '',
                                                            },
                                                            deliverycharges: {
                                                                rules: ["numeric"],
                                                                isValid: true,
                                                                message: '',
                                                            },
                                                        };
                                                    }
                                                    let validtn = new Validation(err)
                                                    let isValid = await validtn.isFormValid(values.one);

                                                    if (isValid && !isValid.haveError) {
                                                        if (values.one.homeDelivery === 1 && (values.one.self === null || values.one.self === 0 && values.one.thirdparty === null || values.one.thirdparty === 0)) {
                                                            setCustomError(true);
                                                        } else {
                                                            setCustomError(false);
                                                            submitForm(1);
                                                        }
                                                    } else {
                                                        setError({ ...isValid.errors });
                                                    }
                                                }}
                                                // onNext={() => {
                                                //     setSteps(2);
                                                // }}
                                                onBack={() => {
                                                }}
                                            />
                                        </View>
                                    }
                                    {
                                        active == 2
                                        &&
                                        <View style={[styles.steponeMain]}>
                                            <BankDetail
                                                values={values.two}
                                                error={error}
                                                handleStates={(field, value) =>
                                                    handleChange(field, value, 'two')
                                                }
                                                onSubmit={async () => {
                                                    if (values.two.bankName || values.two.accountNumber || values.two.IFSCNumber) {
                                                        let validtn = new Validation(error)
                                                        let isValid = await validtn.isFormValid(values.two);
                                                        if (isValid && !isValid.haveError) {
                                                            if (values.two.accountNumber !== values.two.confirmAccountNumber) {
                                                                new Toaster().error(t('shopKeeperSignUp.Confirm Account Number should be same as given Account Number'))
                                                            }
                                                            else {
                                                                submitForm(2);
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        new Toaster().success('login successful');
                                                        props.navigation.reset({
                                                            index: 0,
                                                            routes: [{ name: 'shophomescreen' }]
                                                        })
                                                    }
                                                }}
                                                navigation={props.navigation}
                                                onSkip={() => {
                                                    setActiveIndex(1);
                                                }}
                                            />
                                        </View>
                                    }
                                </View>
                                {/* </ScrollView> */}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            {loading ? <Loader loader={loading} /> : null}
        </View>
    );
};
export default ShopkeeperpersonalDetail;