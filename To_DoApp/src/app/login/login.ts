import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth as AuthService } from '../service/auth';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  form: any;
  constructor(private router: Router, public formBuilder: FormBuilder, private service: AuthService, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.form.valid){
      this.service.signIn(this.form.value).subscribe({
        next:(res:any)=>{
           localStorage.setItem('token', res.token);
           const user = { name: res.name };
           this.service.setUser( user ); 
           this.toastr.success(`Welcome, ${res.name}!`, 'Success');
           this.router.navigate(['/tasks']);
        },
        error: err => {
          if (err.status === 400) {
            this.toastr.error('Invalid email or password', 'Login Failed');
          }
          else {
            this.toastr.error('An error occurred during login. Please try again.', 'Login Failed');
          }
        }
    })
  }
}

  goToRegister(){
    this.router.navigate(['/register'])
  }
}
