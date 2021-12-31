import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightList } from './flightList/flightList';
import { AuthGuardService } from './core/service/auth-gaurd.service';
import { HomeComponent } from './home/home.component';
// const routes: Routes = [
//   { path: 'dashboard', component:HomeComponent },
//   { path: '', redirectTo:'dashboard' , pathMatch:'full' },

//   //  { path: 'usertone', component:UserToneComponent },
//   //  { path: '', redirectTo:'dashboard' , pathMatch:'full' },
//  ];

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
     pathMatch:'full'
  },
  {
  path: 'Terms&Conditions',
  component: FlightList,
  pathMatch:'full',
},
// {
//   path: 'quickrecharge',
//   component: QuickRechargeComponent,
//   pathMatch:'full',
// },
// {
//   path: 'locateus',
//   component: LocateUsComponent,
//   pathMatch:'full',
// },
// {
//   path: 'support',
//   component: SupportComponent,
//   pathMatch:'full',
// },
// {
//   // path: 'login',
//   component: LoginComponent,
//   pathMatch:'full',
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
