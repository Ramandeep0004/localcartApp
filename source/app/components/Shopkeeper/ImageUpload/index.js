import { Icon, Image, Text } from '@rneui/themed';
import React from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import { FocusAwareStatusBar } from '../../Helper/statusBar';
import { styles } from './style';

const ImageUpload = (props) => {
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    return (
        <>
            <FocusAwareStatusBar backgroundColor={colors.black} barStyle='dark-content' translucent />

            <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
                <View style={base.container}>
                    <View style={base.row}>
                        <View style={base.col12}>
                            <View style={base.subrow}>
                                <TouchableOpacity onPress={() => ''}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Icon type={IconsType.antDesign} name={Icons.back} size={Dimension.large} color={colors.white} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.text}>IMG-20210610-WA00</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.viewimage}>
                    <View style={styles.mainimage}>
                        <Image style={styles.image} source={Images.imageupload} resizeMode='contain' />
                    </View>
                </View>
            </View>
        </>
    )
};
export default ImageUpload;