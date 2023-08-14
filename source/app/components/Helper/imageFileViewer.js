import { Icon, Text } from '@rneui/themed';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../../assets/global_style/colors';
import { Dimension } from '../../assets/global_style/dimension';
import { Font } from '../../assets/global_style/fontfamily';
import { fp, hp, vp } from '../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../assets/global_style/icon';
import { Images } from '../../assets/global_style/images';
import { getExtension, openUrl } from './general';
import HeaderComp from '../navigation/header/index';
const ImageFilePreviewModal = props => {
    const params = props && props.route && props.route.params.file;
    const ext = getExtension(params);

    const handleFileDowmload = () => {
        openUrl(params)
    };
   
    return (
        <>
            <HeaderComp
                left="back"
                title={props && props.route && props.route.params.title ? props.route.params.title : ``}
                navigation={props.navigation}
            />
            <View style={styles.view}>
                {(ext && ext === 'jpeg' || ext && ext === 'jpg' || ext && ext === 'png' || ext && ext === 'jfif') ?
                    <View style={styles.img}>
                        <Image
                            style={styles.img}
                            source={{ uri: params }}
                            resizeMode={'contain'}
                        />
                    </View>
                    :
                    <View style={styles.nodataview}>
                        <View style={styles.nodataimage}>
                            <Image
                                style={styles.img}
                                source={Images.warning}
                                resizeMode={'contain'}
                            />
                        </View>
                        <Text style={styles.nodatatext}>
                            This file type format is not supported. Please Download the file on click button
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginRight: hp(10) }}>
                                <Icon
                                    type={IconsType.octIcon}
                                    name={Icons.download}
                                    color={colors.black}
                                    size={Dimension.Large}
                                    onPress={() => handleFileDowmload()}
                                />
                            </View>
                            <View>
                                <Text style={styles.nodatatext2} onPress={() => handleFileDowmload()}>
                                    Download File
                                </Text>
                            </View>
                        </View>
                    </View>
                }
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
    },
    img: {
        height: '100%',
        width: '100%',
        // marginHorizontal: vp(0),
        paddingHorizontal: vp(20),
        paddingVertical: vp(15),
        borderRadius: hp(20),
    },
    audio: {
        backgroundColor: colors.black,
        marginHorizontal: vp(15),
        marginTop: vp(15),
        paddingHorizontal: vp(20),
        paddingVertical: vp(15),
        borderRadius: hp(20),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    video: {
        backgroundColor: colors.black,
        marginHorizontal: vp(15),
        paddingHorizontal: vp(20),
        paddingVertical: vp(15),
        borderRadius: hp(20),

    },
    nodatatext: {
        fontSize: fp(20),
        // maxWidth: '90%',
        fontFamily: Font.Medium,
        color: colors.grey,
        textAlign: 'center',
        marginBottom: hp(30)
    },
    nodatatext2: {
        fontSize: fp(22),
        // maxWidth: '90%',
        fontFamily: Font.bold,
        color: colors.black,
        textAlign: 'center'
    },
    nodataview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: hp(10)
    },
    nodataimage: {
        height: hp(200),
        width: hp(200),
        marginBottom: hp(50)
    },

});

export default ImageFilePreviewModal;
