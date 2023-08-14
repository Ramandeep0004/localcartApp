import { Button, Icon, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import {
  ScrollView, StyleSheet, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const AddressModal = props => {


  return (
    <>
      <Modal
        isVisible={props.open}
        style={styles.modal}
        backdropColor={colors.gray}
        backdropOpacity={0.3}>
        <View style={styles.listView}>
          <View style={styles.containerMain}>
            <View style={styles.DetailContainer}>
              <View style={base.col12}>
                <View style={base.row}>
                  <View style={base.col8}>
                    <View style={styles.titleMain}>
                      <Text style={styles.addComment}>{t("addAddress.My Addresses")}</Text>
                    </View>
                  </View>
                  <View style={base.col4}>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity onPress={() => props.close()}>
                        <View style={styles.viewicon}>
                          <Icon
                            type={IconsType.antDesign}
                            name={Icons.close}
                            size={Dimension.smallicon}
                            color={colors.white}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.ContainerMain}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                nestedScrollEnabled={true}>
                <View style={base.col12}>
                  {props.addressLists && props.addressLists.map((item, index) => (
                    <TouchableOpacity onPress={() => props.saveAdd(item)}>
                      <View key={index} style={item.checked === true ? [styles.boxContainer, styles.boxContainer1] : [styles.boxContainer]}>
                        {/* <View style={base.container}>
                          <View style={styles.nameContainer}>
                            {item.first_name && item.last_name ? <Text style={styles.name}>{item.first_name}{' '}{item.last_name}</Text> : null}
                            <View style={{ justifyContent: 'center' }}>
                              <View style={styles.boxMain}>
                                <Text style={styles.homeTxt}>HOME</Text>
                              </View>
                            </View>
                          </View>
                        </View> */}
                        {item.address && item.village_name && item.cities_name && item.district_name && item.state_name ? <View style={base.container}>
                          <View style={styles.addressContainer}>
                            <View style={styles.iconMain}>
                              <Icon
                                name={Icons.ioslocationsharp}
                                type={IconsType.ionIcon}
                                color={colors.Secondary}
                                size={Dimension.semiLarge}
                              />
                            </View>
                            <View style={styles.addressMain}>
                              <Text style={styles.address}>
                                {item.address}, {item.village_name}, {item.cities_name}, {item.district_name}, {item.state_name}
                              </Text>
                            </View>
                          </View>
                        </View> : null}
                        {/* {item.phonenumber ? <View style={base.container}>
                          <View style={styles.contactConatiner}>
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
                          </View>
                        </View> : null} */}
                      </View>
                    </TouchableOpacity>))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.buttomMain}>
              <View style={base.col12}>
                <Button
                  buttonStyle={styles.buttonContainer}
                  title={t("addAddress.+ Add New Address")}
                  onPress={() => {
                    props.navigation.navigate('addaddresses'),
                      props.close()
                  }}
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: hp(70),

    marginHorizontal: 20,
  },
  ContainerMain: {
    maxHeight: hp(400),
  },
  DetailContainer: {
    marginBottom: vp(30)
  },
  boxMain: {
    backgroundColor: colors.boxcol,
    borderRadius: hp(3),
    marginLeft: wp(10),
    paddingHorizontal: hzp(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(17),
  },
  addressContainer: {
    flexDirection: 'row',
    // marginTop: hp(20),
  },
  contactConatiner: {
    flexDirection: 'row',
    marginTop: hp(12),
  },
  homeTxt: {
    fontSize: fp(10),
    fontFamily: Font.regular,
    color: colors.grey,
  },
  address: {
    fontSize: fp(14),
    fontFamily: Font.regular,
    color: colors.darkblack,
    textTransform: 'capitalize'
  },
  addressMain: {
    width: '90%',
    marginLeft: wp(8),
    justifyContent: 'center',
  },
  numberMain: {
    marginLeft: wp(8),
    justifyContent: 'center',
  },
  boxContainer: {
    borderWidth: wp(1),
    borderRadius: hp(12),
    borderColor: colors.buttonborder,
    marginBottom: hp(30),
    paddingVertical: vp(20),
  },
  boxContainer1: {
    borderWidth: wp(1),
    borderRadius: hp(12),
    borderColor: colors.Secondary,
    // marginTop: hp(30),
    paddingVertical: vp(20),
    backgroundColor: 'rgba(255, 232, 225, 1)',
  },
  name: {
    fontSize: fp(14),
    fontFamily: Font.semiBold,
    color: colors.darkblack,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  buttomMain: {
    // width:"100%",
    // position:'absolute',
    // left:0,
    // marginLeft:wp(15),
    // bottom:0,
    marginBottom: hp(20),
  },

  buttonContainer: {
    backgroundColor: colors.primary,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  containerMain: {
    // marginBottom: hp(24),
    marginTop: hp(22),
    paddingHorizontal: hzp(20),
    // backgroundColor:'red'
  },
  addComment: {
    fontSize: fp(24),
    fontFamily: Font.semiBold,
    color: colors.darkblack,
  },
  listMain: {
    paddingTop: hp(8),
    paddingBottom: hp(10),
  },

  cancle: {
    paddingLeft: wp(8),
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.white,
  },
  listView: {
    width: '100%',
    borderRadius: hp(15),
    backgroundColor: colors.GreyL,
    shadowColor: colors.lightgrey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
  },

  viewicon: {
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainicon: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: vp(10),
    marginBottom: vp(100),
  },
  titleMain: {
    marginTop: vp(5),
  },
});

export default AddressModal;
