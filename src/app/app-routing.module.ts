import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Compoenents
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { Page404Component } from './components/page404/page404.component';

// Services
import { LoginGuard } from './components/login/login-guard.guard';

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
  {path: '404', component: Page404Component},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
