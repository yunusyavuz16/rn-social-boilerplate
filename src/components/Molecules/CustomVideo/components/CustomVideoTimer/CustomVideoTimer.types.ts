export interface CustomVideoTimerProps {
  duration?: number;
  showTimer?: boolean;
  hasError: boolean;
}

export interface CustomVideoTimerRef {
  updateFromProgress: (progress: number) => void;
  reset: () => void;
}

