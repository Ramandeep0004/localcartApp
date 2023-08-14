import { useIsFocused } from '@react-navigation/native';
import { Icon, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { connect } from 'react-redux';
import QRCodeController from '../../../../apis/Controller/qrCode.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import { renderImage } from '../../Helper/general';
import ImagePickerModal from '../../Helper/imagePicker';
import Loader from '../../Helper/loader';
import { Toaster } from '../../Helper/Toaster';
import { styles } from './style';


const PaymentQR = (props) => {
    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [imagePicker, setImagePicker] = useState(false);
    const [imageType, setImageType] = useState('');
    const [image, setImage] = useState(null);
    const isFocus = useIsFocused();
    useEffect(() => {
        setLoader(true)
        getQRCode();
    }, [isFocus]);

    const getQRCode = async () => {

        let response = await QRCodeController.getQRCode();
        if (response && response.status) {
            setData(response.shop);
            setLoader(false);
            setRefreshing(false);
        }
        else {
            setLoader(false);
            setRefreshing(false);

        }
    };


    const submit = async (path) => {
        let post = {
            shopId: props && props.user && props.user.shop && props.user.shop.id,
            image: path
        }
        if (path) {
            setLoader(true);
            let res = await new QRCodeController.paymentQRUpload(post);
            if (res && res.status) {
                new Toaster().success(res.message);
                getQRCode();
            }
            setLoader(false);
        } else {
            new Toaster().error(t('QrCodes.Please Upload the QR code'));
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.viewwhite}>
                <View style={base.container}>
                    <View style={styles.viewimage}>
                        <View style={styles.mainimage}>
                            <Image style={styles.image} source={data && data.image ? renderImage(data.image) : Images.dummyShop} />
                        </View>
                        <View style={styles.viewImage}>
                            <Image style={styles.image} source={data && data.user && data.user.image ? renderImage(data.user.image) : Images.user} />
                        </View>
                    </View>
                    {data && data.shop_name ? <Text style={styles.bablu}>{data && data.shop_name}</Text> : null}
                    {data && data.user && data.user.first_name && data.user.last_name ? <Text style={styles.pandit}>{data && data.user && data.user.first_name}{' '}{data && data.user && data.user.last_name}{' '}({data && data.shopkeeper_type && data.shopkeeper_type.title}) </Text> : null}
                    {
                        data && data.payment_qr_code ?
                            <><View style={styles.Mainview}>
                                <View style={styles.Mainimage}>
                                    <Image style={styles.image}
                                        source={data && data.payment_qr_code ? renderImage(data.payment_qr_code) : Images.scan}
                                        resizeMode='contain'
                                    />
                                </View>
                                <Text style={styles.scan}>{t("QrCodes.Scan this QR code")}</Text>
                            </View>
                                <View style={styles.MainView22}>
                                    <TouchableOpacity style={styles.submain22} onPress={() => setImagePicker(true)}>
                                        <Icon type={IconsType.antDesign} name={Icons.upload} size={Dimension.docicon} color={colors.black} />
                                        <Text style={styles.Upload}>{t("QrCodes.Change QR code")}</Text>
                                    </TouchableOpacity>
                                </View></>
                            :
                            <View style={styles.MainView}>
                                <Icon type={IconsType.ionIcon} name={Icons.scanoutline} color={colors.inputbordercol} size={Dimension.Big} />
                                <Text style={styles.upload}>{t("QrCodes.Upload payment QR code")}</Text>
                                <TouchableOpacity style={styles.submain} onPress={() => setImagePicker(true)}>
                                    <Icon type={IconsType.antDesign} name={Icons.upload} size={Dimension.docicon} color={colors.black} />
                                    <Text style={styles.Upload}>{t("QrCodes.Upload Image")}</Text>
                                </TouchableOpacity>
                            </View>}
                </View>
            </View>
            <ImagePickerModal
                show={imagePicker}
                close={() => setImagePicker(false)}
                type={'qr_code'}
                response={path => {
                    submit(path);
                }}
            />
            <Loader loader={loader} />
        </View>
    )
};
const mapStateToProps = state => ({
    user: state.UserReducer.user
});
export default connect(mapStateToProps)(PaymentQR);