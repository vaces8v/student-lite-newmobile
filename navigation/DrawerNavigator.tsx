import React from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import TabNavigator from './TabNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  LogOut,
  QrCode,
  User,
  Settings,
  BookOpen,
  Calendar,
  MessageCircle
} from 'lucide-react-native';
import { useTokenStore } from '@/store/api/token.store';

const Drawer = createDrawerNavigator();

const MenuButton = ({ icon: FC, text, onPress }: {
  icon: JSX.Element,
  text: string,
  onPress: () => void
}) => (
  <TouchableOpacity style={styles.menuButton} onPress={onPress}>
    {FC}
    <Text style={styles.menuButtonText}>{text}</Text>
  </TouchableOpacity>
);

const MenuContent = () => {
  const navigation = useNavigation();
  const { removeToken } = useTokenStore();

  const handleExit = () => {
    removeToken();
    //@ts-ignore
    navigation.getParent()?.closeDrawer();
    navigation.reset({
      index: 0,
      //@ts-ignore
      routes: [{ name: 'Home' }],
    });
  };

  const handleQRLogin = () => {
    //@ts-ignore
    navigation.getParent()?.closeDrawer();
    //@ts-ignore
    navigation.navigate('QRBoard');
  };

  const handleProfile = () => {
    //@ts-ignore
    navigation.getParent()?.closeDrawer();
    //@ts-ignore
    navigation.navigate('Profile');
  };

  const handleSettings = () => {
    //@ts-ignore
    navigation.getParent()?.closeDrawer();
    //@ts-ignore
    navigation.navigate('SettingsScreen');
  };

  return (
    <View style={styles.menuContainer}>
      <LinearGradient
        colors={['#462ab2', '#1e124c']}
        style={styles.blurContainer}
      >
        <Text style={styles.menuTitle}>Меню</Text>

        <View style={styles.menuButtonsContainer}>
          <MenuButton
            icon={<User color="white" size={24} strokeWidth={1.5} />}
            text="Профиль"
            onPress={handleProfile}
          />
          <MenuButton
            icon={<BookOpen color="white" size={24} strokeWidth={1.5} />}
            text="Расписание"
            onPress={() => {
              //@ts-ignore
              navigation.getParent()?.closeDrawer();
              //@ts-ignore
              navigation.navigate('ScheduleScreen');
            }}
          />
          <MenuButton
            icon={<Calendar color="white" size={24} strokeWidth={1.5} />}
            text="Календарь"
            onPress={() => {
              //@ts-ignore
              navigation.getParent()?.closeDrawer();
              //@ts-ignore
              navigation.navigate('CalendarScreen');
            }}
          />
          <MenuButton
            icon={<MessageCircle color="white" size={24} strokeWidth={1.5} />}
            text="Сообщения"
            onPress={() => {
              //@ts-ignore
              navigation.getParent()?.closeDrawer();
              //@ts-ignore
              navigation.navigate('MessagesScreen');
            }}
          />
          <MenuButton
            icon={<QrCode color="white" size={24} strokeWidth={1.5} />}
            text="QR Вход"
            onPress={handleQRLogin}
          />
          <MenuButton
            icon={<Settings color="white" size={24} strokeWidth={1.5} />}
            text="Настройки"
            onPress={handleSettings}
          />
        </View>

        <TouchableOpacity
          style={styles.exitButton}
          onPress={handleExit}
        >
          <LogOut color="white" size={20} strokeWidth={2} />
          <Text style={styles.exitButtonText}>Выйти</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      id={undefined}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        headerTransparent: true,
        drawerType: "front",
        drawerContentStyle: {
          backgroundColor: 'transparent'
        },
        drawerStyle: {
          width: '70%',
          backgroundColor: 'transparent'
        },
        overlayColor: 'rgba(0,0,0,0.2)'
      }}
      drawerContent={() => <MenuContent />}
    >
      <Drawer.Screen name="MainTabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow: "hidden",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    paddingBottom: 0,
  },
  blurContainer: {
    flex: 1,
    padding: 20,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 10,
    paddingHorizontal: 20,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
    fontWeight: '500',
  },
  exitButton: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    borderRadius: 20,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600'
  }
});

export default DrawerNavigator;
