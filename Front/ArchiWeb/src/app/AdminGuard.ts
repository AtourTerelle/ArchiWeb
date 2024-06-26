import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const AdminGuard = () => {

  const role = localStorage.getItem('role');

  if(role==="admin"){
    console.log("oui : ",localStorage.getItem("role"))
    return true;
  }
  console.log("non : ",localStorage.getItem("role"))
  return false;
  

};