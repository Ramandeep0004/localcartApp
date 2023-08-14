import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp } from '../../../assets/global_style/fontsize';


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.Secondary,
        marginTop: vp(1)
    },
    emptySpine: {
        flexGrow: 1,
        marginTop: hp(90)
    },
    Mainview: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingTop: vp(20),
        paddingBottom: vp(30),
        borderRadius: hp(10),
    },
    message: {
        fontSize: fp(22),
        fontFamily: Font.regular,
        color: colors.white,
        textAlign: 'center',
        marginTop: vp(20),
        paddingHorizontal : hp(10)
    },
    Mainimage: {
        height: hp(260),
        width: hp(260),
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
    },
});

export default styles;
