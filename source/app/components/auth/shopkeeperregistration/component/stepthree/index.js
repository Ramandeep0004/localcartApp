import { View, Text } from 'react-native'
import React from 'react'
import { base } from '../../../../../assets/global_style/base'
import { Button, Input } from '@rneui/themed'
import { colors } from '../../../../../assets/global_style/colors'
import styles from '../stepthree/style'
import { useState } from 'react'
import Loader from '../../../../Helper/loader'
import { t } from 'i18next'
import { Icons, IconsType } from '../../../../../assets/global_style/icon'
import { Dimension } from '../../../../../assets/global_style/dimension'
import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'

const Bankdetail = (props) => {
    const [loader, setLoader] = useState(false);
    const [eye, setEye] = useState(true);

    const isFocus = useIsFocused();
    useEffect(() => {
        setEye(true);
    }, [isFocus]);

    return (
        <View>
            <View style={styles.inputMain}>
                <View style={base.col12}>
                    <Input
                        selectionColor={colors.Secondary}
                        keyboardType={'default'}
                        autoCapitalize={false}
                        value={props.values.bankName}
                        autoCorrect={false}
                        onChangeText={(e) => props.handleStates('bankName', e)}
                        errorMessage={props.error.bankName && !props.error.bankName.isValid ? props.error.bankName.message : ''}
                        placeholder={t('shopKeeperSignUp.Bank Name')}
                    />
                </View>
                <View style={base.col12}>
                    <Input
                        selectionColor={colors.Secondary}
                        keyboardType={'numeric'}
                        autoCapitalize={false}
                        autoCorrect={false}
                        maxLength={16}
                        secureTextEntry={eye ? true : false}
                        value={props.values.accountNumber}
                        onChangeText={(e) => props.handleStates('accountNumber', e)}
                        errorMessage={props.error.accountNumber && !props.error.accountNumber.isValid ? props.error.accountNumber.message : ''}
                        placeholder={t('shopKeeperSignUp.Account Number')}
                        rightIcon={{
                            type: IconsType.ionIcon,
                            name: eye ? Icons.mdeyeoffoutline : Icons.eyeFilled,
                            size: Dimension.semilarge,
                            color: colors.gray,
                            onPress: () => setEye(!eye)
                        }}
                    />
                </View>
                <View style={base.col12}>
                    <Input
                        selectionColor={colors.Secondary}
                        keyboardType={'numeric'}
                        autoCapitalize={false}
                        autoCorrect={false}
                        maxLength={16}
                        value={props.values.confirmAccountNumber}
                        onChangeText={(e) => props.handleStates('confirmAccountNumber', e)}
                        errorMessage={props.error.confirmAccountNumber && !props.error.confirmAccountNumber.isValid ? props.error.confirmAccountNumber.message : ''}
                        placeholder={t('shopKeeperSignUp.Confirm Account Number')}
                    />
                </View>
                <View style={base.col12}>
                    <Input
                        selectionColor={colors.Secondary}
                        keyboardType={'default'}
                        autoCapitalize={false}
                        autoCorrect={false}
                        value={props.values.IFSCNumber}
                        onChangeText={(e) => props.handleStates('IFSCNumber', e)}
                        errorMessage={props.error.IFSCNumber && !props.error.IFSCNumber.isValid ? props.error.IFSCNumber.message : ''}
                        placeholder={t('shopKeeperSignUp.IFSC Number')}
                    />
                </View>
                <View style={base.col12}>
                    <Input
                        selectionColor={colors.Secondary}
                        value={props.values.phoneNumber}
                        keyboardType='phone-pad'
                        autoCapitalize={false}
                        maxLength={10}
                        autoCorrect={false}
                        placeholder={t("shopKeeperSignUp.Mobile Number")}
                        onChangeText={(e) => props.handleStates('phoneNumber', e)}
                        errorMessage={props.error.phoneNumber && !props.error.phoneNumber.isValid ? props.error.phoneNumber.message : ''}
                    />
                </View>
            </View>
            <View style={styles.buttonMain}>
                <View style={base.col12}>
                    <View style={base.row}>
                        <View style={base.col6}>
                            <Button
                                buttonStyle={styles.button1}
                                titleStyle={styles.btntitle}
                                title={t('shopKeeperSignUp.Back')}
                                onPress={() => {
                                    props.onSkip()
                                }}
                            />
                        </View>
                        <View style={base.col6}>
                            <Button buttonStyle={styles.button2}
                                title={t("shopKeeperSignUp.Submit")}
                                onPress={() => props.onSubmit()}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Loader loader={loader}></Loader>
        </View>
    )
}

export default Bankdetail