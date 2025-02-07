import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';

export default function WeatherScreen() {
  const headerHeight = useHeaderHeight();
  const [loading, setLoading] = useState(true);
  
  const weatherData = {
    temperature: 22,
    condition: 'Солнечно',
    humidity: 65,
    windSpeed: 5,
    feelsLike: 24,
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <LinearGradient
      colors={['#462ab2', '#1e124c']}
      style={{...styles.container, justifyContent: "center"}}
    >
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#462ab2', '#1e124c']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{...styles.scrollContainer, paddingTop: headerHeight}}>
        <View style={styles.mainTemp}>
          <Text style={styles.temperature}>{weatherData.temperature}°</Text>
          <Text style={styles.condition}>{weatherData.condition}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="water-outline" size={24} color="#fff" />
            <Text style={styles.detailText}>Влажность</Text>
            <Text style={styles.detailValue}>{weatherData.humidity}%</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="speedometer-outline" size={24} color="#fff" />
            <Text style={styles.detailText}>Ветер</Text>
            <Text style={styles.detailValue}>{weatherData.windSpeed} м/с</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="thermometer-outline" size={24} color="#fff" />
            <Text style={styles.detailText}>Ощущается</Text>
            <Text style={styles.detailValue}>{weatherData.feelsLike}°</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e3c72',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 50,
  },
  mainTemp: {
    alignItems: 'center',
    marginBottom: 40,
  },
  temperature: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
  },
  condition: {
    fontSize: 24,
    color: '#fff',
    opacity: 0.9,
  },
  detailsContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    opacity: 0.8,
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
