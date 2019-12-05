import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm; FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      "firstName": ['', Validators.required],
      "lastName": ['', Validators.required],
      "email": ['', [Validators.required, Validators.email]],
      "password": ['',[Validators.required, Validators.minLength(6)]],
      "city": ['', Validators.required],
      "birthDate": ['', Validators.required],
      "phoneNumber": ['',[Validators.required, Validators.minLength(8)]]
    })
  }

  onRegisterClick(): void {
    console.log(this.registerForm);
    // if this form is valid - then call the server
    if (this.registerForm.valid) {
      // call server
      this.router.navigate(['home/register/thanks']);
    }
    else{

      // ?
    }
  }
}