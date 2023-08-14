import { Button, Icon, Image, Text } from '@rneui/themed';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';

const OrderRequestModal = props => {
  return (
    <>
      <Modal
        isVisible={props.open}
        style={styles.modal}
        backdropColor={colors.gray}
        backdropOpacity={0.85}>
        <View style={styles.listView}>
          <View style={styles.containerMain}>
            <View style={base.col12}>
              <View style={base.row}>
                <View style={base.col12}>
                  <View style={styles.imgContainer}>
                    <View style={styles.imgMain}>
                      <Image
                        style={styles.img}
                        source={Images.star}
                        resizeMode="cover">
                        <View style={styles.iconMain}>
                          <Icon
                            name={Icons.check}
                            type={IconsType.octIcon}
                            size={Dimension.Large}
                            color={colors.parrotgreen}
                          />
                        </View>
                      </Image>
                    </View>
                    <Text style={styles.reqTxt}>Request Sent</Text>
                    <View style={styles.subtiMain}>
                      <Text style={styles.subTitle}>
                        Lorem ipsum sit dor amet dolor el sit dor
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.buttomMain}>
              <View style={base.col12}>
                <Button
                  onPress={() => props.close()}
                  buttonStyle={styles.buttonContainer}
                  title="Ok"
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttomMain: {
    marginTop: hp(20),
  },
  subtiMain: {
    width: '75%',
  },
  subTitle: {
    marginTop: hp(12),
    textAlign: 'center',
    fontSize: fp(17),
    fontFamily: Font.regular,
    color: colors.lightgrey,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  iconMain: {
    position: 'absolute',
    bottom: 0,
    top: hp(20),
    left: 0,
    right: 0,
  },
  imgMain: {
    height: hp(70),
    width: wp(70),
  },
  inputMain: {
    marginTop: hp(40),
  },
  buttonContainer: {
    backgroundColor: colors.primary,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  titleMain: {
    alignItems: 'center',
    // justifyContent:'center'
  },
  reqTxt: {
    marginTop: hp(30),
    fontFamily: Font.regular,
    color: colors.black,
    fontSize: fp(24),
    textAlign: 'center',
  },
  containerMain: {
    marginBottom: hp(24),
    marginTop: hp(22),
    paddingHorizontal: hzp(20),
  },
  addComment: {
    fontSize: fp(26),
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
    backgroundColor: colors.white,
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
});

export default OrderRequestModal;
