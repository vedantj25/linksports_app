import { responsive } from './responsive';

export const lightTheme = {
  colors: {
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#121212',
    secondaryText: '#A0A0A0',
    primary: '#FF6B00',
    primaryHover: '#FF8F33',
    secondary: '#005BBB',
    secondaryAlt: '#4DA3FF',
    border: '#E6E6E6',
    onPrimary: '#FFFFFF',
    error: '#D91E18',
    brandGradientStart: '#0b1930',
    brandGradientEnd: '#06101f'
  },
  radius: { sm: 8, md: 12, lg: 16, full: 999 },
  spacing: {
    xs: responsive.rem(4),
    sm: responsive.rem(8),
    md: responsive.rem(12),
    lg: responsive.rem(16),
    xl: responsive.rem(24),
    xxl: responsive.rem(32)
  },
  sizes: {
    xs: responsive.rem(12),
    sm: responsive.rem(16),
    md: responsive.rem(20),
    lg: responsive.rem(24),
    xl: responsive.rem(32),
    xxl: responsive.rem(40)
  },
  typography: {
    fontPrimary: 'Roboto_400Regular',
    fontPrimaryMedium: 'Roboto_500Medium',
    fontPrimaryBold: 'Roboto_700Bold',
    fontSecondary: 'OpenSans_400Regular',
    fontSecondarySemibold: 'OpenSans_600SemiBold',
    fontSecondaryBold: 'OpenSans_700Bold',
    // Scaled font sizes
    sizes: {
      xs: responsive.rem(11),
      sm: responsive.rem(12),
      md: responsive.rem(14),
      lg: responsive.rem(16),
      xl: responsive.rem(20),
      xxl: responsive.rem(24)
    }
  },
  responsive
};

export const darkTheme = {
  colors: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#F5F5F5',
    secondaryText: '#888888',
    primary: '#FF7A1A',
    primaryHover: '#FF9E4D',
    secondary: '#338FFF',
    secondaryAlt: '#66B3FF',
    border: '#2A2A2A',
    onPrimary: '#FFFFFF',
    error: '#D91E18',
    brandGradientStart: '#0b1930',
    brandGradientEnd: '#06101f'
  },
  radius: { sm: 8, md: 12, lg: 16, full: 999 },
  spacing: {
    xs: responsive.rem(4),
    sm: responsive.rem(8),
    md: responsive.rem(12),
    lg: responsive.rem(16),
    xl: responsive.rem(24),
    xxl: responsive.rem(32)
  },
  sizes: {
    xs: responsive.rem(12),
    sm: responsive.rem(16),
    md: responsive.rem(20),
    lg: responsive.rem(24),
    xl: responsive.rem(32),
    xxl: responsive.rem(40)
  },
  typography: {
    fontPrimary: 'Roboto_400Regular',
    fontPrimaryMedium: 'Roboto_500Medium',
    fontPrimaryBold: 'Roboto_700Bold',
    fontSecondary: 'OpenSans_400Regular',
    fontSecondarySemibold: 'OpenSans_600SemiBold',
    fontSecondaryBold: 'OpenSans_700Bold',
    sizes: {
      xs: responsive.rem(11),
      sm: responsive.rem(12),
      md: responsive.rem(14),
      lg: responsive.rem(16),
      xl: responsive.rem(20),
      xxl: responsive.rem(24)
    }
  },
  responsive
};

export type Theme = typeof lightTheme;

