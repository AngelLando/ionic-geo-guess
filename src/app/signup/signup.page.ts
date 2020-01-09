import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  users: User[];
  isLoading = false;

  constructor(
    public http: HttpClient,
    private auth: AuthService,
    private navCtrl: NavController
  ) { 
    this.users = [];
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;    

    this.isLoading = true;
    
    this.auth.signUp(username, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.navCtrl.navigateBack('/home/all-thumbnails');
      },
      error: err => {
        console.warn(`Authentication failed: ${err.message}`);
      }
    });
  }
}
