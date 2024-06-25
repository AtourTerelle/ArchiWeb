import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const isConnectedGuard = () => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');

  if(role!= null){
    return true;
  }
  else{
    //this.router.navigate(['/login']);
    return false
  }

};
