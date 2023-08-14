import { useIsFocused } from '@react-navigation/native';
import { Button, Icon, Image, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import shopkeeperProfileController from '../../../../apis/Controller/shopkeeper/shopkeeper.profile.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import { homeLabel } from '../../../assets/global_style/values/home';
import UpdatePhoneNumber from '../../auth/updatephonenumberModal';
import SearchDropDown from '../../Helper/dropdown';
import { renderImage, spaceAfter4Digit } from '../../Helper/general';
import ImagePickerModal from '../../Helper/imagePicker';
import LocationService from '../../Helper/loaction';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import authController from '../../../../apis/Controller/auth.controller';

const PersonalInfo = (props) => {
    // const [loader, setLoader] = useState(true);
    const [imagePicker, setImagePicker] = useState(false);
    const [imageType, setImageType] = useState('');
    const [image, setImage] = useState(null);
    const [eye, setEye] = useState(true);
    const [phoneNumberPopUp, setPhoneNumberPopUp] = useState(false);

    let defaultValues = {
        image: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        email: null,
        adhaarNumber: null,
        gender: null,
        address: null,
        place: null,
        city: null,
        district: null,
        state: null,
        bankName: null,
        accountNumber: null,
        confirmAccountNumber: null,
        IFSCNumber: null,
    }
    const [values, setValues] = useState(defaultValues)
    const [error, setError] = useState({
        image: {
            rules: [],
            isValid: true,
            message: "",
        },
        firstName: {
            rules: ["required", 'alphabetic'],
            isValid: true,
            message: "",
        },
        lastName: {
            rules: ["required", 'alphabetic'],
            isValid: true,
            message: "",
        },
        phoneNumber: {
            rules: ["required", 'number', 'min:10'],
            isValid: true,
            message: "",
        },
        email: {
            rules: ["required", 'email'],
            isValid: true,
            message: "",
        },
        adhaarNumber: {
            rules: [""],
            isValid: true,
            message: "",
        },
        gender: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        address: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        place: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        district: {
            rules: ['required'],
            isValid: true,
            message: "",
        },
        state: {
            rules: ['required'],
            isValid: true,
            message: "",
        },
        city: {
            rules: ['required'],
            isValid: true,
            message: "",
        },
        bankName: {
            rules: [""],
            isValid: true,
            message: "",
        },
        accountNumber: {
            rules: [],
            isValid: true,
            message: "",
        },
        confirmAccountNumber: {
            rules: [],
            isValid: true,
            message: "",
        },
        IFSCNumber: {
            rules: [""],
            isValid: true,
            message: "",
        },
    })

    let Validations = new Validation(error)

    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getAddress();
            setEye(true);
            getProfile();
        }
    }, []);
    
    useEffect(() => {
        if (props.user) {
            getProfile();
        }
    }, [props && props.user]);

    const getProfile = async () => {
        props.setLoader(true)
        let response = await shopkeeperProfileController.getShopkeeperProfile();
        if (response.user) {
            let data = response.user
            setValues({
                ...values,
                image: '',
                firstName: data.first_name,
                lastName: data.last_name,
                phoneNumber: data.phonenumber,
                email: data.email,
                adhaarNumber: data.aadhar_no,
                gender: data ? { name: data.gender, id: 1, value: data.gender } : null,
                address: data.address ? data.address.address : null,
                place: data.address ? { name: data.address.mandal_name, id: data.address.mandal } : null,
                district: data.address ? { name: data.address.district_name, id: data.address.district_id } : null,
                state: data.address ? { name: data.address.state_name, id: data.address.state_id } : null,
                city: data.address ? { name: data.address.city_name, id: data.address.city_id } : null,
                bankName: data.bank ? data.bank.bank_name : null,
                accountNumber: data.bank ? data.bank.account_no : null,
                confirmAccountNumber: data.bank ? data.bank.account_no : null,
                IFSCNumber: data.bank ? data.bank.ifsc_code : null,

            })
            setImage(data.image);
            props.setLoader(false);
        }
        else return;
    };

    const handleStates = (name, value) => {
        let check = Validations.validateField(name, value)
        setError({ ...error, [name]: check })
        setValues({ ...values, [name]: value })
    };


    const submitData = async () => {
        // let err = { ...error }
        // if (values.bankName || values.accountNumber || values.accountNumber || values.IFSCNumber) {
        //     err = {
        //         ...error,
        //         bankName: {
        //             rules: ["required"],
        //             isValid: true,
        //             message: "",
        //         },
        //         accountNumber: {
        //             rules: ["required", "numeric"],
        //             isValid: true,
        //             message: "",
        //         },
        //         confirmAccountNumber: {
        //             rules: ["required", "numeric"],
        //             isValid: true,
        //             message: "",
        //         },
        //         IFSCNumber: {
        //             rules: ["required"],
        //             isValid: true,
        //             message: "",
        //         },
        //     }
        // }
        // else {
        //     err = {
        //         ...error,
        //         bankName: {
        //             rules: [" "],
        //             isValid: true,
        //             message: "",
        //         },
        //         accountNumber: {
        //             rules: [" "],
        //             isValid: true,
        //             message: "",
        //         },
        //         confirmAccountNumber: {
        //             rules: [" "],
        //             isValid: true,
        //             message: "",
        //         },
        //         IFSCNumber: {
        //             rules: [" "],
        //             isValid: true,
        //             message: "",
        //         },
        //     }
        // }
        let validtn = new Validation(error)
        let isValid = await validtn.isFormValid(values)

        if (isValid && !isValid.haveError) {
            // if (values.accountNumber !== values.confirmAccountNumber) {
            //     new Toaster().error('Confirm account number should be same as Account Number')
            // }
            // else {
                props.setLoader(true)
                let response = await shopkeeperProfileController.editProfile(values)
                if (response && response.status) {
                    new Toaster().success(response.message);
                    authController.setUpLogin(response.user);
                    props.setIndex(1);
                    props.setLoader(false);
                }
                else {
                    props.setLoader(false);
                }
                props.setLoader(false);
            // }
        }
        else {
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
    };


    const getAddressDetail = (item) => {
        if (item) {
            setValues({
                ...values,
                place: { id: item.village_id, name: item.village_name },
                city: { id: item.city_id, name: item.city_name },
                district: { id: item.district_id, name: item.district_name },
                state: { id: item.state_id, name: item.state_name },
            })
        }
    };

    let gender = [
        {
            id: 1,
            name: t("shopKeeperSignUp.Male"),
            value: "Male"
        },
        {
            id: 2,
            name: t("shopKeeperSignUp.Female"),
            value: "Female"
        },
    ];

    return (
        <View style={styles.main}>
            <View style={styles.viewimage}>
                <View style={styles.imgContainer}>
                    <View style={styles.mainimage}>
                        <Image style={styles.image}
                            source={image ? renderImage(image, 'medium') : Images.user}
                            resizeMode='cover'
                        />
                    </View>
                </View>
                <View style={styles.viewicon}>
                    <Icon type={IconsType.simpleLineIcon}
                        name={Icons.camera}
                        size={Dimension.semilarge}
                        color={colors.white}
                        onPress={() => (
                            setImagePicker(true),
                            setImageType('users')
                        )}
                    />
                </View>
            </View>
            <View style={styles.viewmain}>
                <View style={styles.viewone}>
                    <Input
                        value={values.firstName}
                        keyboardType='ascii-capable'
                        placeholder={t("shopKeeperSignUp.First Name")}
                        onChangeText={(e) => handleStates('firstName', e)}
                        errorMessage={error.firstName && !error.firstName.isValid ? error.firstName.message : ''}
                    />
                </View>
                <View style={styles.viewtwo}>
                    <Input value={values.lastName}
                        keyboardType='ascii-capable'
                        placeholder={t("shopKeeperSignUp.Last Name")}
                        onChangeText={(e) => handleStates('lastName', e)}
                        errorMessage={error.lastName && !error.lastName.isValid ? error.lastName.message : ''}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={() => setPhoneNumberPopUp(true)}>
                <Input
                    editable={false}
                    value={values.phoneNumber}
                    keyboardType='number-pad'
                    maxLength={10}
                    placeholder={t("shopKeeperSignUp.Mobile Number")}
                    // rightIcon={
                    //     <TouchableOpacity onPress={() => setPhoneNumberPopUp(true)}>
                    //       <Text style={styles.changeNumber}>Change</Text>
                    //     </TouchableOpacity>
                    //   }
                    onChangeText={(e) => handleStates('phoneNumber', e)}
                    errorMessage={error.phoneNumber && !error.phoneNumber.isValid ? error.phoneNumber.message : ''}
                />
            </TouchableOpacity>
            <Input
                value={values.email}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder={t("shopKeeperSignUp.Email Address")}
                onChangeText={(e) => handleStates('email', e)}
                errorMessage={error.email && !error.email.isValid ? error.email.message : ''}
            />
            <Input
                value={values.adhaarNumber}
                keyboardType='number-pad'
                maxLength={14}
                placeholder={t("shopKeeperSignUp.Aadhaar Number")}
                onChangeText={(e) => handleStates('adhaarNumber', spaceAfter4Digit(e))}
                errorMessage={error.adhaarNumber && !error.adhaarNumber.isValid ? error.adhaarNumber.message : ''}
            />
            <View>
                <SearchDropDown
                    value={values.gender}
                    title={null}
                    placeholder={t("shopKeeperSignUp.Gender")}
                    list={gender}
                    onChange={(item) => handleStates('gender', item)}
                    defaultValue={values.gender && values.gender.name}
                    errorMessage={error.gender && !error.gender.isValid ? error.gender.message : ''}
                    container={styles.container}
                />
            </View>
            <View style={base.col12}>
                <Input
                    selectionColor={colors.Secondary}
                    value={values.address}
                    placeholder={t("shopKeeperSignUp.Address")}
                    onChangeText={(e) => handleStates('address', e)}
                    errorMessage={error.address && !error.address.isValid ? error.address.message : ''}
                />
            </View>
            <View style={base.col12}>
                <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
                    <Input
                        editable={false}
                        selectionColor={colors.Secondary}
                        value={values.place && values.place.name}
                        keyboardType={'default'}
                        onChangeText={(e) => handleStates('place', e)}
                        errorMessage={error.place && !error.place.isValid ? error.place.message : ''}
                        placeholder={t("shopKeeperSignUp.Place")}
                    />
                </TouchableOpacity>
            </View>
            <View style={base.col12}>
                <View style={base.row}>
                    <View style={base.col6}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
                            <Input
                                editable={false}
                                selectionColor={colors.Secondary}
                                value={values.city && values.city.name}
                                keyboardType={'default'}
                                autoCapitalize={false}
                                autoCorrect={false}
                                onChangeText={(e) => handleStates('city', e)}
                                errorMessage={error.city && !error.city.isValid ? error.city.message : ''}
                                placeholder={t("shopKeeperSignUp.City")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={base.col6}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
                            <Input
                                editable={false}
                                selectionColor={colors.Secondary}
                                value={values.district && values.district.name}
                                keyboardType={'default'}
                                autoCapitalize={false}
                                autoCorrect={false}
                                onChangeText={(e) => handleStates('district', e)}
                                errorMessage={error.district && !error.district.isValid ? error.district.message : ''}
                                placeholder={t("shopKeeperSignUp.District")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={base.col12}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
                    <Input
                        editable={false}
                        selectionColor={colors.Secondary}
                        value={values.state && values.state.name}
                        keyboardType={'default'}
                        onChangeText={(e) => handleStates('state', e)}
                        errorMessage={error.state && !error.state.isValid ? error.state.message : ''}
                        placeholder={t("shopKeeperSignUp.State")}
                    />
                </TouchableOpacity>
            </View>
            {/* <Text style={styles.bank}>{t("shopKeeperSignUp.Bank Details")}</Text> */}
            {/* <View style={styles.input}>
                <Input
                    value={values.bankName}
                    keyboardType='ascii-capable'
                    placeholder={t("shopKeeperSignUp.Bank Name")}
                    onChangeText={(e) => handleStates('bankName', e)}
                    errorMessage={error.bankName && !error.bankName.isValid ? error.bankName.message : ''}
                />
                <Input
                    value={values.accountNumber}
                    keyboardType='number-pad'
                    placeholder={t("shopKeeperSignUp.Account Number")}
                    maxLength={16}
                    secureTextEntry={eye ? true : false}
                    onChangeText={(e) => handleStates('accountNumber', e)}
                    errorMessage={error.accountNumber && !error.accountNumber.isValid ? error.accountNumber.message : ''}
                    rightIcon={{
                        type: IconsType.ionIcon,
                        name: eye ? Icons.mdeyeoffoutline : Icons.eyeFilled,
                        size: Dimension.semilarge,
                        color: colors.gray,
                        onPress: () => setEye(!eye)
                    }}
                />
                <Input
                    value={values.confirmAccountNumber}
                    keyboardType='number-pad'
                    maxLength={16}
                    placeholder={t("shopKeeperSignUp.Confirm Account Number")}
                    onChangeText={(e) => handleStates('confirmAccountNumber', e)}
                    errorMessage={error.confirmAccountNumber && !error.confirmAccountNumber.isValid ? error.confirmAccountNumber.message : ''}
                />
                <Input
                    value={values.IFSCNumber}
                    keyboardType='ascii-capable'
                    placeholder={t("shopKeeperSignUp.IFSC Number")}
                    onChangeText={(e) => handleStates('IFSCNumber', e)}
                    errorMessage={error.IFSCNumber && !error.IFSCNumber.isValid ? error.IFSCNumber.message : ''}
                />
            </View> */}
            <View style={styles.viewbutton}>
                <Button title={t('shopKeeperSignUp.Save changes')}
                    buttonStyle={styles.buttonstyle}
                    onPress={submitData}
                />
            </View>

            {
                imagePicker ?
                    <ImagePickerModal
                        show={imagePicker}
                        close={() => setImagePicker(false)}
                        type={imageType}
                        response={path => {
                            if (imageType === 'users') {
                                handleStates('image', path);
                                setImage(path);
                            }
                            else return null
                        }}
                    />
                    :
                    null
            }
            {
                phoneNumberPopUp ?
                    <UpdatePhoneNumber
                        show={phoneNumberPopUp}
                        close={() => setPhoneNumberPopUp(false)}
                        userType={"shopkeeper"}
                        navigation={props.navigation}
                    />
                    : null
            }

            {/* <Loader loader={loader}></Loader> */}
        </View>
    )
};

const styles = StyleSheet.create({
    main: {
        height: '100%',
        backgroundColor: colors.GreyL,
        // position : 'relative',
        // zIndex : -1
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(120),
        width: hp(120),
        borderRadius: hp(60),
        overflow: 'hidden',
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(128),
        width: hp(128),
        borderRadius: hp(64),
        backgroundColor: colors.lightred,
    },
    viewimage: {
        alignItems: 'center',
        marginTop: vp(60),
    },
    viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        overflow: 'hidden',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: vp(138)
    },
    viewmain: {
        flexDirection: 'row',
        marginTop: vp(40),
    },
    viewone: {
        flex: .5,
        marginRight: vp(8),
    },
    viewtwo: {
        flex: .5,
        marginLeft: vp(8),
    },
    mainview: {
        flexDirection: 'row',
    },
    changeNumber: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.black,
    },
    container: {
        backgroundColor: 'transparent',
        height: hp(60),
        borderColor: colors.inputbordercol,
        borderRadius: hp(40),
        color: colors.black,
        borderWidth: hp(1),
        zIndex: 99,
        fontFamily: Font.regular,
        fontWeight: '200',
        fontStyle: 'normal',
        fontSize: fp(17),
        paddingLeft: wp(29),
        paddingRight: wp(15),
        // marginBottom: hp(8),
    },
    bank: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.black,
    },
    buttonstyle: {
        backgroundColor: colors.primary,
    },
    input: {
        marginTop: vp(20),
    },
    viewbutton: {
        marginTop: vp(20),
    },
});
const mapStateToProps = state => ({
    user: state.UserReducer.user,
});
export default connect(mapStateToProps)(PersonalInfo);