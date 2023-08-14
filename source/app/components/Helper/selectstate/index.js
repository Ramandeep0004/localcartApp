import { useIsFocused } from '@react-navigation/native';
import { Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import customerAuthController from '../../../../apis/Controller/customer.auth.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import Loader from '../loader';
import styles from './style';

const SearchAddressess = (props) => {
    let navparams = props && props.route && props.route.params;

    const [locations, setLocation] = useState([]);
    const [SearchLoader, setSearchLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [keyword, setSearch] = useState('');
    let isFocus = useIsFocused()
    useEffect(() => {
        if (isFocus) {
            setLoader(true)
            searchloaction('');
        }
    }, [isFocus]);

    const searchloaction = async (search) => {
        let post = {
            search: search ,
        };
    
        let response = await customerAuthController.getAddress(post)
        if (response && response.status) {
            if (response.listing.length > 0) {
                setLocation(response.listing);
                setLoader(false);
                setSearchLoader(false)
            } else {
                setLocation([]);
                setLoader(false);
                setSearchLoader(false)
            }
        }
        setLoader(false);
        setSearchLoader(false)
  
    };

    const handleloc = (item) => {
        navparams.addressDeatil(item)
        navparams.selectLoc(item)
        props.navigation.goBack();
    }

    const search = useCallback(debounce(searchloaction, 1000), []);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => handleloc(item)}>
            <View style={styles.Viewlist}>
                <Text style={styles.flattext}>{item.name}</Text>
                <View style={styles.line}>
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={{ flex: 1 }}>
            <View style={[base.container, { height: '100%' }]}>
                <View style={[base.row, { height: '100%' }]}>
                    <View style={[base.col12, { height: '100%' }]}>
                        <View style={styles.inputMain1}>
                            <Input
                                selectionColor={colors.Secondary}
                                autoCapitalize={false}
                                autoCorrect={false}
                                placeholder={t('searchLoaction.Type here...')}
                                leftIcon={{
                                    type: IconsType.antDesign,
                                    name: Icons.search1,
                                    color: colors.darkblack,
                                    size: Dimension.semilarge,
                                }}
                                rightIcon={
                                    SearchLoader ? (
                                        <ActivityIndicator
                                            color={colors.black}
                                            size={'small'}
                                            style={{ alignSelf: 'center' }}
                                        />
                                    ) :
                                        null
                                }
                                value={keyword}
                                onChangeText={e => {
                                    setSearch(e);
                                    search(e)
                                    setSearchLoader(true)
                                }}
                            />
                        </View>
                        <FlatList
                            contentContainerStyle={{ flexGrow: 1 }}
                            style={{ height: '100%' }}
                            data={locations}
                            ListEmptyComponent={() => <Text style={styles.nodata}>{t('searchLoaction.No locations found')}</Text>}
                            nestedScrollEnabled
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
            </View>
            <Loader loader={loader}></Loader>
        </View>
    );
}
export default SearchAddressess;
