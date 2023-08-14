import { Icon, Image, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import AddCommentModal from './AddcomentModal';

const ProductListing = props => {
  const [comment, setComment] = useState();
  const [count, setCount] = useState(1);
  
  // const [num, setNum] = useState(1);
  // const incNumber = () => {
  //   setNum(num + 1);
  // };
  // const decNumber = () => {
  //   setNum(num - 1);
  // };
  return (
    <View>
      <ScrollView nestedScrollEnabled={true}>
        <FlatList
          contentContainerStyle={styles.listMain}
          data={[1, 2, 3, 4,5,6,7]}
          // data={[{num:'30',title:homeLabel.shopkeeperdashboard.Orders, Icons:Icons.archive, IconsType:IconsType.feather},
          // {num:'8', title:homeLabel.shopkeeperdashboard.Pending,Icons:Icons.clock, IconsType:IconsType.feather },
          // {num:'14', title:homeLabel.shopkeeperdashboard.Ready,Icons:Icons.checkcircleoutline, IconsType:IconsType.material },
          // {num:'6', title:homeLabel.shopkeeperdashboard.Delivered,Icons:Icons.truckcheckoutline, IconsType:IconsType.materialCommunity },
          // {num:'30', title:homeLabel.shopkeeperdashboard.Rewards,Icons:Icons.medaloutline, IconsType:IconsType.materialCommunity},
          // {num:'30', title:homeLabel.shopkeeperdashboard.Readytoencash,Icons:Icons.rupee, IconsType:IconsType.fontAwesome},

          //  ]}

          keyExtractor={(index, item) => (index, item)}
          renderItem={({item}) => (
            <View>
              <View style={styles.ContainerList}>
                <View style={styles.detailContainer}>
                  <View style={styles.detailMain1}>
                    <TouchableOpacity onPress={() =>
                    props.navigation.navigate('customercategory')
                  }>
                    <View style={styles.imgContainer}>
                      <Image
                        style={styles.image}
                        source={Images.bread}
                        resizeMode="cover"
                      />
                    </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.detailMain2}>
                    <Text style={styles.name}>Bonn Brown Bread</Text>
                    <Text style={styles.gram}>400 g</Text>

                    <Text style={styles.price}>₹24</Text>
                    <View style={styles.rupeesMain}>
                      <Text style={styles.rupees}>₹25</Text>
                    </View>
                  </View>
                  <View style={styles.detailMain3}>
                 <TouchableOpacity onPress={() => setComment(true)}>
                    <View style={styles.circleMain}>
                   
                      <Icon
                       
                        name={Icons.comment}
                        type={IconsType.octIcon}
                        size={Dimension.Vsmall}
                        color={colors.darkblack}
                      />
                      
                    </View>
                    </TouchableOpacity>
                  
                    <View style={styles.iconMain}>
                      <View>
                        <Icon
                           onPress={() => count ? setCount(count - 1) : 0}
                          name={Icons.minus}
                          type={IconsType.entypo}
                          size={Dimension.Vsmall}
                          color={colors.white}
                        />
                      </View>
                      <View>
                        <Text style={styles.numText}>{count}</Text>
                      </View>
                      <View>
                        <Icon
                           onPress={() => setCount(count + 1)}
                          name={Icons.plus}
                          type={IconsType.entypo}
                          size={Dimension.Vsmall}
                          color={colors.white}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.lineMain}></View>
              </View>
            </View>
          )}
        />
      </ScrollView>
      <View>
    {comment ? <AddCommentModal open={comment} close={() => setComment(false)} /> : null} 
    </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  ContainerList: {
    marginVertical: vp(10),
  },
  lineMain: {
    marginTop: hp(20),
    width: '100%',
    borderBottomWidth: hp(1),
    borderBottomColor: colors.inputbordercol,
  },
  rupees: {
    fontSize: fp(12),
    fontFamily: Font.regular,
    color: colors.lightgrey,
    textDecorationLine: 'line-through',
  },
  iconMain: {
    paddingHorizontal: hzp(10),
    paddingVertical: vp(8),
    borderRadius: hp(8),
    backgroundColor: colors.primary,
    flexDirection: 'row',
    marginTop: hp(30),
  },
  circleMain: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(30),
    width: hp(30),
    borderRadius: hp(15),
    backgroundColor: colors.greyy,
  },
  rupeesMain: {
    position: 'absolute',
    top: hp(63),
    bottom: 0,
    left: wp(50),
    right: 0,
  },
  price: {
    marginTop: hp(8),
    fontSize: fp(20),
    fontFamily: Font.semiBold,
    color: colors.black,
  },
  detailContainer: {
    flexDirection: 'row',
  },
  numText: {
    paddingHorizontal: hzp(5),
    fontSize: fp(11),
    fontFamily: Font.regular,
    color: colors.white,
  },
  name: {
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.darkblack,
  },
  gram: {
    marginTop: hp(8),
    fontSize: fp(16),
    fontFamily: Font.regular,
    color: colors.darkblack,
  },
  detailMain1: {
    flex: 0.3,
  },
  detailMain2: {
    paddingLeft: wp(18),
    marginTop: hp(10),
    flex: 0.4,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imgContainer: {
    height: hp(120),
  },
  detailMain3: {
    flex: 0.3,
    marginTop: hp(15),
    alignItems: 'flex-end',
  },
});

export default ProductListing;
