import { useIsFocused } from '@react-navigation/native';
import { Button, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import authController from '../../../../apis/Controller/auth.controller';
import shopkeeperAuthController from '../../../../apis/Controller/shopkeeper.auth.controller';
import shopkeeperProfileController from '../../../../apis/Controller/shopkeeper/shopkeeper.profile.controller';
import shopkeeperAuthServices from '../../../../apis/Services/shopkeeper.auth.services';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import Loader from '../../Helper/loader';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import { styles } from './style';

const BankDetails = (props) => {
    const [loader, setLoader] = useState(false);
    const [eye, setEye] = useState(true);

    let defaultValues = {
        bankName: null,
        accountNumber: null,
        confirmAccountNumber: null,
        IFSCNumber: null,
        phoneNumber: null,
    }
    const [values, setValues] = useState(defaultValues)
    const [error, setError] = useState({
        bankName: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        accountNumber: {
            rules: ["required", "numeric","min:9","max:18"],
            isValid: true,
            message: "",
        },
        confirmAccountNumber: {
            rules: ["required", "numeric","min:9","max:18"],
            isValid: true,
            message: "",
        },
        IFSCNumber: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        phoneNumber: {
            rules: ["required", "numeric"],
            isValid: true,
            message: "",
        },
    })

    let Validations = new Validation(error)

    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getProfile();
        }
    }, [isFocus]);

    // useEffect(() => {
    //     if (props.user) {
    //         getProfile();
    //     }
    // }, [props && props.user]);

    const getProfile = async () => {
        setLoader(true)
        let response = await shopkeeperProfileController.getShopkeeperProfile();
        if (response.user) {
            let data = response.user
            setValues({
                ...values,
                bankName: data.bank ? data.bank.bank_name : null,
                accountNumber: data.bank ? data.bank.account_no : null,
                confirmAccountNumber: data.bank ? data.bank.account_no : null,
                IFSCNumber: data.bank ? data.bank.ifsc_code : null,
                phoneNumber: data.phonenumber,
            })
            setLoader(false);
        }
        else return;
    };

    const handleStates = (name, value) => {
        let check = Validations.validateField(name, value)
        setError({ ...error, [name]: check })
        setValues({ ...values, [name]: value })
    };


    const submitData = async () => {
        let validtn = new Validation(error)
        let isValid = await validtn.isFormValid(values)

        if (isValid && !isValid.haveError) {
            if (values.accountNumber !== values.confirmAccountNumber) {
                new Toaster().error('Confirm account number should be same as Account Number')
            }
            else {
                setLoader(true)
                let response = await shopkeeperAuthController.newbankDetail(values)
                if (response && response.status) {
                    new Toaster().success(response.message);
                    props.navigation.goBack();
                    // authController.setUpLogin(response.user);
                    setLoader(false);
                }
                else {
                    setLoader(false);
                }
                setLoader(false);
            }
        }
        else {
            setError({ ...isValid.errors });
        }
    };

    return (
        <View style={styles.main}>
            <View style={base.container}>
                <View style={styles.input}>
                    <Input
                        selectionColor={colors.Secondary}
                        value={values.bankName}
                        keyboardType='ascii-capable'
                        placeholder={t("shopKeeperSignUp.Bank Name")}
                        onChangeText={(e) => handleStates('bankName', e)}
                        errorMessage={error.bankName && !error.bankName.isValid ? error.bankName.message : ''}
                    />
                    <Input
                        selectionColor={colors.Secondary}
                        value={values.accountNumber}
                        keyboardType='number-pad'
                        placeholder={t("shopKeeperSignUp.Account Number")}
                        maxLength={18}
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
                        selectionColor={colors.Secondary}
                        value={values.confirmAccountNumber}
                        keyboardType='number-pad'
                        maxLength={18}
                        placeholder={t("shopKeeperSignUp.Confirm Account Number")}
                        onChangeText={(e) => handleStates('confirmAccountNumber', e)}
                        errorMessage={error.confirmAccountNumber && !error.confirmAccountNumber.isValid ? error.confirmAccountNumber.message : ''}
                    />
                    <Input
                        selectionColor={colors.Secondary}
                        value={values.IFSCNumber}
                        keyboardType='ascii-capable'
                        placeholder={t("shopKeeperSignUp.IFSC Number")}
                        onChangeText={(e) => handleStates('IFSCNumber', e)}
                        errorMessage={error.IFSCNumber && !error.IFSCNumber.isValid ? error.IFSCNumber.message : ''}
                    />
                    <Input
                        selectionColor={colors.Secondary}
                        value={values.phoneNumber}
                        maxLength={10}
                        keyboardType='phone-pad'
                        placeholder={t("shopKeeperSignUp.Mobile Number")}
                        onChangeText={(e) => handleStates('phoneNumber', e)}
                        errorMessage={error.phoneNumber && !error.phoneNumber.isValid ? error.phoneNumber.message : ''}
                    />
                </View>
                <View style={styles.viewbutton}>
                    <Button title={t('shopKeeperSignUp.Save changes')}
                        buttonStyle={styles.buttonstyle}
                        onPress={submitData}
                    />
                </View>

            </View>
            <Loader loader={loader}></Loader>
        </View>
    )
};
const mapStateToProps = state => ({
    user: state.UserReducer.user,
});
export default connect(mapStateToProps)(BankDetails);