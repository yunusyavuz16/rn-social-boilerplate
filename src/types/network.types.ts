import type {NetInfoStateType} from '@react-native-community/netinfo';

/**
 * Network state type
 * Represents the current network connectivity status
 */
export interface NetworkState {
  /**
   * Whether the device is connected to a network
   */
  isConnected: boolean;

  /**
   * Whether the internet is reachable
   * Can be null if the state is unknown
   */
  isInternetReachable: boolean;

  /**
   * Type of network connection
   */
  type: NetInfoStateType;

  /**
   * Whether connected via WiFi
   */
  isWifiEnabled: boolean;

  /**
   * Whether connected via cellular
   */
  isCellularEnabled: boolean;
}

