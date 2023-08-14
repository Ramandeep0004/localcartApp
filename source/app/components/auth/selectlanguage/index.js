import { useIsFocused } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { View } from 'react-native';
import languageController from '../../../../apis/Controller/LanguageController/language.controller';
import { base } from '../../../assets/global_style/base';
import { homeLabel } from '../../../assets/global_style/values/home';
import { Toaster } from '../../Helper/Toaster';
import LogoHeaderCom from '../component/logoheader';
import { styles } from './style';
import { changeLanguages } from '../../../../translation';

const SelectLanguage = props => {
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const { t } = useTranslation();
  const [select, setSelect] = useState(null);
  const [language, setSelectedLanguage] = useState(null);

  let isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      setSelectedLanguage(null);
      setSelect(null);
    }
  }, [isFocus]);

  const getLanguage = (item) => {
    if(item === 'en') {
      setSelect('English');
      setSelectedLanguage('en');
    }
    else if(item === 'te') {
      setSelect('Telugu');
      setSelectedLanguage('te');
    }
    else if(item === 'hi') {
      setSelect('Hindi');
      setSelectedLanguage('hi');
    }
    else if(item === 'bn') {
      setSelect('Bengali');
      setSelectedLanguage('bn');
    }
    else{
      setSelect(null);
      setSelectedLanguage(null);
    }
  };

  const setLanguage = async () => {
    if (language) {
      changeLanguages(language)
      await languageController.setLaguage(language);
      props.navigation.navigate('customerlogin');
      setSelectedLanguage(null);
    } else {
      new Toaster().error('Please Select language');
    }
  };

  return (
    <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
      <LogoHeaderCom />
      <View style={base.container}>
        <View style={base.row}>
          <View style={base.col12}>
            <View>
              <View style={base.col12}>
                <View style={styles.titleMain}>
                  <Text style={styles.title}>{t('Select language')}</Text>
                </View>
              </View>
              <View>
                <View style={styles.checkStyle1}>
                  <TouchableOpacity style={select && select === 'English' ? styles.chkbox1 : styles.chkbox2} onPress={() => getLanguage("en")}>
                    <Text style={select && select === 'English' ? styles.txt3 : styles.txt2}>
                      {t('English')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={select && select === 'Telugu' ? styles.chkbox1 : styles.chkbox2} onPress={() => getLanguage("te")}>
                    <Text style={select && select === 'Telugu' ? styles.txt3 : styles.txt2} >
                      {t('Telugu')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.checkStyle2}>
                  <TouchableOpacity style={select && select === 'Hindi' ? styles.chkbox1 : styles.chkbox2} onPress={() => getLanguage("hi")}>
                    <Text style={select && select === 'Hindi' ? styles.txt3 : styles.txt2}>
                      {t('Hindi')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={select && select === 'Bengali' ? styles.chkbox1 : styles.chkbox2} onPress={() => getLanguage("bn")}>
                    <Text style={select && select === 'Bengali' ? styles.txt3 : styles.txt2}>
                      {t('Bengali')}
                    </Text>
                  </TouchableOpacity>
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
          containerStyle={{ marginHorizontal: 20 }}
          // onPress={() => props.navigation.navigate('customerlogin')}
          onPress={() => setLanguage()}
        />
      </View>
    </View>
  );
};
export default SelectLanguage;
