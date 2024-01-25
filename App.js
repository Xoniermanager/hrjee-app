import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {EssProvider, EssContext} from './Context/EssContext';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import firebase from '@react-native-firebase/app';

import Main from './Navigators/Main';

const App = ({navigation}) => {
  return (
    <EssProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </EssProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
