import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Font } from '../assets/global_style/fontfamily';
import { ScrollView } from 'react-native';
import filtersController from '../../apis/Controller/actionController';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { t } from 'i18next';

const FilterItemReq = props => {
  const [filter, setFilter] = useState(props && props.itemStatus ? props.itemStatus : []);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      setValue();
    }
  }, [isFocus]);

  const [sort, setSort] = useState([
    { name: t('status.Pending'), value: 'pending', checked: false },
    { name: t('status.Accepted'), value: 'approved', checked: false },
    { name: t('status.Refused'), value: 'declined', checked: false },
  ]);

  const setValue = async () => {
    let array = [...sort];
    let value = props && props.itemStatus ? [...props.itemStatus] : [];
    for (let i in array) {
        if (value.includes(array[i].value)) {
            array[i].checked = true;
        } else {
            array[i].checked = false;
        }

    }
    setSort(array);
  };


  const handleFilter = async (e, name) => {
    await filtersController.requestedItemsFilters(filter);
    props.value(name);
    props.close();
  };

  const removeFilters = async () => {
    await filtersController.requestedItemsFilters([]);
    props.value(null);
    props.close();
  };

  return (
    <>
      <Modal
        isVisible={props.open}
        style={styles.modal}
        backdropColor={colors.white}
        backdropOpacity={0}
        onBackdropPress={() => props.close()}>
        <View style={styles.main}>
          <View style={styles.viewrow}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {sort.map((item, index) => (
                <View key={index} style={styles.textmain}>
                  <TouchableOpacity
                    // onPress={() => {
                    //   let array = [...sort];
                    //   array.map(e => {
                    //     if (e.value == item.value) {
                    //       e.checked = true;
                    //     }
                    //     else {
                    //       e.checked = false;
                    //     }
                    //   });
                    //   setSort(array);
                    //   handleFilter(item.value);
                    // }}
                    onPress={async () => {
                      let arr = [...sort];
                      let array = filter ? [...filter] : [];
                      if (item.checked) {
                        var itemIndex = array.indexOf(item.value);
                        array.splice(itemIndex, 1);
                      }
                      else {
                        array.push(item.value);
                      }
                      item.checked = !item.checked
                      setSort(arr);
                      setFilter(array);
                    }}
                  >
                    <Text style={item.checked ? styles.title2 : styles.title}>{item.name}</Text>
                  </TouchableOpacity>
                  <View style={styles.borderLines}></View>
                </View>))}
              <View style={styles.resetbtn}>
                <View style={{ flex: 0.5 }}>
                  <TouchableOpacity onPress={() => handleFilter()}>
                    <Text style={styles.text22}>{t("Filters.Save")}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={() => removeFilters()}>
                    <Text style={styles.text}>{t("Filters.Reset")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  main: {
    maxHeight: hp(400),
    minHeight: hp(150),
    backgroundColor: colors.white,
    width: '40%',
    borderRadius: hp(10),
    overflow: 'hidden',
    marginTop: vp(120),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  viewrow: {
    paddingVertical: vp(15),
    paddingHorizontal: hp(10)
    // borderBottomWidth: 1,
    // borderBottomColor: colors.inputbordercol,
    // alignItems: 'center',
  },
  checkcon: {
    margin: 0,
    padding: 0,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: fp(17),
    color: colors.red,
    fontFamily: Font.semiBold
  },
  Text: {
    fontSize: fp(16),
    fontFamily: Font.regular,
    color: colors.black,
  },
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    width: '100%',
  },
  title: {
    fontSize: fp(16),
    color: colors.black,
    marginTop: vp(-3),
    paddingLeft: vp(10)
  },
  title2: {
    fontSize: fp(16),
    color: colors.green,
    fontFamily: Font.semiBold,
    marginTop: vp(-3),
    paddingLeft: vp(10)
  },
  textmain: {
    // borderBottomWidth: 1,
    // borderBottomColor: colors.inputbordercol,
    paddingVertical: vp(5)
  },
  borderLines: {
    borderBottomWidth: 1,
    borderBottomColor: colors.inputbordercol,
    marginTop: hp(10)
  },
  resetbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: vp(10),
    paddingVertical: vp(5),
    marginHorizontal: hp(10)
  },
  text22: {
    fontSize: fp(17),
    color: colors.darkkgreen,
    fontFamily: Font.semiBold
  },
});

const mapStateToProps = state => ({
  itemStatus: state.RequestedItemsFilters.filters,
});
export default connect(mapStateToProps)(FilterItemReq);
