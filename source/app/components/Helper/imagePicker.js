import { useIsFocused } from '@react-navigation/native';
import { Icon, Image, LinearProgress, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet, TouchableOpacity, View
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import ImageUploadController from '../../../apis/Controller/image.controller';
import { colors } from '../../assets/global_style/colors';
import { Dimension } from '../../assets/global_style/dimension';
import { Font } from '../../assets/global_style/fontfamily'
import { fp, hp, vp } from '../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../assets/global_style/icon';
import { Images } from '../app/assets/global_style/images';
import { Toaster } from './Toaster';

const ImagePickerModal = props => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = React.useState(0);

    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setProgress(0);
        } else {
            setProgress(0);
        }
    }, [isFocus, props.show]);

    const options = {
        quality: 0.4,
        fixOrientation: true,
        includeBase64: true,
        mediaType: 'photo',
    };
    const camera = () => {
        // setProgress(0);
        launchCamera(options, async response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // console.log(response)
                uploadImage(response.assets[0]);
                ///setValues({ ...values, images: response.uri })
            }
        });
    };
    const gallery = () => {
        // setProgress(0);
        launchImageLibrary(options, async response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                uploadImage(response.assets[0]);
                // /setValues({ ...values, images: response.uri })
            }
        });
    };

    const uploadImage = async image => {
        setLoading(true);
        setProgress(0.5);
        let callback = p => {
            setProgress(p >= 100 ? 0.91 : p);
        };
        let data = {
            image: image,
            folder: props.type,
            callback,
        };
        let response = await new ImageUploadController().addImage(data);
        setLoading(false);
        if (response && response.status) {
            props.response(response.path);
            setProgress(1);
            new Toaster().success(response.message);
            props.close();
        }
        setLoading(false);
    };

    const uploadDoc = async image => {
        // setLoading(true);
        // setProgress(0.5);
        // let callback = p => {
        //   setProgress(p >= 100 ? 0.91 : p);
        // };
        // let data = {
        //   image: image,
        //   folder: props.type,
        //   callback,
        // };
        // let response = await new ImageUploadController().addDocument(data);
        // setLoading(false);

        // if (response && response.status) {
        //   props.response({path: response.path, type: 'doc'});
        //   setProgress(1);
        //   new Toaster().success(response.message);
        //   props.close();
        // }
        // setLoading(false);
    };

    const selectDoc = async () => {
        // setProgress(0);
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            uploadDoc(res[0]);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Canceled from single doc picker');
            } else {
                console.log('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    return (
        <Modal
            isVisible={props.show}
            backdropOpacity={0.53}
            onBackButtonPress={() => {
                setProgress(0);
                props.close();
            }}
            onBackdropPress={() => {
                setProgress(0);
                props.close();
            }}>
            <View style={styles.main}>
                <View style={styles.cross}>
                    <TouchableOpacity onPress={() => props.close()}>
                        <View style={{ height: hp(30), width: hp(30), borderRadius: hp(15), backgroundColor: colors.primary }}>
                            <Icon
                                type={IconsType.entypo}
                                name={Icons.cross}
                                color={colors.white}
                                size={Dimension.Large}
                            // onPress={() => props.close() }
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                {!loading?<Text style={styles.header}>{t("imagepicker.Choose an option")}</Text>: null}
                <View style={styles.list}>
                    {progress > 0 ? (
                        <>
                            <Text
                                style={[
                                    styles.progressText,
                                    { color: loading ? colors.red : colors.green },
                                ]}>
                                {loading && progress != 1
                                    ? t('imagepicker.Uploading please wait...')
                                    : t('imagepicker.File uploaded successfully')}
                            </Text>
                            <LinearProgress
                                color={colors.primary}
                                value={progress}
                                style={styles.progress}
                                variant="determinate"
                            />
                        </>
                    ) : null}
                    {progress > 0 ? null : (
                        <>
                            <TouchableOpacity style={styles.row} onPress={() => camera()}>
                                <View style={styles.left}>
                                    <View style={styles.image}>
                                        {/* <Image source={Images.camera} style={{ height: '100%', width: '100%' }} /> */}
                                        <Icon type={IconsType.feather} name={Icons.camera} color={colors.black} size={Dimension.Large1} />
                                    </View>
                                </View>
                                <View style={styles.right}>
                                    <Text style={styles.title}>{t('imagepicker.Camera')}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.row} onPress={() => gallery()}>
                                <View style={styles.left}>
                                    <View style={styles.image}>
                                        {/* <Image source={Images.gallery} style={{ height: '100%', width: '100%' }} /> */}
                                        <Icon type={IconsType.materialCommunity} name={Icons.imagemultiple} color={colors.black} size={Dimension.Large1} />
                                    </View>
                                </View>
                                <View style={styles.right}>
                                    <Text style={styles.title}>{t('imagepicker.Gallery')}</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                {/* {loading ? <ProgressCircle progress={progress} /> : null} */}
                {/* {loading ? <Loader loader={loading} /> : null} */}
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    main: {
        marginHorizontal: hp(5),
        backgroundColor: colors.white,
        borderRadius: hp(10),
        paddingVertical: hp(15),
        paddingHorizontal: hp(15),
        overflow: 'hidden',
    },
    header: {
        textAlign: 'center',
        fontFamily: Font.semiBold,
        fontSize: fp(18),
        color: colors.black,
        marginTop: vp(8)
    },
    list: {
        marginTop: hp(10),
    },
    row: {
        flexDirection: 'row',
        paddingVertical: hp(5),
        paddingHorizontal: hp(10),
        borderRadius: hp(15),
        backgroundColor: colors.greyy,
        // backgroundColor: 'red',
        marginTop: hp(10),
        marginHorizontal: vp(5),
        marginBottom: vp(8)
    },
    left: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green',
    },
    image: {
        height: hp(65),
        width: hp(65),
        borderRadius: hp(32.5),
        padding: hp(2),
        // backgroundColor: 'rgba(52, 52, 52, 0.2)',
        // opacity: 0.5,
        // marginLeft: hp(40),
        // backgroundColor: colors.GreyL,
        justifyContent: 'center',
        alignItems: 'center',
    },

    right: {
        flex: .8,
        //paddingRight: hp('1%'),
        paddingLeft: hp(30),
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'blue'
    },
    title: {
        fontFamily: Font.medium,
        fontSize: fp(20),
    },
    progress: {
        borderRadius: hp(0.6),
        height: hp(5),
        marginBottom: hp(13),
    },
    progressText: {
        fontFamily: Font.medium,
        fontSize: hp(15),
        color: colors.red,
        marginBottom: hp(5),
        textAlign: 'center',
    },
    cross: {
        zIndex: 99,
        position: 'absolute',
        top: hp(20),
        right: hp(15),
    },
});
export default ImagePickerModal;
