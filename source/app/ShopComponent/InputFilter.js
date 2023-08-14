import { Icon, Image, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import Filter from './Filter';

const InputFilter = (props) => {

    const { keyword, search, setSearch } = props;
    const [filter, setFilter] = useState();

    const handleChange = (e) => {
        props.getInputData(e);
    };

    return (
        <View>
            <View style={base.row}>
                <View style={base.col10}>
                    <Input placeholder='Search'
                        leftIcon={<Icon type={IconsType.antDesign}
                            name={Icons.search1}
                            size={Dimension.verysmall}
                            color={colors.grey}
                        />}
                        inputContainerStyle={styles.inputcontainer}
                        value={keyword}
                        onChangeText={e => {
                            setSearch(e);
                            search(e)
                        }}
                    />
                </View>
                <View style={base.col2}>
                    <TouchableOpacity onPress={() => setFilter(true)} >
                        <View style={styles.viewicon}>
                            <View style={styles.mainimage}>
                                <Image style={styles.image}
                                    source={Images.lines}
                                    resizeMode='stretch' />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {filter ?
                <Filter
                    open={filter}
                    close={() => setFilter(false)}
                    reRenderApi={() => props.reRenderApi()}
                    navigation={props.navigation}
                />
                : null}
        </View>
    );
};

const styles = StyleSheet.create({
    inputcontainer: {
        backgroundColor: colors.white,
    },
    viewicon: {
        height: hp(58),
        width: hp(58),
        borderRadius: hp(29),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewmain: {
        marginTop: vp(24),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(18),
        width: hp(16),
        overflow: 'hidden',
    },
});

export default InputFilter;
