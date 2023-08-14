import { useIsFocused } from '@react-navigation/native';
import { Button, Icon, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import {
  FlatList, RefreshControl, TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import filtersController from '../../../../apis/Controller/actionController';
import AddressController from '../../../../apis/Controller/address.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import NoRecord from '../../../ShopComponent/NoRecord';
import Loader from '../../Helper/loader';
import SuccessPopup from '../../Helper/successPopup';
import { Toaster } from '../../Helper/Toaster';
import styles from './style';

const ShopkeeperSaveAddress = props => {
  const [deletePopUp, setDeletePopup] = useState(false);
  const [addressId, setAddressId] = useState();
  const [addressLists, setAddressLists] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  let add = props && props.savedAddress

  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      getAddressList();
      setLoader(true)
    }
  }, [isFocus]);


  const getAddressList = async () => {
    let response = await AddressController.addressList();
    if (response && response.status) {
      let list = response.listing;
      for (let i in list) {
        let existed_item = add;
        if (existed_item.id === list[i].id) {
          list[i]['checked'] = existed_item && existed_item.checked ? existed_item.checked : false;
        } else {
          list[i]['checked'] = false;
        }
      }
      setAddressLists(list);
      setLoader(false);
      setRefreshing(false);
    } else {
      setAddressLists([]);
      setLoader(false)
      setRefreshing(false);
    }

  };

  const saveAdd = async (data) => {
    let item = { ...data, checked: data.checked = true }
    await new filtersController.setSavedAddresss(item);
    let array = [...addressLists];
    array.map(e => {
      if (e.id == item.id) {
        e.checked = true;
      }
      else {
        e.checked = false;
      }
    });
    setAddressLists(array);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getAddressList();
  };

  const handleDeleteAddress = (e) => {
    setAddressId(e);
    setDeletePopup(true);
  };

  const onConfirm = async () => {
    let res = await new AddressController.deleteAddress(addressId);
    if (res && res.status) {
      let existed_item = add;
      if (existed_item.id === addressId) {
        await new filtersController.setSavedAddresss({});
        new Toaster().success(res.message);
        setDeletePopup(false);
        getAddressList();
      } else {
        new Toaster().success(res.message);
        setDeletePopup(false);
        getAddressList();
      }
    }
  };

  return (
    <>
      {!loader &&<View style={styles.main}>
        <View style={styles.titleMain}>
          {addressLists && addressLists.length > 0 ? <View style={base.container}>
            <Text style={styles.title}>{addressLists.length} {addressLists.length === 1 ? t('savedAddress.Saved Address') : t('savedAddress.Saved Addresses')}</Text>
          </View> : null}
        </View>
        <View>
          <FlatList
            contentContainerStyle={styles.listMain}
            data={addressLists}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(i, index) => (index)}
            ListEmptyComponent={() => <NoRecord image={Images.noAddress} message={t('EmptyStates.No Address Found')} submain={styles.nodata} />}
            renderItem={({ item }) => (
              <View style={base.container}>
                <TouchableOpacity onPress={() => saveAdd(item)}>
                  <View style={styles.ContainerList} >
                    <View style={item.checked === true ? styles.addressContainer2 : styles.addressContainer}>
                      {/* <View style={styles.nameMain}>
                      <View style={styles.nameContainer}>
                        {item.first_name && item.last_name ? <Text style={styles.name}>{item.first_name} {item.last_name}</Text> : null}
                      </View>
                      <View style={styles.iconMain}>
                        <Icon
                          onPress={() => setShouldShow(!shouldShow)}
                          name={Icons.dotsthreevertical}
                          type={IconsType.entypo}
                          size={Dimension.Vsmall}
                          color={colors.Secondary}
                        />
                      </View>
                    </View> */}
                      {item.address && item.village_name && item.cities_name && item.district_name && item.state_name ?
                        <View style={styles.AddressContainer}>
                          <View style={styles.iconmain}>
                            <Icon
                              name={Icons.ioslocationsharp}
                              type={IconsType.ionIcon}
                              color={colors.Secondary}
                              size={Dimension.semiLarge}
                            />
                          </View>
                          <View style={styles.addressMain}>
                            <Text style={styles.address}>
                              {item.address}{', '}{item.village_name}{', '}{item.cities_name}{', '}{item.district_name}{', '}{item.state_name}
                            </Text>
                          </View>
                        </View> : null}
                      {/* {item.phonenumber ? <View style={styles.contactConatiner}>
                      <View style={styles.iconMain}>
                        <Icon
                          name={Icons.phone}
                          type={IconsType.feather}
                          color={colors.Secondary}
                          size={Dimension.semilarge}
                        />
                      </View>
                      <View style={styles.numberMain}>
                        <Text style={styles.address}>{item.phonenumber}</Text>
                      </View>
                    </View> : null} */}
                      {<View style={styles.editDelete}>
                        <TouchableOpacity onPress={() => {
                          props.navigation.navigate('addaddresses',
                            {
                              edit: 'edit',
                              item: item
                            })
                        }}>
                          <View style={styles.iconMainEdit}>
                            <Icon
                              name={Icons.pencilcircle}
                              type={IconsType.materialCommunity}
                              color={colors.primary}
                              size={Dimension.Large}
                            />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteAddress(item.id)}>
                          <View style={styles.iconMainEdit}>
                            <Icon
                              name={Icons.deletecircle}
                              type={IconsType.materialCommunity}
                              color={colors.Secondary}
                              size={Dimension.Large}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View style={styles.buttonMain}>
          <View style={base.container}>
            <Button
              buttonStyle={styles.button}
              title={t("savedAddress.+ Add a new address")}
              onPress={() => {
                props.navigation.navigate('addaddresses')
              }}
            />
          </View>
        </View>

        {deletePopUp ? <SuccessPopup
          open={deletePopUp}
          close={() => setDeletePopup(false)}
          onConfirm={() => onConfirm()}
          message={t('SuccessPopup.Are you sure to delete this address?')}
          // message1={t('SuccessPopup.This process cannot be undone.')}
          label={t('SuccessPopup.Delete address?')}
        /> : null}
      </View>}
      {loader ? <Loader loader={loader} /> : null}
    </>
  );
};
const mapStateToProps = state => ({
  user: state.UserReducer.user,
  savedAddress: state.SavedAddReducer.savedAddress,
});
export default connect(mapStateToProps)(ShopkeeperSaveAddress);
