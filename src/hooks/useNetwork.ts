import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NetInfoStateType} from '@react-native-community/netinfo';
import {networkService} from '@services/networkService';
import {setNetworkState} from '@store/slices/networkSlice';
import {selectIsOnline, selectNetworkState} from '@store/slices/networkSlice';
import type {RootState} from '@store/store';

/**
 * Hook to access and monitor network state
 * Automatically initializes network monitoring and subscribes to changes
 *
 * @returns Network state and helper functions
 */
export const useNetwork = () => {
  const dispatch = useDispatch();
  const isOnline = useSelector(selectIsOnline);
  const networkState = useSelector((state: RootState) => selectNetworkState(state));

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    /**
     * Initialize network monitoring
     */
    const initializeNetwork = async () => {
      try {
        // Get initial state
        const initialState = await networkService.initialize();
        dispatch(setNetworkState(initialState));

        // Subscribe to changes
        unsubscribe = networkService.subscribe(state => {
          dispatch(setNetworkState(state));
        });
      } catch (error) {
        console.error('Failed to initialize network monitoring:', error);
        // Set offline state on error
        dispatch(
          setNetworkState({
            isConnected: false,
            isInternetReachable: false,
            type: NetInfoStateType.unknown,
            isWifiEnabled: false,
            isCellularEnabled: false,
          }),
        );
      }
    };

    initializeNetwork();

    // Cleanup on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return {
    /**
     * Whether device is currently online
     */
    isOnline,

    /**
     * Full network state object
     */
    networkState,

    /**
     * Whether network monitoring is initialized
     */
    isInitialized: networkState !== null,
  };
};

