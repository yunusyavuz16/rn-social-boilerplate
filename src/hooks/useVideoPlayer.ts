import { useEffect, useRef, useState } from 'react';
import type { VideoRef } from 'react-native-video';

interface UseVideoPlayerReturn {
  isPlaying: boolean;
  isPaused: boolean;
  hasError: boolean;
  isLoading: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  videoRef: React.RefObject<VideoRef | null>;
  bufferConfig: {
    minBufferMs: number;
    maxBufferMs: number;
    bufferForPlaybackMs: number;
    bufferForPlaybackAfterRebufferMs: number;
  };
}

/**
 * Hook for video player state management
 * Handles play/pause, visibility-based control, and memory optimization
 */
export const useVideoPlayer = (
  isVisible: boolean = true,
  autoPlay: boolean = true,
): UseVideoPlayerReturn => {
  const [isPlaying, setIsPlaying] = useState(autoPlay && isVisible);
  const [hasError] = useState(false);
  const [isLoading] = useState(true);
  const videoRef = useRef<VideoRef | null>(null);

  const play = () => {
    setIsPlaying(true);
  }

  const pause = () => {
    setIsPlaying(false);
  }

  const toggle = () => {
    setIsPlaying(prev => !prev);
  }

  // Auto pause/play based on visibility
  useEffect(() => {
    if (!isVisible) {
      setIsPlaying(false);
    } else if (autoPlay && isVisible) {
      setIsPlaying(true);
    }
  }, [isVisible, autoPlay]);

  // Aggressive buffer configuration to prevent OOM
  const bufferConfig = {
    minBufferMs: 1000, // 1 second minimum buffer
    maxBufferMs: 2000, // 2 seconds maximum buffer - prevents OOM
    bufferForPlaybackMs: 500, // 0.5 seconds for playback start
    bufferForPlaybackAfterRebufferMs: 1000, // 1 second after rebuffer
  };

  return {
    isPlaying,
    isPaused: !isPlaying,
    hasError,
    isLoading,
    play,
    pause,
    toggle,
    videoRef,
    bufferConfig,
  };
};

