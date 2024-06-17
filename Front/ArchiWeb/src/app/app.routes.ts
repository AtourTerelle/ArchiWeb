import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ProfilComponent } from './profil/profil.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AddMaterielComponent } from './add-materiel/add-materiel.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
    {path:'', component: ConnexionComponent},
    {path:'home', component: HomeAdminComponent},
    {path:'home/profil', component: ProfilComponent},
    {path:'home/Users', component: UserPanelComponent},
    {path:'home/Users/Add', component: AddUserComponent},
    {path:'home/AddMaterials', component: AddMaterielComponent},
    {path:'**', component: ErrorComponent}
];
