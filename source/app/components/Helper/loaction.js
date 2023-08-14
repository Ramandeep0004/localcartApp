import React from 'react';
import {Linking, PermissionsAndroid} from 'react-native';
import {Platform} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import ConnectivityManager from 'react-native-connectivity-status';
import store from '../../../redux/store/index';
import {setLocation, setLocationStatus} from '../../../redux/action/user';
import { Toaster } from './Toaster';

class LocationService extends React.Component {
   constructor(props) {
    super(props);
  }

  checkLocation = async () => {
    let grant = false;
    if (Platform.OS === 'ios') {
      grant = await Permissions.check(PERMISSIONS.IOS.LOCATION_ALWAYS);
      if (grant) {
        const locationServicesAvailable =
          await ConnectivityManager.areLocationServicesEnabled();
        grant = locationServicesAvailable;
        await store.dispatch(setLocationStatus(grant));
        return grant;
      } else {
        await store.dispatch(setLocationStatus(grant));
        return grant;
      }
    } else {
      grant = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (grant) {
        const locationServicesAvailable = await ConnectivityManager.areLocationServicesEnabled();        
        grant = locationServicesAvailable;
        await store.dispatch(setLocationStatus(grant));
        return grant;
      } else {
        await store.dispatch(setLocationStatus(grant));
        return grant;
      }
    }
  };

  //Get Current location of user
  getInitialState = async () => {
    await this.getLocation().then(async data => {
      await store.dispatch(
        setLocation({lat: data.latitude, lng: data.longitude}),
      );
      await store.dispatch(setLocationStatus(true));
    });
  };

  location = async () => {
    if (Platform.OS === 'ios') {
      await this.getInitialState();
    } else {
      
      let grant = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (grant) {
        await this.getInitialState();
      } else {
        await this.requestLocationPermission();
      }
    }
  };

  //Permissions For Android
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Localcart',
          message: 'Localcart needs access to your device location',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getInitialState();
      } else {
        //requestLocationPermission();
        await store.dispatch(setLocationStatus(false));
        // alert(`${t('er_1')}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleIosError = async () => {
    await new Toaster().error('Please provide the access of location');
    Linking.openSettings();
  };

  //CURRENT LOCATION
  getLocation = async () => {
    return new Promise(async (resolve, reject) => {
      if (Platform.OS === 'ios')
        await Geolocation.requestAuthorization('always');
      Geolocation.getCurrentPosition(
        data => resolve(data.coords),
        err => {
          if (Platform.OS === 'ios') {
            this.handleIosError();
          }
          reject(err);
        },
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
      );
    });
  };
  //GET LOCATION BY NAME
  geocodeLocationByName = locationName => {
    return new Promise((resolve, reject) => {
      Geocoder.from(locationName)
        .then(json => {
          const addressComponent = json.results[0].address_components[0];
          resolve(addressComponent);
        })
        .catch(error => reject(error));
    });
  };

  //GET LOCATion BY COORDINATES(lat,long)
  geocodeLocationByCoords = (lat, long) => {
    return new Promise((resolve, reject) => {
      Geocoder.from(lat, long)
        .then(json => {
          // const addressComponent = json.results[0].address_components[0];
          const addressComponent = json.results[0];
          resolve(addressComponent);
        })
        .catch(error => reject(error));
    });
  };

  //CHECK PERMISSIONS GIVEN OR NOT
  getLocationPermissions = async () => {
    const granted = await request(
      Platform.select({
        android:
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION &&
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
      {
        title: 'Localcart',
        message: 'Localcart app would like access to your location ',
      },
    );
    return granted === RESULTS.GRANTED;
  };
}

export default LocationService;
