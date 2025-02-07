import React, { useEffect, useState } from 'react';
import "@/global.css";
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTokenStore } from '@/store/api/token.store';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
  });
  const { token, checkToken } = useTokenStore();
  const [tokenChecked, setTokenChecked] = useState(false);
  const [initialRoute, setInitialRoute] = useState<"Home" | "Tabs">("Home");

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      
      if (fontsLoaded) {
        const hasValidToken = await checkToken();
        
        setInitialRoute(hasValidToken ? "Tabs" : "Home");
        setTokenChecked(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded || !tokenChecked) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="transparent" />
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: '#1e124c' }}>
          <AppNavigator initialRoute={initialRoute} />
        </View>
      </SafeAreaProvider>
    </>
  );
}
