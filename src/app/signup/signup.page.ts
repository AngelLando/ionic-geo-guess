import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  users: User[];
  constructor(
    public http: HttpClient,
  ) { 
    this.users = [];
  }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {

    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    //this.loginError = false;
    const url = `${environment.apiUrl}/users`;
    this.http.get<User[]>(url).subscribe(users => {
    this.users=users;
      console.log(`Users loaded`, users);
    });
  }
}
