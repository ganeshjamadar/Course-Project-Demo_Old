import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild("f", {static:false}) form : NgForm
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp()
  {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.signupUser(email, password);
  }
}
