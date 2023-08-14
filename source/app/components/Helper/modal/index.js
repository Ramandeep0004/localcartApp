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

const VerificationPopup = props => {

    return (
        <Modal isVisible={true}
            backdropOpacity={0.8}
            backdropColor={colors.grey}>
            <View style={styles.modalContainer}>
                <View style={base.col12}>
                    <View style={styles.imgContainer}>
                        <View style={styles.imgMain}>
                            <Image
                                style={styles.img}
                                source={Images.star}
                                resizeMode="cover">
                                <View style={styles.iconMain}>
                                    <Icon
                                        name={Icons.check}
                                        type={IconsType.octIcon}
                                        size={Dimension.Large}
                                        color={colors.parrotgreen}
                                    />
                                </View>
                            </Image>
                        </View>
                    </View>
                </View>
                <View style={base.col12}>
                    <View style={styles.verifiedMain}>
                        <Text style={styles.verified}>{t('verifiedPopUp.Verified!')}
                        </Text>
                    </View>
                </View>
                <View style={base.col12}>
                    <View style={styles.descriptionMain}>
                        <Text style={styles.description}>
                            {t('verifiedPopUp.Your account has been verified successfully')}
                        </Text>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button title={t('verifiedPopUp.Ok')}
                        buttonStyle={styles.buttonstyle}
                        onPress={() => props.onConfirm()}
                    />
                </View>
            </View>
        </Modal>
    );
};
export default VerificationPopup;
