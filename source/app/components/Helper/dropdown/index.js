import { Icon, Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import SearchableDropDown from 'react-native-searchable-dropdown';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';

import styles from './style';


const SearchDropDown = props => {
    return (
        <View style={props.style ? props.style : styles.dropmain}>
            {props.title ? (
                <Text style={props.labelStyle ? props.labelStyle : styles.labelStyle}>{props.title}</Text>
            ) : null}
            <SearchableDropDown
                selectedItems={props.value}
                onItemSelect={item => {
                    props.onChange(item);
                }}
                
                containerStyle={
                    props.containerStyle ? props.containerStyle : styles.container
                }
                itemStyle={props.itemStyle ? props.itemStyle : styles.item}
                itemTextStyle={
                    props.itemTextStyle ? props.itemTextStyle : styles.itemText
                }
                itemsContainerStyle={
                    props.itemsContainerStyle
                        ? props.itemsContainerStyle
                        : styles.itemContainer


                }
                errorStyle={styles.error}

                items={props.list}
                resetValue={false}
                placeholderTextColor={colors.lightgrey}

                textInputProps={{
                    placeholder: props.placeholder ? props.placeholder : '',

                    underlineColorAndroid: 'transparent',
                    selectionColor: colors.primary,
                    style: props.container ? props.container : styles.inputContainerStyle,
                    autoCapitalize: 'none',
                    value: props.inputValue ? props.inputValue : null,
                    defaultValue: props.defaultValue ? props.defaultValue : '',
                    keyboardType: props.keyboardType ? props.keyboardType : null,
                }}
                listProps={{
                    nestedScrollEnabled: true,
                }}
            />
            {props.right ?
                <View style={props.iconStyle ? props.iconStyle : styles.rightIcon}>
                    <Icon
                        type={props.right.type}
                        name={props.right.name}
                        size={props.right.size ? props.right.size : Dimension.smallicon}
                        color={props.right.color ? props.right.color : colors.black}
                    />
                </View>
                :
                <View style={props.iconStyle ? props.iconStyle : styles.rightIcon}>
                    <Icon
                        type={IconsType.material}
                        name={Icons.arrowdropdown}
                        size={Dimension.big}
                        color={colors.black}
                    />
                </View>
            }
            {props.left ? <View style={props.iconStyle ? props.iconStyle : styles.leftIcon}>
                <Icon
                    type={props.left.type}
                    name={props.left.name}
                    size={props.left.size ? props.left.size : Dimension.large}
                    color={props.left.color ? props.left.color : colors.black}
                />
            </View> : null}

            {!props.error ? (
                <Text style={props.errorStyle ? props.errorStyle : styles.errorStyle}>
                    {props.errorMessage}
                </Text>
            ) : props.space ? null : (
                <View style={styles.space} />
            )}
        </View>
    );
};



export default SearchDropDown;
