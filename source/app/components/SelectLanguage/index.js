import { Button, Image, Text } from '@rneui/themed';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import { base } from '../../assets/global_style/base';
import { Images } from '../../assets/global_style/images';
import { homeLabel } from '../../assets/global_style/values/strings/home';
import { styles } from './style';


export default function SelectLanguage() {
  return (
    <View style={styles.main}>
      <ImageBackground style={styles.image} resizeMode='stretch' source={Images.backgroundimg}>
        <View style={base.container}>
          <View style={base.row}>
            <View style={base.col12}>
              <View>
              <View style={base.col12}>
                <View style={styles.logoMain}>
                  <View style={styles.imgcontainer}>
                    <Image style={styles.image} source={Images.logo} />
                  </View>
                </View>
              </View>
                <Text style={styles.txt}>{homeLabel.SelectLanguage.Selectlanguage}</Text>
                <View>
                  <View style={styles.checkStyle}>
                    <View style={styles.chkbox1}>
                      <Text style={styles.txt1}>{homeLabel.SelectLanguage.English}</Text>
                    </View>
                    <View style={styles.chkbox2}>
                      <Text style={styles.txt2}>{homeLabel.SelectLanguage.Telugu}</Text>
                    </View>
                  </View>
                  <View style={styles.checkStyle}>
                    <View style={styles.chkbox3}>
                      <Text style={styles.txt3}>{homeLabel.SelectLanguage.Hindi}</Text>
                    </View>
                    <View style={styles.chkbox4}>
                      <Text style={styles.txt4}>{homeLabel.SelectLanguage.Bengali}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>                   
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title={homeLabel.SelectLanguage.ButtonText}
            titleStyle={styles.btnTitle}
            buttonStyle={styles.btnStyle}
            containerStyle={{marginHorizontal:20}}
          />
        </View>
      </ImageBackground>
    </View>
  )
};