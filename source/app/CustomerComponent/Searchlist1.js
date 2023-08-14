import { Icon, Text } from '@rneui/themed';
import React from 'react';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { connect } from 'react-redux';
import filtersController from '../../apis/Controller/actionController';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const SearchList1 = props => {

    const removeItem = async (index) => {
        let filters = { ...props.resentSearch }
        let search = [...filters.inputValue]
        let upadteSearch = search.filter((data, indx) => {
            return indx !== index
        })
        filters = {
            ...filters,
            inputValue: upadteSearch
        }
        await filtersController.setResentVisitShopsFilter(filters);
    };
   
    return (
        <View>
            {
                props && props.resentSearch && props.resentSearch.inputValue.length > 0 ?
                    <FlatList
                        contentContainerStyle={styles.flat}
                        data={props && props.resentSearch && props.resentSearch.inputValue}
                        keyExtractor={(item, index) => (item, index)}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => props.getSearchValue(item)}>
                                <View style={styles.subContainer}>
                                    <View style={styles.iconmain1}>
                                        <Icon
                                            name={Icons.backintime}
                                            type={IconsType.entypo}
                                            color={colors.lightgrey}
                                            size={Dimension.smallicon}
                                        />
                                        <View style={styles.textMain}>
                                            <Text style={styles.name}>{item}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.iconMain2}>
                                        <TouchableOpacity onPress={() => removeItem(index)}>
                                            <Icon
                                                name={Icons.close}
                                                type={IconsType.antDesign}
                                                color={colors.lightblack}
                                                size={Dimension.verysmall}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    :
                    null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    subContainer: {
        marginBottom: vp(18),
        flexDirection: 'row',
    },
    iconmain1: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        alignItems: 'center',
        flex: 0.5,
    },
    textMain: {
        marginLeft: wp(14),
    },
    iconMain2: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 0.5,
        // backgroundColor: 'green'
    },
    name: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    flat: {
        marginTop: vp(18),
    },
});

const mapStateToProps = state => ({
    resentSearch: state.SearchFilter.search,
});
export default connect(mapStateToProps)(SearchList1);
