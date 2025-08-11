import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
  return (
    <Tabs.Navigator>
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
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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

