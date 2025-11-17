import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';

export const useLockOrientation = () => {
  useEffect(() => {
    Orientation.lockToPortrait();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);
};
