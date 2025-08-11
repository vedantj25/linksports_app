import React from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type WidthType = number | `${number}%` | 'auto';
interface Props {
  width?: WidthType;
  height?: number;
  style?: ViewStyle;
  radius?: number;
}

export default function Skeleton({ width = '100%' as WidthType, height = 12, style, radius = 8 }: Props) {
  const theme = useTheme();
  const opacity = React.useRef(new Animated.Value(0.6)).current;
  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.6, duration: 700, useNativeDriver: true })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);
  return <Animated.View style={[styles.base, { width, height, borderRadius: radius, opacity, backgroundColor: theme.colors.border }, style]} />;
}

const styles = StyleSheet.create({
  base: {}
});


