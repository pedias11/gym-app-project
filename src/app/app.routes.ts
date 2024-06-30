import { Routes} from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { authGuard } from './shared/guards/auth.guard';
import { InfoComponent } from './components/info/info.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';


export const routes: Routes = [
    {path: 'home-page', component: HomePageComponent},
    {path: 'user-registration', component: UserRegistrationComponent},
    {path: 'user-login', component: UserLoginComponent},
    {path: 'user-dashboard', component: UserDashboardComponent, canActivate: [authGuard]},
    {path: 'info', component: InfoComponent}, 
    {path: 'subscriptions', component: SubscriptionsComponent}
];
