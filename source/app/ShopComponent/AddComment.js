import { Button, Icon, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const AddComment = props => {
    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85}>
                <View style={styles.main}>
                    <View style={styles.viewmain}>
                        <View style={styles.vone}>
                            <Text style={styles.comment}>{t("orderSummary.Add Comment")}</Text>
                        </View>
                        <View style={styles.vtwo}>
                            <TouchableOpacity onPress={() => props.close()}>
                                <View style={styles.viewicon}>
                                    <Icon type={IconsType.antDesign} name={Icons.close} size={Dimension.large} color={colors.white} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.viewinput}>
                        <Input
                            inputStyle={styles.inputTxt}
                            placeholder={t('orderSummary.Type your comment here...')}
                            multiline={true}
                            containerStyle={styles.container}
                            inputContainerStyle={styles.container}
                            value={props.values.cmnt}
                            errorMessage={
                                !props.isError.cmnt.isValid
                                    ? props.isError.cmnt.message
                                    : null
                            }
                            onChangeText={e => props.handleChange('cmnt', e)}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button title={t('orderSummary.Save')} buttonStyle={styles.buttonstyle} onPress={() => props.handleAddComment()} />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    main: {
        backgroundColor: colors.white,
        width: '98%',
        borderRadius: hp(10),
        overflow: 'hidden',
        paddingHorizontal: vp(20),
        paddingVertical: vp(20),
    },
    inputTxt: {
        // marginBottom: hp(38)
    },
    viewmain: {
        flexDirection: 'row',
    },
    vone: {
        flex: .9,
        justifyContent: 'center',
    },
    vtwo: {
        flex: .1,
    },
    comment: {
        fontSize: fp(24),
        color: colors.black,
        fontFamily: Font.regular,
    },
    viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        minHeight: vp(100),
    },
    viewinput: {
        marginTop: vp(60)
    },
    buttonstyle: {
        backgroundColor: colors.primary,
    },
    button: {
        marginTop: vp(40),
    },
});

export default AddComment;
