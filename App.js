import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

import lightOn from './assets/icons/eco-light.png';
import lightOff from './assets/icons/eco-light-off.png';
import dioWhite from './assets/icons/logo-dio-white.png';
import dioDark from './assets/icons/logo-dio.png';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(()=>{
    // Ligar lanterna
    Torch.switchState(toggle)
  },[toggle])

  useEffect(()=>{
    //Quando o celular for  chacoalhado, o toggle muda
    const subscription = RNShake.addListener(() => setToggle(oldToggle => !oldToggle));
    return () => subscription.remove()
  },[])

  return (
    <View style={toggle ? styles.containerLight : styles.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? styles.lightningOn : styles.lightningOff}
          source={
            toggle
              ? lightOn
              : lightOff
          } />
        <Image
          style={styles.dioLogo}
          source={
            toggle
              ? dioDark
              : dioWhite
          } />
      </TouchableOpacity>
    </View>
  );

};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightningOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightningOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});