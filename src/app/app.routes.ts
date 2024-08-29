import { Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {HeaderComponent} from "./component/header/header.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
