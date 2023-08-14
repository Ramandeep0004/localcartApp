import { Button, Icon, Input, Text } from '@rneui/themed';
import React from 'react';
import {
  StyleSheet, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const AddCommentModal = props => {
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
                <View style={base.col8}>
                  <View style={styles.titleMain}>
                    <Text style={styles.addComment}>Add Comment</Text>
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
            <View style={styles.inputMain}>
              <View style={base.col12}>
                <Input
                multiline={true}
                inputStyle={styles.inputTxt}
                 selectionColor={colors.Secondary}
                  inputContainerStyle={{height: hp(110)}}
                  placeholder="Type your comment here..."
                />
              </View>
            </View>
            <View style={styles.buttomMain}>
              <View style={base.col12}>
                <Button
                buttonStyle={styles.buttonContainer}
                title='Save'
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
  buttomMain:{
    marginTop:hp(15),
  },
  inputMain: {
    marginTop: hp(40),
  },
  inputTxt:{
    marginBottom:hp(50)
  },
  buttonContainer:{
    backgroundColor:colors.primary,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  containerMain: {
    marginBottom:hp(24),
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
    width: '95%',
    borderRadius: hp(15),
    backgroundColor: colors.GreyL,
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

export default AddCommentModal;
