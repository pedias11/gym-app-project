import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InfoComponent } from '../info/info.component';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet, InfoComponent, SubscriptionsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
