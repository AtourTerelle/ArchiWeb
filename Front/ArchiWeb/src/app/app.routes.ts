import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [
    {path:'', component: ConnexionComponent},
    {path:'home', component: HomeComponent},
    {path:'home/profil', component: ProfilComponent},
    {path:'**', component: ErrorComponent}
];
