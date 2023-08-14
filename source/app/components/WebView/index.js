
import { t } from 'i18next';
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import Constant from '../../../apis/constant';
import { colors } from '../../assets/global_style/colors';
import { Dimension } from '../../assets/global_style/dimension';
import { hp } from '../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../assets/global_style/icon';
import FailedModal from '../../CustomerComponent/FailedModal'
import SuccessModal from '../../CustomerComponent/SuccessModal'
import SuccessPopup from '../Helper/successPopup';

const MyWebView = (props) => {
    const amount =
        props &&
            props.route &&
            props.route.params &&
            props.route.params.amount
            ? props.route.params.amount
            : null;
    const userId =
        props &&
            props.user &&
            props.user.id
            ? props.user.id
            : null

    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const onNavigationStateChange = web => {
        if (web.nativeEvent.url == Constant.paymentFailed) {
            setFailed(true);
        } else if (web.nativeEvent.url == Constant.paymentSuccess) {
            setSuccess(true);
        }
        return true;
    };

    return (
        <View style={styles.main}>
            {amount && userId ?
                <WebView
                    source={{ uri: `${Constant.payment}?user_id=${userId}&amount=${amount}&token=${Constant.paymentToken}` }}
                    onLoadEnd={onNavigationStateChange}
                    javaScriptEnabled
                    domStorageEnabled
                    startInLoadingState={true}
                /> : null}
            {success ? <SuccessPopup
                open={success}
                iconName={Icons.check}
                iconType={IconsType.feather}
                dimension={Dimension.big}
                iconMainColor={colors.green}
                OneButtonOnly={true}
                close={() => setSuccess(false)}
                onConfirm={() => props.navigation.goBack()}
                RightButtonText={'Done'}
                message={'Amount added to wallet successfully!'}
                label={t("SuccessPopup.Success")}
            /> : null}
            {failed ? <SuccessPopup
                open={failed}
                iconName={Icons.cross}
                iconType={IconsType.entypo}
                dimension={Dimension.big}
                iconMainColor={colors.red}
                OneButtonOnly={true}
                close={() => setFailed(false)}
                onConfirm={() => props.navigation.goBack()}
                RightButtonText={'Done'}
                message={t('SuccessPopup.Your payment has been failed.')}
                label={t("SuccessPopup.Failed")}
            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: hp(20),
        marginTop: hp(60),
        marginBottom: hp(30)
    }
});
const mapStateToProps = state => ({
    user: state.UserReducer.user
});
export default connect(mapStateToProps)(MyWebView)