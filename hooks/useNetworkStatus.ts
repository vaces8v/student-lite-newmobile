import { useState, useEffect, useCallback } from 'react';
import NetInfo from "@react-native-community/netinfo";

export const useNetworkStatus = () => {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [connectionType, setConnectionType] = useState<string | null>(null);
    const [networkStatus, setNetworkStatus] = useState<{
        currentlyConnected: boolean;
        previouslyConnected: boolean;
    }>({
        currentlyConnected: true,
        previouslyConnected: true
    });

    const checkInternetConnection = useCallback(async () => {
        try {
            const state = await NetInfo.fetch();
            return state.isConnected;
        } catch (error) {
            
            return false;
        }
    }, []);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setNetworkStatus(prev => ({
                currentlyConnected: !!state.isConnected,
                previouslyConnected: prev.currentlyConnected
            }));

            setIsConnected(state.isConnected);
            setConnectionType(state.type);
        });

        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected);
            setConnectionType(state.type);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const wasConnectionRestored = 
        networkStatus.currentlyConnected && 
        !networkStatus.previouslyConnected;

    const wasConnectionLost = 
        !networkStatus.currentlyConnected && 
        networkStatus.previouslyConnected;

    return {
        isConnected,
        connectionType,
        wasConnectionRestored,
        wasConnectionLost,
        checkInternetConnection
    };
};
