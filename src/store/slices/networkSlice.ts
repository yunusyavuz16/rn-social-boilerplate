import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {NetworkState} from '../../types/network.types';

interface NetworkSliceState {
  /**
   * Current network state
   */
  state: NetworkState | null;

  /**
   * Whether network monitoring has been initialized
   */
  isInitialized: boolean;
}

const initialState: NetworkSliceState = {
  state: null,
  isInitialized: false,
};

/**
 * Network slice for managing network connectivity state
 */
export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    /**
     * Set network state
     */
    setNetworkState: (state, action: PayloadAction<NetworkState>) => {
      state.state = action.payload;
      state.isInitialized = true;
    },

    /**
     * Reset network state (for testing or cleanup)
     */
    resetNetworkState: state => {
      state.state = null;
      state.isInitialized = false;
    },
  },
});

export const {setNetworkState, resetNetworkState} = networkSlice.actions;

/**
 * Selector to check if device is online
 */
export const selectIsOnline = (state: {network: NetworkSliceState}): boolean => {
  return state.network.state?.isConnected ?? false;
};

/**
 * Selector to get network state
 */
export const selectNetworkState = (state: {network: NetworkSliceState}): NetworkState | null => {
  return state.network.state;
};

export default networkSlice.reducer;

