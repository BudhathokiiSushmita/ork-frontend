import { Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {HeaderComponent} from "./component/header/header.component";

export const routes: Routes = [
  {
    path: '',
    component: HeaderComponent
  },
  {
    path: 'home',
    component: HeaderComponent
  },
  {
    path: 'login',
    component: HeaderComponent
  }
];
