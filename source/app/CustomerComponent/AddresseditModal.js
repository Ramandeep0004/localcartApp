import { Text } from '@rneui/themed';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';


const AddresseditModal = props => {
  return (
    <>
      <Modal
        isVisible={props.open}
        style={styles.modal}
        backdropColor={colors.gray}
        backdropOpacity={0.3}>
        <View style={styles.listView}>
          <View style={styles.containerMain}>
            <View style={styles.textMain}>
            <Text style={styles.txt}>Edit</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.textMain}>
            <Text style={styles.txt}>Remove</Text>
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
    alignItems:'flex-end',
    justifyContent:'flex-start',
    marginTop: hp(200),
    marginHorizontal: 20,
  },
  textMain:{
    paddingVertical:vp(8),
    paddingHorizontal:hzp(10)
  },
  line:{
    borderBottomWidth:wp(1),
    width:"100%",
    borderColor:colors.buttonborder,
  },
 
  txt:{
    fontSize:fp(14),
    fontFamily:Font.regular,
    color:colors.darkblack,
  },
 
 
 
  listView: {
    width: '30%',
    borderRadius: hp(10),
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


 
});

export default AddresseditModal;

