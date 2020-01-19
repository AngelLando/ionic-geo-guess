import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  booleanValue = true;
  user: User;
  form: FormGroup;
  isLoading = false;
  isUpdating = false;
  country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  default = '';

  constructor(
    private auth: AuthService,
    private usersService: UsersService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }
 
  ngOnInit() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });
    
    this.default = this.user.country;
    this.isLoading = true;

    this.form = new FormGroup({
      username: new FormControl(this.user.username, {
        updateOn: 'blur',
        validators: [Validators.minLength(3), Validators.maxLength(20)]
      }),
      country: new FormControl(this.user.country, {
        updateOn: 'blur'
      }),
      city: new FormControl(this.user.city, {
        updateOn: 'blur',
        validators: [Validators.maxLength(16)]
      })
    });
    this.form.controls['country'].setValue(this.default, {onlySelf: true});

    this.isLoading = false;
  }

  toggleChange($event){
  }

  logOut() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  onUpdateSettings() {
    if(!this.form.valid) {
      return;
    }
    this.isUpdating = true;
    
    const data = {
      "_id": this.user._id,
      "username": this.form.value.username,
      "country": this.form.value.country,
      "city": this.form.value.city,
      "password": this.form.value.password
    }

    this.usersService.updateUser(data).subscribe(() => {
      this.isUpdating = false;
      this.form.setValue({
        username: this.form.value.username,
        country: this.form.value.country,
        city: this.form.value.city
      })
    });
  }

  onDeleteAccount(userId: string) {
    this.alertCtrl.create({
      header: 'Confirm deletion',
      message: 'Are you sure you want to permanently delete your account?',
      buttons: [{
        text: 'Cancel', handler: () => {
          this.navCtrl.navigateBack('/home/settings');
        }
      },
      {
        text: 'Delete', handler: () => {
          this.loadingCtrl.create({
            message: 'Deleting...'
          }).then(loadingEl => {
            loadingEl.present();
            this.usersService.deleteUser(userId).subscribe(() => {
              loadingEl.dismiss();
              this.auth.logOut();
              this.navCtrl.navigateBack('/login');
            });
          })
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    })
  }

}