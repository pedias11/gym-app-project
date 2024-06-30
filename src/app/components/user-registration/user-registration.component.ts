import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  userService = inject(UserService);

  registrationStatus: {success: boolean; message: string} = {
    success: false,
    message: 'Not attempted yet'
  };

  form = new FormGroup(
    {
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    },
    this.passwordConfirmValidator,
  );

  /**
   * Confirms the password during registration.
   * @param form The form-input params.
   * @returns password mis-match error or nothing.
   */
  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({passwordMismatch: true});
      return { passwordMismatch: true };
    }
    return {};
  };

  /**
   * Submits the user registration form.
   * @param value the form-input values.
   * @returns User registration message.
   */
  onSubmit(value:any) {    
    const user = this.form.value as User;
    delete user['confirmPassword'];

    this.userService.registerUser(user).subscribe({
      next: (response) => {
        console.log("User registered", response.msg);
        this.registrationStatus = {success: true, message: response.msg};
      },
      error: (response) => {
        const message = response.error.msg;
        console.log("Error registering user", message);
        this.registrationStatus = {success: false, message};
      }
    });
  }


  /**
   * Resets the form in order to register another user.
   */
  registerAnotherUser() {
    this.form.reset();
    this.registrationStatus = {success: false, message: 'Not attempted yet'}
  }

  /**
   * Checks if the selected email has already been registered.
   */
  check_duplicate_email() {
    const email = this.form.get('email').value;

    this.userService.check_duplicate_email(email).subscribe({
      next: (response) => {
        console.log(response.msg);
        this.form.get('email').setErrors(null);
      },
      error: (response) => {
        const message = response.error.msg;
        console.error(message);
        this.form.get('email').setErrors({duplicateEmail: true});
      }
    })
  }
}
