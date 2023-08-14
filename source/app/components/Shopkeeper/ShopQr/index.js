import { Button, Image, Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { base } from '../../../assets/global_style/base';
import { Images } from '../../../assets/global_style/images';
import { renderImage } from '../../Helper/general';
import { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import QRCodeController from '../../../../apis/Controller/qrCode.controller';
import Loader from '../../Helper/loader';
import { Linking } from 'react-native';
import Constant from '../../../../apis/constant';
import { t } from 'i18next';


const ShopQR = (props) => {

    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const isFocus = useIsFocused();
    useEffect(() => {
        getQRCode();
    }, [isFocus]);

    const getQRCode = async () => {
        setLoader(true)
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

    return (
        <>
            {!loader &&
                <View style={styles.main}>
                    <View style={styles.viewwhite}>
                        <View style={base.container}>
                            <View style={styles.viewimage}>
                                <View style={styles.mainimage}>
                                    <Image style={styles.image}
                                        source={data && data.image ? renderImage(data.image) : Images.dummyShop}
                                    />
                                </View>
                                <View style={styles.viewImage}>
                                    <Image style={styles.image}
                                        source={data && data.user && data.user.image ? renderImage(data.user.image) : Images.user}
                                    />
                                </View>
                            </View>
                            {data && data.shop_name ? <Text style={styles.bablu}>{data && data.shop_name}</Text> : null}
                            {data && data.user && data.user.first_name && data.user.last_name ? 
                            <Text style={styles.pandit}>{data && data.user && data.user.first_name}{' '}{data && data.user && data.user.last_name}{' '}({data && data.shopkeeper_type && data.shopkeeper_type.title})  </Text> : null}
                            <View style={styles.Mainview}>
                                <View style={styles.Mainimage}>
                                    <Image style={styles.image}
                                        source={data && data.shop_qr_code ? renderImage(data.shop_qr_code) : Images.scan}
                                        resizeMode='contain'
                                    />
                                </View>
                                <Text style={styles.scan}>{t("QrCodes.Scan this QR code")}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewbutton}>
                        <Button title={t('QrCodes.Download QR code')}
                            buttonStyle={styles.buttonstyle}
                            onPress={() => Linking.openURL(`${Constant.image}${data && data.shop_qr_code}`)}
                        />
                    </View>
                </View >}
            <Loader loader={loader} />
        </>
    )
};

export default ShopQR;