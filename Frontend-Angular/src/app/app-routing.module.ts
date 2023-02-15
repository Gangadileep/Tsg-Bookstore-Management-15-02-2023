import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './auth';
import { LoginComponent } from './auth/login.component';
import { UserComponent } from './user/user.component';
import { UserviewComponent } from './userview/userview.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [AuthenticationGuard] },
  { path: 'user', component: UserComponent, pathMatch: 'full', canActivate: [AuthenticationGuard] },
  { path: 'userview', component: UserviewComponent, pathMatch: 'full', canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
