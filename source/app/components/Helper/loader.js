import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {BarIndicator, SkypeIndicator, UIActivityIndicator} from 'react-native-indicators';
import { colors } from '../../assets/global_style/colors';
import { fp } from '../../assets/global_style/fontsize';


export default class Loader extends Component {
  _renderLoader = () => {
    if (this.props.loader)
      return (
        <View style={styles.background}>
          <UIActivityIndicator size={fp(45)} color={colors.Secondary} />
        </View>
      );
    else return null;
  };

  render() {
    return this._renderLoader();
  }
}

const styles = StyleSheet.create({
  background: {
    top: 0,
    left: 0,
    flex: 1,
    right: 0,
    bottom: 0,
    opacity: 0.5,
    zIndex: 9999,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
