import { Icon } from '@rneui/base';
import { Button, Input } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import customerAuthController from '../../../../apis/Controller/auth.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import UpdateNumberModal from '../../../ShopComponent/updateNumberModal';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import styles from './style';

const UpdatePhoneNumber = props => {
    const [loader, setLoader] = useState(false);
    const [values, setValues] = useState({ phoneNumber: null });
    const [updateNumber, setUpdateNumber] = useState(false);
    const [message, setMessage] = useState(null);
    const [isError, setError] = useState({
        phoneNumber: {
            rules: ['required', 'numeric', 'min:10'],
            isValid: true,
            message: '',
        },
    });

    useEffect(() => {
        if (message) {
            setUpdateNumber(true);
        }
        else {
            setUpdateNumber(false);
        }
    }, [message]);

    let validation = new Validation(isError);
    const handleChange = (field, value) => {
        let node = validation.validateField(field, value);
        setError({ ...isError, [field]: node });
        setValues({
            ...values,
            [field]: value ? value : null,
        });
    };

    const verify = async () => {
        let validation = new Validation(isError);
        let isValid = await validation.isFormValid(values);
        if (isValid && !isValid.haveError) {
            setLoader(true);
            let response = await customerAuthController.sentOtpOnUpdateNumber();
            if (response && response.status) {
                setMessage(response.message);
                new Toaster().success(response.message);
            } else {
                setMessage(null);
            }
            setLoader(false);
        } else {
            setError({ ...isValid.errors });
        }
    };

    return (
        <Modal isVisible={props.show} style={base.height} onBackdropPress={() => props.close()} onBackButtonPress={() => props.close()}>
            {
                updateNumber === false ?
                    <View style={styles.modalContainer}>
                        <View style={styles.main}>
                            <View style={styles.viewmain}>
                                <View style={styles.vone}>
                                    <Text style={styles.comment}>{t("updateNumberModal.Update Phone Number")}</Text>
                                </View>
                                <View style={styles.vtwo}>
                                    <TouchableOpacity onPress={() => props.close()}>
                                        <View style={styles.viewicon}>
                                            <Icon
                                                type={IconsType.antDesign}
                                                name={Icons.close}
                                                size={Dimension.large}
                                                color={colors.white}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Input
                                selectionColor={colors.Secondary}
                                keyboardType={'number-pad'}
                                autoCapitalize={false}
                                autoCorrect={false}
                                maxLength={10}
                                placeholder={t('updateNumberModal.Add number')}
                                value={values.phoneNumber}
                                errorMessage={
                                    !isError.phoneNumber.isValid ? isError.phoneNumber.message : null
                                }
                                onChangeText={e => handleChange('phoneNumber', e)}
                            />
                            <View style={styles.process}>
                                <Button
                                    title={t('updateNumberModal.Submit')}
                                    onPress={() => verify()}
                                    buttonStyle={styles.buttonstyle}
                                    loading={loader}
                                    loadingProps={{
                                        size: 'small',
                                        color: 'white',
                                    }}></Button>
                            </View>
                        </View>
                    </View>
                    :
                    <UpdateNumberModal
                        show={updateNumber}
                        close={() => (setUpdateNumber(false), props.close())}
                        detail={data = { number: values && values.phoneNumber ? values.phoneNumber : null, message: message ? message : null, userType : props && props.userType ? props.userType : '' }}
                        navigation={props.navigation}
                    />
            }
        </Modal>
    );
};
export default UpdatePhoneNumber;
