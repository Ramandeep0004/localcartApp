import { Button, Image, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../assets/global_style/fontsize';
import { Images } from '../assets/global_style/images';
import WheelOfFortune from 'react-native-wheel-of-fortune';
import { t } from 'i18next';


let ref = null;
const SpinnerComp = (props) => {
    const { setValues, participants, values } = props;
    const [state, setState] = useState(false);
    const color = [
        colors.skyblue,
        colors.cgreen,
        colors.offyellow,
        colors.orange,
        colors.yelloww,
        colors.sec,
        colors.pink,
        colors.purple,
        colors.blue,
    ];


    const wheelOptions = {
        rewards: participants,
        colors: color,
        knobSize: hp(1),
        marginTop: hp(40),
        borderWidth: 4,
        borderColor: colors.white,
        innerRadius: 30,
        duration: 3000,
        backgroundColor: 'transparent',
        textAngle: 'horizontal',
        // knobSource: require('../assets/global_style/images/knob.png'),
        getWinner: (value, index) => {
            setValues({ ...values, winnerValue: value, winnerIndex: index });
            props.savePoints(value.replace('✪', ''));
        },
        onRef: val => { ref = val }
    };

    return (
        <View style={styles.main}>
            <View style={base.container}>
                <View style={styles.startButtonView}>
                    <View
                        style={styles.startButton}>
                        <Text style={styles.startButtonText}>{t("spinAndWheel.Spin and earn")}</Text>
                    </View>
                </View>
                <View style={styles.submain}>
                    {participants.length > 0 ?
                        <WheelOfFortune
                            options={wheelOptions}
                            getWinner={(value, index) => {
                                setValues({ ...values, winnerValue: value, winnerIndex: index });
                                props.savePoints(value.replace('✪', ''));
                            }}
                        /> : null}
                    <View style={styles.imageContainer}>
                        <View style={styles.imageMain}>
                            <Image
                                style={styles.image}
                                source={Images.knob}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonMain}>
                    {!state ? <Button buttonStyle={styles.button}
                        title={t("spinAndWheel.Spin")}
                        onPress={() => {
                            if (values && values.winnerIndex != null) {
                                setValues({ ...values, winnerIndex: null, winnerValue: null });
                                console.log("----", ref)
                                // ref?._tryAgain();
                            }
                            else {
                                setState(true)
                                ref?._onPress();
                            }

                        }}
                    /> : null}
                </View>
            </View>
            {/* {
                state ?
                    <Congratulations open={state}
                        close={closeModal}
                    />
                    :
                    null
            } */}
            {/* <Congratulations /> */}
        </View>
    );

}
export default SpinnerComp;

const styles = StyleSheet.create({
    main: {
        flexGrow: 1,
        backgroundColor: colors.Secondary,
    },
    submain: {
        // backgroundColor: 'red',
        justifyContent: 'center',
        height: hp(500),
        marginTop: vp(60),
        width: hp(395),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imageMain: {
        height: hp(64),
        width: wp(30),
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        marginLeft: hp(185),
    },
    startButtonText: {
        fontSize: fp(24),
        color: colors.white,
        fontFamily: Font.semiBold,
        textAlign: 'center',
    },
    startButtonView: {
        // position: 'absolute',
    },
    startButton: {
        //backgroundColor: 'green',
        marginTop: hp(40),
        // padding: 5,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: vp(16),
        borderRadius: hp(40),
        width: '100%',
    },
    buttonMain: {
        marginTop: hp(70),
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainimage: {
        height: hp(20),
        width: hp(20),
        borderRadius: hp(10),
        overflow: 'hidden',
    },
});

// export default SpinnerComp;


