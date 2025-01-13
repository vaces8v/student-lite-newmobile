import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const Loader = () => {
    return (
        <LinearGradient
            colors={['#462ab2', '#1e124c']}
            style={styles.container}>
            <ActivityIndicator style={{marginBottom: 100}} size="large" color="#0BC1CC" />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        ...StyleSheet.absoluteFillObject,
    },
});

export default Loader;
