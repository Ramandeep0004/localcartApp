import { StyleSheet } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../assets/global_style/fontsize';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.GreyL,
    },
    listMain: {
        paddingBottom: hp(20),
        marginTop: hp(20),
    },
    listContainer: {
        marginVertical: vp(8),
    },
    iconMain: {
        // marginTop:hp(7),
        marginRight: wp(4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContainerMain: {
        paddingBottom: hp(20),
        overflow: 'hidden',
        borderRadius: hp(10),
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    ContainerMain22: {
        paddingBottom: hp(20),
        overflow: 'hidden',
        borderRadius: hp(10),
        borderWidth: hp(1),
        borderColor: colors.Secondary,
        backgroundColor: 'rgba(255, 232, 225, 1)',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    text: {
        paddingTop: hp(20),
        fontSize: fp(17),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    timerMain: {
        marginTop: hp(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    timeContainer: {
        alignItems: 'flex-end',
    },
    date: {
        fontSize: fp(15),
        fontFamily: Font.regular,
        color: colors.gray,
    },
    date22: {
        fontSize: fp(15),
        fontFamily: Font.regular,
        color: colors.black,
    },
    dateMain: {
        // marginTop:hp(8),
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    buttonMain: {
        position: 'absolute',
        bottom: 0,
        marginBottom: hp(30),
    },
    button: {
        backgroundColor: colors.primary,
    },
    nodata: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(230),
    }
});

export default styles;
