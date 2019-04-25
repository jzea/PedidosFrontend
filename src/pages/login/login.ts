import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  User } from '../../models/user.model';
import { UserService } from '../../services/services-rest/user.service';
import { UserStorageService } from '../../services/user-storage.service'
import { HomePage } from '../../pages/home/home';
import {RegisterPage} from '../../pages/register/register';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials: User = { usuario: '', contrasena: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserService, public userStorageService: UserStorageService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    this.userService.logIn(this.credentials).subscribe(
      (data)=>{
        console.log(data);
        this.userStorageService.setIdUser(data['users'].codusuario);
        this.navCtrl.setRoot(HomePage);
      },
      (error)=> {
          console.log(error);
      }
    );
  }
  showRegister() {
    this.navCtrl.push(RegisterPage);
}
}
