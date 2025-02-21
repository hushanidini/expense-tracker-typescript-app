import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'expenses_data';

export default function useOfflineSync() {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [isSyncing, setIsSyncing] = useState(false);

    const loadFromLocalStorage = useCallback(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }, []);

    const saveToLocalStorage = useCallback((data: any) => {
        if (data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    }, []);

    const syncData = useCallback(() => {
        setIsSyncing(true);
        try {
            const localData = loadFromLocalStorage();
            console.log('localData--', localData)
            // Sync logic here
            setIsSyncing(false);
        } catch (error) {
            console.error('Sync failed:', error);
            setIsSyncing(false);
        }
    }, [loadFromLocalStorage]);

    useEffect(() => {
        const handleOnlineStatus = () => {
            setIsOffline(!navigator.onLine);
            if (navigator.onLine) {
                syncData();
            }
        };

        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);

        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOnlineStatus);
        };
    }, [syncData]);

    return { isOffline, isSyncing, saveToLocalStorage, loadFromLocalStorage };
}

// const apiSyncExpenses = async (expenses: any[]) => {
//   console.log("Syncing expenses:", expenses);
//   return new Promise((resolve) => setTimeout(resolve, 1000));
// };
