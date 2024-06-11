import { CanActivateFn } from '@angular/router';

export const isConnectedGuard: CanActivateFn = (route, state) => {
  return true;
};
