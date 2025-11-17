import NetInfo, {NetInfoState, NetInfoStateType} from '@react-native-community/netinfo';
import type {NetworkState} from '../types/network.types';

/**
 * Network monitoring service
 * Provides network state information and change listeners
 */
class NetworkService {
  private readonly listeners: Set<(state: NetworkState) => void> = new Set();
  private currentState: NetworkState | null = null;

  /**
   * Initialize network monitoring
   * Fetches initial state and sets up listener
   */
  async initialize(): Promise<NetworkState> {
    const state = await NetInfo.fetch();
    this.currentState = this.transformNetInfoState(state);
    return this.currentState;
  }

  /**
   * Subscribe to network state changes
   * Returns unsubscribe function
   */
  subscribe(callback: (state: NetworkState) => void): () => void {
    this.listeners.add(callback);

    // If we already have a state, notify immediately
    if (this.currentState) {
      callback(this.currentState);
    }

      // Set up NetInfo listener
      const unsubscribe = NetInfo.addEventListener(state => {
        this.currentState = this.transformNetInfoState(state);
        // Only notify listeners if state is not null (should always be the case, but TypeScript safety)
        if (this.currentState) {
          for (const listener of this.listeners) {
            listener(this.currentState);
          }
        }
      });

    // Return combined unsubscribe function
    return () => {
      this.listeners.delete(callback);
      unsubscribe();
    };
  }

  /**
   * Get current network state synchronously
   * Returns null if not initialized
   */
  getCurrentState(): NetworkState | null {
    return this.currentState;
  }

  /**
   * Check if device is currently online
   */
  isOnline(): boolean {
    return this.currentState?.isConnected ?? false;
  }

  /**
   * Transform NetInfo state to our NetworkState type
   */
  private transformNetInfoState(state: NetInfoState): NetworkState {
    return {
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable ?? false,
      type: state.type ?? NetInfoStateType.unknown,
      isWifiEnabled: state.type === NetInfoStateType.wifi,
      isCellularEnabled: state.type === NetInfoStateType.cellular,
    };
  }
}

export const networkService = new NetworkService();

