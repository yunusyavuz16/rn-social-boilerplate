import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

interface UseVideoControlsParams {
  pausedProp: boolean;
  enableTapToPlay?: boolean;
  showPlayButton?: boolean;
  hasError: boolean;
  onErrorReset: () => void;
}

interface UseVideoControlsReturn {
  actualPaused: boolean;
  handleTap: () => void;
  containerPointerEvents: 'auto' | 'none';
  shouldShowPlayButton: boolean;
  showTapOverlay: boolean;
  syncWithAutoplay: () => void;
}

/**
 * Manages tap-to-play behavior + visibility driven autoplay sync.
 * Keeps internal pause state isolated to avoid unnecessary CustomVideo re-renders.
 */
export const useVideoControls = ({
  pausedProp,
  enableTapToPlay = false,
  showPlayButton = true,
  hasError,
  onErrorReset,
}: UseVideoControlsParams): UseVideoControlsReturn => {
  const userPausedRef = useRef(false);
  const [internalPaused, setInternalPaused] = useState(pausedProp);

  useEffect(() => {
    if (!enableTapToPlay) {
      setInternalPaused(pausedProp);
      userPausedRef.current = false;
      return;
    }

    if (pausedProp) {
      setInternalPaused(true);
      userPausedRef.current = false;
      return;
    }

    if (!userPausedRef.current) {
      setInternalPaused(false);
    }
  }, [enableTapToPlay, pausedProp]);

  const actualPaused = enableTapToPlay ? internalPaused : pausedProp;

  const handleTap = useCallback(() => {
    if (hasError) {
      onErrorReset();
      if (!pausedProp) {
        setInternalPaused(false);
      }
      return;
    }

    if (!enableTapToPlay) {
      return;
    }

    setInternalPaused(prev => {
      const next = !prev;
      userPausedRef.current = next;
      return next;
    });
  }, [enableTapToPlay, hasError, onErrorReset, pausedProp]);

  const syncWithAutoplay = useCallback(() => {
    if (!enableTapToPlay || pausedProp || userPausedRef.current) {
      return;
    }

    setInternalPaused(false);
  }, [enableTapToPlay, pausedProp]);

  const containerPointerEvents = enableTapToPlay ? 'auto' : 'none';

  const shouldShowPlayButton = useMemo(
    () => hasError || (actualPaused && (enableTapToPlay || showPlayButton)),
    [actualPaused, enableTapToPlay, hasError, showPlayButton],
  );

  return {
    actualPaused,
    handleTap,
    containerPointerEvents,
    shouldShowPlayButton,
    showTapOverlay: enableTapToPlay,
    syncWithAutoplay,
  };
};

