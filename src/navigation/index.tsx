import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { useAuthStore } from '../stores/auth';
import { SplashScreen as Splash, IntroSliderScreen as Intro, LoginScreen as Login, SignupScreen as Signup, FeedScreen as Feed, DiscoverScreen as Discover, ProfileScreen as Profile } from '../screens';
import ProfileWizardStack from '../screens/Wizard/ProfileWizardStack';

// Placeholder screens
const SplashScreen = Splash;
const IntroSliderScreen = Intro;
const LoginScreen = Login;
const SignupScreen = Signup;
const FeedScreen = Feed;
const DiscoverScreen = Discover;
const ProfileScreen = Profile;
const CreatePostModal = () => null;
const WizardStack = () => null;

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function AppTabs() {
  const insets = useSafeAreaInsets();
  const TabBarButton = (props: any) => (
    <Pressable
      {...props}
      android_ripple={undefined}
      style={({ pressed }) => [
        { borderRadius: 12 },
        pressed && { backgroundColor: '#00000010' },
        typeof props.style === 'function' ? props.style({ pressed }) : props.style
      ]}
    />
  );
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#8A8A8A',
        tabBarStyle: {
          height: 48 + (insets.bottom || 0),
          paddingBottom: Math.max(insets.bottom, 4),
          backgroundColor: '#ffffff',
          borderTopColor: '#e6e6e6'
        },
        tabBarHideOnKeyboard: true,
        tabBarPressColor: 'transparent',
        tabBarButton: (props) => <TabBarButton {...props} />,
        tabBarIcon: ({ focused, color, size }) => {
          const iconSize = 20;
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Feed') iconName = focused ? 'home' : 'home-outline';
          if (route.name === 'Discover') iconName = focused ? 'compass' : 'compass-outline';
          if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={iconSize} color={color} />;
        }
      })}
    >
      <Tabs.Screen name="Feed" component={FeedScreen} />
      <Tabs.Screen name="Discover" component={DiscoverScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, user } = useAuthStore();
  const profileCompleted = !!user?.profile_completed;

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Intro" component={IntroSliderScreen} />
            <Stack.Screen name="Auth">
              {() => (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                </Stack.Navigator>
              )}
            </Stack.Screen>
          </>
        ) : !profileCompleted ? (
          <Stack.Screen name="Wizard" component={ProfileWizardStack} />
        ) : (
          <Stack.Screen name="App" component={AppTabs} />
        )}

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="CreatePost" component={CreatePostModal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

