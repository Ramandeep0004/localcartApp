import { CheckBox, Icon, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const DeliveryInfoCom = props => {
    const [check1, setCheck1] = useState();
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm1 = time => {
        console.warn('A time has been picked: ', time);
        hideDatePicker();
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm2 = date => {
        console.warn('A date has been picked: ', date);
        hideTimePicker();
    };

    const [sort, setSort] = useState([
        { name: 'Available', value: 1, checked: false },
        { name: 'Not Available', value: 0, checked: false },
    ]);


    return (
        <View>
            <View style={styles.ContainerMain1}>
            <View style={styles.submain}>
                    {sort.map((item, index) => (
                        <View key={index} style={base.col6}>
                            <CheckBox
                                containerStyle={{
                                    alignItems: 'flex-start',
                                    backgroundColor: 'transparent',
                                    marginLeft: wp(0),
                                }}
                                title={item.name}
                                titleProps={{
                                    style: { fontFamily: Font.regular, fontSize: fp(16), color: colors.lightgrey, paddingLeft: vp(12) }
                                }}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={item.checked}
                                checkedColor={colors.primary}
                                onPress={() => {
                                    let array = [...sort];
                                    array.map(e => {
                                        if (e.value == item.value) {
                                            e.checked = true;
                                        }
                                        else {
                                            e.checked = false;
                                        }
                                    });
                                    setSort(array);
                                    //   props.handleStates('homeDelivery', item.value);
                                }}
                            />
                        </View>))}
                </View>

                <View style={[base.subrow, styles.buttonMain]}>
                    <View style={base.col6}>
                        <TouchableOpacity onPress={() => showDatePicker()}>
                            <Input
                                disabled={true}
                                selectionColor={colors.Secondary}
                                keyboardType={'default'}
                                autoCapitalize={false}
                                autoCorrect={false}
                                // errorMessage={"This field is required"}
                                placeholder="Delivery Date"
                                inputContainerStyle={{ paddingLeft: wp(17), paddingRight: wp(17) }}
                                rightIcon={
                                    <Icon
                                        type={IconsType.material}
                                        name={Icons.arrowdropdown}
                                        color={colors.black}
                                        size={Dimension.Large1}
                                    //   onPress={() => showDatePicker()}
                                    />
                                }
                            />

                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm2}
                                onCancel={hideTimePicker}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={base.col6}>
                        <TouchableOpacity onPress={() => showTimePicker()}>
                            <Input
                                disabled={true}
                                // inputContainerStyle={styles.inputContainer}
                                selectionColor={colors.Secondary}
                                keyboardType={'default'}
                                autoCapitalize={false}
                                autoCorrect={false}
                                // errorMessage={"This field is required"}
                                placeholder="Delivery Time"
                                inputContainerStyle={{ paddingLeft: wp(17), paddingRight: wp(17) }}
                                rightIcon={
                                    <Icon
                                        type={IconsType.material}
                                        name={Icons.arrowdropdown}
                                        color={colors.black}
                                        size={Dimension.Large1}
                                    //   onPress={() => showTimePicker()}
                                    />
                                }
                            />

                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleConfirm1}
                                onCancel={hideDatePicker}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    submain: {
        marginTop: hp(20),
        flexDirection: 'row',
    },
    buttonMain: {
        marginTop: hp(25)
    },
    inputContainer: {
        height: hp(60),
        borderColor: colors.inputbordercol,
        borderRadius: hp(40),
        borderWidth: hp(1),
        fontFamily: Font.regular,
    },
    checkcon: {
        margin: 0,
        padding: 0,
        backgroundColor: colors.GreyL,
    },
    title: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    button: {
        height: hp(60),
        borderWidth: hp(1),
        borderColor: colors.buttonborder,
        backgroundColor: colors.white,
    },
});

export default DeliveryInfoCom;
