import { Button, Image, Text } from '@rneui/themed';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';
import { ImageBackground } from 'react-native';
import { View } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { Images } from '../../../assets/global_style/images';

import styles from './style';


const RegisterMain = (props) => {
    const { t } = useTranslation();
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    return (

        <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
            <ImageBackground
                style={styles.imageMain}
                source={Images.usertype1}
                resizeMode='stretch'>
                <View style={base.container}>
                    <View style={base.row}>
                        <View style={base.col12}>
                            <View style={styles.logoMain}>
                                <View style={styles.imgcontainer}>
                                    <Image style={styles.image} source={Images.logo} resizeMode='contain' />
                                </View>
                            </View>
                        </View>
                        <View style={base.col12}>
                            <View style={styles.titleMain}>
                                <Text style={styles.title}>
                                    {t('User type')}
                                </Text>

                            </View>
                        </View>
                        <View style={base.col12}>
                            <View style={styles.buttonMain1}>
                                <Button
                                    buttonStyle={styles.button1}
                                    title={t('button.Customer')}
                                    onPress={() => props.navigation.navigate('customersignup')}
                                />
                            </View>
                        </View>
                        <View style={base.col12}>
                            <View style={styles.buttonMain2}>
                                <Button
                                    buttonStyle={styles.button2}
                                    title={t('button.Shopkeeper')}
                                    titleStyle={styles.btntitle2}
                                    onPress={() => props.navigation.navigate('stepone')}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>

    );
}

export default RegisterMain;
