import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ProfilComponent } from './profil/profil.component';
import { isConnectedGuard } from './is_connected.guard';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AddMaterielComponent } from './add-materiel/add-materiel.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminGuard } from './AdminGuard';
import { EditUserComponent } from './edit-user/edit-user.component';

export const routes: Routes = [
    {path:'', component: ConnexionComponent},
    {path:'home', component: (() => {return localStorage.getItem("role") === "admin" ? HomeAdminComponent : HomeComponent}) ()},
    {path:'home/Users', component: UserPanelComponent},
    {path:'home/Users/Add', component: AddUserComponent},
    {path:'home/Users/Edit/:id', component: EditUserComponent},
    {path:'home/AddMaterials', component: AddMaterielComponent},
    {path:'home/profil', component: ProfilComponent, canActivate:[isConnectedGuard]},
    {path:'**', component: ErrorComponent}
];
