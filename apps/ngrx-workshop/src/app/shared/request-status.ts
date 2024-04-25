export enum LoadingState {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
}

export interface ErrorState {
  errorMessage: string;
}

