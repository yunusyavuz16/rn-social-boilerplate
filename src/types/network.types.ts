import type { NetInfoStateType } from '@react-native-community/netinfo';

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean;
  type: NetInfoStateType;
  isWifiEnabled: boolean;
  isCellularEnabled: boolean;
}
