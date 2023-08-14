import { Button, Icon, Image, Text } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { base } from '../../../assets/global_style/base';
import Modal from 'react-native-modal';
import styles from './style';
import { colors } from '../../../assets/global_style/colors';
import { Images } from '../../../assets/global_style/images';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Dimension } from '../../../assets/global_style/dimension';
import { hp } from '../../../assets/global_style/fontsize';
import { homeLabel } from '../../../assets/global_style/values/home';
import { t } from 'i18next';

const RedeemPopup = props => {

    return (
        <Modal isVisible={props.open}
            backdropOpacity={0.8}
            backdropColor={colors.grey}>
            <View style={styles.modalContainer}>
                <View style={base.col12}>
                    <View style={styles.imgContainer}>
                        <View style={{ height: hp(80), width: hp(80), borderRadius: hp(75), backgroundColor: props.iconMainColor ? props.iconMainColor : colors.gold,justifyContent:'center',alignItems:'center' }}>
                            <View >
                                <Icon
                                    name={props.iconName ? props.iconName : Icons.stars}
                                    type={props.iconType ? props.iconType : IconsType.material}
                                    size={props.dimension ? props.dimension : Dimension.Big}
                                    color={props.iconColor ? props.iconColor : colors.white}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={base.col12}>
                    <View style={styles.verifiedMain}>
                        <Text style={styles.verified}>{props.label ? props.label : 'Message'}
                        </Text>
                    </View>
                </View>
                <View style={base.col12}>
                    <View style={styles.descriptionMain}>
                        <Text style={styles.description}>
                            {props.message ? props.message : 'Message'}
                        </Text>
                    </View>
                </View>
                {props.message1 ? <View style={base.col12}>
                    <View style={styles.descriptionMain}>
                        <Text style={styles.description}>
                            {props.message1 ? props.message1 : null}
                        </Text>
                    </View>
                </View> : null}
                <View style={styles.buttonMain}>
                    <View style={styles.button}>
                        <Button title={props.leftButtonText ? props.leftButtonText : t('SuccessPopup.Cancel')}
                            titleStyle={{ color: colors.primary }}
                            buttonStyle={styles.buttonstyle1}
                            onPress={() => props.close()}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button title={props.RightButtonText ? props.RightButtonText : t('SuccessPopup.Delete')}
                            buttonStyle={styles.buttonstyle}
                            onPress={() => props.onConfirm()}
                        />
                    </View>
                </View>

            </View>
        </Modal>
    );
};
export default RedeemPopup;
