import React from 'react';
import { StyleSheet } from 'react-native';


import WheelOfFortune from 'react-native-wheel-of-fortune';
import { Button, Image, Text, Input, Icon } from '@rneui/themed';
import {
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Images } from '../assets/global_style/images';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';



const participants = [
    '%10',
    '%20',
    '%30',
    '%40',
    '%50',
    '%60',
    '%70',
    '%90',
    'FREE',
];
class Spinner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            winnerValue: null,
            winnerIndex: null,
            started: false,
        };
        this.child = null;
    }

    buttonPress = () => {
        this.setState({
            started: true,
        });
        this.child._onPress();
    };

    render() {
        const wheelOptions = {
            rewards: participants,
            knobSize: hp(5),
            marginTop: hp(40),
            borderWidth: 5,
            borderColor: '#fff',
            innerRadius: 30,
            duration: 6000,
            backgroundColor: 'transparent',
            textAngle: 'horizontal',
            // knobSource: require('../assets/global_style/images/knob.png'),
            onRef: ref => (this.child = ref),
        };
        return (
            <View style={styles.main}>
                <View style={styles.ContainerMain}>
                    <StatusBar barStyle={'light-content'} />

                    {!this.state.started && (
                        <View style={styles.startButtonView}>
                            <TouchableOpacity
                                onPress={() => this.buttonPress()}
                                style={styles.startButton}>
                                <Text style={styles.startButtonText}>Spin and earn</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {this.state.winnerIndex != null && (
                        <View style={styles.winnerView}>
                            <Text style={styles.winnerText}>
                                You win {participants[this.state.winnerIndex]}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ winnerIndex: null });
                                    this.child._tryAgain();
                                }}
                                style={styles.tryAgainButton}>
                                <Text style={styles.tryAgainText}>TRY AGAIN</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {/* <View style={styles.WheelMain}> */}
                    <WheelOfFortune
                        options={wheelOptions}
                        getWinner={(value, index) => {
                            this.setState({ winnerValue: value, winnerIndex: index });
                        }}
                    />
                    {/* </View> */}
                    <View style={styles.imageContainer}>
                        <View style={styles.imageMain}>
                            <Image
                                style={styles.image}
                                source={Images.union}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonMain}>
                    <Button buttonStyle={styles.button} title="SPIN" />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.Secondary,
    },
    ContainerMain: {
        position: 'relative',
        //backgroundColor:'black',
        alignItems: 'center',
        justifyContent: 'center',

        height: '75%',
    },
    WheelMain: {
        padding: 0,
        margin: 0,

        backgroundColor: 'red',
        marginHorizontal: hzp(20),
    },

    startButtonView: {
        // position: 'absolute',
    },
    startButton: {
        // backgroundColor: 'rgba(0,0,0,.5)',
        marginTop: hp(40),
        // padding: 5,
    },
    startButtonText: {
        fontSize: fp(26),
        color: colors.white,
        fontFamily: Font.semiBold,
    },
    winnerView: {
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tryAgainButton: {
        padding: 10,
    },
    winnerText: {
        fontSize: 30,
    },
    tryAgainButton: {
        // padding: 5,
        // backgroundColor: 'rgba(0,0,0,0.5)',
    },
    tryAgainText: {
        fontSize: fp(26),
        color: colors.white,
        fontFamily: Font.semiBold,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: vp(16),
        borderRadius: hp(40),
        width: wp(180),
    },
    buttonMain: {
        marginTop: hp(70),
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imageMain: {
        height: hp(63),
        width: wp(60),
    },
    imageContainer: {
        position: 'absolute',
        bottom: 0,
        top: hp(100),
    },
});
export default Spinner;
