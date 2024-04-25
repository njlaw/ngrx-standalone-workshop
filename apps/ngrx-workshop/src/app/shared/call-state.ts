import { ErrorState, LoadingState } from './request-status';

export type RequestStatus = LoadingState | ErrorState;

export function getErrorMessage(callState: RequestStatus): string | undefined {
  if (typeof callState === 'object') {
    return callState.errorMessage;
  }

  return undefined;
}
