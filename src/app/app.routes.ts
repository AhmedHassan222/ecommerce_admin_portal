import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { ForgetPasswordComponent } from './features/auth/pages/forget-password/forget-password.component';

export const routes: Routes = [
  { path: '', canActivate: [authGuard], loadChildren: () =>import('./features/admin_portal/portal.routes').then((r) => r.portalRoutes,
      ),
  },
  {path:'', component:LoginComponent},
  {path:'forget-password', component:ForgetPasswordComponent},
  {path: '**', redirectTo: '',pathMatch: 'full'},
];
