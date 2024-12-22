import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import React, { 
    createContext, 
    useContext, 
    useState, 
    ReactNode, 
    useCallback, 
    useEffect
} from 'react';
import { 
    View, 
    Text, 
    StyleSheet 
} from 'react-native';
import Animated, { 
    useAnimatedStyle, 
    useSharedValue, 
    withSequence, 
    withTiming, 
    withDelay, 
    Easing 
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ToastContextType = {
    showToast: (message: string, type?: 'success' | 'error' | 'warning') => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('error');
    const insetsHeight = useSafeAreaInsets().top;
    const {
        wasConnectionRestored,
        wasConnectionLost
    } = useNetworkStatus();

    const toastTranslateY = useSharedValue(-100);
    const toastOpacity = useSharedValue(0);

    const toastAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: toastTranslateY.value }],
            opacity: toastOpacity.value
        };
    });

    const showToast = useCallback((message: string, type: 'success' | 'error' | 'warning' = 'error') => {
        setToastMessage(message);
        setToastType(type);
        
        toastTranslateY.value = withSequence(
            withTiming(0, { duration: 300, easing: Easing.ease }),
            withDelay(2000, withTiming(-100, { duration: 300, easing: Easing.ease }))
        );
        toastOpacity.value = withSequence(
            withTiming(1, { duration: 300 }),
            withDelay(2000, withTiming(0, { duration: 300 }))
        );
    }, []);

    
    useEffect(() => {
        if (wasConnectionLost) {
            showToast('Нет подключения к интернету', 'warning');
        }
    }, [wasConnectionLost]);

    useEffect(() => {
        if (wasConnectionRestored) {
            showToast('Подключение к интернету восстановлено', 'success');
        }
    }, [wasConnectionRestored]);

    const getToastBackgroundColor = () => {
        switch (toastType) {
            case 'success': return '#4CAF50';
            case 'warning': return 'orange';
            case 'error': return 'red';
            default: return 'red';
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Animated.View 
                style={[
                    styles.toast, 
                    toastAnimatedStyle, 
                    { 
                        height: 50 + insetsHeight, 
                        backgroundColor: getToastBackgroundColor() 
                    }
                ]}
            >
                <Text style={styles.toastText}>{toastMessage}</Text>
            </Animated.View>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        zIndex: 1000,
        justifyContent: 'flex-end'
    },
    toastText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: 17,
        paddingBottom: 2
    }
});
