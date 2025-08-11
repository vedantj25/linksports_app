import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {
  size?: number;
}

export default function LoaderLottie({ size = 120 }: Props) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lottie/loader.json')}
        autoPlay
        loop
        style={{ width: size, height: size }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' }
});


