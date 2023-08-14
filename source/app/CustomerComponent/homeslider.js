import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, wp } from '../assets/global_style/fontsize';
import { Images } from '../assets/global_style/images';
import { renderImage } from '../components/Helper/general';

const slides = [
  {
    key: 1,

    image: Images.frame,
  },
  {
    key: 2,

    image: Images.frame,
  },
  {
    key: 3,

    image: Images.frame,
  },
];

const HomeSlider = (props) => {
   
  _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.Image}
            source= {item.image ? renderImage(item.image, 'large') : Images.frame  }
            resizeMode='cover'
          />
        </View>
      </View>
    );
  };
    return (
      <AppIntroSlider
        data={props.slider}
        renderItem={_renderItem}
        dotClickEnabled={false}
        renderPagination={() => null}
      />
    );
 
}
const styles = StyleSheet.create({
  slide: {
   marginHorizontal:hzp(8),
    marginTop: hp(-65),
    marginBottom: hp(-50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    height: '100%',
    width: '100%',
   
  },
  imgContainer: {
    height: wp(250),
    width: '100%',
    borderRadius: hp(12),
    overflow: 'hidden',
  },
  text: {
    fontSize: fp(15),
    color: colors.black,
    fontFamily: Font.semiBold,
  },
});
export default HomeSlider;
