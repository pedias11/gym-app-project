import { Component, ViewChild, inject } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { TimeTableItem } from 'src/app/shared/interfaces/timetable-item';
import { User } from 'src/app/shared/interfaces/user';
import { UserSessionItem } from 'src/app/shared/interfaces/user-session';
import { UserService } from 'src/app/shared/services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from 'src/app/shared/services/session.service';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  providers: [],
  imports: [MatTabsModule, MatFormField, MatSelectModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatTable, MatTableModule, FormsModule, MatButtonModule, ReactiveFormsModule, MatSortModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  userService = inject(UserService);
  sessionService = inject(SessionService);

  constructor(private http: HttpClient) {}
  
  displayedColumns: string[] = ['email', 'date', 'time'];
  filterForm: FormGroup;
  user: User;
  selectedSubscription: string;
  selectedDate: string;
  selectedTimePeriod: string;
  email: string;

  userSessions = new MatTableDataSource<UserSessionItem>();
  subscriptionFormControl = new FormControl('', Validators.required);

  timeTable: TimeTableItem[] = [
    {hour: "08:00 - 09:00"},
    {hour: "09:00 - 10:00"},
    {hour: "10:00 - 11:00"},
    {hour: "11:00 - 12:00"},
    {hour: "12:00 - 13:00"},
    {hour: "13:00 - 14:00"},
    {hour: "14:00 - 15:00"},
    {hour: "15:00 - 16:00"},
    {hour: "16:00 - 17:00"},
    {hour: "17:00 - 18:00"},
    {hour: "18:00 - 19:00"},
    {hour: "19:00 - 20:00"},
    {hour: "20:00 - 21:00"},
    {hour: "21:00 - 22:00"}
  ];

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Adds a new session for a specific user-email.
   */
  addSession() {
    const session: UserSessionItem = {
      email: this.userService.user().email,
      date: this.selectedDate,
      time: this.selectedTimePeriod };

      this.sessionService.addSession(session).subscribe({
        next: (response) => {
          console.log("Session added", response.msg);
          alert("Session added");
          this.getSessions();
        },
        error: (response) => {
          const message = response.error.msg;
          console.log("Error adding session", message);
          alert("Session not added properly");
        }
      });  
  }

  /**
   * Gets all the sessions for a specific user-email.
   */
  getSessions(): void {
    const email = this.userService.user().email;
    this.sessionService.getSessionsByEmail(email).subscribe({
      next: (sessions) => {
        this.userSessions.data = sessions;
      },
      error: (error) => {
        console.error('Error fetching sessions', error);
      }
    });
  }

  /**
   * Deletes the last session of a specific user-email.
   */
  deleteLastSession(): void {
    const email = this.userService.user().email;
    this.sessionService.deleteLastSessionByEmail(email).subscribe(
      response => {
        console.log('Last session deleted', response);
        this.getSessions(); // Refresh the sessions list
      },
      error => {
        console.error('Error deleting last session', error);
      }
    );
  }

  ngOnInit(): void {
    this.getSessions();
  }

  /**
   * Fetches the sessions of a specific user-email.
   */
  fetchSessions(): void {
    const email = this.userService.user().email;
    this.sessionService.getSessionsByEmail(email).subscribe(
      data => {
        this.userSessions.data = data;
        this.setDefaultSortSessionsTable();
      },
      error => {
        console.error('Error fetching sessions', error);
      }
    );
  }

  /**
   * Refreshes the fetched-sessions.
   */
  refreshSessions(): void {
    this.fetchSessions();
  }

  /**
   * Sorts the sessions table of a user by dedault.
   */
  setDefaultSortSessionsTable(): void {
    this.userSessions.sort = this.sort;
    this.sort.active = 'date';
    this.sort.direction = 'asc';
    this.sort.sortChange.emit({active: this.sort.active, direction: this.sort.direction});
  }

  /**
   * Selects the subscription for a specific user-email.
   */
  selectSubscription() {
      const subscription = this.selectedSubscription;
      const email = this.userService.user().email;
      this.userService.selectUserSubscription(email, subscription).subscribe({
        next: (response) => {
          console.log('Subscription updated', response);
          alert('Subscription updated successfully');
        },
        error: (error) => {
          console.error('Error updating subscription', error);
        }
      });
  }
}
