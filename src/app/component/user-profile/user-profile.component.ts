import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  userRole = '';
  username = localStorage.getItem('username') || '';

  savingProfile = false;
  changingPassword = false;

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      contact: [''],
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],

        newPassword: ['', [Validators.required, Validators.minLength(8)]],

        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );

    this.loadUserProfile();
  }

  passwordMatchValidator(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword')?.value;

    const confirmPassword = control.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  loadUserProfile(): void {
    this.userService.getUserByUsername(this.username).subscribe({
      next: (res: any) => {
        const user = res.body ?? res;

        this.profileForm.patchValue({
          username: user.username,
          email: user.emailAddress,
          contact: user.contactNumber,
        });

        this.userRole = user.role;
      },
      error: () => {
        this.userRole = '';
      },
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.savingProfile = true;

    const userData = {
      username: this.profileForm.value.username,
      emailAddress: this.profileForm.value.email,
      contactNumber: this.profileForm.value.contact,
      oldUsername: this.username,
    };

    console.log('User Data to be sent for profile update:', userData);

    this.userService.edit(userData).subscribe({
      next: () => {
        this.savingProfile = false;
      },
      error: () => {
        this.savingProfile = false;
        this.toast.error('Failed to add user.');
      },
    });

    this.savingProfile = false;
  }

  changePassword(): void {
    console.log('Password Form Value: CLICK CLICK', this.passwordForm);
    console.log('Password ', this.passwordForm.invalid);

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.changingPassword = true;

    const passwordData = {
      currentPassword: this.passwordForm.value.currentPassword,

      newPassword: this.passwordForm.value.newPassword,
    };

    this.userService.changePassword(passwordData).subscribe({
      next: () => {
        this.changingPassword = false;
        this.passwordForm.reset();
        this.toast.success('Password changed successfully.');
      },
      error: () => {
        this.changingPassword = false;
        this.toast.error('Current password is incorrect.');
      },
    });

    this.changingPassword = false;
  }
}
