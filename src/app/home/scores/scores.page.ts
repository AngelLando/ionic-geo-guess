import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.page.html',
  styleUrls: ['./scores.page.scss'],
})

export class ScoresPage implements OnInit {

  users: User[];
  filteredUsers: User[];
  location: string;
  input:string;
  contentLoaded = false;
  countryList=[];
  cityList=[];

  constructor(private http: HttpClient) {
    this.users = [];
    this.location = 'city';
  }

  ngOnInit() {
    const url = `${environment.apiUrl}/users`;
    this.http.get<User[]>(url).subscribe(data => {
      this.users = data;
      this.contentLoaded = true;
      // Order by totalScore
      this.users.sort((a, b) => b.totalScore - a.totalScore);
      this.getAllCountries();
      this.getAllCities();
      this.filteredUsers=this.users;
    });
  }

  getAllCountries(){
    const tab = [];
    this.users.forEach(function(item){
      if (item.country!=null){
tab.push(item.country);
      }
    });
  const uniqueTab = tab.filter((x,i,a)=> a.indexOf(x)==i);
    this.countryList = uniqueTab;
  }

  
  getAllCities(){
    const tab = [];
    this.users.forEach(function(item){
      if (item.city!=null){
tab.push(item.city);
      }
    });
  const uniqueTab = tab.filter((x,i,a)=> a.indexOf(x)==i);
    this.cityList = uniqueTab;
  }

  segmentChanged(ev: any) {
    this.input==null;
    this.filteredUsers=this.users;
  }

  showSelectedValue(ev:any){
console.log(this.input)
  }

  filterUser(ev:any){
    if(this.location=='country'){
      this.filteredUsers= this.users.filter(user=> user.country==this.input);
    }else{
      this.filteredUsers= this.users.filter(user=> user.city==this.input);
    }
  }

  doRefresh(ev: any) {
    this.ngOnInit();

    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }

}