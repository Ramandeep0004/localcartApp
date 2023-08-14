import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Image } from '@rneui/themed';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Dimension } from '../assets/global_style/dimension';
import { Images } from '../assets/global_style/images';
import { renderImage } from '../components/Helper/general';
import { fp, hp, hzp, vp } from '../assets/global_style/fontsize';
import { Font } from '../assets/global_style/fontfamily';


const BillImageModal = props => {

    return (
        <>
            <Modal
                isVisible={props.open}
                backdropColor={colors.black}
                backdropOpacity={0.5}
                style={styles.modal}
                onDismiss={() => props.close()}
                onBackdropPress={() => props.close()}
                onBackButtonPress={() => props.close()}>
                <View style={styles.main}>
                    <View style={styles.submain}>
                        <View style={styles.Icon}>
                            <Icon type={IconsType.antDesign} 
                            name={Icons.close} 
                            color={colors.black} 
                            size={Dimension.semilarge} 
                            onPress={() => props.close()} 
                            />
                        </View>
                        <View style={styles.imageMain}>
                            <View style={styles.subImage}>
                                <Image style={styles.image} 
                                source={props.getImage ? renderImage(props.getImage, 'large') : Images.dummyCategory}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
    },
    main: {
        backgroundColor: colors.white,
        width: '80%',
        height: '53%',
        // height: 255,
        paddingHorizontal: hzp(10),
        borderRadius: hp(45),
        paddingVertical: vp(10),
    },
    submain: {
        // backgroundColor: colors.white,
        // borderRadius: hp(40),
        // paddingHorizontal: hp(10),
        // paddingVertical: hp(20),
        justifyContent: 'center',
        alignItems: 'center'
        // height: '100%',
        // width: '100%'
    },
    shadow: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    imageMain: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: hp(30),
    },
    subImage: {
        height: Platform.OS === "ios" ? hp(55) : hp(460),
        width: Platform.OS === "ios" ? hp(41) : hp(350),
    },
    textMain: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: Font.semiBold,
        fontSize: fp(35),
        color: colors.black,
        // marginBottom:hp(20)
    },
    desc: {
        fontFamily: Font.medium,
        fontSize: fp(20),
        color: colors.grey,
        textAlign: 'center',
        marginTop: hp(15),
        marginBottom: hp(20),
    },
    button: {
        marginTop: hp(30),
        paddingVertical: hp(18),
        borderRadius: hp(20)
    },
    viewicon: {
        alignItems: 'center',
        height: hp(30),
        width: hp(30),
        backgroundColor: colors.black,
        borderRadius: hp(15),
        //  alignSelf:'flex-end',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 100,
        top: hp(20),
        right: hp(20)
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: hp(40),
        overflow: 'hidden'
    },
    Icon: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 99999,
        backgroundColor: colors.white,
        height: hp(30),
        width: hp(30),
        justifyContent: 'center',
        borderRadius: hp(15),
    },
});

export default BillImageModal;
