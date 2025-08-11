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
    border: '#E6E6E6'
  },
  radius: { sm: 8, md: 12, full: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  typography: {
    fontPrimary: 'Roboto_400Regular',
    fontPrimaryMedium: 'Roboto_500Medium',
    fontPrimaryBold: 'Roboto_700Bold',
    fontSecondary: 'OpenSans_400Regular',
    fontSecondarySemibold: 'OpenSans_600SemiBold',
    fontSecondaryBold: 'OpenSans_700Bold'
  }
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
    border: '#2A2A2A'
  },
  radius: { sm: 8, md: 12, full: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  typography: {
    fontPrimary: 'Roboto_400Regular',
    fontPrimaryMedium: 'Roboto_500Medium',
    fontPrimaryBold: 'Roboto_700Bold',
    fontSecondary: 'OpenSans_400Regular',
    fontSecondarySemibold: 'OpenSans_600SemiBold',
    fontSecondaryBold: 'OpenSans_700Bold'
  }
};

export type Theme = typeof lightTheme;

