import { Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {RegisterComponent} from "./component/register/register.component";
import {NavigationComponent} from "./component/navigation/navigation.component";
import {CompanyComponent} from "./component/company/company.component";
import {SectorComponent} from "./component/sector/sector.component";
import {UserComponent} from "./component/user/user.component";
import {VacancyComponent} from "./component/vacancy/vacancy.component";
import {HomeTableComponent} from "./component/home/home-table/home-table.component";
import {ApplicationFormComponent} from "./component/application-form/application-form.component";
import {ApplicationListComponent} from "./component/application-list/application-list.component";

export const routes: Routes = [

  // PUBLIC
  {
    path: '',
    component: HomeComponent
  },

  // applicant
  {
    path: 'my-dashboard',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'my-applications',
        component: ApplicationListComponent,
      }]
  },
  {
    path: 'home/page/:id',
    component: HomeTableComponent
  },
  {
    path: 'application-form/:id',
    component: ApplicationFormComponent
  },

  // applicant

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  //ADMIN
  {
    path: 'nav',
    component: NavigationComponent,
    children: [
      {
        path: 'dashboard',
        component: ApplicationListComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'company',
        component: CompanyComponent
      },
      {
        path: 'sector',
        component: SectorComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'vacancy',
        component: VacancyComponent
      },
      {
        path: 'application',
        component: ApplicationListComponent
      }]
  },
];
