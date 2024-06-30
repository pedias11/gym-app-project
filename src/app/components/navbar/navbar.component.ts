import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { NavbarItem } from 'src/app/shared/interfaces/navbar-item';
import { UserService } from 'src/app/shared/services/user.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userService = inject(UserService);
  router = inject(Router);
  user = this.userService.user;

  navbar: NavbarItem[] = [
    {text: 'Home', routerLink: 'home-page'},
    {text: 'Register', routerLink: 'user-registration'},
    {text: 'Login', routerLink: 'user-login'},
    {text: 'Dashboard', routerLink: 'user-dashboard'},
  ]

  /**
   * Logs out the logged-in user.
   */
  logout() {
    this.userService.logoutUser();
    this.router.navigate(['user-login']);
  }
}
