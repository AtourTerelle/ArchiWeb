import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const isConnectedGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');

  if(!!token && role=="Utilisateur"){
    return true;
  }
  else{
    //this.router.navigate(['/login']);
    return false
  }

};
