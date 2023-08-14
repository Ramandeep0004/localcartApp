import { useIsFocused } from '@react-navigation/native';
import { Button, Icon, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import {
    KeyboardAvoidingView, Linking, Platform, TouchableOpacity,
    View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import cmsController from '../../../../apis/Controller/cmsPages.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { numberFormet } from '../../Helper/general';
import Loader from '../../Helper/loader';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import styles from './style';

const Feedback = props => {
    const [contactUs, setContactUs] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [loader, setLoader] = useState(false);
    let defaultValues = {
        name: props.user.first_name + ' ' + props.user.last_name,
        email: props.user.email,
        subject: null,
        message1: null,
    };
    const [values, setValues] = useState(defaultValues);
    const [error, setError] = useState({
        name: {
            rules: ["required", 'alphabetic'],
            isValid: true,
            message: "",
        },
        email: {
            rules: ["required", 'email'],
            isValid: true,
            message: "",
        },
        subject: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
        message1: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
    })
    let Validations = new Validation(error);


    let isFocus = useIsFocused();
    useEffect(() => {
        if (props.user) {
            setValues(defaultValues);
        }
        getApidata();
    }, [isFocus]);

    const handleChange = (name, value) => {
        let check = Validations.validateField(name, value);
        setError({ ...error, [name]: check })
        setValues({ ...values, [name]: value })
    };

    const submitData = async () => {
        let validtn = new Validation(error);
        let isValid = await validtn.isFormValid(values);
        if (isValid && !isValid.haveError) {
            setLoader(true)
            let response = await cmsController.contactUsRequest(values);
            if (response && response.status) {
                new Toaster().success(response.message);
                props.navigation.goBack();
                setValues(defaultValues);
                setLoader(false);
            }
            setLoader(false);
        }
        else {
            setError({ ...isValid.errors })
        }
    };


    const getApidata = async () => {
        setLoader(true)
        let response = await cmsController.contactUs();
        if (response && response.status) {
            setContactUs(response.page);
            setLoader(false);
        }
        else {
            setLoader(false)
        }
    };

    const openNumberLink = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }
        Linking.openURL(phoneNumber);
    };

    const openEmailLink = () => {
        let mail = contactUs && contactUs.email ? contactUs.email : ''
        Linking.openURL(`mailto:${mail}`);
    };

    const onRefresh = () => {
        getApidata();
    };

    return (
        <View style={styles.main}>
            <KeyboardAvoidingView
                // behavior='padding'
                style={{ flexGrow: 1 }}
                contentContainerStyle={{ flex: 1 }}
            >
                <ScrollView
                    scrollEnabled={true}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View style={base.container}>
                        <View style={styles.cardContainer}>
                            {
                                contactUs && contactUs.phonenumber ?
                                    <View style={styles.detailContainer}>
                                        <View style={styles.iconMain}>
                                            <Icon
                                                name={Icons.phone}
                                                type={IconsType.feather}
                                                color={colors.white}
                                                size={Dimension.docicon}
                                            />
                                        </View>
                                        <View style={styles.textMain}>
                                            <TouchableOpacity onPress={() => openNumberLink(contactUs.phonenumber)}>
                                                <Text style={styles.text}>{numberFormet(contactUs.phonenumber)}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :
                                    null
                            }
                            {
                                contactUs && contactUs.email ?
                                    <View style={styles.detailContainer1}>
                                        <View style={styles.iconMain}>
                                            <Icon
                                                name={Icons.envelope}
                                                type={IconsType.simpleLineIcon}
                                                color={colors.white}
                                                size={Dimension.docicon}
                                            />
                                        </View>
                                        <View style={styles.textMain}>
                                            <TouchableOpacity onPress={() => openEmailLink()}>
                                                <Text style={styles.text}>{contactUs.email}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :
                                    null
                            }
                            {
                                contactUs && contactUs.address ?
                                    <View style={styles.detailContainer1}>
                                        <View style={styles.iconMain}>
                                            <Icon
                                                name={Icons.locationpin}
                                                type={IconsType.simpleLineIcon}
                                                color={colors.white}
                                                size={Dimension.docicon}
                                            />
                                        </View>
                                        <View style={styles.textMain}>
                                            <Text style={styles.text}>{contactUs.address}</Text>
                                        </View>
                                    </View>
                                    :
                                    null
                            }
                        </View>
                    </View>
                    <View style={base.container}>
                        <View style={styles.inputMain}>
                            <Input
                                selectionColor={colors.Secondary}
                                placeholder={t("contactUs.Name")}
                                value={values.name}
                                onChangeText={(e) => handleChange('name', e)}
                                errorMessage={error.name && !error.name.isValid ? error.name.message : null}
                            />
                            <Input
                                selectionColor={colors.Secondary}
                                placeholder={t("contactUs.Email address")}
                                value={values.email}
                                onChangeText={(e) => handleChange('email', e)}
                                errorMessage={error.email && !error.email.isValid ? error.email.message : null}
                            />
                            <Input selectionColor={colors.Secondary}
                                placeholder={t("contactUs.Subject")}
                                value={values.subject}
                                onChangeText={(e) => handleChange('subject', e)}
                                errorMessage={error.subject && !error.subject.isValid ? error.subject.message : null}
                            />
                            <Input
                                inputContainerStyle={styles.inputContainer}
                                selectionColor={colors.Secondary}
                                placeholder={t("contactUs.Message")}
                                containerStyle={styles.inputContainer}
                                multiline={true}
                                value={values.message1}
                                onChangeText={(e) => handleChange('message1', e)}
                            />
                            {
                                error.message1 && !error.message1.isValid ?
                                    <Text style={styles.errorStyle}>
                                        {error.message1.message}
                                    </Text>
                                    :
                                    null
                            }
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.buttonMain}>
                <View style={base.container}>
                    <Button
                        buttonStyle={styles.button}
                        title={t("contactUs.Submit")}
                        onPress={() => submitData()}
                    />
                </View>
            </View>
            <Loader loader={loader}></Loader>
        </View>
    );
};

const mapStateToProps = state => ({
    user: state.UserReducer.user
});
export default connect(mapStateToProps)(Feedback);
