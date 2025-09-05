import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth as AuthService } from '../service/auth';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  form: any;
  constructor(public formBuilder: FormBuilder, private service: AuthService, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6), 
                Validators.pattern('^(?=.*[^A-Za-z0-9]).+$')]],
    });
  }

  onSubmit() {
    if(this.form.valid){
      this.service.createUser(this.form.value)
      .subscribe({
        next:(res:any)=>{
          if(res.succeeded){
            this.form.reset();
            this.toastr.success('User registered successfully');
          }
          else{
            this.toastr.error('User registration failed');
          }
        },
        error: err => {
          console.log('error', err);
          this.toastr.error('An error occurred during registration. Please try again.');
        }
      });
    }
  }
}
