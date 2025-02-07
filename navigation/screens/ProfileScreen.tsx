import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { Settings, LogOut, ChevronLeft, TrendingUp, Calendar, Award } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [userData] = useState({
    name: 'Иван Петров',
    group: 'ПИ-20-1',
    avatar: require('@/assets/images/icon.png'),
    about: 'Студент группы ПИ-20-1',
    stats: {
      attendance: 85,
      performance: 92,
      credits: 45
    },
    performanceData: {
      labels: ['Сент', 'Окт', 'Ноя', 'Дек', 'Янв'],
      datasets: [{
        data: [75, 80, 85, 90, 92],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 3
      }]
    }
  });

  const goBack = () => {
    navigation.goBack();
  };

  const StatCard = ({ icon, label, value, color }) => (
    <View
      style={[styles.statCard, { backgroundColor: color }]}
    >
      <View style={styles.statCardIcon}>
        {icon}
      </View>
      <View style={styles.statCardTextContainer}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  );

  const renderContent = () => (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsScrollContainer}
      >
        <StatCard 
          icon={<Calendar color="white" size={20} />}
          label="Посещаемость"
          value={`${userData.stats.attendance}%`}
          color="#6a5acd"
        />
        <StatCard 
          icon={<TrendingUp color="white" size={20} />}
          label="Успеваемость"
          value={`${userData.stats.performance}%`}
          color="#4169e1"
        />
        <StatCard 
          icon={<Award color="white" size={20} />}
          label="Кредиты"
          value={userData.stats.credits.toString()}
          color="#483d8b"
        />
      </ScrollView>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Динамика успеваемости</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={userData.performanceData}
            width={SCREEN_WIDTH - 60}
            height={220}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: 'transparent',
              backgroundGradientTo: 'transparent',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffffff"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#462ab2', '#1e124c']}
        style={styles.gradientContainer}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <ChevronLeft color="white" size={24} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Image 
              source={userData.avatar} 
              style={styles.avatarImage} 
            />
            <Text style={styles.headerTitle}>{userData.name}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Settings color="white" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <LogOut color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        {renderContent()}
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  contentContainer: {
    backgroundColor: 'transparent',
    paddingTop: 10,
    paddingBottom: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  statsScrollContainer: {
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 10,
  },
  statCard: {
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    minWidth: SCREEN_WIDTH * 0.4, 
  },
  statCardIcon: {
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 8,
  },
  statCardTextContainer: {
    flex: 1,
  },
  statLabel: {
    color: 'white',
    fontSize: 12,
    marginBottom: 3,
    opacity: 0.8,
  },
  statValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: 'rgba(30,18,76,0.3)',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 15,
    marginTop: 20,
  },
  chartTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  }
});
